import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { ClientFields, ClientForm } from './ClientForm';

import { Client } from '/imports/api/clients';
import { modalBoxStyles } from '/imports/ui/shared/ui/theme';

type Props = {
  onClose: () => void;
  visible: boolean;
  client?: Client;
  submitText?: string;
  onSubmit: (values: ClientFields) => void;
};

export const ClientModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <ClientForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
