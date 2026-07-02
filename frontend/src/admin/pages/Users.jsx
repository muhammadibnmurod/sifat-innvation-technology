import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Users as UsersIcon, ShieldCheck } from "lucide-react";
import api from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Modal from "../components/ui/Modal.jsx";
import Badge from "../components/ui/Badge.jsx";
import ConfirmDialog from "../components/ui/ConfirmDialog.jsx";
import Table, { EmptyState } from "../components/ui/Table.jsx";
import { useToast } from "../components/ui/Toast.jsx";

const SECTIONS = [
  { key: "services", label: "Xizmatlar" },
  { key: "news", label: "Yangiliklar" },
  { key: "partners", label: "Hamkorlar" },
  { key: "faq", label: "FAQ" },
  { key: "messages", label: "Xabarlar" },
  { key: "settings", label: "Sozlamalar" },
];

const emptyDraft = { name: "", email: "", password: "", role: "user", permissions: [] };

function PermissionPicker({ value, onChange, disabled }) {
  const toggle = (key) =>
    onChange(value.includes(key) ? value.filter((k) => k !== key) : [...value, key]);

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
        Bo'limlarga ruxsat
      </p>
      {disabled ? (
        <p className="rounded-xl bg-brand-50 px-4 py-3 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
          Admin barcha bo'limlarga to'liq ruxsatga ega
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SECTIONS.map((s) => {
            const active = value.includes(s.key);
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => toggle(s.key)}
                className={`rounded-xl px-3 py-2.5 text-xs font-semibold ring-1 transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700 ring-brand-300"
                    : "bg-white text-neutral-500 ring-neutral-200 hover:ring-brand-200"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Users() {
  const toast = useToast();
  const { user: currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = yangi user
  const [draft, setDraft] = useState(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/api/users")
      .then(setItems)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setModalOpen(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setDraft({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role,
      permissions: u.permissions || [],
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!draft.name.trim() || !draft.email.trim()) {
      toast.error("Ism va email to'ldirilishi shart");
      return;
    }
    if (!editing && draft.password.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lsin");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        const body = {
          name: draft.name,
          email: draft.email,
          role: draft.role,
          permissions: draft.role === "admin" ? [] : draft.permissions,
        };
        if (draft.password) body.password = draft.password;
        const updated = await api.put(`/api/users/${editing.id}`, body);
        setItems((arr) => arr.map((x) => (x.id === updated.id ? updated : x)));
        toast.success("Foydalanuvchi yangilandi");
      } else {
        const created = await api.post("/api/users", {
          ...draft,
          permissions: draft.role === "admin" ? [] : draft.permissions,
        });
        setItems((arr) => [...arr, created]);
        toast.success("Foydalanuvchi qo'shildi");
      }
      setModalOpen(false);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/api/users/${deleting.id}`);
      setItems((arr) => arr.filter((x) => x.id !== deleting.id));
      toast.success("Foydalanuvchi o'chirildi");
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
      label: "Foydalanuvchi",
      render: (u) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-violet text-xs font-extrabold text-white">
            {(u.name || "?").charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">
              {u.name}
              {u.id === currentUser?.id && (
                <span className="ml-1.5 text-[11px] font-semibold text-neutral-400">(siz)</span>
              )}
            </p>
            <p className="truncate text-xs text-neutral-400">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Rol",
      render: (u) =>
        u.role === "admin" ? (
          <Badge tone="indigo">
            <ShieldCheck className="h-3 w-3" />
            Admin
          </Badge>
        ) : (
          <Badge tone="gray">User</Badge>
        ),
    },
    {
      key: "permissions",
      label: "Ruxsatlar",
      render: (u) =>
        u.role === "admin" ? (
          <span className="text-xs font-semibold text-brand-600">Barcha bo'limlar</span>
        ) : (u.permissions || []).length === 0 ? (
          <span className="text-xs text-neutral-400">Ruxsat berilmagan</span>
        ) : (
          <div className="flex max-w-xs flex-wrap gap-1">
            {u.permissions.map((p) => (
              <Badge key={p} tone="green">
                {SECTIONS.find((s) => s.key === p)?.label || p}
              </Badge>
            ))}
          </div>
        ),
    },
    {
      key: "actions",
      label: "",
      className: "w-24 text-right",
      render: (u) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => openEdit(u)}
            aria-label="Tahrirlash"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-brand-50 hover:text-brand-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          {u.id !== currentUser?.id && (
            <button
              type="button"
              onClick={() => setDeleting(u)}
              aria-label="O'chirish"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          Jami: <span className="font-bold text-ink">{items.length}</span> ta foydalanuvchi
        </p>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          Foydalanuvchi qo'shish
        </Button>
      </div>

      <Table
        columns={columns}
        rows={items}
        loading={loading}
        empty={<EmptyState message="Hozircha foydalanuvchilar yo'q" icon={UsersIcon} />}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Foydalanuvchini tahrirlash" : "Yangi foydalanuvchi"}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button loading={saving} onClick={save}>
              {editing ? "Saqlash" : "Qo'shish"}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Ism"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            placeholder="Foydalanuvchi ismi"
          />
          <Input
            label="Email"
            type="email"
            value={draft.email}
            onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
            placeholder="email@misol.uz"
          />
          <Input
            label={editing ? "Yangi parol (bo'sh qoldirsangiz o'zgarmaydi)" : "Parol"}
            type="password"
            value={draft.password}
            onChange={(e) => setDraft((d) => ({ ...d, password: e.target.value }))}
            placeholder="Kamida 6 ta belgi"
          />

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">Rol</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "user", label: "User", desc: "Faqat tanlangan bo'limlar" },
                { key: "admin", label: "Admin", desc: "To'liq boshqaruv" },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setDraft((d) => ({ ...d, role: r.key }))}
                  disabled={editing && editing.id === currentUser?.id}
                  className={`rounded-xl px-3 py-2.5 text-left ring-1 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    draft.role === r.key
                      ? "bg-brand-50 ring-brand-300"
                      : "bg-white ring-neutral-200 hover:ring-brand-200"
                  }`}
                >
                  <span className="block text-sm font-bold text-ink">{r.label}</span>
                  <span className="block text-[11px] text-neutral-400">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <PermissionPicker
            value={draft.permissions}
            onChange={(permissions) => setDraft((d) => ({ ...d, permissions }))}
            disabled={draft.role === "admin"}
          />
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        description={deleting ? `"${deleting.name}" (${deleting.email}) o'chiriladi.` : ""}
      />
    </div>
  );
}
