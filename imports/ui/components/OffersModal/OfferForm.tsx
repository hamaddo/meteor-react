import React from 'react';

import { useForm } from 'react-hook-form';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Offer } from '/imports/api/offers';

export type OfferFields = Omit<Offer, '_id' | 'employerId'>;
interface Props {
  title: string;
  onSubmit: (values: OfferFields) => void;
  onCancel: () => void;
  offer?: Offer;
  submitText?: string;
}

export const OfferForm: React.FC<Props> = ({ title, offer, onSubmit, submitText = 'Создать', onCancel }) => {
  const methods = useForm<OfferFields>({
    defaultValues: offer,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('positionName')} label="Название позиции" />
        <TextField {...methods.register('salary')} label="Ожидаемая зарплата" />
        <TextField {...methods.register('gender')} label="Ожидаемый пол сотрудника" />
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
