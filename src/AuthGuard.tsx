import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "./routes/main-route";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = true; // !!localStorage.getItem("authToken"); // Replace with your auth logic

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.ADMIN_LOGIN);
    }
  }, [isAuthenticated, history]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
