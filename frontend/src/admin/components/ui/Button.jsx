import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-600 to-accent-violet text-white shadow-[0_6px_18px_rgba(79,70,229,0.3)] hover:shadow-[0_10px_26px_rgba(79,70,229,0.4)]",
  secondary:
    "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-[0_6px_18px_rgba(249,115,22,0.3)] hover:shadow-[0_10px_26px_rgba(249,115,22,0.4)]",
  ghost:
    "bg-white text-ink border border-neutral-200 hover:border-brand-300 hover:bg-brand-50/50 shadow-soft",
  danger:
    "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_6px_18px_rgba(239,68,68,0.3)] hover:shadow-[0_10px_26px_rgba(239,68,68,0.4)]",
};

const sizes = {
  sm: "px-3.5 py-2 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}) {
  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl font-semibold tracking-tight transition-shadow duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
