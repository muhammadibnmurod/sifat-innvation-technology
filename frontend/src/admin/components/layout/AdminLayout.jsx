/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Wrench, Newspaper, Handshake, HelpCircle, Inbox,
  Settings, LogOut, ChevronsLeft, Menu, X, ExternalLink, ChevronDown,
  ChevronRight, User,
} from "lucide-react";
import Logo from "../../../assets/Logo.png";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../lib/api.js";

export const NAV_ITEMS = [
  { to: "/admin", label: "Boshqaruv paneli", icon: LayoutDashboard, end: true },
  { to: "/admin/services", label: "Xizmatlar", icon: Wrench },
  { to: "/admin/news", label: "Yangiliklar", icon: Newspaper },
  { to: "/admin/partners", label: "Hamkorlar", icon: Handshake },
  { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { to: "/admin/messages", label: "Xabarlar", icon: Inbox },
  { to: "/admin/settings", label: "Sozlamalar", icon: Settings },
];

function SidebarContent({ collapsed, unread, onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? "justify-center" : ""}`}>
        <img src={Logo} alt="Logo" className="h-10 w-10 flex-none rounded-xl object-contain" />
        {!collapsed && (
          <span className="text-sm font-extrabold leading-tight text-ink">
            Sifat Innovatsion
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-600">
              Admin panel
            </span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} onClick={onNavigate} title={collapsed ? label : undefined}>
                {({ isActive }) => (
                  <span
                    className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "text-brand-700"
                        : "text-ink-soft hover:bg-neutral-100 hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="admin-nav-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-brand-50 ring-1 ring-brand-100"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="admin-nav-indicator"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-brand-600 to-accent-violet"
                      />
                    )}
                    <Icon className="relative z-10 h-[18px] w-[18px] flex-none" />
                    {!collapsed && <span className="relative z-10 flex-1">{label}</span>}
                    {to === "/admin/messages" && unread > 0 && (
                      <span
                        className={`relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 px-1.5 text-[10px] font-bold text-white ${
                          collapsed ? "absolute -right-1 -top-1" : ""
                        }`}
                      >
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-neutral-100 p-3">
        <button
          type="button"
          onClick={onLogout}
          title={collapsed ? "Chiqish" : undefined}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-[18px] w-[18px] flex-none" />
          {!collapsed && "Chiqish"}
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const menuRef = useRef(null);

  const current = NAV_ITEMS.find((n) =>
    n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)
  );
  const pageTitle = current?.label || "Boshqaruv paneli";

  // Unread messages badge — refresh on route change + every 60s.
  useEffect(() => {
    let alive = true;
    const load = () =>
      api
        .get("/api/messages/unread-count")
        .then((d) => alive && setUnread(d.count))
        .catch(() => {});
    load();
    const t = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [location.pathname]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body text-ink-soft">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-neutral-100 bg-white transition-[width] duration-300 lg:block ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        <SidebarContent collapsed={collapsed} unread={unread} onLogout={logout} />
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Panelni kengaytirish" : "Panelni yig'ish"}
          className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400 shadow-soft transition-colors hover:text-brand-600"
        >
          <ChevronsLeft
            className={`h-3.5 w-3.5 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lift lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Yopish"
                className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent
                collapsed={false}
                unread={unread}
                onNavigate={() => setMobileOpen(false)}
                onLogout={logout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className={`transition-[padding] duration-300 ${collapsed ? "lg:pl-[76px]" : "lg:pl-64"}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-neutral-100 bg-white/80 backdrop-blur-lg">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Menyu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-ink lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
                  <span>Admin</span>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-brand-600">{pageTitle}</span>
                </div>
                <h1 className="text-lg font-extrabold leading-tight text-ink">{pageTitle}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700 sm:flex"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Saytni ko'rish
              </a>

              {/* Avatar dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-brand-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-violet text-xs font-extrabold text-white">
                    {(user?.name || "A").charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden text-xs font-semibold text-ink sm:block">
                    {user?.name || "Admin"}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1.5 shadow-lift"
                    >
                      <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5">
                        <User className="h-4 w-4 text-brand-600" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-ink">{user?.name}</p>
                          <p className="truncate text-[11px] text-neutral-400">{user?.email}</p>
                        </div>
                      </div>
                      <div className="my-1 h-px bg-neutral-100" />
                      <button
                        type="button"
                        onClick={logout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Chiqish
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet context={{ refreshUnread: () => {} }} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
