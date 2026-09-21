import { createAction, createReducer, on, props } from '@ngrx/store';
import { CompanyRecord } from './company.model';

export interface CompanyState {
  readonly records: readonly CompanyRecord[];
}

export const companyActions = {
  replace: createAction('[Companies] Replace companies', props<{ companies: readonly CompanyRecord[] }>()),
  add: createAction('[Companies] Add company', props<{ company: CompanyRecord }>()),
};

const initialState: CompanyState = { records: [
  { id: 'company-northstar', name: 'Northstar Holdings', tenantId: 'tenant-northstar', tenant: 'Northstar tenant', industry: 'Manufacturing', facilities: 5, users: 684, status: 'Active', updated: 'Today, 16:12' },
  { id: 'company-cedar', name: 'Cedar Manufacturing', tenantId: 'tenant-cedar', tenant: 'Cedar tenant', industry: 'Industrial production', facilities: 3, users: 312, status: 'Active', updated: 'Yesterday, 14:48' },
  { id: 'company-atlas', name: 'Atlas Health Group', tenantId: 'tenant-atlas', tenant: 'Atlas tenant', industry: 'Healthcare', facilities: 8, users: 936, status: 'Review', updated: 'Sep 18, 2026' },
  { id: 'company-summit', name: 'Summit Logistics', tenantId: 'tenant-summit', tenant: 'Summit tenant', industry: 'Logistics', facilities: 2, users: 84, status: 'Suspended', updated: 'Sep 14, 2026' },
] };

export const companiesReducer = createReducer(
  initialState,
  on(companyActions.replace, (state, { companies }) => ({ ...state, records: companies })),
  on(companyActions.add, (state, { company }) => ({ ...state, records: [company, ...state.records] })),
);
