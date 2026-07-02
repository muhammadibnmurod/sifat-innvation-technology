import { AlertTriangle } from "lucide-react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "O'chirishni tasdiqlaysizmi?",
  description = "Bu amalni ortga qaytarib bo'lmaydi.",
  confirmLabel = "O'chirish",
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <p className="pt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
      </div>
    </Modal>
  );
}
