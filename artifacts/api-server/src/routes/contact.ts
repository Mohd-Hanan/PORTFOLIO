import { Router } from "express";
import nodemailer from "nodemailer";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    req.log.error("GMAIL_USER or GMAIL_APP_PASSWORD not set");
    res.status(503).json({ error: "Email service not configured" });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: "mohdhanan197@gmail.com",
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f0f13; color: #e8e8e8; border-radius: 8px;">
          <h2 style="color: #7c5cfc; margin-bottom: 4px;">New Portfolio Message</h2>
          <p style="color: #888; font-size: 14px; margin-top: 0;">via mohdhananpp.dev</p>
          <hr style="border: 1px solid #2a2a3a; margin: 20px 0;" />
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #7c5cfc;">${email}</a></p>
          <hr style="border: 1px solid #2a2a3a; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    req.log.info({ name, email }, "Contact email sent");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default contactRouter;
