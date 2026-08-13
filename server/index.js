import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));

const { Schema, model } = mongoose;

const SiteDataSchema = new Schema(
  {
    key: { type: String, unique: true, required: true },
    data: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

const SiteData = model('SiteData', SiteDataSchema);

async function getDoc(key, fallback = null) {
  const doc = await SiteData.findOne({ key });
  return doc ? doc.data : fallback;
}

async function upsertDoc(key, data) {
  return SiteData.findOneAndUpdate({ key }, { key, data }, { upsert: true, new: true });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/api/site', async (_req, res) => {
  try {
    const [config, products] = await Promise.all([
      getDoc('config', null),
      getDoc('products', null)
    ]);
    res.json({ config, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/config', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'config object required' });
    }
    await upsertDoc('config', req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'products array required' });
    }
    await upsertDoc('products', req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ------------------------------- Truecaller ------------------------------- */

const TC_PARTNER_KEY = process.env.TRUECALLER_APP_KEY || '';
const TC_PARTNER_NAME = process.env.TRUECALLER_PARTNER_NAME || 'Aqua Pure';
const TC_CTA_COLOR = process.env.TRUECALLER_CTA_COLOR || '00aeef';
const tcRequests = new Map();
const TC_TTL = 10 * 60 * 1000;

function tcCleanup() {
  const now = Date.now();
  for (const [id, entry] of tcRequests) {
    if (now - entry.createdAt > TC_TTL) entry.status = 'expired';
  }
}

async function tcAdminPhone() {
  const config = await getDoc('config', {});
  return String(config?.contact?.phone || '').replace(/\D/g, '');
}

app.get('/api/auth/truecaller/config', (_req, res) => {
  res.json({
    enabled: Boolean(TC_PARTNER_KEY),
    partnerKey: TC_PARTNER_KEY,
    partnerName: TC_PARTNER_NAME,
    ctaColor: TC_CTA_COLOR
  });
});

app.get('/api/auth/truecaller/start', (_req, res) => {
  tcCleanup();
  if (!TC_PARTNER_KEY) return res.status(400).json({ error: 'Truecaller not configured' });
  const requestId = crypto.randomBytes(16).toString('hex');
  tcRequests.set(requestId, { createdAt: Date.now(), status: 'pending' });
  res.json({ requestId });
});

app.post('/api/auth/truecaller/callback', async (req, res) => {
  const body = req.body ?? {};
  const requestId = String(body.requestId || '');
  const entry = tcRequests.get(requestId);
  if (!entry) return res.status(400).json({ error: 'Unknown requestId' });
  res.setTimeout(2800);
  if (body.status === 'user_rejected') {
    entry.status = 'user_rejected';
    return res.json({ ok: true });
  }
  const accessToken = String(body.accessToken || '');
  const endpoint = String(body.endpoint || '');
  if (!accessToken || !endpoint) return res.status(400).json({ error: 'Missing accessToken or endpoint' });
  try {
    const r = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(2500)
    });
    const profile = r.ok ? await r.json() : null;
    const phone = String((profile?.phoneNumbers?.[0] || '').replace(/\D/g, ''));
    const first = profile?.name?.first || '';
    const last = profile?.name?.last || '';
    entry.phone = phone;
    entry.name = [first, last].filter(Boolean).join(' ').trim();
    entry.status = 'verified';
  } catch (err) {
    entry.status = 'failed';
    console.error('Truecaller profile fetch failed:', err.message);
  }
  res.json({ ok: true });
});

app.get('/api/auth/truecaller/status', async (req, res) => {
  const entry = tcRequests.get(String(req.query.requestId || ''));
  if (!entry) return res.json({ status: 'unknown' });
  let isAdmin = false;
  if (entry.status === 'verified') {
    const adminPhone = await tcAdminPhone();
    isAdmin = Boolean(adminPhone) && entry.phone === adminPhone;
  }
  res.json({
    status: entry.status,
    phone: entry.phone || '',
    name: entry.name || '',
    isAdmin
  });
});

app.post('/api/auth/truecaller/verify', async (req, res) => {
  const entry = tcRequests.get(String(req.body?.requestId || ''));
  if (!entry || entry.status !== 'verified') {
    return res.status(400).json({ error: 'Verification not completed' });
  }
  const adminPhone = await tcAdminPhone();
  res.json({
    phone: entry.phone,
    name: entry.name,
    isAdmin: Boolean(adminPhone) && entry.phone === adminPhone
  });
});

const PORT = process.env.PORT || 4000;

async function connectWithRetry(retries = Infinity) {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('   Retrying in 30s — add your current IP to Atlas whitelist to fix.');
    setTimeout(() => connectWithRetry(), 30000);
  }
}

connectWithRetry();
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});