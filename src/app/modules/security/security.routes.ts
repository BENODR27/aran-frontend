import { Routes } from '@angular/router';
import { SecurityList } from './components/security-list/security-list';
import { SecurityDetail } from './components/security-detail/security-detail';

export const SECURITY_ROUTES: Routes = [
  { path: '', component: SecurityList },
  { path: 'dashboard', component: SecurityDetail, data: { tab: 'dashboard' } },
  { path: 'security-center', component: SecurityDetail, data: { tab: 'security-center' } },
  { path: 'session-management', component: SecurityDetail, data: { tab: 'session-management' } },
  { path: 'password-policies', component: SecurityDetail, data: { tab: 'password-policies' } },
  { path: 'ip-restrictions', component: SecurityDetail, data: { tab: 'ip-restrictions' } },
  { path: ':id', component: SecurityDetail },
];
