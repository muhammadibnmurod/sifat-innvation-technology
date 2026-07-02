import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading.jsx";
import { inView } from "../lib/motion.js";

const PARTNERS = [
  "Uralmash",
  "Kranmash",
  "KAMAZ",
  "GAZprom",
  "NLMK",
  "Severstal",
  "Transneft",
  "Nefaz",
  "TatSpets",
  "RGK",
  "Diakon",
  "Yamaha",
];

function LogoChip({ name }) {
  return (
    <li className="flex-none px-8">
      <span className="text-2xl font-extrabold tracking-tight text-neutral-400 transition-colors duration-300 hover:text-transparent hover:bg-gradient-to-r hover:from-brand-600 hover:to-accent-cyan hover:bg-clip-text">
        {name}
      </span>
    </li>
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

      {/* Marquee */}
      <motion.div
        {...inView}
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }}
        className="marquee-track relative mt-12 flex overflow-hidden"
      >
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

        {/* one track holding two identical copies; track translates -50% */}
        <div className="animate-marquee flex flex-none">
          <ul className="flex min-w-full flex-none items-center justify-around">
            {PARTNERS.map((name, i) => (
              <LogoChip key={`a-${i}`} name={name} />
            ))}
          </ul>
          <ul className="flex min-w-full flex-none items-center justify-around" aria-hidden="true">
            {PARTNERS.map((name, i) => (
              <LogoChip key={`b-${i}`} name={name} />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
