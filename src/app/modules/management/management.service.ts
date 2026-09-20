import { Injectable, signal } from '@angular/core';
import { ManagementConfig, ManagementRow } from './management.model';

const names: Record<string, string> = {
  tenants: 'Tenants',
  companies: 'Companies',
  facilities: 'Facilities',
  users: 'Users',
  groups: 'Groups',
  roles: 'Roles',
  permissions: 'Permissions',
  applications: 'Applications',
  subscriptions: 'Subscriptions',
  features: 'Features',
  'api-management': 'API management',
  security: 'Security',
  audit: 'Audit log',
  notifications: 'Notifications',
  integrations: 'Integrations',
  'developer-portal': 'Developer portal',
  settings: 'Settings',
};

@Injectable({ providedIn: 'root' })
export class ManagementService {
  private readonly records = new Map<string, ReturnType<typeof signal<ManagementRow[]>>>();

  config(key: string): ManagementConfig {
    const title = names[key] ?? 'Management';
    const rows = this.recordsFor(key, title);
    return {
      key,
      title,
      eyebrow: 'Identity platform',
      description: `Manage ${title.toLowerCase()} and keep your access platform operating smoothly.`,
      columns: [
        { key: 'name', header: 'Name' },
        { key: 'status', header: 'Status' },
        { key: 'owner', header: 'Owner' },
        { key: 'updated', header: 'Last updated' },
      ],
      fields: [
        { key: 'name', label: `${title} name`, placeholder: `Enter a ${title.toLowerCase()} name` },
        { key: 'owner', label: 'Owner', placeholder: 'Assign an owner' },
        { key: 'status', label: 'Status', placeholder: 'Active' },
      ],
      tabs: this.tabsFor(key),
      rows: rows(),
    };
  }

  private tabsFor(key: string): readonly { label: string; path: string }[] {
    const tabs: Record<string, readonly { label: string; path: string }[]> = {
      tenants: [
        { label: 'Overview', path: '' },
        { label: 'Companies', path: 'companies' },
        { label: 'Applications', path: 'applications' },
        { label: 'Subscriptions', path: 'subscriptions' },
        { label: 'Users', path: 'users' },
        { label: 'Audit Logs', path: 'audit' },
      ],
      companies: [
        { label: 'Overview', path: '' },
        { label: 'Facilities', path: 'facilities' },
        { label: 'Users', path: 'users' },
        { label: 'Applications', path: 'applications' },
        { label: 'Features', path: 'features' },
        { label: 'Subscriptions', path: 'subscriptions' },
        { label: 'Audit Logs', path: 'audit' },
      ],
      facilities: [
        { label: 'Overview', path: '' },
        { label: 'Departments', path: 'departments' },
        { label: 'Users', path: 'users' },
        { label: 'Applications', path: 'applications' },
        { label: 'Audit', path: 'audit' },
      ],
      users: [
        { label: 'Profile', path: 'profile' },
        { label: 'Roles', path: 'roles' },
        { label: 'Permissions', path: 'permissions' },
        { label: 'Groups', path: 'groups' },
        { label: 'Sessions', path: 'sessions' },
        { label: 'Devices', path: 'devices' },
        { label: 'Activity', path: 'activity' },
        { label: 'Audit Logs', path: 'audit' },
      ],
      groups: [
        { label: 'Users', path: 'users' },
        { label: 'Roles', path: 'roles' },
        { label: 'Permissions', path: 'permissions' },
        { label: 'Facilities', path: 'facilities' },
      ],
      roles: [
        { label: 'Permissions', path: 'permissions' },
        { label: 'Applications', path: 'applications' },
        { label: 'Features', path: 'features' },
        { label: 'Facilities', path: 'facilities' },
      ],
      applications: [
        { label: 'Overview', path: '' },
        { label: 'Features', path: 'features' },
        { label: 'Roles', path: 'roles' },
        { label: 'Permissions', path: 'permissions' },
        { label: 'Configuration', path: 'configuration' },
      ],
      subscriptions: [
        { label: 'Overview', path: '' },
        { label: 'Invoices', path: 'invoices' },
        { label: 'Usage', path: 'usage' },
        { label: 'History', path: 'history' },
      ],
      integrations: [{ label: 'Configuration', path: 'configuration' }],
    };
    return tabs[key] ?? [];
  }

  create(key: string, name: string, owner: string, status: string): ManagementRow {
    const title = names[key] ?? 'Management';
    const rows = this.recordsFor(key, title);
    const record: ManagementRow = {
      id: `${key}-${Date.now()}`,
      name: name.trim() || `${title} resource`,
      status: status || 'Active',
      owner: owner.trim() || 'Current administrator',
      updated: 'Just now',
    };
    rows.update((current) => [record, ...current]);
    return record;
  }

  private recordsFor(key: string, title: string) {
    const existing = this.records.get(key);
    if (existing) return existing;

    const rows = signal(this.rowsFor(key, title));
    this.records.set(key, rows);
    return rows;
  }

  private rowsFor(key: string, title: string): ManagementRow[] {
    const moduleData: Record<string, readonly [string, string, string][]> = {
      tenants: [['Northstar tenant', 'Maya Haddad', 'Active'], ['Cedar Manufacturing', 'Omar Khalil', 'Active'], ['Atlas Health Group', 'Lina Saad', 'Review']],
      companies: [['Northstar Holdings', 'Maya Haddad', 'Active'], ['Cedar Manufacturing', 'Omar Khalil', 'Active'], ['Atlas Health Group', 'Lina Saad', 'Review']],
      facilities: [['Amman Central', 'Yousef Nasser', 'Active'], ['Irbid North', 'Rami Saleh', 'Active'], ['Zarqa Hub', 'Sara Mansour', 'Review']],
      users: [['Maya Haddad', 'Northstar tenant', 'Active'], ['Omar Khalil', 'Cedar Manufacturing', 'Active'], ['Lina Saad', 'Atlas Health Group', 'Review']],
      groups: [['Tenant administrators', 'Platform Admin', 'Active'], ['Finance approvers', 'Omar Khalil', 'Active'], ['Read-only auditors', 'Security Team', 'Review']],
      roles: [['Platform Administrator', 'Security Team', 'Active'], ['Tenant Administrator', 'Maya Haddad', 'Active'], ['Application Auditor', 'Lina Saad', 'Review']],
      permissions: [['users.manage', 'Identity service', 'Active'], ['roles.assign', 'Authorization service', 'Active'], ['audit.export', 'Audit service', 'Review']],
      applications: [['Operations Console', 'Platform Team', 'Active'], ['Billing Gateway', 'Finance Team', 'Active'], ['Partner Portal', 'Integrations Team', 'Review']],
      subscriptions: [['Enterprise plan', 'Northstar tenant', 'Active'], ['Growth plan', 'Cedar Manufacturing', 'Active'], ['Trial plan', 'Atlas Health Group', 'Review']],
      features: [['MFA enforcement', 'Security Team', 'Active'], ['SCIM provisioning', 'Identity service', 'Active'], ['Advanced audit export', 'Platform Admin', 'Review']],
      'api-management': [['Billing integration key', 'System automation', 'Active'], ['Partner OAuth client', 'Integrations Team', 'Active'], ['Legacy webhook token', 'Platform Admin', 'Inactive']],
      security: [['MFA policy', 'Security Team', 'Active'], ['Session protection', 'Identity service', 'Active'], ['IP restriction policy', 'Platform Admin', 'Review']],
      audit: [['Role policy review', 'Security Team', 'Review'], ['Quarterly access review', 'Platform Admin', 'Active'], ['Tenant export audit', 'Compliance Team', 'Active']],
      notifications: [['Access alert template', 'Security Team', 'Active'], ['Invitation campaign', 'Tenant Admins', 'Active'], ['Password expiry notice', 'Identity service', 'Review']],
      integrations: [['Microsoft Entra ID', 'Identity Team', 'Active'], ['Google Workspace', 'Identity Team', 'Active'], ['Okta Workforce', 'Integrations Team', 'Review']],
      'developer-portal': [['Public API documentation', 'Developer Experience', 'Active'], ['Node SDK package', 'Developer Experience', 'Active'], ['OAuth integration guide', 'Security Team', 'Review']],
      settings: [['General platform settings', 'Platform Admin', 'Active'], ['Email delivery settings', 'Operations Team', 'Active'], ['Localization settings', 'Platform Admin', 'Review']],
    };
    return (moduleData[key] ?? [
      [`Northstar ${title}`, 'Maya Haddad', 'Active'],
      [`Cedar ${title}`, 'Omar Khalil', 'Active'],
      [`Atlas ${title}`, 'Lina Saad', 'Review'],
    ]).map(([name, owner, status], index) => ({
      id: `${key}-${index + 1}`,
      name,
      status,
      owner,
      updated: index === 0 ? 'Today, 16:12' : index === 1 ? 'Yesterday, 14:48' : 'Sep 18, 2026',
    }));
  }
}
