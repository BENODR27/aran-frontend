import { Routes } from '@angular/router';
import { PlanList } from './components/plan-list/plan-list';
import { PlanCreate } from './components/plan-create/plan-create';
import { PlanDetail } from './components/plan-detail/plan-detail';

export const PLANS_ROUTES: Routes = [
  { path: '', component: PlanList },
  { path: 'create', component: PlanCreate, data: { mode: 'create' } },
  { path: ':id/features', component: PlanDetail, data: { tab: 'features' } },
  { path: ':id/subscriptions', component: PlanDetail, data: { tab: 'subscriptions' } },
  { path: ':id/usage', component: PlanDetail, data: { tab: 'usage' } },
  { path: ':id', component: PlanDetail },
];
