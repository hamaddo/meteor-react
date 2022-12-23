import React, { useState } from 'react';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { UserModal } from '/imports/ui/components/UserModal';
import { UserFields } from '/imports/ui/components/UserModal/UserForm';
import { UserType } from '/imports/api/user';

export const UsersList = () => {
  const { data: clients, isLoading, request } = useMeteorCall<UserType[]>('user.get');
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();

  if (isLoading) {
    return <Loader />;
  }

  const mappedList = clients?.map(({ username, _id }) => ({
    info: `${username}`,
    id: _id,
  }));
  const toggleCreateVisible = () => {
    setCreateVisible((prev) => !prev);
  };

  const toggleEditVisible = () => {
    setEditVisible((prev) => !prev);
  };
  const onSubmitCreate = async (values: UserFields) => {
    await Meteor.callAsync('user.insert', { ...values, role: values.role.value });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: UserFields) => {
    await Meteor.callAsync('user.update', {
      userId: currentUser?._id,
      username: values.username,
      role: values.role.value,
    });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const user = await Meteor.callAsync('user.getById', { id });
    setCurrentUser(user);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call('user.remove', { userId: id });
    await request();
  };

  return (
    <div>
      <ItemsList
        data={mappedList ?? []}
        title={'Пользователи'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
      />
      <UserModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate} />
      <UserModal
        onClose={toggleEditVisible}
        visible={editVisible}
        user={currentUser}
        onSubmit={onSubmitEdit}
        submitText={'Редактировать'}
      />
    </div>
  );
};
