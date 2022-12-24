import { ClientFields } from '/imports/ui/components/ClientsModal/ClientForm';

import { Meteor } from 'meteor/meteor';

import { ClientMethods } from '/imports/api/clients/clientMethods';

import { generatePath, useNavigate } from 'react-router-dom';

import { routes } from '/imports/ui/pages/Client/routes';
import { useMeteorMethod } from '/imports/ui/shared/hooks/useMeteorMethod';
import { Client } from '/imports/api/clients';
import { useToggle } from '/imports/ui/shared/hooks/useToggle';

import { useState } from 'react';

export const useLocalModel = () => {
  const { data: clients, isLoading, request } = useMeteorMethod<Client[]>(ClientMethods.Get);
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentClient, setCurrentClient] = useState<Client>();
  const navigate = useNavigate();

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

  const mappedList = clients?.map(({ name, middleName, surname, receiptNumber, _id }) => ({
    info: `${name} ${middleName} ${surname} ${surname} - ${receiptNumber}`,
    id: _id,
  }));

  return {
    clients,
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
  };
};
