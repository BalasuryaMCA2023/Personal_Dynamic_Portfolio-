const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phonenumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },

  otpCode: String,
  otpExpires: Date,
  resetToken: String,
  resetTokenExpiration: Date,
});

// ✅ Automatically hash password before save
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Token generator for password reset
adminSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.resetToken = token;
  this.resetTokenExpiration = Date.now() + 1000 * 60 * 15; // 15 minutes
  return token;
};

const User = mongoose.model("User", adminSchema);

module.exports = User;
