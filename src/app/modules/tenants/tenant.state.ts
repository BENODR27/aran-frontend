import { createAction, createReducer, on, props } from '@ngrx/store';
import { TenantRecord } from './tenant.model';

export interface TenantState {
  readonly records: readonly TenantRecord[];
}

export const tenantActions = {
  replace: createAction('[Tenants] Replace tenants', props<{ tenants: readonly TenantRecord[] }>()),
  add: createAction('[Tenants] Add tenant', props<{ tenant: TenantRecord }>()),
};

const initialState: TenantState = { records: [
  { id: 'tenant-northstar', name: 'Northstar tenant', plan: 'Enterprise', users: 1248, companies: 12, status: 'Active', updated: 'Today, 16:12' },
  { id: 'tenant-cedar', name: 'Cedar Manufacturing', plan: 'Growth', users: 486, companies: 4, status: 'Active', updated: 'Yesterday, 14:48' },
  { id: 'tenant-atlas', name: 'Atlas Health Group', plan: 'Enterprise', users: 936, companies: 8, status: 'Review', updated: 'Sep 18, 2026' },
  { id: 'tenant-summit', name: 'Summit Logistics', plan: 'Starter', users: 84, companies: 2, status: 'Suspended', updated: 'Sep 14, 2026' },
] };

export const tenantsReducer = createReducer(
  initialState,
  on(tenantActions.replace, (state, { tenants }) => ({ ...state, records: tenants })),
  on(tenantActions.add, (state, { tenant }) => ({ ...state, records: [tenant, ...state.records] })),
);
