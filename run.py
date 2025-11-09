import streamlit as st
import tensorflow as tf
import numpy as np
import random
import base64

# Function to load and predict using the Keras model
def model_prediction(image_path):
    model = tf.keras.models.load_model('D:\\deep\\AgriShield.keras')
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(128, 128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])  # Convert single image to a batch.
    prediction = model.predict(input_arr)
    result_index = np.argmax(prediction)
    return result_index

# Function to convert an image to base64
def get_image_as_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode()

# Sample database of plants (you can scale this up)
plant_db = [
    {"plant_name": "Mango Tree", "optimal_ph": 6.5, "optimal_nitrogen": 60, "optimal_phosphorus": 30, "optimal_potassium": 40, "optimal_moisture": 25},
    {"plant_name": "Tomato Plant", "optimal_ph": 6.2, "optimal_nitrogen": 50, "optimal_phosphorus": 20, "optimal_potassium": 30, "optimal_moisture": 30},
    # Add more plant data...
]

# Simulated sensor data
def get_sensor_data():
    return {
        "ph": random.uniform(5.0, 8.0),
        "nitrogen": random.uniform(10, 100),
        "phosphorus": random.uniform(10, 100),
        "potassium": random.uniform(10, 100),
        "moisture": random.uniform(10, 50),
    }

# Function to analyze conditions
def analyze_conditions(sensor_data):
    for plant in plant_db:
        ph_good = plant["optimal_ph"] - 0.5 <= sensor_data["ph"] <= plant["optimal_ph"] + 0.5
        nitrogen_good = plant["optimal_nitrogen"] - 10 <= sensor_data["nitrogen"] <= plant["optimal_nitrogen"] + 10
        phosphorus_good = plant["optimal_phosphorus"] - 10 <= sensor_data["phosphorus"] <= plant["optimal_phosphorus"] + 10
        potassium_good = plant["optimal_potassium"] - 10 <= sensor_data["potassium"] <= plant["optimal_potassium"] + 10
        moisture_good = plant["optimal_moisture"] - 5 <= sensor_data["moisture"] <= plant["optimal_moisture"] + 5

        if ph_good and nitrogen_good and phosphorus_good and potassium_good and moisture_good:
            st.success(f"Conditions are optimal for {plant['plant_name']}.")
        else:
            st.warning(f"Suboptimal conditions detected for {plant['plant_name']}.")

# Main app function
def main():
    st.sidebar.title("Dashboard")
    app_mode = st.sidebar.selectbox("Select Page", ["Home", "About", "Disease Recognition", "Soil Condition Analysis"])

    # Home page
    if app_mode == "Home":
        logo_path = "D:\\deep\\logo.png"
        logo_base64 = get_image_as_base64(logo_path)

        title_html = f"""
        <div style="display: flex; align-items: center; justify-content: center;">
            <img src="data:image/png;base64,{logo_base64}" alt="logo" style="width:50px; margin-right:10px;">
            <h1 style='text-align: center;'>AgriShield</h1>
        </div>
        """
        st.markdown(title_html, unsafe_allow_html=True)
        st.markdown("# Welcome to the Plant Disease Recognition System!")

        # Embed the video
        video_path = "D:\\deep\\farmer-app-screen-1.mp4"
        video_html = f"""
        <video width="100%" height="auto" autoplay loop muted>
            <source src="data:video/mp4;base64,{base64.b64encode(open(video_path, 'rb').read()).decode()}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        """
        st.markdown(video_html, unsafe_allow_html=True)

    # About page
    elif app_mode == "About":
        st.header("About")
        st.markdown("""
            #### About Dataset
            This dataset is recreated using offline augmentation from the original dataset. The original dataset can be found on this GitHub repo.
            This dataset consists of about 33K RGB images of healthy and diseased crop leaves which are categorized into 23 different classes. The total dataset is divided into 80/20 ratio of training and validation set, preserving the directory structure.
            A new directory containing 33 test images is created later for prediction purposes.
            #### Content
            1. train (33295 images)
            2. test (33 images)
            3. validation (10572 images)
        """)

    # Disease Recognition page
    elif app_mode == "Disease Recognition":
        st.header("Disease Recognition")
        test_image = st.file_uploader("Choose an Image:")
        if test_image is not None:
            st.image(test_image, width=400, use_column_width=True)
            if st.button("Predict"):
                with st.spinner('Processing...'):
                    result_index = model_prediction(test_image)
                    class_name = [
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
                    st.success(f"Model is predicting it's a {class_name[result_index]}")

    # Soil Condition Analysis page
    elif app_mode == "Soil Condition Analysis":
        st.title("Real-Time Crop Condition Analyzer")
        sensor_data = get_sensor_data()

        st.write("Sensor Data:")
        st.json(sensor_data)

        st.write("Analyzing conditions...")
        analyze_conditions(sensor_data)

if __name__ == "__main__":
    main()
