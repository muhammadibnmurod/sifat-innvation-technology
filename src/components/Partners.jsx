import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import { inView } from "../lib/motion.js";

const ROW_A = ["Uralmash", "Kranmash", "KAMAZ", "GAZprom", "NLMK", "Severstal"];
const ROW_B = ["Transneft", "Nefaz", "TatSpets", "RGK", "Diakon", "Yamaha"];

function LogoChip({ name }) {
  return (
    <li className="flex-none px-3">
      <span className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-white/70 px-6 py-3.5 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-accent-violet group-hover:text-white">
          <Building2 className="h-4 w-4" />
        </span>
        <span className="text-lg font-extrabold tracking-tight text-neutral-500 transition-colors duration-300 group-hover:text-ink">
          {name}
        </span>
      </span>
    </li>
  );
}

function MarqueeRow({ names, reverse = false }) {
  const animation = reverse ? "animate-marquee-reverse" : "animate-marquee";
  return (
    <div className={`${animation} flex flex-none py-2`}>
      <ul className="flex min-w-full flex-none items-center justify-around">
        {names.map((name, i) => (
          <LogoChip key={`a-${i}`} name={name} />
        ))}
      </ul>
      <ul className="flex min-w-full flex-none items-center justify-around" aria-hidden="true">
        {names.map((name, i) => (
          <LogoChip key={`b-${i}`} name={name} />
        ))}
      </ul>
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners" className="section scroll-mt-24 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hamkorlar"
          title="Bizga **ishonch** bildirganlar"
          subtitle="Yetakchi sanoat korxonalari bilan uzoq yillik hamkorlik."
        />
      </div>

      {/* Two counter-scrolling marquee rows */}
      <motion.div
        {...inView}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
        className="marquee-track relative mt-12 flex flex-col gap-2"
      >
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

        <div className="flex overflow-hidden">
          <MarqueeRow names={ROW_A} />
        </div>
        <div className="flex overflow-hidden">
          <MarqueeRow names={ROW_B} reverse />
        </div>
      </motion.div>
    </section>
  );
}
