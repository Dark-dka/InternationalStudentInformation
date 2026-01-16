import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid2 as Grid,
  Box,
  IconButton,
  Typography,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Student, LanguageOfStudy, DormitoryStatus } from '../types';

interface StudentFormProps {
  open: boolean;
  student?: Student | null;
  onClose: () => void;
  onSave: (student: Student) => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  open,
  student,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = React.useState<Partial<Student>>({
    fullName: '',
    dateOfBirth: '',
    passportNumber: '',
    jshir: '',
    citizenship: '',
    phone: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    academic: {
      group: '',
      courseYear: 1,
      major: '',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: '',
      visaEndDate: '',
      registrationStartDate: '',
      registrationEndDate: '',
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: ''
    },
    tuition: {
      total: 2800,
      paid: 0
    },
    registrationFee: {
      total: 300,
      paid: 0
    },
    dormitory: {
      status: 'None'
    }
  });

  React.useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        fullName: '',
        dateOfBirth: '',
        passportNumber: '',
        jshir: '',
        citizenship: '',
        phone: '',
        email: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        academic: {
          group: '',
          courseYear: 1,
          major: '',
          language: 'English'
        },
        visa: {
          visaType: 'Student Visa',
          visaStartDate: '',
          visaEndDate: '',
          registrationStartDate: '',
          registrationEndDate: '',
          registrationAddressType: 'Dormitory',
          registrationAddressDetails: ''
        },
        tuition: {
          total: 2800,
          paid: 0
        },
        registrationFee: {
          total: 300,
          paid: 0
        },
        dormitory: {
          status: 'None'
        }
      });
    }
  }, [student, open]);

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Student] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    if (formData.fullName && formData.passportNumber) {
      const studentToSave: Student = {
        ...formData,
        id: student?.id || 'NEW', // Preserve ID when editing, temporary ID for new students
      } as Student;
      onSave(studentToSave);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          {student ? 'Talabani tahrirlash' : 'Yangi talaba qo\'shish'}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ pt: 2 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
            Shaxsiy ma'lumotlar
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="To'liq ism"
                value={formData.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Tug'ilgan sana"
                type="date"
                value={formData.dateOfBirth || ''}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Pasport raqami"
                value={formData.passportNumber || ''}
                onChange={(e) => handleChange('passportNumber', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="JSHIR"
                value={formData.jshir || ''}
                onChange={(e) => handleChange('jshir', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Fuqarolik"
                value={formData.citizenship || ''}
                onChange={(e) => handleChange('citizenship', e.target.value)}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Telefon"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Favqulodda holatdagi shaxs"
                value={formData.emergencyContactName || ''}
                onChange={(e) => handleChange('emergencyContactName', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Favqulodda holat telefon raqami"
                value={formData.emergencyContactPhone || ''}
                onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3, mb: 2 }}>
            Akademik ma'lumotlar
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Guruh"
                value={formData.academic?.group || ''}
                onChange={(e) => handleChange('academic.group', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Kurs"
                type="number"
                value={formData.academic?.courseYear || 1}
                onChange={(e) => handleChange('academic.courseYear', parseInt(e.target.value))}
                inputProps={{ min: 1, max: 6 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Yo'nalish"
                value={formData.academic?.major || ''}
                onChange={(e) => handleChange('academic.major', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Ta'lim tili"
                value={formData.academic?.language || 'English'}
                onChange={(e) => handleChange('academic.language', e.target.value)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Russian">Russian</MenuItem>
                <MenuItem value="Uzbek">Uzbek</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3, mb: 2 }}>
            Viza va ro'yxatdan o'tish
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Viza boshlanish sanasi"
                type="date"
                value={formData.visa?.visaStartDate || ''}
                onChange={(e) => handleChange('visa.visaStartDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Viza tugash sanasi"
                type="date"
                value={formData.visa?.visaEndDate || ''}
                onChange={(e) => handleChange('visa.visaEndDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ro'yxatdan o'tish boshlanish sanasi"
                type="date"
                value={formData.visa?.registrationStartDate || ''}
                onChange={(e) => handleChange('visa.registrationStartDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ro'yxatdan o'tish tugash sanasi"
                type="date"
                value={formData.visa?.registrationEndDate || ''}
                onChange={(e) => handleChange('visa.registrationEndDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Ro'yxatdan o'tish manzili turi"
                value={formData.visa?.registrationAddressType || 'Dormitory'}
                onChange={(e) => handleChange('visa.registrationAddressType', e.target.value)}
              >
                <MenuItem value="Dormitory">Yotoqxona</MenuItem>
                <MenuItem value="Other">Boshqa</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ro'yxatdan o'tish manzili tafsilotlari"
                value={formData.visa?.registrationAddressDetails || ''}
                onChange={(e) => handleChange('visa.registrationAddressDetails', e.target.value)}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3, mb: 2 }}>
            To'lovlar
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Kontrakt umumiy summa ($)"
                type="number"
                value={formData.tuition?.total || 2800}
                onChange={(e) => handleChange('tuition.total', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Kontrakt to'langan summa ($)"
                type="number"
                value={formData.tuition?.paid || 0}
                onChange={(e) => handleChange('tuition.paid', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ro'yxatdan o'tish umumiy summa ($)"
                type="number"
                value={formData.registrationFee?.total || 300}
                onChange={(e) => handleChange('registrationFee.total', parseFloat(e.target.value))}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Ro'yxatdan o'tish to'langan summa ($)"
                type="number"
                value={formData.registrationFee?.paid || 0}
                onChange={(e) => handleChange('registrationFee.paid', parseFloat(e.target.value))}
              />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 3, mb: 2 }}>
            Yotoqxona
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Yotoqxona holati"
                value={formData.dormitory?.status || 'None'}
                onChange={(e) => handleChange('dormitory.status', e.target.value as DormitoryStatus)}
              >
                <MenuItem value="None">Yo'q</MenuItem>
                <MenuItem value="Normal">Oddiy</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
              </TextField>
            </Grid>
            {formData.dormitory?.status !== 'None' && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Kirish sanasi"
                    type="date"
                    value={formData.dormitory?.checkInDate || ''}
                    onChange={(e) => handleChange('dormitory.checkInDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Rejalashtirilgan chiqish sanasi"
                    type="date"
                    value={formData.dormitory?.plannedCheckoutDate || ''}
                    onChange={(e) => handleChange('dormitory.plannedCheckoutDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Oylik narx ($)"
                    type="number"
                    value={formData.dormitory?.monthlyRate || ''}
                    onChange={(e) => handleChange('dormitory.monthlyRate', parseFloat(e.target.value))}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="To'langan summa ($)"
                    type="number"
                    value={formData.dormitory?.paidAmount || ''}
                    onChange={(e) => handleChange('dormitory.paidAmount', parseFloat(e.target.value))}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.fullName || !formData.passportNumber}
        >
          Saqlash
        </Button>
      </DialogActions>
    </Dialog>
  );
};
