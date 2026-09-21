import { Routes } from '@angular/router';
import { CompanyCreate } from './components/company-create/company-create';
import { CompanyDetail } from './components/company-detail/company-detail';
import { CompanyList } from './components/company-list/company-list';

export const COMPANIES_ROUTES: Routes = [
  { path: '', component: CompanyList },
  { path: 'create', component: CompanyCreate },
  { path: ':id/facilities', component: CompanyDetail, data: { tab: 'facilities' } },
  { path: ':id/users', component: CompanyDetail, data: { tab: 'users' } },
  { path: ':id/applications', component: CompanyDetail, data: { tab: 'applications' } },
  { path: ':id/features', component: CompanyDetail, data: { tab: 'features' } },
  { path: ':id/subscriptions', component: CompanyDetail, data: { tab: 'subscriptions' } },
  { path: ':id/audit', component: CompanyDetail, data: { tab: 'audit' } },
  { path: ':id', component: CompanyDetail },
];
