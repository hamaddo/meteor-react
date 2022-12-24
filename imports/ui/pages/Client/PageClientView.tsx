import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { Client } from '/imports/api/clients';
import { TRequest } from '/imports/api/requests';
import { RequestModal } from '/imports/ui/components/RequestModal';
import { RequestFields } from '/imports/ui/components/RequestModal/RequestForm';

export const ClientView = () => {
  const params = useParams<{ id: string }>();
  const { data: client, isLoading, request } = useMeteorCall<Client>('clients.getById', { id: params.id });

  const {
    data: requests,
    isLoading: isRequestsLoading,
    request: fetchRequests,
  } = useMeteorCall<TRequest[]>('requests.getByClientId', { id: params.id });

  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<TRequest>();

  if (isLoading || isRequestsLoading) {
    return <Loader />;
  }

  console.log('requests', requests);
  const mappedList = requests?.map(({ positionName, salary, _id }) => ({
    info: `${positionName} ${salary}`,
    id: _id,
  }));
  const toggleCreateVisible = () => {
    setCreateVisible((prev) => !prev);
  };

  const toggleEditVisible = () => {
    setEditVisible((prev) => !prev);
  };
  const onSubmitCreate = async (values: RequestFields) => {
    await Meteor.callAsync('requests.insert', { request: { ...values, clientId: params.id } });
    toggleCreateVisible();
    await fetchRequests();
  };
  const onSubmitEdit = async (values: RequestFields) => {
    await Meteor.callAsync('requests.update', { request: { ...values, clientId: params.id } });
    toggleEditVisible();
    await fetchRequests();
  };

  const onEdit = async (id: string) => {
    const request = await Meteor.callAsync('requests.getById', { id });
    setCurrentRequest(request);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call('requests.remove', { requestId: id });
    await fetchRequests();
  };

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
