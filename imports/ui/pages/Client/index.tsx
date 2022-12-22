import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Box, Button, Stack } from '@mui/material';
import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';

import { routes } from './routes';

export const ClientsList = () => {
  const { data: clients, isLoading, request } = useMeteorCall<any[]>('user.get');

  console.log('clients', clients);

  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  console.log('я покакал');

  const onCreate = () => {
    navigate(routes.list);
  };

  const onDelete = (id: string) => {
    Meteor.call('store.remove', id);
    request();
  };

  const mappedList = clients?.map(({ name, address, _id }) => ({
    line: `${name} ${address}`,
    id: _id,
  }));

  return (
    <div>
      <h1>ПОШЕЛ НАХУЙ МЕНЖУЛЬКА</h1>
      <button onClick={onCreate}>создать</button>
      <button onClick={() => onDelete('1')}>удалить</button>
      {mappedList?.map((item) => (
        <div key={item.id}>{item.id}</div>
      ))}

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <h2>Пользователи</h2>
        {!mappedList?.length && <div>Пусто</div>}
        <Stack gap={2}>
          {mappedList?.map(({ line, id }) => (
            <Stack key={id} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
              <div>{line}</div>
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="secondary">
                  Изменить
                </Button>
                <Button variant="contained" color="error" onClick={() => onDelete(id)}>
                  Удалить
                </Button>
              </Stack>
            </Stack>
          ))}
          <Button onClick={onCreate}>Создать</Button>
        </Stack>
      </Box>
    </div>
  );
};
