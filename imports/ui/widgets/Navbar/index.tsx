import React, { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ManageAccounts, AttachMoney, AccountCircle } from '@mui/icons-material';
import { AppBar, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { useMeteorCall } from '../../shared/hooks/useMeteorCall';
import { Loader } from '../../shared/ui/Loader';

type ListType = {
  text: string;
  path: string;
  icon: JSX.Element;
  roles?: string[];
};

const list: ListType[] = [
  {
    text: 'Работодатели',
    path: '/employers',
    icon: <AttachMoney />,
  },
  {
    text: 'Клиенты',
    path: '/clients',
    icon: <ManageAccounts />,
  },
  {
    text: 'Одменка',
    path: '/users',
    icon: <ManageAccounts />,
    roles: ['admin'],
  },
];

export const Navbar: FC = ({ children }) => {
  const user = useTracker(() => Meteor.user());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { data: userRoles, isLoading } = useMeteorCall<string[]>('user.getUserRoles');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    Meteor.logout();
    navigate('/login');
    setAnchorEl(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'node', md: 'flex' } }}>
              [Копия] HH
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {list.map((page) => (
                <Button
                  key={page.text}
                  onClick={() => navigate(page.path)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.text}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Typography textAlign="center">{user?.username}</Typography>
                <MenuItem onClick={onLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};
