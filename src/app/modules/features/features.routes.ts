import { Routes } from '@angular/router';
import { FeaturePage } from './feature-page';

export const FEATURES_ROUTES: Routes = [
  { path: '', component: FeaturePage },
  { path: 'create', component: FeaturePage, data: { mode: 'create' } },
  { path: ':id/toggle', component: FeaturePage, data: { tab: 'toggle' } },
  { path: ':id/overrides', component: FeaturePage, data: { tab: 'overrides' } },
  { path: ':id/schedule', component: FeaturePage, data: { tab: 'schedule' } },
  { path: ':id/tenants', component: FeaturePage, data: { tab: 'tenants' } },
  { path: ':id/companies', component: FeaturePage, data: { tab: 'companies' } },
  { path: ':id', component: FeaturePage },
];
