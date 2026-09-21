import { createAction, createReducer, on, props } from '@ngrx/store';
import { ApplicationRecord } from './application.model';

export interface ApplicationState {
  readonly records: readonly ApplicationRecord[];
}

export const applicationActions = {
  replace: createAction('[Applications] Replace applications', props<{ applications: readonly ApplicationRecord[] }>()),
  add: createAction('[Applications] Add application', props<{ application: ApplicationRecord }>()),
};

const initialState: ApplicationState = { records: [
  { id: 'app-console', name: 'Operations Console', type: 'Web application', tenant: 'Northstar tenant', users: 684, status: 'Active', updated: 'Today, 16:12' },
  { id: 'app-billing', name: 'Billing Gateway', type: 'OAuth client', tenant: 'Cedar tenant', users: 312, status: 'Active', updated: 'Yesterday, 14:48' },
  { id: 'app-partner', name: 'Partner Portal', type: 'SAML application', tenant: 'Atlas tenant', users: 936, status: 'Review', updated: 'Sep 18, 2026' },
  { id: 'app-legacy', name: 'Legacy Admin Portal', type: 'Web application', tenant: 'Summit tenant', users: 84, status: 'Inactive', updated: 'Sep 14, 2026' },
] };

export const applicationsReducer = createReducer(
  initialState,
  on(applicationActions.replace, (state, { applications }) => ({ ...state, records: applications })),
  on(applicationActions.add, (state, { application }) => ({ ...state, records: [application, ...state.records] })),
);
