import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';

import { clientRoutes } from '/imports/ui/pages/Client/routes';
import { usersRoutes } from '/imports/ui/pages/Users/routes';

export const App = () => {
  return useRoutes([
    {
      element: <ProtectedRoute />,
      children: [...clientRoutes, ...usersRoutes],
    },
    {
      element: <PublicRoute />,
      children: [{ path: '/login', element: <LoginForm /> }],
    },
    {
      element: <Navigate to={'/clients'} />,
      path: '*',
    },
  ]);
};
