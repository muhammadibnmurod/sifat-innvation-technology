import { useEffect, useState } from "react";
import { Reorder, useDragControls, AnimatePresence, motion } from "framer-motion";
import { Plus, GripVertical, Pencil, Trash2, ChevronDown, HelpCircle } from "lucide-react";
import api from "../lib/api.js";
import Button from "../components/ui/Button.jsx";
import Input, { Textarea } from "../components/ui/Input.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import { EmptyState, TableSkeleton } from "../components/ui/Table.jsx";
import { useToast } from "../components/ui/Toast.jsx";

function FaqItem({ item, isOpen, onToggle, editing, draft, setDraft, onStartEdit, onCancelEdit, onSave, onDelete, saving }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="border-b border-neutral-50 bg-white last:border-0"
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          onPointerDown={(e) => controls.start(e)}
          aria-label="Tartibni o'zgartirish"
          className="cursor-grab touch-none text-neutral-300 hover:text-brand-500 active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button type="button" onClick={onToggle} className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <span className="truncate text-sm font-bold text-ink">{item.question}</span>
          <ChevronDown
            className={`h-4 w-4 flex-none text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex gap-1">
          <button type="button" onClick={onStartEdit} aria-label="Tahrirlash"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-brand-50 hover:text-brand-600">
            <Pencil className="h-4 w-4" />
          </button>
          <button type="button" onClick={onDelete} aria-label="O'chirish"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {(isOpen || editing) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {editing ? (
              <div className="flex flex-col gap-3 px-11 pb-4">
                <Input
                  label="Savol"
                  value={draft.question}
                  onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
                />
                <Textarea
                  label="Javob"
                  rows={3}
                  value={draft.answer}
                  onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={onCancelEdit}>Bekor qilish</Button>
                  <Button size="sm" loading={saving} onClick={onSave}>Saqlash</Button>
                </div>
              </div>
            ) : (
              <p className="px-11 pb-4 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Reorder.Item>
  );
}

export default function Faq() {
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/faq")
      .then(setItems)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setDraft({ question: item.question, answer: item.answer });
    setAdding(false);
  };

  const saveEdit = async () => {
    if (!draft.question.trim() || !draft.answer.trim()) {
      toast.error("Savol va javob to'ldirilishi shart");
      return;
    }
    setSaving(true);
    try {
      const updated = await api.put(`/api/faq/${editingId}`, draft);
      setItems((arr) => arr.map((x) => (x.id === updated.id ? updated : x)));
      setEditingId(null);
      toast.success("FAQ yangilandi");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const saveNew = async () => {
    if (!draft.question.trim() || !draft.answer.trim()) {
      toast.error("Savol va javob to'ldirilishi shart");
      return;
    }
    setSaving(true);
    try {
      const created = await api.post("/api/faq", { ...draft, sort_order: items.length + 1 });
      setItems((arr) => [...arr, created]);
      setAdding(false);
      setDraft({ question: "", answer: "" });
      toast.success("FAQ qo'shildi");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/api/faq/${deleting.id}`);
      setItems((arr) => arr.filter((x) => x.id !== deleting.id));
      toast.success("FAQ o'chirildi");
      setDeleting(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const onReorder = (next) => {
    setItems(next);
    api.put("/api/faq/reorder/all", { ids: next.map((x) => x.id) }).catch((e) => toast.error(e.message));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Jami: <span className="font-bold text-ink">{items.length}</span> ta savol-javob
        </p>
        <Button
          onClick={() => {
            setAdding(true);
            setEditingId(null);
            setDraft({ question: "", answer: "" });
          }}
        >
          <Plus className="h-4 w-4" />
          Savol qo'shish
        </Button>
      </div>

      {adding && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-brand-100"
        >
          <Input
            label="Savol"
            value={draft.question}
            onChange={(e) => setDraft((d) => ({ ...d, question: e.target.value }))}
            placeholder="Yangi savol..."
          />
          <Textarea
            label="Javob"
            rows={3}
            value={draft.answer}
            onChange={(e) => setDraft((d) => ({ ...d, answer: e.target.value }))}
            placeholder="Javob matni..."
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>Bekor qilish</Button>
            <Button size="sm" loading={saving} onClick={saveNew}>Qo'shish</Button>
          </div>
        </motion.div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5">
        {loading ? (
          <TableSkeleton />
        ) : items.length === 0 ? (
          <EmptyState message="Hozircha savol-javoblar yo'q" icon={HelpCircle} />
        ) : (
          <Reorder.Group axis="y" values={items} onReorder={onReorder}>
            {items.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                editing={editingId === item.id}
                draft={draft}
                setDraft={setDraft}
                onStartEdit={() => startEdit(item)}
                onCancelEdit={() => setEditingId(null)}
                onSave={saveEdit}
                onDelete={() => setDeleting(item)}
                saving={saving}
              />
            ))}
          </Reorder.Group>
        )}
      </div>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        description={deleting ? `"${deleting.question}" savoli o'chiriladi.` : ""}
      />
    </div>
  );
}
