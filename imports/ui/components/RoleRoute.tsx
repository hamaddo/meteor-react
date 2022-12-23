import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { useMeteorCall } from '../shared/hooks/useMeteorCall';
import { Loader } from '../shared/ui/Loader';
import { Navbar } from '../widgets/Navbar';

import { theme } from '/imports/ui/shared/ui/theme';
export const RoleRoute: FC<{ roles: string[] }> = ({ roles = [] }) => {
  const { data, error, isLoading } = useMeteorCall<string>('user.getUserRole');
  if (isLoading || !data) {
    return <Loader />;
  }

  if (error || !roles.includes(data)) {
    return <div>403</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Outlet />
      </Navbar>
    </ThemeProvider>
  );
};
