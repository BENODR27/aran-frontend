import { Routes } from '@angular/router';
import { RolePage } from './role-page';

export const ROLES_ROUTES: Routes = [
  { path: '', component: RolePage },
  { path: 'create', component: RolePage, data: { mode: 'create' } },
  { path: ':id/permissions', component: RolePage, data: { tab: 'permissions' } },
  { path: ':id/applications', component: RolePage, data: { tab: 'applications' } },
  { path: ':id/features', component: RolePage, data: { tab: 'features' } },
  { path: ':id/facilities', component: RolePage, data: { tab: 'facilities' } },
  { path: ':id', component: RolePage },
];
