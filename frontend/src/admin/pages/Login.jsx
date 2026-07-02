import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Logo from "../../assets/Logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import Button from "../components/ui/Button.jsx";
import { useLanguage } from "../i18n.jsx";

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password) {
      setError(t("Username va parolni kiriting"));
      setShake((s) => s + 1);
      return;
    }
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
      setShake((s) => s + 1);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-neutral-200 bg-white/80 py-3 pl-11 pr-11 text-sm text-ink outline-none transition-all placeholder:text-neutral-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4">
      {/* animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 bg-dots" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob animate-drift absolute -left-24 -top-24 h-[32rem] w-[32rem] bg-gradient-to-br from-brand-300 to-brand-500" />
        <div className="blob animate-drift-slow absolute -right-28 top-16 h-[30rem] w-[30rem] bg-gradient-to-br from-accent-violet/60 to-accent-cyan/60" />
        <div className="blob animate-drift absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] bg-gradient-to-br from-secondary-400/50 to-secondary-500/40" />
      </div>

      <motion.div
        key={shake}
        initial={{ opacity: 0, y: 24 }}
        animate={
          shake > 0
            ? { opacity: 1, y: 0, x: [0, -10, 10, -8, 8, -4, 4, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={
          shake > 0
            ? { x: { duration: 0.45 }, opacity: { duration: 0.2 } }
            : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
        }
        className="relative w-full max-w-md rounded-[var(--radius-xl2)] glass-strong p-8 shadow-lift sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <img src={Logo} alt="Sifat Innovatsion Texnologiya" className="h-16 w-16 rounded-2xl object-contain" />
          <h1 className="mt-4 text-2xl font-extrabold text-ink">{t("Admin panel")}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {t("Admin panel login subtitle")}
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-4">
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              className={inputCls}
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Parol")}
              autoComplete="current-password"
              className={inputCls}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? t("Parolni yashirish") : t("Parolni ko'rsatish")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-ink"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-50 px-4 py-2.5 text-center text-xs font-semibold text-red-600 ring-1 ring-red-100"
            >
              {error}
            </motion.p>
          )}

          <Button type="submit" size="lg" loading={loading} className="mt-1 w-full">
            {!loading && <LogIn className="h-4 w-4" />}
            {t("Kirish")}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} Sifat Innovatsion Texnologiya
        </p>
      </motion.div>
    </div>
  );
}
