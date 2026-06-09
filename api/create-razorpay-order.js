import { Buffer } from 'node:buffer';
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

const toNote = (value) => String(value || '').slice(0, 120);

const buildReceipt = (courseId) => `mt_${courseId}_${Date.now()}`.slice(0, 40);

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
    const courseId = String(payload.courseId || '').toLowerCase();
    const course = COURSES[courseId];

    if (!course) {
      return sendJson(res, 400, { error: 'Please select a valid course before payment.' });
    }

    const student = payload.student || {};
    const orderPayload = {
      amount: course.price * 100,
      currency: 'INR',
      receipt: buildReceipt(courseId),
      notes: {
        courseId,
        course: course.badge,
        studentName: toNote(student.name),
        studentEmail: toNote(student.email),
        studentPhone: toNote(student.phone)
      }
    };

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const razorpayResponse = await fetch(`${RAZORPAY_API_BASE}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const order = await razorpayResponse.json().catch(() => null);

    if (!razorpayResponse.ok || !order?.id) {
      return sendJson(res, 502, {
        error: order?.error?.description || 'Unable to create Razorpay order right now.'
      });
    }

    return sendJson(res, 200, {
      keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      course: {
        id: courseId,
        badge: course.badge,
        title: course.title,
        price: course.price
      }
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return sendJson(res, 500, { error: 'Unable to start payment. Please try again.' });
  }
}
