export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { pass } = req.body || {};
  const ADMIN_PASS = process.env.ADMIN_PASS;

  if (!ADMIN_PASS) {
    return res.status(500).json({ error: "Server not configured" });
  }
  if (pass === ADMIN_PASS) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
}
