import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Log the request body to confirm it's reaching the function
  console.log("Form data received:", { name, email, message });

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'nomadscribbles20@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log("SMTP server is ready to take messages");
  } catch (verifyError) {
    console.error("SMTP verification error:", verifyError);
    return res.status(500).json({ message: "SMTP verification failed", error: verifyError.toString() });
  }

  // Send the email
  try {
    const info = await transporter.sendMail({
      from: '"Nomad Scribbles" <info@nomadscribbles.com>',
      to: 'nomadscribbles20@gmail.com',
      subject: `Test message from ${name || "Test"}`,
      text: message || "This is a test email from the contact form.",
      replyTo: email || "nomadscribbles20@gmail.com",
    });

    console.log("Email sent:", info);
    res.status(200).json({ message: 'Email sent successfully!', info });
  } catch (sendError) {
    console.error("Error sending email:", sendError);
    res.status(500).json({ message: 'Error sending email', error: sendError.toString() });
  }
}
