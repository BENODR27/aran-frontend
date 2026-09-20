import { Routes } from '@angular/router';
import { CompanyPage } from './company-page';

export const COMPANIES_ROUTES: Routes = [
  { path: '', component: CompanyPage },
  { path: 'create', component: CompanyPage, data: { mode: 'create' } },
  { path: ':id/facilities', component: CompanyPage, data: { tab: 'facilities' } },
  { path: ':id/users', component: CompanyPage, data: { tab: 'users' } },
  { path: ':id/applications', component: CompanyPage, data: { tab: 'applications' } },
  { path: ':id/features', component: CompanyPage, data: { tab: 'features' } },
  { path: ':id/subscriptions', component: CompanyPage, data: { tab: 'subscriptions' } },
  { path: ':id/audit', component: CompanyPage, data: { tab: 'audit' } },
  { path: ':id', component: CompanyPage },
];
