import { Injectable, signal } from '@angular/core';
import { ApplicationActivity, ApplicationRecord } from './application.model';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  readonly applications = signal<ApplicationRecord[]>([
    { id: 'app-console', name: 'Operations Console', type: 'Web application', tenant: 'Northstar tenant', users: 684, status: 'Active', updated: 'Today, 16:12' },
    { id: 'app-billing', name: 'Billing Gateway', type: 'OAuth client', tenant: 'Cedar tenant', users: 312, status: 'Active', updated: 'Yesterday, 14:48' },
    { id: 'app-partner', name: 'Partner Portal', type: 'SAML application', tenant: 'Atlas tenant', users: 936, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'app-legacy', name: 'Legacy Admin Portal', type: 'Web application', tenant: 'Summit tenant', users: 84, status: 'Inactive', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly ApplicationActivity[] = [
    { event: 'Application registered', actor: 'Maya Haddad', resource: 'Operations Console', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Role mapping updated', actor: 'Omar Khalil', resource: 'Billing Gateway', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Permission review opened', actor: 'Security Team', resource: 'Partner Portal', status: 'Review', updated: 'Today, 15:21' },
    { event: 'Application access disabled', actor: 'Platform Admin', resource: 'Legacy Admin Portal', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'OAuth credentials rotated', actor: 'System automation', resource: 'Operations Console', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, type: string, tenant: string): ApplicationRecord {
    const application: ApplicationRecord = {
      id: `app-${Date.now()}`,
      name: name.trim() || 'New application',
      type,
      tenant: tenant.trim() || 'Unassigned tenant',
      users: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.applications.update((items) => [application, ...items]);
    return application;
  }

  find(id: string | null): ApplicationRecord | undefined {
    return this.applications().find((application) => application.id === id);
  }
}
