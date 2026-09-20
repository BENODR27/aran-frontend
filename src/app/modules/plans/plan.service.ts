import { Injectable, signal } from '@angular/core';
import { PlanActivity, PlanRecord } from './plan.model';

@Injectable({ providedIn: 'root' })
export class PlanService {
  readonly plans = signal<PlanRecord[]>([
    { id: 'plan-starter', name: 'Starter', description: 'Core identity and access controls for growing teams.', price: '$299 / month', subscribers: 18, features: 24, status: 'Active', updated: 'Today, 16:26' },
    { id: 'plan-professional', name: 'Professional', description: 'Advanced governance and analytics for established organizations.', price: '$899 / month', subscribers: 42, features: 58, status: 'Active', updated: 'Today, 15:47' },
    { id: 'plan-enterprise', name: 'Enterprise', description: 'Complete IAM controls with dedicated security capabilities.', price: '$2,400 / month', subscribers: 12, features: 94, status: 'Active', updated: 'Sep 18, 2026' },
    { id: 'plan-legacy', name: 'Legacy Basic', description: 'Archived plan retained for historical subscriptions.', price: '$149 / month', subscribers: 0, features: 16, status: 'Archived', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly PlanActivity[] = [
    { event: 'Plan feature updated', actor: 'Maya Haddad', resource: 'Enterprise', status: 'Completed', updated: 'Today, 16:26' },
    { event: 'Pricing review opened', actor: 'Finance Team', resource: 'Professional', status: 'Review', updated: 'Today, 15:47' },
    { event: 'Feature entitlement published', actor: 'Omar Khalil', resource: 'Starter', status: 'Completed', updated: 'Today, 15:18' },
    { event: 'Legacy plan archived', actor: 'Platform Admin', resource: 'Legacy Basic', status: 'Completed', updated: 'Today, 14:54' },
    { event: 'Plan change blocked', actor: 'Policy Engine', resource: 'Legacy Basic', status: 'Blocked', updated: 'Today, 14:22' },
  ];

  create(name: string, description: string, price: string): PlanRecord {
    const plan: PlanRecord = {
      id: `plan-${Date.now()}`,
      name: name.trim() || 'New plan',
      description: description.trim() || 'New subscription plan.',
      price: price.trim() || '$0 / month',
      subscribers: 0,
      features: 0,
      status: 'Draft',
      updated: 'Just now',
    };
    this.plans.update((items) => [plan, ...items]);
    return plan;
  }

  find(id: string | null): PlanRecord | undefined {
    return this.plans().find((plan) => plan.id === id);
  }
}
