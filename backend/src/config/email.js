const nodemailer = require("nodemailer");

async function sendOtpEmail(to, otp) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error(
      "GMAIL_USER and GMAIL_APP_PASSWORD must be configured to send OTP emails"
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: GMAIL_USER,
    to,
    subject: "Your verification code",
    text: `Your verification code is ${otp}. It expires in 5 minutes.`,
    html: `<p>Your verification code is <strong>${otp}</strong>.</p><p>It expires in 5 minutes.</p>`,
  });
}

module.exports = { sendOtpEmail };
