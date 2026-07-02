import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { useLanguage } from "../../i18n.jsx";

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-neutral-100 px-5 py-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-4 rounded-full bg-neutral-100"
              style={{ width: `${[30, 20, 25, 15][c % 4]}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ message, icon: Icon = Inbox, action }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
        <Icon className="h-7 w-7" />
      </span>
      <p className="text-sm font-medium text-neutral-500">{message || t("Hozircha ma'lumot yo'q")}</p>
      {action}
    </div>
  );
}

// columns: [{ key, label, className?, render?(row) }]
export default function Table({ columns, rows, loading, empty, onRowClick, rowKey = "id" }) {
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
        <TableSkeleton cols={columns.length} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
      {rows.length === 0 ? (
        empty || <EmptyState />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500 ${col.className || ""}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.035 } } }}
            >
              {rows.map((row) => (
                <motion.tr
                  key={row[rowKey]}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={`border-b border-neutral-50 last:border-0 ${
                    onRowClick ? "cursor-pointer transition-colors hover:bg-brand-50/40" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-5 py-3.5 ${col.className || ""}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </div>
  );
}
