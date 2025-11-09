# Disease Detection Backend

This is the Flask backend for the Agrishield disease detection feature. It uses a TensorFlow model to analyze crop images and detect diseases.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Place your trained model file (`trained_model.keras`) in the backend directory.

4. Run the server:
```bash
python app.py
```

The server will start on `http://localhost:5000`.

## API Endpoints

### POST /predict
Analyzes an image and returns disease detection results.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: image file

**Response:**
```json
{
  "disease": "string",
  "confidence": number,
  "all_predictions": number[]
}
```

## Deployment

For production deployment:
1. Use Gunicorn as the WSGI server
2. Set up proper environment variables
3. Use a reverse proxy like Nginx
4. Enable CORS for your frontend domain 