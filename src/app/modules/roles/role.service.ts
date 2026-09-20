import { Injectable, signal } from '@angular/core';
import { RoleActivity, RoleRecord } from './role.model';

@Injectable({ providedIn: 'root' })
export class RoleService {
  readonly roles = signal<RoleRecord[]>([
    { id: 'role-platform-admin', name: 'Platform Administrator', tenant: 'Northstar tenant', permissions: 42, applicationIds: ['app-console', 'app-billing'], applications: 8, assignments: 12, status: 'Active', updated: 'Today, 16:18' },
    { id: 'role-security-operator', name: 'Security Operator', tenant: 'Cedar tenant', permissions: 28, applicationIds: ['app-console', 'app-partner'], applications: 5, assignments: 19, status: 'Active', updated: 'Today, 15:42' },
    { id: 'role-billing-manager', name: 'Billing Manager', tenant: 'Atlas tenant', permissions: 17, applicationIds: ['app-billing'], applications: 3, assignments: 8, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'role-read-only', name: 'Read-only Analyst', tenant: 'Summit tenant', permissions: 11, applicationIds: ['app-partner', 'app-legacy'], applications: 4, assignments: 31, status: 'Inactive', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly RoleActivity[] = [
    { event: 'Permission matrix updated', actor: 'Maya Haddad', resource: 'Platform Administrator', status: 'Completed', updated: 'Today, 16:18' },
    { event: 'Application access granted', actor: 'Omar Khalil', resource: 'Security Operator', status: 'Completed', updated: 'Today, 15:42' },
    { event: 'Role assignment review opened', actor: 'Security Team', resource: 'Billing Manager', status: 'Review', updated: 'Today, 15:19' },
    { event: 'Role deactivated', actor: 'Platform Admin', resource: 'Read-only Analyst', status: 'Blocked', updated: 'Today, 14:51' },
    { event: 'Facility scope changed', actor: 'Lina Saad', resource: 'Security Operator', status: 'Completed', updated: 'Today, 14:27' },
  ];

  create(name: string, tenant: string, permissionCount = 0, permissionIds: readonly string[] = [], applicationIds: readonly string[] = []): RoleRecord {
    const role: RoleRecord = {
      id: `role-${Date.now()}`,
      name: name.trim() || 'New role',
      tenant: tenant.trim() || 'Unassigned tenant',
      permissions: permissionCount,
      permissionIds,
      applicationIds,
      applications: 0,
      assignments: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.roles.update((items) => [role, ...items]);
    return role;
  }

  find(id: string | null): RoleRecord | undefined {
    return this.roles().find((role) => role.id === id);
  }
}
