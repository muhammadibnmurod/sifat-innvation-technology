import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "sifat-dev-secret-change-me";

export default function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Avtorizatsiya talab qilinadi" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token yaroqsiz yoki muddati tugagan" });
  }
}
