# 📱 Visual Deployment Guide - Render

Step-by-step with screenshots/descriptions for deploying Movie Night Mayhem.

---

## 🎬 Video Overview (What Happens)

1. You push code to GitHub
2. Render pulls code from GitHub
3. Render installs dependencies (npm install)
4. Render starts your app (npm start)
5. Your app connects to MongoDB
6. App is LIVE at https://your-url.onrender.com

---

## 📋 PART 1: MongoDB Setup (10 minutes)

### Step 1.1: Create MongoDB Account
```
1. Visit: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Enter email, password, verify email
4. Continue
```

### Step 1.2: Create Cluster
```
1. Click "Create a Project"
   Name: "movie-night-mayhem"
   
2. Click "Create Project"
   Wait for creation...
   
3. Click "Create a Cluster"
   - Plan: FREE (M0)
   - Provider: AWS
   - Region: Choose closest to you
   - Cluster Name: "Cluster0"
   
4. Click "Create Cluster"
   ⏳ Wait 5-10 minutes...
```

### Step 1.3: Create Database User
```
1. Left sidebar → "Database Access"
2. Click "Add New Database User"
3. Enter:
   - Username: movieadmin
   - Password: (create strong password)
   - Method: Password
4. Click "Add User"
```

### Step 1.4: Allow Network Access
```
1. Left sidebar → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"
```

### Step 1.5: Get Connection String
```
1. Left sidebar → "Clusters"
2. Click "Connect" on your cluster
3. Choose "Drivers" (Node.js)
4. Copy the connection string

EXAMPLE:
mongodb+srv://movieadmin:PASSWORD@cluster0.xxxxx.mongodb.net/movie-night-mayhem?retryWrites=true&w=majority

REPLACE:
- PASSWORD with your password from Step 1.3
- movie-night-mayhem (database name)

✅ SAVE THIS! You'll need it in Render
```

---

## 🐙 PART 2: Push to GitHub (5 minutes)

### Step 2.1: Create GitHub Repository
```
1. Visit: https://github.com/new
2. Fill in:
   - Repository name: movie-night-mayhem
   - Description: Virtual movie event hosting
   - Public (or Private)
3. Click "Create repository"
```

### Step 2.2: Push Code (PowerShell)
```powershell
cd C:\Users\bb\Documents\movie-night-mayhem

git init
git add .
git commit -m "Initial commit: Movie Night Mayhem"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movie-night-mayhem.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username!

### Step 2.3: Verify on GitHub
```
1. Visit: https://github.com/YOUR_USERNAME/movie-night-mayhem
2. You should see all your project files
3. ✅ Success!
```

---

## 🚀 PART 3: Deploy to Render (15 minutes)

### Step 3.1: Create Render Account
```
1. Visit: https://render.com
2. Click "Sign Up"
3. Use GitHub account (easier!)
4. Authorize Render
```

### Step 3.2: Connect GitHub
```
1. Render Dashboard → Click your avatar
2. "Account Settings"
3. "Connected Services"
4. Click "Connect GitHub"
5. Authorize Render
6. Select your repository: movie-night-mayhem
7. Click "Install"
```

### Step 3.3: Create Web Service
```
1. Render Dashboard → "New +" → "Web Service"
2. Select: movie-night-mayhem repository
3. Fill in:
   Name: movie-night-mayhem
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
4. Click "Create Web Service"
   ⏳ Building... (takes 2-5 minutes)
```

### Step 3.4: Check Logs
```
1. In Web Service page → "Logs" tab
2. Wait for: "Listening on port 3000"
3. ✅ Deployment successful!
```

---

## 🔐 PART 4: Set Environment Variables (5 minutes)

### Step 4.1: Get TMDb API Key
```
1. Visit: https://www.themoviedb.org/
2. Sign up
3. Go to: Settings → API
4. Copy your API Key
5. ✅ Save: TMDB_API_KEY
```

### Step 4.2: Add Variables to Render
```
1. Render Web Service → "Environment" tab
2. Click "Add Environment Variable"
3. Add each:

NAME: MONGO_URL
VALUE: (from MongoDB Step 1.5)

NAME: JWT_SECRET
VALUE: your_super_secret_key_12345

NAME: TMDB_API_KEY
VALUE: (from Step 4.1)

NAME: PORT
VALUE: 3000

NAME: APP_URL
VALUE: https://movie-night-mayhem.onrender.com

NAME: EMAIL_USER (optional)
VALUE: your@gmail.com

NAME: EMAIL_PASSWORD (optional)
VALUE: your_app_password
```

### Step 4.3: Redeploy
```
1. After adding variables
2. Render auto-deploys
3. Check logs: "Listening on port 3000"
4. ✅ Done!
```

---

## 🌐 PART 5: Access Your Live App

### Your App URL
```
https://movie-night-mayhem.onrender.com
```

Or find in Render dashboard:
```
Web Service → Settings → URL
```

### Test Your App
```
1. Visit your URL
2. Sign up with test account
3. Create event
4. Check database persists
5. ✅ All working!
```

---

## 🔄 Auto-Deploy Setup

Any time you push to GitHub:
```
1. Make changes locally
2. git add .
3. git commit -m "your message"
4. git push
5. Render automatically deploys! 🚀
```

---

## 📊 Monitoring Your App

### View Logs
```
Render Dashboard → Web Service → Logs
See: All errors and status
```

### Restart Service
```
1. Web Service page
2. Click "Manual Deploy"
3. "Deploy latest commit"
4. Wait for deployment
```

### Check Performance
```
Render Dashboard → Metrics tab
See: CPU, Memory, Requests
```

---

## 🆘 Troubleshooting

### App shows error page
```
1. Check Logs for error message
2. Common: MongoDB connection failed
3. Verify MONGO_URL is correct
4. Restart service
```

### Can't connect to database
```
1. Check MongoDB connection string
2. Verify database user exists
3. Check IP whitelist (should be 0.0.0.0/0)
4. Test connection string locally first
```

### Files not loading
```
1. Ensure .gitignore doesn't exclude needed files
2. Check Express static configuration
3. Verify src/public folder exists
4. Restart service
```

### Emails not sending
```
1. Check EMAIL_USER and EMAIL_PASSWORD
2. Use Gmail app password (not regular)
3. Enable 2FA on Gmail
4. Check console logs
```

---

## 📈 Performance Tips

### Free Tier
- ✅ Great for learning/testing
- ⚠️ Spins down after 15min inactivity
- ⚠️ First request after idle = 30 sec delay

### For Better Performance
- Upgrade to Paid plan ($7+/month)
- Always-on instance
- Better resources
- Better uptime

---

## 💾 Project Backup

Your project is now:
- ✅ On GitHub (code backup)
- ✅ On Render (hosted live)
- ✅ In MongoDB (database backup)

Safe and accessible! ✨

---

## 🎉 Congratulations!

Your Movie Night Mayhem app is now:
- ✅ LIVE on the internet
- ✅ Accessible to anyone
- ✅ Connected to database
- ✅ Auto-updating on code changes
- ✅ Professional hosting

Share your URL: `https://movie-night-mayhem.onrender.com`

---

## 📞 Support Links

- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com
- Node.js Docs: https://nodejs.org/docs

---

## ⏱️ Total Time: ~45 minutes

You did it! 🚀🎬🍿
