import nodemailer from 'nodemailer';
import { Buffer } from 'node:buffer';
import { prepareEnquiry } from './enquiry-message.js';
export const createEnquiryHandler = env => async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  const respond = (status, data) => { res.statusCode = status; res.end(JSON.stringify(data)); };
  if (req.method !== 'POST') return respond(405, { error: 'Method Not Allowed' });
  let message;
  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk.toString();
      if (Buffer.byteLength(body) > 20000) return respond(413, { error: 'Request too large.' });
    }
    message = prepareEnquiry(JSON.parse(body));
  } catch { return respond(400, { error: 'Please provide valid enquiry details.' }); }
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) return respond(503, { error: 'Email service is not configured.' });
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST, port: Number(env.SMTP_PORT || 465), secure: Number(env.SMTP_PORT || 465) === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000, dnsTimeout: 5000,
  });
  try {
    const result = await transport.sendMail({ ...message, from: { name: 'Monkey Tribe', address: env.SMTP_USER } });
    if (!result.accepted?.length) throw new Error('Recipient not accepted');
    return respond(200, { success: true });
  } catch (error) {
    console.error('Enquiry email failed:', error.code || 'SEND_FAILED');
    return respond(502, { error: 'Unable to send enquiry email. Please try again later.' });
  } finally { transport.close(); }
};
