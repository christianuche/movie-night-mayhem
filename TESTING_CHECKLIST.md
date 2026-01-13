# ✅ Testing Checklist - Email & Event Management

Use this checklist to verify all new features are working correctly.

---

## 🔐 Pre-Test Setup

- [ ] Server is running (`npm run dev`)
- [ ] Database is connected
- [ ] You're logged in
- [ ] Check console for any startup errors

---

## 📧 Email Feature Tests

### Test 1: Create Event with Email Invitation (Dev Mode)
- [ ] Go to "Create New Event"
- [ ] Fill in title, date, time
- [ ] In invites field, enter: `test@example.com, another@test.com`
- [ ] Click "Create Event"
- [ ] Check console for `[DEV MODE] Email would be sent:` message
- [ ] Verify email content looks good
- [ ] Event should be created and listed

### Test 2: Create Event with Movie Selection
- [ ] Go to "Create New Event"
- [ ] Enter basic details
- [ ] Search for a movie (e.g., "Matrix")
- [ ] Click on a movie result
- [ ] Add email invites
- [ ] Create event
- [ ] Verify movie title shows in event details

### Test 3: Create Event Without Invites
- [ ] Go to "Create New Event"
- [ ] Leave invites empty
- [ ] Create event
- [ ] Should work fine (no emails sent)

### Test 4: Email Production Mode (Optional - Gmail)
- [ ] Add real Gmail credentials to `.env`
- [ ] Create event with real email
- [ ] Check inbox for invitation email
- [ ] Verify email format looks professional

---

## ✏️ Edit Event Tests

### Test 1: Edit Basic Details
- [ ] Create an event
- [ ] Click "Edit Event" button
- [ ] Change the title
- [ ] Click "Update Event"
- [ ] Verify title changed in event detail

### Test 2: Edit Movie Selection
- [ ] Click "Edit Event"
- [ ] Search and select a different movie
- [ ] Update event
- [ ] Verify movie changed

### Test 3: Edit Invites
- [ ] Click "Edit Event"
- [ ] Change the invites list
- [ ] Update event
- [ ] Verify in database (console or DB)

### Test 4: Edit as Non-Host
- [ ] Ask someone else to create an event
- [ ] Try to access their event details
- [ ] Edit button should NOT be visible
- [ ] Cannot manually edit (authorization check)

---

## 🗑️ Delete Event Tests

### Test 1: Delete Your Event
- [ ] Create an event
- [ ] Click "Delete Event" button
- [ ] Confirm deletion
- [ ] Should redirect to events page
- [ ] Event should be gone from list

### Test 2: Delete Confirmation
- [ ] Create an event
- [ ] Click "Delete Event"
- [ ] A confirmation dialog should appear
- [ ] Click "Cancel" - event should NOT be deleted
- [ ] Event should still appear in list

### Test 3: Cannot Delete Others' Events
- [ ] Look at someone else's event
- [ ] Delete button should NOT be visible
- [ ] Manually attempt DELETE request (should fail with 403)

### Test 4: Delete Event with RSVPs
- [ ] Create event with a guest RSVP
- [ ] Delete the event
- [ ] Event should be gone with all its data

---

## 👥 RSVP & Attendee Tests

### Test 1: RSVP to Event
- [ ] Open someone else's event
- [ ] Click "RSVP" button
- [ ] Should add you to attendees list
- [ ] Attendee count should increase

### Test 2: Can't RSVP Twice
- [ ] RSVP to an event
- [ ] Try to RSVP again
- [ ] Should see error "You have already RSVP'd"

### Test 3: View Attendees
- [ ] Look at event with RSVPs
- [ ] Should show attendee count
- [ ] Should list all attendee names
- [ ] Checkmarks should appear next to names

---

## 🎨 UI/UX Tests

### Test 1: Event Detail Page Layout
- [ ] Open any event
- [ ] Verify all info displays correctly:
  - [ ] Title
  - [ ] Date & time
  - [ ] Movie (if selected)
  - [ ] Host name
  - [ ] Attendee list
- [ ] Buttons appear in right places
- [ ] Styling looks professional

### Test 2: Create Event Form
- [ ] Check form inputs have proper styling
- [ ] Focus states work (blue border)
- [ ] Movie search dropdown appears
- [ ] Submit button is visible and clickable

### Test 3: Edit Event Form
- [ ] Check form layout
- [ ] All fields are properly styled
- [ ] Movie search works
- [ ] Update button works

### Test 4: Responsive Design (Mobile)
- [ ] Open event on mobile browser
- [ ] Layout should adjust properly
- [ ] Buttons should be readable
- [ ] Forms should be usable on mobile

---

## 🔒 Security Tests

### Test 1: Authorization Check
- [ ] Try to delete someone else's event via API
- [ ] Should get 403 Forbidden error
- [ ] Event should NOT be deleted

### Test 2: Authorization Check (Edit)
- [ ] Try to update someone else's event via API
- [ ] Should get 403 Forbidden error
- [ ] Event should NOT change

### Test 3: Authentication Check
- [ ] Log out
- [ ] Try to access event (via URL)
- [ ] Should redirect to login page
- [ ] Should NOT see event details

### Test 4: Malformed Input
- [ ] Try to create event with invalid date
- [ ] Try with very long email list
- [ ] App should handle gracefully

---

## 📊 Data Tests

### Test 1: Data Persistence
- [ ] Create event
- [ ] Refresh page
- [ ] Event should still be there
- [ ] All details should be preserved

### Test 2: Multiple Events
- [ ] Create 5 different events
- [ ] List should show all 5
- [ ] Can open each one independently
- [ ] Editing one shouldn't affect others

### Test 3: Future Events Only
- [ ] Create event with past date
- [ ] Create event with future date
- [ ] Home page should only show future events
- [ ] Check MongoDB queries are filtering correctly

---

## 🐛 Error Handling Tests

### Test 1: Invalid Event ID
- [ ] Manually go to `/events/invalid-id`
- [ ] Should show "Event not found" error
- [ ] Should NOT crash the server

### Test 2: Network Error
- [ ] Disconnect internet
- [ ] Try to create event with invites
- [ ] Should show error message (not crash)

### Test 3: Empty Required Fields
- [ ] Try to create event without title
- [ ] Try without date/time
- [ ] Form should show validation error
- [ ] Event should NOT be created

---

## ✅ Final Checklist

- [ ] All create tests passing
- [ ] All edit tests passing
- [ ] All delete tests passing
- [ ] All RSVP tests passing
- [ ] All UI tests passing
- [ ] All security tests passing
- [ ] All data tests passing
- [ ] All error handling tests passing

---

## 📝 Notes

Record any issues found:

Issue | Steps | Expected | Actual | Status
------|-------|----------|--------|--------
(example) | Create event | Loads form | Form doesn't load | 🔴 Bug
      |       |          |        | 🟡 Minor
      |       |          |        | ✅ Fixed

---

## 🎉 Success!

If all tests pass, your new features are working perfectly!

### Common Issues & Solutions

**Problem:** Emails not sending
- **Solution:** Check `.env` has credentials, or run in dev mode

**Problem:** Can't edit events
- **Solution:** Make sure you're the host (created the event)

**Problem:** Database errors
- **Solution:** Check MongoDB connection and schema

**Problem:** Page styling looks off
- **Solution:** Clear browser cache and refresh

---

Last Updated: January 13, 2026
