# Sifat Innovatsion Texnologiya

Korporativ sayt (React 19 + Vite + Tailwind CSS v4) va uning **admin paneli** (`/admin`) hamda **backend API** (`/server`, Express + SQLite).

## Ishga tushirish

```bash
# 1. Bog'liqliklarni o'rnatish
npm install

# 2. Muhit sozlamalari
cp .env.example .env   # kerak bo'lsa qiymatlarni o'zgartiring

# 3. Sayt + API ni birga ishga tushirish
npm run dev:all
```

- Sayt: http://localhost:5173
- Admin panel: http://localhost:5173/admin
- API: http://localhost:3000/api

Alohida ishga tushirish: `npm run dev` (faqat sayt), `npm run server` (faqat API).

## Standart admin hisobi

| Maydon | Qiymat |
| --- | --- |
| Email | `admin@sifat.uz` |
| Parol | `admin123` |

Bu qiymatlar `.env` faylidagi `ADMIN_EMAIL` / `ADMIN_PASSWORD` dan olinadi va **birinchi ishga tushirishda** bazaga yoziladi. Ishlab chiqarishda albatta o'zgartiring (`JWT_SECRET` ni ham).

## Tuzilma

- `src/components/` — ochiq sayt bo'limlari (kontent API dan olinadi, API ishlamasa zaxira matnlar ko'rsatiladi)
- `src/admin/` — admin panel (login, dashboard, CRUD sahifalar, sozlamalar)
- `server/` — Express API: auth (JWT, 8 soat), services / news / partners / faq / messages / settings CRUD, rasm yuklash (`/api/upload`, 5MB)
- `server/data.sqlite` — ma'lumotlar bazasi (birinchi ishga tushirishda hozirgi sayt kontenti bilan to'ldiriladi)
- `server/uploads/` — yuklangan rasmlar (`/uploads/...` orqali xizmat qilinadi)

## Foydali buyruqlar

```bash
npm run build     # production build
npm run preview   # buildni ko'rish
npm run lint      # eslint
```
