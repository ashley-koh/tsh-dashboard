import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '../common/Loading';
import { DepartmentOptions, RoleOptions } from '@/types/user.type';
import useAuth from '@/context/auth/useAuth';

interface RuleBasedRouteProps {
  departments?: DepartmentOptions[];
  roles?: RoleOptions[];
}

const RuleBasedRoute: React.FC<RuleBasedRouteProps> = ({ departments, roles }) => {
  const { loading, user } = useAuth();

  /*useEffect(() => {
    console.log('RoleBasedRoute: ', user);
  }, [user]);*/

  if (loading) {
    return <Loading />;
  }
  else if (user === null) {
    return <Navigate to='/login' />;
  }
  else if (
    (roles && !roles.includes(user.role)) &&
    (departments && !departments.includes(user.dept))
  ) {
    return <Navigate to="/" />
  }
  return <Outlet />;
};

export default RuleBasedRoute;
