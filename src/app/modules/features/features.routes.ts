import { Routes } from '@angular/router';
import { FeatureList } from './components/feature-list/feature-list';
import { FeatureCreate } from './components/feature-create/feature-create';
import { FeatureDetail } from './components/feature-detail/feature-detail';

export const FEATURES_ROUTES: Routes = [
  { path: '', component: FeatureList },
  { path: 'create', component: FeatureCreate, data: { mode: 'create' } },
  { path: ':id/toggle', component: FeatureDetail, data: { tab: 'toggle' } },
  { path: ':id/overrides', component: FeatureDetail, data: { tab: 'overrides' } },
  { path: ':id/schedule', component: FeatureDetail, data: { tab: 'schedule' } },
  { path: ':id/tenants', component: FeatureDetail, data: { tab: 'tenants' } },
  { path: ':id/companies', component: FeatureDetail, data: { tab: 'companies' } },
  { path: ':id', component: FeatureDetail },
];
