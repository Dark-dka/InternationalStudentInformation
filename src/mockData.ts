import { Student } from './types';
import dayjs from 'dayjs';

const today = dayjs();

export const students: Student[] = [
  {
    id: 'STU-001',
    fullName: 'Aliyev Jamshid',
    dateOfBirth: '2002-03-15',
    passportNumber: 'AA1234567',
    jshir: '12345678901234',
    citizenship: 'Uzbekistan',
    phone: '+99890 123 45 67',
    email: 'jamshid.aliyev@example.com',
    emergencyContactName: 'Aliyev Odil',
    emergencyContactPhone: '+99890 765 43 21',
    academic: {
      group: 'CS-21-1',
      courseYear: 3,
      major: 'Computer Science',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(6, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(20, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(3, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(8, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 2, Room 314'
    },
    tuition: {
      total: 2800,
      paid: 2000
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(9, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(3, 'month').format('YYYY-MM-DD'),
      paidAmount: 260,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-002',
    fullName: 'Wang Li',
    dateOfBirth: '2001-11-02',
    passportNumber: 'CN9876543',
    jshir: '56789012345678',
    citizenship: 'China',
    phone: '+86 136 1234 5678',
    email: 'li.wang@example.com',
    emergencyContactName: 'Wang Mei',
    emergencyContactPhone: '+86 136 8765 4321',
    academic: {
      group: 'IB-20-2',
      courseYear: 4,
      major: 'International Business',
      language: 'Russian'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      visaEndDate: today.add(5, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(5, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(2, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Other',
      registrationAddressDetails: 'Tashkent, Mirzo Ulugbek district'
    },
    tuition: {
      total: 2800,
      paid: 1500
    },
    registrationFee: {
      total: 300,
      paid: 150
    },
    dormitory: {
      status: 'VIP',
      checkInDate: today.subtract(11, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(1, 'month').format('YYYY-MM-DD'),
      paidAmount: 640,
      monthlyRate: 80
    }
  },
  {
    id: 'STU-003',
    fullName: 'John Smith',
    dateOfBirth: '2003-07-21',
    passportNumber: 'US7654321',
    jshir: '78901234567890',
    citizenship: 'USA',
    phone: '+1 555 210 9876',
    email: 'john.smith@example.com',
    emergencyContactName: 'Anna Smith',
    emergencyContactPhone: '+1 555 333 7777',
    academic: {
      group: 'MED-22-1',
      courseYear: 2,
      major: 'General Medicine',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(4, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(60, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(2, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(40, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 1, Room 210'
    },
    tuition: {
      total: 2800,
      paid: 2800
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'None'
    }
  },
  {
    id: 'STU-004',
    fullName: 'Kim Soo-jin',
    dateOfBirth: '2002-05-18',
    passportNumber: 'KR4567890',
    jshir: '23456789012345',
    citizenship: 'South Korea',
    phone: '+82 10 1234 5678',
    email: 'soojin.kim@example.com',
    emergencyContactName: 'Kim Min-jun',
    emergencyContactPhone: '+82 10 9876 5432',
    academic: {
      group: 'ENG-21-2',
      courseYear: 3,
      major: 'English Philology',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(8, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(45, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(4, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(15, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 1, Room 105'
    },
    tuition: {
      total: 2800,
      paid: 2800
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(8, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(4, 'month').format('YYYY-MM-DD'),
      paidAmount: 320,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-005',
    fullName: 'Ahmed Hassan',
    dateOfBirth: '2001-09-12',
    passportNumber: 'EG1234567',
    jshir: '34567890123456',
    citizenship: 'Egypt',
    phone: '+20 100 123 4567',
    email: 'ahmed.hassan@example.com',
    emergencyContactName: 'Hassan Mohamed',
    emergencyContactPhone: '+20 100 765 4321',
    academic: {
      group: 'MED-20-1',
      courseYear: 4,
      major: 'General Medicine',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      visaEndDate: today.add(3, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(6, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(1, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 2, Room 205'
    },
    tuition: {
      total: 2800,
      paid: 1400
    },
    registrationFee: {
      total: 300,
      paid: 100
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(2, 'month').format('YYYY-MM-DD'),
      paidAmount: 200,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-006',
    fullName: 'Maria Garcia',
    dateOfBirth: '2003-02-28',
    passportNumber: 'ES9876543',
    jshir: '45678901234567',
    citizenship: 'Spain',
    phone: '+34 612 345 678',
    email: 'maria.garcia@example.com',
    emergencyContactName: 'Carlos Garcia',
    emergencyContactPhone: '+34 612 987 654',
    academic: {
      group: 'LAW-22-2',
      courseYear: 2,
      major: 'International Law',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(5, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(70, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(3, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(50, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Other',
      registrationAddressDetails: 'Tashkent, Yunusabad district'
    },
    tuition: {
      total: 2800,
      paid: 2800
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'None'
    }
  },
  {
    id: 'STU-007',
    fullName: 'Raj Patel',
    dateOfBirth: '2002-11-05',
    passportNumber: 'IN7654321',
    jshir: '56789012345678',
    citizenship: 'India',
    phone: '+91 98765 43210',
    email: 'raj.patel@example.com',
    emergencyContactName: 'Priya Patel',
    emergencyContactPhone: '+91 98765 12345',
    academic: {
      group: 'CS-21-3',
      courseYear: 3,
      major: 'Computer Science',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(7, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(30, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(3, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(12, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 2, Room 412'
    },
    tuition: {
      total: 2800,
      paid: 2100
    },
    registrationFee: {
      total: 300,
      paid: 250
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(7, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(5, 'month').format('YYYY-MM-DD'),
      paidAmount: 280,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-008',
    fullName: 'Fatima Al-Zahra',
    dateOfBirth: '2001-12-20',
    passportNumber: 'SA2345678',
    jshir: '67890123456789',
    citizenship: 'Saudi Arabia',
    phone: '+966 50 123 4567',
    email: 'fatima.alzahra@example.com',
    emergencyContactName: 'Mohammed Al-Zahra',
    emergencyContactPhone: '+966 50 987 6543',
    academic: {
      group: 'PHARM-20-1',
      courseYear: 4,
      major: 'Pharmacy',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      visaEndDate: today.add(7, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(5, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(3, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 1, Room 315'
    },
    tuition: {
      total: 2800,
      paid: 2800
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'VIP',
      checkInDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(3, 'month').format('YYYY-MM-DD'),
      paidAmount: 720,
      monthlyRate: 80
    }
  },
  {
    id: 'STU-009',
    fullName: 'Ivan Petrov',
    dateOfBirth: '2003-04-10',
    passportNumber: 'RU3456789',
    jshir: '78901234567890',
    citizenship: 'Russia',
    phone: '+7 912 345 6789',
    email: 'ivan.petrov@example.com',
    emergencyContactName: 'Elena Petrov',
    emergencyContactPhone: '+7 912 987 6543',
    academic: {
      group: 'ECON-22-1',
      courseYear: 2,
      major: 'Economics',
      language: 'Russian'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(4, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(55, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(2, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(35, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 1, Room 118'
    },
    tuition: {
      total: 2800,
      paid: 1500
    },
    registrationFee: {
      total: 300,
      paid: 200
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(4, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(6, 'month').format('YYYY-MM-DD'),
      paidAmount: 160,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-010',
    fullName: 'Yuki Tanaka',
    dateOfBirth: '2002-08-25',
    passportNumber: 'JP4567890',
    jshir: '89012345678901',
    citizenship: 'Japan',
    phone: '+81 90 1234 5678',
    email: 'yuki.tanaka@example.com',
    emergencyContactName: 'Hiroshi Tanaka',
    emergencyContactPhone: '+81 90 9876 5432',
    academic: {
      group: 'ENG-21-1',
      courseYear: 3,
      major: 'English Philology',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(9, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(25, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(4, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(10, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 2, Room 301'
    },
    tuition: {
      total: 2800,
      paid: 2800
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(9, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(3, 'month').format('YYYY-MM-DD'),
      paidAmount: 360,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-011',
    fullName: 'Mohammad Reza',
    dateOfBirth: '2001-06-15',
    passportNumber: 'IR5678901',
    jshir: '90123456789012',
    citizenship: 'Iran',
    phone: '+98 912 345 6789',
    email: 'mohammad.reza@example.com',
    emergencyContactName: 'Ali Reza',
    emergencyContactPhone: '+98 912 987 6543',
    academic: {
      group: 'MED-20-2',
      courseYear: 4,
      major: 'General Medicine',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      visaEndDate: today.add(1, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(6, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.subtract(1, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 1, Room 225'
    },
    tuition: {
      total: 2800,
      paid: 1200
    },
    registrationFee: {
      total: 300,
      paid: 50
    },
    dormitory: {
      status: 'Normal',
      checkInDate: today.subtract(1, 'year').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(1, 'month').format('YYYY-MM-DD'),
      paidAmount: 120,
      monthlyRate: 40
    }
  },
  {
    id: 'STU-012',
    fullName: 'Sarah Johnson',
    dateOfBirth: '2003-01-30',
    passportNumber: 'CA6789012',
    jshir: '01234567890123',
    citizenship: 'Canada',
    phone: '+1 416 555 1234',
    email: 'sarah.johnson@example.com',
    emergencyContactName: 'Michael Johnson',
    emergencyContactPhone: '+1 416 555 9876',
    academic: {
      group: 'IB-22-1',
      courseYear: 2,
      major: 'International Business',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(3, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(90, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(1, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(60, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Other',
      registrationAddressDetails: 'Tashkent, Chilonzar district'
    },
    tuition: {
      total: 2800,
      paid: 2800
    },
    registrationFee: {
      total: 300,
      paid: 300
    },
    dormitory: {
      status: 'None'
    }
  },
  {
    id: 'STU-013',
    fullName: 'Abdullah Al-Mansoori',
    dateOfBirth: '2002-10-08',
    passportNumber: 'AE7890123',
    jshir: '12345678901234',
    citizenship: 'UAE',
    phone: '+971 50 123 4567',
    email: 'abdullah.almansoori@example.com',
    emergencyContactName: 'Khalid Al-Mansoori',
    emergencyContactPhone: '+971 50 987 6543',
    academic: {
      group: 'CS-21-2',
      courseYear: 3,
      major: 'Computer Science',
      language: 'English'
    },
    visa: {
      visaType: 'Student Visa',
      visaStartDate: today.subtract(7, 'month').format('YYYY-MM-DD'),
      visaEndDate: today.add(35, 'day').format('YYYY-MM-DD'),
      registrationStartDate: today.subtract(3, 'month').format('YYYY-MM-DD'),
      registrationEndDate: today.add(18, 'day').format('YYYY-MM-DD'),
      registrationAddressType: 'Dormitory',
      registrationAddressDetails: 'Dormitory 2, Room 208'
    },
    tuition: {
      total: 2800,
      paid: 2400
    },
    registrationFee: {
      total: 300,
      paid: 280
    },
    dormitory: {
      status: 'VIP',
      checkInDate: today.subtract(7, 'month').format('YYYY-MM-DD'),
      plannedCheckoutDate: today.add(5, 'month').format('YYYY-MM-DD'),
      paidAmount: 560,
      monthlyRate: 80
    }
  }
];


