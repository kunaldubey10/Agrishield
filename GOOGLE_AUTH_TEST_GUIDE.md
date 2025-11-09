# 🔐 Firebase Google Authentication Test Guide

## ✅ Setup Verification Checklist

### 1. Firebase Configuration Status
```env
✅ NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBsp9HE9NHDTM20vpqtX-TmdE6HnhVuBbI
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrishield-29fcc.firebaseapp.com
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrishield-29fcc
✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=agrishield-29fcc.firebasestorage.app
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=174962307951
✅ NEXT_PUBLIC_FIREBASE_APP_ID=1:174962307951:web:64fa105fd24fa4931e6e9a
✅ NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-09GV96BJYF
```

### 2. Firebase Console Setup (IMPORTANT!)

You MUST enable Google Sign-In in Firebase Console:

1. Go to: https://console.firebase.google.com/project/agrishield-29fcc/authentication/providers
2. Click on "Authentication" in left sidebar
3. Click "Sign-in method" tab
4. Find "Google" provider
5. Click "Google"
6. Toggle "Enable" to ON
7. Add support email (your email)
8. Click "Save"

### 3. Authorized Domains

Make sure these domains are authorized in Firebase:
- `localhost` ✅
- Your production domain (if deployed)

Check at: Firebase Console → Authentication → Settings → Authorized domains

---

## 🧪 Testing Google Sign-In

### Step 1: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Start Backend Server
```bash
cd backend
python app.py
```

Expected output:
```
Loading ML model...
✓ Model loaded successfully from trained_model_tf215.keras
 * Running on http://0.0.0.0:5000
```

### Step 3: Start Frontend Server
```bash
# In project root
npm run dev
```

Expected output:
```
✓ Ready in 6.5s
- Local: http://localhost:3000 (or 3001)
```

### Step 4: Test Google Sign-In

1. **Open**: http://localhost:3000/auth/signin
2. **Click**: "Sign in with Google" button
3. **Select**: Your Google account
4. **Expected**: Redirects to `/profile` page
5. **Verify**: User info displayed (name, email, photo)

---

## 🎯 Test Scenarios

### ✅ Success Case
- Click "Sign in with Google"
- Popup opens with Google account selection
- Select account
- Popup closes automatically
- Redirects to profile page
- User info displayed correctly

### ❌ Error Cases & Solutions

#### 1. "Popup was blocked"
**Solution**: 
- Allow popups for localhost in browser settings
- Try again

#### 2. "This domain is not authorized"
**Solution**:
- Go to Firebase Console
- Authentication → Settings → Authorized domains
- Add `localhost`
- Save and try again

#### 3. "Invalid API key"
**Solution**:
- Check `.env.local` has correct API key
- No extra spaces or quotes
- Restart dev server

#### 4. "Firebase is not properly configured"
**Solution**:
- Verify all Firebase env variables are set
- Check for typos
- Restart dev server

---

## 🔍 Debugging

### Check Browser Console
Press F12 → Console tab

**Good signs**:
```
Successfully signed in: user@example.com
```

**Error signs**:
```
Error signing in with Google: [error details]
```

### Check Network Tab
Press F12 → Network tab → Filter: XHR

Look for:
- Firebase auth requests
- Status codes (200 = success)

### Check Backend Logs
In terminal running `python app.py`:

**Good signs**:
```
✓ Returning 5 commodities from Agmarknet API
✓ Model loaded successfully
```

**Error signs**:
```
⚠ Using fallback mock data
Error fetching from Agmarknet: [error]
```

---

## 📝 Firebase Auth Flow

```
User clicks "Sign in with Google"
          ↓
signInWithGoogle() called
          ↓
signInWithPopup(auth, googleProvider)
          ↓
Google OAuth popup opens
          ↓
User selects account
          ↓
Firebase validates credentials
          ↓
onAuthStateChanged() triggered
          ↓
User state updated
          ↓
Redirect to /profile
          ↓
Display user info
```

---

## 🔐 Security Checks

### ✅ What's Protected:
- API keys in environment variables
- Firebase credentials not in code
- CORS properly configured
- Auth state managed securely

### ⚠️ Important:
- Never commit `.env.local` to Git
- Keep Firebase API key private
- Use different credentials for production

---

## 🎨 UI Components

### Sign-In Page Features:
- ✅ Google Sign-In button (primary)
- ✅ Email/Password form (demo)
- ✅ Loading states
- ✅ Error messages
- ✅ Smooth animations

### Profile Page Shows:
- ✅ User photo
- ✅ Display name
- ✅ Email address
- ✅ Sign out button

---

## 🚀 Production Deployment

### Before Deploying:

1. **Create production Firebase project** or use same
2. **Add production domain** to authorized domains
3. **Update environment variables** on hosting platform
4. **Test on staging** first
5. **Enable Google Sign-In** in production Firebase

### Environment Variables for Production:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=[production-key]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrishield-29fcc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrishield-29fcc
# ... all other Firebase configs
```

---

## ✅ Complete Test Checklist

- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Backend server running (`python app.py`)
- [ ] Frontend server running (`npm run dev`)
- [ ] Firebase Console: Google Sign-In enabled
- [ ] Firebase Console: localhost authorized
- [ ] Browser: Popups allowed for localhost
- [ ] Test: Click "Sign in with Google"
- [ ] Test: Select Google account
- [ ] Test: Redirect to profile works
- [ ] Test: User info displays correctly
- [ ] Test: Sign out works
- [ ] Test: Sign in again works

---

## 📞 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Popup blocked | Allow popups in browser |
| Domain not authorized | Add to Firebase Console |
| API key invalid | Check `.env.local` for typos |
| User not redirecting | Check `useRouter()` in sign-in page |
| Profile page empty | Verify `useAuth()` hook working |
| Sign out not working | Check `firebaseSignOut()` called |

---

## 🎉 Success Indicators

When everything is working correctly, you should see:

1. ✅ Google button loads on sign-in page
2. ✅ Clicking button opens Google popup
3. ✅ Account selection works smoothly
4. ✅ Popup closes automatically
5. ✅ Redirects to profile page
6. ✅ User name displayed
7. ✅ User email displayed
8. ✅ User photo displayed
9. ✅ Sign out button works
10. ✅ Can sign in again

---

**Last Updated**: November 9, 2025  
**Status**: Ready for Testing ✅
