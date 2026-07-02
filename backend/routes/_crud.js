import { Router } from "express";
import db from "../db.js";
import requireAuth from "../middleware/auth.js";

// Generic REST factory for simple tables.
// fields: [{ name, required?, default? }]
export default function crudRouter({ table, fields, orderBy = "sort_order ASC, id ASC", publicFilter = "" }) {
  const router = Router();
  const names = fields.map((f) => f.name);

  // Public list. ?all=1 (admin) returns everything.
  router.get("/", (req, res) => {
    const wantAll = req.query.all === "1";
    const where = !wantAll && publicFilter ? `WHERE ${publicFilter}` : "";
    const rows = db.prepare(`SELECT * FROM ${table} ${where} ORDER BY ${orderBy}`).all();
    res.json(rows);
  });

  router.get("/:id", (req, res) => {
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
    if (!row) return res.status(404).json({ error: "Topilmadi" });
    res.json(row);
  });

  router.post("/", requireAuth, (req, res) => {
    for (const f of fields) {
      if (f.required && !String(req.body?.[f.name] ?? "").trim())
        return res.status(400).json({ error: `"${f.name}" maydoni to'ldirilishi shart` });
    }
    const values = fields.map((f) => normalize(req.body?.[f.name], f));
    const info = db
      .prepare(`INSERT INTO ${table} (${names.join(",")}) VALUES (${names.map(() => "?").join(",")})`)
      .run(...values);
    res.status(201).json(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(info.lastInsertRowid));
  });

  router.put("/:id", requireAuth, (req, res) => {
    const existing = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
    if (!existing) return res.status(404).json({ error: "Topilmadi" });
    const updates = fields.filter((f) => req.body?.[f.name] !== undefined);
    if (updates.length === 0) return res.json(existing);
    const setSql = updates.map((f) => `${f.name} = ?`).join(", ");
    const values = updates.map((f) => normalize(req.body[f.name], f));
    db.prepare(`UPDATE ${table} SET ${setSql} WHERE id = ?`).run(...values, req.params.id);
    res.json(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id));
  });

  router.delete("/:id", requireAuth, (req, res) => {
    const info = db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: "Topilmadi" });
    res.json({ ok: true });
  });

  // Reorder: { ids: [3,1,2] } → sort_order by position.
  router.put("/reorder/all", requireAuth, (req, res) => {
    const ids = req.body?.ids;
    if (!Array.isArray(ids)) return res.status(400).json({ error: "ids massivi kerak" });
    const stmt = db.prepare(`UPDATE ${table} SET sort_order = ? WHERE id = ?`);
    const tx = db.transaction(() => ids.forEach((id, i) => stmt.run(i + 1, id)));
    tx();
    res.json(db.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy}`).all());
  });

  return router;
}

function normalize(value, field) {
  if (value === undefined || value === null) value = field.default ?? "";
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}
