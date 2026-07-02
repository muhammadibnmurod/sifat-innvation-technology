import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Clapperboard } from "lucide-react";
import { fadeUp, stagger, inView } from "../lib/motion.js";

const VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Sifat Innovatsion Texnologiya taqdimoti" },
  { id: "M7lc1UVf-VE", title: "Kranlar va rels yo'llarini ta'mirlash" },
  { id: "jNQXAC9IVRw", title: "Kompaniya faoliyati bo'yicha videohisobot" },
];

function VideoCard({ id, title, featured = false }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className={`group relative overflow-hidden rounded-[var(--radius-card)] bg-white/5 shadow-glass ring-1 ring-white/10 transition-all duration-300 hover:ring-white/25 ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div className={`relative ${featured ? "aspect-video lg:h-full lg:aspect-auto" : "aspect-video"}`}>
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
            <span className="absolute inset-0 bg-gradient-to-t from-[#14123a]/90 via-[#14123a]/20 to-transparent" />
            {/* pulsing play button */}
            <span
              className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ${
                featured ? "h-20 w-20" : "h-14 w-14"
              }`}
            >
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-white/70" />
              <span className="relative flex h-full w-full items-center justify-center rounded-full bg-white text-brand-700 shadow-lift transition-transform duration-300 group-hover:scale-110">
                <Play className={`ml-1 fill-current ${featured ? "h-7 w-7" : "h-5 w-5"}`} />
              </span>
            </span>
            {/* title on the poster */}
            <span className="absolute inset-x-0 bottom-0 p-5 text-left">
              <span
                className={`block font-bold leading-snug text-white ${
                  featured ? "text-lg sm:text-xl" : "text-sm"
                }`}
              >
                {title}
              </span>
            </span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function VideoSection() {
  const [featuredVideo, ...restVideos] = VIDEOS;

  return (
    <section
      id="video"
      className="noise section relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-ink via-[#14123a] to-brand-900"
    >
      {/* full-bleed dark cinema band */}
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-40" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-accent-cyan/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} {...inView} className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-100 ring-1 ring-white/15 backdrop-blur"
            >
              <Clapperboard className="h-3.5 w-3.5 text-accent-cyan" />
              Video galereya
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-display font-extrabold text-white">
              Ishlarimizni{" "}
              <span className="bg-gradient-to-r from-brand-300 via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                harakatda
              </span>{" "}
              ko'ring
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-brand-100/80">
              Kranlar va rels yo'llarini ta'mirlash jarayoni hamda kompaniya
              faoliyatidan lavhalar.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            {...inView}
            className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2"
          >
            <VideoCard {...featuredVideo} featured />
            {restVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </motion.div>
      </div>
    </section>
  );
}
