import { Routes } from '@angular/router';
import { SubscriptionPage } from './subscription-page';

export const SUBSCRIPTIONS_ROUTES: Routes = [
  { path: '', component: SubscriptionPage },
  { path: 'create', component: SubscriptionPage, data: { mode: 'create' } },
  { path: 'plans', component: SubscriptionPage, data: { tab: 'plans' } },
  { path: ':id/invoices', component: SubscriptionPage, data: { tab: 'invoices' } },
  { path: ':id/usage', component: SubscriptionPage, data: { tab: 'usage' } },
  { path: ':id/history', component: SubscriptionPage, data: { tab: 'history' } },
  { path: ':id', component: SubscriptionPage },
];
