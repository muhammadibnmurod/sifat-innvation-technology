import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import requireAuth, { JWT_SECRET } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "Email va parol kiritilishi shart" });

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(String(email).trim().toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.password_hash))
    return res.status(401).json({ error: "Email yoki parol noto'g'ri" });

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "8h",
  });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

router.get("/me", requireAuth, (req, res) => {
  const user = db.prepare("SELECT id, email, name FROM users WHERE id = ?").get(req.user.id);
  if (!user) return res.status(401).json({ error: "Foydalanuvchi topilmadi" });
  res.json({ user });
});

export default router;
