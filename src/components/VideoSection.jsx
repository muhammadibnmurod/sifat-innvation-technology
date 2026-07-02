import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "./ui/SectionHeading.jsx";
import Button from "./ui/Button.jsx";
import { fadeUp, stagger, inView } from "../lib/motion.js";

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Sifat Innovatsion Texnologiya taqdimoti" },
  { id: "M7lc1UVf-VE", title: "Kranlar va rels yo'llarini ta'mirlash" },
  { id: "jNQXAC9IVRw", title: "Kompaniya faoliyati bo'yicha videohisobot" },
];

function VideoCard({ id, title }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="group overflow-hidden rounded-[var(--radius-card)] glass shadow-soft transition-shadow duration-300 hover:shadow-lift"
    >
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${title} — videoni ijro etish`}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/10 to-transparent" />
            {/* pulsing play button */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-white/70" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand-700 shadow-lift transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-sm font-bold text-ink">{title}</h3>
      </div>
    </motion.div>
  );
}

export default function VideoSection() {
  return (
    <section id="video" className="section scroll-mt-24 px-4 sm:px-6 lg:px-8">
      {/* soft gradient container */}
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-xl2)] bg-gradient-to-br from-brand-50 via-white to-brand-50 p-8 shadow-soft ring-1 ring-brand-100/60 sm:p-12">
        <SectionHeading
          eyebrow="Video galereya"
          title="Ishlarimizni **harakatda** ko'ring"
          subtitle="Kranlar va rels yo'llarini ta'mirlash jarayoni hamda kompaniya faoliyatidan lavhalar."
        />

        <motion.div
          variants={stagger}
          {...inView}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {VIDEOS.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} {...inView} className="mt-10 text-center">
          <Button as="a" href="#" variant="ghost">
            Boshqa videolarni ko'rish
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
