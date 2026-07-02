import { Router } from "express";
import db from "../db.js";
import requireAuth from "../middleware/auth.js";

const router = Router();

// Public: submit a message from the contact form.
router.post("/", (req, res) => {
  const { name, phone = "", email = "", message } = req.body || {};
  if (!String(name || "").trim() || !String(message || "").trim())
    return res.status(400).json({ error: "Ism va xabar to'ldirilishi shart" });
  const info = db
    .prepare("INSERT INTO messages (name, phone, email, message) VALUES (?, ?, ?, ?)")
    .run(String(name).trim(), String(phone).trim(), String(email).trim(), String(message).trim());
  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

// Admin: list (optional ?status=new|read|answered)
router.get("/", requireAuth, (req, res) => {
  const { status } = req.query;
  const rows = status
    ? db.prepare("SELECT * FROM messages WHERE status = ? ORDER BY id DESC").all(status)
    : db.prepare("SELECT * FROM messages ORDER BY id DESC").all();
  res.json(rows);
});

router.get("/unread-count", requireAuth, (_req, res) => {
  res.json({ count: db.prepare("SELECT COUNT(*) c FROM messages WHERE status = 'new'").get().c });
});

router.get("/:id", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM messages WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Topilmadi" });
  res.json(row);
});

router.put("/:id", requireAuth, (req, res) => {
  const { status } = req.body || {};
  if (!["new", "read", "answered"].includes(status))
    return res.status(400).json({ error: "Noto'g'ri status" });
  const info = db.prepare("UPDATE messages SET status = ? WHERE id = ?").run(status, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: "Topilmadi" });
  res.json(db.prepare("SELECT * FROM messages WHERE id = ?").get(req.params.id));
});

router.delete("/:id", requireAuth, (req, res) => {
  const info = db.prepare("DELETE FROM messages WHERE id = ?").run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: "Topilmadi" });
  res.json({ ok: true });
});

export default router;
