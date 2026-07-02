import { motion } from "framer-motion";
import { Facebook, Youtube, Instagram, Send, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Logo from "../assets/Logo.png";
import { fadeUp, stagger, inView } from "../lib/motion.js";
import { useSiteData } from "../lib/SiteDataContext.jsx";

export default function Footer() {
  const { services, settings } = useSiteData();
  const footerServices = services.slice(0, 6);
  const phone = settings.phone || "+998 99 866 02 71";
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const socials = [
    { Icon: Facebook, href: settings.socials?.facebook, label: "Facebook" },
    { Icon: Youtube, href: settings.socials?.youtube, label: "YouTube" },
    { Icon: Instagram, href: settings.socials?.instagram, label: "Instagram" },
    { Icon: Send, href: settings.socials?.telegram, label: "Telegram" },
  ];

  return (
    <footer className="relative bg-ink text-neutral-400">
      {/* gradient top border */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-accent-violet to-accent-cyan" />

      <motion.div
        variants={stagger}
        {...inView}
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + newsletter */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Sifat Innovatsion Texnologiya" className="h-11 w-11 rounded-xl bg-white/5 object-contain p-1" />
              <span className="text-base font-extrabold leading-tight text-white">
                Sifat Innovatsion<br />Texnologiya
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed">
              Yuk ko'taruvchi kranlar va balandlikda bajariladigan ishlar
              bo'yicha ta'mirlash hamda texnik ko'rik xizmatlarini ko'rsatuvchi
              korxona.
            </p>

            {/* newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 focus-within:border-brand-400"
            >
              <input
                type="email"
                required
                placeholder="Email manzilingiz"
                aria-label="Email manzilingiz"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-neutral-500"
              />
              <button
                type="submit"
                aria-label="Obuna bo'lish"
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white transition-transform hover:scale-105"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Aloqa ma'lumotlari
            </h4>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 flex-none text-brand-400" />
                {settings.address || "Toshkent shahri, Mirobod tumani"}
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 flex-none text-brand-400" />
                <a href={phoneHref} className="transition-colors hover:text-white">
                  {phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 flex-none text-brand-400" />
                <a href={`mailto:${settings.email}`} className="transition-colors hover:text-white">
                  {settings.email}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Xizmatlar
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {footerServices.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="transition-colors hover:text-white">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Nav + socials */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-white">
              Ijtimoiy tarmoqlar
            </h4>
            <div className="mt-5 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href || "#"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-300 transition-all hover:border-brand-400 hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a
              href="#hero"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              Yuqoriga qaytish
            </a>
          </motion.div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Sifat Innovatsion Texnologiya MCHJ.
            Barcha huquqlar himoyalangan.
          </p>
          <a href="#" className="transition-colors hover:text-neutral-300">
            Maxfiylik siyosati
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
