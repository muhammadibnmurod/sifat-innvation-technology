# UI/UX Redesign Prompt — Sifat Innovation Technology

Copy everything below this line into Claude Code / Cursor:

---

You are a senior product designer + frontend engineer. Redesign my React website from a generic template into a modern, premium, conversion-focused site that hooks visitors in the first 3 seconds.

## Project context
- Stack: React 19 + Vite + Tailwind CSS v4 (`@tailwindcss/vite`), react-router-dom v7, lucide-react icons.
- Company: **Sifat Innovation Technology** — a tech/service company in Tashkent, Uzbekistan (repair/"Remont" services, partners, news). Content language: Uzbek (fix any leftover Russian strings).
- Current structure: `src/App.jsx` renders Header, Navbar, Remont, Partners, AboutUs, VideoSection, AskQuestionSection, LatestNewsSection, Footer as one static page. `src/pages/Home.jsx` is an empty stub. Assets in `src/assets/` (Logo.png, Company.jpeg, etc.).
- Problem: it looks like a stock template — flat white sections, no hierarchy, no motion, nothing memorable.

## Design direction
**Light, premium, dynamic.** Blend these three influences on a light base:
1. **Minimal + bold typography** (Apple/Linear style): generous whitespace, oversized headings (clamp-based fluid type, 3.5–5rem hero), tight letter-spacing, clear vertical rhythm.
2. **Glassmorphism accents**: frosted-glass cards (`backdrop-blur`, translucent white, subtle 1px borders), sticky glass navbar that gains blur + shadow on scroll.
3. **Gradients + depth**: soft mesh/radial gradient blobs in the hero background (blurred, animated slowly), gradient text on key headline words, floating 3D-feeling cards with layered shadows.

### Design tokens (define as CSS variables / Tailwind theme)
- Background: `#fafafa` base, white cards; subtle grid or dot pattern in hero.
- Primary: deep indigo/blue (`#4f46e5`-ish) with a violet→cyan gradient for accents; keep a warm orange (`#f97316`) as secondary CTA color to preserve brand continuity.
- Text: near-black `#0a0a0a` headings, `#525252` body.
- Radii: 16–24px cards, pill buttons. Shadows: soft, colored (indigo-tinted), multi-layer.
- Font: Inter or Manrope via Google Fonts (add to `index.html`), bold 700–800 for headings.

## Motion (install `framer-motion`)
Full dynamic feel, but 60fps — animate only `transform` and `opacity`:
- Hero: staggered entrance (headline words rise + fade one by one), slowly drifting gradient blobs, floating stat/badge cards with subtle infinite y-oscillation.
- Scroll: every section reveals with `whileInView` (fade + 24px rise, staggered children, `once: true`).
- Micro-interactions: buttons scale 1.03 + shadow lift on hover, cards tilt/lift on hover, nav links animated underline.
- Counters: animated count-up numbers in a stats strip (years of experience, projects, clients).
- Navbar: transparent over hero → glass + shadow after 50px scroll.
- Respect `prefers-reduced-motion`.

## Page structure (rebuild in this order)
1. **Navbar** — sticky glass, logo left, links center, orange gradient CTA button right ("Bog'lanish"), animated mobile drawer menu.
2. **Hero** — full viewport: bold headline with one gradient word, subtext, two CTAs (primary gradient + ghost), trust indicators row, animated background blobs + floating cards. This must be the "wow" moment.
3. **Stats strip** — 3–4 animated counters on a gradient or glass band.
4. **Services ("Remont")** — glass cards grid with lucide icons, hover lift, short descriptions, "Batafsil" links.
5. **About Us** — split layout: image with decorative gradient frame + offset border, text with checkmark list, staggered reveal.
6. **Video section** — rounded video/thumbnail with animated play button (pulsing ring), inside a soft gradient container.
7. **Partners** — infinite auto-scrolling logo marquee (CSS animation, pause on hover), grayscale → color on hover.
8. **News** — modern card grid: image zoom-on-hover, date badge, title, excerpt, arrow link that slides on hover.
9. **FAQ / Ask Question** — animated accordion (smooth height + rotate chevron) beside a clean contact form with focus-ring inputs and validation states.
10. **Footer** — dark (`#0a0a0a`) footer for contrast: columns, newsletter input, socials, gradient top border.

## Engineering requirements
- Keep the existing component file structure; refactor each component in place. Extract shared UI (Button, SectionHeading, Card) into `src/components/ui/`.
- Extract repeated animation variants into `src/lib/motion.js`.
- Fully responsive (mobile-first, test 375px / 768px / 1440px). Mobile menu must be polished, not an afterthought.
- Accessibility: semantic tags, alt texts, visible focus states, AA contrast.
- Clean up: remove commented-out dead code, fix the stray Russian strings, fix `mailto:` link with tab character in Header, remove FontAwesome if unused (lucide only).
- Do NOT add heavy libraries beyond framer-motion. No UI kits.

## Definition of done
Run `npm run dev` and verify: hero animates on load, all sections reveal on scroll, marquee runs smoothly, mobile menu works, no console errors, `npm run build` passes.

Work section by section, showing me progress after the Navbar + Hero first so I can confirm the direction before you continue.
