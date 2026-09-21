import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../shared/services/api/api-endpoints.constants';
import { TenantActivity, TenantRecord } from './tenant.model';
import { tenantActions } from './tenant.state';
import { AppState } from '../../app.state';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly store = inject(Store<AppState>);
  private readonly api = inject(ApiService);
  readonly tenants = toSignal(
    this.store.select((state: AppState): readonly TenantRecord[] => state.tenants.records),
    { initialValue: [] as readonly TenantRecord[] },
  );

  constructor() {
    this.api.list<TenantRecord[]>(API_ENDPOINTS.tenants).subscribe((tenants) => {
      this.store.dispatch(tenantActions.replace({ tenants }));
    });
  }

  readonly activity: readonly TenantActivity[] = [
    { event: 'Tenant administrator invited', actor: 'Maya Haddad', resource: 'Northstar tenant', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Subscription upgraded', actor: 'Omar Khalil', resource: 'Cedar Manufacturing', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Access review opened', actor: 'Security Team', resource: 'Atlas Health Group', status: 'Review', updated: 'Today, 15:21' },
    { event: 'Tenant access suspended', actor: 'Platform Admin', resource: 'Summit Logistics', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'Company added', actor: 'Lina Saad', resource: 'Northstar tenant', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, plan: string): TenantRecord {
    const tenant: TenantRecord = {
      id: `tenant-${Date.now()}`,
      name: name.trim() || 'New tenant',
      plan,
      users: 0,
      companies: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.store.dispatch(tenantActions.add({ tenant }));
    return tenant;
  }

  find(id: string | null): TenantRecord | undefined {
    return this.tenants().find((tenant) => tenant.id === id);
  }
}
