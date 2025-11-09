# 🚀 Quick Deploy Checklist

## ✅ Pre-Deployment Status

### Backend ✅
- [x] Flask app.py configured
- [x] requirements.txt with gunicorn
- [x] Health endpoint at /health
- [x] CORS configured
- [x] Environment variables ready
- [x] Agmarknet API integrated
- [x] Model loading logic ready

### Frontend ✅
- [x] Next.js app configured
- [x] Firebase integrated
- [x] Environment variables ready
- [x] vercel.json created
- [x] Build tested locally

### Configuration Files ✅
- [x] vercel.json - Vercel configuration
- [x] .vercelignore - Files to exclude from Vercel
- [x] backend/render.yaml - Render configuration
- [x] backend/requirements.txt - Python dependencies
- [x] .env.local - Environment variables

---

## 🎯 Step-by-Step Deployment

### Step 1: Test Locally (5 minutes)

```powershell
# Terminal 1: Start Backend
cd backend
python app.py
# Should see: "Starting Flask server on http://localhost:5000"

# Terminal 2: Test Backend
curl http://localhost:5000/health
# Should return: {"status":"healthy","model":"loaded"}

# Terminal 3: Start Frontend
cd ..
npm run dev
# Should see: "Ready on http://localhost:3000"
```

### Step 2: Prepare Git Repository (5 minutes)

```powershell
# Check if git is initialized
git status

# If not initialized:
git init
git add .
git commit -m "Initial commit - AgriShield production ready"

# Create repository on GitHub:
# 1. Go to https://github.com/new
# 2. Name: agrishield
# 3. Description: AgriShield - AI-powered Crop Disease Detection & Market Intelligence
# 4. Public or Private (your choice)
# 5. Don't initialize with README (we already have code)

# Add remote and push:
git remote add origin https://github.com/YOUR_USERNAME/agrishield.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend to Render (10 minutes)

1. **Go to Render**: https://render.com/
2. **Sign Up/Login** with GitHub
3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Select your repository: `agrishield`
   - Click "Connect"

4. **Configure Service**:
   ```
   Name: agrishield-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app --bind 0.0.0.0:$PORT
   ```

5. **Select Plan**: Free

6. **Environment Variables** (Click "Add Environment Variable"):
   ```
   AGMARKNET_API_KEY = 579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b
   FLASK_ENV = production
   PYTHON_VERSION = 3.11.0
   ```

7. **Create Web Service** (Click button)

8. **Wait for deployment** (~10 minutes)
   - Watch the logs in real-time
   - You'll see: "Installing dependencies... Building... Starting service..."
   - When done: "Deploy succeeded"

9. **Copy your backend URL**:
   ```
   https://agrishield-backend.onrender.com
   ```

10. **Test it**:
    ```powershell
    curl https://agrishield-backend.onrender.com/health
    ```

### ⚠️ IMPORTANT: Model File Issue

**Problem**: The model file (35.7 MB) is too large for Git.

**Quick Solution**:
```powershell
# Add to .gitignore
echo "*.keras" >> .gitignore
echo "*.h5" >> .gitignore

# Commit the change
git add .gitignore
git commit -m "Ignore large model files"
git push
```

**After Render deploys**, you'll need to upload the model:

**Option A: Use Render Shell**
1. In Render Dashboard → Your Service → Shell
2. Run:
   ```bash
   curl -o trained_model_tf215.keras https://your-storage-url/model.keras
   ```

**Option B: Store in Google Drive** (Recommended)
1. Upload `trained_model_tf215.keras` to Google Drive
2. Get shareable link
3. In `backend/app.py`, add download logic:
   ```python
   import urllib.request
   MODEL_URL = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
   if not os.path.exists('trained_model_tf215.keras'):
       print("Downloading model...")
       urllib.request.urlretrieve(MODEL_URL, 'trained_model_tf215.keras')
   ```

**Option C: Skip for now, use mock predictions**
- Comment out model loading
- Return mock predictions for testing
- Add model later

### Step 4: Deploy Frontend to Vercel (5 minutes)

1. **Install Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```powershell
   vercel login
   # Opens browser, authenticate
   ```

3. **Deploy**:
   ```powershell
   vercel
   ```

4. **Answer prompts**:
   ```
   ? Set up and deploy? Yes
   ? Which scope? Your account
   ? Link to existing project? No
   ? What's your project's name? agrishield
   ? In which directory is your code located? ./
   ? Want to override settings? No
   ```

5. **Add Environment Variables**:
   ```powershell
   # Add backend URL (from Render)
   vercel env add NEXT_PUBLIC_BACKEND_URL
   # Enter: https://agrishield-backend.onrender.com

   # Add Firebase variables
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   # Enter: AIzaSyBsp9HE9NHDTM20vpqtX-TmdE6HnhVuBbI

   # Repeat for all env variables...
   ```

6. **Deploy to Production**:
   ```powershell
   vercel --prod
   ```

7. **Get your URL**:
   ```
   ✅ https://agrishield.vercel.app
   ```

### Step 5: Update Firebase Settings (2 minutes)

1. **Go to Firebase Console**:
   https://console.firebase.google.com/project/agrishield-29fcc

2. **Add Authorized Domains**:
   - Authentication → Settings → Authorized domains
   - Click "Add domain"
   - Add: `agrishield.vercel.app`
   - Click "Add"

3. **Enable Google Sign-In** (if not done):
   - Authentication → Sign-in method
   - Google → Enable → Save

### Step 6: Test Production Deployment (5 minutes)

```powershell
# Test Backend
curl https://agrishield-backend.onrender.com/health
curl https://agrishield-backend.onrender.com/api/commodity-prices

# Test Frontend
# Open in browser: https://agrishield.vercel.app

# Test features:
# ✓ Home page loads
# ✓ Weather widget works
# ✓ Market prices load
# ✓ Google Sign-In works
# ✓ Navigation works
```

---

## 📊 Deployment Timeline

| Step | Time | Status |
|------|------|--------|
| Local testing | 5 min | ⏳ Not started |
| Git setup | 5 min | ⏳ Not started |
| Backend deploy | 10 min | ⏳ Not started |
| Model upload | 5 min | ⏳ Not started |
| Frontend deploy | 5 min | ⏳ Not started |
| Firebase config | 2 min | ⏳ Not started |
| Testing | 5 min | ⏳ Not started |
| **TOTAL** | **37 min** | - |

---

## 🔗 Quick Links

After deployment, save these:

```
Frontend: https://agrishield.vercel.app
Backend: https://agrishield-backend.onrender.com
GitHub: https://github.com/YOUR_USERNAME/agrishield
Vercel Dashboard: https://vercel.com/dashboard
Render Dashboard: https://dashboard.render.com/
Firebase Console: https://console.firebase.google.com/project/agrishield-29fcc
```

---

## 🚨 Common Issues & Quick Fixes

### Issue: Backend fails to start
```
Error: No module named 'gunicorn'
Fix: Check requirements.txt includes gunicorn==20.1.0
```

### Issue: Model not found
```
Error: Cannot load model
Fix: Upload model file or use mock predictions temporarily
```

### Issue: CORS error on frontend
```
Error: Blocked by CORS policy
Fix: Check backend URL in NEXT_PUBLIC_BACKEND_URL
```

### Issue: Firebase auth fails
```
Error: Domain not authorized
Fix: Add Vercel domain to Firebase authorized domains
```

---

## ✅ Success Criteria

Deployment is successful when:

- [ ] Backend health check returns 200 OK
- [ ] Frontend loads at Vercel URL
- [ ] Market prices page shows data
- [ ] Google Sign-In popup opens
- [ ] All pages navigate correctly
- [ ] No console errors
- [ ] HTTPS certificate active
- [ ] Both services auto-deploy on git push

---

## 🎯 Next: Choose Your Path

### Path A: Full Deployment (Recommended)
```powershell
# Follow all steps above
# Time: 37 minutes
# Result: Fully deployed production app
```

### Path B: Quick Test Deploy
```powershell
# Deploy without model file
# Use mock predictions temporarily
# Time: 15 minutes
# Result: Working app (without disease detection)
```

### Path C: Local + Cloud Hybrid
```powershell
# Deploy frontend only
# Keep backend running locally
# Time: 10 minutes
# Result: Public frontend, local backend
```

---

**Ready to deploy?** Start with Step 1! 🚀

**Need help?** Check DEPLOYMENT_GUIDE.md for detailed instructions.

**Last Updated**: November 9, 2025
