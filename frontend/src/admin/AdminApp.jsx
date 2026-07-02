import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ToastProvider } from "./components/ui/Toast.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Services from "./pages/Services.jsx";
import News from "./pages/News.jsx";
import Partners from "./pages/Partners.jsx";
import Faq from "./pages/Faq.jsx";
import Messages from "./pages/Messages.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./pages/Users.jsx";

// Bo'limga ruxsati bo'lmagan user boshqaruv paneliga qaytariladi.
function PermissionRoute({ perm, children }) {
  const { can } = useAuth();
  if (!can(perm)) return <Navigate to="/admin" replace />;
  return children;
}

// Faqat admin kira oladigan sahifalar uchun.
function AdminRoute({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin" replace />;
  return children;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="services" element={<PermissionRoute perm="services"><Services /></PermissionRoute>} />
            <Route path="news" element={<PermissionRoute perm="news"><News /></PermissionRoute>} />
            <Route path="partners" element={<PermissionRoute perm="partners"><Partners /></PermissionRoute>} />
            <Route path="faq" element={<PermissionRoute perm="faq"><Faq /></PermissionRoute>} />
            <Route path="messages" element={<PermissionRoute perm="messages"><Messages /></PermissionRoute>} />
            <Route path="settings" element={<PermissionRoute perm="settings"><Settings /></PermissionRoute>} />
            <Route path="users" element={<AdminRoute><Users /></AdminRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
