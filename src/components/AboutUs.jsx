import { motion } from "framer-motion";
import { Check, Award } from "lucide-react";
import Human from "../assets/human.png";
import Button from "./ui/Button.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";
import { fadeUp, stagger, scaleIn, inView } from "../lib/motion.js";

const POINTS = [
  {
    title: "Standartlashtirish",
    text: "«Yuk ko'taruvchi kranlar va uzluksiz transport mashinalari» bo'yicha TK 288 texnik qo'mitasi tarkibiga kiramiz.",
  },
  {
    title: "Malakali mutaxassislar",
    text: "Rahbariyat va mutaxassislar o'z kasbiy bilim va malakalarini doimiy oshirib boradi.",
  },
  {
    title: "Boy tajriba",
    text: "Jamoamiz yuk ko'taruvchi mashinalarni ko'rikdan o'tkazish, ta'mirlash, montaj va loyihalash bilan uzviy bog'liq.",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="section scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image with gradient frame + offset border */}
        <motion.div variants={scaleIn} {...inView} className="relative mx-auto w-full max-w-md lg:mx-0">
          {/* offset decorative border */}
          <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[var(--radius-xl2)] border-2 border-brand-200" />
          {/* gradient frame */}
          <div className="relative rounded-[var(--radius-xl2)] bg-gradient-to-br from-brand-600 via-accent-violet to-accent-cyan p-1.5 shadow-lift">
            <img
              src={Human}
              alt="Aripov Azamat Sharipovich — konstruktorlik ishlanmalari bo'limi boshlig'i"
              className="w-full rounded-[calc(var(--radius-xl2)-6px)] object-cover"
            />
          </div>
          {/* floating name badge */}
          <div className="animate-float absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl glass-strong p-4 shadow-lift">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 text-white">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight text-ink">
                Aripov Azamat Sharipovich
              </p>
              <p className="text-xs text-ink-soft">
                Konstruktorlik bo'limi boshlig'i
              </p>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="Biz haqimizda"
            title="Yuk ko'taruvchi texnikada **ishonchli** hamkoringiz"
            subtitle="Sifat Innovatsion Texnologiya xavfli ishlab chiqarish obyektlarida sanoat xavfsizligi ekspertizasi, yuk ko'taruvchi mashinalar va kran yo'llarini loyihalash hamda ta'mirlash bilan shug'ullanadi."
          />

          <motion.ul variants={stagger} {...inView} className="mt-8 flex flex-col gap-5">
            {POINTS.map((point) => (
              <motion.li key={point.title} variants={fadeUp} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-cyan text-white shadow-[0_6px_16px_rgba(79,70,229,0.3)]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <div>
                  <h4 className="font-bold text-ink">{point.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {point.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} {...inView} className="mt-9">
            <Button as="a" href="#services" variant="gradient">
              Batafsil ma'lumot
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
