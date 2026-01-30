import dayjs from 'dayjs';
import { DormitoryInfo, PaymentBreakdown, Student } from './types';

export function calculateRemaining(payment: PaymentBreakdown): number {
  return Math.max(payment.total - payment.paid, 0);
}

export function calculateRegistrationDaysLeft(student: Student): number {
  if (!student?.visa?.registrationEndDate) return 999;
  const end = dayjs(student.visa.registrationEndDate);
  const diff = end.diff(dayjs(), 'day');
  return diff;
}

export function calculateVisaDaysLeft(student: Student): number {
  const end = dayjs(student.visa.visaEndDate);
  return end.diff(dayjs(), 'day');
}

export function calculateDormitoryMonthlyRate(status: DormitoryInfo['status']): number {
  if (status === 'Normal') return 40;
  if (status === 'VIP') return 80;
  return 0;
}

export function calculateDormitoryPlannedMonths(dormitory: DormitoryInfo): number {
  if (!dormitory.checkInDate || !dormitory.plannedCheckoutDate) return 0;
  const start = dayjs(dormitory.checkInDate);
  const end = dayjs(dormitory.plannedCheckoutDate);
  const months = end.diff(start, 'month', true);
  return Math.max(Math.round(months), 0);
}

export function calculateDormitoryRemainingMonths(dormitory: DormitoryInfo): number {
  if (!dormitory.plannedCheckoutDate) return 0;
  const end = dayjs(dormitory.plannedCheckoutDate);
  const remaining = end.diff(dayjs(), 'month', true);
  return Math.max(Math.round(remaining), 0);
}

export function calculateDormitoryBalance(dormitory: DormitoryInfo): {
  totalPlanned: number;
  paid: number;
  balance: number;
} {
  if (dormitory.status === 'None') {
    return { totalPlanned: 0, paid: 0, balance: 0 };
  }
  const rate =
    dormitory.monthlyRate ?? calculateDormitoryMonthlyRate(dormitory.status);
  const months = calculateDormitoryPlannedMonths(dormitory);
  const totalPlanned = rate * months;
  const paid = dormitory.paidAmount ?? 0;
  const balance = totalPlanned - paid;
  return { totalPlanned, paid, balance };
}


