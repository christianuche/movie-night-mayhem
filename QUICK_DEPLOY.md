# 🚀 Quick Deployment Checklist - Render

Fast reference checklist to deploy to Render.

---

## ✅ Before Deployment

- [ ] Project works locally: `npm run dev`
- [ ] All features tested
- [ ] No console errors
- [ ] `.gitignore` includes `.env`
- [ ] `render.yaml` is in project root

---

## ✅ Step-by-Step Deployment

### 1️⃣ GitHub Repository (5 min)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movie-night-mayhem.git
git push -u origin main
```
- [ ] Repository created on GitHub
- [ ] All files pushed

### 2️⃣ MongoDB Atlas (10 min)
- [ ] Create account at mongodb.com/cloud/atlas
- [ ] Create free cluster
- [ ] Create database user (movieadmin)
- [ ] Add network access (0.0.0.0/0)
- [ ] Copy connection string
- [ ] Save: `MONGO_URL`

### 3️⃣ Get API Keys (5 min)
- [ ] Sign up at themoviedb.org
- [ ] Get API key
- [ ] Save: `TMDB_API_KEY`

### 4️⃣ Deploy to Render (10 min)
- [ ] Create account at render.com
- [ ] Connect GitHub account
- [ ] Create Web Service
- [ ] Select `movie-night-mayhem` repo
- [ ] Set build: `npm install`
- [ ] Set start: `npm start`

### 5️⃣ Add Environment Variables (5 min)
In Render dashboard → Environment:
- [ ] `MONGO_URL` = MongoDB connection string
- [ ] `JWT_SECRET` = Random secure string
- [ ] `TMDB_API_KEY` = Your TMDb key
- [ ] `PORT` = 3000
- [ ] `APP_URL` = https://your-app.onrender.com

### 6️⃣ Deploy (5-10 min)
- [ ] Check Render logs for "Listening on port 3000"
- [ ] Get your URL from Render dashboard
- [ ] Visit your live app!

---

## 🧪 Test Live App

- [ ] Signup works
- [ ] Login works
- [ ] Create event works
- [ ] Database saves data
- [ ] RSVP works
- [ ] Delete event works

---

## 📝 Your Details

**GitHub:** https://github.com/YOUR_USERNAME/movie-night-mayhem

**MongoDB URL:** `mongodb+srv://movieadmin:PASSWORD@cluster0....`

**TMDb Key:** `your_api_key_here`

**JWT Secret:** `your_secret_key_here`

**Live URL:** `https://movie-night-mayhem.onrender.com`

---

## ⏱️ Total Time: ~45 minutes

---

## 🆘 If Something Goes Wrong

1. Check Render logs for errors
2. Verify all environment variables are set
3. Check MongoDB connection string
4. Restart service in Render dashboard
5. Contact support if needed

---

✅ All Set! Your app is LIVE! 🎉
