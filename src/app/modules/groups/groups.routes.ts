import { Routes } from '@angular/router';
import { GroupPage } from './group-page';

export const GROUPS_ROUTES: Routes = [
  { path: '', component: GroupPage },
  { path: 'create', component: GroupPage, data: { mode: 'create' } },
  { path: ':id/users', component: GroupPage, data: { tab: 'users' } },
  { path: ':id/roles', component: GroupPage, data: { tab: 'roles' } },
  { path: ':id/permissions', component: GroupPage, data: { tab: 'permissions' } },
  { path: ':id/facilities', component: GroupPage, data: { tab: 'facilities' } },
  { path: ':id', component: GroupPage },
];
