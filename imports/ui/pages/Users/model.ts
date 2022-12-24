import { useMeteorMethod } from '/imports/ui/shared/hooks/useMeteorMethod';
import { UserType } from '/imports/api/user';
import { UserMethods } from '/imports/api/user/userMethods';
import { useToggle } from '/imports/ui/shared/hooks/useToggle';

import { useState } from 'react';

import { UserFields } from '/imports/ui/components/UserModal/UserForm';

import { Meteor } from 'meteor/meteor';

export const useLocalModel = () => {
  const { data: clients, isLoading, request } = useMeteorMethod<UserType[]>(UserMethods.Get);
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentUser, setCurrentUser] = useState<UserType>();

  const onSubmitCreate = async (values: UserFields) => {
    await Meteor.callAsync(UserMethods.Insert, { ...values, role: values.role.value });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: UserFields) => {
    await Meteor.callAsync(UserMethods.Update, {
      userId: currentUser?._id,
      username: values.username,
      role: values.role.value,
    });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const user = await Meteor.callAsync(UserMethods.GetById, { id });
    setCurrentUser(user);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call(UserMethods.Remove, { userId: id });
    await request();
  };

  const mappedList = clients?.map(({ username, _id }) => ({
    info: `${username}`,
    id: _id,
  }));

  return {
    mappedList,
    isLoading,
    createVisible,
    editVisible,
    currentUser,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
  };
};
