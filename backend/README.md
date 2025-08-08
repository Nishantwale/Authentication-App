# Login Signup Backend

This backend provides authentication APIs for a mobile app:

## Endpoints

- `POST /signup` — Register a new user (username, email, password)
- `POST /login` — Login with email and password
- `POST /send-otp` — Send 6-digit OTP to email for password reset
- `POST /reset-password` — Reset password using OTP

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up MongoDB (local or Atlas)
3. Update `your-email@gmail.com` and `your-app-password` in `index.js` for nodemailer
4. Start server:
   ```bash
   npm start
   ```

## Notes
- Passwords are hashed with bcryptjs
- OTP expires in 10 minutes
- CORS enabled for frontend integration
