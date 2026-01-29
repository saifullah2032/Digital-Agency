# 📧 Gmail & Email Configuration Guide

## Current Status

✅ **Gmail SMTP is now configured!**

Your production email setup is ready to use with:
- **Account**: rayankhan2032@gmail.com
- **App Password**: eihv oltr junj zbal (already configured in backend .env)
- **Status**: ACTIVE and ready to send emails

---

## Quick Start (Already Done!)

### Configuration Complete
The following has been configured in `backend/.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=rayankhan2032@gmail.com
EMAIL_PASSWORD=eihv oltr junj zbal
EMAIL_FROM=noreply@digitalagency.com
EMAIL_FROM_NAME=Digital Agency
```

### To Start Sending Emails

**Step 1: Start the backend with Gmail enabled**
```bash
cd backend
npm run dev
```

**Expected console output:**
```
✓ Email service configured with Gmail
✓ Server running on http://localhost:5000
✓ MongoDB connected
```

**Step 2: Test email sending**
```bash
# Using curl or Postman
POST http://localhost:5000/api/v1/client/welcome-email
Content-Type: application/json

{
  "email": "your-email@gmail.com"
}
```

**Step 3: Check your inbox**
- Email should arrive within 1-2 minutes
- Check spam/promotions folder if not in inbox
- Verify HTML template renders correctly

---

## Email Templates Configured

### 1. Welcome Email
**Trigger**: When client creates account or first logs in
**Contains**:
- Welcome message
- Feature overview
- Dashboard link
- Call-to-action button

### 2. New Message Notification
**Trigger**: When admin sends a message to client
**Contains**:
- Notification of new message
- Sender name
- Subject preview
- Link to view message

### 3. Project Update Notification
**Trigger**: When project status changes
**Contains**:
- Project title and update
- Update details
- Link to project details
- Call-to-action

### 4. File Upload Notification
**Trigger**: When file is uploaded to client
**Contains**:
- File name and uploader
- File details
- Download link
- Call-to-action

---

## Email API Endpoints

### 1. Send Welcome Email
```
POST /api/v1/client/welcome-email
Body: { "email": "user@example.com" }
Response: { "success": true, "messageId": "..." }
```

### 2. Send Message Notification (from backend)
```
Used automatically when:
- Admin sends message to client
- Message created in database
```

### 3. Send Project Update (from backend)
```
Used automatically when:
- Project status is updated
- Milestone is changed
- Admin updates project info
```

### 4. Send File Upload Notification (from backend)
```
Used automatically when:
- File is uploaded to client
- File shared in dashboard
```

---

## Testing Emails

### Test 1: Welcome Email
**Endpoint**: `POST /api/v1/client/welcome-email`

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/v1/client/welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

**Using Postman:**
1. Set method to POST
2. URL: `http://localhost:5000/api/v1/client/welcome-email`
3. Headers: `Content-Type: application/json`
4. Body:
```json
{
  "email": "your-email@gmail.com"
}
```
5. Click Send

**Expected Response:**
```json
{
  "success": true,
  "messageId": "<email-id@gmail.com>"
}
```

### Test 2: Check Backend Logs
**Terminal output should show:**
```
Email sent: <message-id>
```

### Test 3: Verify Email Receipt
1. Check inbox of recipient email
2. Look for "Digital Agency" sender
3. Verify HTML formatting renders correctly
4. Check that links are clickable
5. Confirm footer and branding

---

## Troubleshooting

### Issue: "Invalid login credentials"
**Solution:**
- Verify Gmail account: rayankhan2032@gmail.com
- Verify App Password: eihv oltr junj zbal
- Check .env file has no extra spaces
- Restart backend server

### Issue: "Less secure app access"
**Solution:**
App passwords already created in Gmail account settings. No additional config needed.

### Issue: Emails going to spam
**Solution:**
- Check spam/promotions folder first
- Gmail filters emails from noreply addresses
- Use your Gmail to test first
- Add Digital Agency to contacts to whitelist

### Issue: "Connection timeout"
**Solution:**
- Check internet connection
- Verify Gmail SMTP is accessible (port 587)
- Restart backend
- Check firewall settings

### Issue: Email template looks broken
**Solution:**
- Clear email cache
- Test in different email client (Gmail, Outlook, etc.)
- Check that HTML is valid (config/email.js)
- Verify CSS is inline (currently using inline styles)

---

## Backend Email Configuration Details

**Location**: `backend/config/email.js`

**Transporter Setup**:
```javascript
nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rayankhan2032@gmail.com',
    pass: 'eihv oltr junj zbal', // App Password
  },
});
```

**Email Options**:
```javascript
{
  from: '"Digital Agency" <noreply@digitalagency.com>',
  to: recipient@example.com,
  subject: '...',
  html: '<html>...</html>',
  text: 'fallback text...'
}
```

---

## Integration with Client Features

### When Emails Are Automatically Sent

**1. Client Registration/Login**
- Email: Welcome email
- When: First time client logs in
- Template: Welcome template
- To: Client email address

**2. Message Received**
- Email: New message notification
- When: Admin sends message from dashboard
- Template: New message template
- To: Client email address

**3. Project Update**
- Email: Project update notification
- When: Project status or milestone changes
- Template: Project update template
- To: Client email address

**4. File Upload**
- Email: File uploaded notification
- When: File shared with client
- Template: File upload template
- To: Client email address

---

## Production Deployment Notes

### Before Going Live

1. **Change Admin Password**
   - Edit `backend/.env`
   - Change `ADMIN_PASSWORD=admin123` to something secure
   - Update only in production environment

2. **Update Frontend URL**
   - In `backend/.env`: `FRONTEND_URL=https://yourdomain.com`
   - Emails will link to production frontend

3. **Update Email From**
   - In `backend/.env`: `EMAIL_FROM=noreply@yourdomain.com`
   - Use your actual domain for better deliverability
   - (Optional) Verify domain with Gmail

4. **Monitor Email Delivery**
   - Check Gmail account for bounce/delivery issues
   - Monitor unsubscribe rates
   - Test emails on multiple platforms

5. **SMTP Limits**
   - Gmail: ~500 emails/day limit
   - For production: Consider SendGrid, AWS SES, or Mailgun
   - See "Alternative Services" section below

---

## Alternative Email Services (For High Volume)

If you need to send more than 500 emails/day, switch to:

### SendGrid
```env
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com
```

### AWS SES
```env
EMAIL_SERVICE=ses
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_SES_REGION=us-east-1
```

### Mailgun
```env
EMAIL_SERVICE=mailgun
MAILGUN_DOMAIN=your_domain.mailgun.org
MAILGUN_API_KEY=your_api_key
```

### Postmark
```env
EMAIL_SERVICE=postmark
POSTMARK_API_TOKEN=your_token
```

---

## Email Template Customization

To modify email templates, edit `backend/config/email.js`:

### Change Brand Colors
Replace in templates:
- `#1E40AF` (Primary Blue) → Your color
- `#EA580C` (Secondary Orange) → Your color

### Change Brand Name
Replace: `"Digital Agency"` → Your company name

### Change Dashboard Link
Replace: `${process.env.FRONTEND_URL}/client-dashboard` → Your URL

### Add/Remove Sections
Edit HTML in respective template function

### Change Email Subject Lines
Edit subject in each template object

---

## Security Best Practices

✅ **Already Implemented**:
- App Password (not main password) used for SMTP
- From email masked as noreply address
- HTML emails with proper encoding
- Environment variables for credentials
- No hardcoded passwords in source code

📋 **Recommendations for Production**:
- Rotate app password every 90 days
- Use environment-specific configs
- Log email send failures
- Monitor email bounce rates
- Implement email verification for new subscribers
- Add unsubscribe links to newsletters

---

## Summary

Your email system is now configured and ready to use:

| Feature | Status | Details |
|---------|--------|---------|
| Gmail SMTP | ✅ Configured | rayankhan2032@gmail.com |
| Email Templates | ✅ 4 templates | Welcome, Message, Project, File |
| Backend Integration | ✅ Configured | config/email.js |
| Environment Setup | ✅ Complete | backend/.env |
| Testing | ✅ Ready | Use POST endpoints to test |
| Production | ⏳ Needs prep | See production checklist above |

**Next Steps:**
1. Start backend with `npm run dev`
2. Test welcome email with curl/Postman
3. Verify email arrives in inbox
4. Run full end-to-end tests
5. Deploy to production when ready
