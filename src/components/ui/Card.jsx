import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motion.js";

// Frosted glass card. The reveal is driven by the parent stagger (variants
// default to fadeUp — "hidden"/"show"). Hover uses inline values so it never
// collides with the reveal's variant labels.
export default function Card({
  hover = true,
  className = "",
  children,
  variants = fadeUp,
  ...props
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`group relative rounded-[var(--radius-card)] glass shadow-soft ${
        hover ? "transition-shadow duration-300 hover:shadow-lift" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
