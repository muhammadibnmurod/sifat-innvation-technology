import { motion } from "framer-motion";
import { ArrowRight, FileText, Ruler, GraduationCap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";

const NEWS = [
  {
    icon: FileText,
    category: "Standartlar",
    date: "07.08.2025",
    title: "GOST 33715-2025 standarti qabul qilindi",
    excerpt:
      "Standartlashtirish, metrologiya va sertifikatlashtirish bo'yicha davlatlararo Kengash «Yuk ilg'ich moslamalar. Xavfsiz foydalanish» standartini qabul qildi.",
    gradient: "from-brand-600 to-accent-violet",
  },
  {
    icon: Ruler,
    category: "Ishlanma",
    date: "02.08.2025",
    title: "Kran yo'llari uchun yangi GOST loyihasi",
    excerpt:
      "Sifat Innovatsion Texnologiya ishlab chiqqan «Yerusti rels kran yo'llari. Umumiy texnik talablar» standarti qabul qilish bosqichida.",
    gradient: "from-accent-violet to-accent-cyan",
  },
  {
    icon: GraduationCap,
    category: "Tadbirlar",
    date: "15.07.2025",
    title: "Mutaxassislar uchun malaka oshirish seminari",
    excerpt:
      "Yuk ko'taruvchi mashinalarni ko'rikdan o'tkazish va ta'mirlash bo'yicha amaliy seminar bo'lib o'tdi.",
    gradient: "from-secondary-500 to-secondary-600",
  },
];

export default function LatestNewsSection() {
  return (
    <section id="news" className="section scroll-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Yangiliklar"
          title="So'nggi **yangiliklar** va tadbirlar"
          subtitle="Soha standartlari, ishlanmalarimiz va kompaniya faoliyatidagi muhim voqealar."
        />

        <motion.div
          variants={stagger}
          {...inView}
          className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {NEWS.map(({ icon: Icon, category, date, title, excerpt, gradient }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-soft ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-lift"
            >
              {/* cover */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div
                  className={`absolute inset-0 scale-100 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 opacity-30 bg-dots" />
                <Icon className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white/90" />
                {/* date badge */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur">
                  {date}
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
                  {category}
                </span>
                <h3 className="mt-2 text-lg font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-brand-700">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {excerpt}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                >
                  Batafsil o'qish
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-brand-600 group-hover:to-accent-violet group-hover:text-white">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
