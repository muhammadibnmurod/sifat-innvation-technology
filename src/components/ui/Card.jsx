import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion.js";

// Frosted glass card with a cursor-tracking spotlight and a gradient border
// that fades in on hover. The reveal is driven by the parent stagger
// (variants default to fadeUp — "hidden"/"show"). Hover uses inline values so
// it never collides with the reveal's variant labels.
export default function Card({
  hover = true,
  className = "",
  children,
  variants = fadeUp,
  ...props
}) {
  const ref = useRef(null);

  // Feed the cursor position to the .spotlight radial gradient.
  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={hover ? onMouseMove : undefined}
      variants={variants}
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`group relative rounded-[var(--radius-card)] glass shadow-soft ${
        hover
          ? "spotlight border-glow transition-shadow duration-300 hover:shadow-lift"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
