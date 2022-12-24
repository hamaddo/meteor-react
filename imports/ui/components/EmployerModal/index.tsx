import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { Employer } from '/imports/api/employers';
import { EmployerFields, EmployerForm } from '/imports/ui/components/EmployerModal/EmployerForm';

type Props = {
  onClose: () => void;
  visible: boolean;
  employer?: Employer;
  submitText?: string;
  onSubmit: (values: EmployerFields) => void;
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

export const EmployerModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={style}>
        <EmployerForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
