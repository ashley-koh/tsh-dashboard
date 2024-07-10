import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/context/auth/useAuth";

const PrivateRoute: React.FC = () => {
  const auth = useAuth();
  if (!("token" in auth)) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
