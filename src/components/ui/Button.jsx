import { motion } from "framer-motion";
import { buttonHover } from "../../lib/motion.js";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer whitespace-nowrap";

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

const variants = {
  // Orange gradient — primary brand CTA
  primary:
    "text-white bg-gradient-to-r from-secondary-500 to-secondary-600 " +
    "shadow-[0_8px_24px_rgba(249,115,22,0.35)] hover:shadow-[0_14px_36px_rgba(249,115,22,0.45)] " +
    "focus-visible:ring-secondary-500",
  // Indigo→violet gradient — secondary accent CTA
  gradient:
    "text-white bg-gradient-to-r from-brand-600 via-accent-violet to-brand-600 bg-[length:200%_auto] " +
    "shadow-[0_8px_24px_rgba(79,70,229,0.32)] hover:bg-right hover:shadow-[0_14px_36px_rgba(79,70,229,0.42)] " +
    "transition-[background-position,box-shadow] focus-visible:ring-brand-500",
  // Ghost / glass outline
  ghost:
    "text-ink bg-white/60 backdrop-blur border border-black/10 " +
    "hover:bg-white hover:shadow-soft focus-visible:ring-brand-400",
};

export default function Button({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const Comp = motion[as] || motion.button;
  return (
    <Comp
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
