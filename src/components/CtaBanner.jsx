import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import Button from "./ui/Button.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";

// Full-width conversion band before the footer.
export default function CtaBanner() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <motion.div
        variants={stagger}
        {...inView}
        className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-xl2)] bg-gradient-to-br from-brand-700 via-brand-600 to-accent-violet px-6 py-16 text-center shadow-lift ring-1 ring-white/15 sm:px-12 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40" />
        <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-accent-cyan/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-secondary-500/30 blur-3xl" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/25 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan" />
            Bepul konsultatsiya
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-display mt-6 font-extrabold text-white"
          >
            Kranlaringiz ishonchli qo'llarda bo'lsin
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg leading-relaxed text-brand-100"
          >
            Loyihangizni muhokama qilish uchun bugun bog'laning —
            mutaxassislarimiz obyektga chiqib, bepul dastlabki baho beradi.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Button as="a" href="#faq" variant="primary" size="lg">
              Ariza qoldirish
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              as="a"
              href="tel:+998998660271"
              variant="ghost"
              size="lg"
              className="!border-white/25 !bg-white/10 !text-white hover:!bg-white/20"
            >
              <Phone className="h-4 w-4" />
              +998 99 866 02 71
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
