import { Injectable, signal } from '@angular/core';
import { PermissionActivity, PermissionRecord } from './permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  readonly permissions = signal<PermissionRecord[]>([
    { id: 'permission-users-read', name: 'Users: Read', resource: 'Users', action: 'Read', applicationIds: ['app-console', 'app-partner'], roles: 7, applications: 5, status: 'Active', updated: 'Today, 16:20' },
    { id: 'permission-users-manage', name: 'Users: Manage', resource: 'Users', action: 'Manage', applicationIds: ['app-console'], roles: 4, applications: 3, status: 'Active', updated: 'Today, 15:56' },
    { id: 'permission-audit-export', name: 'Audit Logs: Export', resource: 'Audit Logs', action: 'Export', applicationIds: ['app-console', 'app-legacy'], roles: 3, applications: 2, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'permission-billing-admin', name: 'Billing: Administer', resource: 'Billing', action: 'Administer', applicationIds: ['app-billing'], roles: 2, applications: 1, status: 'Inactive', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly PermissionActivity[] = [
    { event: 'Permission granted to role', actor: 'Maya Haddad', resource: 'Users: Manage', status: 'Completed', updated: 'Today, 16:20' },
    { event: 'Permission scope reviewed', actor: 'Security Team', resource: 'Audit Logs: Export', status: 'Review', updated: 'Today, 15:56' },
    { event: 'Permission revoked', actor: 'Omar Khalil', resource: 'Billing: Administer', status: 'Completed', updated: 'Today, 15:38' },
    { event: 'Permission catalog synchronized', actor: 'Platform Admin', resource: 'Users: Read', status: 'Completed', updated: 'Today, 15:14' },
    { event: 'Permission request blocked', actor: 'Policy Engine', resource: 'Billing: Administer', status: 'Blocked', updated: 'Today, 14:49' },
  ];

  create(name: string, resource: string, action: string, applicationIds: readonly string[]): PermissionRecord {
    const permission: PermissionRecord = {
      id: `permission-${Date.now()}`,
      name: name.trim() || `${resource.trim() || 'Resource'}: ${action.trim() || 'Read'}`,
      resource: resource.trim() || 'Unassigned resource',
      action: action.trim() || 'Read',
      applicationIds,
      roles: 0,
      applications: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.permissions.update((items) => [permission, ...items]);
    return permission;
  }

  createSelected(name: string, selections: readonly string[], applicationIds: readonly string[]): PermissionRecord[] {
    const created = selections.map((selection) => {
      const [resource, action] = selection.split(': ');
      return this.create(name && selections.length === 1 ? name : `${resource}: ${action}`, resource, action, applicationIds);
    });
    return created;
  }

  find(id: string | null): PermissionRecord | undefined {
    return this.permissions().find((permission) => permission.id === id);
  }
}
