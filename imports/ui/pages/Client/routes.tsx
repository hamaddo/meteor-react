import React from 'react';

import { ClientsList } from './index';

export const routes = {
  list: '/clients',
};

export const clientRoutes = [
  {
    path: routes.list,
    element: <ClientsList />,
  },
];
