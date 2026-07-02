import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { getToken } from "../lib/api.js";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, checking } = useAuth();
  const location = useLocation();

  if (checking && getToken()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
