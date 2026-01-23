import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid2 as Grid,
    Card,
    CardContent,
    Switch,
    FormControlLabel,
    Divider,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
    Snackbar
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import SaveIcon from '@mui/icons-material/Save';

export const Settings: React.FC = () => {
    const [notifications, setNotifications] = React.useState(true);
    const [emailAlerts, setEmailAlerts] = React.useState(true);
    const [autoRefresh, setAutoRefresh] = React.useState(false);
    const [language, setLanguage] = React.useState('uz');
    const [theme, setTheme] = React.useState('light');
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [success, setSuccess] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    const handleSave = () => {
        // Save settings to localStorage
        const settings = {
            notifications,
            emailAlerts,
            autoRefresh,
            language,
            theme,
            rowsPerPage
        };
        localStorage.setItem('appSettings', JSON.stringify(settings));

        setSuccess('Sozlamalar saqlandi');
        setShowSnackbar(true);
    };

    React.useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                setNotifications(settings.notifications ?? true);
                setEmailAlerts(settings.emailAlerts ?? true);
                setAutoRefresh(settings.autoRefresh ?? false);
                setLanguage(settings.language ?? 'uz');
                setTheme(settings.theme ?? 'light');
                setRowsPerPage(settings.rowsPerPage ?? 10);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Sozlamalar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ilova sozlamalarini boshqaring
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Notifications Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <NotificationsIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Bildirishnomalar
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={notifications}
                                            onChange={(e) => setNotifications(e.target.checked)}
                                        />
                                    }
                                    label="Bildirishnomalarni yoqish"
                                />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={emailAlerts}
                                            onChange={(e) => setEmailAlerts(e.target.checked)}
                                            disabled={!notifications}
                                        />
                                    }
                                    label="Email orqali ogohlantirishlar"
                                />

                                <Divider />

                                <Typography variant="body2" color="text.secondary">
                                    Bildirishnomalar quyidagi hodisalar uchun yuboriladi:
                                </Typography>
                                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                                    <Typography component="li" variant="body2" color="text.secondary">
                                        Ro'yxatdan o'tish muddati tugashi
                                    </Typography>
                                    <Typography component="li" variant="body2" color="text.secondary">
                                        To'lov qarzi
                                    </Typography>
                                    <Typography component="li" variant="body2" color="text.secondary">
                                        Yangi talaba qo'shilganda
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Display Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <PaletteIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Ko'rinish sozlamalari
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Mavzu</InputLabel>
                                    <Select
                                        value={theme}
                                        label="Mavzu"
                                        onChange={(e) => setTheme(e.target.value)}
                                    >
                                        <MenuItem value="light">Yorug'</MenuItem>
                                        <MenuItem value="dark">Qorong'i</MenuItem>
                                        <MenuItem value="auto">Avtomatik</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth size="small">
                                    <InputLabel>Jadvalda ko'rsatiladigan qatorlar</InputLabel>
                                    <Select
                                        value={rowsPerPage}
                                        label="Jadvalda ko'rsatiladigan qatorlar"
                                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={25}>25</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={autoRefresh}
                                            onChange={(e) => setAutoRefresh(e.target.checked)}
                                        />
                                    }
                                    label="Avtomatik yangilash (har 5 daqiqada)"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Language Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <LanguageIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Til sozlamalari
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Interfeys tili</InputLabel>
                                    <Select
                                        value={language}
                                        label="Interfeys tili"
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <MenuItem value="uz">O'zbekcha</MenuItem>
                                        <MenuItem value="ru">Русский</MenuItem>
                                        <MenuItem value="en">English</MenuItem>
                                    </Select>
                                </FormControl>

                                <Alert severity="info" sx={{ mt: 1 }}>
                                    Til o'zgarishi keyingi kirganingizda qo'llaniladi
                                </Alert>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* System Settings */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <SettingsIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Tizim sozlamalari
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Versiya:</strong> 1.0.0
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Oxirgi yangilanish:</strong> 2026-01-23
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                <Alert severity="warning">
                                    Tizim sozlamalarini o'zgartirish uchun administrator huquqlari kerak
                                </Alert>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                >
                    Sozlamalarni saqlash
                </Button>
            </Box>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
};
