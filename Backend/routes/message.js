const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");
const sendEmail = require("../utils/sendEmail"); // Adjust if needed

// POST: Create a new message, notify admin, and send reply to user
router.post("/send", async (req, res) => {
  try {
    const { name, email, subject, content } = req.body;

    // 1. Save message in DB
    const message = new Message({ name, email, subject, content });
    await message.save();

    // 2. Notify Admin
    await sendEmail(
      process.env.MAIL_USER || "balasuryasurya03@gmail.com", // Admin email from env
      "New message has been received",
      `
        <h1>New message has been received</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${content}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    );

    // 3. Auto-reply to sender
    await sendEmail(
      email,
      "Your message has been received",
      `
        <h1>Your message has been received</h1>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thanks for reaching out to us! We've received your message with the following details:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <blockquote>${content}</blockquote>
        <p>We'll get back to you very soon.</p>
        <br/>
        <p>Best regards,<br/>Balasurya</p>
      `
    );

    res.status(201).json({ success: true, message: "Message sent and emails delivered." });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
