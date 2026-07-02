import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Newspaper } from "lucide-react";
import api from "../lib/api.js";
import Button from "../components/ui/Button.jsx";
import Input, { Textarea } from "../components/ui/Input.jsx";
import Toggle from "../components/ui/Toggle.jsx";
import Drawer from "../components/ui/Drawer.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../components/ui/ImageUpload.jsx";
import Badge from "../components/ui/Badge.jsx";
import Table, { EmptyState } from "../components/ui/Table.jsx";
import { useToast } from "../components/ui/Toast.jsx";
import { useLanguage } from "../i18n.jsx";

const EMPTY = {
  title: "",
  excerpt: "",
  body: "",
  image: "",
  category: "",
  date: new Date().toISOString().slice(0, 10),
  published: 1,
};

export default function News() {
  const toast = useToast();
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/news?all=1")
      .then(setItems)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q),
    );
  }, [items, query]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setDrawer(true);
  };
  const openEdit = (n) => {
    setEditing(n);
    setForm({
      title: n.title,
      excerpt: n.excerpt,
      body: n.body,
      image: n.image,
      category: n.category,
      date: n.date,
      published: n.published,
    });
    setErrors({});
    setDrawer(true);
  };

  const save = async () => {
    const errs = {};
    if (!form.title.trim()) errs.title = t("Sarlavha kiritilishi shart");
    if (!form.date) errs.date = t("Sanani tanlang");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/api/news/${editing.id}`, form);
        setItems((arr) => arr.map((x) => (x.id === updated.id ? updated : x)));
        toast.success(t("Yangilik yangilandi"));
      } else {
        const created = await api.post("/api/news", form);
        setItems((arr) => [created, ...arr]);
        toast.success(t("Yangilik qo'shildi"));
      }
      setDrawer(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (n, v) => {
    setItems((arr) =>
      arr.map((x) => (x.id === n.id ? { ...x, published: v ? 1 : 0 } : x)),
    );
    try {
      await api.put(`/api/news/${n.id}`, { published: v ? 1 : 0 });
    } catch (e) {
      toast.error(e.message);
      setItems((arr) =>
        arr.map((x) => (x.id === n.id ? { ...x, published: n.published } : x)),
      );
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/api/news/${deleting.id}`);
      setItems((arr) => arr.filter((x) => x.id !== deleting.id));
      toast.success(t("Yangilik o'chirildi"));
      setDeleting(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: "title",
      label: t("Sarlavha"),
      render: (n) => (
        <div className="flex items-center gap-3">
          {n.image ? (
            <img
              src={n.image}
              alt=""
              className="h-10 w-14 flex-none rounded-lg object-cover ring-1 ring-black/5"
            />
          ) : (
            <span className="flex h-10 w-14 flex-none items-center justify-center rounded-lg bg-brand-50 text-brand-400">
              <Newspaper className="h-4 w-4" />
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate font-bold text-ink">{n.title}</p>
            <p className="truncate text-xs text-neutral-400">{n.excerpt}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: t("Turkum"),
      className: "w-32",
      render: (n) =>
        n.category ? (
          <Badge tone="indigo">{n.category}</Badge>
        ) : (
          <span className="text-neutral-300">—</span>
        ),
    },
    { key: "date", label: t("Sana"), className: "w-38 text-neutral-500" },
    {
      key: "published",
      label: t("Holat"),
      className: "w-36",
      render: (n) => (
        <Toggle
          checked={!!n.published}
          onChange={(v) => togglePublished(n, v)}
          label={n.published ? t("Chop etilgan") : t("Qoralama")}
        />
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-24",
      render: (n) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => openEdit(n)}
          aria-label={t("Tahrirlash")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-brand-50 hover:text-brand-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setDeleting(n)}
            aria-label={t("O'chirish")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          icon={Search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Yangiliklarni qidirish...")}
          className="sm:w-72"
        />
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          {t("Yangilik qo'shish")}
        </Button>
      </div>

      <Table
        columns={columns}
        rows={filtered}
        loading={loading}
        empty={
          <EmptyState
            message={
              query
                ? t("Qidiruv bo'yicha hech narsa topilmadi")
                : t("Hozircha yangiliklar yo'q")
            }
            icon={Newspaper}
          />
        }
      />

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title={editing ? t("Yangilikni tahrirlash") : t("Yangi yangilik")}
        width="max-w-xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDrawer(false)}>
              {t("Bekor qilish")}
            </Button>
            <Button loading={saving} onClick={save}>
              {t("Saqlash")}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <Input
            label={t("Sarlavha")}
            value={form.title}
            error={errors.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t("Turkum")}
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
              placeholder={t("Masalan: Standartlar")}
            />
            <Input
              label={t("Sana")}
              type="date"
              value={form.date}
              error={errors.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <Textarea
            label={t("Qisqacha matn (excerpt)")}
            rows={3}
            value={form.excerpt}
            onChange={(e) =>
              setForm((f) => ({ ...f, excerpt: e.target.value }))
            }
          />
          <Textarea
            label={t("To'liq matn")}
            rows={8}
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            placeholder={t("Yangilikning to'liq matni. Abzatslar uchun bo'sh qator qoldiring.")}
          />
          <ImageUpload
            label={t("Muqova rasmi")}
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
          />
          <Toggle
            checked={!!form.published}
            onChange={(v) => setForm((f) => ({ ...f, published: v ? 1 : 0 }))}
            label={t("Saytda chop etish")}
          />
        </div>
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        description={
          deleting ? `"${deleting.title}" ${t("yangiligi butunlay o'chiriladi.")}` : ""
        }
      />
    </div>
  );
}
