import React from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Button, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { RolesEnum, UserType } from '/imports/api/user';

import { Select } from '../../shared/ui/Select';

export interface UserFields {
  username: string;
  password?: string;
  role: { value: string; label: string };
}
interface UserFormProps {
  title: string;
  onSubmit: (values: UserFields) => void;
  onCancel: () => void;
  user?: UserType;
  submitText?: string;
}

const roleMap = {
  [RolesEnum.ADMIN]: 'Админ',
  [RolesEnum.USER]: 'Пользователь',
};

export const UserForm: React.FC<UserFormProps> = ({ title, user, onSubmit, submitText = 'Создать', onCancel }) => {
  const methods = useForm<UserFields>({
    defaultValues: {
      ...user,
      role: user?.role
        ? {
            value: user.role,
            label: roleMap[user?.role],
          }
        : undefined,
    },
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('username')} name="username" label="Имя пользователя" />
        {!user && <TextField {...methods.register('password')} name="password" label="Пароль" type="password" />}
        <InputLabel>Роль</InputLabel>
        <Controller
          render={({ field }) => {
            return (
              <Select
                {...field}
                options={[
                  { value: RolesEnum.ADMIN, label: 'Админ' },
                  { value: RolesEnum.USER, label: 'Пользователь' },
                ]}
              />
            );
          }}
          name={'role'}
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
