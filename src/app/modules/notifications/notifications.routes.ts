import { Routes } from '@angular/router';
import { NotificationPage } from './notification-page';

export const NOTIFICATIONS_ROUTES: Routes = [
  { path: '', component: NotificationPage },
  { path: 'create', component: NotificationPage, data: { mode: 'create' } },
  { path: 'templates', component: NotificationPage, data: { tab: 'templates' } },
  { path: 'campaigns', component: NotificationPage, data: { tab: 'campaigns' } },
  { path: 'history', component: NotificationPage, data: { tab: 'history' } },
  { path: 'schedules', component: NotificationPage, data: { tab: 'schedules' } },
  { path: ':id', component: NotificationPage },
];
