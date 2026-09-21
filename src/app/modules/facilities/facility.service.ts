import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../shared/services/api/api-endpoints.constants';
import { FacilityActivity, FacilityRecord } from './facility.model';
import { facilityActions } from './facility.state';
import { AppState } from '../../app.state';

@Injectable({ providedIn: 'root' })
export class FacilityService {
  private readonly store = inject(Store<AppState>);
  private readonly api = inject(ApiService);
  readonly facilities = toSignal(
    this.store.select((state: AppState): readonly FacilityRecord[] => state.facilities.records),
    { initialValue: [] as readonly FacilityRecord[] },
  );

  constructor() {
    this.api.list<FacilityRecord[]>(API_ENDPOINTS.facilities).subscribe((facilities) => {
      this.store.dispatch(facilityActions.replace({ facilities }));
    });
  }

  readonly activity: readonly FacilityActivity[] = [
    { event: 'Facility administrator assigned', actor: 'Maya Haddad', resource: 'Amman Central', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'User access granted', actor: 'Omar Khalil', resource: 'Irbid North', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Facility access review opened', actor: 'Security Team', resource: 'Zarqa Hub', status: 'Review', updated: 'Today, 15:21' },
    { event: 'Facility access disabled', actor: 'Platform Admin', resource: 'Aqaba South', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'Application scope updated', actor: 'Lina Saad', resource: 'Amman Central', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, companyId: string, company: string, location: string): FacilityRecord {
    const facility: FacilityRecord = {
      id: `facility-${Date.now()}`,
      name: name.trim() || 'New facility',
      companyId,
      company: company.trim() || 'Unassigned company',
      location: location.trim() || 'Location pending',
      users: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.store.dispatch(facilityActions.add({ facility }));
    return facility;
  }

  find(id: string | null): FacilityRecord | undefined {
    return this.facilities().find((facility) => facility.id === id);
  }
}
