# 📋 Complete User Workflow - Movie Night Mayhem

## ✅ All Features Implemented & Working

Your app now has a complete user lifecycle with full database persistence:

---

## 🔄 Complete User Journey

### 1️⃣ **User Signs Up**
```
GET /signup → Sign up form
POST /signup → Create account + JWT token stored in HttpOnly cookie
→ Redirects to home page (logged in)
```

**What happens:**
- User enters: Name, Email, Password
- Password is hashed with bcryptjs
- User account saved to MongoDB
- JWT token created (expires in 7 days)
- Cookie stored securely

---

### 2️⃣ **User Logs In**
```
GET /login → Login form
POST /login → Verify credentials + JWT token
→ Redirects to home page (logged in)
```

**What happens:**
- User enters: Email, Password
- Password verified against stored hash
- JWT token created
- Cookie stored securely
- User stays logged in for 7 days

---

### 3️⃣ **User Creates Event**
```
GET /events/create → Create event form
POST /events/create → Save to database
→ Event created with user as HOST
→ Email invitations sent to guests
```

**Event stored includes:**
- ✅ Title
- ✅ Date & Time
- ✅ Movie Title & ID (optional)
- ✅ Host (user who created it)
- ✅ Guest emails (invites)
- ✅ Attendees list (initially empty)
- ✅ Created timestamp

**Emails sent to:**
- All guests in invite list automatically get HTML email

---

### 4️⃣ **User Views Their Events**
```
GET /events → Shows ONLY events created by this user
```

**What user sees:**
- All events they created
- Edit & Delete buttons (for their events only)
- Number of RSVPs for each event
- Sorted by date (earliest first)

**Database Query:**
```javascript
Event.find({ host: req.user.id })  // Only their events
```

---

### 5️⃣ **User Updates Event**
```
GET /events/create → Edit form (pre-filled with event data)
PUT /events/:id → Update database
→ Event details updated
→ Changes immediately visible
```

**Can update:**
- ✅ Event title
- ✅ Date & time
- ✅ Movie selection
- ✅ Guest invite list

**Authorization:**
- Only the host (creator) can update
- Other users get: "Only the host can update this event"

---

### 6️⃣ **User Deletes Event**
```
DELETE /events/:id → Remove from database
→ Event completely removed
→ Redirects to events list
```

**Authorization:**
- Only the host can delete
- Confirmation dialog prevents accidents
- Non-hosts get: "Only the host can delete this event"

---

### 7️⃣ **User RSVPs to Event**
```
GET / → See upcoming events on home
Click RSVP → Added to attendees list
```

**What happens:**
- User added to event's attendees array
- Event detail page updates with their name
- RSVP button disappears (can't RSVP twice)

---

### 8️⃣ **User Logs Out**
```
GET /logout → Clear JWT cookie
→ Redirected to login page
→ User logged out
```

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,          // Unique
  password: String,       // Hashed with bcryptjs
  createdAt: Date
}
```

### Event Collection
```javascript
{
  _id: ObjectId,
  title: String,
  date: Date,
  time: String,
  movieId: String,        // TMDb ID (optional)
  movieTitle: String,     // Movie name (optional)
  host: ObjectId,         // References User who created it
  attendees: [ObjectId],  // References Users who RSVP'd
  invites: [String],      // Email addresses (strings)
  createdAt: Date
}
```

---

## 🔐 Security Features

✅ **Authentication:**
- Login required for all operations
- JWT tokens with 7-day expiry
- Passwords hashed with bcryptjs (10 rounds)
- HttpOnly cookies (prevents XSS)

✅ **Authorization:**
- Only hosts can edit their events
- Only hosts can delete their events
- Users can only RSVP to others' events
- Non-hosts blocked from modifying events

✅ **Data Validation:**
- Email addresses validated on create
- Dates must be in future
- User authentication checked on every protected route

---

## 🎯 Complete Workflow Example

### Alice's Experience:

1. **Alice signs up**
   - Creates account: alice@example.com
   - User saved to MongoDB

2. **Alice creates event**
   - "Movie Night at Home"
   - Date: Feb 15, 2026 at 7:30 PM
   - Movie: "The Matrix"
   - Invites: bob@example.com, carol@example.com
   - Event saved to MongoDB with Alice as host
   - ✉️ Bob and Carol receive email invitations

3. **Bob logs in**
   - Sees Alice's event on home page
   - Clicks RSVP
   - Added to attendees list

4. **Carol logs in & RSVPs**
   - Carol also added to attendees list

5. **Alice views her events**
   - Goes to "My Events"
   - Sees her event with 2 RSVPs
   - Can see: Bob, Carol in attendees list

6. **Alice updates event**
   - Realizes she picked wrong movie
   - Clicks Edit Event
   - Changes to "Inception"
   - Event updated in database
   - Bob & Carol see new movie when they view event

7. **Alice deletes event**
   - Changes plans
   - Clicks Delete
   - Event removed from database
   - Bob & Carol no longer see event

---

## 📱 All Pages & Their Function

| Page | Route | Requires Auth | Function |
|------|-------|---------------|----------|
| Home | `/` | No | Show trending movies & upcoming events |
| Sign Up | `/signup` | No | Create new account |
| Login | `/login` | No | Login to existing account |
| My Events | `/events` | Yes | Show user's created events |
| Create Event | `/events/create` | Yes | Create new event |
| Event Detail | `/events/:id` | Yes | View event details & RSVP |
| Edit Event | `/events/edit` | Yes | Update event details |
| Profile | `/profile` | Yes | View profile info |
| Search | `/search?q=...` | No | Search movies |

---

## 🗄️ Data Persistence

All data is **permanently stored in MongoDB**:

✅ **When you login again:**
- All your events are still there
- All RSVPs are still recorded
- Attendee lists preserved
- Event details unchanged

✅ **Example:**
- Alice creates event on Jan 13
- Logs out
- Logs back in Feb 15
- Event is still there with same details & attendees

---

## 🚀 Complete Feature Checklist

- ✅ User Registration (signup)
- ✅ User Login (with JWT)
- ✅ User Logout
- ✅ Create Event (stored in DB)
- ✅ Read Event Details
- ✅ Update Event (edit)
- ✅ Delete Event
- ✅ RSVP to Event
- ✅ View Personal Events
- ✅ Email Invitations
- ✅ Data Persistence (MongoDB)
- ✅ Authentication (JWT)
- ✅ Authorization (host-only operations)
- ✅ Professional UI/UX
- ✅ Responsive Design

---

## 💡 Key Points

1. **User Isolation** - Each user only sees their own events in "My Events"
2. **Event Ownership** - Only creators can edit/delete their events
3. **Data Persistence** - MongoDB stores everything permanently
4. **Security** - JWT tokens, password hashing, authorization checks
5. **Email Notifications** - Guests automatically notified
6. **Real-time Updates** - Changes immediately visible

---

## 🎬 Ready to Use!

Your Movie Night Mayhem app is **fully functional** with:
- Complete user management
- Full CRUD operations on events
- Database persistence
- Professional features
- Email invitations

**Start using it by:**
1. Signing up
2. Creating events
3. Inviting friends
4. Managing your events
5. Login anytime to see your events again

Happy Movie Nights! 🍿
