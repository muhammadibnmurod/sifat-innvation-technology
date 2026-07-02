import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// DATA_DIR — Render'da doimiy disk ulansa, DB o'sha yerda saqlanadi.
const dataDir = process.env.DATA_DIR || __dirname;
fs.mkdirSync(dataDir, { recursive: true });
const db = new Database(path.join(dataDir, "data.sqlite"));
db.pragma("journal_mode = WAL");

// ---------------------------------------------------------------- schema
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Admin',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT 'Wrench',
  image TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  body TEXT DEFAULT '',
  image TEXT DEFAULT '',
  category TEXT DEFAULT '',
  date TEXT DEFAULT (date('now')),
  published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo TEXT DEFAULT '',
  url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS faq (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','read','answered')),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data TEXT NOT NULL
);
`);

// ---------------------------------------------------------------- seed
export function seed() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@sifat.uz";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (!db.prepare("SELECT id FROM users WHERE email = ?").get(adminEmail)) {
    db.prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)").run(
      adminEmail,
      bcrypt.hashSync(adminPassword, 10),
      "Administrator"
    );
    console.log(`[db] admin user seeded: ${adminEmail}`);
  }

  if (db.prepare("SELECT COUNT(*) c FROM services").get().c === 0) {
    const ins = db.prepare(
      "INSERT INTO services (title, description, icon, sort_order, active) VALUES (?, ?, ?, ?, 1)"
    );
    [
      ["Ekspertiza va hujjatlashtirish", "Kranlarni diagnostika qilish, sanoat xavfsizligi ekspertizasi hamda pasport va texnik hujjatlarni rasmiylashtirish.", "FileSearch"],
      ["Ta'mirlash ishlari", "Yuk ko'taruvchi mashinalar, ko'prikli va kozlovoy kranlar hamda kran yo'llarini joriy va kapital ta'mirlash.", "Wrench"],
      ["Rekonstruksiya va modernizatsiya", "Ko'prikli kranlarni qayta qurish, modernizatsiya qilish va tegishli loyiha hujjatlarini tayyorlash.", "RefreshCw"],
      ["PS va infratuzilma", "Kranlar va ularning infratuzilmasi bo'yicha rejalashtirish, raqamli tahlil va uskunalarni sozlash.", "Building2"],
      ["Xavfsizlik asboblari", "Kranlarning xavfsizlik asboblarini o'rnatish, sozlash va davriy texnik tekshiruvdan o'tkazish.", "ShieldCheck"],
      ["Maxsus xizmatlar", "Barcha rusumdagi kranlarni ko'rikdan o'tkazish, elektr yuritmalar ekspertizasi va protokolli sinovlar.", "Cpu"],
    ].forEach(([t, d, i], idx) => ins.run(t, d, i, idx + 1));
  }

  if (db.prepare("SELECT COUNT(*) c FROM news").get().c === 0) {
    const ins = db.prepare(
      "INSERT INTO news (title, excerpt, body, category, date, published) VALUES (?, ?, ?, ?, ?, 1)"
    );
    ins.run(
      "GOST 33715-2025 standarti qabul qilindi",
      "Standartlashtirish, metrologiya va sertifikatlashtirish bo'yicha davlatlararo Kengash «Yuk ilg'ich moslamalar. Xavfsiz foydalanish» standartini qabul qildi.",
      "Standartlashtirish, metrologiya va sertifikatlashtirish bo'yicha davlatlararo Kengash «Yuk ilg'ich moslamalar. Xavfsiz foydalanish» standartini qabul qildi.\n\nUshbu standart yuk ilg'ich moslamalardan xavfsiz foydalanish bo'yicha umumiy talablarni belgilaydi va sohadagi barcha korxonalar uchun muhim ahamiyatga ega.",
      "Standartlar",
      "2025-08-07"
    );
    ins.run(
      "Kran yo'llari uchun yangi GOST loyihasi",
      "Sifat Innovatsion Texnologiya ishlab chiqqan «Yerusti rels kran yo'llari. Umumiy texnik talablar» standarti qabul qilish bosqichida.",
      "Sifat Innovatsion Texnologiya ishlab chiqqan «Yerusti rels kran yo'llari. Umumiy texnik talablar» standarti qabul qilish bosqichida.\n\nStandart kran yo'llarini loyihalash, qurish va ekspluatatsiya qilish bo'yicha yagona texnik talablarni joriy etadi.",
      "Ishlanma",
      "2025-08-02"
    );
    ins.run(
      "Mutaxassislar uchun malaka oshirish seminari",
      "Yuk ko'taruvchi mashinalarni ko'rikdan o'tkazish va ta'mirlash bo'yicha amaliy seminar bo'lib o'tdi.",
      "Yuk ko'taruvchi mashinalarni ko'rikdan o'tkazish va ta'mirlash bo'yicha amaliy seminar bo'lib o'tdi.\n\nSeminarda soha mutaxassislari zamonaviy diagnostika usullari va xavfsizlik talablari bilan tanishdilar.",
      "Tadbirlar",
      "2025-07-15"
    );
  }

  if (db.prepare("SELECT COUNT(*) c FROM partners").get().c === 0) {
    const ins = db.prepare("INSERT INTO partners (name, sort_order) VALUES (?, ?)");
    ["Uralmash", "Kranmash", "KAMAZ", "GAZprom", "NLMK", "Severstal",
     "Transneft", "Nefaz", "TatSpets", "RGK", "Diakon", "Yamaha"]
      .forEach((n, i) => ins.run(n, i + 1));
  }

  if (db.prepare("SELECT COUNT(*) c FROM faq").get().c === 0) {
    const ins = db.prepare("INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)");
    [
      ["Qanday kranlarni ta'mirlaysiz?", "Ko'prikli, kozlovoy, minorali va boshqa yuk ko'taruvchi kranlarning deyarli barcha turlarini ta'mirlaymiz — joriy ta'mirdan kapital tiklashgacha."],
      ["Ekspertiza qancha vaqt oladi?", "Obyekt hajmi va murakkabligiga qarab, sanoat xavfsizligi ekspertizasi odatda 3–10 ish kunini oladi."],
      ["Texnik hujjatlarni rasmiylashtirasizmi?", "Ha. Pasport, texnik kartalar va boshqa barcha zarur hujjatlarni amaldagi standartlarga muvofiq tayyorlab beramiz."],
      ["Xizmat ko'rsatish hududi qayer?", "Toshkent shahri va butun O'zbekiston bo'ylab xizmat ko'rsatamiz. Kerak bo'lsa mutaxassislarimiz obyektga chiqadi."],
    ].forEach(([q, a], i) => ins.run(q, a, i + 1));
  }

  if (!db.prepare("SELECT id FROM settings WHERE id = 1").get()) {
    const defaults = {
      phone: "+998 99 866 02 71",
      email: "sifat.saffatt@gmail.com",
      address: "Toshkent shahri, Mirobod tumani",
      working_hours: "Du–Sha, 9:00 – 18:00",
      socials: { facebook: "", youtube: "", instagram: "", telegram: "" },
      hero_badge: "2014 yildan beri Toshkentda",
      hero_title: "Yuk ko'taruvchi kranlarni **professional** ta'mirlash",
      hero_subtitle:
        "Malakali mutaxassislarimiz kran yo'llarini ko'zdan kechirish, tekshirish va texnik ta'mirlash bo'yicha barcha ishlarni zamonaviy uskunalar bilan bajaradi — ekspertizadan to kapital ta'mirgacha.",
      about_text:
        "Sifat Innovatsion Texnologiya xavfli ishlab chiqarish obyektlarida sanoat xavfsizligi ekspertizasi, yuk ko'taruvchi mashinalar va kran yo'llarini loyihalash hamda ta'mirlash bilan shug'ullanadi.",
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      stats: { experience: 10, projects: 500, clients: 120, services: 15 },
    };
    db.prepare("INSERT INTO settings (id, data) VALUES (1, ?)").run(JSON.stringify(defaults));
  }
}

export default db;
