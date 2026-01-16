import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  Typography,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Student } from '../types';
import {
  calculateDormitoryBalance,
  calculateDormitoryRemainingMonths,
  calculateRegistrationDaysLeft,
  calculateRemaining
} from '../utils';

interface StudentProfileModalProps {
  open: boolean;
  student?: Student | null;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  open,
  student,
  onClose
}) => {
  if (!student) return null;

  const tuitionRemaining = calculateRemaining(student.tuition);
  const registrationRemaining = calculateRemaining(student.registrationFee);
  const registrationDaysLeft = calculateRegistrationDaysLeft(student);
  const dormitoryBalance = calculateDormitoryBalance(student.dormitory);
  const dormRemainingMonths = calculateDormitoryRemainingMonths(
    student.dormitory
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={700}>
            {student.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.id} • {student.academic.group} •{' '}
            {student.academic.major}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ backgroundColor: '#f9fafb' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Shaxsiy maʼlumotlar
              </Typography>
              <Typography variant="body2">
                <strong>F.I.Sh.:</strong> {student.fullName}
              </Typography>
              <Typography variant="body2">
                <strong>Tugʻilgan sana:</strong> {student.dateOfBirth}
              </Typography>
              <Typography variant="body2">
                <strong>Pasport seriya va raqami:</strong> {student.passportNumber}
              </Typography>
              <Typography variant="body2">
                <strong>JSHIR:</strong> {student.jshir}
              </Typography>
              <Typography variant="body2">
                <strong>Fuqaroligi:</strong> {student.citizenship}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2">
                <strong>Telefon:</strong> {student.phone}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {student.email}
              </Typography>
              <Typography variant="body2">
                <strong>Favqulodda holatdagi shaxs:</strong>{' '}
                {student.emergencyContactName}
              </Typography>
              <Typography variant="body2">
                <strong>Favqulodda holat telefon raqami:</strong>{' '}
                {student.emergencyContactPhone}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Akademik maʼlumotlar
              </Typography>
              <Typography variant="body2">
                <strong>Guruh:</strong> {student.academic.group}
              </Typography>
              <Typography variant="body2">
                <strong>Kurs:</strong> {student.academic.courseYear}
              </Typography>
              <Typography variant="body2">
                <strong>Yoʻnalish:</strong> {student.academic.major}
              </Typography>
              <Typography variant="body2">
                <strong>Taʼlim tili:</strong> {student.academic.language}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Viza va roʻyxatdan oʻtish
              </Typography>
              <Typography variant="body2">
                <strong>Viza turi:</strong> {student.visa.visaType}
              </Typography>
              <Typography variant="body2">
                <strong>Viza muddati:</strong> {student.visa.visaStartDate} -{' '}
                {student.visa.visaEndDate}
              </Typography>
              <Typography variant="body2">
                <strong>Roʻyxatdan oʻtish muddati:</strong>{' '}
                {student.visa.registrationStartDate} -{' '}
                {student.visa.registrationEndDate}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                <strong>Qolgan kunlar:</strong>{' '}
                <Chip
                  size="small"
                  label={
                    registrationDaysLeft >= 0
                      ? `${registrationDaysLeft} kun`
                      : 'Muddati oʻtgan'
                  }
                  color={
                    registrationDaysLeft <= 3
                      ? 'error'
                      : registrationDaysLeft <= 10
                      ? 'warning'
                      : 'success'
                  }
                  variant="filled"
                  sx={{
                    backgroundColor:
                      registrationDaysLeft <= 3
                        ? 'rgba(211,47,47,0.12)'
                        : registrationDaysLeft <= 10
                        ? 'rgba(237,108,2,0.16)'
                        : 'rgba(46,125,50,0.12)',
                    color:
                      registrationDaysLeft <= 3
                        ? 'error.main'
                        : registrationDaysLeft <= 10
                        ? 'warning.main'
                        : 'success.main'
                  }}
                />
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Roʻyxatdan oʻtish manzili:</strong>{' '}
                {student.visa.registrationAddressType} •{' '}
                {student.visa.registrationAddressDetails}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Toʻlovlar
              </Typography>
              <Typography variant="body2">
                <strong>Yillik kontrakt summasi:</strong> $2800
              </Typography>
              <Typography variant="body2">
                <strong>Toʻlangan:</strong> ${student.tuition.paid.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Qoldiq:</strong>{' '}
                <Chip
                  size="small"
                  label={`$${tuitionRemaining.toLocaleString()}`}
                  color={tuitionRemaining > 0 ? 'error' : 'success'}
                  variant="filled"
                  sx={{
                    backgroundColor:
                      tuitionRemaining > 0
                        ? 'rgba(211,47,47,0.12)'
                        : 'rgba(46,125,50,0.12)',
                    color: tuitionRemaining > 0 ? 'error.main' : 'success.main'
                  }}
                />
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2">
                <strong>Roʻyxatdan oʻtish toʻlovi:</strong> $300
              </Typography>
              <Typography variant="body2">
                <strong>Toʻlangan:</strong> $
                {student.registrationFee.paid.toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Qoldiq:</strong>{' '}
                <Chip
                  size="small"
                  label={`$${registrationRemaining.toLocaleString()}`}
                  color={registrationRemaining > 0 ? 'error' : 'success'}
                  variant="filled"
                  sx={{
                    backgroundColor:
                      registrationRemaining > 0
                        ? 'rgba(211,47,47,0.12)'
                        : 'rgba(46,125,50,0.12)',
                    color:
                      registrationRemaining > 0 ? 'error.main' : 'success.main'
                  }}
                />
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Yotoqxona
              </Typography>
              {student.dormitory.status === 'None' ? (
                <Typography variant="body2">
                  Talaba yotoqxonada yashamaydi.
                </Typography>
              ) : (
                <>
                  <Typography variant="body2">
                    <strong>Holati:</strong> {student.dormitory.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Kirgan sana:</strong> {student.dormitory.checkInDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rejalashtirilgan chiqish sanasi:</strong>{' '}
                    {student.dormitory.plannedCheckoutDate}
                  </Typography>
                  {student.dormitory.actualCheckoutDate && (
                    <Typography variant="body2">
                      <strong>Haqiqiy chiqish sanasi:</strong>{' '}
                      {student.dormitory.actualCheckoutDate}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    <strong>Qolgan yashash muddati:</strong>{' '}
                    <Chip
                      size="small"
                      label={`${dormRemainingMonths} oy`}
                      color="info"
                      variant="filled"
                      sx={{
                        backgroundColor: 'rgba(2,136,209,0.12)',
                        color: 'info.main'
                      }}
                    />
                  </Typography>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2">
                    <strong>Rejalashtirilgan umumiy summa:</strong> $
                    {dormitoryBalance.totalPlanned.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Toʻlangan:</strong> $
                    {dormitoryBalance.paid.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Yotoqxona qoldigʻi:</strong>{' '}
                    <Chip
                      size="small"
                      label={`$${dormitoryBalance.balance.toLocaleString()}`}
                      color={
                        dormitoryBalance.balance > 0 ? 'error' : 'success'
                      }
                      variant="filled"
                      sx={{
                        backgroundColor:
                          dormitoryBalance.balance > 0
                            ? 'rgba(211,47,47,0.12)'
                            : 'rgba(46,125,50,0.12)',
                        color:
                          dormitoryBalance.balance > 0
                            ? 'error.main'
                            : 'success.main'
                      }}
                    />
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};


