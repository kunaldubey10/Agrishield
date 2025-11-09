import os
import subprocess

def convert_model():
    # Create output directory if it doesn't exist
    os.makedirs('public/trained_model', exist_ok=True)
    
    # Convert the model using tensorflowjs_converter
    subprocess.run([
        'tensorflowjs_converter',
        '--input_format=keras',
        'trained_model.h5',
        'public/trained_model'
    ])

if __name__ == '__main__':
    convert_model() 