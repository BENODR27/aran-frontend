import { Injectable, signal } from '@angular/core';
import { CompanyActivity, CompanyRecord } from './company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  readonly companies = signal<CompanyRecord[]>([
    { id: 'company-northstar', name: 'Northstar Holdings', tenantId: 'tenant-northstar', tenant: 'Northstar tenant', industry: 'Manufacturing', facilities: 5, users: 684, status: 'Active', updated: 'Today, 16:12' },
    { id: 'company-cedar', name: 'Cedar Manufacturing', tenantId: 'tenant-cedar', tenant: 'Cedar tenant', industry: 'Industrial production', facilities: 3, users: 312, status: 'Active', updated: 'Yesterday, 14:48' },
    { id: 'company-atlas', name: 'Atlas Health Group', tenantId: 'tenant-atlas', tenant: 'Atlas tenant', industry: 'Healthcare', facilities: 8, users: 936, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'company-summit', name: 'Summit Logistics', tenantId: 'tenant-summit', tenant: 'Summit tenant', industry: 'Logistics', facilities: 2, users: 84, status: 'Suspended', updated: 'Sep 14, 2026' },
  ]);

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
    this.companies.update((items) => [company, ...items]);
    return company;
  }

  find(id: string | null): CompanyRecord | undefined {
    return this.companies().find((company) => company.id === id);
  }
}
