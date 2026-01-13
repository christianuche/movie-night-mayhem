# 📊 Database Schema Updates

## Changes Made

### Event Model - `src/models/Event.js`

Added a new field to track RSVPs:

```javascript
attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
```

This field stores an array of User IDs who have RSVP'd to the event.

---

## Migration Instructions

### For Existing Events

If you have existing events in your database, they will need the `attendees` field initialized.

**Option 1: Automatic (Recommended)**
- Just restart your server
- When events are loaded and saved, they'll automatically get the `attendees` field
- No action needed!

**Option 2: Manual MongoDB Update**

If you want to initialize existing events immediately, run this in MongoDB:

```javascript
db.events.updateMany(
  { attendees: { $exists: false } },
  { $set: { attendees: [] } }
)
```

**Option 3: Clear & Recreate**

If you want a fresh start:

```javascript
db.events.deleteMany({})
```

Then create new events through the app.

---

## ✅ Verification

After the changes, new events will have:
- ✅ `attendees` array (initially empty)
- ✅ Guests can RSVP and be added to the array
- ✅ Event detail page shows attendee list

---

## 🔄 Rollback

If you need to revert, remove the `attendees` field:

```javascript
db.events.updateMany(
  {},
  { $unset: { attendees: "" } }
)
```

---

## 📝 Notes

- Empty `attendees` array is fine - it just means no one has RSVP'd yet
- Attendees reference User documents by ID
- When you delete a User, their RSVP entries become orphaned (reference exists but user doesn't)
- This is normal and handled gracefully by the application

---

## 🚀 No Further Action Needed

The application is fully compatible with both old and new event structures. Existing events will work fine - they'll just initially show 0 RSVPs until someone RSVPS to them.

Happy eventing! 🎬
