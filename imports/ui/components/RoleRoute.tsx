import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';

import { useMeteorMethod } from '../shared/hooks/useMeteorMethod';
import { Loader } from '../shared/ui/Loader';
import { Navbar } from '../widgets/Navbar';

import { theme } from '/imports/ui/shared/ui/theme';
import { UserMethods } from '/imports/api/user/userMethods';
export const RoleRoute: FC<{ roles: string[] }> = ({ roles = [] }) => {
  const { data, error, isLoading } = useMeteorMethod<string>(UserMethods.GetUserRole);
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
