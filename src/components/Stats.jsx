import { motion } from "framer-motion";
import { CalendarClock, ClipboardCheck, Users, Wrench } from "lucide-react";
import Counter from "./ui/Counter.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import { useSiteData } from "../lib/SiteDataContext.jsx";

// Full-bleed dark band — edge to edge, no side gutters.
export default function Stats() {
  const { settings } = useSiteData();
  const s = settings.stats || {};

  const STATS = [
    { icon: CalendarClock, to: s.experience ?? 10, suffix: "+", label: "yillik tajriba" },
    { icon: ClipboardCheck, to: s.projects ?? 500, suffix: "+", label: "bajarilgan loyiha" },
    { icon: Users, to: s.clients ?? 120, suffix: "+", label: "doimiy mijozlar" },
    { icon: Wrench, to: s.services ?? 15, suffix: "+", label: "xizmat turi" },
  ];

  return (
    <section className="noise relative overflow-hidden bg-gradient-to-br from-ink via-[#14123a] to-brand-900">
      {/* texture + colored glows */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-50" />
      <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-brand-600/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-24 h-64 w-64 rounded-full bg-accent-cyan/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 -bottom-28 h-56 w-56 -translate-x-1/2 rounded-full bg-accent-violet/25 blur-3xl" />

      <motion.div
        variants={stagger}
        {...inView}
        className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-16"
      >
        {STATS.map(({ icon: Icon, to, suffix, label }, i) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className={`flex flex-col items-center text-center ${
              i > 0 ? "lg:border-l lg:border-white/10" : ""
            }`}
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent-cyan ring-1 ring-white/15 backdrop-blur">
              <Icon className="h-5 w-5" />
            </span>
            <div className="bg-gradient-to-br from-white via-brand-100 to-brand-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              <Counter to={to} suffix={suffix} />
            </div>
            <p className="mt-2 text-sm font-medium text-brand-200">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
