# 🔧 Model File Deployment Solutions for Render

## ⚠️ Problem
The `trained_model_tf215.keras` file (35.7 MB) is too large for Git.
Render won't have the model file after deployment.

## ✅ Solution 1: Use Google Drive (Easiest & Free)

### Step 1: Upload Model to Google Drive
1. Upload `backend/trained_model_tf215.keras` to Google Drive
2. Right-click → Get link → Change to "Anyone with the link"
3. Copy the file ID from the URL
   - URL looks like: `https://drive.google.com/file/d/FILE_ID_HERE/view`
   - Copy just the FILE_ID_HERE part

### Step 2: Modify backend/app.py
Add this code at the top of `backend/app.py`:

```python
import urllib.request
import os

def download_model_if_needed():
    """Download model from Google Drive if not present"""
    model_path = 'trained_model_tf215.keras'
    
    if not os.path.exists(model_path):
        print("📥 Model not found locally. Downloading from Google Drive...")
        
        # Replace YOUR_FILE_ID with your actual Google Drive file ID
        file_id = "YOUR_FILE_ID"
        download_url = f"https://drive.google.com/uc?export=download&id={file_id}"
        
        try:
            urllib.request.urlretrieve(download_url, model_path)
            print(f"✅ Model downloaded successfully to {model_path}")
        except Exception as e:
            print(f"❌ Error downloading model: {e}")
            print("⚠️ Will use predictions without model")
    else:
        print(f"✅ Model file found at {model_path}")

# Call this before loading model
download_model_if_needed()
```

### Step 3: Deploy to Render
```bash
git add backend/app.py
git commit -m "Add automatic model download from Google Drive"
git push
```

Model will download automatically on first Render deployment! ✨

---

## ✅ Solution 2: Use Hugging Face Hub (Professional)

### Step 1: Upload to Hugging Face
1. Create account at https://huggingface.co/
2. Create new model repository
3. Upload `trained_model_tf215.keras`
4. Get the model URL

### Step 2: Modify backend/app.py
```python
from huggingface_hub import hf_hub_download

def load_model():
    """Load model from Hugging Face"""
    global model
    if model is None:
        try:
            # Download from Hugging Face
            model_path = hf_hub_download(
                repo_id="YOUR_USERNAME/agrishield-model",
                filename="trained_model_tf215.keras"
            )
            model = tf.keras.models.load_model(model_path)
            print(f"✅ Model loaded from Hugging Face")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
    return model
```

### Step 3: Update requirements.txt
```
huggingface_hub>=0.16.0
```

---

## ✅ Solution 3: Use Render Persistent Disk (Paid)

### Step 1: Add Persistent Disk in Render
1. Go to Render Dashboard → Your Service
2. Click "Disks" tab
3. Add disk: `/opt/render/project/src/backend`
4. Size: 1 GB (more than enough)

### Step 2: Upload Model via Render Shell
1. In Render Dashboard → Your Service → Shell
2. Run:
```bash
cd /opt/render/project/src/backend
curl -L "YOUR_GOOGLE_DRIVE_LINK" -o trained_model_tf215.keras
ls -lh trained_model_tf215.keras
```

Model persists across deployments! ✨

---

## ✅ Solution 4: Disable Disease Detection (Quick Test)

### For testing deployment without model:

Modify `backend/app.py`:

```python
@app.route('/predict', methods=['POST'])
def predict():
    """Disease prediction endpoint - MOCK VERSION"""
    return jsonify({
        'status': 'success',
        'prediction': 'Mock Prediction (Model not loaded)',
        'confidence': 0.85,
        'message': 'This is a mock response. Upload model to enable real predictions.'
    })
```

Deploy immediately without model file! Test other features first.

---

## 🎯 Recommended Solution

### **Use Solution 1 (Google Drive)** - It's:
- ✅ **Free**
- ✅ **Automatic** (downloads on first run)
- ✅ **Easy** (just get file ID)
- ✅ **Fast** (one-time download)

---

## 📝 Step-by-Step: Google Drive Method

### 1. Upload Model
```powershell
# Your model is at:
C:\Users\KUNAL KUMAR DUBEY\Agrishield\backend\trained_model_tf215.keras

# Upload to Google Drive
# Get shareable link
```

### 2. Get File ID
From URL: `https://drive.google.com/file/d/1ABC123XYZ789/view`
File ID is: `1ABC123XYZ789`

### 3. Update Code
I'll help you add the download code to app.py

### 4. Deploy
```bash
git add .
git commit -m "Add model download"
git push
```

---

## 🚀 Want me to implement this now?

I can:
1. ✅ Add Google Drive download code to `backend/app.py`
2. ✅ Update with fallback to mock predictions
3. ✅ Test locally before deployment

**Just give me your Google Drive file ID** (after uploading), or I can add the code with a placeholder for you to fill in!

---

**Alternative**: Want to test deployment **without model first**? 
I can temporarily disable disease detection so you can deploy and test other features immediately!
