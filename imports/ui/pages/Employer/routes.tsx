import React from 'react';

import { ClientView } from './PageEmployerView';

import { EmployersList } from './index';

export const routes = {
  list: '/employers',
  view: '/employers/view/:id',
};

export const employersRoutes = [
  {
    path: routes.list,
    element: <EmployersList />,
  },
  {
    path: routes.view,
    element: <ClientView />,
  },
];
