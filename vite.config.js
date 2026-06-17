import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'
import process from 'node:process'
import createRazorpayOrder from './api/create-razorpay-order.js'
import verifyRazorpayPayment from './api/verify-razorpay-payment.js'

const createSmtpMiddleware = (env) => (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const payload = JSON.parse(body);
      const { to, subject, body: emailBody } = payload;

      if (!to || !subject || !emailBody) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'Missing required fields: to, subject, body' }));
      }

      const host = env.SMTP_HOST;
      const portStr = env.SMTP_PORT || '465';
      const user = env.SMTP_USER;
      const pass = env.SMTP_PASS;

      if (!host || !user || !pass) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: 'SMTP configurations are missing in local .env' }));
      }

      const port = parseInt(portStr, 10);
      const secure = port === 465;

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        from: `"Monkey Tribe Backup (Local)" <${user}>`,
        to,
        subject,
        text: emailBody,
      });

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, message: 'Backup email sent successfully locally!' }));
    } catch (error) {
      console.error('Local SMTP Send Error:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to send backup email locally: ' + error.message }));
    }
  });
};

const syncServerEnv = (env) => {
  ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_ALLOWED_ORIGIN'].forEach((key) => {
    if (env[key]) {
      process.env[key] = env[key];
    }
  });
};

export default defineConfig(({ mode }) => {
  // Load environment variables (including non-VITE_ prefixed ones for SMTP server config)
  const env = loadEnv(mode, process.cwd(), '');
  syncServerEnv(env);

  return {
    plugins: [
      react(),
      {
        name: 'local-smtp-email-middleware',
        configureServer(server) {
          server.middlewares.use('/api/send-backup-email.php', createSmtpMiddleware(env));
          server.middlewares.use('/api/create-razorpay-order', createRazorpayOrder);
          server.middlewares.use('/api/create-razorpay-order.php', createRazorpayOrder);
          server.middlewares.use('/api/verify-razorpay-payment', verifyRazorpayPayment);
          server.middlewares.use('/api/verify-razorpay-payment.php', verifyRazorpayPayment);
        },
        configurePreviewServer(server) {
          server.middlewares.use('/api/send-backup-email.php', createSmtpMiddleware(env));
          server.middlewares.use('/api/create-razorpay-order', createRazorpayOrder);
          server.middlewares.use('/api/create-razorpay-order.php', createRazorpayOrder);
          server.middlewares.use('/api/verify-razorpay-payment', verifyRazorpayPayment);
          server.middlewares.use('/api/verify-razorpay-payment.php', verifyRazorpayPayment);
        }
      }
    ],
    base: '/',
  };
})
