import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'New Case', path: '/cases/new' },
    { label: 'Case Search', path: '/cases' },
    { label: 'MedDRA Coding', path: '/meddra' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Argus PV</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Argus PV Safety Training
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              <Typography variant="body2">{user?.name}</Typography>
            </MenuItem>
            <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
