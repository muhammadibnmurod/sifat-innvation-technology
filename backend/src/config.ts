import * as path from "path";
import * as fs from "fs";

// DATA_DIR — Render'da doimiy disk ulansa, DB va rasmlar o'sha yerda saqlanadi.
export const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "..");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
export const DB_PATH = path.join(DATA_DIR, "data.sqlite");
export const JWT_SECRET = process.env.JWT_SECRET || "sifat-dev-secret-change-me";

fs.mkdirSync(UPLOADS_DIR, { recursive: true });
