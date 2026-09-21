import { Routes } from '@angular/router';
import { NotificationList } from './components/notification-list/notification-list';
import { NotificationDetail } from './components/notification-detail/notification-detail';

export const NOTIFICATIONS_ROUTES: Routes = [
  { path: '', component: NotificationList },
  { path: 'templates', component: NotificationDetail, data: { tab: 'templates' } },
  { path: 'campaigns', component: NotificationDetail, data: { tab: 'campaigns' } },
  { path: 'history', component: NotificationDetail, data: { tab: 'history' } },
  { path: 'schedules', component: NotificationDetail, data: { tab: 'schedules' } },
  { path: ':id', component: NotificationDetail },
];
