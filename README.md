# Sifat Innovatsion Texnologiya

Korporativ sayt + admin panel + backend API.

```
├── frontend/   # React 19 + Vite + Tailwind (sayt + /admin panel) → Netlify
├── backend/    # Express + SQLite API                             → Render
├── netlify.toml  # Netlify CI/CD sozlamasi (frontend)
└── render.yaml   # Render blueprint (backend)
```

## Lokal ishga tushirish

```bash
# 1. Bog'liqliklarni o'rnatish (root, frontend, backend)
npm install
npm run install:all

# 2. Backend muhit sozlamalari
cp backend/.env.example backend/.env

# 3. Ikkalasini birga ishga tushirish
npm run dev
```

- Sayt: http://localhost:5173
- Admin panel: http://localhost:5173/admin
- API: http://localhost:3000/api

## Standart admin hisobi

| Maydon | Qiymat |
| --- | --- |
| Email | `admin@sifat.uz` |
| Parol | `admin123` |

Qiymatlar `backend/.env` dagi `ADMIN_EMAIL` / `ADMIN_PASSWORD` dan olinadi va birinchi ishga tushirishda bazaga yoziladi. Ishlab chiqarishda albatta o'zgartiring (`JWT_SECRET` ni ham).

## Deploy

### 1. Backend → Render.com

1. [render.com](https://render.com) da GitHub hisobingiz bilan kiring.
2. **New → Blueprint** → shu repo'ni tanlang — `render.yaml` bo'yicha `sifat-api` servisi yaratiladi.
   (Yoki **New → Web Service** → repo tanlab, *Root Directory* = `backend`, *Build* = `npm install`, *Start* = `npm start`.)
3. Environment bo'limida `ADMIN_PASSWORD` ni kiriting.
4. Deploy tugagach URL'ni oling, masalan: `https://sifat-api.onrender.com`.

> **Diqqat:** bepul tarifda disk vaqtinchalik — admin panel orqali kiritilgan ma'lumotlar va rasmlar har deploy/restart'da o'chadi. Doimiy saqlash uchun Starter tarifda disk qo'shing va `DATA_DIR=/var/data` env o'zgaruvchisini bering (`render.yaml` dagi izohga qarang).

### 2. Frontend → Netlify (CI/CD)

1. Netlify'da **Add new site → Import an existing project** → GitHub repo'ni tanlang.
2. `netlify.toml` hamma narsani o'zi sozlaydi (base: `frontend`, build: `npm run build`, publish: `dist`).
3. **Muhim:** `netlify.toml` dagi `https://sifat-api.onrender.com` ni o'zingizning haqiqiy Render URL'ingizga almashtiring va push qiling.
4. Endi har `git push` da Netlify avtomatik build qilib chiqaradi (CI/CD).

### 3. AHOST domeni

Netlify → **Domain management → Add custom domain** → domeningizni kiriting, so'ng AHOST DNS panelida Netlify ko'rsatgan yozuvlarni qo'shing:

- `A` yozuv: `@` → `75.2.60.5` (Netlify load balancer)
- `CNAME` yozuv: `www` → `<sizning-sayt>.netlify.app`

SSL (HTTPS) sertifikatni Netlify avtomatik beradi (Let's Encrypt).

### Qanday ishlaydi

Saytdagi `/api/...` va `/uploads/...` so'rovlar Netlify proxy (redirect) orqali Render'dagi backend'ga boradi — alohida CORS yoki API URL sozlash shart emas.

## Foydali buyruqlar

```bash
npm run dev            # frontend + backend birga (lokal)
npm run build          # frontend production build
npm run server         # faqat backend
npm --prefix frontend run lint
```
