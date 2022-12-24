import React from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { TRequest } from '/imports/api/requests';

export interface RequestFields {
  positionName: string;
  salary: string;
}
interface UserFormProps {
  title: string;
  onSubmit: (values: RequestFields) => void;
  onCancel: () => void;
  request?: TRequest;
  submitText?: string;
}

export const RequestForm: React.FC<UserFormProps> = ({
  title,
  request,
  onSubmit,
  submitText = 'Создать',
  onCancel,
}) => {
  const methods = useForm<RequestFields>({
    defaultValues: request,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('positionName')} label="Название позиции" />
        <TextField {...methods.register('salary')} label="Ожидаемая зарплата" />
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
