import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/context/auth/useAuth';

interface RoleBasedRouteProps {
  roles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ roles }) => {
  const auth = useAuth();
  const cur_user = auth.user;

  useEffect(() => {
    console.log('RoleBasedRoute: cur_user', cur_user);
  }, [cur_user]);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!cur_user || !roles.includes(cur_user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
