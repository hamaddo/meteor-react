import React from 'react';

import { UsersList } from './index';

export const routes = {
  list: '/users',
};

export const usersRoutes = [
  {
    path: routes.list,
    element: <UsersList />,
  },
];
