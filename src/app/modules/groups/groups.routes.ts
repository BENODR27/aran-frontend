import { Routes } from '@angular/router';
import { GroupList } from './components/group-list/group-list';
import { GroupCreate } from './components/group-create/group-create';
import { GroupDetail } from './components/group-detail/group-detail';

export const GROUPS_ROUTES: Routes = [
  { path: '', component: GroupList },
  { path: 'create', component: GroupCreate, data: { mode: 'create' } },
  { path: ':id/users', component: GroupDetail, data: { tab: 'users' } },
  { path: ':id/roles', component: GroupDetail, data: { tab: 'roles' } },
  { path: ':id/permissions', component: GroupDetail, data: { tab: 'permissions' } },
  { path: ':id/facilities', component: GroupDetail, data: { tab: 'facilities' } },
  { path: ':id', component: GroupDetail },
];
