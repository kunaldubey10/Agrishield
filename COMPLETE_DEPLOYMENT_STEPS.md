# 🚀 COMPLETE DEPLOYMENT GUIDE - STEP BY STEP

## ✅ Your Google Drive Link Ready!
**File ID**: `1bRTb1AKSvKEmifyYvXPXyKbFz73OithC`
**Download URL**: `https://drive.google.com/uc?export=download&id=1bRTb1AKSvKEmifyYvXPXyKbFz73OithC`

---

## 📋 DEPLOYMENT STEPS (40 minutes total)

### PHASE 1: PREPARE CODE (5 minutes)

#### Step 1.1: Check Git Status
```powershell
cd "c:\Users\KUNAL KUMAR DUBEY\Agrishield"
git status
```

**If you see "fatal: not a git repository"**, run:
```powershell
git init
```

#### Step 1.2: Add .gitignore for Large Files
```powershell
# Create .gitignore to exclude model files
echo "*.keras" >> .gitignore
echo "*.h5" >> .gitignore
echo "node_modules/" >> .gitignore
echo "venv/" >> .gitignore
echo "__pycache__/" >> .gitignore
echo ".env" >> .gitignore
echo ".next/" >> .gitignore
```

#### Step 1.3: Commit All Changes
```powershell
git add .
git commit -m "Ready for deployment with automatic model download"
```

---

### PHASE 2: PUSH TO GITHUB (5 minutes)

#### Step 2.1: Create GitHub Repository

**Go to**: https://github.com/new

**Fill in**:
- Repository name: `agrishield`
- Description: `AgriShield - AI-powered Crop Disease Detection`
- Visibility: **Public** (or Private if you prefer)
- **DO NOT** check "Initialize with README" (we already have code)

**Click**: "Create repository"

#### Step 2.2: Connect Local Repo to GitHub

**Copy the commands shown on GitHub**, they look like:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/agrishield.git
git branch -M main
git push -u origin main
```

**Replace YOUR_USERNAME** with your actual GitHub username, then run:
```powershell
# Example (replace with YOUR username):
git remote add origin https://github.com/kunalkumar/agrishield.git
git branch -M main
git push -u origin main
```

**You'll be asked to login** - use your GitHub credentials.

**Wait** - Upload takes 2-3 minutes (without the 35MB model file!)

✅ **Success**: Code is now on GitHub!

---

### PHASE 3: DEPLOY BACKEND TO RENDER (15 minutes)

#### Step 3.1: Create Render Account

**Go to**: https://render.com/

**Click**: "Get Started for Free"

**Sign Up With**: GitHub (recommended - click "GitHub" button)

**Authorize**: Allow Render to access your repositories

#### Step 3.2: Create Web Service

**Click**: "New +" button (top right)

**Select**: "Web Service"

**You'll see**: List of your GitHub repositories

**Find and Click**: `agrishield` repository

**Click**: "Connect"

#### Step 3.3: Configure Service

**Fill in these settings**:

| Field | Value |
|-------|-------|
| **Name** | `agrishield-backend` |
| **Region** | Singapore (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app` |

#### Step 3.4: Select Plan

**Choose**: "Free" (scroll down to find it)

**Free tier includes**:
- 512 MB RAM
- Shared CPU
- 750 hours/month
- Sleeps after 15 min inactivity

#### Step 3.5: Add Environment Variables

**Scroll down to "Environment Variables"**

**Click**: "Add Environment Variable"

**Add these THREE variables**:

**Variable 1**:
- Key: `AGMARKNET_API_KEY`
- Value: `579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b`

**Variable 2**:
- Key: `FLASK_ENV`
- Value: `production`

**Variable 3**:
- Key: `MODEL_DOWNLOAD_URL`
- Value: `https://drive.google.com/uc?export=download&id=1bRTb1AKSvKEmifyYvXPXyKbFz73OithC`

**Variable 4**:
- Key: `PYTHON_VERSION`
- Value: `3.11.0`

#### Step 3.6: Create Web Service

**Click**: "Create Web Service" button (at the bottom)

**Wait**: 10-15 minutes for first deployment

**You'll see**:
```
Building...
Installing dependencies...
Downloading model from Google Drive... (35.7 MB)
Starting server...
Deploy succeeded ✅
```

#### Step 3.7: Get Your Backend URL

**After deployment succeeds**, you'll see:
```
Your service is live at:
https://agrishield-backend.onrender.com
```

**Copy this URL** - you'll need it for frontend!

#### Step 3.8: Test Backend

**Click** on the URL or run:
```powershell
curl https://agrishield-backend.onrender.com/health
```

**You should see**:
```json
{
  "status": "healthy",
  "model": "loaded"
}
```

✅ **Success**: Backend is deployed!

---

### PHASE 4: DEPLOY FRONTEND TO VERCEL (10 minutes)

#### Step 4.1: Install Vercel CLI

```powershell
npm install -g vercel
```

**Wait**: ~30 seconds for installation

#### Step 4.2: Login to Vercel

```powershell
vercel login
```

**You'll see**: "Enter your email:"

**Enter your email** and press Enter

**Check your email** - Vercel sends verification link

**Click the link** in email to verify

**Return to terminal** - should say "Logged in!"

#### Step 4.3: Deploy to Vercel

```powershell
cd "c:\Users\KUNAL KUMAR DUBEY\Agrishield"
vercel
```

**Answer the prompts**:

```
? Set up and deploy "C:\Users\KUNAL KUMAR DUBEY\Agrishield"? 
➜ Yes

? Which scope do you want to deploy to? 
➜ [Your Account Name]

? Link to existing project? 
➜ No

? What's your project's name? 
➜ agrishield

? In which directory is your code located? 
➜ ./ (just press Enter)

? Want to modify these settings? 
➜ No
```

**Wait**: 2-3 minutes for deployment

**You'll see**:
```
✅ Deployed to production
https://agrishield-abc123.vercel.app
```

**This is a preview URL** - we'll deploy to production next.

#### Step 4.4: Add Environment Variables to Vercel

**Go to**: https://vercel.com/dashboard

**Click**: Your project "agrishield"

**Click**: "Settings" tab

**Click**: "Environment Variables" (left sidebar)

**Add these variables ONE BY ONE**:

**Variable 1**:
- Key: `NEXT_PUBLIC_FIREBASE_API_KEY`
- Value: `AIzaSyBsp9HE9NHDTM20vpqtX-TmdE6HnhVuBbI`
- Environment: Production ✅ Preview ✅ Development ✅

**Variable 2**:
- Key: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- Value: `agrishield-29fcc.firebaseapp.com`
- Environment: All ✅

**Variable 3**:
- Key: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- Value: `agrishield-29fcc`
- Environment: All ✅

**Variable 4**:
- Key: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- Value: `agrishield-29fcc.firebasestorage.app`
- Environment: All ✅

**Variable 5**:
- Key: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- Value: `174962307951`
- Environment: All ✅

**Variable 6**:
- Key: `NEXT_PUBLIC_FIREBASE_APP_ID`
- Value: `1:174962307951:web:64fa105fd24fa4931e6e9a`
- Environment: All ✅

**Variable 7**:
- Key: `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- Value: `G-09GV96BJYF`
- Environment: All ✅

**Variable 8**:
- Key: `NEXT_PUBLIC_OPENWEATHER_API_KEY`
- Value: `e15e7551cdb8ed7df8c7fd1833af7fec`
- Environment: All ✅

**Variable 9**:
- Key: `NEXT_PUBLIC_AGMARKNET_API_KEY`
- Value: `579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b`
- Environment: All ✅

**Variable 10** (IMPORTANT - Your Backend URL):
- Key: `NEXT_PUBLIC_BACKEND_URL`
- Value: `https://agrishield-backend.onrender.com` (Use YOUR actual backend URL from Step 3.7)
- Environment: All ✅

#### Step 4.5: Deploy to Production

**After adding all variables**, go back to terminal:

```powershell
vercel --prod
```

**Wait**: 2-3 minutes

**You'll see**:
```
✅ Production deployment ready
https://agrishield.vercel.app
```

**Copy this URL** - this is your live website!

✅ **Success**: Frontend is deployed!

---

### PHASE 5: CONFIGURE FIREBASE (5 minutes)

#### Step 5.1: Add Vercel Domain to Firebase

**Go to**: https://console.firebase.google.com/project/agrishield-29fcc

**Click**: "Authentication" (left sidebar)

**Click**: "Settings" tab (top)

**Click**: "Authorized domains"

**Click**: "Add domain" button

**Add**: `agrishield.vercel.app` (use YOUR actual Vercel domain)

**Click**: "Add"

#### Step 5.2: Enable Google Sign-In

**Still in Firebase Console**:

**Click**: "Sign-in method" tab

**Find**: "Google" in the list

**Click**: "Google"

**Toggle**: Enable to **ON**

**Add**: Your support email (your Gmail)

**Click**: "Save"

✅ **Success**: Firebase configured!

---

## 🎉 DEPLOYMENT COMPLETE!

### Your Live URLs:

**Frontend**: `https://agrishield.vercel.app`
**Backend**: `https://agrishield-backend.onrender.com`

---

## 🧪 FINAL TESTING (5 minutes)

### Test 1: Backend Health Check

**Open in browser**:
```
https://agrishield-backend.onrender.com/health
```

**Should see**:
```json
{
  "status": "healthy",
  "model": "loaded"
}
```

### Test 2: Commodity Prices API

**Open**:
```
https://agrishield-backend.onrender.com/api/commodity-prices
```

**Should see**: JSON with commodity data

### Test 3: Frontend Home Page

**Open**:
```
https://agrishield.vercel.app
```

**Should see**: Your AgriShield homepage loads

### Test 4: Market Prices Page

**Navigate to**: Market Prices (from menu)

**Should see**: Commodity price cards with data

### Test 5: Google Sign-In

**Navigate to**: Sign In page

**Click**: "Sign in with Google"

**Select**: Your Google account

**Should**: Redirect to profile page

### Test 6: Disease Detection

**Navigate to**: Disease Detection page

**Upload**: A crop disease image

**Should**: Get prediction results

---

## ✅ DEPLOYMENT CHECKLIST

Mark as you complete:

- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Model downloaded on Render (check logs)
- [ ] Backend health check passing
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] All environment variables added
- [ ] Production deployment done
- [ ] Firebase domains authorized
- [ ] Google Sign-In enabled
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] All features tested

---

## 🚨 TROUBLESHOOTING

### Issue: Git push fails

**Error**: "failed to push some refs"

**Solution**:
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue: Render build fails

**Check**: Build logs in Render dashboard

**Common fixes**:
- Verify `backend/requirements.txt` exists
- Check Python version (should be 3.11)
- Verify gunicorn is in requirements.txt

### Issue: Model download fails on Render

**Check**: Render logs should show "Downloading model from Google Drive..."

**Fix**: 
1. Go to Google Drive
2. Make sure file sharing is "Anyone with the link"
3. Verify the MODEL_DOWNLOAD_URL in Render env vars

### Issue: Frontend shows 404 errors

**Check**: Environment variables in Vercel

**Fix**: Make sure NEXT_PUBLIC_BACKEND_URL points to your Render URL

### Issue: CORS errors

**Error**: "Blocked by CORS policy"

**Fix**: Backend already has CORS enabled. Clear browser cache and try again.

### Issue: Firebase auth fails

**Error**: "This domain is not authorized"

**Fix**: Add your Vercel domain to Firebase authorized domains (Step 5.1)

---

## 🔄 FUTURE UPDATES

**After initial deployment**, updates are automatic:

```powershell
# Make changes to your code
git add .
git commit -m "Update feature"
git push

# Both Vercel and Render auto-deploy! ✨
```

**No need to redeploy manually** - Just push to GitHub!

---

## 💰 COST

**Total**: **$0/month** (100% FREE)

- Render Free Tier: $0
- Vercel Free Tier: $0
- Firebase Spark Plan: $0
- Google Drive: $0

---

## 📞 NEED HELP?

**If something fails**:

1. **Check logs**:
   - Render: Dashboard → Your Service → Logs
   - Vercel: Dashboard → Your Project → Deployments → View logs

2. **Common fixes**:
   - Clear browser cache
   - Wait 1-2 minutes for deployment to propagate
   - Check environment variables are correct

3. **Still stuck?**
   - Check the error message in logs
   - Google the specific error
   - Review the troubleshooting section above

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. **Custom Domain** (Optional):
   - Vercel: Settings → Domains → Add custom domain
   - Example: `agrishield.com`

2. **Analytics**:
   - Vercel Analytics: Already enabled
   - Firebase Analytics: Already configured

3. **Monitoring**:
   - Check Render logs daily
   - Monitor Vercel deployments

4. **Improvements**:
   - Add more crop diseases
   - Enhance UI/UX
   - Add more features

---

**🎉 Congratulations! Your AgriShield app is now LIVE and helping farmers worldwide!** 🌾

---

**Last Updated**: November 9, 2025
**Status**: ✅ Ready to Deploy - All steps included
