import React, { useState } from 'react';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { Client } from '/imports/api/clients';
import { ClientModal } from '/imports/ui/components/ClientsModal';
import { ClientFields } from '/imports/ui/components/ClientsModal/ClientForm';

export const ClientsList = () => {
  const { data: clients, isLoading, request } = useMeteorCall<Client[]>('clients.get');
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client>();

  if (isLoading) {
    return <Loader />;
  }

  const mappedList = clients?.map(({ name, middleName, surname, receiptNumber, _id }) => ({
    info: `${name} ${middleName} ${surname} ${surname} - ${receiptNumber}`,
    id: _id,
  }));
  const toggleCreateVisible = () => {
    setCreateVisible((prev) => !prev);
  };

  const toggleEditVisible = () => {
    setEditVisible((prev) => !prev);
  };
  const onSubmitCreate = async (values: ClientFields) => {
    await Meteor.callAsync('clients.insert', { client: values });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: ClientFields) => {
    await Meteor.callAsync('clients.update', { request: { ...values, prevSurname: currentClient?.surname } });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const client = await Meteor.callAsync('clients.getById', { id });
    setCurrentClient(client);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call('clients.remove', { clientId: id });
    await request();
  };

  return (
    <>
      <ItemsList
        data={mappedList ?? []}
        title={'Клиенты'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
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
