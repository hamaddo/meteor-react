import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { RequestFields, RequestForm } from './RequestForm';

import { TRequest } from '/imports/api/requests';

type Props = {
  onClose: () => void;
  visible: boolean;
  request?: TRequest;
  submitText?: string;
  onSubmit: (values: RequestFields) => void;
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

export const RequestModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={style}>
        <RequestForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
