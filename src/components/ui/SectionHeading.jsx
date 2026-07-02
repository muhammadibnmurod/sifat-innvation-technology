import { motion } from "framer-motion";
import { fadeUp, stagger, inView } from "../../lib/motion.js";

// Eyebrow + title + optional subtitle, with a staggered reveal.
// `align` = "center" | "left". Wrap gradient words in the title with **word**.
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <motion.div
      variants={stagger}
      {...inView}
      className={`flex flex-col gap-4 max-w-2xl ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 self-start rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700"
          style={align === "center" ? { alignSelf: "center" } : undefined}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-600 to-accent-cyan" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={fadeUp} className="text-display font-extrabold">
        {renderTitle(title)}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-lg leading-relaxed text-ink-soft"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// Turn **word** into gradient text.
function renderTitle(title) {
  if (typeof title !== "string") return title;
  return title.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-gradient">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}
