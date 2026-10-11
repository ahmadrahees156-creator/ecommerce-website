# Backend

Node.js and Express API for the e-commerce website.

## Authentication

The API supports standard email/password login as well as OTP-based sign-in.

### OTP registration flow

- POST /api/auth/register
  - Body: { "name": "Jane Doe", "email": "user@example.com", "password": "secret123" }
  - Creates the user account, sends a six-digit OTP to the email, and waits for verification before completing registration.
  - If email delivery fails, retry with the same email and password to request a fresh OTP.

- POST /api/auth/send-otp
  - Body: { "email": "user@example.com" }
  - Resends a six-digit OTP to an existing account, or creates a user account if the email is not yet registered and includes a name + password.
  - The code expires after five minutes.

- POST /api/auth/verify-otp
  - Body: { "email": "user@example.com", "otp": "123456" }
  - Verifies the code and returns a JWT token on success.

### Gmail SMTP setup

Add these variables to `backend/.env`:

```env
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_16_character_google_app_password
```

Create an App Password in your Google Account after enabling 2-Step Verification, then use that password here (not your regular Gmail password). Keep `.env` private and never commit it. If email delivery is not configured or Gmail rejects the credentials, the send-OTP request fails instead of reporting success.
