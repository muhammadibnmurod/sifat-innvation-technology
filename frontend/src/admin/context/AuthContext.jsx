/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getToken, getStoredUser, storeSession, clearSession, setUnauthorizedHandler } from "../lib/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [checking, setChecking] = useState(!!getToken());
  const navigate = useNavigate();

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    navigate("/admin/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      navigate("/admin/login", { replace: true });
    });
  }, [navigate]);

  // Validate the stored token on mount.
  useEffect(() => {
    if (!getToken()) return;
    api
      .get("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.post("/api/auth/login", { email, password });
    storeSession(data.token, data.user);
    setUser(data.user);
    return data.user;
  }, []);

  // Eski backend (role maydonisiz) bilan moslik: role kelmasa admin deb hisoblaymiz.
  // Haqiqiy himoya baribir backend guardlarida.
  const isAdmin = !user?.role || user.role === "admin";

  // Berilgan bo'limga kirish huquqi bormi? (admin hammasiga ruxsatli)
  const can = useCallback(
    (section) => {
      if (!user) return false;
      if (!user.role || user.role === "admin") return true;
      return Array.isArray(user.permissions) && user.permissions.includes(section);
    },
    [user]
  );

  const value = useMemo(
    () => ({ user, checking, login, logout, isAdmin, can, isAuthenticated: !!user && !!getToken() }),
    [user, checking, login, logout, isAdmin, can]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
