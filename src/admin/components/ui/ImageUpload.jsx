import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import api from "../../lib/api.js";
import { useToast } from "./Toast.jsx";

// Drag-drop image upload with preview. `value` is the uploaded URL.
export default function ImageUpload({ value, onChange, label, className = "" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Faqat rasm fayllari qabul qilinadi");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Rasm hajmi 5MB dan oshmasligi kerak");
      return;
    }
    setUploading(true);
    try {
      const { url } = await api.upload(file);
      onChange(url);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>}
      {value ? (
        <div className="group relative overflow-hidden rounded-xl border border-neutral-200">
          <img src={value} alt="" className="h-40 w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:bg-neutral-100"
            >
              Almashtirish
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Rasmni o'chirish"
              className="rounded-lg bg-red-500 p-1.5 text-white hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors ${
            dragging
              ? "border-brand-400 bg-brand-50"
              : "border-neutral-200 bg-neutral-50/60 hover:border-brand-300 hover:bg-brand-50/40"
          }`}
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-500 shadow-soft">
                <ImagePlus className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-neutral-500">
                Rasmni tashlang yoki <span className="text-brand-600">tanlang</span>
              </span>
              <span className="text-[10px] text-neutral-400">PNG, JPG, WEBP — 5MB gacha</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
