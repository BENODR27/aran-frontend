import { Routes } from '@angular/router';
import { PermissionList } from './components/permission-list/permission-list';
import { PermissionCreate } from './components/permission-create/permission-create';
import { PermissionDetail } from './components/permission-detail/permission-detail';

export const PERMISSIONS_ROUTES: Routes = [
  { path: '', component: PermissionList },
  { path: 'create', component: PermissionCreate, data: { mode: 'create' } },
  { path: ':id/catalog', component: PermissionDetail, data: { tab: 'catalog' } },
  { path: ':id/tree', component: PermissionDetail, data: { tab: 'tree' } },
  { path: ':id/matrix', component: PermissionDetail, data: { tab: 'matrix' } },
  { path: ':id', component: PermissionDetail },
];
