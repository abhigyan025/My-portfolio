export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, id, fields, doc, pass } = req.body || {};

  const ADMIN_PASS = process.env.ADMIN_PASS;
  const SANITY_TOKEN = process.env.SANITY_TOKEN;

  if (!ADMIN_PASS || !SANITY_TOKEN) {
    return res.status(500).json({ error: "Server not configured — missing env vars" });
  }
  if (pass !== ADMIN_PASS) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const SANITY_PROJECT_ID = "zsm7toak";
  const SANITY_DATASET = "production";

  let mutations;

  if (action === "patch") {
    if (!id || !fields) return res.status(400).json({ error: "Missing id or fields" });
    mutations = [{ patch: { id, set: fields } }];
  } else if (action === "delete") {
    if (!id) return res.status(400).json({ error: "Missing id" });
    mutations = [{ delete: { id } }];
  } else if (action === "upsertSettings") {
    if (!doc || !doc._id) return res.status(400).json({ error: "Missing settings doc" });
    mutations = [{ createOrReplace: doc }];
  } else {
    return res.status(400).json({ error: "Unknown action" });
  }

  try {
    const sanityRes = await fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SANITY_TOKEN}`
        },
        body: JSON.stringify({ mutations })
      }
    );

    const data = await sanityRes.json();
    if (!sanityRes.ok) {
      return res.status(sanityRes.status).json({ error: data });
    }
    return res.status(200).json({ ok: true, result: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
