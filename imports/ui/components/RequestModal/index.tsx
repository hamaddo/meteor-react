import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { RequestFields, RequestForm } from './RequestForm';

import { TRequest } from '/imports/api/requests';
import { modalBoxStyles } from '/imports/ui/shared/ui/theme';

type Props = {
  onClose: () => void;
  visible: boolean;
  request?: TRequest;
  submitText?: string;
  onSubmit: (values: RequestFields) => void;
};

export const RequestModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <RequestForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
