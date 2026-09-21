import { Routes } from '@angular/router';
import { FacilityList } from './components/facility-list/facility-list';
import { FacilityCreate } from './components/facility-create/facility-create';
import { FacilityDetail } from './components/facility-detail/facility-detail';

export const FACILITIES_ROUTES: Routes = [
  { path: '', component: FacilityList },
  { path: 'create', component: FacilityCreate, data: { mode: 'create' } },
  { path: ':id/departments', component: FacilityDetail, data: { tab: 'departments' } },
  { path: ':id/users', component: FacilityDetail, data: { tab: 'users' } },
  { path: ':id/applications', component: FacilityDetail, data: { tab: 'applications' } },
  { path: ':id/audit', component: FacilityDetail, data: { tab: 'audit' } },
  { path: ':id', component: FacilityDetail },
];
