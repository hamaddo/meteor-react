import React from 'react';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { ClientModal } from '/imports/ui/components/ClientsModal';

import { useLocalModel } from './model';

export const ClientsList = () => {
  const {
    createVisible,
    isLoading,
    editVisible,
    mappedList,
    currentClient,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
    onItemClick,
  } = useLocalModel();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ItemsList
        data={mappedList ?? []}
        title={'Клиенты'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
        onItemClick={onItemClick}
      />
      <ClientModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate} />
      <ClientModal
        visible={editVisible}
        onClose={toggleEditVisible}
        onSubmit={onSubmitEdit}
        client={currentClient}
        submitText={'Сохранить'}
      />
    </>
  );
};
