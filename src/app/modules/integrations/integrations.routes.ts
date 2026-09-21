import { Routes } from '@angular/router';
import { IntegrationList } from './components/integration-list/integration-list';
import { IntegrationDetail } from './components/integration-detail/integration-detail';

export const INTEGRATIONS_ROUTES: Routes = [
  { path: '', component: IntegrationList },
  { path: 'providers', component: IntegrationDetail, data: { tab: 'providers' } },
  { path: 'connected', component: IntegrationDetail, data: { tab: 'connected' } },
  { path: 'configuration', component: IntegrationDetail, data: { tab: 'configuration' } },
  { path: ':id/configuration', component: IntegrationDetail, data: { tab: 'configuration' } },
  { path: ':id', component: IntegrationDetail },
];
