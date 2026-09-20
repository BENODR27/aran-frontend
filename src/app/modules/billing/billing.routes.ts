import { Routes } from '@angular/router';
import { BillingPage } from './billing-page';

export const BILLING_ROUTES: Routes = [
  { path: '', component: BillingPage, data: { tab: 'overview' } },
  { path: 'overview', component: BillingPage, data: { tab: 'overview' } },
  { path: 'invoices', component: BillingPage, data: { tab: 'invoices' } },
  { path: 'payment-methods', component: BillingPage, data: { tab: 'payment-methods' } },
  { path: 'history', component: BillingPage, data: { tab: 'history' } },
  { path: ':id', component: BillingPage },
];
