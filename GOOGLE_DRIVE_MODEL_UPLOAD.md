# 📤 How to Upload Model to Google Drive & Get Download Link

## Quick Steps (5 minutes)

### Step 1: Upload Model to Google Drive

1. **Open Google Drive**: https://drive.google.com/
2. **Click "New"** → "File upload"
3. **Select your model file**:
   ```
   C:\Users\KUNAL KUMAR DUBEY\Agrishield\backend\trained_model_tf215.keras
   ```
4. **Wait for upload** to complete (35.7 MB, ~1-2 minutes)

### Step 2: Make File Public

1. **Right-click** the uploaded file
2. **Click "Share"**
3. **Change access**: "Restricted" → "Anyone with the link"
4. **Set permission**: "Viewer"
5. **Click "Copy link"**

### Step 3: Extract File ID

Your link looks like:
```
https://drive.google.com/file/d/1ABC123XYZ789EXAMPLE/view?usp=sharing
```

**Extract the FILE_ID** (the part between `/d/` and `/view`):
```
1ABC123XYZ789EXAMPLE
```

### Step 4: Create Download URL

Format:
```
https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```

Example:
```
https://drive.google.com/uc?export=download&id=1ABC123XYZ789EXAMPLE
```

---

## 🚀 Add to Render Deployment

### Option A: In Render Dashboard (Recommended)

1. Go to Render.com → Your Service → Environment
2. Click "Add Environment Variable"
3. **Key**: `MODEL_DOWNLOAD_URL`
4. **Value**: `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`
5. Click "Save"
6. Render will auto-redeploy

### Option B: Update render.yaml

Edit `backend/render.yaml`:
```yaml
- key: MODEL_DOWNLOAD_URL
  value: https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```

Then push to Git:
```bash
git add backend/render.yaml
git commit -m "Add model download URL"
git push
```

---

## ✅ How It Works

1. **On Render deployment**, backend starts
2. **Checks** if `trained_model_tf215.keras` exists locally
3. **If not found**, downloads from your Google Drive URL
4. **Saves** to backend folder
5. **Loads** the model normally
6. **Ready** for predictions! ✨

---

## 🧪 Test Locally First

Add to your `.env` file:
```
MODEL_DOWNLOAD_URL=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```

Delete your local model temporarily:
```powershell
cd backend
mv trained_model_tf215.keras trained_model_tf215.keras.backup
python app.py
```

You should see:
```
📥 Model not found locally. Downloading from cloud storage...
✅ Model downloaded successfully!
   Size: 35.70 MB
```

Restore backup:
```powershell
mv trained_model_tf215.keras.backup trained_model_tf215.keras
```

---

## 🎯 Complete Example

### 1. Upload to Google Drive
File: `trained_model_tf215.keras` → Google Drive

### 2. Share & Get Link
Link: `https://drive.google.com/file/d/1XYZ789ABC123/view?usp=sharing`

### 3. Extract File ID
File ID: `1XYZ789ABC123`

### 4. Create Download URL
URL: `https://drive.google.com/uc?export=download&id=1XYZ789ABC123`

### 5. Add to Render
Environment Variable:
- Key: `MODEL_DOWNLOAD_URL`
- Value: `https://drive.google.com/uc?export=download&id=1XYZ789ABC123`

### 6. Deploy! 🚀
```bash
git push
```

Model downloads automatically on first Render deployment!

---

## 🚨 Troubleshooting

### Download fails with "quota exceeded"
**Solution**: Google Drive has download limits. Use Option 2 below.

### File is too large error
**Solution**: Google Drive direct download works up to ~100MB. Your model (35MB) is fine!

### Want to verify download works?
**Test the URL in browser**:
```
https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```
Should start downloading the .keras file.

---

## 🎯 Alternative: Deploy Without Model First

Want to test deployment before setting up model?

### Temporarily Disable Disease Detection

In Render Environment Variables, **don't add** `MODEL_DOWNLOAD_URL`.

Backend will:
- ✅ Start successfully
- ✅ Handle commodity prices
- ✅ Return mock predictions for disease detection
- ⚠️ Show warning: "Model not loaded, using fallback"

You can add the model URL later!

---

## ✨ Benefits of This Approach

- ✅ **No Git LFS** needed
- ✅ **Free** (Google Drive is free)
- ✅ **Automatic** (downloads on first run)
- ✅ **One-time** download (cached in Render)
- ✅ **Easy** to update (just change URL)
- ✅ **Works** with Render free tier

---

**Ready?** Upload your model to Google Drive and follow the steps above! 🚀

**Need help?** Let me know your Google Drive file ID and I'll create the complete URL for you!
