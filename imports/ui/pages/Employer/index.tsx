import React, { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { EmployerFields } from '/imports/ui/components/EmployerModal/EmployerForm';

import { EmployerModal } from '../../components/EmployerModal';

import { routes } from './routes';

import { Employer } from '/imports/api/employers';

export const EmployersList = () => {
  const { data: employers, isLoading, request } = useMeteorCall<Employer[]>('employers.get');
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [currentEmployer, setCurrentEmployer] = useState<Employer>();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const mappedList = employers?.map(({ name, address, ownershipType, phone, registryNumber, _id }) => ({
    info: `[${ownershipType}] Название: ${name}, Адрес: ${address}, Телефон: ${phone} - ${registryNumber}`,
    id: _id,
  }));
  const toggleCreateVisible = () => {
    setCreateVisible((prev) => !prev);
  };

  const toggleEditVisible = () => {
    setEditVisible((prev) => !prev);
  };
  const onSubmitCreate = async (values: EmployerFields) => {
    await Meteor.callAsync('employers.insert', { employer: { ...values, ownershipType: values.ownershipType.value } });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: EmployerFields) => {
    await Meteor.callAsync('employers.update', {
      request: {
        ...values,
        ownershipType: values.ownershipType.value,
        prevRegistryNumber: currentEmployer?.registryNumber,
      },
    });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const employer = await Meteor.callAsync('employers.getById', { id });
    console.log('employer', employer);
    setCurrentEmployer(employer);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call('employers.remove', { employerId: id });
    await request();
  };

  const onItemClick = (id: string) => {
    navigate(generatePath(routes.view, { id }));
  };

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
