import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Award, Wrench } from "lucide-react";
import Button from "./ui/Button.jsx";
import { fadeUp, wordRise, stagger } from "../lib/motion.js";

// Headline split into words; the gradient word is flagged.
const HEADLINE = [
  { text: "Yuk" },
  { text: "ko'taruvchi" },
  { text: "kranlarni" },
  { text: "professional", gradient: true },
  { text: "ta'mirlash" },
];

const TRUST = [
  { icon: ShieldCheck, label: "Sanoat xavfsizligi ekspertizasi" },
  { icon: Award, label: "TK 288 standartlashtirish qo'mitasi a'zosi" },
  { icon: Wrench, label: "Zamonaviy ehtiyot qismlar" },
];

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface pt-28 pb-16 scroll-mt-24"
    >
      {/* Background: dots + drifting gradient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-dots" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob animate-drift absolute -left-24 -top-24 h-[36rem] w-[36rem] bg-gradient-to-br from-brand-300 to-brand-500" />
        <div className="blob animate-drift-slow absolute -right-32 top-10 h-[34rem] w-[34rem] bg-gradient-to-br from-accent-violet/60 to-accent-cyan/60" />
        <div className="blob animate-drift absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] bg-gradient-to-br from-secondary-400/50 to-secondary-500/40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left: copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-cyan" />
            2014 yildan beri Toshkentda
          </motion.span>

          <h1 className="text-hero mt-6 font-extrabold text-ink">
            {HEADLINE.map((word, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  variants={wordRise}
                  className={`inline-block ${word.gradient ? "text-gradient" : ""}`}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Malakali mutaxassislarimiz kran yo'llarini ko'zdan kechirish,
            tekshirish va texnik ta'mirlash bo'yicha barcha ishlarni zamonaviy
            uskunalar bilan bajaradi — ekspertizadan to kapital ta'mirgacha.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Button as="a" href="#services" variant="primary" size="lg">
              Xizmatlar bilan tanishing
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button as="a" href="#video" variant="ghost" size="lg">
              <Play className="h-4 w-4 fill-current" />
              Videoni ko'rish
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3"
          >
            {TRUST.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-ink-soft"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: floating glass cards over a hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            {/* Main framed visual */}
            <div className="absolute inset-0 rounded-[var(--radius-xl2)] bg-gradient-to-br from-brand-600 via-accent-violet to-accent-cyan p-1 shadow-lift">
              <div className="flex h-full w-full items-center justify-center rounded-[calc(var(--radius-xl2)-4px)] bg-gradient-to-br from-brand-700/95 to-brand-900 text-center">
                <div className="p-8">
                  <p className="text-5xl font-extrabold text-white">10+</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-brand-100">
                    yillik tajriba
                  </p>
                  <div className="mx-auto mt-6 h-px w-16 bg-white/30" />
                  <p className="mt-6 text-sm leading-relaxed text-brand-50/90">
                    Yuk ko'taruvchi mashinalarni loyihalash, ta'mirlash va
                    ekspertiza qilishda ishonchli hamkor.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card — rating */}
            <motion.div
              className="animate-float absolute -left-6 top-10 w-44 rounded-2xl glass-strong p-4 shadow-lift"
              style={{ animationDelay: "-1.5s" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-500/15 text-secondary-600">
                  <Award className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-none text-ink">500+</p>
                  <p className="text-xs text-ink-soft">bajarilgan loyiha</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card — safety */}
            <motion.div
              className="animate-float absolute -right-5 bottom-12 w-52 rounded-2xl glass-strong p-4 shadow-lift"
              style={{ animationDelay: "-3s" }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight text-ink">
                    Sertifikatlangan
                  </p>
                  <p className="text-xs text-ink-soft">xavfsizlik standartlari</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
