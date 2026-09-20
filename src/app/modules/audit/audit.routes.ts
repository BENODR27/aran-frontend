import { Routes } from '@angular/router';
import { AuditPage } from './audit-page';

export const AUDIT_ROUTES: Routes = [
  { path: '', component: AuditPage, data: { tab: 'logs' } },
  { path: 'logs', component: AuditPage, data: { tab: 'logs' } },
  { path: 'timeline', component: AuditPage, data: { tab: 'timeline' } },
  { path: ':id', component: AuditPage },
];
