import { Routes } from '@angular/router';
import { TenantCreate } from './components/tenant-create/tenant-create';
import { TenantDetail } from './components/tenant-detail/tenant-detail';
import { TenantList } from './components/tenant-list/tenant-list';

export const TENANTS_ROUTES: Routes = [
  { path: '', component: TenantList },
  { path: 'create', component: TenantCreate },
  { path: ':id/companies', component: TenantDetail, data: { tab: 'companies' } },
  { path: ':id/applications', component: TenantDetail, data: { tab: 'applications' } },
  { path: ':id/subscriptions', component: TenantDetail, data: { tab: 'subscriptions' } },
  { path: ':id/users', component: TenantDetail, data: { tab: 'users' } },
  { path: ':id/audit', component: TenantDetail, data: { tab: 'audit' } },
  { path: ':id', component: TenantDetail },
];
