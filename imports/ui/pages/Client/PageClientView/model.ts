import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useMeteorMethod } from '/imports/ui/shared/hooks/useMeteorMethod';
import { useToggle } from '/imports/ui/shared/hooks/useToggle';

import { Meteor } from 'meteor/meteor';

import { Client } from '/imports/api/clients';
import { ClientMethods } from '/imports/api/clients/clientMethods';
import { TRequest } from '/imports/api/requests';
import { RequestMethods } from '/imports/api/requests/requestMethods';
import { RequestFields } from '/imports/ui/components/RequestModal/RequestForm';

export const useLocalModel = () => {
  const params = useParams<{ id: string }>();
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentRequest, setCurrentRequest] = useState<TRequest>();

  const { data: client, isLoading, request } = useMeteorMethod<Client>(ClientMethods.GetById, { id: params.id });

  const {
    data: requests,
    isLoading: isRequestsLoading,
    request: fetchRequests,
  } = useMeteorMethod<TRequest[]>(RequestMethods.GetByClientId, { id: params.id });

  const mappedList = requests?.map(({ positionName, salary, _id }) => ({
    info: `${positionName} ${salary}`,
    id: _id,
  }));

  const onSubmitCreate = async (values: RequestFields) => {
    await Meteor.callAsync(RequestMethods.Insert, { request: { ...values, clientId: params.id } });
    toggleCreateVisible();
    await fetchRequests();
  };
  const onSubmitEdit = async (values: RequestFields) => {
    await Meteor.callAsync(RequestMethods.Update, { request: { ...values, clientId: params.id } });
    toggleEditVisible();
    await fetchRequests();
  };

  const onEdit = async (id: string) => {
    const request = await Meteor.callAsync(RequestMethods.GetById, { id });
    setCurrentRequest(request);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call(RequestMethods.Remove, { requestId: id });
    await fetchRequests();
  };

  return {
    isLoading,
    isRequestsLoading,
    createVisible,
    editVisible,
    currentRequest,
    mappedList,
    client,
    toggleCreateVisible,
    toggleEditVisible,
    onEdit,
    onSubmitCreate,
    onDelete,
    onSubmitEdit,
  };
};
