import { Injectable, signal } from '@angular/core';
import { UserActivity, UserRecord } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly users = signal<UserRecord[]>([
    { id: 'user-maya', name: 'Maya Haddad', email: 'maya.haddad@northstar.example', tenantId: 'tenant-northstar', companyId: 'company-northstar', facilityIds: ['facility-amman'], applicationIds: ['app-console'], groupIds: ['group-admins'], passwordSet: true, tenant: 'Northstar tenant', role: 'Tenant Administrator', status: 'Active', lastLogin: 'Today, 16:12' },
    { id: 'user-omar', name: 'Omar Khalil', email: 'omar.khalil@cedar.example', tenantId: 'tenant-cedar', companyId: 'company-cedar', facilityIds: ['facility-irbid'], applicationIds: ['app-billing'], groupIds: ['group-finance'], passwordSet: true, tenant: 'Cedar tenant', role: 'Operations Manager', status: 'Active', lastLogin: 'Today, 15:48' },
    { id: 'user-lina', name: 'Lina Saad', email: 'lina.saad@atlas.example', tenantId: 'tenant-atlas', companyId: 'company-atlas', facilityIds: ['facility-zarqa'], applicationIds: ['app-partner'], groupIds: ['group-auditors'], passwordSet: false, tenant: 'Atlas tenant', role: 'Application Auditor', status: 'Pending', lastLogin: 'Invitation sent today' },
    { id: 'user-rami', name: 'Rami Saleh', email: 'rami.saleh@summit.example', tenantId: 'tenant-summit', companyId: 'company-summit', facilityIds: ['facility-aqaba'], applicationIds: ['app-legacy'], groupIds: ['group-contractors'], passwordSet: true, tenant: 'Summit tenant', role: 'Facility Manager', status: 'Suspended', lastLogin: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly UserActivity[] = [
    { event: 'MFA enrollment completed', actor: 'Maya Haddad', resource: 'Maya Haddad account', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Role assigned', actor: 'Omar Khalil', resource: 'Omar Khalil account', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Invitation pending', actor: 'Lina Saad', resource: 'Lina Saad account', status: 'Review', updated: 'Today, 15:21' },
    { event: 'User access suspended', actor: 'Platform Admin', resource: 'Rami Saleh account', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'Session revoked', actor: 'Security Team', resource: 'Rami Saleh account', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, email: string, password: string, tenantId: string, companyId: string, facilityIds: readonly string[], applicationIds: readonly string[], groupIds: readonly string[], tenant: string): UserRecord {
    const user: UserRecord = {
      id: `user-${Date.now()}`,
      name: name.trim() || 'New user',
      email: email.trim() || 'user@example.com',
      tenantId,
      companyId,
      facilityIds,
      applicationIds,
      groupIds,
      passwordSet: password.trim().length > 0,
      tenant: tenant.trim() || 'Unassigned tenant',
      role: 'Group-based access',
      status: 'Pending',
      lastLogin: 'Invitation sent just now',
    };
    this.users.update((items) => [user, ...items]);
    return user;
  }

  find(id: string | null): UserRecord | undefined {
    return this.users().find((user) => user.id === id);
  }
}
