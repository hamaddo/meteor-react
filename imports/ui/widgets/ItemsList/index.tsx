import React from 'react';

import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';

type Props = {
  title: string;
  data: Array<{ id: string; info: string }>;
  onDeleteItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onItemClick?: (id: string) => void;
  onCreate?: () => void;
};
export const ItemsList: React.FC<Props> = ({ title, data, onDeleteItem, onEditItem, onItemClick, onCreate }) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box width={'100%'} display="flex" flexDirection="row" justifyContent="space-between" alignItems={'center'}>
        <h2>{title}</h2>
        <Button
          size={'small'}
          style={{ height: '40px' }}
          variant="contained"
          color="secondary"
          disabled={!onCreate}
          onClick={onCreate}
        >
          Создать
        </Button>
      </Box>
      {!data?.length && <div>Пусто</div>}
      <Stack gap={2} width={'100%'}>
        {data?.map(({ info, id }) => (
          <Box key={id} borderRadius="8px" border={'1px solid gray'}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => {
                if (onItemClick) onItemClick(id);
              }}
              spacing={1}
              padding={'10px'}
            >
              <div style={{ width: '100%' }}>{info}</div>

              <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                <IconButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (onEditItem) onEditItem(id);
                  }}
                >
                  <Edit />
                </IconButton>

                <IconButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (onDeleteItem) onDeleteItem(id);
                  }}
                >
                  <Delete />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
