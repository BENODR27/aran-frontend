import { Routes } from '@angular/router';
import { AuditList } from './components/audit-list/audit-list';
import { AuditDetail } from './components/audit-detail/audit-detail';

export const AUDIT_ROUTES: Routes = [
  { path: '', component: AuditList },
  { path: 'logs', component: AuditDetail, data: { tab: 'logs' } },
  { path: 'timeline', component: AuditDetail, data: { tab: 'timeline' } },
  { path: ':id', component: AuditDetail },
];
