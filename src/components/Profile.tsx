import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid2 as Grid,
    TextField,
    Button,
    Divider,
    Avatar,
    Card,
    CardContent,
    Alert,
    Snackbar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';

export const Profile: React.FC = () => {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    // Get user info from localStorage or context
    const username = localStorage.getItem('username') || 'admin';

    const handlePasswordChange = async () => {
        setError('');
        setSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Barcha maydonlarni to\'ldiring');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Yangi parollar mos kelmaydi');
            return;
        }

        if (newPassword.length < 6) {
            setError('Yangi parol kamida 6 ta belgidan iborat bo\'lishi kerak');
            return;
        }

        try {
            // TODO: Implement API call to change password
            // await apiService.changePassword(currentPassword, newPassword);

            setSuccess('Parol muvaffaqiyatli o\'zgartirildi');
            setShowSnackbar(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.message || 'Parolni o\'zgartirishda xatolik yuz berdi');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Profil
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Shaxsiy ma'lumotlaringizni ko'ring va parolingizni o'zgartiring
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* User Information Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Avatar
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        bgcolor: 'primary.main'
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: 32 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight={600}>
                                        {username}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Administrator
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Foydalanuvchi nomi
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        {username}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Rol
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        Administrator
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Oxirgi kirish
                                    </Typography>
                                    <Typography variant="body1" fontWeight={500}>
                                        {new Date().toLocaleDateString('uz-UZ', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Change Password Card */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <LockIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Parolni o'zgartirish
                                </Typography>
                            </Box>

                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    label="Joriy parol"
                                    type="password"
                                    fullWidth
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    size="small"
                                />

                                <TextField
                                    label="Yangi parol"
                                    type="password"
                                    fullWidth
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    size="small"
                                    helperText="Kamida 6 ta belgi"
                                />

                                <TextField
                                    label="Yangi parolni tasdiqlang"
                                    type="password"
                                    fullWidth
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    size="small"
                                />

                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handlePasswordChange}
                                    fullWidth
                                    sx={{ mt: 1 }}
                                >
                                    Parolni o'zgartirish
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

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
