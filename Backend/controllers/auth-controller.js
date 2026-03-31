// controllers/authController.js

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/users.model');
const sendEmail = require('../utils/sendEmail');


module.exports = {

// Forgot Password Handler
forgotPassword : async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token and expiry
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 1000 * 60 * 15; // 15 mins
    await user.save();

    // 🔽 Your reset link
    const resetUrl = `http://localhost:5000/reset-password/${token}`;




    // ✅ Add HTML email message here
    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Hi ${user.name || 'User'},</p>
        <p>You recently requested to reset your password. Click the button below to set a new one:</p>
        <a href="${resetUrl}" style="display:inline-block; margin-top:10px; background-color:#4CAF50; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Reset Password</a>
        <p>This link is valid for 15 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr />
        <p style="font-size: 12px; color: gray;">© 2025 My Portfolio. All rights reserved.</p>
      </div>
    `;

    await sendEmail(user.email, 'Reset Your Password', message);

    res.status(200).json({ message: 'Password reset link sent to your email.' });

    

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},

// Reset Password Handler
resetPassword : async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hashing
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
},


OtpforgotPassword: async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.otpCode = otp;
    user.otpExpires = Date.now() + 1000 * 60 * 10; // 10 minutes
    await user.save();

    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Reset Password OTP</h2>
        <p>Your OTP for password reset is:</p>
        <h3>${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
      </div>
    `;



    await sendEmail(user.email, 'Your OTP for Password Reset', message);

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},

resetPasswordWithOTP: async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({
      email,
      otpCode: otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset via OTP error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}


}