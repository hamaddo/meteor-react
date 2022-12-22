import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const PublicRoute: React.FC = () => {
  const user = useTracker(() => Meteor.user());

  if (user !== null) {
    return <Navigate replace to="/clients" />;
  }

  return <Outlet />;
};
