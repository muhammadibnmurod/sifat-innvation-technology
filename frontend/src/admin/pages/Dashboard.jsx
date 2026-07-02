import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, animate } from "framer-motion";
import { Wrench, Newspaper, Handshake, Inbox, ArrowUpRight, Clock } from "lucide-react";
import api from "../lib/api.js";
import Badge from "../components/ui/Badge.jsx";
import { EmptyState } from "../components/ui/Table.jsx";
import { useLanguage } from "../i18n.jsx";

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const mv = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v);
      },
    });
    return controls.stop;
  }, [value, mv]);
  return <span ref={ref}>0</span>;
}

const STATUS_TONE = { new: "orange", read: "indigo", answered: "green" };
const STATUS_LABEL = { new: "Yangi", read: "O'qilgan", answered: "Javob berilgan" };

const CARDS = [
  { key: "services", labelKey: "Xizmatlar", icon: Wrench, to: "/admin/services", gradient: "from-brand-600 to-accent-violet" },
  { key: "news", labelKey: "Yangiliklar", icon: Newspaper, to: "/admin/news", gradient: "from-accent-violet to-accent-cyan" },
  { key: "partners", labelKey: "Hamkorlar", icon: Handshake, to: "/admin/partners", gradient: "from-secondary-500 to-secondary-600" },
  { key: "newMessages", labelKey: "Yangi xabarlar", icon: Inbox, to: "/admin/messages", gradient: "from-emerald-500 to-teal-500" },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/stats").then(setStats).catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-soft ring-1 ring-black/5">
        <p className="text-sm font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stat cards */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {CARDS.map(({ key, labelKey, icon: Icon, to, gradient }) => (
          <motion.div
            key={key}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <Link
              to={to}
              className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5 transition-shadow hover:shadow-lift"
            >
              <span
                className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)] transition-transform group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-2xl font-extrabold text-ink">
                  {stats ? <AnimatedNumber value={stats[key]} /> : "—"}
                </p>
                <p className="text-xs font-semibold text-neutral-500">{t(labelKey)}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Latest messages */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h2 className="text-sm font-extrabold text-ink">{t("So'nggi xabarlar")}</h2>
            <Link to="/admin/messages" className="text-xs font-semibold text-brand-600 hover:text-brand-800">
              {t("Barchasi")} →
            </Link>
          </div>
          {!stats ? (
            <div className="animate-pulse p-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mb-4 h-4 w-3/4 rounded-full bg-neutral-100" />
              ))}
            </div>
          ) : stats.latestMessages.length === 0 ? (
            <EmptyState message={t("Hozircha xabarlar yo'q")} />
          ) : (
            <ul>
              {stats.latestMessages.map((m) => (
                <li key={m.id} className="border-b border-neutral-50 px-5 py-3.5 last:border-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-bold text-ink">{m.name}</p>
                    <Badge tone={STATUS_TONE[m.status]}>{t(STATUS_LABEL[m.status])}</Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-neutral-500">{m.message}</p>
                  <p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="h-3 w-3" />
                    {m.created_at}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Latest news */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h2 className="text-sm font-extrabold text-ink">{t("So'nggi yangiliklar")}</h2>
            <Link to="/admin/news" className="text-xs font-semibold text-brand-600 hover:text-brand-800">
              {t("Barchasi")} →
            </Link>
          </div>
          {!stats ? (
            <div className="animate-pulse p-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="mb-4 h-4 w-2/3 rounded-full bg-neutral-100" />
              ))}
            </div>
          ) : stats.latestNews.length === 0 ? (
            <EmptyState message={t("Hozircha yangiliklar yo'q")} />
          ) : (
            <ul>
              {stats.latestNews.map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-3 border-b border-neutral-50 px-5 py-3.5 last:border-0">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">{n.title}</p>
                    <p className="mt-0.5 text-[11px] text-neutral-400">{n.date}</p>
                  </div>
                  <Badge tone={n.published ? "green" : "gray"}>
                    {n.published ? t("Chop etilgan") : t("Qoralama")}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
