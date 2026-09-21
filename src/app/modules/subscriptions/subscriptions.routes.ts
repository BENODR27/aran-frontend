import { Routes } from '@angular/router';
import { SubscriptionList } from './components/subscription-list/subscription-list';
import { SubscriptionCreate } from './components/subscription-create/subscription-create';
import { SubscriptionDetail } from './components/subscription-detail/subscription-detail';

export const SUBSCRIPTIONS_ROUTES: Routes = [
  { path: '', component: SubscriptionList },
  { path: 'create', component: SubscriptionCreate, data: { mode: 'create' } },
  { path: 'plans', component: SubscriptionDetail, data: { tab: 'plans' } },
  { path: ':id/invoices', component: SubscriptionDetail, data: { tab: 'invoices' } },
  { path: ':id/usage', component: SubscriptionDetail, data: { tab: 'usage' } },
  { path: ':id/history', component: SubscriptionDetail, data: { tab: 'history' } },
  { path: ':id', component: SubscriptionDetail },
];
