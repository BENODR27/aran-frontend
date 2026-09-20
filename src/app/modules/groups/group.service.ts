import { Injectable, signal } from '@angular/core';
import { GroupActivity, GroupRecord } from './group.model';

@Injectable({ providedIn: 'root' })
export class GroupService {
  readonly groups = signal<GroupRecord[]>([
    { id: 'group-admins', name: 'Tenant Administrators', tenant: 'Northstar tenant', applicationIds: ['app-console'], roleIds: ['role-platform-admin'], members: 18, roles: 3, status: 'Active', updated: 'Today, 16:12' },
    { id: 'group-finance', name: 'Finance Approvers', tenant: 'Cedar tenant', applicationIds: ['app-billing'], roleIds: ['role-billing-manager'], members: 24, roles: 2, status: 'Active', updated: 'Yesterday, 14:48' },
    { id: 'group-auditors', name: 'Read-only Auditors', tenant: 'Atlas tenant', applicationIds: ['app-partner'], roleIds: ['role-read-only'], members: 31, roles: 1, status: 'Review', updated: 'Sep 18, 2026' },
    { id: 'group-contractors', name: 'External Contractors', tenant: 'Summit tenant', applicationIds: ['app-legacy'], roleIds: ['role-read-only'], members: 7, roles: 1, status: 'Inactive', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly GroupActivity[] = [
    { event: 'User added to group', actor: 'Maya Haddad', resource: 'Tenant Administrators', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Role mapping changed', actor: 'Omar Khalil', resource: 'Finance Approvers', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Membership review opened', actor: 'Security Team', resource: 'Read-only Auditors', status: 'Review', updated: 'Today, 15:21' },
    { event: 'Group deactivated', actor: 'Platform Admin', resource: 'External Contractors', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'Facility scope updated', actor: 'Lina Saad', resource: 'Tenant Administrators', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, tenant: string, applicationIds: readonly string[], roleIds: readonly string[]): GroupRecord {
    const group: GroupRecord = {
      id: `group-${Date.now()}`,
      name: name.trim() || 'New group',
      tenant: tenant.trim() || 'Unassigned tenant',
      applicationIds,
      roleIds,
      members: 0,
      roles: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.groups.update((items) => [group, ...items]);
    return group;
  }

  find(id: string | null): GroupRecord | undefined {
    return this.groups().find((group) => group.id === id);
  }
}
