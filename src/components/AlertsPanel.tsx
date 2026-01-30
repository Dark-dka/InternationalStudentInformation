import React from 'react';
import {
  Alert,
  Box,
  Chip,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { Student } from '../types';
import {
  calculateDormitoryBalance,
  calculateRegistrationDaysLeft,
  calculateRemaining
} from '../utils';

interface AlertsPanelProps {
  students: Student[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ students }) => {
  // Ensure students is an array
  const studentsArray = Array.isArray(students) ? students : [];
  
  const registrationExpiring = studentsArray.filter(
    (s) => s.visa?.registrationEndDate && calculateRegistrationDaysLeft(s) <= 10
  );

  const sortedByRegistration = [...studentsArray]
    .filter((s) => s.visa?.registrationEndDate)
    .sort(
      (a, b) =>
        calculateRegistrationDaysLeft(a) - calculateRegistrationDaysLeft(b)
    );

  const debtors = studentsArray.filter(s => {
    const tuitionRemaining = calculateRemaining(s.tuition);
    const registrationRemaining = calculateRemaining(s.registrationFee);
    const dormitoryBalance = calculateDormitoryBalance(s.dormitory);
    return (
      tuitionRemaining > 0 ||
      registrationRemaining > 0 ||
      dormitoryBalance.balance > 0
    );
  });

  const topDebtors = [...debtors].sort((a, b) => {
    const aTotal =
      calculateRemaining(a.tuition) +
      calculateRemaining(a.registrationFee) +
      Math.max(calculateDormitoryBalance(a.dormitory).balance, 0);
    const bTotal =
      calculateRemaining(b.tuition) +
      calculateRemaining(b.registrationFee) +
      Math.max(calculateDormitoryBalance(b.dormitory).balance, 0);
    return bTotal - aTotal;
  });

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2.5, height: '100%' }}>
          <Typography variant="subtitle2" gutterBottom>
            Roʻyxatdan oʻtish muddati 10 kun ichida tugaydigan talabalar
          </Typography>
          {registrationExpiring.length === 0 && (
            <Alert severity="success" variant="outlined">
              Hamma roʻyxatdan oʻtish muddati 10 kundan koʻproq.
            </Alert>
          )}
          {registrationExpiring.length > 0 && (
            <List dense>
              {registrationExpiring.map(s => (
                <ListItem key={s.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={s.fullName}
                    secondary={`${s.academic?.group ?? '-'} • ${s.citizenship}`}
                  />
                  <Chip
                    size="small"
                  label={`${calculateRegistrationDaysLeft(s)} kun`}
                    color={
                      calculateRegistrationDaysLeft(s) <= 3
                        ? 'error'
                        : 'warning'
                    }
                    variant="filled"
                    sx={{
                      backgroundColor:
                        calculateRegistrationDaysLeft(s) <= 3
                          ? 'rgba(211,47,47,0.12)'
                          : 'rgba(237,108,2,0.16)',
                      color:
                        calculateRegistrationDaysLeft(s) <= 3
                          ? 'error.main'
                          : 'warning.main'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2.5, height: '100%' }}>
          <Typography variant="subtitle2" gutterBottom>
            Roʻyxatdan qolgan kuni eng kam boʻlgan talabalar
          </Typography>
          <List dense>
            {sortedByRegistration.slice(0, 5).map(s => (
              <ListItem key={s.id} sx={{ px: 0 }}>
                <ListItemText
                  primary={s.fullName}
                  secondary={`${s.academic?.group ?? '-'} • ${s.academic?.major ?? '-'}`}
                />
                <Chip
                  size="small"
                  label={`${calculateRegistrationDaysLeft(s)} kun`}
                  color={
                    calculateRegistrationDaysLeft(s) <= 3
                      ? 'error'
                      : calculateRegistrationDaysLeft(s) <= 10
                      ? 'warning'
                      : 'default'
                  }
                  variant="filled"
                  sx={{
                    backgroundColor:
                      calculateRegistrationDaysLeft(s) <= 3
                        ? 'rgba(211,47,47,0.12)'
                        : calculateRegistrationDaysLeft(s) <= 10
                        ? 'rgba(237,108,2,0.16)'
                        : 'rgba(15,23,42,0.06)',
                    color:
                      calculateRegistrationDaysLeft(s) <= 3
                        ? 'error.main'
                        : calculateRegistrationDaysLeft(s) <= 10
                        ? 'warning.main'
                        : 'text.primary'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2.5, height: '100%' }}>
          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
            Qarzdorlar roʻyxati
          </Typography>
          
          {topDebtors.length === 0 && (
            <Alert severity="success" variant="outlined" sx={{ mt: 1 }}>
              Qarzdorlar yoʻq. Barcha toʻlovlar oʻz vaqtida.
            </Alert>
          )}
          
          {topDebtors.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {topDebtors.slice(0, 5).map(s => {
                const tuitionRemaining = calculateRemaining(s.tuition);
                const registrationRemaining = calculateRemaining(s.registrationFee);
                const dormitoryBalance = calculateDormitoryBalance(s.dormitory);
                
                const hasTuitionDebt = tuitionRemaining > 0;
                const hasRegistrationDebt = registrationRemaining > 0;
                const hasDormitoryDebt = dormitoryBalance.balance > 0;
                
                const debtTypes: string[] = [];
                if (hasTuitionDebt) debtTypes.push('Kontrakt');
                if (hasRegistrationDebt) debtTypes.push('Roʻyxatdan oʻtish');
                if (hasDormitoryDebt) debtTypes.push('Yotoqxona');
                
                return (
                  <Box
                    key={s.id}
                    sx={{
                      p: 1.5,
                      mb: 1.5,
                      borderRadius: 1.5,
                      backgroundColor: 'rgba(211,47,47,0.04)',
                      border: '1px solid',
                      borderColor: 'rgba(211,47,47,0.12)',
                      '&:last-child': { mb: 0 }
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                          {s.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {s.academic?.group ?? '-'} • {s.citizenship}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
                      {hasTuitionDebt && (
                        <Chip
                          size="small"
                          label={`Kontrakt: $${tuitionRemaining.toLocaleString()}`}
                          color="error"
                          variant="filled"
                          sx={{
                            backgroundColor: 'rgba(211,47,47,0.12)',
                            color: 'error.main',
                            fontWeight: 500,
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                      {hasRegistrationDebt && (
                        <Chip
                          size="small"
                          label={`Roʻyxatdan oʻtish: $${registrationRemaining.toLocaleString()}`}
                          color="error"
                          variant="filled"
                          sx={{
                            backgroundColor: 'rgba(211,47,47,0.12)',
                            color: 'error.main',
                            fontWeight: 500,
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                      {hasDormitoryDebt && (
                        <Chip
                          size="small"
                          label={`Yotoqxona: $${dormitoryBalance.balance.toLocaleString()}`}
                          color="error"
                          variant="filled"
                          sx={{
                            backgroundColor: 'rgba(211,47,47,0.12)',
                            color: 'error.main',
                            fontWeight: 500,
                            fontSize: '0.7rem'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};


