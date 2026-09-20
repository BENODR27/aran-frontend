import { Routes } from '@angular/router';
import { TenantCreatePage } from './tenant-create-page';
import { TenantDetailPage } from './tenant-detail-page';
import { TenantListPage } from './tenant-list-page';

export const TENANTS_ROUTES: Routes = [
  { path: '', component: TenantListPage },
  { path: 'create', component: TenantCreatePage },
  { path: ':id/companies', component: TenantDetailPage, data: { tab: 'companies' } },
  { path: ':id/applications', component: TenantDetailPage, data: { tab: 'applications' } },
  { path: ':id/subscriptions', component: TenantDetailPage, data: { tab: 'subscriptions' } },
  { path: ':id/users', component: TenantDetailPage, data: { tab: 'users' } },
  { path: ':id/audit', component: TenantDetailPage, data: { tab: 'audit' } },
  { path: ':id', component: TenantDetailPage },
];
