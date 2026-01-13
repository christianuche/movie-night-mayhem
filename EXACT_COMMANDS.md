# 💻 Exact Commands - Copy & Paste Ready

All commands you need to deploy. Just copy and paste!

---

## 🐙 Step 1: Push to GitHub

### 1.1 First Time Setup
```bash
cd C:\Users\bb\Documents\movie-night-mayhem
git init
git add .
git commit -m "Initial commit: Movie Night Mayhem"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movie-night-mayhem.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 1.2 Future Updates
```bash
git add .
git commit -m "Your update description"
git push
```

---

## 📊 Step 2: MongoDB Connection String

### From MongoDB Atlas
After setting up cluster, copy this format:

```
mongodb+srv://movieadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/movie-night-mayhem?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD` with your database password
- `xxxxx` with your cluster's identifier

---

## 🚀 Step 3: Render Environment Variables

Add these exact names and values in Render dashboard:

```
Name: MONGO_URL
Value: mongodb+srv://movieadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/movie-night-mayhem?retryWrites=true&w=majority

Name: JWT_SECRET
Value: this_is_a_super_secret_key_12345_change_this

Name: TMDB_API_KEY
Value: your_tmdb_api_key_here

Name: PORT
Value: 3000

Name: APP_URL
Value: https://movie-night-mayhem.onrender.com

Name: EMAIL_USER
Value: your.email@gmail.com

Name: EMAIL_PASSWORD
Value: your_app_password_here
```

---

## 🐛 Debugging Commands (Local)

### Check if server starts
```bash
npm start
```

Should show: `Server is running on http://localhost:3000`

### Check local development
```bash
npm run dev
```

Should show logs and auto-reload on changes

### Test database locally
```bash
node -e "require('./src/database/db.js')"
```

Should connect without errors

---

## ✅ Verification Commands

### Check Git status
```bash
git status
```

Should show everything committed

### Check Git history
```bash
git log --oneline
```

Should show your commits

### Check Node version
```bash
node --version
```

Should show v16+ (Render requires modern Node)

### Check npm packages
```bash
npm list --depth=0
```

Should show all dependencies

---

## 🔗 Important URLs

### GitHub
```
https://github.com/YOUR_USERNAME/movie-night-mayhem
```

### MongoDB Atlas
```
https://cloud.mongodb.com/
Username: your@email.com
```

### TMDb API
```
https://www.themoviedb.org/settings/api
```

### Render
```
https://dashboard.render.com/
```

### Your Live App (after deployment)
```
https://movie-night-mayhem.onrender.com
```

---

## 📝 Before You Deploy

### Create .env for local testing
```env
MONGO_URL=mongodb+srv://movieadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/movie-night-mayhem?retryWrites=true&w=majority
JWT_SECRET=this_is_a_super_secret_key_12345_change_this
TMDB_API_KEY=your_tmdb_api_key_here
PORT=3000
APP_URL=http://localhost:3000
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_app_password_here
```

### Test locally
```bash
npm install
npm run dev
```

Then visit: http://localhost:3000

---

## 🔄 Deployment Process Commands

### After making changes locally
```bash
# Commit your changes
git add .
git commit -m "Update: describe your changes"

# Push to GitHub (auto-triggers Render deployment)
git push

# Then check Render logs to verify deployment
```

### Force redeploy from Render
```
Dashboard → Web Service → Manual Deploy → Deploy latest commit
```

---

## 📊 Check Logs

### Local logs (while running)
```bash
npm run dev
# Logs appear in terminal
```

### Render logs
```
Render Dashboard → Web Service → Logs tab
```

---

## 🧹 Cleanup if Needed

### Remove git tracking
```bash
rm -r .git
git init
```

### Reset git changes
```bash
git reset --hard
```

### Reinstall dependencies
```bash
rm -r node_modules
npm install
```

---

## 🆘 Emergency Commands

### If app won't start
```bash
# Try clearing node modules
rm -r node_modules
npm install

# Then run
npm start
```

### If database connection fails
```bash
# Test connection
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URL).then(() => console.log('Connected!'));"
```

### If you need to restart Render
```
Manual Deploy → Deploy latest commit
```

---

## 📋 Step-by-Step Final Checklist

```bash
# 1. Navigate to project
cd C:\Users\bb\Documents\movie-night-mayhem

# 2. Test locally
npm install
npm run dev
# Visit http://localhost:3000
# Test signup, create event, etc.

# 3. Commit and push
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/movie-night-mayhem.git
git branch -M main
git push -u origin main

# 4. Create MongoDB cluster and get connection string

# 5. Create Render web service

# 6. Add environment variables in Render

# 7. Check logs in Render
# Wait for: "Listening on port 3000"

# 8. Visit your URL
# https://movie-night-mayhem.onrender.com

# 9. Test everything!
```

---

## 🎉 Success!

When you see in Render logs:
```
Server is running on http://localhost:3000
MongoDB Connected Successfully
```

Your app is LIVE! 🚀

---

## 📝 Save These URLs

**Your GitHub Repo:**
```
https://github.com/YOUR_USERNAME/movie-night-mayhem
```

**Your Live App:**
```
https://movie-night-mayhem.onrender.com
```

**Share with friends!** ✨

---

## 💡 Pro Tips

### Quick git commands
```bash
# See what changed
git diff

# See commit history
git log

# See current branch
git branch

# Switch branch
git checkout -b feature-name

# Back to main
git checkout main
```

### Restart everything
```bash
# If something breaks:
git reset --hard
npm install
npm run dev
```

### Check everything before deploying
```bash
npm install
npm run dev
# Test for 2 minutes
# Then Ctrl+C to stop
```

---

**You're all set! Ready to deploy!** 🚀🎬
