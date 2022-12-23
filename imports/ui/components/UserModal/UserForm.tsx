import React from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
export interface UserFields {
  username: string;
  password?: string;
}
interface UserFormProps {
  title: string;
  onSubmit: (values: UserFields) => void;
  onCancel: () => void;
  user?: UserFields;
  submitText?: string;
}

export const UserForm: React.FC<UserFormProps> = ({ title, user, onSubmit, submitText = 'Создать', onCancel }) => {
  const methods = useForm<UserFields>({
    defaultValues: user,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('username')} name="username" label="Имя пользователя" />
        {!user && <TextField {...methods.register('password')} name="password" label="Пароль" type="password" />}
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
