# 🎬 Quick Start - Email & Event Management Features

## What's New? 🆕

Your Movie Night Mayhem app now has:
- ✉️ **Email Invitations** - Automatically send invites to guest emails
- ✏️ **Edit Events** - Update event details anytime
- 🗑️ **Delete Events** - Remove events you created

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Dependency
```bash
npm install nodemailer
```
*(Already done if you ran `npm install`)*

### Step 2: Configure Email (Optional but Recommended)

Add to your `.env` file:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
APP_URL=http://localhost:3000
```

**For Gmail Users:**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to "App passwords" → Select Mail → Get 16-char password
4. Use that password as `EMAIL_PASSWORD`

**Testing without emails?**
Just leave these blank - the app will log to console!

### Step 3: Restart Server
```bash
npm run dev
```

Done! 🎉

---

## 🎯 How to Use

### Creating an Event with Invitations

1. Go to **My Events** → **Create New Event**
2. Fill in:
   - Event Title
   - Date & Time
   - Movie (optional)
   - **👥 Invites:** `friend@example.com, another@example.com`
3. Click **Create Event**
4. ✅ Friends get email invitations automatically!

### Editing an Event

1. Open your event
2. Click **✏️ Edit Event** button
3. Change any details
4. Click **Update Event**
5. ✅ Changes saved!

### Deleting an Event

1. Open your event
2. Click **🗑️ Delete Event** button
3. Confirm deletion
4. ✅ Event removed!

---

## 📧 Email Template

Guests receive professional emails with:
- Event title
- Date & time
- Movie name
- Your name
- Direct link to RSVP

---

## 🔧 Troubleshooting

**Emails not sending?**
- Check `.env` has `EMAIL_USER` and `EMAIL_PASSWORD`
- Check console for `[DEV MODE]` message (normal if not configured)
- Gmail: Use app password, not regular password
- Gmail: Enable 2FA first

**Can't edit/delete?**
- You must be the event host
- Only hosts can edit/delete their events

**Event won't create?**
- All red star fields (*) are required
- Check console for error messages

---

## 📚 More Info

- Full setup guide: See `EMAIL_SETUP.md`
- Feature details: See `FEATURES_SUMMARY.md`
- Architecture: See `.github/copilot-instructions.md`

---

## 🎬 Next Steps

1. Create a test event
2. Add your email as a guest (if configured)
3. Check your inbox or console for invitation
4. Edit the event
5. Delete the event

Happy Movie Nights! 🍿

---

## ❓ Questions?

Check the console logs for detailed error messages or refer to the full documentation files.
