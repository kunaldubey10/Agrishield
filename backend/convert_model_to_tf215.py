"""
Model Converter for TensorFlow 2.15
Converts older Keras models to TensorFlow 2.15 compatible format
"""

import tensorflow as tf
import numpy as np
import os
import json

print(f"TensorFlow version: {tf.__version__}")

# Define the model architecture (adjust based on your model)
def create_model_architecture(input_shape=(128, 128, 3), num_classes=23):
    """
    Create a model architecture compatible with TF 2.15
    Adjust this based on your original model structure
    """
    model = tf.keras.Sequential([
        tf.keras.layers.InputLayer(input_shape=input_shape),
        
        # Convolutional layers
        tf.keras.layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        
        tf.keras.layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        
        tf.keras.layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        
        tf.keras.layers.Conv2D(256, (3, 3), activation='relu', padding='same'),
        tf.keras.layers.MaxPooling2D((2, 2)),
        
        # Dense layers
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(256, activation='relu'),
        tf.keras.layers.Dropout(0.5),
        tf.keras.layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

def convert_old_model(old_model_path, new_model_path):
    """
    Attempt to convert old model to new format
    """
    try:
        print(f"Attempting to load old model from: {old_model_path}")
        
        # Try loading with different methods
        try:
            # Method 1: Direct load with custom objects
            model = tf.keras.models.load_model(
                old_model_path,
                custom_objects=None,
                compile=False
            )
            print("✓ Loaded model successfully")
        except Exception as e1:
            print(f"Method 1 failed: {e1}")
            
            # Method 2: Load weights only
            try:
                # Create new model
                model = create_model_architecture()
                model.load_weights(old_model_path)
                print("✓ Loaded weights successfully")
            except Exception as e2:
                print(f"Method 2 failed: {e2}")
                raise Exception("Could not load model with any method")
        
        # Save in new format
        model.save(new_model_path, save_format='keras')
        print(f"✓ Model saved successfully to: {new_model_path}")
        
        # Verify the new model
        test_model = tf.keras.models.load_model(new_model_path)
        print("✓ Verified: New model loads correctly")
        
        # Test prediction
        test_input = np.random.rand(1, 128, 128, 3).astype(np.float32)
        prediction = test_model.predict(test_input, verbose=0)
        print(f"✓ Test prediction shape: {prediction.shape}")
        
        return True
        
    except Exception as e:
        print(f"✗ Conversion failed: {e}")
        return False

def create_new_model_from_scratch():
    """
    Create a brand new model if conversion fails
    """
    print("\nCreating new model from scratch...")
    
    model = create_model_architecture(num_classes=23)
    
    # Save the model
    new_model_path = 'trained_model_new.keras'
    model.save(new_model_path, save_format='keras')
    print(f"✓ New model created and saved to: {new_model_path}")
    
    # Create class labels file
    disease_classes = [
        'Healthy',
        'Bacterial Blight',
        'Brown Spot',
        'Leaf Blast',
        'Leaf Scald',
        'Narrow Brown Spot',
        'Rice Tungro',
        'Sheath Blight',
        'Apple Scab',
        'Black Rot',
        'Cedar Apple Rust',
        'Corn Gray Leaf Spot',
        'Corn Common Rust',
        'Northern Leaf Blight',
        'Grape Black Rot',
        'Grape Leaf Blight',
        'Potato Early Blight',
        'Potato Late Blight',
        'Tomato Bacterial Spot',
        'Tomato Early Blight',
        'Tomato Late Blight',
        'Tomato Leaf Mold',
        'Tomato Septoria Leaf Spot'
    ]
    
    # Save disease classes
    with open('disease_classes.json', 'w') as f:
        json.dump(disease_classes, f, indent=2)
    print("✓ Disease classes saved to: disease_classes.json")
    
    return model

if __name__ == '__main__':
    print("=" * 60)
    print("TensorFlow 2.15 Model Converter")
    print("=" * 60)
    
    # Define paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    old_model_paths = [
        os.path.join(base_dir, 'trained_model.keras'),
        os.path.join(base_dir, 'AgriShield.keras'),
        'trained_model.keras',
        'AgriShield.keras'
    ]
    
    new_model_path = 'trained_model_tf215.keras'
    
    # Try to convert existing model
    conversion_success = False
    for old_path in old_model_paths:
        if os.path.exists(old_path):
            print(f"\nFound model at: {old_path}")
            if convert_old_model(old_path, new_model_path):
                conversion_success = True
                break
    
    # If conversion failed, create new model
    if not conversion_success:
        print("\n" + "=" * 60)
        print("Creating new model template...")
        print("=" * 60)
        create_new_model_from_scratch()
        print("\n⚠ NOTE: This is a new untrained model!")
        print("You need to train it with your dataset for actual predictions.")
        print("\nTo train the model:")
        print("1. Prepare your labeled dataset")
        print("2. Update the train.py script")
        print("3. Run: python train.py")
    
    print("\n" + "=" * 60)
    print("Conversion process complete!")
    print("=" * 60)
