import { Routes } from '@angular/router';
import { PlanPage } from './plan-page';

export const PLANS_ROUTES: Routes = [
  { path: '', component: PlanPage },
  { path: 'create', component: PlanPage, data: { mode: 'create' } },
  { path: ':id/features', component: PlanPage, data: { tab: 'features' } },
  { path: ':id/subscriptions', component: PlanPage, data: { tab: 'subscriptions' } },
  { path: ':id/usage', component: PlanPage, data: { tab: 'usage' } },
  { path: ':id', component: PlanPage },
];
