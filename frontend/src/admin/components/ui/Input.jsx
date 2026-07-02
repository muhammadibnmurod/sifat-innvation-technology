/* eslint-disable react-refresh/only-export-components */
const base =
  "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-all duration-200 placeholder:text-neutral-400 focus:ring-4 disabled:bg-neutral-50 disabled:text-neutral-400";

export const fieldRing = (error) =>
  error
    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
    : "border-neutral-200 focus:border-brand-500 focus:ring-brand-100";

export default function Input({ label, error, icon: Icon, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        )}
        <input className={`${base} ${Icon ? "pl-10" : ""} ${fieldRing(error)}`} {...props} />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, rows = 4, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>}
      <textarea rows={rows} className={`${base} resize-y ${fieldRing(error)}`} {...props} />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], className = "", ...props }) {
  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>}
      <select className={`${base} cursor-pointer ${fieldRing(error)}`} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
