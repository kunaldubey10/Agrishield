# 🚀 AgriShield Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- ✅ Backend running locally on port 5000
- ✅ Frontend running locally on port 3000
- ✅ Firebase authentication configured
- ✅ All environment variables set
- ✅ Model file (trained_model_tf215.keras) present in backend/
- ✅ Git repository initialized

---

## 🎯 Recommended Deployment Strategy

### **Frontend**: Vercel (Next.js)
### **Backend**: Render (Flask API)

This combination provides:
- ✅ **Free tier** for both services
- ✅ **Automatic deployments** from Git
- ✅ **Global CDN** for frontend
- ✅ **Separate scaling** for frontend/backend
- ✅ **Easy environment management**

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

1. **Add Gunicorn** (already done):
```bash
# Already added to requirements.txt
gunicorn==20.1.0
```

2. **Create Health Check Endpoint** in `backend/app.py`:
```python
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "AgriShield Backend Running"}), 200
```

### Step 2: Create Render Account

1. Go to: https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)

### Step 3: Deploy Backend

1. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `agrishield` repository

2. **Configure Service**:
   ```
   Name: agrishield-backend
   Region: Singapore (closest to India)
   Branch: main (or master)
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn app:app
   ```

3. **Select Plan**:
   - Choose "Free" plan
   - Note: Free tier sleeps after 15 min of inactivity

4. **Add Environment Variables**:
   ```
   AGMARKNET_API_KEY = 579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b
   FLASK_ENV = production
   ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - You'll get a URL like: `https://agrishield-backend.onrender.com`

6. **Test Backend**:
   ```bash
   # Test health endpoint
   curl https://agrishield-backend.onrender.com/health
   
   # Test commodity prices
   curl https://agrishield-backend.onrender.com/api/commodity-prices
   ```

### ⚠️ Important: Model File Size Issue

The model file (`trained_model_tf215.keras` - 35.7 MB) is too large for Git.

**Solution Options**:

**Option A: Use Render Disk Storage** (Recommended)
1. In Render dashboard → Your service → Settings
2. Add persistent disk: `/opt/render/project/src/backend`
3. Upload model via SFTP or during build

**Option B: Use Cloud Storage** (Best for Production)
1. Upload model to Google Cloud Storage or AWS S3
2. Modify `app.py` to download model on startup:
```python
import urllib.request
MODEL_URL = "https://your-storage-url/trained_model_tf215.keras"
if not os.path.exists('trained_model_tf215.keras'):
    urllib.request.urlretrieve(MODEL_URL, 'trained_model_tf215.keras')
```

**Option C: Git LFS** (Alternative)
```bash
cd backend
git lfs install
git lfs track "*.keras"
git add .gitattributes
git add trained_model_tf215.keras
git commit -m "Add model with LFS"
```

---

## 🌐 Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. **Update API URLs** in your code to use environment variable:

In `app/api/predict/route.ts` and other API routes, change:
```typescript
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
```

2. **Build locally to test**:
```bash
npm run build
```

### Step 2: Create Vercel Account

1. Go to: https://vercel.com/
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

### Step 3: Deploy to Vercel

#### Option A: CLI Deployment (Fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? agrishield
# - Directory? ./ (root)
# - Override settings? No
```

#### Option B: GitHub Integration (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import in Vercel**:
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure:
     ```
     Framework Preset: Next.js
     Root Directory: ./
     Build Command: npm run build
     Output Directory: .next
     Install Command: npm install
     ```

3. **Add Environment Variables** in Vercel:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBsp9HE9NHDTM20vpqtX-TmdE6HnhVuBbI
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrishield-29fcc.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrishield-29fcc
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=agrishield-29fcc.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=174962307951
   NEXT_PUBLIC_FIREBASE_APP_ID=1:174962307951:web:64fa105fd24fa4931e6e9a
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-09GV96BJYF
   NEXT_PUBLIC_OPENWEATHER_API_KEY=e15e7551cdb8ed7df8c7fd1833af7fec
   NEXT_PUBLIC_AGMARKNET_API_KEY=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b
   NEXT_PUBLIC_BACKEND_URL=https://agrishield-backend.onrender.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `https://agrishield.vercel.app`

### Step 4: Configure Custom Domain (Optional)

1. In Vercel → Settings → Domains
2. Add your domain: `agrishield.com`
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## 🔥 Part 3: Update Firebase Configuration

### Add Production Domains to Firebase

1. **Go to Firebase Console**:
   - https://console.firebase.google.com/project/agrishield-29fcc

2. **Add Authorized Domains**:
   - Authentication → Settings → Authorized domains
   - Add:
     ```
     agrishield.vercel.app
     agrishield-backend.onrender.com
     yourdomain.com (if using custom domain)
     ```

3. **Update OAuth Redirect URIs**:
   - If using Google Sign-In
   - Add production URLs to authorized redirect URIs

---

## ⚙️ Part 4: Configure CORS for Backend

Update `backend/app.py`:

```python
from flask_cors import CORS

# Update CORS configuration
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://agrishield.vercel.app",
            "https://*.vercel.app"  # All Vercel preview deployments
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

---

## 🧪 Part 5: Test Production Deployment

### Frontend Testing:
```bash
# Visit your Vercel URL
https://agrishield.vercel.app

# Test pages:
✓ Home page loads
✓ Weather widget shows data
✓ Market prices page (with Agmarknet API)
✓ Disease detection uploads images
✓ Google Sign-In works
✓ All navigation links work
```

### Backend Testing:
```bash
# Health check
curl https://agrishield-backend.onrender.com/health

# Commodity prices
curl https://agrishield-backend.onrender.com/api/commodity-prices

# Prediction endpoint (with image)
curl -X POST -F "file=@test_image.jpg" \
  https://agrishield-backend.onrender.com/predict
```

### Integration Testing:
1. Open production site
2. Upload disease image
3. Check if prediction works
4. View market prices
5. Test Google authentication
6. Check all features work

---

## 🔄 Continuous Deployment Setup

### Automatic Deployments:

**Vercel** (Frontend):
- ✅ Auto-deploys on every `git push` to main branch
- ✅ Preview deployments for pull requests
- ✅ Rollback to previous deployments anytime

**Render** (Backend):
- ✅ Auto-deploys on every `git push` to main branch
- ✅ Can configure to deploy on specific branch
- ✅ Manual deploy trigger available

### Workflow:
```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel and Render automatically deploy
# Check deployment status in dashboards
```

---

## 📊 Monitoring & Logs

### Vercel Logs:
- Dashboard → Your Project → Deployments
- Real-time logs during deployment
- Runtime logs for serverless functions

### Render Logs:
- Dashboard → Your Service → Logs
- Real-time application logs
- Error tracking
- Performance metrics

### Firebase Logs:
- Console → Authentication → Users
- Analytics → Events
- Crashlytics (if configured)

---

## 🚨 Troubleshooting Common Issues

### Issue 1: Backend Not Loading Model
**Symptom**: 500 error on `/predict`
**Solution**: 
- Check model file is uploaded to Render
- Verify file path in app.py
- Check Render logs for TensorFlow errors

### Issue 2: CORS Errors
**Symptom**: "blocked by CORS policy"
**Solution**:
- Update CORS origins in backend/app.py
- Add Vercel URL to allowed origins
- Redeploy backend

### Issue 3: Firebase Auth Not Working
**Symptom**: "Domain not authorized"
**Solution**:
- Add Vercel domain to Firebase authorized domains
- Check .env variables in Vercel
- Clear browser cache and test

### Issue 4: Environment Variables Not Working
**Symptom**: API keys undefined
**Solution**:
- Check all env vars in Vercel dashboard
- Ensure they start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding env vars

### Issue 5: Backend Sleeping (Render Free Tier)
**Symptom**: First request takes 30+ seconds
**Solution**:
- Use cron job to ping backend every 14 minutes
- Upgrade to paid plan ($7/month)
- Show loading message to users

---

## 💰 Cost Breakdown

### Free Tier (Recommended for Start):
- **Vercel**: Free (Hobby plan)
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Free SSL
  
- **Render**: Free
  - 750 hours/month
  - Sleeps after 15 min inactivity
  - 512 MB RAM
  
- **Firebase**: Free (Spark plan)
  - 10K authentication users
  - 1 GB storage
  - Limited Analytics

**Total: $0/month** ✅

### Paid Tier (For Production):
- **Vercel Pro**: $20/month
  - Unlimited bandwidth
  - Team collaboration
  - Advanced analytics
  
- **Render Starter**: $7/month
  - Always on
  - 512 MB RAM
  - Better performance
  
- **Firebase Blaze**: Pay as you go
  - ~$10-50/month (typical)

**Total: ~$37-77/month**

---

## 🎯 Quick Deploy Commands

### Initial Setup:
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy frontend
vercel --prod

# 4. Push to GitHub (triggers Render deployment)
git add .
git commit -m "Production deployment"
git push origin main
```

### Update Deployment:
```bash
# Just push to GitHub
git add .
git commit -m "Update features"
git push origin main

# Both services auto-deploy ✨
```

---

## 📝 Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Model file accessible in backend
- [ ] All environment variables configured
- [ ] Firebase domains authorized
- [ ] CORS configured correctly
- [ ] Google Sign-In tested
- [ ] Disease detection tested
- [ ] Market prices loading
- [ ] Weather widget working
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error tracking setup

---

## 🎉 Success Indicators

When deployment is successful, you should see:

### Vercel Dashboard:
```
✅ Building...
✅ Deploying...
✅ Ready
```

### Render Dashboard:
```
✅ Build successful
✅ Deploy live
✅ Health checks passing
```

### Your Site:
```
✅ Site loads at https://agrishield.vercel.app
✅ All features working
✅ No console errors
✅ Fast load times
✅ Secure (HTTPS)
```

---

## 🔗 Useful Links

**Deployment Platforms**:
- Vercel: https://vercel.com/
- Render: https://render.com/
- Firebase: https://console.firebase.google.com/

**Documentation**:
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Next.js Deploy: https://nextjs.org/docs/deployment

**Monitoring**:
- Vercel Analytics: https://vercel.com/analytics
- Render Metrics: https://render.com/docs/metrics
- Firebase Console: https://console.firebase.google.com/

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs in dashboards
3. Test locally first: `npm run dev` and `python app.py`
4. Check environment variables are set correctly
5. Verify all APIs are accessible

**Remember**: First deployment takes longer. Subsequent deployments are faster!

---

**Last Updated**: November 9, 2025
**Status**: Ready for Production Deployment 🚀
