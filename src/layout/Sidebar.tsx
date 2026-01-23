import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaymentsIcon from '@mui/icons-material/Payments';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routes, AppRouteKey } from '../routes';

const drawerWidth = 260;

const iconByKey: Record<AppRouteKey, React.ReactNode> = {
  dashboard: <DashboardIcon />,
  students: <PeopleIcon />,
  academic: <SchoolIcon />,
  visa: <AssignmentIndIcon />,
  payments: <PaymentsIcon />,
  dormitory: <BedroomChildIcon />,
  alerts: <NotificationsActiveIcon />,
  profile: <PersonIcon />,
  settings: <SettingsIcon />
};

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onToggle
}) => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 80,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#111827'
        }
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: 2
        }}
      >
        {open && (
          <Box>
            <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
              Xalqaro talabalar
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              Boshqaruv paneli
            </Typography>
          </Box>
        )}
        <IconButton
          onClick={onToggle}
          sx={{
            color: 'primary.main',
            borderRadius: 2,
            '&:hover': { backgroundColor: 'rgba(230,0,0,0.06)' }
          }}
          size="small"
        >
          {open ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      <List sx={{ mt: 1 }}>
        {routes.map(item => {
          const isSelected =
            (item.path === '/' && location.pathname === '/') ||
            (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <ListItemButton
              key={item.key}
              selected={isSelected}
              component={NavLink}
              to={item.path}
              sx={{
                mx: 1.5,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(230,0,0,0.06)',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main'
                  },
                  '& .MuiListItemText-primary': {
                    fontWeight: 600
                  }
                },
                '&:hover': {
                  backgroundColor: 'rgba(15,23,42,0.03)'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'text.secondary',
                  minWidth: open ? 40 : 32
                }}
              >
                {iconByKey[item.key]}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};


