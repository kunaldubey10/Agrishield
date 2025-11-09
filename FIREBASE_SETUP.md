# 🔐 Firebase Google Authentication Setup Guide

## ⚠️ IMPORTANT: Update Your Firebase Credentials

Your Firebase is currently using **placeholder values**. Follow these steps to enable Google Sign-In:

---

## Step 1: Get Your Firebase Credentials

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `agrishield-29fcc`
3. **Click on the ⚙️ (Settings icon)** → **Project settings**
4. **Scroll down to "Your apps"** section
5. **Find your Web app** or click **"Add app"** → Select **Web (</> icon)**
6. **Copy the Firebase configuration values**

---

## Step 2: Update `.env.local` File

Replace the placeholder values in your `.env.local` file with your **real Firebase credentials**:

```env
# OpenWeather API (already correct)
NEXT_PUBLIC_OPENWEATHER_API_KEY=e15e7551cdb8ed7df8c7fd1833af7fec

# Firebase Configuration - UPDATE THESE VALUES!
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX  # Replace with your real API key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=agrishield-29fcc.firebaseapp.com  # This looks correct
NEXT_PUBLIC_FIREBASE_PROJECT_ID=agrishield-29fcc  # This looks correct
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=agrishield-29fcc.appspot.com  # Correct
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012  # Replace with real sender ID
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456  # Replace with real app ID

# Google Application Credentials (optional for backend)
GOOGLE_APPLICATION_CREDENTIALS=C:\Users\KUNAL KUMAR DUBEY\.config\application_default_credentials.json
```

### Where to Find Each Value:

| Variable | Location in Firebase Console |
|----------|------------------------------|
| **API_KEY** | Project Settings → General → Web API Key |
| **AUTH_DOMAIN** | Project Settings → General → `{projectId}.firebaseapp.com` |
| **PROJECT_ID** | Project Settings → General → Project ID |
| **STORAGE_BUCKET** | Project Settings → General → `{projectId}.appspot.com` |
| **MESSAGING_SENDER_ID** | Project Settings → Cloud Messaging → Sender ID |
| **APP_ID** | Project Settings → Your apps → App ID |

---

## Step 3: Enable Google Sign-In in Firebase

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select** `agrishield-29fcc` **project**
3. **Click on** "Authentication" **in the left sidebar**
4. **Click on** "Sign-in method" **tab**
5. **Find** "Google" **in the providers list**
6. **Click** "Google"
7. **Toggle** "Enable" **to ON**
8. **Add Support email**: Your email address
9. **Click** "Save"

---

## Step 4: Add Authorized Domains

1. **In Firebase Console** → **Authentication** → **Settings**
2. **Scroll to** "Authorized domains"
3. **Make sure these domains are added**:
   - `localhost` (for development)
   - Your production domain (if deployed)

---

## Step 5: Restart Your Development Server

After updating `.env.local`:

```bash
# Stop the frontend server (Ctrl+C in the terminal)
# Then restart it:
npm run dev
```

---

## 🧪 Testing Google Sign-In

1. **Go to**: `http://localhost:3000/auth/signin`
2. **Click** "Sign in with Google"
3. **Select your Google account**
4. **You should be signed in!**

---

## 🐛 Troubleshooting

### Error: "Firebase is not properly configured"
**Solution**: You still have placeholder values in `.env.local`. Update them with real values from Firebase Console.

### Error: "This domain is not authorized"
**Solution**: 
1. Go to Firebase Console → Authentication → Settings
2. Add `localhost` to Authorized domains
3. Restart your dev server

### Error: "Invalid API key"
**Solution**: 
1. Double-check your `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local`
2. Make sure there are no extra spaces or quotes
3. Get a fresh API key from Firebase Console

### Error: "Popup was blocked"
**Solution**: 
1. Allow popups in your browser for `localhost:3000`
2. Try clicking the sign-in button again

### Error: "Popup closed before completing"
**Solution**: 
1. Click "Sign in with Google" again
2. Don't close the popup window
3. Complete the Google account selection

---

## ✅ What I Fixed

### 1. **API Route Error** (`route.ts`)
- ❌ **Issue**: Duplicate return statements causing syntax error
- ✅ **Fixed**: Removed duplicate code block

### 2. **Google Sign-In Integration**
- ✅ Added Google Sign-In button to `/auth/signin` page
- ✅ Added error handling with user-friendly messages
- ✅ Added loading states
- ✅ Beautiful UI with Google icon

### 3. **Enhanced Error Messages**
- ✅ Detects popup blocked
- ✅ Detects popup closed
- ✅ Detects unauthorized domain
- ✅ Detects invalid API key
- ✅ Shows configuration errors

---

## 📋 Current Sign-In Features

### Sign-In Page (`/auth/signin`)
- 🔵 **Google Sign-In button** (primary method)
- 📧 Email/Password form (demo only - not connected yet)
- ⚡ Loading states
- 🎨 Beautiful UI with animations
- 🚨 Clear error messages

### What Happens After Sign-In?
1. User clicks "Sign in with Google"
2. Google popup opens
3. User selects account
4. Redirects to `/profile` page
5. Profile shows user info from Google

---

## 🔐 Security Notes

1. **Never commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Contains sensitive credentials

2. **Use different credentials for production**
   - Create separate Firebase project for production
   - Use environment variables in your hosting platform

3. **Enable only necessary sign-in methods**
   - Currently: Google Sign-In
   - Can add: Email/Password, GitHub, etc.

---

## 📞 Need Help?

If you're still having issues:

1. **Check browser console**: Press F12 → Console tab
2. **Check error message**: It will tell you exactly what's wrong
3. **Verify Firebase config**: Make sure all values are correct
4. **Clear browser cache**: Try in incognito mode

---

**Last Updated**: November 9, 2025  
**Status**: ✅ Code fixed, waiting for Firebase credentials update
