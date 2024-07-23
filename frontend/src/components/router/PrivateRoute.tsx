import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/context/auth/useAuth";
import Loading from "../common/Loading";

const PrivateRoute: React.FC = () => {
  const auth = useAuth();
  if (auth.loading) return <Loading />;
  if (!auth.authenticated) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
