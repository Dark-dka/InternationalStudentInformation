import React from 'react';

export type AppRouteKey =
  | 'dashboard'
  | 'students'
  | 'academic'
  | 'visa'
  | 'payments'
  | 'dormitory'
  | 'alerts'
  | 'profile'
  | 'settings';

export const routes: { key: AppRouteKey; path: string; label: string }[] = [
  { key: 'dashboard', path: '/', label: 'Asosiy panel' },
  { key: 'students', path: '/talabalar', label: 'Talabalar' },
  { key: 'academic', path: '/akademik', label: 'Akademik maʼlumotlar' },
  { key: 'visa', path: '/viza', label: 'Viza va roʻyxatga olish' },
  { key: 'payments', path: '/tolovlar', label: 'Toʻlovlar' },
  { key: 'dormitory', path: '/yotoqxona', label: 'Yotoqxona' },
  { key: 'alerts', path: '/ogohlantirishlar', label: 'Ogohlantirishlar' },
  { key: 'profile', path: '/profil', label: 'Profil' },
  { key: 'settings', path: '/sozlamalar', label: 'Sozlamalar' }
];

export function getSidebarWidth(open: boolean): number {
  return open ? 260 : 80;
}




