# AgriShield Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration (Required for Google Authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# News API (Optional - for real-time agricultural news)
NEWS_API_KEY=your-news-api-key

# Weather API (Already configured in next.config.js)
# NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
```

### 3. Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to Authentication → Sign-in method
4. Enable Google Authentication
5. Copy your Firebase config from Project Settings
6. Add the config values to `.env.local`

### 4. Run the Application

#### Option 1: Run Both Servers Together
```bash
npm run dev:all
```

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
# Windows
cd backend
start.bat

# Linux/Mac
cd backend
./start.sh

# Or use npm script
npm run backend:venv
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Features Implemented

### ✅ Fixed Issues

1. **Backend Python Path**: Fixed to use virtual environment
2. **Market Prices**: Now shows data correctly with interactive charts
3. **NDVI Analysis**: Made user-friendly with map-based selection
4. **Agricultural Updates**: Added real-time news API integration
5. **Google Authentication**: Implemented Firebase Google Auth

### ✅ NDVI Analysis Improvements

- Interactive map with drawing tools
- Click-to-select area functionality
- Auto-filled date ranges (last 30 days)
- Better visualizations and status indicators
- Clear instructions for users

### ✅ Market Prices Improvements

- Shows all commodity prices in cards
- Interactive price charts
- 30-day high/low indicators
- Click-to-select commodities
- Fallback data if backend is unavailable

### ✅ Agricultural Updates

- Real-time news API integration
- Category filtering
- Search functionality
- Auto-refresh every 5 minutes
- Beautiful card-based layout

### ✅ Profile Page

- Google Authentication integration
- User profile management
- Farm information storage
- Profile picture from Google
- Secure sign-in/sign-out

## Troubleshooting

### Backend Not Starting

If the backend fails to start:

1. Check if virtual environment is activated
2. Verify Python version (3.8+)
3. Check if all dependencies are installed
4. Try running manually:
   ```bash
   cd backend
   python app.py
   ```

### Firebase Authentication Not Working

1. Verify Firebase config in `.env.local`
2. Check if Google Authentication is enabled in Firebase Console
3. Verify API keys are correct
4. Check browser console for errors

### Market Prices Not Showing

1. Check if backend is running on port 5000
2. Verify CORS is enabled in backend
3. Check browser console for errors
4. Application will show fallback data if backend is unavailable

### NDVI Map Not Loading

1. Check internet connection (map tiles require internet)
2. Verify Leaflet library is installed
3. Check browser console for errors
4. Try refreshing the page

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Backend (Heroku/Railway)

1. Create `Procfile`:
   ```
   web: gunicorn app:app
   ```
2. Deploy to Heroku or Railway
3. Add environment variables
4. Configure CORS for your frontend domain

## Additional Notes

- The ML model should be placed in the root directory as `trained_model.keras` or `AgriShield.keras`
- Backend will use fallback predictions if model is not found
- All user data is stored in localStorage (consider using a database for production)
- News API requires an API key from newsapi.org (free tier available)

