import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { to, subject, body } = req.body || {};

  if (!to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, body' });
  }

  // Load environment variables
  const host = process.env.SMTP_HOST;
  const portStr = process.env.SMTP_PORT || '465';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error('SMTP configuration error: Missing environment variables on server.');
    return res.status(500).json({ error: 'SMTP server configuration is incomplete.' });
  }

  const port = parseInt(portStr, 10);
  const secure = port === 465;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false, // Prevents failure on self-signed custom domain certs
      },
    });

    await transporter.sendMail({
      from: `"Monkey Tribe Backup" <${user}>`,
      to,
      subject,
      text: body,
    });

    return res.status(200).json({ success: true, message: 'Backup email sent successfully!' });
  } catch (error) {
    console.error('SMTP error in Vercel Function:', error);
    return res.status(500).json({ error: 'Failed to send backup email via SMTP: ' + error.message });
  }
}
