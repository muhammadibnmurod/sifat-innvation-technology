# Admin Panel + Backend Prompt — Sifat Innovation Technology

Copy everything below this line into Claude Code / Cursor:

---

You are a senior full-stack engineer. Build a complete admin panel WITH its own backend for my existing React site, so all public site content becomes manageable from `/admin`.

## Project context
- Existing frontend: React 19 + Vite + Tailwind CSS v4, react-router-dom v7, framer-motion, lucide-react. Public site components live in `src/components/` (Navbar, Hero/Remont services, Partners, AboutUs, VideoSection, FAQ/AskQuestion, LatestNews, Footer). Site language: Uzbek.
- There is NO backend yet — you must create it in this repo.

## Part 1 — Backend (create in `/server` folder)
- **Stack:** Node.js + Express + `better-sqlite3` (single-file DB, zero config) + `jsonwebtoken` + `bcryptjs` + `multer` (image uploads) + `cors`.
- **Structure:** `server/index.js`, `server/db.js` (schema + seed), `server/routes/` (auth, services, news, partners, faq, settings, messages), `server/middleware/auth.js`, `server/uploads/` (static-served images).
- **Auth:** `POST /api/auth/login` → JWT (8h expiry). Seed one admin from `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, hashed with bcrypt). All write routes protected by JWT middleware. Add `GET /api/auth/me`.
- **Resources (full CRUD, REST):**
  - `services` — title, description, icon name, image, order, active
  - `news` — title, excerpt, body, image, date, published
  - `partners` — name, logo image, url, order
  - `faq` — question, answer, order
  - `messages` — name, phone, email, message, status (new/read/answered), createdAt — public `POST`, admin-only read/update/delete
  - `settings` — single record: phone, email, address, working hours, social links, hero title/subtitle, about text, video URL, stats numbers
- **Uploads:** `POST /api/upload` (multer, images only, 5MB limit, unique filenames) → returns URL; serve `/uploads` statically.
- **DX:** seed the DB with the current hard-coded site content so nothing looks empty. Add `npm run server` and a `dev:all` script (use `concurrently`) that runs Vite + API together. Add Vite proxy for `/api` and `/uploads` → `http://localhost:3000`.

## Part 2 — Admin panel (at `/admin`, inside the same React app)
### Routing & auth
- Restructure `App.jsx`: public site under `/`, admin under `/admin/*` with `React.lazy`. Admin renders WITHOUT public Navbar/Footer.
- `/admin/login` — standalone page; on success store JWT (localStorage) + user in an `AuthContext`. `ProtectedRoute` redirects unauthenticated users to login. Axios/fetch wrapper (`src/admin/lib/api.js`) attaches token, and on 401 logs out + redirects.

### Design — match the public site's premium light style
- Light `#fafafa` background, white cards with soft indigo-tinted shadows, 16px radii, Inter font, indigo primary + orange accents.
- **Login page:** centered glass card over subtle animated gradient blobs, logo, email + password with icons, show/hide password, loading spinner in button, shake animation + inline error on wrong credentials.
- **Layout:** fixed sidebar (collapsible to icons-only; drawer overlay on mobile) + top navbar. Sidebar: logo, nav items with lucide icons + active state (indigo pill/left indicator + smooth framer-motion transition), logout at bottom. Topbar: page title, breadcrumb, "Saytni ko'rish" link, admin avatar dropdown (profile, logout).
- All UI text in Uzbek. Smooth micro-animations (framer-motion): page fade transitions, staggered table rows, but keep it fast.

### Pages (sidebar items)
1. **Dashboard** (`/admin`) — stat cards with animated counters (xizmatlar, yangiliklar, hamkorlar, yangi xabarlar soni), latest 5 messages, latest news list.
2. **Xizmatlar** — table/grid with image thumb, title, active toggle, edit/delete; create-edit modal or side drawer with image upload (preview + drag-drop), icon picker (lucide names), drag-to-reorder.
3. **Yangiliklar** — searchable table, published toggle, create/edit page with title, excerpt, rich-ish textarea (or simple markdown), image upload, date picker.
4. **Hamkorlar** — logo grid, add via modal (name, url, logo upload), reorder.
5. **FAQ** — accordion-style list with inline edit, add, delete, reorder.
6. **Xabarlar** — inbox: list with status badges (yangi/o'qilgan/javob berilgan), row click opens detail drawer, mark-as-read on open, delete, filter by status, unread count badge in sidebar.
7. **Sozlamalar** — tabbed form (Kontakt / Hero & About / Statistika / Ijtimoiy tarmoqlar / Video), save button with success toast.

### Shared admin UI (build in `src/admin/components/ui/`)
Button, Input, Textarea, Select, Toggle, Modal, Drawer, ConfirmDialog ("O'chirishni tasdiqlaysizmi?"), Table (empty state + skeleton loading), Toast system (success/error, top-right, auto-dismiss), ImageUpload (drag-drop + preview), Badge. No heavy UI kits — Tailwind + framer-motion only.

## Part 3 — Connect the public site
Replace hard-coded content in public components with data from the API (fetch on mount, with loading skeletons and graceful fallbacks): services, news, partners, FAQ, settings (phone/address/socials/hero text/stats). Contact form now POSTs to `/api/messages` with success/error toast.

## Quality bar
- Fully responsive admin (sidebar → mobile drawer). Forms validate before submit with Uzbek error messages.
- Handle all states: loading (skeletons), empty ("Hozircha ma'lumot yo'q" + illustration/icon), error.
- No console errors; `npm run build` passes; `.env.example` + short README section explaining how to run (`npm run dev:all`) and default admin credentials.

Work in this order: backend + seed → auth/login → admin layout → Dashboard → CRUD pages → settings → wire public site. Show me the login + layout first so I can confirm the direction before building all CRUD pages.
