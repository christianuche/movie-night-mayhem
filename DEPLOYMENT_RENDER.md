# 🚀 Deployment Guide - Movie Night Mayhem on Render

Complete step-by-step guide to deploy your app to Render.com for live hosting.

---

## 📋 Prerequisites

Before you start, make sure you have:
- ✅ GitHub account (free at github.com)
- ✅ Render account (free at render.com)
- ✅ MongoDB Atlas account (free at mongodb.com/cloud/atlas)
- ✅ Git installed on your computer
- ✅ All project files ready

---

## 🔧 Step 1: Set Up MongoDB Atlas (Database)

MongoDB Atlas is the database hosting service we'll use.

### 1.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up"
3. Create account with email/password
4. Verify your email

### 1.2 Create a Cluster
1. Click "Create a Project"
2. Name: `movie-night-mayhem`
3. Click "Create Project"
4. Click "Create a Cluster"
5. Select "FREE" tier (M0)
6. Provider: AWS
7. Region: Choose closest to you
8. Click "Create Cluster"
9. Wait 5-10 minutes for cluster to be created

### 1.3 Set Up Database Access
1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `movieadmin`
4. Password: Create a strong password (save it!)
5. Click "Add User"

### 1.4 Set Up Network Access
1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js"
5. Copy the connection string
6. Replace `<username>` with `movieadmin`
7. Replace `<password>` with your password
8. Replace `myFirstDatabase` with `movie-night-mayhem`

**Example:**
```
mongodb+srv://movieadmin:YourPassword123@cluster0.xxxxx.mongodb.net/movie-night-mayhem?retryWrites=true&w=majority
```

Save this! You'll need it in Step 4.

---

## 📤 Step 2: Push Project to GitHub

### 2.1 Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `movie-night-mayhem`
3. Description: "Virtual movie event hosting platform"
4. Choose "Public" or "Private"
5. Click "Create repository"

### 2.2 Initialize Git Locally
Open terminal/PowerShell in your project folder:

```bash
cd c:\Users\bb\Documents\movie-night-mayhem
git init
git add .
git commit -m "Initial commit: Movie Night Mayhem app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/movie-night-mayhem.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2.3 Verify on GitHub
1. Go to your GitHub repository
2. Verify all files are there

---

## 🚀 Step 3: Create Render Web Service

### 3.1 Connect GitHub to Render
1. Go to [render.com](https://render.com)
2. Sign up (free account)
3. Go to Dashboard
4. Click "Connect GitHub Account"
5. Authorize Render to access your GitHub
6. Select repository: `movie-night-mayhem`

### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your `movie-night-mayhem` repository
3. Fill in details:
   - **Name:** `movie-night-mayhem`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. Click "Create Web Service"

---

## 🔐 Step 4: Add Environment Variables

### 4.1 In Render Dashboard
1. Go to your web service page
2. Click "Environment" (left sidebar)
3. Add the following variables:

| Key | Value | Example |
|-----|-------|---------|
| `MONGO_URL` | MongoDB connection string from Step 1.5 | `mongodb+srv://movieadmin:...` |
| `JWT_SECRET` | Random secret key | `your_super_secret_key_12345` |
| `TMDB_API_KEY` | Get from [themoviedb.org](https://www.themoviedb.org/settings/api) | `abc123def456...` |
| `EMAIL_USER` | Your Gmail address (optional) | `your@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app password (optional) | `xxxx xxxx xxxx xxxx` |
| `PORT` | `3000` | `3000` |
| `APP_URL` | Your Render URL | `https://movie-night-mayhem.onrender.com` |

### 4.2 Get TMDb API Key
1. Go to [themoviedb.org](https://www.themoviedb.org/)
2. Sign up for free
3. Go to Settings → API
4. Copy your API Key

---

## ⏳ Step 5: Deploy & Wait

### 5.1 Deployment Process
1. After adding environment variables, Render automatically deploys
2. Check "Logs" tab to monitor deployment
3. Wait for: `"Listening on port 3000"`
4. Deployment successful! ✅

### 5.2 Your Live URL
Your app will be available at:
```
https://movie-night-mayhem.onrender.com
```

(Render generates a URL based on your service name)

---

## 🧪 Step 6: Test Your Live App

1. Visit your URL: `https://movie-night-mayhem.onrender.com`
2. Sign up with test account
3. Create an event
4. Verify database is working
5. Test all features

---

## 🔄 Auto-Deployment

With GitHub connected:
- Any code changes pushed to GitHub
- Render automatically deploys
- Deployment takes 2-5 minutes

---

## 📊 Monitoring & Logs

### View Logs
1. Go to your Render service
2. Click "Logs" tab
3. See real-time server output
4. Check for errors

### Restart Service
1. Go to service page
2. Click "Manual Deploy" → "Deploy latest commit"

---

## 🆘 Troubleshooting

### App won't start
- Check logs for errors
- Verify all environment variables are set
- Check MongoDB connection string

### Database connection failed
- Verify MongoDB Atlas credentials
- Check IP address whitelist (should be 0.0.0.0/0)
- Ensure connection string is correct

### Emails not sending
- Check EMAIL_USER and EMAIL_PASSWORD
- Use Gmail app password (not regular password)
- Enable less secure apps (if not using 2FA)

### Static files not loading
- Verify `src/public` folder is in git
- Check Express static configuration in server.js
- Restart service

---

## 💡 Performance Tips

### Free Tier Limitations
- App spins down after 15 minutes of inactivity
- First request after idle takes ~30 seconds
- Suitable for development/testing

### Upgrade to Paid
- Paid plans are always active
- Better performance
- More reliable

---

## 🎯 Complete Deployment Checklist

- [ ] GitHub account created
- [ ] Repository created and pushed
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string copied
- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] Web service created
- [ ] Environment variables added
- [ ] Deployment complete
- [ ] App accessible at URL
- [ ] Test signup works
- [ ] Test event creation works
- [ ] Test database persistence

---

## 📝 Important Notes

### Environment Variables
- Never commit `.env` file to GitHub
- Always use Render's environment variables dashboard
- Keep JWT_SECRET secure

### Database
- MongoDB Atlas free tier: 512MB storage
- Sufficient for development/testing
- Upgrade if you need more

### SSL Certificate
- Render provides free HTTPS
- Auto-configured
- Your app is secure

---

## 🎉 Success!

Once deployed:
- ✅ Your app is LIVE on the internet
- ✅ Anyone can access it via URL
- ✅ Database persists data
- ✅ Auto-deploys on code changes
- ✅ Professional hosting

---

## 📞 Support

### Render Docs
- https://render.com/docs

### MongoDB Atlas Docs
- https://docs.atlas.mongodb.com

### TMDb API Docs
- https://www.themoviedb.org/settings/api

---

**Your Live App URL:** `https://movie-night-mayhem.onrender.com`

Congratulations! 🚀🎬
