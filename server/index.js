import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });