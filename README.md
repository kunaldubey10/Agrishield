# AgriShield - Modern Farming Solutions

AgriShield is an advanced AI-powered system designed to predict and manage crop diseases, helping farmers make proactive, data-driven decisions for crop health. By integrating machine learning with IoT and satellite data, AgriShield provides real-time insights and actionable recommendations to prevent disease spread, optimize irrigation, and improve overall farm management.

This project was created as part of the Smart India Hackathon 2024 under the Agriculture, FoodTech, and Rural Development theme.

## Features

- **Disease Detection using AI**: Upload crop images to detect diseases with 95%+ accuracy
- **NDVI Analysis**: Interactive map-based vegetation health monitoring using satellite data
- **Crop Information**: Detailed information about various crops and best practices
- **Market Prices**: Real-time commodity prices with interactive charts
- **Weather Updates**: Current weather conditions and forecasts
- **Agricultural News**: Real-time agricultural news and updates
- **Google Authentication**: Secure login with Firebase Google Auth
- **User Profile**: Personalized farmer profiles with farm information
- **Smart Farming Solutions**: Data-driven insights for better crop management
- IoT Integration (Coming Soon)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kunaldubey10/Agrishield.git
cd agrishield
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up the backend (Python Flask):
```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On Linux/Mac
source venv/bin/activate
pip install -r requirements.txt
```

4. Create a `.env.local` file in the root directory and add your environment variables:
```env
# Firebase Configuration (for Google Authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# News API (Optional - for real-time agricultural news)
NEWS_API_KEY=your-news-api-key

# Weather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
```

5. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Authentication
   - Copy your Firebase config and add it to `.env.local`

6. Run the development servers:
```bash
# Option 1: Run both frontend and backend together
npm run dev:all

# Option 2: Run separately
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend:venv
# Or use the startup script
cd backend
start.bat  # Windows
./start.sh # Linux/Mac
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
The backend will run on [http://localhost:5000](http://localhost:5000).

## Deployment

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Create a new project
4. Import your GitHub repository
5. Add your environment variables
6. Deploy!

### Deploying to GitHub Pages

1. Install gh-pages:
```bash
npm install gh-pages --save-dev
```

2. Add these scripts to your package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d out"
}
```

3. Update next.config.js:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

4. Deploy:
```bash
npm run deploy
```

## Future Updates

- Real-time monitoring using IoT devices
- Enhanced disease prediction models
- Integration with more satellite data providers
- Mobile application development
- Automated irrigation control

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenWeather API for weather data
- Google Earth Engine for NDVI analysis
- TensorFlow.js for disease detection
- Smart India Hackathon 2024
- All contributors and supporters of the project
