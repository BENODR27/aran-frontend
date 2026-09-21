import { Routes } from '@angular/router';
import { DeveloperList } from './components/developer-list/developer-list';
import { DeveloperDetail } from './components/developer-detail/developer-detail';

export const DEVELOPER_PORTAL_ROUTES: Routes = [
  { path: '', component: DeveloperList },
  { path: 'api-docs', component: DeveloperDetail, data: { tab: 'api-docs' } },
  { path: 'sdk-downloads', component: DeveloperDetail, data: { tab: 'sdk-downloads' } },
  { path: 'oauth-management', component: DeveloperDetail, data: { tab: 'oauth-management' } },
  { path: ':id', component: DeveloperDetail },
];
