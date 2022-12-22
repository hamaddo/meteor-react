import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';

import { routes } from './routes';

import { ItemsList } from '/imports/ui/widgets/ItemsList';

type UserType = { username: string; _id: string };

export const UsersList = () => {
  const { data: clients, isLoading, request } = useMeteorCall<UserType[]>('user.get');

  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  const onCreate = () => {
    navigate(routes.list);
  };

  const onEdit = (id: string) => {
    Meteor.call('users.remove', id);
    request();
  };

  const onDelete = (id: string) => {
    Meteor.call('users.remove', id);
    request();
  };

  const mappedList = clients?.map(({ username, _id }) => ({
    info: `${username}`,
    id: _id,
  }));

  return (
    <div>
      <ItemsList data={mappedList ?? []} title={'Пользователи'} onDeleteItem={onDelete} onCreate={onCreate} />
    </div>
  );
};
