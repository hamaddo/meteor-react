import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Navbar } from '../widgets/Navbar';

export const ProtectedRoute: React.FC = () => {
  const user = useTracker(() => Meteor.user());

  const theme = createTheme({
    palette: {
      primary: {
        main: '#a05f5f',
      },
      secondary: {
        main: '#79cfcf',
      },
    },
  });

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
