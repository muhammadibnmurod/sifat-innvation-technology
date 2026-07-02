import { motion } from "framer-motion";
import { CalendarClock, ClipboardCheck, Users, Wrench } from "lucide-react";
import Counter from "./ui/Counter.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";

const STATS = [
  { icon: CalendarClock, to: 10, suffix: "+", label: "yillik tajriba" },
  { icon: ClipboardCheck, to: 500, suffix: "+", label: "bajarilgan loyiha" },
  { icon: Users, to: 120, suffix: "+", label: "doimiy mijozlar" },
  { icon: Wrench, to: 15, suffix: "+", label: "xizmat turi" },
];

export default function Stats() {
  return (
    <section className="relative -mt-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        {...inView}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-xl2)] bg-gradient-to-r from-brand-700 via-brand-600 to-accent-violet p-8 shadow-lift sm:p-10"
      >
        {/* subtle texture */}
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-dots" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

        <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, to, suffix, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                <Icon className="h-5 w-5" />
              </span>
              <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <Counter to={to} suffix={suffix} />
              </div>
              <p className="mt-1 text-sm font-medium text-brand-100">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
