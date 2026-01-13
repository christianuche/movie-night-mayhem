# Movie Night Mayhem - New Features Setup Guide

## ✨ New Features Added

### 1. **Email Invitations** 📧
When you create an event and add email addresses, invitations are automatically sent to those guests.

### 2. **Delete Events** 🗑️
Event hosts can now delete their events with a single click.

### 3. **Update Events** ✏️
Event hosts can edit event details after creation.

---

## 📧 Email Configuration

### Setting Up Gmail for Email Invitations

#### Option 1: Using App Password (Recommended - With 2FA)

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication if not already enabled
3. Go to **App passwords** (appears after 2FA is enabled)
4. Select **Mail** and **Windows Computer** (or your device)
5. Google will generate a 16-character password
6. Copy this password and add it to your `.env` file

#### Option 2: Less Secure App Access (Without 2FA)

1. Go to [Google Account](https://myaccount.google.com/)
2. Go to **Security** tab
3. Enable **"Less secure app access"**

### Environment Variables (.env)

Add these to your `.env` file:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_or_regular_password
APP_URL=http://localhost:3000
```

### Development Mode

If `EMAIL_USER` and `EMAIL_PASSWORD` are not configured, the app will log emails to console instead of sending them (useful for testing).

---

## 🚀 API Endpoints

### Delete Event
```bash
DELETE /events/:id
```
- Only the event host can delete
- Returns: `{ message: "Event deleted successfully" }`

### Update Event
```bash
PUT /events/:id
```
**Request body:**
```json
{
  "title": "Updated Title",
  "date": "2026-02-15",
  "time": "19:30",
  "movieTitle": "Updated Movie",
  "movieId": "12345",
  "invites": "friend1@example.com, friend2@example.com"
}
```
- Only the event host can update
- Returns: `{ message: "Event updated successfully" }`

---

## 🎨 UI/UX Updates

### Event Detail Page
- **Edit Button** (🖊️): Allows hosts to modify event details
- **Delete Button** (🗑️): Allows hosts to remove the event
- **Host Badge**: Clearly identifies event organizers
- **RSVP Confirmation**: Shows attendee list with checkmarks

### Create Event Page
- Clean form layout with validation
- Movie search functionality
- Email invitation field with comma-separated support

---

## 📝 How It Works

### Creating an Event with Invites

1. Click "Create Movie Night" on the events page
2. Fill in event details (title, date, time)
3. (Optional) Search and select a movie
4. (Optional) Enter guest emails: `guest1@example.com, guest2@example.com`
5. Click "Create Event"
6. ✉️ Invitation emails are automatically sent to all guests

### Invitation Email

The invitation email includes:
- Event title
- Date and time
- Movie title (if selected)
- Host name
- Link to RSVP and view event details

### Managing Your Events

- **Edit**: Click the Edit button on your event detail page to modify details
- **Delete**: Click the Delete button and confirm to remove the event
- **Attendees**: See who's RSVPed in real-time

---

## 🔧 Troubleshooting

### Emails Not Sending?

1. **Check `.env` file**
   - Ensure `EMAIL_USER` and `EMAIL_PASSWORD` are set
   - Use app password for Gmail with 2FA

2. **Check console logs**
   - Server logs show "[DEV MODE]" if email settings are missing
   - Look for error messages if SMTP connection fails

3. **Gmail Authentication Issues**
   - Generate a new app password
   - Ensure "Less secure app access" is enabled (if not using 2FA)
   - Check that your Google account isn't blocking the sign-in attempt

4. **Test Mode**
   - If you don't configure email, the app will log emails to console
   - Good for development and testing!

### Delete Not Working?

- Make sure you're the event host
- Only hosts can delete their events
- Non-hosts will see an error message

### Update Not Working?

- Ensure you're logged in as the event host
- All fields are optional except those marked with asterisk

---

## 📦 Dependencies Added

```
nodemailer: ^6.x - For sending emails via SMTP
```

---

## 🎯 Key Features Summary

| Feature | Details |
|---------|---------|
| **Email Invites** | Automatically send email invitations to guest list |
| **Delete Events** | Remove events (host only) |
| **Update Events** | Edit event details after creation (host only) |
| **Attendee Tracking** | See who's RSVP'd in real-time |
| **Dev Mode** | Test without email config - logs to console |

---

## 💡 Future Enhancements

- Email templates with custom branding
- Calendar integration (iCal)
- Send reminder emails 24 hours before event
- RSVP status responses (Yes/No/Maybe)
- Event cancellation notifications

---

## ❓ Questions or Issues?

Check the console logs for detailed error messages and email delivery status.

Happy Movie Nights! 🎬🍿
