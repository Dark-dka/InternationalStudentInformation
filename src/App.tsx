import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import { Sidebar } from './layout/Sidebar';
import { Topbar } from './layout/Topbar';
import { students as mockStudents } from './mockData';
import { Student } from './types';
import { StatCards } from './components/StatCards';
import { StudentTable } from './components/StudentTable';
import { AlertsPanel } from './components/AlertsPanel';
import { StudentProfileModal } from './components/StudentProfileModal';
import { Login } from './components/Login';
import { calculateDormitoryBalance, calculateRemaining } from './utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getSidebarWidth } from './routes';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [loginError, setLoginError] = React.useState<string>('');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [students, setStudents] = React.useState<Student[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null
  );

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Noto\'g\'ri foydalanuvchi nomi yoki parol');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleSaveStudent = (student: Student) => {
    if (student.id && students.find(s => s.id === student.id)) {
      // Update existing student
      setStudents(prev => prev.map(s => s.id === student.id ? student : s));
    } else {
      // Add new student - generate ID based on highest existing ID
      const existingIds = students.map(s => {
        const match = s.id.match(/STU-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      });
      const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
      const newId = `STU-${String(maxId + 1).padStart(3, '0')}`;
      setStudents(prev => [...prev, { ...student, id: newId }]);
    }
    setSelectedStudent(null);
  };

  const filteredStudents = React.useMemo(() => {
    if (!search.trim()) return students;
    const s = search.toLowerCase();
    return students.filter(st =>
      [
        st.fullName,
        st.id,
        st.academic.group,
        st.academic.major,
        st.citizenship
      ]
        .join(' ')
        .toLowerCase()
        .includes(s)
    );
  }, [search, students]);

  const fullyPaidCount = students.filter(st => {
    const tuitionRemaining = calculateRemaining(st.tuition);
    const registrationRemaining = calculateRemaining(st.registrationFee);
    const dormitoryBalance = calculateDormitoryBalance(st.dormitory);
    return (
      tuitionRemaining === 0 &&
      registrationRemaining === 0 &&
      dormitoryBalance.balance <= 0
    );
  }).length;

  const expiringRegistrationCount = students.filter(st => {
    const regEnd = new Date(st.visa.registrationEndDate);
    const diffMs = regEnd.getTime() - Date.now();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays <= 10;
  }).length;

  const dormitoryResidentsCount = students.filter(
    st => st.dormitory.status !== 'None'
  ).length;

  const sidebarWidth = getSidebarWidth(sidebarOpen);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <BrowserRouter>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(prev => !prev)}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Topbar
            search={search}
            onSearchChange={setSearch}
            sidebarWidth={sidebarWidth}
            onLogout={handleLogout}
          />
          <Toolbar />
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <StatCards
                      totalStudents={students.length}
                      fullyPaid={fullyPaidCount}
                      expiringRegistration={expiringRegistrationCount}
                      dormitoryResidents={dormitoryResidentsCount}
                    />
                    <AlertsPanel students={students} />
                    <StudentTable
                      students={filteredStudents}
                      onSelectStudent={setSelectedStudent}
                      onEditStudent={(student) => setSelectedStudent(student)}
                      onAddStudent={() => setSelectedStudent(null)}
                      onSaveStudent={handleSaveStudent}
                    />
                  </Box>
                }
              />
              <Route
                path="/talabalar"
                element={
                  <StudentTable
                    students={filteredStudents}
                    onSelectStudent={setSelectedStudent}
                    onEditStudent={(student) => setSelectedStudent(student)}
                    onAddStudent={() => setSelectedStudent(null)}
                    onSaveStudent={handleSaveStudent}
                  />
                }
              />
              <Route
                path="/akademik"
                element={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <AlertsPanel students={students} />
                    <StudentTable
                      students={filteredStudents}
                      onSelectStudent={setSelectedStudent}
                      onEditStudent={(student) => setSelectedStudent(student)}
                      onAddStudent={() => setSelectedStudent(null)}
                      onSaveStudent={handleSaveStudent}
                    />
                  </Box>
                }
              />
              <Route
                path="/viza"
                element={
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <AlertsPanel students={students} />
                    <StudentTable
                      students={filteredStudents}
                      onSelectStudent={setSelectedStudent}
                      onEditStudent={(student) => setSelectedStudent(student)}
                      onAddStudent={() => setSelectedStudent(null)}
                      onSaveStudent={handleSaveStudent}
                    />
                  </Box>
                }
              />
              <Route
                path="/tolovlar"
                element={
                  <StudentTable
                    students={filteredStudents}
                    onSelectStudent={setSelectedStudent}
                    onEditStudent={(student) => setSelectedStudent(student)}
                    onAddStudent={() => setSelectedStudent(null)}
                    onSaveStudent={handleSaveStudent}
                  />
                }
              />
              <Route
                path="/yotoqxona"
                element={
                  <StudentTable
                    students={filteredStudents}
                    onSelectStudent={setSelectedStudent}
                    onEditStudent={(student) => setSelectedStudent(student)}
                    onAddStudent={() => setSelectedStudent(null)}
                    onSaveStudent={handleSaveStudent}
                  />
                }
              />
              <Route path="/ogohlantirishlar" element={<AlertsPanel students={students} />} />
            </Routes>
          </Container>
        </Box>
        <StudentProfileModal
          open={!!selectedStudent}
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      </Box>
    </BrowserRouter>
  );
};

export default App;


