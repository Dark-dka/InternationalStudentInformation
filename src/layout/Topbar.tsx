import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

interface TopbarProps {
  onSearchChange: (value: string) => void;
  search: string;
  sidebarWidth: number;
  onLogout?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onSearchChange,
  search,
  sidebarWidth,
  onLogout
}) => {
  const [notificationAnchor, setNotificationAnchor] = React.useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(null);

  const notifications = [
    { id: 1, message: 'Aliyev Jamshid - ro\'yxat muddati 8 kundan keyin tugaydi', time: '2 soat oldin', type: 'warning' },
    { id: 2, message: 'Wang Li - yotoqxona to\'lovi qoldig\'i $120', time: '5 soat oldin', type: 'error' },
    { id: 3, message: 'John Smith - kontrakt to\'lovi to\'liq to\'landi', time: '1 kun oldin', type: 'success' },
  ];

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        left: { xs: 0, sm: sidebarWidth },
        width: { xs: '100%', sm: `calc(100% - ${sidebarWidth}px)` },
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(244,245,247,0.7)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Xalqaro talabalar paneli
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Viza, toʻlov, yotoqxona va akademik holatlarni bir joydan kuzating.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Talabani ism, ID yoki guruh bo‘yicha qidiring..."
            sx={{
              minWidth: 320,
              '& .MuiOutlinedInput-root': {
                borderRadius: 9999,
                backgroundColor: '#fff'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />
          <IconButton 
            sx={{ backgroundColor: '#fff' }}
            onClick={handleNotificationClick}
          >
            <Badge color="error" badgeContent={notifications.length} variant="standard">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{
              sx: { width: 360, maxHeight: 400 }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                Bildirishnomalar
              </Typography>
            </Box>
            <Divider />
            {notifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Bildirishnomalar yo'q
                </Typography>
              </Box>
            ) : (
              notifications.map((notif) => (
                <MenuItem key={notif.id} onClick={handleNotificationClose}>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body2">{notif.message}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notif.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            )}
          </Menu>
          <IconButton onClick={handleProfileClick}>
            <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 600 }}>AD</Avatar>
          </IconButton>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleProfileClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                admin@example.com
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profil</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sozlamalar</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Chiqish</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


