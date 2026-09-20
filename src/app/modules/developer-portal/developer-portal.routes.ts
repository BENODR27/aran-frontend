import { Routes } from '@angular/router';
import { DeveloperPage } from './developer-page';

export const DEVELOPER_PORTAL_ROUTES: Routes = [
  { path: '', component: DeveloperPage, data: { tab: 'api-docs' } },
  { path: 'api-docs', component: DeveloperPage, data: { tab: 'api-docs' } },
  { path: 'sdk-downloads', component: DeveloperPage, data: { tab: 'sdk-downloads' } },
  { path: 'oauth-management', component: DeveloperPage, data: { tab: 'oauth-management' } },
  { path: ':id', component: DeveloperPage },
];
