import { Routes } from '@angular/router';
import { BillingList } from './components/billing-list/billing-list';
import { BillingDetail } from './components/billing-detail/billing-detail';

export const BILLING_ROUTES: Routes = [
  { path: '', component: BillingList, data: { tab: 'overview' } },
  { path: 'overview', component: BillingDetail, data: { tab: 'overview' } },
  { path: 'invoices', component: BillingDetail, data: { tab: 'invoices' } },
  { path: 'payment-methods', component: BillingDetail, data: { tab: 'payment-methods' } },
  { path: 'history', component: BillingDetail, data: { tab: 'history' } },
  { path: ':id', component: BillingDetail },
];
