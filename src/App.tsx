import React from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import { Sidebar } from './layout/Sidebar';
import { Topbar } from './layout/Topbar';
import { Student } from './types';
import { StatCards } from './components/StatCards';
import { StudentTable } from './components/StudentTable';
import { AlertsPanel } from './components/AlertsPanel';
import { StudentProfileModal } from './components/StudentProfileModal';
import { Login } from './components/Login';
import { calculateDormitoryBalance, calculateRemaining } from './utils';
import { PageContent } from './components/PageContent';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { getSidebarWidth } from './routes';
import { apiService } from './services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return !!localStorage.getItem('access_token');
  });
  const [loginError, setLoginError] = React.useState<string>('');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [students, setStudents] = React.useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState({
    totalStudents: 0,
    fullyPaid: 0,
    expiringRegistration: 0,
    dormitoryResidents: 0,
  });

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await apiService.getStudents(search || undefined);
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await apiService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Load students from API on mount and when authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      loadStudents();
      loadStats();
    }
  }, [isAuthenticated]);

  // Load students when search changes (with debounce)
  React.useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        loadStudents();
      }, 300); // Debounce search
      return () => clearTimeout(timeoutId);
    }
  }, [search, isAuthenticated]);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoginError('');
      await apiService.login(username, password);
      setIsAuthenticated(true);
      await loadStudents();
      await loadStats();
    } catch (error: any) {
      setLoginError(error.message || 'Noto\'g\'ri foydalanuvchi nomi yoki parol');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setStudents([]);
  };

  const handleSaveStudent = async (student: Student) => {
    try {
      setLoading(true);
      if (student.id && students.find(s => s.id === student.id)) {
        // Update existing student
        await apiService.updateStudent(student.id, student);
        await loadStudents();
        await loadStats();
      } else {
        // Add new student
        await apiService.createStudent(student);
        await loadStudents();
        await loadStats();
      }
      setSelectedStudent(null);
    } catch (error: any) {
      console.error('Error saving student:', error);
      alert(error.message || 'Talabani saqlashda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const sidebarWidth = getSidebarWidth(sidebarOpen);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <BrowserRouter>
      <AppContent
        students={students}
        stats={stats}
        search={search}
        setSearch={setSearch}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarWidth={sidebarWidth}
        onLogout={handleLogout}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        onSaveStudent={handleSaveStudent}
      />
    </BrowserRouter>
  );
};

const AppContent: React.FC<{
  students: Student[];
  stats: any;
  search: string;
  setSearch: (s: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarWidth: number;
  onLogout: () => void;
  selectedStudent: Student | null;
  setSelectedStudent: (s: Student | null) => void;
  onSaveStudent: (s: Student) => void;
}> = ({
  students,
  stats,
  search,
  setSearch,
  sidebarOpen,
  setSidebarOpen,
  sidebarWidth,
  onLogout,
  selectedStudent,
  setSelectedStudent,
  onSaveStudent,
}) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar
          search={search}
          onSearchChange={setSearch}
          sidebarWidth={sidebarWidth}
          onLogout={onLogout}
        />
        <Toolbar />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <StatCards
                    totalStudents={stats.totalStudents}
                    fullyPaid={stats.fullyPaid}
                    expiringRegistration={stats.expiringRegistration}
                    dormitoryResidents={stats.dormitoryResidents}
                  />
                  <PageContent
                    students={students}
                    pathname={location.pathname}
                    onSelectStudent={setSelectedStudent}
                    onEditStudent={setSelectedStudent}
                    onAddStudent={() => setSelectedStudent(null)}
                    onSaveStudent={onSaveStudent}
                  />
                </Box>
              }
            />
            <Route
              path="/talabalar"
              element={
                <PageContent
                  students={students}
                  pathname={location.pathname}
                  onSelectStudent={setSelectedStudent}
                  onEditStudent={setSelectedStudent}
                  onAddStudent={() => setSelectedStudent(null)}
                  onSaveStudent={onSaveStudent}
                />
              }
            />
            <Route
              path="/akademik"
              element={
                <PageContent
                  students={students}
                  pathname={location.pathname}
                  onSelectStudent={setSelectedStudent}
                  onEditStudent={setSelectedStudent}
                  onAddStudent={() => setSelectedStudent(null)}
                  onSaveStudent={onSaveStudent}
                />
              }
            />
            <Route
              path="/viza"
              element={
                <PageContent
                  students={students}
                  pathname={location.pathname}
                  onSelectStudent={setSelectedStudent}
                  onEditStudent={setSelectedStudent}
                  onAddStudent={() => setSelectedStudent(null)}
                  onSaveStudent={onSaveStudent}
                />
              }
            />
            <Route
              path="/tolovlar"
              element={
                <PageContent
                  students={students}
                  pathname={location.pathname}
                  onSelectStudent={setSelectedStudent}
                  onEditStudent={setSelectedStudent}
                  onAddStudent={() => setSelectedStudent(null)}
                  onSaveStudent={onSaveStudent}
                />
              }
            />
            <Route
              path="/yotoqxona"
              element={
                <PageContent
                  students={students}
                  pathname={location.pathname}
                  onSelectStudent={setSelectedStudent}
                  onEditStudent={setSelectedStudent}
                  onAddStudent={() => setSelectedStudent(null)}
                  onSaveStudent={onSaveStudent}
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
  );
};

export default App;


