import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { RequestFields } from '/imports/ui/components/RequestModal/RequestForm';
import { Employer } from '/imports/api/employers';
import { Offer } from '/imports/api/offers';
import { OfferModal } from '/imports/ui/components/OffersModal';

export const ClientView = () => {
  const params = useParams<{ id: string }>();
  const { data: employer, isLoading, request } = useMeteorCall<Employer>('employers.getById', { id: params.id });

  const {
    data: offers,
    isLoading: isOffers,
    request: fetchOffers,
  } = useMeteorCall<Offer[]>('offers.getByEmployerId', { id: params.id });

  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  if (isLoading || isOffers) {
    return <Loader />;
  }

  const mappedList = offers?.map(({ positionName, gender, salary, _id }) => ({
    info: `Должность: ${positionName}, зарплата: ${salary}, гендер: ${gender}`,
    id: _id,
  }));
  const toggleCreateVisible = () => {
    setCreateVisible((prev) => !prev);
  };

  const toggleEditVisible = () => {
    setEditVisible((prev) => !prev);
  };
  const onSubmitCreate = async (values: RequestFields) => {
    await Meteor.callAsync('offers.insert', { request: { ...values, employerId: params.id } });
    toggleCreateVisible();
    await fetchOffers();
  };
  const onSubmitEdit = async (values: RequestFields) => {
    await Meteor.callAsync('offers.update', { request: { ...values, employerId: params.id } });
    toggleEditVisible();
    await fetchOffers();
  };

  const onEdit = async (id: string) => {
    const request = await Meteor.callAsync('offers.getById', { id });
    setCurrentOffer(request);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call('offers.remove', { requestId: id });
    await fetchOffers();
  };

  return (
    <>
      <h1>Предложения работодателя {`${employer?.name} `}</h1>
      <Box borderRadius="8px" border={'1px solid gray'} padding={'10px'} display="flex" flexDirection="column">
        <h2>Информация о работодателя</h2>
        <div>{`Тип собственности: ${employer?.ownershipType} `}</div>
        <div>{`Адрес: ${employer?.address} `}</div>
        <div>{`Телефон: ${employer?.phone} `}</div>
        <div>{`Номер регистрации: ${employer?.registryNumber} `}</div>
      </Box>
      <ItemsList
        data={mappedList ?? []}
        title={'Предложения'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
      />
      <OfferModal onClose={toggleCreateVisible} onSubmit={onSubmitCreate} visible={createVisible} />
      <OfferModal
        onClose={toggleEditVisible}
        onSubmit={onSubmitEdit}
        visible={editVisible}
        offer={currentOffer}
        submitText={'Сохранить'}
      />
    </>
  );
};
