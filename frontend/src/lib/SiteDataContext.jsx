/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

// Fetches all public content once and shares it with every section.
// Until the API answers (or if it fails), FALLBACK keeps the site looking
// exactly like the original hard-coded version — graceful degradation.

export const FALLBACK = {
  services: [
    { id: 1, title: "Ekspertiza va hujjatlashtirish", description: "Kranlarni diagnostika qilish, sanoat xavfsizligi ekspertizasi hamda pasport va texnik hujjatlarni rasmiylashtirish.", icon: "FileSearch" },
    { id: 2, title: "Ta'mirlash ishlari", description: "Yuk ko'taruvchi mashinalar, ko'prikli va kozlovoy kranlar hamda kran yo'llarini joriy va kapital ta'mirlash.", icon: "Wrench" },
    { id: 3, title: "Rekonstruksiya va modernizatsiya", description: "Ko'prikli kranlarni qayta qurish, modernizatsiya qilish va tegishli loyiha hujjatlarini tayyorlash.", icon: "RefreshCw" },
    { id: 4, title: "PS va infratuzilma", description: "Kranlar va ularning infratuzilmasi bo'yicha rejalashtirish, raqamli tahlil va uskunalarni sozlash.", icon: "Building2" },
    { id: 5, title: "Xavfsizlik asboblari", description: "Kranlarning xavfsizlik asboblarini o'rnatish, sozlash va davriy texnik tekshiruvdan o'tkazish.", icon: "ShieldCheck" },
    { id: 6, title: "Maxsus xizmatlar", description: "Barcha rusumdagi kranlarni ko'rikdan o'tkazish, elektr yuritmalar ekspertizasi va protokolli sinovlar.", icon: "Cpu" },
  ],
  news: [
    { id: 1, category: "Standartlar", date: "2025-08-07", title: "GOST 33715-2025 standarti qabul qilindi", excerpt: "Standartlashtirish, metrologiya va sertifikatlashtirish bo'yicha davlatlararo Kengash «Yuk ilg'ich moslamalar. Xavfsiz foydalanish» standartini qabul qildi.", image: "" },
    { id: 2, category: "Ishlanma", date: "2025-08-02", title: "Kran yo'llari uchun yangi GOST loyihasi", excerpt: "Sifat Innovatsion Texnologiya ishlab chiqqan «Yerusti rels kran yo'llari. Umumiy texnik talablar» standarti qabul qilish bosqichida.", image: "" },
    { id: 3, category: "Tadbirlar", date: "2025-07-15", title: "Mutaxassislar uchun malaka oshirish seminari", excerpt: "Yuk ko'taruvchi mashinalarni ko'rikdan o'tkazish va ta'mirlash bo'yicha amaliy seminar bo'lib o'tdi.", image: "" },
  ],
  partners: [
    "Uralmash", "Kranmash", "KAMAZ", "GAZprom", "NLMK", "Severstal",
    "Transneft", "Nefaz", "TatSpets", "RGK", "Diakon", "Yamaha",
  ].map((name, i) => ({ id: i + 1, name, logo: "", url: "" })),
  faqs: [
    { id: 1, question: "Qanday kranlarni ta'mirlaysiz?", answer: "Ko'prikli, kozlovoy, minorali va boshqa yuk ko'taruvchi kranlarning deyarli barcha turlarini ta'mirlaymiz — joriy ta'mirdan kapital tiklashgacha." },
    { id: 2, question: "Ekspertiza qancha vaqt oladi?", answer: "Obyekt hajmi va murakkabligiga qarab, sanoat xavfsizligi ekspertizasi odatda 3–10 ish kunini oladi." },
    { id: 3, question: "Texnik hujjatlarni rasmiylashtirasizmi?", answer: "Ha. Pasport, texnik kartalar va boshqa barcha zarur hujjatlarni amaldagi standartlarga muvofiq tayyorlab beramiz." },
    { id: 4, question: "Xizmat ko'rsatish hududi qayer?", answer: "Toshkent shahri va butun O'zbekiston bo'ylab xizmat ko'rsatamiz. Kerak bo'lsa mutaxassislarimiz obyektga chiqadi." },
  ],
  settings: {
    phone: "+998 99 866 02 71",
    email: "sifat.saffatt@gmail.com",
    address: "Toshkent shahri, Mirobod tumani",
    working_hours: "Du–Sha, 9:00 – 18:00",
    socials: { facebook: "", youtube: "", instagram: "", telegram: "" },
    hero_badge: "2014 yildan beri Toshkentda",
    hero_title: "Yuk ko'taruvchi kranlarni **professional** ta'mirlash",
    hero_subtitle:
      "Malakali mutaxassislarimiz kran yo'llarini ko'zdan kechirish, tekshirish va texnik ta'mirlash bo'yicha barcha ishlarni zamonaviy uskunalar bilan bajaradi — ekspertizadan to kapital ta'mirgacha.",
    about_text:
      "Sifat Innovatsion Texnologiya xavfli ishlab chiqarish obyektlarida sanoat xavfsizligi ekspertizasi, yuk ko'taruvchi mashinalar va kran yo'llarini loyihalash hamda ta'mirlash bilan shug'ullanadi.",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    stats: { experience: 10, projects: 500, clients: 120, services: 15 },
  },
};

const SiteDataContext = createContext({ ...FALLBACK, loading: true });

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json();
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState({ ...FALLBACK, loading: true });

  useEffect(() => {
    let alive = true;
    Promise.allSettled([
      fetchJson("/api/services"),
      fetchJson("/api/news"),
      fetchJson("/api/partners"),
      fetchJson("/api/faq"),
      fetchJson("/api/settings"),
    ]).then(([services, news, partners, faqs, settings]) => {
      if (!alive) return;
      setData({
        services: pick(services, FALLBACK.services),
        news: pick(news, FALLBACK.news),
        partners: pick(partners, FALLBACK.partners),
        faqs: pick(faqs, FALLBACK.faqs),
        settings:
          settings.status === "fulfilled" && settings.value
            ? { ...FALLBACK.settings, ...settings.value }
            : FALLBACK.settings,
        loading: false,
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  return <SiteDataContext.Provider value={data}>{children}</SiteDataContext.Provider>;
}

// Use the API value only when the request succeeded and returned rows.
function pick(result, fallback) {
  return result.status === "fulfilled" && Array.isArray(result.value) && result.value.length > 0
    ? result.value
    : fallback;
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
