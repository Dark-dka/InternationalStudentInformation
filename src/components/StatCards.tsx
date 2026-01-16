import {
  Box,
  Chip,
  Grid2 as Grid,
  LinearProgress,
  Paper,
  Typography
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import React from 'react';

interface StatCardsProps {
  totalStudents: number;
  fullyPaid: number;
  expiringRegistration: number;
  dormitoryResidents: number;
}

const Card: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  subLabel?: string;
  chipColor?: 'default' | 'success' | 'warning' | 'error';
}> = ({ icon, label, value, subLabel, chipColor = 'default' }) => (
  <Paper
    sx={{
      p: 2.5,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      height: '100%'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(230,0,0,0.08)',
          color: 'primary.main'
        }}
      >
        {icon}
      </Box>
      {subLabel && (
        <Chip
          label={subLabel}
          size="small"
          color={chipColor === 'default' ? undefined : chipColor}
          variant="filled"
          sx={{ backgroundColor: 'rgba(15,23,42,0.06)', color: 'text.primary' }}
        />
      )}
    </Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h5" fontWeight={700}>
      {value}
    </Typography>
  </Paper>
);

export const StatCards: React.FC<StatCardsProps> = ({
  totalStudents,
  fullyPaid,
  expiringRegistration,
  dormitoryResidents
}) => {
  const paidPercent = totalStudents
    ? Math.round((fullyPaid / totalStudents) * 100)
    : 0;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card
          icon={<PeopleIcon />}
          label="Jami xalqaro talabalar"
          value={String(totalStudents)}
          subLabel="Faol kartotekalar"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2.5, height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(46,125,50,0.08)',
                color: 'success.main'
              }}
            >
              <PaymentsIcon />
            </Box>
            <Chip
              label={`${paidPercent}% toʻliq toʻlangan`}
              size="small"
              color="success"
              variant="filled"
              sx={{ backgroundColor: 'rgba(46,125,50,0.12)', color: 'success.main' }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Toʻliq toʻlov qilgan talabalar
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            {fullyPaid} / {totalStudents}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={paidPercent}
            sx={{ height: 6, borderRadius: 999 }}
            color="success"
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card
          icon={<AssignmentIndIcon />}
          label="Roʻyxatdan oʻtish muddati ≤ 10 kun"
          value={String(expiringRegistration)}
          subLabel={expiringRegistration > 0 ? 'Chora koʻrish kerak' : 'Hammasi yaxshi'}
          chipColor={expiringRegistration > 0 ? 'warning' : 'success'}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card
          icon={<BedroomChildIcon />}
          label="Yotoqxonadagi talabalar"
          value={String(dormitoryResidents)}
          subLabel="Oddiy va VIP"
        />
      </Grid>
    </Grid>
  );
};


