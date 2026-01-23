import React from 'react';
import { Box } from '@mui/material';
import { Student } from '../types';
import { StudentTable } from './StudentTable';
import { AlertsPanel } from './AlertsPanel';
import { calculateDormitoryBalance, calculateRemaining, calculateRegistrationDaysLeft } from '../utils';

interface PageContentProps {
  students: Student[];
  pathname: string;
  onSelectStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onAddStudent: () => void;
  onSaveStudent: (student: Student) => void;
}

export const PageContent: React.FC<PageContentProps> = ({
  students,
  pathname,
  onSelectStudent,
  onEditStudent,
  onAddStudent,
  onSaveStudent,
}) => {
  const getFilteredStudents = (): Student[] => {
    // Ensure students is an array
    const studentsArray = Array.isArray(students) ? students : [];
    
    switch (pathname) {
      case '/akademik':
        // Akademik sahifa - barcha talabalar (akademik ma'lumotlar bilan)
        return studentsArray.filter(s => s.academic);

      case '/viza':
        // Viza sahifa - barcha talabalar (viza ma'lumotlari bilan)
        // Muammo bo'lganlar alohida belgilanadi
        return studentsArray.filter(s => s.visa);

      case '/tolovlar':
        // To'lovlar sahifa - qarzdor talabalar
        return studentsArray.filter(s => {
          const tuitionRemaining = calculateRemaining(s.tuition);
          const registrationRemaining = calculateRemaining(s.registrationFee);
          const dormitoryBalance = calculateDormitoryBalance(s.dormitory);
          return tuitionRemaining > 0 || registrationRemaining > 0 || dormitoryBalance.balance > 0;
        });

      case '/yotoqxona':
        // Yotoqxona sahifa - yotoqxonada yashaydigan talabalar
        return studentsArray.filter(s => s.dormitory && s.dormitory.status !== 'None');

      case '/talabalar':
      case '/':
      default:
        // Barcha talabalar
        return studentsArray;
    }
  };

  const filteredStudents = React.useMemo(() => getFilteredStudents(), [students, pathname]);

  // Sahifa uchun sarlavha
  const getPageTitle = (): string => {
    switch (pathname) {
      case '/akademik':
        return 'Akademik ma\'lumotlar';
      case '/viza':
        return 'Viza va ro\'yxatdan o\'tish';
      case '/tolovlar':
        return 'To\'lovlar (Qarzdor talabalar)';
      case '/yotoqxona':
        return 'Yotoqxona';
      default:
        return '';
    }
  };

  const pageTitle = getPageTitle();
  const showAlerts = pathname === '/' || pathname === '/akademik' || pathname === '/viza';

  // Determine view mode based on pathname
  const getViewMode = (): 'default' | 'academic' | 'visa' | 'payments' | 'dormitory' => {
    switch (pathname) {
      case '/akademik':
        return 'academic';
      case '/viza':
        return 'visa';
      case '/tolovlar':
        return 'payments';
      case '/yotoqxona':
        return 'dormitory';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {pageTitle && (
        <Box sx={{ mb: 2 }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
            {pageTitle}
          </h2>
          <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
            {filteredStudents.length} ta talaba
            {pathname === '/tolovlar' && ' (qarzdor talabalar)'}
            {pathname === '/yotoqxona' && ' (yotoqxonada yashaydigan talabalar)'}
            {pathname === '/viza' && ' (viza va ro\'yxatdan o\'tish ma\'lumotlari)'}
            {pathname === '/akademik' && ' (akademik ma\'lumotlar)'}
          </p>
        </Box>
      )}
      {showAlerts && <AlertsPanel students={students} />}
      <StudentTable
        students={filteredStudents}
        onSelectStudent={onSelectStudent}
        onEditStudent={onEditStudent}
        onAddStudent={onAddStudent}
        onSaveStudent={onSaveStudent}
        viewMode={getViewMode()}
      />
    </Box>
  );
};
