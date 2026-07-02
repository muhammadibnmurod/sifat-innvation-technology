const tones = {
  indigo: "bg-brand-50 text-brand-700 ring-brand-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  red: "bg-red-50 text-red-600 ring-red-200",
  gray: "bg-neutral-100 text-neutral-600 ring-neutral-200",
};

export default function Badge({ tone = "gray", children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
