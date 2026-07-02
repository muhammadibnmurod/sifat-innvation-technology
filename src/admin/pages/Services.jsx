import { useEffect, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Plus, GripVertical, Pencil, Trash2, Wrench } from "lucide-react";
import api from "../lib/api.js";
import { getIcon, ICON_NAMES, ICONS } from "../../lib/icons.js";
import Button from "../components/ui/Button.jsx";
import Input, { Textarea } from "../components/ui/Input.jsx";
import Toggle from "../components/ui/Toggle.jsx";
import Drawer from "../components/ui/Drawer.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../components/ui/ImageUpload.jsx";
import Badge from "../components/ui/Badge.jsx";
import { EmptyState, TableSkeleton } from "../components/ui/Table.jsx";
import { useToast } from "../components/ui/Toast.jsx";

const EMPTY = { title: "", description: "", icon: "Wrench", image: "", active: 1 };

function ServiceRow({ service, onEdit, onDelete, onToggle }) {
  const controls = useDragControls();
  const Icon = getIcon(service.icon);
  return (
    <Reorder.Item
      value={service}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 border-b border-neutral-50 bg-white px-4 py-3 last:border-0"
    >
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        aria-label="Tartibni o'zgartirish"
        className="cursor-grab touch-none text-neutral-300 hover:text-brand-500 active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      {service.image ? (
        <img src={service.image} alt="" className="h-11 w-11 flex-none rounded-xl object-cover ring-1 ring-black/5" />
      ) : (
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-violet text-white">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-bold text-ink">{service.title}</p>
          {!service.active && <Badge tone="gray">Faol emas</Badge>}
        </div>
        <p className="mt-0.5 truncate text-xs text-neutral-500">{service.description}</p>
      </div>
      <Toggle checked={!!service.active} onChange={(v) => onToggle(service, v)} />
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onEdit(service)}
          aria-label="Tahrirlash"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(service)}
          aria-label="O'chirish"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}

export default function Services() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/services?all=1")
      .then(setItems)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setDrawer(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description, icon: s.icon, image: s.image, active: s.active });
    setErrors({});
    setDrawer(true);
  };

  const save = async () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Sarlavha kiritilishi shart";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/api/services/${editing.id}`, form);
        setItems((arr) => arr.map((x) => (x.id === updated.id ? updated : x)));
        toast.success("Xizmat yangilandi");
      } else {
        const created = await api.post("/api/services", { ...form, sort_order: items.length + 1 });
        setItems((arr) => [...arr, created]);
        toast.success("Xizmat qo'shildi");
      }
      setDrawer(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (s, v) => {
    setItems((arr) => arr.map((x) => (x.id === s.id ? { ...x, active: v ? 1 : 0 } : x)));
    try {
      await api.put(`/api/services/${s.id}`, { active: v ? 1 : 0 });
    } catch (e) {
      toast.error(e.message);
      setItems((arr) => arr.map((x) => (x.id === s.id ? { ...x, active: s.active } : x)));
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/api/services/${deleting.id}`);
      setItems((arr) => arr.filter((x) => x.id !== deleting.id));
      toast.success("Xizmat o'chirildi");
      setDeleting(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const onReorder = (next) => {
    setItems(next);
    api.put("/api/services/reorder/all", { ids: next.map((x) => x.id) }).catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Jami: <span className="font-bold text-ink">{items.length}</span> ta xizmat
        </p>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Xizmat qo'shish
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
        {loading ? (
          <TableSkeleton />
        ) : items.length === 0 ? (
          <EmptyState message="Hozircha xizmatlar yo'q" icon={Wrench} />
        ) : (
          <Reorder.Group axis="y" values={items} onReorder={onReorder}>
            {items.map((s) => (
              <ServiceRow key={s.id} service={s} onEdit={openEdit} onDelete={setDeleting} onToggle={toggle} />
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* Create / edit drawer */}
      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title={editing ? "Xizmatni tahrirlash" : "Yangi xizmat"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setDrawer(false)}>Bekor qilish</Button>
            <Button loading={saving} onClick={save}>Saqlash</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Sarlavha"
            value={form.title}
            error={errors.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Masalan: Ta'mirlash ishlari"
          />
          <Textarea
            label="Tavsif"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Xizmat haqida qisqacha..."
          />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Belgi (icon)</label>
            <div className="grid max-h-40 grid-cols-6 gap-2 overflow-y-auto rounded-xl border border-neutral-200 p-3">
              {ICON_NAMES.map((name) => {
                const Ic = ICONS[name];
                const selected = form.icon === name;
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => setForm((f) => ({ ...f, icon: name }))}
                    className={`flex h-10 items-center justify-center rounded-lg transition-colors ${
                      selected
                        ? "bg-gradient-to-br from-brand-600 to-accent-violet text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]"
                        : "bg-neutral-50 text-neutral-500 hover:bg-brand-50 hover:text-brand-600"
                    }`}
                  >
                    <Ic className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
          <ImageUpload
            label="Rasm (ixtiyoriy)"
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
          />
          <Toggle
            checked={!!form.active}
            onChange={(v) => setForm((f) => ({ ...f, active: v ? 1 : 0 }))}
            label="Saytda ko'rsatish"
          />
        </div>
      </Drawer>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        description={deleting ? `"${deleting.title}" xizmati butunlay o'chiriladi.` : ""}
      />
    </div>
  );
}
