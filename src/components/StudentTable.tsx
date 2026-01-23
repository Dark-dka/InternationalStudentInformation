import React from 'react';
import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Box,
  Button
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Student } from '../types';
import {
  calculateDormitoryBalance,
  calculateRegistrationDaysLeft,
  calculateRemaining
} from '../utils';
import { StudentForm } from './StudentForm';

interface StudentTableProps {
  students: Student[];
  onSelectStudent?: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  onAddStudent?: () => void;
  onSaveStudent?: (student: Student) => void;
  viewMode?: 'default' | 'academic' | 'visa' | 'payments' | 'dormitory';
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSelectStudent,
  onEditStudent,
  onAddStudent,
  onSaveStudent,
  viewMode = 'default'
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);

  const handleEdit = (e: React.MouseEvent, student: Student) => {
    e.stopPropagation();
    setEditingStudent(student);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setFormOpen(true);
    if (onAddStudent) {
      onAddStudent();
    }
  };

  const handleSave = (student: Student) => {
    if (onSaveStudent) {
      onSaveStudent(student);
    }
    setFormOpen(false);
    setEditingStudent(null);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingStudent(null);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slice = students.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Yangi talaba qo'shish
          </Button>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Talaba</TableCell>
                <TableCell>Guruh / Kurs</TableCell>
                {viewMode === 'academic' && (
                  <>
                    <TableCell>Yo'nalish</TableCell>
                    <TableCell align="center">Ta'lim tili</TableCell>
                    <TableCell align="right">Kontrakt qoldig'i</TableCell>
                  </>
                )}
                {viewMode === 'visa' && (
                  <>
                    <TableCell>Viza turi</TableCell>
                    <TableCell align="center">Ro'yxatdan qolgan kunlar</TableCell>
                    <TableCell>Ro'yxat manzili</TableCell>
                  </>
                )}
                {viewMode !== 'academic' && viewMode !== 'visa' && (
                  <>
                    <TableCell align="right">Kontrakt qoldig'i</TableCell>
                    <TableCell align="right">Ro'yxatga olish qoldig'i</TableCell>
                    <TableCell align="center">Ro'yxatdan qolgan kunlar</TableCell>
                    <TableCell align="center">Yotoqxona</TableCell>
                  </>
                )}
                <TableCell align="center">Holat</TableCell>
                <TableCell align="center">Amallar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slice.map(student => {
                const tuitionRemaining = calculateRemaining(student.tuition);
                const registrationRemaining = calculateRemaining(
                  student.registrationFee
                );
                const registrationDaysLeft =
                  calculateRegistrationDaysLeft(student);
                const dormitoryBalance = calculateDormitoryBalance(
                  student.dormitory
                );

                const isDebtor =
                  tuitionRemaining > 0 ||
                  registrationRemaining > 0 ||
                  dormitoryBalance.balance > 0;
                const isExpiring = registrationDaysLeft <= 10;
                const isFullyPaid =
                  tuitionRemaining === 0 &&
                  registrationRemaining === 0 &&
                  dormitoryBalance.balance <= 0;

                return (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <strong>{student.fullName}</strong>
                      <br />
                      <span style={{ fontSize: 12, color: '#6b7280' }}>
                        {student.id} • {student.citizenship}
                      </span>
                    </TableCell>
                    <TableCell>
                      {student.academic.group}
                      <br />
                      <span style={{ fontSize: 12, color: '#6b7280' }}>
                        {student.academic.major} • {student.academic.courseYear}-kurs
                      </span>
                    </TableCell>
                    {viewMode === 'academic' && (
                      <>
                        <TableCell>{student.academic.major}</TableCell>
                        <TableCell align="center">{student.academic.language}</TableCell>
                        <TableCell align="right">
                          {tuitionRemaining > 0 ? (
                            <Chip
                              size="small"
                              label={`$${tuitionRemaining.toLocaleString()}`}
                              color="error"
                              variant="filled"
                              sx={{ backgroundColor: 'rgba(211,47,47,0.12)', color: 'error.main' }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              label="To'langan"
                              color="success"
                              variant="filled"
                              sx={{ backgroundColor: 'rgba(46,125,50,0.12)', color: 'success.main' }}
                            />
                          )}
                        </TableCell>
                      </>
                    )}
                    {viewMode === 'visa' && (
                      <>
                        <TableCell>{student.visa.visaType}</TableCell>
                        <TableCell align="center">
                          <Chip
                            size="small"
                            label={
                              registrationDaysLeft >= 0
                                ? `${registrationDaysLeft} kun`
                                : 'Muddati o\'tgan'
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
                        </TableCell>
                        <TableCell>
                          {student.visa.registrationAddressType}
                          {student.visa.registrationAddressDetails && (
                            <>
                              <br />
                              <span style={{ fontSize: 12, color: '#6b7280' }}>
                                {student.visa.registrationAddressDetails}
                              </span>
                            </>
                          )}
                        </TableCell>
                      </>
                    )}
                    {viewMode !== 'academic' && viewMode !== 'visa' && (
                      <>
                        <TableCell align="right">
                          {tuitionRemaining > 0 ? (
                            <Chip
                              size="small"
                              label={`$${tuitionRemaining.toLocaleString()}`}
                              color="error"
                              variant="filled"
                              sx={{ backgroundColor: 'rgba(211,47,47,0.12)', color: 'error.main' }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              label="To'langan"
                              color="success"
                              variant="filled"
                              sx={{ backgroundColor: 'rgba(46,125,50,0.12)', color: 'success.main' }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {registrationRemaining > 0 ? (
                            <Chip
                              size="small"
                              label={`$${registrationRemaining.toLocaleString()}`}
                              color="error"
                              variant="filled"
                              sx={{ backgroundColor: 'rgba(211,47,47,0.12)', color: 'error.main' }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              label="To'langan"
                              color="success"
                              variant="filled"
                              sx={{ backgroundColor: 'rgba(46,125,50,0.12)', color: 'success.main' }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            size="small"
                            label={
                              registrationDaysLeft >= 0
                                ? `${registrationDaysLeft} kun`
                                : 'Muddati o\'tgan'
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
                        </TableCell>
                        <TableCell align="center">
                          {student.dormitory.status === 'None' ? (
                            <Chip
                              size="small"
                              label="Yotoqxona yo'q"
                              variant="outlined"
                            />
                          ) : (
                            <Chip
                              size="small"
                              label={`${student.dormitory.status} • $${dormitoryBalance.balance > 0
                                ? dormitoryBalance.balance.toLocaleString()
                                : 0
                                }`}
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
                          )}
                        </TableCell>
                      </>
                    )}
                    <TableCell align="center">
                      {isDebtor && (
                        <Chip
                          size="small"
                          label="Qarzdor"
                          color="error"
                          variant="filled"
                        />
                      )}
                      {!isDebtor && isExpiring && (
                        <Chip
                          size="small"
                          label="Roʻyxat muddati tugamoqda"
                          color="warning"
                          variant="filled"
                        />
                      )}
                      {isFullyPaid && !isExpiring && (
                        <Chip
                          size="small"
                          label="Holati yaxshi"
                          color="success"
                          variant="filled"
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        <Tooltip title="Tahrirlash">
                          <IconButton
                            size="small"
                            onClick={(e) => handleEdit(e, student)}
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Toʻliq profilni koʻrish">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectStudent && onSelectStudent(student);
                            }}
                          >
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={students.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      <StudentForm
        open={formOpen}
        student={editingStudent}
        onClose={handleCloseForm}
        onSave={handleSave}
      />
    </>
  );
};


