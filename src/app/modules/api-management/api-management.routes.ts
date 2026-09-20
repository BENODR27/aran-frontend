import { Routes } from '@angular/router';
import { ApiPage } from './api-page';

export const API_MANAGEMENT_ROUTES: Routes = [
  { path: '', component: ApiPage },
  { path: 'create', component: ApiPage, data: { mode: 'create' } },
  { path: 'api-keys', component: ApiPage, data: { tab: 'api-keys' } },
  { path: 'oauth-clients', component: ApiPage, data: { tab: 'oauth-clients' } },
  { path: 'service-accounts', component: ApiPage, data: { tab: 'service-accounts' } },
  { path: 'webhooks', component: ApiPage, data: { tab: 'webhooks' } },
  { path: 'tokens', component: ApiPage, data: { tab: 'tokens' } },
  { path: 'analytics', component: ApiPage, data: { tab: 'analytics' } },
  { path: ':id', component: ApiPage },
];
