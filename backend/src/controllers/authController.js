import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";
import { ENV } from "../lib/env.js";
import { sendEmail, emailTemplates } from "../lib/email.js";
import twilio from "twilio";

const getTwilioClient = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) return null;
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });
};

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    console.log("=== SIGNUP ATTEMPT ===");
    console.log("Request body:", { name, email, passwordLength: password?.length });
    console.log("Database connected:", mongoose.connection.readyState === 1);

    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    console.log("Checking for existing user...");
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ Email already exists:", email);
      return res.status(400).json({ message: "Email already exists" });
    }

    console.log("Creating new user...");
    const user = await User.create({ name, email, password });
    console.log("✅ User created successfully!");
    console.log("   ID:", user._id);
    console.log("   Name:", user.name);
    console.log("   Email:", user.email);

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("✅ Signup successful, sending response");
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("=== SIGNUP ERROR ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    
    if (error.code === 11000) {
      console.error("❌ Duplicate key error - email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }
    
    if (error.name === 'ValidationError') {
      console.error("❌ Validation error:", error.message);
      return res.status(400).json({ message: error.message });
    }
    
    console.error("Full error:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: ENV.NODE_ENV === "development" ? error.message : "Registration failed"
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email});

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("token", "", { 
      maxAge: 0,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMe(req, res) {
  try {
    res.status(200).json({
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileImage: req.user.profileImage,
        role: req.user.role,
        phone: req.user.phone || null,
      },
    });
  } catch (error) {
    console.error("Error in getMe controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({ 
        message: "If an account exists with this email, you will receive a password reset link" 
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // Hash token before saving to database
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    // Save hashed token and expiry (1 hour)
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create reset URL
    const resetUrl = `${ENV.CLIENT_URL}/reset-password/${resetToken}`;

    // Send password reset email - don't let email failures expose user existence
    try {
      const emailResult = await sendEmail({
        to: user.email,
        ...emailTemplates.passwordReset({
          userName: user.name,
          resetUrl,
          expiresIn: '1 hour',
        }),
      });

      // Log for development
      if (ENV.NODE_ENV === "development") {
        console.log("\n" + "=".repeat(60));
        console.log("📧 PASSWORD RESET EMAIL");
        console.log("=".repeat(60));
        console.log("To:", user.email);
        console.log("Email sent:", emailResult.success ? "✅ Yes" : "❌ No");
        if (!emailResult.success && emailResult.skipped) {
          console.log("⚠️  SMTP not configured - email skipped");
        }
        console.log("\n🔗 Reset URL (valid for 1 hour):");
        console.log(resetUrl);
        console.log("=".repeat(60) + "\n");
      }
    } catch (emailError) {
      // Log email error but don't expose it to user for security
      console.error("Failed to send password reset email:", emailError);
      
      // In development, still log the reset URL so it can be used
      if (ENV.NODE_ENV === "development") {
        console.log("\n" + "=".repeat(60));
        console.log("⚠️  EMAIL FAILED - But here's the reset URL:");
        console.log("=".repeat(60));
        console.log(resetUrl);
        console.log("=".repeat(60) + "\n");
      }
    }

    // Always return success message regardless of email result
    res.status(200).json({
      message: "If an account exists with this email, you will receive a password reset link",
      // Remove this in production - only for development
      resetUrl: ENV.NODE_ENV === "development" ? resetUrl : undefined,
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Hash the token from URL to compare with database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now login with your new password." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Send OTP to phone number
export async function sendPhoneOtp(req, res) {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    // Normalize phone — must be E.164 format e.g. +919876543210
    const normalized = phone.startsWith("+") ? phone : `+${phone}`;

    const user = await User.findOne({ phone: normalized });
    if (!user) {
      return res.status(404).json({ message: "No account found with this phone number" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    user.phoneOtp = hashedOtp;
    user.phoneOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const client = getTwilioClient();
    if (!client) {
      // Dev fallback — log OTP
      console.log(`\n📱 OTP for ${normalized}: ${otp}\n`);
      return res.status(200).json({
        message: "OTP sent (dev mode — check server logs)",
        devOtp: ENV.NODE_ENV === "development" ? otp : undefined,
      });
    }

    await client.messages.create({
      body: `Your Talent IQ password reset OTP is: ${otp}. Valid for 10 minutes. Do not share this with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: normalized,
    });

    res.status(200).json({ message: "OTP sent to your phone number" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
}

// Verify OTP and reset password
export async function resetPasswordWithOtp(req, res) {
  try {
    const { phone, otp, password } = req.body;

    if (!phone || !otp || !password) {
      return res.status(400).json({ message: "Phone, OTP, and new password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalized = phone.startsWith("+") ? phone : `+${phone}`;
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      phone: normalized,
      phoneOtp: hashedOtp,
      phoneOtpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = password;
    user.phoneOtp = null;
    user.phoneOtpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now login." });
  } catch (error) {
    console.error("Error in resetPasswordWithOtp:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Save/update phone number (authenticated)
export async function updatePhone(req, res) {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    const normalized = phone.startsWith("+") ? phone : `+${phone}`;
    await User.findByIdAndUpdate(req.user._id, { phone: normalized });
    res.status(200).json({ message: "Phone number updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
