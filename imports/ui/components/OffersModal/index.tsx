import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { OfferFields, OfferForm } from './OfferForm';

import { Offer } from '/imports/api/offers';
import { modalBoxStyles } from '/imports/ui/shared/ui/theme';

type Props = {
  onClose: () => void;
  visible: boolean;
  offer?: Offer;
  submitText?: string;
  onSubmit: (values: OfferFields) => void;
};

export const OfferModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <OfferForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
