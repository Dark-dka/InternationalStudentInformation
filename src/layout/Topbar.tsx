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
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../types';
import {
  calculateDormitoryBalance,
  calculateRegistrationDaysLeft,
  calculateRemaining
} from '../utils';

interface TopbarProps {
  onSearchChange: (value: string) => void;
  search: string;
  sidebarWidth: number;
  onLogout?: () => void;
  students?: Student[];
}

export const Topbar: React.FC<TopbarProps> = ({
  onSearchChange,
  search,
  sidebarWidth,
  onLogout,
  students = []
}) => {
  const navigate = useNavigate();
  const [notificationAnchor, setNotificationAnchor] = React.useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(null);

  const studentsArray = Array.isArray(students) ? students : [];

  const notifications = React.useMemo(() => {
    const list: { id: string; message: string; type: 'warning' | 'error' | 'success' }[] = [];
    studentsArray.forEach((s) => {
      const regDays = calculateRegistrationDaysLeft(s);
      if (regDays <= 10 && regDays >= 0) {
        list.push({
          id: `reg-${s.id}`,
          message: `${s.fullName} – ro'yxatdan o'tish muddati ${regDays} kundan keyin tugaydi`,
          type: regDays <= 3 ? 'error' : 'warning'
        });
      } else if (regDays < 0) {
        list.push({
          id: `reg-exp-${s.id}`,
          message: `${s.fullName} – ro'yxatdan o'tish muddati o'tgan`,
          type: 'error'
        });
      }
      const tuitionRem = calculateRemaining(s.tuition);
      const regFeeRem = calculateRemaining(s.registrationFee);
      const dormBal = calculateDormitoryBalance(s.dormitory);
      if (tuitionRem > 0 || regFeeRem > 0 || dormBal.balance > 0) {
        const parts: string[] = [];
        if (tuitionRem > 0) parts.push(`kontrakt $${tuitionRem}`);
        if (regFeeRem > 0) parts.push(`ro'yxatdan o'tish $${regFeeRem}`);
        if (dormBal.balance > 0) parts.push(`yotoqxona $${dormBal.balance}`);
        list.push({
          id: `debt-${s.id}`,
          message: `${s.fullName} – qarzdor: ${parts.join(', ')}`,
          type: 'error'
        });
      }
    });
    return list.slice(0, 20);
  }, [studentsArray]);

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
            <Box sx={{ p: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={600}>
                Bildirishnomalar
              </Typography>
              {notifications.length > 0 && (
                <Button
                  size="small"
                  onClick={() => {
                    handleNotificationClose();
                    navigate('/ogohlantirishlar');
                  }}
                >
                  Barchasi
                </Button>
              )}
            </Box>
            <Divider />
            {notifications.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Bildirishnomalar yo'q. Barcha holatlar yaxshi.
                </Typography>
              </Box>
            ) : (
              notifications.map((notif) => (
                <MenuItem key={notif.id} onClick={handleNotificationClose}>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: notif.type === 'error' ? 'error.main' : notif.type === 'warning' ? 'warning.main' : 'text.primary'
                      }}
                    >
                      {notif.message}
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


