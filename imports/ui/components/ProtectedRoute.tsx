import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { theme } from '../shared/ui/theme';
import { Navbar } from '../widgets/Navbar';

export const ProtectedRoute: React.FC = () => {
  const user = useTracker(() => Meteor.user());

  if (user === null) {
    return <Navigate replace to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar>
        <Outlet />
      </Navbar>
    </ThemeProvider>
  );
};
