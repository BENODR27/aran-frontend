import { Routes } from '@angular/router';
import { UserPage } from './user-page';

export const USERS_ROUTES: Routes = [
  { path: '', component: UserPage },
  { path: 'create', component: UserPage, data: { mode: 'create' } },
  { path: ':id/profile', component: UserPage, data: { tab: 'profile' } },
  { path: ':id/roles', component: UserPage, data: { tab: 'roles' } },
  { path: ':id/permissions', component: UserPage, data: { tab: 'permissions' } },
  { path: ':id/groups', component: UserPage, data: { tab: 'groups' } },
  { path: ':id/sessions', component: UserPage, data: { tab: 'sessions' } },
  { path: ':id/devices', component: UserPage, data: { tab: 'devices' } },
  { path: ':id/activity', component: UserPage, data: { tab: 'activity' } },
  { path: ':id/audit', component: UserPage, data: { tab: 'audit' } },
  { path: ':id', component: UserPage, data: { tab: 'profile' } },
];
