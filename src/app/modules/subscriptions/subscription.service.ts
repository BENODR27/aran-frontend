import { Injectable, signal } from '@angular/core';
import { SubscriptionActivity, SubscriptionRecord } from './subscription.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  readonly subscriptions = signal<SubscriptionRecord[]>([
    { id: 'subscription-northstar', tenantId: 'tenant-northstar', companyId: 'company-northstar', facilityId: 'facility-amman', facilityIds: ['facility-amman'], tenant: 'Northstar tenant', company: 'Northstar Holdings', facility: 'Amman Central', facilities: ['Amman Central'], plan: 'Enterprise', seats: 250, maxUsers: 300, usage: '82%', renewal: 'Oct 01, 2026', status: 'Active', updated: 'Today, 16:24' },
    { id: 'subscription-cedar', tenantId: 'tenant-cedar', companyId: 'company-cedar', facilityId: 'facility-irbid', facilityIds: ['facility-irbid'], tenant: 'Cedar tenant', company: 'Cedar Manufacturing', facility: 'Irbid North', facilities: ['Irbid North'], plan: 'Professional', seats: 120, maxUsers: 180, usage: '64%', renewal: 'Oct 08, 2026', status: 'Active', updated: 'Today, 15:45' },
    { id: 'subscription-atlas', tenantId: 'tenant-atlas', companyId: 'company-atlas', facilityId: 'facility-zarqa', facilityIds: ['facility-zarqa'], tenant: 'Atlas tenant', company: 'Atlas Health Group', facility: 'Zarqa Hub', facilities: ['Zarqa Hub'], plan: 'Starter', seats: 40, maxUsers: 50, usage: '91%', renewal: 'Sep 28, 2026', status: 'Past due', updated: 'Sep 18, 2026' },
    { id: 'subscription-summit', tenantId: 'tenant-summit', companyId: 'company-summit', facilityId: 'facility-aqaba', facilityIds: ['facility-aqaba'], tenant: 'Summit tenant', company: 'Summit Logistics', facility: 'Aqaba South', facilities: ['Aqaba South'], plan: 'Professional', seats: 80, maxUsers: 120, usage: '38%', renewal: 'Nov 14, 2026', status: 'Trial', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly SubscriptionActivity[] = [
    { event: 'Subscription renewed', actor: 'Billing Automation', resource: 'Northstar tenant', status: 'Completed', updated: 'Today, 16:24' },
    { event: 'Seat allocation changed', actor: 'Maya Haddad', resource: 'Cedar tenant', status: 'Completed', updated: 'Today, 15:45' },
    { event: 'Payment review opened', actor: 'Billing Team', resource: 'Atlas tenant', status: 'Review', updated: 'Today, 15:17' },
    { event: 'Trial period extended', actor: 'Omar Khalil', resource: 'Summit tenant', status: 'Completed', updated: 'Today, 14:52' },
    { event: 'Invoice collection blocked', actor: 'Payment Gateway', resource: 'Atlas tenant', status: 'Blocked', updated: 'Today, 14:21' },
  ];

  create(tenantId: string, companyId: string, facilityIds: readonly string[], tenant: string, company: string, facilityNames: readonly string[], plan: string, maxUsers: number): SubscriptionRecord {
    const subscription: SubscriptionRecord = {
      id: `subscription-${Date.now()}`,
      tenantId,
      companyId,
      facilityId: facilityIds[0],
      facilityIds,
      tenant: tenant.trim() || 'Unassigned tenant',
      company: company.trim() || 'Unassigned company',
      facility: facilityNames[0] || 'Unassigned facility',
      facilities: facilityNames,
      plan: plan.trim() || 'Starter',
      seats: 0,
      maxUsers,
      usage: '0%',
      renewal: 'Not scheduled',
      status: 'Trial',
      updated: 'Just now',
    };
    this.subscriptions.update((items) => [subscription, ...items]);
    return subscription;
  }

  find(id: string | null): SubscriptionRecord | undefined {
    return this.subscriptions().find((subscription) => subscription.id === id);
  }
}
