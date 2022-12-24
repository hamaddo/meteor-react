import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { Employer } from '/imports/api/employers';
import { EmployerFields, EmployerForm } from '/imports/ui/components/EmployerModal/EmployerForm';
import { modalBoxStyles } from '/imports/ui/shared/ui/theme';

type Props = {
  onClose: () => void;
  visible: boolean;
  employer?: Employer;
  submitText?: string;
  onSubmit: (values: EmployerFields) => void;
};

export const EmployerModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <EmployerForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
