import { Routes } from '@angular/router';
import { RoleList } from './components/role-list/role-list';
import { RoleCreate } from './components/role-create/role-create';
import { RoleDetail } from './components/role-detail/role-detail';

export const ROLES_ROUTES: Routes = [
  { path: '', component: RoleList },
  { path: 'create', component: RoleCreate, data: { mode: 'create' } },
  { path: ':id/permissions', component: RoleDetail, data: { tab: 'permissions' } },
  { path: ':id/applications', component: RoleDetail, data: { tab: 'applications' } },
  { path: ':id/features', component: RoleDetail, data: { tab: 'features' } },
  { path: ':id/facilities', component: RoleDetail, data: { tab: 'facilities' } },
  { path: ':id', component: RoleDetail },
];
