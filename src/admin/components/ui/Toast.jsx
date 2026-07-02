/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (type, message) => {
      const id = ++idRef.current;
      setToasts((t) => [...t, { id, type, message }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const toast = {
    success: (msg) => push("success", msg),
    error: (msg) => push("error", msg),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 48, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 48, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-black/5 bg-white p-4 shadow-lift"
            >
              {t.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 flex-none text-emerald-500" />
              ) : (
                <XCircle className="h-5 w-5 flex-none text-red-500" />
              )}
              <p className="flex-1 text-sm font-medium text-ink">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Yopish"
                className="text-neutral-400 transition-colors hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
