export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4001/api';

export function isAndroid() {
  return /Android/i.test(navigator.userAgent || '');
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent || '') && !window.MSStream;
}

export async function getTruecallerConfig() {
  try {
    const res = await fetch(`${API_BASE}/auth/truecaller/config`);
    return res.ok ? res.json() : { enabled: false };
  } catch {
    return { enabled: false };
  }
}

export async function beginTruecaller() {
  const cfg = await getTruecallerConfig();
  if (!cfg.enabled || !cfg.partnerKey) return { available: false, config: cfg };

  const startRes = await fetch(`${API_BASE}/auth/truecaller/start`);
  if (!startRes.ok) return { available: false, config: cfg };
  const { requestId } = await startRes.json();

  const params = new URLSearchParams({
    type: 'btmsheet',
    requestNonce: requestId,
    partnerKey: cfg.partnerKey,
    partnerName: cfg.partnerName || 'Website',
    lang: 'hi',
    loginPrefix: 'getstarted',
    loginSuffix: 'login',
    ctaPrefix: 'continuewith',
    ctaColor: `%23${cfg.ctaColor || '00aeef'}`,
    ctaTextColor: '%23ffffff',
    btnShape: 'round',
    skipOption: 'useanothermethod',
    ttl: '600000',
  });

  window.location = `truecallersdk://truesdk/web_verify?${params.toString()}`;

  return { available: true, requestId, config: cfg };
}

export function pollTruecaller({ requestId, onResult, interval = 2000, timeoutMs = 210000 }) {
  const started = Date.now();
  let stopped = false;

  const stop = (result) => {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
    if (onResult) onResult(result);
  };

  const timer = setInterval(async () => {
    if (stopped) return;
    if (Date.now() - started > timeoutMs) {
      stop({ status: 'timeout' });
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/truecaller/status?requestId=${encodeURIComponent(requestId)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.status === 'verified' || data.status === 'user_rejected' || data.status === 'expired' || data.status === 'failed') {
        stop(data);
      }
    } catch {
      // keep polling until timeout
    }
  }, interval);

  return stop;
}

export function androidNote() {
  if (isAndroid()) return 'Works on this device — press and allow in Truecaller.';
  if (isIOS()) return 'Truecaller login works on Android devices only.';
  return 'Truecaller login works on Android mobile browsers only.';
}