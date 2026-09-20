import { Injectable, signal } from '@angular/core';
import { FacilityActivity, FacilityRecord } from './facility.model';

@Injectable({ providedIn: 'root' })
export class FacilityService {
  readonly facilities = signal<FacilityRecord[]>([
    { id: 'facility-amman', name: 'Amman Central', companyId: 'company-northstar', company: 'Northstar Holdings', location: 'Amman, Jordan', users: 284, status: 'Active', updated: 'Today, 16:12' },
    { id: 'facility-irbid', name: 'Irbid North', companyId: 'company-cedar', company: 'Cedar Manufacturing', location: 'Irbid, Jordan', users: 146, status: 'Active', updated: 'Yesterday, 14:48' },
    { id: 'facility-zarqa', name: 'Zarqa Hub', companyId: 'company-atlas', company: 'Atlas Health Group', location: 'Zarqa, Jordan', users: 92, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'facility-aqaba', name: 'Aqaba South', companyId: 'company-summit', company: 'Summit Logistics', location: 'Aqaba, Jordan', users: 38, status: 'Inactive', updated: 'Sep 14, 2026' },
  ]);

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
    this.facilities.update((items) => [facility, ...items]);
    return facility;
  }

  find(id: string | null): FacilityRecord | undefined {
    return this.facilities().find((facility) => facility.id === id);
  }
}
