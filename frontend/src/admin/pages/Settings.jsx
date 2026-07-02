import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Type, Share2, Video, Save, BarChart3 } from "lucide-react";
import api from "../lib/api.js";
import Button from "../components/ui/Button.jsx";
import Input, { Textarea } from "../components/ui/Input.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { useLanguage } from "../i18n.jsx";

const TABS = [
  { id: "contact", labelKey: "Kontakt", icon: Phone },
  { id: "hero", labelKey: "Hero & About", icon: Type },
  { id: "stats", labelKey: "Statistika", icon: BarChart3 },
  { id: "socials", labelKey: "Ijtimoiy tarmoqlar", icon: Share2 },
  { id: "video", labelKey: "Video", icon: Video },
];

export default function Settings() {
  const toast = useToast();
  const { t } = useLanguage();
  const [tab, setTab] = useState("contact");
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/api/settings").then(setData).catch((e) => toast.error(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key, value) => setData((d) => ({ ...d, [key]: value }));
  const setNested = (group, key, value) =>
    setData((d) => ({ ...d, [group]: { ...d[group], [key]: value } }));

  const save = async () => {
    if (!data.phone?.trim() || !data.email?.trim()) {
      toast.error(t("Telefon va email to'ldirilishi shart"));
      return;
    }
    setSaving(true);
    try {
      const saved = await api.put("/api/settings", data);
      setData(saved);
      toast.success(t("Sozlamalar saqlandi"));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="animate-pulse rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-4 h-10 rounded-xl bg-neutral-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, labelKey, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                active ? "text-white" : "bg-white text-ink-soft ring-1 ring-neutral-200 hover:ring-brand-300"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="settings-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-600 to-accent-violet shadow-[0_4px_14px_rgba(79,70,229,0.3)]"
                />
              )}
              <Icon className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">{t(labelKey)}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-black/5">
        {tab === "contact" && (
          <div className="grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label={t("Telefon")} icon={Phone} value={data.phone || ""} onChange={(e) => set("phone", e.target.value)} />
            <Input label="Email" value={data.email || ""} onChange={(e) => set("email", e.target.value)} />
            <Input label={t("Manzil")} icon={MapPin} value={data.address || ""} onChange={(e) => set("address", e.target.value)} className="sm:col-span-2" />
            <Input label={t("Ish vaqti")} value={data.working_hours || ""} onChange={(e) => set("working_hours", e.target.value)} className="sm:col-span-2" />
          </div>
        )}

        {tab === "hero" && (
          <div className="flex max-w-2xl flex-col gap-5">
            <Input label={t("Hero belgisi (badge)")} value={data.hero_badge || ""} onChange={(e) => set("hero_badge", e.target.value)} />
            <Input
              label={t("Hero sarlavha")}
              value={data.hero_title || ""}
              onChange={(e) => set("hero_title", e.target.value)}
            />
            <p className="-mt-3 text-xs text-neutral-400">
              {t("Gradient so'z uchun **yulduzcha** ichiga oling: masalan, **professional**")}
            </p>
            <Textarea label={t("Hero tavsif")} rows={3} value={data.hero_subtitle || ""} onChange={(e) => set("hero_subtitle", e.target.value)} />
            <Textarea label={t("Biz haqimizda matni")} rows={4} value={data.about_text || ""} onChange={(e) => set("about_text", e.target.value)} />
          </div>
        )}

        {tab === "stats" && (
          <div className="grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label={t("Yillik tajriba")}
              type="number"
              value={data.stats?.experience ?? 0}
              onChange={(e) => setNested("stats", "experience", Number(e.target.value))}
            />
            <Input
              label={t("Bajarilgan loyihalar")}
              type="number"
              value={data.stats?.projects ?? 0}
              onChange={(e) => setNested("stats", "projects", Number(e.target.value))}
            />
            <Input
              label={t("Doimiy mijozlar")}
              type="number"
              value={data.stats?.clients ?? 0}
              onChange={(e) => setNested("stats", "clients", Number(e.target.value))}
            />
            <Input
              label={t("Xizmat turlari")}
              type="number"
              value={data.stats?.services ?? 0}
              onChange={(e) => setNested("stats", "services", Number(e.target.value))}
            />
          </div>
        )}

        {tab === "socials" && (
          <div className="grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            <Input label="Facebook" placeholder="https://facebook.com/..." value={data.socials?.facebook || ""} onChange={(e) => setNested("socials", "facebook", e.target.value)} />
            <Input label="YouTube" placeholder="https://youtube.com/..." value={data.socials?.youtube || ""} onChange={(e) => setNested("socials", "youtube", e.target.value)} />
            <Input label="Instagram" placeholder="https://instagram.com/..." value={data.socials?.instagram || ""} onChange={(e) => setNested("socials", "instagram", e.target.value)} />
            <Input label="Telegram" placeholder="https://t.me/..." value={data.socials?.telegram || ""} onChange={(e) => setNested("socials", "telegram", e.target.value)} />
          </div>
        )}

        {tab === "video" && (
          <div className="flex max-w-2xl flex-col gap-5">
            <Input
              label={t("Asosiy video (YouTube havolasi)")}
              placeholder="https://www.youtube.com/watch?v=..."
              value={data.video_url || ""}
              onChange={(e) => set("video_url", e.target.value)}
            />
            <p className="-mt-3 text-xs text-neutral-400">
              {t("Saytdagi video bo'limida ko'rsatiladigan asosiy YouTube video havolasi.")}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button size="lg" loading={saving} onClick={save}>
          <Save className="h-4 w-4" />
          {t("Saqlash")}
        </Button>
      </div>
    </div>
  );
}
