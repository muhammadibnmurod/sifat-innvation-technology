import { Injectable, OnModuleInit } from "@nestjs/common";
import Database from "better-sqlite3";
import * as bcrypt from "bcryptjs";
import { DB_PATH } from "../config";

@Injectable()
export class DatabaseService implements OnModuleInit {
  readonly db: Database.Database;

  constructor() {
    this.db = new Database(DB_PATH);
    this.db.pragma("journal_mode = WAL");
  }

  onModuleInit() {
    this.createSchema();
    this.migrate();
    this.seed();
  }

  prepare(sql: string) {
    return this.db.prepare(sql);
  }

  transaction<T extends (...args: any[]) => any>(fn: T) {
    return this.db.transaction(fn);
  }

  private createSchema() {
    this.db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Admin',
  role TEXT DEFAULT 'user',
  permissions TEXT DEFAULT '[]',
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
  }

  // Eski bazalarni yangi tuzilishga o'tkazish (role, permissions, email → username).
  private migrate() {
    let cols = (this.db.prepare("PRAGMA table_info(users)").all() as any[]).map((c) => c.name);
    if (!cols.includes("role"))
      this.db.exec("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
    if (!cols.includes("permissions"))
      this.db.exec("ALTER TABLE users ADD COLUMN permissions TEXT DEFAULT '[]'");

    // email ustunli eski jadvalni username'ga o'tkazamiz:
    // "admin@sifat.uz" → "admin" (to'qnashuv bo'lsa to'liq email saqlanadi).
    cols = (this.db.prepare("PRAGMA table_info(users)").all() as any[]).map((c) => c.name);
    if (cols.includes("email") && !cols.includes("username")) {
      const tx = this.db.transaction(() => {
        this.db.exec(`
CREATE TABLE users_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Admin',
  role TEXT DEFAULT 'user',
  permissions TEXT DEFAULT '[]',
  created_at TEXT DEFAULT (datetime('now'))
);`);
        const rows = this.db.prepare("SELECT * FROM users ORDER BY id").all() as any[];
        const taken = new Set<string>();
        const ins = this.db.prepare(
          "INSERT INTO users_new (id, username, password_hash, name, role, permissions, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        for (const r of rows) {
          let username = String(r.email || "").split("@")[0].toLowerCase() || `user${r.id}`;
          if (taken.has(username)) username = String(r.email).toLowerCase();
          taken.add(username);
          ins.run(
            r.id,
            username,
            r.password_hash,
            r.name,
            r.role || "user",
            r.permissions || "[]",
            r.created_at
          );
        }
        this.db.exec("DROP TABLE users; ALTER TABLE users_new RENAME TO users;");
      });
      tx();
      console.log("[db] users jadvali username'ga o'tkazildi");
    }
  }

  private seed() {
    const db = this.db;
    const adminUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!db.prepare("SELECT id FROM users WHERE username = ?").get(adminUsername)) {
      db.prepare(
        "INSERT INTO users (username, password_hash, name, role, permissions) VALUES (?, ?, ?, 'admin', '[]')"
      ).run(adminUsername, bcrypt.hashSync(adminPassword, 10), "Administrator");
      console.log(`[db] admin user seeded: ${adminUsername}`);
    }
    // Asosiy admin doim 'admin' rolida qolsin (eski bazalar uchun ham).
    db.prepare("UPDATE users SET role = 'admin' WHERE username = ?").run(adminUsername);

    if ((db.prepare("SELECT COUNT(*) c FROM services").get() as any).c === 0) {
      const ins = db.prepare(
        "INSERT INTO services (title, description, icon, sort_order, active) VALUES (?, ?, ?, ?, 1)"
      );
      (
        [
          ["Ekspertiza va hujjatlashtirish", "Kranlarni diagnostika qilish, sanoat xavfsizligi ekspertizasi hamda pasport va texnik hujjatlarni rasmiylashtirish.", "FileSearch"],
          ["Ta'mirlash ishlari", "Yuk ko'taruvchi mashinalar, ko'prikli va kozlovoy kranlar hamda kran yo'llarini joriy va kapital ta'mirlash.", "Wrench"],
          ["Rekonstruksiya va modernizatsiya", "Ko'prikli kranlarni qayta qurish, modernizatsiya qilish va tegishli loyiha hujjatlarini tayyorlash.", "RefreshCw"],
          ["PS va infratuzilma", "Kranlar va ularning infratuzilmasi bo'yicha rejalashtirish, raqamli tahlil va uskunalarni sozlash.", "Building2"],
          ["Xavfsizlik asboblari", "Kranlarning xavfsizlik asboblarini o'rnatish, sozlash va davriy texnik tekshiruvdan o'tkazish.", "ShieldCheck"],
          ["Maxsus xizmatlar", "Barcha rusumdagi kranlarni ko'rikdan o'tkazish, elektr yuritmalar ekspertizasi va protokolli sinovlar.", "Cpu"],
        ] as const
      ).forEach(([t, d, i], idx) => ins.run(t, d, i, idx + 1));
    }

    if ((db.prepare("SELECT COUNT(*) c FROM news").get() as any).c === 0) {
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

    if ((db.prepare("SELECT COUNT(*) c FROM partners").get() as any).c === 0) {
      const ins = db.prepare("INSERT INTO partners (name, sort_order) VALUES (?, ?)");
      ["Uralmash", "Kranmash", "KAMAZ", "GAZprom", "NLMK", "Severstal",
       "Transneft", "Nefaz", "TatSpets", "RGK", "Diakon", "Yamaha"]
        .forEach((n, i) => ins.run(n, i + 1));
    }

    if ((db.prepare("SELECT COUNT(*) c FROM faq").get() as any).c === 0) {
      const ins = db.prepare("INSERT INTO faq (question, answer, sort_order) VALUES (?, ?, ?)");
      (
        [
          ["Qanday kranlarni ta'mirlaysiz?", "Ko'prikli, kozlovoy, minorali va boshqa yuk ko'taruvchi kranlarning deyarli barcha turlarini ta'mirlaymiz — joriy ta'mirdan kapital tiklashgacha."],
          ["Ekspertiza qancha vaqt oladi?", "Obyekt hajmi va murakkabligiga qarab, sanoat xavfsizligi ekspertizasi odatda 3–10 ish kunini oladi."],
          ["Texnik hujjatlarni rasmiylashtirasizmi?", "Ha. Pasport, texnik kartalar va boshqa barcha zarur hujjatlarni amaldagi standartlarga muvofiq tayyorlab beramiz."],
          ["Xizmat ko'rsatish hududi qayer?", "Toshkent shahri va butun O'zbekiston bo'ylab xizmat ko'rsatamiz. Kerak bo'lsa mutaxassislarimiz obyektga chiqadi."],
        ] as const
      ).forEach(([q, a], i) => ins.run(q, a, i + 1));
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
}
