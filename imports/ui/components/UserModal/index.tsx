import React, { useState, VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { UserFields, UserForm } from './UserForm';

import { UserType } from '/imports/ui/pages/Users';

type Props = {
  onClose: () => void;
  visible: boolean;
  user?: UserType;
  submitText?: string;
  onSubmit: (values: UserFields) => void;
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

export const UserModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={style}>
        <UserForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
