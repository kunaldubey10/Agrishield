# AgriShield Deployment Script
# This script will guide you through deploying AgriShield

Write-Host "🚀 AgriShield Deployment Assistant" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check Git
Write-Host "Checking Git..." -ForegroundColor Cyan
$gitStatus = git status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git repository not initialized" -ForegroundColor Red
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - AgriShield production ready"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Deployment Options:" -ForegroundColor Cyan
Write-Host "1. Deploy Frontend to Vercel (Recommended)"
Write-Host "2. Setup for Backend deployment (Render)"
Write-Host "3. Full deployment guide"
Write-Host "4. Test locally first"
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🌐 Deploying Frontend to Vercel..." -ForegroundColor Green
        Write-Host ""
        
        # Check if Vercel CLI is installed
        $vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
        if (-not $vercelInstalled) {
            Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        Write-Host "✅ Vercel CLI ready" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Run: vercel login"
        Write-Host "2. Run: vercel"
        Write-Host "3. Follow the prompts"
        Write-Host "4. Run: vercel --prod (for production)"
        Write-Host ""
        Write-Host "Environment Variables to add in Vercel Dashboard:" -ForegroundColor Yellow
        Write-Host "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBsp9HE9NHDTM20vpqtX-TmdE6HnhVuBbI"
        Write-Host "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrishield-29fcc.firebaseapp.com"
        Write-Host "NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrishield-29fcc"
        Write-Host "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=agrishield-29fcc.firebasestorage.app"
        Write-Host "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=174962307951"
        Write-Host "NEXT_PUBLIC_FIREBASE_APP_ID=1:174962307951:web:64fa105fd24fa4931e6e9a"
        Write-Host "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-09GV96BJYF"
        Write-Host "NEXT_PUBLIC_OPENWEATHER_API_KEY=e15e7551cdb8ed7df8c7fd1833af7fec"
        Write-Host "NEXT_PUBLIC_AGMARKNET_API_KEY=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b"
        Write-Host "NEXT_PUBLIC_BACKEND_URL=https://agrishield-backend.onrender.com"
        Write-Host ""
    }
    "2" {
        Write-Host ""
        Write-Host "🔧 Backend Deployment Setup..." -ForegroundColor Green
        Write-Host ""
        Write-Host "✅ Backend files ready:" -ForegroundColor Green
        Write-Host "  • app.py - Flask application"
        Write-Host "  • requirements.txt - Dependencies"
        Write-Host "  • render.yaml - Render configuration"
        Write-Host ""
        Write-Host "📋 Steps for Render deployment:" -ForegroundColor Cyan
        Write-Host "1. Push code to GitHub (see option 3)"
        Write-Host "2. Go to: https://render.com/"
        Write-Host "3. Sign up/Login with GitHub"
        Write-Host "4. Click 'New +' → 'Web Service'"
        Write-Host "5. Select your repository"
        Write-Host "6. Configure:"
        Write-Host "   - Name: agrishield-backend"
        Write-Host "   - Root Directory: backend"
        Write-Host "   - Build Command: pip install -r requirements.txt"
        Write-Host "   - Start Command: gunicorn app:app"
        Write-Host "7. Add Environment Variables:"
        Write-Host "   - AGMARKNET_API_KEY=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b"
        Write-Host "   - FLASK_ENV=production"
        Write-Host "8. Click 'Create Web Service'"
        Write-Host ""
        Write-Host "⚠️ Note: Model file is too large for Git" -ForegroundColor Yellow
        Write-Host "You'll need to upload it separately or use cloud storage"
        Write-Host ""
    }
    "3" {
        Write-Host ""
        Write-Host "📚 Opening deployment guides..." -ForegroundColor Green
        Write-Host ""
        Write-Host "✅ Created deployment documentation:" -ForegroundColor Green
        Write-Host "  • DEPLOYMENT_GUIDE.md - Comprehensive guide"
        Write-Host "  • QUICK_DEPLOY.md - Quick start checklist"
        Write-Host ""
        Write-Host "📋 Quick Steps:" -ForegroundColor Cyan
        Write-Host "1. Push to GitHub:"
        Write-Host "   git add ."
        Write-Host "   git commit -m 'Ready for deployment'"
        Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/agrishield.git"
        Write-Host "   git push -u origin main"
        Write-Host ""
        Write-Host "2. Deploy Backend to Render:"
        Write-Host "   Visit: https://render.com/"
        Write-Host "   Connect GitHub → Select repo → Configure → Deploy"
        Write-Host ""
        Write-Host "3. Deploy Frontend to Vercel:"
        Write-Host "   Run: vercel login"
        Write-Host "   Run: vercel --prod"
        Write-Host ""
        Write-Host "4. Update Firebase:"
        Write-Host "   Add Vercel domain to authorized domains"
        Write-Host ""
        Write-Host "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
        Write-Host ""
    }
    "4" {
        Write-Host ""
        Write-Host "🧪 Testing Locally..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Backend Status:" -ForegroundColor Cyan
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:5000/health" -UseBasicParsing
            Write-Host "✅ Backend is running" -ForegroundColor Green
            Write-Host "   Status: $($response.StatusCode)"
            Write-Host "   Response: $($response.Content)"
        } catch {
            Write-Host "❌ Backend not running" -ForegroundColor Red
            Write-Host "   Start it with: cd backend; python app.py"
        }
        Write-Host ""
        Write-Host "Frontend Status:" -ForegroundColor Cyan
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 2
            Write-Host "✅ Frontend is running" -ForegroundColor Green
            Write-Host "   Status: $($response.StatusCode)"
        } catch {
            Write-Host "❌ Frontend not running" -ForegroundColor Red
            Write-Host "   Start it with: npm run dev"
        }
        Write-Host ""
        Write-Host "To start both servers:" -ForegroundColor Yellow
        Write-Host "Terminal 1: cd backend; python app.py"
        Write-Host "Terminal 2: npm run dev"
        Write-Host ""
    }
    default {
        Write-Host "Invalid choice. Please run again and select 1-4." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📚 Helpful Resources:" -ForegroundColor Cyan
Write-Host "• Vercel: https://vercel.com/"
Write-Host "• Render: https://render.com/"
Write-Host "• Firebase Console: https://console.firebase.google.com/"
Write-Host "• Full Guide: See DEPLOYMENT_GUIDE.md"
Write-Host ""
Write-Host "Need help? Check the deployment guides!" -ForegroundColor Yellow
Write-Host ""
