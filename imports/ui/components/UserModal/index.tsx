import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { UserFields, UserForm } from './UserForm';

import { UserType } from '/imports/api/user';
import { modalBoxStyles } from '/imports/ui/shared/ui/theme';

type Props = {
  onClose: () => void;
  visible: boolean;
  user?: UserType;
  submitText?: string;
  onSubmit: (values: UserFields) => void;
};

export const UserModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <UserForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
