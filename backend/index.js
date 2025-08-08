import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// In-memory user storage
const users = [];

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  res.json({ success: true, message: "Signup successful" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ success: false, message: "Invalid credentials" });
  res.json({ success: true, message: "Login successful", username: user.username });
});

// Send OTP for Forgot Password
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ success: false, message: "Email not found" });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  // Configure nodemailer (use your email credentials)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nishantwale283@gmail.com",
      pass: "imkd ltxu smeo ggxq"
    }
  });

  await transporter.sendMail({
    from: "nishantwale283@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  });

  res.json({ success: true, message: "OTP sent to email" });
});

// Reset Password with OTP
app.post("/reset-password", async (req, res) => {
  const { email, otp, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ success: false, message: "Invalid OTP or expired" });
  }
  user.password = await bcrypt.hash(password, 10);
  user.otp = undefined;
  user.otpExpires = undefined;
  res.json({ success: true, message: "Password reset successful" });
});

app.listen(4000, "192.168.43.252", () => {
  console.log("Backend running on http://192.168.43.252:4000");
});
