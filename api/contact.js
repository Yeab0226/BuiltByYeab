const recipient = () => process.env.CONTACT_TO_EMAIL || 'Yabsiraalemayehu@gmail.com';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ error: 'JSON required.' });
  // Browser requests must come from this deployment. This supplements validation; it is not a bot-proof rate limiter.
  if (req.headers.origin) {
    const host = req.headers.host;
    try {
      if (new URL(req.headers.origin).host !== host) return res.status(403).json({ error: 'Origin not allowed.' });
    } catch { return res.status(403).json({ error: 'Invalid origin.' }); }
  }
  let data;
  try {
    if (typeof req.body === 'string' && Buffer.byteLength(req.body) > 24000) return res.status(413).json({ error: 'Message too large.' });
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error();
  } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  if (typeof data.website === 'string' && data.website.trim()) return res.status(200).json({ success: true });
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!name || name.length > 100 || /[\r\n\x00-\x1f]/.test(name) || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || !message || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter a valid name, email, and message.' });
  }
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Email service is not configured.' });
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'BuiltByYeab <onboarding@resend.dev>',
        to: [recipient()], reply_to: email,
        subject: `BuiltByYeab — message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(12000),
    });
    const result = await response.json();
    if (!response.ok || !result.id) {
      console.error('Contact email provider rejected the request:', response.status);
      return res.status(502).json({ error: 'Email could not be sent. Please try again later.' });
    }
    return res.status(200).json({ success: true });
  } catch {
    console.error('Contact email provider request failed.');
    return res.status(502).json({ error: 'Email could not be sent. Please try again later.' });
  }
}
