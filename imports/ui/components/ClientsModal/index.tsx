import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { ClientFields, ClientForm } from './ClientForm';

import { Client } from '/imports/api/clients';

type Props = {
  onClose: () => void;
  visible: boolean;
  client?: Client;
  submitText?: string;
  onSubmit: (values: ClientFields) => void;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  padding: '20px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ClientModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={style}>
        <ClientForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
