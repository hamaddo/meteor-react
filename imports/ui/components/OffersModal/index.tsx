import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { OfferFields, OfferForm } from './OfferForm';

import { Offer } from '/imports/api/offers';

type Props = {
  onClose: () => void;
  visible: boolean;
  offer?: Offer;
  submitText?: string;
  onSubmit: (values: OfferFields) => void;
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

export const OfferModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={style}>
        <OfferForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
