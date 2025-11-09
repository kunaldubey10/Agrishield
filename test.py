import numpy as np 
import tensorflow as tf 
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import os
print(os.getcwd())
model = tf.keras.models.load_model('AgriShield.keras')
model.summary()
import cv2
# Path to the image file
image_path = r"D:\deep\archive\test\test\PotatoEarlyBlight4.JPG"

# Check if the file exists
if os.path.exists(image_path):
    print("File exists. Proceeding to read and display the image.")
    
    # Reading the image using OpenCV
    img = cv2.imread(image_path)

    # Check if the image is loaded properly
    if img is None:
        print("Error: Image could not be read. Please check the file format or permissions.")
    else:
        # Convert BGR to RGB format for correct display in Matplotlib
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Displaying the image using Matplotlib
        plt.imshow(img_rgb)
        plt.title("Test Image")
        plt.xticks([])  # Hide x-axis ticks
        plt.yticks([])  # Hide y-axis ticks
        plt.show()
else:
    print("Error: File does not exist at the specified path.")
import cv2
image_path = r"D:\deep\archive\test\test\PotatoEarlyBlight4.JPG"
#Reading Image
img=cv2.imread(image_path)

#Displaying
plt.imshow(img)
plt.title("Test Image")
plt.xticks([])
plt.yticks([])
plt.show()
image =tf.keras.preprocessing.image.load_img(image_path,target_size=(128,128))
input_arr =tf.keras.preprocessing.image.img_to_array(image)
input_arr=np.array([input_arr]) 
print(input_arr.shape)
prediction=model.predict(input_arr)
prediction,prediction.shape
result_index=np.argmax(prediction)
result_index
print(prediction)
class_name= ['Apple___Apple_scab',
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
 'Potato___healthy']
#Displaying Result of disease prediction 
model_prediction=class_name[result_index]
plt.imshow(img)
plt.title(f"Disease Name: {model_prediction} ")
plt.xticks([])
plt.yticks([])
plt.show()

        # Displaying Result of disease prediction
model_prediction = class_name[result_index]  # Get the class name
plt.imshow(img_rgb)
plt.title(f"Disease Name: {model_prediction}")
plt.xticks([])  # Hide x-axis ticks
plt.yticks([])  # Hide y-axis ticks
plt.show()

model_prediction
