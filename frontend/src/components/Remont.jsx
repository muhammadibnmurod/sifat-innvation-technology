import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Card from "./ui/Card.jsx";
import Button from "./ui/Button.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import { useSiteData } from "../lib/SiteDataContext.jsx";
import { getIcon } from "../lib/icons.js";

// Bullet points shown inside the featured (first) service panel.
const FEATURED_POINTS = [
  "Sanoat xavfsizligi ekspertizasi",
  "Pasport va texnik hujjatlar",
  "Protokolli sinovlar va xulosalar",
];

export default function Remont() {
  const { services } = useSiteData();
  const [featured, ...rest] = services;
  const FeaturedIcon = getIcon(featured?.icon);

  if (!featured) return null;

  return (
    <section id="services" className="section scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Bizning xizmatlar"
          title="Kranlar uchun **to'liq** texnik xizmat ko'rsatish"
          subtitle="Ekspertizadan tortib kapital ta'mirgacha — barcha ishlarni bir joyda, zamonaviy standartlar asosida bajaramiz."
        />

        <motion.div
          variants={stagger}
          {...inView}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Featured bento panel — spans two columns */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="noise group relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-brand-700 via-brand-800 to-[#14123a] p-7 shadow-lift ring-1 ring-white/10 sm:col-span-2 sm:p-9"
          >
            <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-accent-cyan/20 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-violet/25 blur-3xl" />

            <div className="relative flex h-full flex-col sm:max-w-md">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-cyan ring-1 ring-white/15 backdrop-blur">
                  <FeaturedIcon className="h-6 w-6" />
                </span>
                <span className="text-5xl font-extrabold tracking-tight text-white/10">01</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">{featured.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-100/90">
                {featured.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {FEATURED_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-brand-50">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-cyan/20 text-accent-cyan">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#faq"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors hover:text-accent-cyan"
              >
                Batafsil
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {rest.map(({ id, icon, title, description }, i) => {
            const Icon = getIcon(icon);
            return (
            <Card key={id} className="p-7">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-violet text-white shadow-[0_8px_20px_rgba(79,70,229,0.3)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-4xl font-extrabold tracking-tight text-ink/[0.06] transition-colors duration-300 group-hover:text-brand-600/15">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {description}
                </p>
                <a
                  href="#faq"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                >
                  Batafsil
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Card>
            );
          })}

          {/* Filler CTA card — completes the 3×3 bento on desktop */}
          <motion.div
            variants={fadeUp}
            className="relative flex flex-col items-start justify-center overflow-hidden rounded-[var(--radius-card)] border-2 border-dashed border-brand-200 bg-brand-50/50 p-7 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:gap-8"
          >
            <div>
              <h3 className="text-xl font-bold text-ink">
                Qaysi xizmat kerakligini bilmayapsizmi?
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                Obyektingizni tasvirlab bering — mutaxassislarimiz to'g'ri
                yechimni bepul tavsiya qiladi.
              </p>
            </div>
            <Button as="a" href="#faq" variant="gradient" className="mt-5 flex-none lg:mt-0">
              Konsultatsiya olish
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
