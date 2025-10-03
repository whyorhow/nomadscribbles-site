import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'nomadscribbles20@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Nomad Scribbles" <info@nomadscribbles.com>',
      to: 'nomadscribbles20@gmail.com',
      subject: `New message from ${name}`,
      text: message,
      replyTo: email,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    // Detailed logging
    console.error("Nodemailer error:", error);
    res.status(500).json({ 
      message: 'Error sending email', 
      error: error.message || error.toString() 
    });
  }
}
