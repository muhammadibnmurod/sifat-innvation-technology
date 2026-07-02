import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import crypto from "crypto";
import { fileURLToPath } from "url";

import db, { seed } from "./db.js";
import requireAuth from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import newsRoutes from "./routes/news.js";
import partnersRoutes from "./routes/partners.js";
import faqRoutes from "./routes/faq.js";
import messagesRoutes from "./routes/messages.js";
import settingsRoutes from "./routes/settings.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

seed();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ------------------------------------------------------------ uploads
// DATA_DIR — Render'da doimiy disk ulansa, rasmlar o'sha yerda saqlanadi.
const uploadsDir = path.join(process.env.DATA_DIR || __dirname, "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif|svg\+xml|avif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Faqat rasm fayllari qabul qilinadi"));
  },
});

app.post("/api/upload", requireAuth, (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      const msg =
        err.code === "LIMIT_FILE_SIZE" ? "Rasm hajmi 5MB dan oshmasligi kerak" : err.message;
      return res.status(400).json({ error: msg });
    }
    if (!req.file) return res.status(400).json({ error: "Fayl yuborilmadi" });
    res.status(201).json({ url: `/uploads/${req.file.filename}` });
  });
});

app.use("/uploads", express.static(uploadsDir, { maxAge: "7d" }));

// ------------------------------------------------------------ routes
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Dashboard stats (single round-trip for the admin dashboard).
app.get("/api/stats", requireAuth, (_req, res) => {
  res.json({
    services: db.prepare("SELECT COUNT(*) c FROM services").get().c,
    news: db.prepare("SELECT COUNT(*) c FROM news").get().c,
    partners: db.prepare("SELECT COUNT(*) c FROM partners").get().c,
    newMessages: db.prepare("SELECT COUNT(*) c FROM messages WHERE status = 'new'").get().c,
    latestMessages: db.prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 5").all(),
    latestNews: db.prepare("SELECT id, title, date, published FROM news ORDER BY date DESC, id DESC LIMIT 5").all(),
  });
});

// 404 + error handlers
app.use("/api", (_req, res) => res.status(404).json({ error: "Endpoint topilmadi" }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server xatosi" });
});

app.listen(PORT, () => console.log(`[server] API http://localhost:${PORT}`));
