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
  MenuItem,
  Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Student, LanguageOfStudy, DormitoryStatus } from '../types';
import { COUNTRIES } from '../constants/countries';
import { MAJORS } from '../constants/majors';

interface StudentFormProps {
  open: boolean;
  student?: Student | null;
  onClose: () => void;
  onSave: (student: Student) => void;
}

interface FormState {
  fullName?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  jshir?: string;
  citizenship?: string;
  phone?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  academic?: {
    group?: string;
    courseYear?: number | undefined;
    major?: string;
    language?: LanguageOfStudy;
  };
  visa?: {
    visaType?: string;
    visaStartDate?: string;
    visaEndDate?: string;
    registrationStartDate?: string;
    registrationEndDate?: string;
    registrationAddressType?: 'Dormitory' | 'Other';
    registrationAddressDetails?: string;
  };
  tuition?: {
    total?: number | undefined;
    paid?: number | undefined;
  };
  registrationFee?: {
    total?: number | undefined;
    paid?: number | undefined;
  };
  dormitory?: {
    status?: DormitoryStatus;
    checkInDate?: string;
    plannedCheckoutDate?: string;
    actualCheckoutDate?: string;
    monthlyRate?: number;
    paidAmount?: number;
  };
}

export const StudentForm: React.FC<StudentFormProps> = ({
  open,
  student,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = React.useState<FormState>({
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
      courseYear: undefined,
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
      total: undefined,
      paid: undefined
    },
    registrationFee: {
      total: undefined,
      paid: undefined
    },
    dormitory: {
      status: 'None'
    }
  });

  React.useEffect(() => {
    if (student) {
      setFormData(student as FormState);
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
          courseYear: undefined,
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
          total: undefined,
          paid: undefined
        },
        registrationFee: {
          total: undefined,
          paid: undefined
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
          ...((prev as Record<string, unknown>)[parent] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    if (formData.fullName && formData.passportNumber && formData.jshir && formData.jshir.length === 14) {
      const studentToSave: Student = {
        ...formData,
        id: student?.id || 'NEW',
        academic: {
          ...formData.academic,
          courseYear: formData.academic?.courseYear ?? 1,
          major: formData.academic?.major ?? '',
          group: formData.academic?.group ?? '',
          language: (formData.academic?.language as LanguageOfStudy) ?? 'English',
        },
        tuition: {
          total: formData.tuition?.total ?? 2800,
          paid: formData.tuition?.paid ?? 0,
        },
        registrationFee: {
          total: formData.registrationFee?.total ?? 300,
          paid: formData.registrationFee?.paid ?? 0,
        },
        dormitory: formData.dormitory ? {
          ...formData.dormitory,
          monthlyRate: formData.dormitory.monthlyRate ?? undefined,
          paidAmount: formData.dormitory.paidAmount ?? undefined,
        } : { status: 'None' },
      } as Student;
      onSave(studentToSave);
    }
  };

  const handleJshirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 14);
    handleChange('jshir', v);
  };

  const handleNumberChange = (field: string, raw: string) => {
    if (raw === '' || raw === '-') {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: { ...((prev as Record<string, unknown>)[parent] as object), [child]: undefined }
        }));
      } else {
        setFormData(prev => ({ ...prev, [field]: undefined }));
      }
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) handleChange(field, num);
  };

  const getNumVal = (val: number | undefined): string =>
    val !== undefined && val !== null ? String(val) : '';


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
                label="JSHSHIR"
                value={formData.jshir || ''}
                onChange={handleJshirChange}
                inputProps={{ maxLength: 14, inputMode: 'numeric', pattern: '[0-9]*' }}
                helperText="14 ta raqam kiritilishi shart"
                required
                error={!!(formData.jshir && formData.jshir.length !== 14)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={COUNTRIES}
                value={formData.citizenship || null}
                onChange={(_, newValue) => handleChange('citizenship', newValue || '')}
                onInputChange={(_, inputValue) => handleChange('citizenship', inputValue)}
                freeSolo
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Fuqarolik"
                    required
                  />
                )}
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
                inputMode="email"
                autoComplete="email"
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
                select
                label="Kurs"
                value={formData.academic?.courseYear ?? 1}
                onChange={(e) => handleChange('academic.courseYear', Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <MenuItem key={n} value={n}>{n}-kurs</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Yo'nalish"
                value={formData.academic?.major || ''}
                onChange={(e) => handleChange('academic.major', e.target.value)}
              >
                {MAJORS.map((m) => (
                  <MenuItem key={m} value={m}>{m}</MenuItem>
                ))}
              </TextField>
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
                onChange={(e) => {
                  const val = e.target.value;
                  handleChange('visa.registrationAddressType', val);
                  if (val === 'Other') {
                    handleChange('dormitory.status', 'None');
                  }
                }}
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
                inputProps={{ min: 0, step: 0.01 }}
                value={getNumVal(formData.tuition?.total)}
                onChange={(e) => handleNumberChange('tuition.total', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Kontrakt to'langan summa ($)"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={getNumVal(formData.tuition?.paid)}
                onChange={(e) => handleNumberChange('tuition.paid', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Registratsiya to'lovi – umumiy summa ($)"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={getNumVal(formData.registrationFee?.total)}
                onChange={(e) => handleNumberChange('registrationFee.total', e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Registratsiya to'lovi – to'langan summa ($)"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                value={getNumVal(formData.registrationFee?.paid)}
                onChange={(e) => handleNumberChange('registrationFee.paid', e.target.value)}
              />
            </Grid>
          </Grid>

          {formData.visa?.registrationAddressType === 'Dormitory' && (
            <>
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
                        inputProps={{ min: 0, step: 0.01 }}
                        value={formData.dormitory?.monthlyRate !== undefined && formData.dormitory?.monthlyRate !== null ? formData.dormitory.monthlyRate : ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === '') handleChange('dormitory.monthlyRate', undefined as any);
                          else { const n = parseFloat(v); if (!isNaN(n)) handleChange('dormitory.monthlyRate', n); }
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth
                        label="To'langan summa ($)"
                        type="number"
                        inputProps={{ min: 0, step: 0.01 }}
                        value={formData.dormitory?.paidAmount !== undefined && formData.dormitory?.paidAmount !== null ? formData.dormitory.paidAmount : ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === '') handleChange('dormitory.paidAmount', undefined as any);
                          else { const n = parseFloat(v); if (!isNaN(n)) handleChange('dormitory.paidAmount', n); }
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Bekor qilish</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.fullName ||
            !formData.passportNumber ||
            !formData.jshir ||
            formData.jshir.length !== 14 ||
            !formData.citizenship
          }
        >
          Saqlash
        </Button>
      </DialogActions>
    </Dialog>
  );
};
