import React from 'react';

import { ClientView } from './PageClientView';

import { ClientsList } from './index';

export const routes = {
  list: '/clients',
  view: '/clients/view/:id',
};

export const clientRoutes = [
  {
    path: routes.list,
    element: <ClientsList />,
  },
  {
    path: routes.view,
    element: <ClientView />,
  },
];
