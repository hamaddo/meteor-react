import React, { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorMethod } from '/imports/ui/shared/hooks/useMeteorMethod';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { Client } from '/imports/api/clients';
import { ClientModal } from '/imports/ui/components/ClientsModal';
import { ClientFields } from '/imports/ui/components/ClientsModal/ClientForm';

import { useToggle } from '../../shared/hooks/useToggle';

import { routes } from './routes';

import { ClientMethods } from '/imports/api/clients/clientMethods';

export const ClientsList = () => {
  const { data: clients, isLoading, request } = useMeteorMethod<Client[]>(ClientMethods.Get);
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentClient, setCurrentClient] = useState<Client>();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const mappedList = clients?.map(({ name, middleName, surname, receiptNumber, _id }) => ({
    info: `${name} ${middleName} ${surname} ${surname} - ${receiptNumber}`,
    id: _id,
  }));
  const onSubmitCreate = async (values: ClientFields) => {
    await Meteor.callAsync(ClientMethods.Insert, { client: values });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: ClientFields) => {
    await Meteor.callAsync(ClientMethods.Update, {
      request: { ...values, prevRegistryNumber: currentClient?.registryNumber },
    });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const client = await Meteor.callAsync(ClientMethods.GetById, { id });
    setCurrentClient(client);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call(ClientMethods.Remove, { clientId: id });
    await request();
  };

  const onItemClick = (id: string) => {
    navigate(generatePath(routes.view, { id }));
  };

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
