import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';
import process from 'node:process';

const RAZORPAY_API_BASE = 'https://api.razorpay.com/v1';

const COURSES = {
  promptx: {
    badge: 'PromptX',
    title: 'AI Prompt Engineering Mastery',
    price: 12500
  },
  growthx: {
    badge: 'GrowthX',
    title: 'AI Digital Marketing Mastery',
    price: 12500
  },
  brandx: {
    badge: 'BrandX',
    title: 'Brand Builder Pro',
    price: 9999
  },
  copycraft: {
    badge: 'CopyCraft',
    title: 'CopyCraft Mastery',
    price: 11999
  }
};

const sendJson = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const readJsonBody = async (req) => {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

const getCredentials = () => ({
  keyId: process.env.RAZORPAY_KEY_ID,
  keySecret: process.env.RAZORPAY_KEY_SECRET
});

const safeCompareHex = (expected, actual) => {
  const expectedBuffer = Buffer.from(expected, 'hex');
  const actualBuffer = Buffer.from(String(actual || ''), 'hex');

  return (
    expectedBuffer.length === actualBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  );
};

const fetchRazorpayEntity = async (path, keyId, keySecret) => {
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
  const response = await fetch(`${RAZORPAY_API_BASE}${path}`, {
    headers: {
      Authorization: `Basic ${auth}`
    }
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error?.description || 'Unable to verify payment with Razorpay.');
  }

  return data;
};

export default async function handler(req, res) {
  if (process.env.RAZORPAY_ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', process.env.RAZORPAY_ALLOWED_ORIGIN);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    const { keyId, keySecret } = getCredentials();
    if (!keyId || !keySecret) {
      return sendJson(res, 500, { error: 'Razorpay keys are not configured on the server.' });
    }

    const payload = await readJsonBody(req);
    const orderId = payload.razorpay_order_id;
    const paymentId = payload.razorpay_payment_id;
    const signature = payload.razorpay_signature;
    const expectedCourseId = String(payload.courseId || '').toLowerCase();

    if (!orderId || !paymentId || !signature) {
      return sendJson(res, 400, { error: 'Missing Razorpay payment verification fields.' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (!safeCompareHex(expectedSignature, signature)) {
      return sendJson(res, 400, { error: 'Payment signature verification failed.' });
    }

    const payment = await fetchRazorpayEntity(`/payments/${paymentId}`, keyId, keySecret);
    if (payment.order_id !== orderId) {
      return sendJson(res, 400, { error: 'Payment does not belong to the created order.' });
    }

    const order = await fetchRazorpayEntity(`/orders/${orderId}`, keyId, keySecret);
    if (payment.amount !== order.amount || payment.currency !== order.currency) {
      return sendJson(res, 400, { error: 'Payment amount does not match the order.' });
    }

    const courseId = String(order.notes?.courseId || expectedCourseId || '').toLowerCase();
    const course = COURSES[courseId];
    if (!course || (expectedCourseId && expectedCourseId !== courseId)) {
      return sendJson(res, 400, { error: 'Payment course details do not match the registration.' });
    }

    if (payment.status !== 'captured') {
      return sendJson(res, 409, {
        error: `Payment is ${payment.status || 'not captured'} in Razorpay. Please contact support if money was deducted.`
      });
    }

    return sendJson(res, 200, {
      verified: true,
      payment: {
        id: payment.id,
        orderId,
        status: payment.status,
        method: payment.method,
        amount: payment.amount,
        currency: payment.currency
      },
      order: {
        id: order.id,
        receipt: order.receipt,
        courseId,
        course: course.badge,
        title: course.title,
        price: course.price
      }
    });
  } catch (error) {
    console.error('Razorpay payment verification failed:', error);
    return sendJson(res, 500, { error: 'Unable to verify payment. Please contact support if money was deducted.' });
  }
}
