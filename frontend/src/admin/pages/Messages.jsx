import { useEffect, useMemo, useState } from "react";
import { Inbox, Phone, Mail, Clock, Trash2, CheckCheck } from "lucide-react";
import api from "../lib/api.js";
import Button from "../components/ui/Button.jsx";
import Drawer from "../components/ui/Drawer.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import Badge from "../components/ui/Badge.jsx";
import Table, { EmptyState } from "../components/ui/Table.jsx";
import { useToast } from "../components/ui/Toast.jsx";

const STATUS_TONE = { new: "orange", read: "indigo", answered: "green" };
const STATUS_LABEL = {
  new: "Yangi",
  read: "O'qilgan",
  answered: "Javob berilgan",
};
const FILTERS = [
  { value: "", label: "Barchasi" },
  { value: "new", label: "Yangi" },
  { value: "read", label: "O'qilgan" },
  { value: "answered", label: "Javob berilgan" },
];

export default function Messages() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/messages")
      .then(setItems)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(
    () => (filter ? items.filter((m) => m.status === filter) : items),
    [items, filter],
  );

  const setStatus = async (m, status) => {
    try {
      const updated = await api.put(`/api/messages/${m.id}`, { status });
      setItems((arr) => arr.map((x) => (x.id === updated.id ? updated : x)));
      setSelected((s) => (s && s.id === updated.id ? updated : s));
    } catch (e) {
      toast.error(e.message);
    }
  };

  // Opening a new message marks it as read.
  const openMessage = (m) => {
    setSelected(m);
    if (m.status === "new") setStatus(m, "read");
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/api/messages/${deleting.id}`);
      setItems((arr) => arr.filter((x) => x.id !== deleting.id));
      if (selected?.id === deleting.id) setSelected(null);
      toast.success("Xabar o'chirildi");
      setDeleting(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Yuboruvchi",
      render: (m) => (
        <div>
          <p
            className={`text-sm ${m.status === "new" ? "font-extrabold text-ink" : "font-semibold text-ink-soft"}`}
          >
            {m.name}
          </p>
          <p className="text-xs text-neutral-400">
            {m.phone || m.email || "—"}
          </p>
        </div>
      ),
    },
    {
      key: "message",
      label: "Xabar",
      render: (m) => (
        <p className="max-w-md truncate text-sm text-neutral-500">
          {m.message}
        </p>
      ),
    },
    {
      key: "created_at",
      label: "Sana",
      className: "w-44 text-xs text-neutral-400",
    },
    {
      key: "status",
      label: "Holat",
      className: "w-46",
      render: (m) => (
        <Badge tone={STATUS_TONE[m.status]}>{STATUS_LABEL[m.status]}</Badge>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Status filter */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          const count = f.value
            ? items.filter((m) => m.status === f.value).length
            : items.length;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "bg-gradient-to-r from-brand-600 to-accent-violet text-white shadow-[0_4px_14px_rgba(79,70,229,0.3)]"
                  : "bg-white text-ink-soft ring-1 ring-neutral-200 hover:ring-brand-300"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 text-[10px] font-bold ${active ? "bg-white/20" : "bg-neutral-100"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <Table
        columns={columns}
        rows={filtered}
        loading={loading}
        onRowClick={openMessage}
        empty={<EmptyState message="Hozircha xabarlar yo'q" icon={Inbox} />}
      />

      {/* Detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Xabar tafsilotlari"
        footer={
          selected && (
            <>
              <Button variant="ghost" onClick={() => setDeleting(selected)}>
                <Trash2 className="h-4 w-4" />
                O'chirish
              </Button>
              {selected.status !== "answered" && (
                <Button onClick={() => setStatus(selected, "answered")}>
                  <CheckCheck className="h-4 w-4" />
                  Javob berildi
                </Button>
              )}
            </>
          )
        }
      >
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-violet text-sm font-extrabold text-white">
                  {selected.name.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-bold text-ink">{selected.name}</p>
                  <Badge tone={STATUS_TONE[selected.status]}>
                    {STATUS_LABEL[selected.status]}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 rounded-xl bg-neutral-50 p-4 text-sm">
              {selected.phone && (
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-2.5 font-medium text-ink hover:text-brand-700"
                >
                  <Phone className="h-4 w-4 text-brand-500" />
                  {selected.phone}
                </a>
              )}
              {selected.email && (
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-2.5 font-medium text-ink hover:text-brand-700"
                >
                  <Mail className="h-4 w-4 text-brand-500" />
                  {selected.email}
                </a>
              )}
              <p className="flex items-center gap-2.5 text-neutral-500">
                <Clock className="h-4 w-4 text-brand-500" />
                {selected.created_at}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                Xabar matni
              </p>
              <p className="whitespace-pre-wrap rounded-xl border border-neutral-100 bg-white p-4 text-sm leading-relaxed text-ink-soft">
                {selected.message}
              </p>
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        description={
          deleting
            ? `${deleting.name} yuborgan xabar butunlay o'chiriladi.`
            : ""
        }
      />
    </div>
  );
}
