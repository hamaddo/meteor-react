import React from 'react';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { UserModal } from '/imports/ui/components/UserModal';

import { useLocalModel } from './model';

export const UsersList = () => {
  const {
    mappedList,
    isLoading,
    createVisible,
    editVisible,
    currentUser,
    toggleEditVisible,
    toggleCreateVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
  } = useLocalModel();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
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
        submitText={'Сохранить'}
      />
    </>
  );
};
