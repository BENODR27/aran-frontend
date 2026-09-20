import { Routes } from '@angular/router';
import { FacilityPage } from './facility-page';

export const FACILITIES_ROUTES: Routes = [
  { path: '', component: FacilityPage },
  { path: 'create', component: FacilityPage, data: { mode: 'create' } },
  { path: ':id/departments', component: FacilityPage, data: { tab: 'departments' } },
  { path: ':id/users', component: FacilityPage, data: { tab: 'users' } },
  { path: ':id/applications', component: FacilityPage, data: { tab: 'applications' } },
  { path: ':id/audit', component: FacilityPage, data: { tab: 'audit' } },
  { path: ':id', component: FacilityPage },
];
