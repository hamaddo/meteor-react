import React from 'react';

import Box from '@mui/material/Box';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { RequestModal } from '/imports/ui/components/RequestModal';

import { useLocalModel } from './model';

export const ClientView = () => {
  const {
    isLoading,
    isRequestsLoading,
    mappedList,
    client,
    createVisible,
    editVisible,
    currentRequest,
    toggleCreateVisible,
    toggleEditVisible,
    onDelete,
    onEdit,
    onSubmitEdit,
    onSubmitCreate,
  } = useLocalModel();

  if (isLoading || isRequestsLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Запросы клиента {`${client?.surname} ${client?.middleName} ${client?.name} `}</h1>
      <Box borderRadius="8px" border={'1px solid gray'} padding={'10px'} display="flex" flexDirection="column">
        <h2>Информация о клиенте</h2>
        <div>{`ФИО: ${client?.surname} ${client?.middleName} ${client?.name} `}</div>
        <div>{`Адрес: ${client?.address} `}</div>
        <div>{`Гендер: ${client?.gender} `}</div>
        <div>{`Телефон: ${client?.phone} `}</div>
        <div>{`Номер договора: ${client?.receiptNumber} `}</div>
        <div>{`Номер регистрации: ${client?.registryNumber} `}</div>
      </Box>
      <ItemsList
        data={mappedList ?? []}
        title={'Запросы'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
      />
      <RequestModal onClose={toggleCreateVisible} onSubmit={onSubmitCreate} visible={createVisible} />
      <RequestModal
        onClose={toggleEditVisible}
        onSubmit={onSubmitEdit}
        visible={editVisible}
        request={currentRequest}
        submitText={'Сохранить'}
      />
    </>
  );
};
