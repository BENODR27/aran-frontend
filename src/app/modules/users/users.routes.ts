import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { UserCreate } from './components/user-create/user-create';
import { UserDetail } from './components/user-detail/user-detail';

export const USERS_ROUTES: Routes = [
  { path: '', component: UserList },
  { path: 'create', component: UserCreate, data: { mode: 'create' } },
  { path: ':id/profile', component: UserDetail, data: { tab: 'profile' } },
  { path: ':id/roles', component: UserDetail, data: { tab: 'roles' } },
  { path: ':id/permissions', component: UserDetail, data: { tab: 'permissions' } },
  { path: ':id/groups', component: UserDetail, data: { tab: 'groups' } },
  { path: ':id/sessions', component: UserDetail, data: { tab: 'sessions' } },
  { path: ':id/devices', component: UserDetail, data: { tab: 'devices' } },
  { path: ':id/activity', component: UserDetail, data: { tab: 'activity' } },
  { path: ':id/audit', component: UserDetail, data: { tab: 'audit' } },
  { path: ':id', component: UserDetail },
];
