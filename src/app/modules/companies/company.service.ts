import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../shared/services/api/api-endpoints.constants';
import { CompanyActivity, CompanyRecord } from './company.model';
import { companyActions } from './company.state';
import { AppState } from '../../app.state';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly store = inject(Store<AppState>);
  private readonly api = inject(ApiService);
  readonly companies = toSignal(
    this.store.select((state: AppState): readonly CompanyRecord[] => state.companies.records),
    { initialValue: [] as readonly CompanyRecord[] },
  );

  constructor() {
    this.api.list<CompanyRecord[]>(API_ENDPOINTS.companies).subscribe((companies) => {
      this.store.dispatch(companyActions.replace({ companies }));
    });
  }

  readonly activity: readonly CompanyActivity[] = [
    { event: 'Company administrator assigned', actor: 'Maya Haddad', resource: 'Northstar Holdings', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Facility access granted', actor: 'Omar Khalil', resource: 'Cedar Manufacturing', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'User access review opened', actor: 'Security Team', resource: 'Atlas Health Group', status: 'Review', updated: 'Today, 15:21' },
    { event: 'Company access suspended', actor: 'Platform Admin', resource: 'Summit Logistics', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'Application connected', actor: 'Lina Saad', resource: 'Northstar Holdings', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, tenantId: string, tenant: string, industry: string): CompanyRecord {
    const company: CompanyRecord = {
      id: `company-${Date.now()}`,
      name: name.trim() || 'New company',
      tenantId,
      tenant: tenant.trim() || 'Unassigned tenant',
      industry: industry.trim() || 'Other',
      facilities: 0,
      users: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.store.dispatch(companyActions.add({ company }));
    return company;
  }

  find(id: string | null): CompanyRecord | undefined {
    return this.companies().find((company) => company.id === id);
  }
}
