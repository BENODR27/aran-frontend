import { Routes } from '@angular/router';
import { ApiList } from './components/api-list/api-list';
import { ApiCreate } from './components/api-create/api-create';
import { ApiDetail } from './components/api-detail/api-detail';

export const API_MANAGEMENT_ROUTES: Routes = [
  { path: '', component: ApiList },
  { path: 'create', component: ApiCreate, data: { mode: 'create' } },
  { path: 'api-keys', component: ApiDetail, data: { tab: 'api-keys' } },
  { path: 'oauth-clients', component: ApiDetail, data: { tab: 'oauth-clients' } },
  { path: 'service-accounts', component: ApiDetail, data: { tab: 'service-accounts' } },
  { path: 'webhooks', component: ApiDetail, data: { tab: 'webhooks' } },
  { path: 'tokens', component: ApiDetail, data: { tab: 'tokens' } },
  { path: 'analytics', component: ApiDetail, data: { tab: 'analytics' } },
  { path: ':id', component: ApiDetail },
];
