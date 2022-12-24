import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useMeteorMethod } from '/imports/ui/shared/hooks/useMeteorMethod';
import { Employer } from '/imports/api/employers';
import { EmployerMethods } from '/imports/api/employers/employerMethods';
import { Offer } from '/imports/api/offers';
import { OffersMethods } from '/imports/api/offers/offersMethods';
import { useToggle } from '/imports/ui/shared/hooks/useToggle';
import { RequestFields } from '/imports/ui/components/RequestModal/RequestForm';

import { Meteor } from 'meteor/meteor';

export const useLocalModel = () => {
  const params = useParams<{ id: string }>();
  const { data: employer, isLoading, request } = useMeteorMethod<Employer>(EmployerMethods.GetById, { id: params.id });

  const {
    data: offers,
    isLoading: isOffersLoading,
    request: fetchOffers,
  } = useMeteorMethod<Offer[]>(OffersMethods.GetByEmployerId, { id: params.id });

  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  const mappedList = offers?.map(({ positionName, gender, salary, _id }) => ({
    info: `Должность: ${positionName}, зарплата: ${salary}, гендер: ${gender}`,
    id: _id,
  }));

  const onSubmitCreate = async (values: RequestFields) => {
    await Meteor.callAsync(OffersMethods.Insert, { request: { ...values, employerId: params.id } });
    toggleCreateVisible();
    await fetchOffers();
  };
  const onSubmitEdit = async (values: RequestFields) => {
    await Meteor.callAsync(OffersMethods.Update, { request: { ...values, employerId: params.id } });
    toggleEditVisible();
    await fetchOffers();
  };

  const onEdit = async (id: string) => {
    const request = await Meteor.callAsync(OffersMethods.GetById, { id });
    setCurrentOffer(request);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call(OffersMethods.Remove, { requestId: id });
    await fetchOffers();
  };

  return {
    employer,
    mappedList,
    createVisible,
    editVisible,
    currentOffer,
    isLoading,
    isOffersLoading,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
  };
};
