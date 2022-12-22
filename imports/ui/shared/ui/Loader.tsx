import React from 'react';

import { CircularProgress, Box } from '@mui/material';

export const Loader = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
  );
};
