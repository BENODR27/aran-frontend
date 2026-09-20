import { Routes } from '@angular/router';
import { PermissionPage } from './permission-page';

export const PERMISSIONS_ROUTES: Routes = [
  { path: '', component: PermissionPage },
  { path: 'create', component: PermissionPage, data: { mode: 'create' } },
  { path: ':id/catalog', component: PermissionPage, data: { tab: 'catalog' } },
  { path: ':id/tree', component: PermissionPage, data: { tab: 'tree' } },
  { path: ':id/matrix', component: PermissionPage, data: { tab: 'matrix' } },
  { path: ':id', component: PermissionPage },
];
