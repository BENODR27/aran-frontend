import { Routes } from '@angular/router';
import { ApplicationList } from './components/application-list/application-list';
import { ApplicationCreate } from './components/application-create/application-create';
import { ApplicationDetail } from './components/application-detail/application-detail';

export const APPLICATIONS_ROUTES: Routes = [
  { path: '', component: ApplicationList },
  { path: 'create', component: ApplicationCreate, data: { mode: 'create' } },
  { path: ':id/features', component: ApplicationDetail, data: { tab: 'features' } },
  { path: ':id/roles', component: ApplicationDetail, data: { tab: 'roles' } },
  { path: ':id/permissions', component: ApplicationDetail, data: { tab: 'permissions' } },
  { path: ':id/configuration', component: ApplicationDetail, data: { tab: 'configuration' } },
  { path: ':id', component: ApplicationDetail },
];
