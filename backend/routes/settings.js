import { Router } from "express";
import db from "../db.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

function read() {
  const row = db.prepare("SELECT data FROM settings WHERE id = 1").get();
  return row ? JSON.parse(row.data) : {};
}

// Public: site settings (contact info, hero text, stats...)
router.get("/", (_req, res) => res.json(read()));

// Admin: merge-update settings.
router.put("/", requireAuth, (req, res) => {
  const merged = { ...read(), ...(req.body || {}) };
  db.prepare("UPDATE settings SET data = ? WHERE id = 1").run(JSON.stringify(merged));
  res.json(merged);
});

export default router;
