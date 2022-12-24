import React from 'react';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { ItemsList } from '/imports/ui/widgets/ItemsList';

import { EmployerModal } from '../../components/EmployerModal';

import { useLocalModel } from './model';
export const EmployersList = () => {
  const {
    isLoading,
    mappedList,
    onEdit,
    onDelete,
    toggleEditVisible,
    toggleCreateVisible,
    onItemClick,
    createVisible,
    editVisible,
    onSubmitCreate,
    onSubmitEdit,
    currentEmployer,
  } = useLocalModel();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ItemsList
        data={mappedList ?? []}
        title={'Работодатели'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
        onItemClick={onItemClick}
      />
      <EmployerModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate} />
      <EmployerModal
        visible={editVisible}
        onClose={toggleEditVisible}
        onSubmit={onSubmitEdit}
        employer={currentEmployer}
        submitText={'Сохранить'}
      />
    </>
  );
};
