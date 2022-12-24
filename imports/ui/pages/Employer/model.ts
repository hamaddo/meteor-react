import { EmployerFields } from '/imports/ui/components/EmployerModal/EmployerForm';

import { Meteor } from 'meteor/meteor';

import { EmployerMethods } from '/imports/api/employers/employerMethods';

import { generatePath, useNavigate } from 'react-router-dom';

import { routes } from '/imports/ui/pages/Employer/routes';
import { useMeteorMethod } from '/imports/ui/shared/hooks/useMeteorMethod';
import { Employer } from '/imports/api/employers';
import { useToggle } from '/imports/ui/shared/hooks/useToggle';

import { useState } from 'react';

export const useLocalModel = () => {
  const { data: employers, isLoading, request } = useMeteorMethod<Employer[]>(EmployerMethods.Get);
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentEmployer, setCurrentEmployer] = useState<Employer>();
  const navigate = useNavigate();
  const onSubmitCreate = async (values: EmployerFields) => {
    await Meteor.callAsync(EmployerMethods.Insert, {
      employer: { ...values, ownershipType: values.ownershipType.value },
    });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: EmployerFields) => {
    await Meteor.callAsync(EmployerMethods.Update, {
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
    const employer = await Meteor.callAsync(EmployerMethods.GetById, { id });
    setCurrentEmployer(employer);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    Meteor.call(EmployerMethods.Remove, { employerId: id });
    await request();
  };

  const onItemClick = (id: string) => {
    navigate(generatePath(routes.view, { id }));
  };

  const mappedList = employers?.map(({ name, address, ownershipType, phone, registryNumber, _id }) => ({
    info: `[${ownershipType}] Название: ${name}, Адрес: ${address}, Телефон: ${phone} - ${registryNumber}`,
    id: _id,
  }));

  return {
    mappedList,
    currentEmployer,
    isLoading,
    createVisible,
    editVisible,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
    onItemClick,
  };
};
