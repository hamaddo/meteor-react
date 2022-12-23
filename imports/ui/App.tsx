import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';

import { clientRoutes } from '/imports/ui/pages/Client/routes';
import { usersRoutes } from '/imports/ui/pages/Users/routes';
import { RoleRoute } from '/imports/ui/components/RoleRoute';
import { RolesEnum } from '/imports/api/user';

export const App = () => {
  return useRoutes([
    {
      element: <ProtectedRoute />,
      children: [...clientRoutes],
    },
    {
      element: <PublicRoute />,
      children: [{ path: '/login', element: <LoginForm /> }],
    },
    {
      element: <RoleRoute roles={[RolesEnum.ADMIN]} />,
      children: [...usersRoutes],
    },
    {
      element: <Navigate to={'/clients'} />,
      path: '*',
    },
  ]);
};
