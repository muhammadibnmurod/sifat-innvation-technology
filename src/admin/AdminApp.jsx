import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
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
            <Route path="services" element={<Services />} />
            <Route path="news" element={<News />} />
            <Route path="partners" element={<Partners />} />
            <Route path="faq" element={<Faq />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
