import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { useMeteorCall } from '../shared/hooks/useMeteorCall';
import { Loader } from '../shared/ui/Loader';
export const RoleRoute: FC<{ roles: string[] }> = ({ roles = [] }) => {
  const { data, error, isLoading } = useMeteorCall<string[]>('user.getUserRoles');
  if (isLoading || !data) {
    return <Loader />;
  }

  if (error || !roles.some((role) => !!data.find((userRole) => userRole === role))) {
    return <div>У вас нету прав</div>;
  }

  return <Outlet />;
};
