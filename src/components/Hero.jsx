import { useCallback, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Award,
  Wrench,
  ChevronDown,
  Activity,
  FileSearch,
  RefreshCw,
} from "lucide-react";
import Button from "./ui/Button.jsx";
import { fadeUp, wordRise, stagger } from "../lib/motion.js";
import { useSiteData } from "../lib/SiteDataContext.jsx";

// Split "Yuk ko'taruvchi **professional** ta'mirlash" into words,
// flagging **gradient** words.
function parseHeadline(title) {
  const words = [];
  for (const chunk of String(title).split(/(\*\*[^*]+\*\*)/g)) {
    if (!chunk) continue;
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      chunk.slice(2, -2).trim().split(/\s+/).forEach((w) => words.push({ text: w, gradient: true }));
    } else {
      chunk.trim().split(/\s+/).filter(Boolean).forEach((w) => words.push({ text: w }));
    }
  }
  return words;
}

const TRUST = [
  { icon: ShieldCheck, label: "Sanoat xavfsizligi ekspertizasi" },
  { icon: Award, label: "TK 288 standartlashtirish qo'mitasi a'zosi" },
  { icon: Wrench, label: "Zamonaviy ehtiyot qismlar" },
];

// Mini capability meters inside the visual panel.
const METERS = [
  { icon: FileSearch, label: "Ekspertiza va diagnostika", value: 98 },
  { icon: Wrench, label: "Kapital ta'mirlash", value: 94 },
  { icon: RefreshCw, label: "Modernizatsiya", value: 90 },
];

// Interactive 3D-tilt wrapper for the hero visual.
function TiltPanel({ children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 180,
    damping: 22,
  });

  const onMouseMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    },
    [mx, my]
  );
  const onMouseLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  if (reduce) return <div>{children}</div>;

  return (
    <div style={{ perspective: 1200 }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

function Hero() {
  const { settings } = useSiteData();
  const headline = parseHeadline(
    settings.hero_title || "Yuk ko'taruvchi kranlarni **professional** ta'mirlash"
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface pt-28 pb-24 scroll-mt-24"
    >
      {/* Background: dots + drifting gradient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-dots" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob animate-drift absolute -left-24 -top-24 h-[36rem] w-[36rem] bg-gradient-to-br from-brand-300 to-brand-500" />
        <div className="blob animate-drift-slow absolute -right-32 top-10 h-[34rem] w-[34rem] bg-gradient-to-br from-accent-violet/60 to-accent-cyan/60" />
        <div className="blob animate-drift absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] bg-gradient-to-br from-secondary-400/50 to-secondary-500/40" />
      </div>
      {/* Soft fade into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />

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
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-cyan" />
            </span>
            {settings.hero_badge || "2014 yildan beri Toshkentda"}
          </motion.span>

          <h1 className="text-hero mt-6 font-extrabold text-ink">
            {headline.map((word, i) => (
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
            {settings.hero_subtitle}
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

        {/* Right: 3D-tilting control panel with floating glass cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <TiltPanel>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* Rotating conic glow behind the panel */}
              <div className="absolute -inset-6 overflow-hidden rounded-[2.5rem]">
                <div
                  className="animate-spin-slow absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-40"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #4f46e5, #7c3aed, #06b6d4, #f97316, #4f46e5)",
                    filter: "blur(48px)",
                  }}
                />
              </div>

              {/* Main panel */}
              <div className="noise absolute inset-0 overflow-hidden rounded-[var(--radius-xl2)] bg-gradient-to-br from-brand-800 via-brand-900 to-[#14123a] shadow-lift ring-1 ring-white/15">
                <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" />
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-cyan/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent-violet/30 blur-3xl" />

                <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">
                  {/* status row */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-100 ring-1 ring-white/15 backdrop-blur">
                      <Activity className="h-3.5 w-3.5 text-accent-cyan" />
                      Texnik nazorat
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Faol
                    </span>
                  </div>

                  {/* headline stat */}
                  <div className="text-center">
                    <p className="bg-gradient-to-br from-white via-brand-100 to-brand-300 bg-clip-text text-6xl font-extrabold text-transparent">
                      {settings.stats?.experience ?? 10}+
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-200">
                      yillik tajriba
                    </p>
                  </div>

                  {/* capability meters */}
                  <ul className="flex flex-col gap-4">
                    {METERS.map(({ icon: Icon, label, value }, i) => (
                      <li key={label}>
                        <div className="flex items-center justify-between text-xs font-medium text-brand-100">
                          <span className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5 text-accent-cyan" />
                            {label}
                          </span>
                          <span className="font-bold text-white">{value}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: value / 100 }}
                            transition={{
                              duration: 1.1,
                              delay: 0.9 + i * 0.15,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full origin-left rounded-full bg-gradient-to-r from-brand-400 via-accent-violet to-accent-cyan"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Floating card — rating */}
              <motion.div
                className="animate-float absolute -left-6 top-24 w-44 rounded-2xl glass-strong p-4 shadow-lift"
                style={{ animationDelay: "-1.5s", transform: "translateZ(48px)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary-500/15 text-secondary-600">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold leading-none text-ink">
                      {settings.stats?.projects ?? 500}+
                    </p>
                    <p className="text-xs text-ink-soft">bajarilgan loyiha</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — safety */}
              <motion.div
                className="animate-float absolute -right-5 -bottom-8 w-52 rounded-2xl glass-strong p-4 shadow-lift"
                style={{ animationDelay: "-3s", transform: "translateZ(64px)" }}
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
          </TiltPanel>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        aria-label="Pastga suring"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft/70 transition-colors hover:text-brand-700 md:flex"
      >
        Pastga
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default Hero;
