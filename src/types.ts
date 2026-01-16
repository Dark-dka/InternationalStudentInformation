export type LanguageOfStudy = 'Russian' | 'English' | 'Uzbek';

export type DormitoryStatus = 'None' | 'Normal' | 'VIP';

export interface VisaRegistrationInfo {
  visaType: string;
  visaStartDate: string; // ISO
  visaEndDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  registrationAddressType: 'Dormitory' | 'Other';
  registrationAddressDetails?: string;
}

export interface PaymentBreakdown {
  total: number;
  paid: number;
}

export interface DormitoryInfo {
  status: DormitoryStatus;
  checkInDate?: string;
  plannedCheckoutDate?: string;
  actualCheckoutDate?: string;
  monthlyRate?: number;
  paidAmount?: number;
}

export interface AcademicInfo {
  group: string;
  courseYear: number;
  major: string;
  language: LanguageOfStudy;
}

export interface Student {
  id: string;
  fullName: string;
  dateOfBirth: string;
  passportNumber: string;
  jshir: string;
  citizenship: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  academic: AcademicInfo;
  visa: VisaRegistrationInfo;

  tuition: PaymentBreakdown;
  registrationFee: PaymentBreakdown;

  dormitory: DormitoryInfo;
}


