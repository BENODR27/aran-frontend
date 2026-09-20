import { Routes } from '@angular/router';
import { IntegrationPage } from './integration-page';

export const INTEGRATIONS_ROUTES: Routes = [
  { path: '', component: IntegrationPage, data: { tab: 'providers' } },
  { path: 'create', redirectTo: 'providers', pathMatch: 'full' },
  { path: 'providers', component: IntegrationPage, data: { tab: 'providers' } },
  { path: 'connected', component: IntegrationPage, data: { tab: 'connected' } },
  { path: 'configuration', component: IntegrationPage, data: { tab: 'configuration' } },
  { path: ':id/configuration', component: IntegrationPage, data: { tab: 'configuration' } },
  { path: ':id', component: IntegrationPage },
];
