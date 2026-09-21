import { createAction, createReducer, on, props } from '@ngrx/store';
import { FacilityRecord } from './facility.model';

export interface FacilityState {
  readonly records: readonly FacilityRecord[];
}

export const facilityActions = {
  replace: createAction('[Facilities] Replace facilities', props<{ facilities: readonly FacilityRecord[] }>()),
  add: createAction('[Facilities] Add facility', props<{ facility: FacilityRecord }>()),
};

const initialState: FacilityState = { records: [
  { id: 'facility-amman', name: 'Amman Central', companyId: 'company-northstar', company: 'Northstar Holdings', location: 'Amman, Jordan', users: 284, status: 'Active', updated: 'Today, 16:12' },
  { id: 'facility-irbid', name: 'Irbid North', companyId: 'company-cedar', company: 'Cedar Manufacturing', location: 'Irbid, Jordan', users: 146, status: 'Active', updated: 'Yesterday, 14:48' },
  { id: 'facility-zarqa', name: 'Zarqa Hub', companyId: 'company-atlas', company: 'Atlas Health Group', location: 'Zarqa, Jordan', users: 92, status: 'Review', updated: 'Sep 18, 2026' },
  { id: 'facility-aqaba', name: 'Aqaba South', companyId: 'company-summit', company: 'Summit Logistics', location: 'Aqaba, Jordan', users: 38, status: 'Inactive', updated: 'Sep 14, 2026' },
] };

export const facilitiesReducer = createReducer(
  initialState,
  on(facilityActions.replace, (state, { facilities }) => ({ ...state, records: facilities })),
  on(facilityActions.add, (state, { facility }) => ({ ...state, records: [facility, ...state.records] })),
);
