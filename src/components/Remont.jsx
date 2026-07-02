import { motion } from "framer-motion";
import {
  FileSearch,
  Wrench,
  RefreshCw,
  Building2,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Card from "./ui/Card.jsx";
import { stagger, inView } from "../lib/motion.js";

const SERVICES = [
  {
    icon: FileSearch,
    title: "Ekspertiza va hujjatlashtirish",
    description:
      "Kranlarni diagnostika qilish, sanoat xavfsizligi ekspertizasi hamda pasport va texnik hujjatlarni rasmiylashtirish.",
  },
  {
    icon: Wrench,
    title: "Ta'mirlash ishlari",
    description:
      "Yuk ko'taruvchi mashinalar, ko'prikli va kozlovoy kranlar hamda kran yo'llarini joriy va kapital ta'mirlash.",
  },
  {
    icon: RefreshCw,
    title: "Rekonstruksiya va modernizatsiya",
    description:
      "Ko'prikli kranlarni qayta qurish, modernizatsiya qilish va tegishli loyiha hujjatlarini tayyorlash.",
  },
  {
    icon: Building2,
    title: "PS va infratuzilma",
    description:
      "Kranlar va ularning infratuzilmasi bo'yicha rejalashtirish, raqamli tahlil va uskunalarni sozlash.",
  },
  {
    icon: ShieldCheck,
    title: "Xavfsizlik asboblari",
    description:
      "Kranlarning xavfsizlik asboblarini o'rnatish, sozlash va davriy texnik tekshiruvdan o'tkazish.",
  },
  {
    icon: Cpu,
    title: "Maxsus xizmatlar",
    description:
      "Barcha rusumdagi kranlarni ko'rikdan o'tkazish, elektr yuritmalar ekspertizasi va protokolli sinovlar.",
  },
];

export default function Remont() {
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
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-7">
              <div className="flex h-full flex-col">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-violet text-white shadow-[0_8px_20px_rgba(79,70,229,0.3)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
