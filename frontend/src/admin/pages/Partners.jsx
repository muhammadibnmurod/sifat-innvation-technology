import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { Plus, Pencil, Trash2, Handshake, Building2, Link as LinkIcon } from "lucide-react";
import api from "../lib/api.js";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Modal from "../components/ui/Modal.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import ImageUpload from "../components/ui/ImageUpload.jsx";
import { EmptyState } from "../components/ui/Table.jsx";
import { useToast } from "../components/ui/Toast.jsx";

const EMPTY = { name: "", url: "", logo: "" };

export default function Partners() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/partners")
      .then(setItems)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setModal(true);
  };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, url: p.url, logo: p.logo });
    setErrors({});
    setModal(true);
  };

  const save = async () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Nom kiritilishi shart";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      if (editing) {
        const updated = await api.put(`/api/partners/${editing.id}`, form);
        setItems((arr) => arr.map((x) => (x.id === updated.id ? updated : x)));
        toast.success("Hamkor yangilandi");
      } else {
        const created = await api.post("/api/partners", { ...form, sort_order: items.length + 1 });
        setItems((arr) => [...arr, created]);
        toast.success("Hamkor qo'shildi");
      }
      setModal(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/api/partners/${deleting.id}`);
      setItems((arr) => arr.filter((x) => x.id !== deleting.id));
      toast.success("Hamkor o'chirildi");
      setDeleting(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const onReorder = (next) => {
    setItems(next);
    api.put("/api/partners/reorder/all", { ids: next.map((x) => x.id) }).catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Jami: <span className="font-bold text-ink">{items.length}</span> ta hamkor — kartochkalarni sudrab tartibini o'zgartiring
        </p>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Hamkor qo'shish
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-white shadow-soft ring-1 ring-black/5" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
          <EmptyState message="Hozircha hamkorlar yo'q" icon={Handshake} />
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={onReorder}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((p) => (
            <Reorder.Item
              key={p.id}
              value={p}
              className="group relative flex cursor-grab flex-col items-center justify-center gap-2 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5 transition-shadow hover:shadow-lift active:cursor-grabbing"
            >
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="h-12 max-w-full object-contain" />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Building2 className="h-6 w-6" />
                </span>
              )}
              <p className="text-center text-sm font-bold text-ink">{p.name}</p>
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-[11px] font-medium text-brand-500 hover:text-brand-700"
                >
                  <LinkIcon className="h-3 w-3" />
                  Sayt
                </a>
              )}
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => openEdit(p)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Tahrirlash"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-neutral-400 shadow-soft hover:text-brand-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleting(p)}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="O'chirish"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-neutral-400 shadow-soft hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? "Hamkorni tahrirlash" : "Yangi hamkor"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModal(false)}>Bekor qilish</Button>
            <Button loading={saving} onClick={save}>Saqlash</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Nomi"
            value={form.name}
            error={errors.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Masalan: Kranmash"
          />
          <Input
            label="Veb-sayt (ixtiyoriy)"
            value={form.url}
            onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            placeholder="https://..."
          />
          <ImageUpload
            label="Logotip (ixtiyoriy)"
            value={form.logo}
            onChange={(url) => setForm((f) => ({ ...f, logo: url }))}
          />
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        description={deleting ? `"${deleting.name}" hamkori ro'yxatdan o'chiriladi.` : ""}
      />
    </div>
  );
}
