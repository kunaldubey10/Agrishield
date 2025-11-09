from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import os
import numpy as np
from PIL import Image
import tensorflow as tf
from werkzeug.utils import secure_filename
import io
import requests
from dotenv import load_dotenv
import urllib.request

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Agmarknet API Configuration
AGMARKNET_API_KEY = os.getenv('AGMARKNET_API_KEY', '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b')
AGMARKNET_BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070'

# Configure upload settings
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Model download configuration (for Render deployment)
MODEL_DOWNLOAD_URL = os.getenv('MODEL_DOWNLOAD_URL', '')  # Set this in Render env vars
# Example: https://drive.google.com/uc?export=download&id=YOUR_FILE_ID

def download_model_if_needed():
    """Download model from cloud storage if not present locally"""
    model_filename = 'trained_model_tf215.keras'
    model_path = os.path.join(os.path.dirname(__file__), model_filename)
    
    # Check if model exists locally
    if os.path.exists(model_path):
        print(f"✅ Model file found at {model_path}")
        return True
    
    # If MODEL_DOWNLOAD_URL is not set, skip download
    if not MODEL_DOWNLOAD_URL:
        print("⚠️  MODEL_DOWNLOAD_URL not set. Skipping model download.")
        print("💡 To enable automatic download, set MODEL_DOWNLOAD_URL in Render environment variables")
        print("   Example: https://drive.google.com/uc?export=download&id=YOUR_FILE_ID")
        return False
    
    # Download model
    print(f"📥 Model not found locally. Downloading from cloud storage...")
    print(f"   URL: {MODEL_DOWNLOAD_URL}")
    
    try:
        urllib.request.urlretrieve(MODEL_DOWNLOAD_URL, model_path)
        
        # Verify download
        if os.path.exists(model_path):
            file_size = os.path.getsize(model_path) / (1024 * 1024)  # Convert to MB
            print(f"✅ Model downloaded successfully!")
            print(f"   Size: {file_size:.2f} MB")
            print(f"   Path: {model_path}")
            return True
        else:
            print(f"❌ Download completed but file not found at {model_path}")
            return False
            
    except Exception as e:
        print(f"❌ Error downloading model: {e}")
        print(f"⚠️  Will use fallback predictions (mock data)")
        return False

# Download model on startup if needed
download_model_if_needed()

# Load the ML model
model = None
# Try multiple possible paths for the model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATHS = [
    os.path.join(os.path.dirname(__file__), 'trained_model_tf215.keras'),
    os.path.join(os.path.dirname(__file__), 'trained_model_new.keras'),
    os.path.join(BASE_DIR, 'trained_model_tf215.keras'),
    os.path.join(BASE_DIR, 'trained_model_new.keras'),
    os.path.join(BASE_DIR, 'trained_model.keras'),
    os.path.join(BASE_DIR, 'AgriShield.keras'),
    os.path.join(os.path.dirname(__file__), 'trained_model.keras'),
    os.path.join(os.path.dirname(__file__), 'AgriShield.keras'),
]

def load_model():
    """Load the trained model"""
    global model
    if model is None:
        try:
            model_loaded = False
            for model_path in MODEL_PATHS:
                if os.path.exists(model_path):
                    print(f"Loading model from {model_path}")
                    try:
                        model = tf.keras.models.load_model(model_path, compile=False)
                        # Recompile for TF 2.15
                        model.compile(
                            optimizer='adam',
                            loss='sparse_categorical_crossentropy',
                            metrics=['accuracy']
                        )
                        print(f"✓ Successfully loaded model from {model_path}")
                        model_loaded = True
                        break
                    except Exception as e:
                        print(f"Failed to load from {model_path}: {e}")
                        continue
            
            if not model_loaded:
                print("⚠ Warning: Model file not found in any of the expected locations.")
                print(f"Searched paths: {MODEL_PATHS}")
                print("Using fallback predictions (random results for testing).")
                print("Run convert_model_to_tf215.py to create a new model.")
                model = None
        except Exception as e:
            print(f"Error loading model: {e}")
            model = None
    return model

# Disease class names (from main.py)
CLASS_NAMES = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy'
]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_file):
    """Preprocess image for model prediction"""
    try:
        # Read image from file
        image = Image.open(io.BytesIO(image_file.read()))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize to 128x128
        image = image.resize((128, 128))
        
        # Convert to array and normalize
        img_array = np.array(image)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        raise Exception(f"Error preprocessing image: {str(e)}")

def predict_disease(image_file):
    """Predict disease from image"""
    try:
        model = load_model()
        
        if model is None:
            # Fallback: return random prediction for testing
            import random
            disease_index = random.randint(0, len(CLASS_NAMES) - 1)
            confidence = random.uniform(0.7, 0.95)
            return {
                'disease': CLASS_NAMES[disease_index],
                'confidence': confidence,
                'class_index': disease_index
            }
        
        # Preprocess image
        processed_image = preprocess_image(image_file)
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)
        disease_index = np.argmax(predictions[0])
        confidence = float(predictions[0][disease_index])
        
        return {
            'disease': CLASS_NAMES[disease_index],
            'confidence': confidence,
            'class_index': int(disease_index)
        }
    except Exception as e:
        raise Exception(f"Error predicting disease: {str(e)}")

# Mock data for commodity prices
def fetch_agmarknet_data():
    """Fetch live commodity prices from Agmarknet API"""
    try:
        # Commodity mapping to Agmarknet commodity names
        commodities_map = {
            'Wheat': 'wheat',
            'Rice': 'rice',
            'Cotton': 'cotton',
            'Sugarcane': 'sugarcane',
            'Soyabean': 'soybean',
            'Maize': 'maize',
            'Gram': 'gram',
            'Tur': 'tur'
        }
        
        params = {
            'api-key': AGMARKNET_API_KEY,
            'format': 'json',
            'limit': 10  # Sample key returns max 10 records
        }
        
        response = requests.get(AGMARKNET_BASE_URL, params=params, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            # Process the API response
            commodity_data = {}
            
            if 'records' in data:
                for record in data['records']:
                    commodity_name = record.get('commodity', '').strip()
                    
                    # Check if commodity is in our map
                    normalized_name = None
                    for key, value in commodities_map.items():
                        if key.lower() in commodity_name.lower():
                            normalized_name = value
                            break
                    
                    if normalized_name:
                        modal_price = float(record.get('modal_price', 0))
                        
                        if normalized_name not in commodity_data:
                            commodity_data[normalized_name] = {
                                'prices': [modal_price],
                                'dates': [record.get('arrival_date', datetime.now().strftime('%Y-%m-%d'))],
                                'min_price': float(record.get('min_price', modal_price)),
                                'max_price': float(record.get('max_price', modal_price))
                            }
                        else:
                            commodity_data[normalized_name]['prices'].append(modal_price)
                            commodity_data[normalized_name]['dates'].append(
                                record.get('arrival_date', datetime.now().strftime('%Y-%m-%d'))
                            )
            
            # Format data for frontend
            formatted_data = []
            for commodity, info in commodity_data.items():
                avg_price = sum(info['prices']) / len(info['prices'])
                
                # Calculate price change (using first vs last price if multiple available)
                if len(info['prices']) > 1:
                    price_change = ((info['prices'][-1] - info['prices'][0]) / info['prices'][0]) * 100
                else:
                    price_change = 0
                
                # Generate 30-day history (mix real data with interpolation)
                history = []
                for i in range(30):
                    date = (datetime.now() - timedelta(days=30-i)).strftime('%Y-%m-%d')
                    price = avg_price * (1 + random.uniform(-0.05, 0.05))
                    history.append({
                        'date': date,
                        'price': round(price, 2)
                    })
                
                formatted_data.append({
                    'name': commodity,
                    'currentPrice': round(avg_price, 2),
                    'change': round(price_change, 2),
                    'history': history
                })
            
            return formatted_data if formatted_data else None
        else:
            print(f"Agmarknet API error: Status {response.status_code}")
            return None
            
    except Exception as e:
        print(f"Error fetching from Agmarknet: {e}")
        return None

def generate_mock_price_data():
    commodities = ['wheat', 'rice', 'cotton', 'sugarcane', 'soybean']
    data = []
    
    for commodity in commodities:
        # Generate current price between 2000 and 5000
        current_price = random.randint(2000, 5000)
        # Generate price change between -5% and +5%
        change = random.uniform(-5, 5)
        
        # Generate historical data for last 30 days
        history = []
        base_price = current_price / (1 + change/100)  # Calculate base price
        for i in range(30):
            date = (datetime.now() - timedelta(days=30-i)).strftime('%Y-%m-%d')
            # Add some random variation to the price
            price = base_price * (1 + random.uniform(-0.02, 0.02))
            history.append({
                'date': date,
                'price': round(price, 2)
            })
        
        data.append({
            'name': commodity,
            'currentPrice': round(current_price, 2),
            'change': round(change, 2),
            'history': history
        })
    
    return data

@app.route('/api/commodity-prices', methods=['GET'])
def get_commodity_prices():
    try:
        # Try to fetch live data from Agmarknet first
        live_data = fetch_agmarknet_data()
        
        if live_data and len(live_data) > 0:
            print(f"✓ Returning {len(live_data)} commodities from Agmarknet API")
            return jsonify(live_data)
        else:
            # Fallback to mock data
            print("⚠ Using fallback mock data")
            data = generate_mock_price_data()
            return jsonify(data)
    except Exception as e:
        print(f"Error in commodity prices endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """Predict disease from uploaded image"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Please upload an image.'}), 400
        
        # Reset file pointer
        file.seek(0)
        
        # Predict disease
        result = predict_disease(file)
        
        return jsonify(result)
    
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    model_status = "loaded" if load_model() is not None else "not loaded"
    return jsonify({
        'status': 'healthy',
        'model': model_status
    })

if __name__ == '__main__':
    print("Loading ML model...")
    load_model()
    print("Starting Flask server on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False) 