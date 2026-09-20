import { Routes } from '@angular/router';
import { ApplicationPage } from './application-page';

export const APPLICATIONS_ROUTES: Routes = [
  { path: '', component: ApplicationPage },
  { path: 'create', component: ApplicationPage, data: { mode: 'create' } },
  { path: ':id/features', component: ApplicationPage, data: { tab: 'features' } },
  { path: ':id/roles', component: ApplicationPage, data: { tab: 'roles' } },
  { path: ':id/permissions', component: ApplicationPage, data: { tab: 'permissions' } },
  { path: ':id/configuration', component: ApplicationPage, data: { tab: 'configuration' } },
  { path: ':id', component: ApplicationPage },
];
