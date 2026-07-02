import { motion } from "framer-motion";

export default function Toggle({ checked, onChange, label, disabled = false }) {
  return (
    <label className={`inline-flex items-center gap-2.5 ${disabled ? "opacity-50" : "cursor-pointer"}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
        className={`relative h-6 w-11 flex-none rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
          checked ? "bg-gradient-to-r from-brand-600 to-accent-violet" : "bg-neutral-300"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-ink-soft">{label}</span>}
    </label>
  );
}
