import React from 'react';

import ReactInputMask from 'react-input-mask';
import { Controller, useForm } from 'react-hook-form';

import { Button, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Employer } from '/imports/api/employers';
import { Select } from '/imports/ui/shared/ui/Select';
import { OwnershipType } from '/imports/api/employers/EmployersCollection';

export type EmployerFields = Omit<Employer, '_id' | 'ownershipType'> & {
  ownershipType: {
    value: string;
    label: string;
  };
};
interface UserFormProps {
  title: string;
  onSubmit: (values: EmployerFields) => void;
  onCancel: () => void;
  employer?: Employer;
  submitText?: string;
}

export const EmployerForm: React.FC<UserFormProps> = ({
  title,
  employer,
  onSubmit,
  submitText = 'Создать',
  onCancel,
}) => {
  const methods = useForm<EmployerFields>({
    defaultValues: {
      ...employer,
      ownershipType: employer?.ownershipType
        ? {
            value: employer?.ownershipType,
            label: employer?.ownershipType,
          }
        : undefined,
    },
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('name')} label="Имя" />
        <TextField {...methods.register('registryNumber')} label="Номер регистрации" />
        <TextField {...methods.register('address')} label="Адрес" />
        <ReactInputMask
          {...methods.register('phone')}
          placeholder="+7 (___) ___-__-__"
          defaultValue={employer?.phone}
          mask="+7 (999) 999-99-99"
        >
          {(inputProps) => (
            <TextField label="Телефон" type="text" defaultValue={employer?.phone} fullWidth {...inputProps} />
          )}
        </ReactInputMask>
        <InputLabel>Тип собственности</InputLabel>
        <Controller
          render={({ field }) => {
            return (
              <Select
                {...field}
                options={[
                  { value: OwnershipType.OOO, label: OwnershipType.OOO },
                  { value: OwnershipType.ZAO, label: OwnershipType.ZAO },
                  { value: OwnershipType.IP, label: OwnershipType.IP },
                ]}
              />
            );
          }}
          name={'ownershipType'}
          control={methods.control}
        />

        <Stack direction={'row'} justifyContent={'end'} spacing={2} width={'100%'}>
          <Button type={'reset'} variant={'contained'} color={'primary'} onClick={onCancel}>
            Отмена
          </Button>
          <Button type={'submit'} variant={'contained'} color={'secondary'}>
            {submitText}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
