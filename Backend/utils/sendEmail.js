const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER || "balasuryasurya03@gmail.com",
        pass: (process.env.GOOGLE_APP_PASSWORD || "plye hoxx yzeh duju").replace(/\s+/g, ''),
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER || "balasuryasurya03@gmail.com",
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};

module.exports = sendEmail;
