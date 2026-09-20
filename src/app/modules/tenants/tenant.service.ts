import { Injectable, signal } from '@angular/core';
import { TenantActivity, TenantRecord } from './tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantService {
  readonly tenants = signal<TenantRecord[]>([
    { id: 'tenant-northstar', name: 'Northstar tenant', plan: 'Enterprise', users: 1248, companies: 12, status: 'Active', updated: 'Today, 16:12' },
    { id: 'tenant-cedar', name: 'Cedar Manufacturing', plan: 'Growth', users: 486, companies: 4, status: 'Active', updated: 'Yesterday, 14:48' },
    { id: 'tenant-atlas', name: 'Atlas Health Group', plan: 'Enterprise', users: 936, companies: 8, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'tenant-summit', name: 'Summit Logistics', plan: 'Starter', users: 84, companies: 2, status: 'Suspended', updated: 'Sep 14, 2026' },
  ]);

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
    this.tenants.update((items) => [tenant, ...items]);
    return tenant;
  }

  find(id: string | null): TenantRecord | undefined {
    return this.tenants().find((tenant) => tenant.id === id);
  }
}
