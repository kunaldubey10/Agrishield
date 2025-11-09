# 🚀 Deploy AgriShield - Start Here!

## ⚡ Quick Start (Choose One)

### Option 1: Automatic Deployment Helper
```powershell
.\deploy.ps1
```
Follow the interactive prompts!

### Option 2: Manual Deployment

#### Deploy Frontend (Vercel) - 5 minutes
```powershell
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel --prod
```

#### Deploy Backend (Render) - 10 minutes
1. Go to https://render.com/
2. Connect GitHub repository
3. Create Web Service from `backend` folder
4. Auto-deploys! ✅

---

## 📚 Detailed Guides

- **DEPLOYMENT_GUIDE.md** - Complete step-by-step guide (37 minutes)
- **QUICK_DEPLOY.md** - Quick checklist format (15 minutes)
- **INTEGRATION_COMPLETE.md** - What's ready to deploy

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [x] Backend working locally: `python backend/app.py`
- [x] Frontend working locally: `npm run dev`
- [x] All environment variables in `.env.local`
- [x] Firebase project configured
- [x] Git repository initialized

---

## 🎯 Deployment Platforms

| Platform | Purpose | Free Tier | Deploy Time |
|----------|---------|-----------|-------------|
| **Vercel** | Frontend (Next.js) | ✅ Yes | 5 minutes |
| **Render** | Backend (Flask) | ✅ Yes | 10 minutes |
| **Firebase** | Authentication | ✅ Yes | Already setup |

---

## 🔗 After Deployment

You'll get:
- Frontend URL: `https://agrishield.vercel.app`
- Backend URL: `https://agrishield-backend.onrender.com`
- Custom domain: Optional (add later)

---

## 🚨 Common Issues

**Backend won't start?**
- Check: Model file uploaded to Render
- Check: Environment variables set correctly

**Frontend shows errors?**
- Check: Backend URL in environment variables
- Check: Firebase domains authorized

**CORS errors?**
- Check: Backend CORS configured with Vercel URL

---

## 💡 Need Help?

1. Run: `.\deploy.ps1` and select option 4 to test locally
2. Check logs in Vercel/Render dashboards
3. Review DEPLOYMENT_GUIDE.md for detailed troubleshooting

---

## 🎉 Success!

When deployment works:
- ✅ Site loads at Vercel URL
- ✅ Market prices show data
- ✅ Google Sign-In works
- ✅ Disease detection functional
- ✅ All features working

---

**Ready?** Run `.\deploy.ps1` to start! 🚀

**Last Updated**: November 9, 2025
