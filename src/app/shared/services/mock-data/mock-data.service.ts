import { Injectable, signal } from '@angular/core';
import type { AdminMenuItem, AdminRecord, PermissionSet } from './mock-data.model';

const ADMIN_MENU: readonly AdminMenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', route: '/dashboard', icon: '⌂', description: 'Platform overview and operational health.' },
  { key: 'tenant-management', label: 'Tenant Management', route: '/security/tenant-management', icon: '▣', description: 'Manage organizations and tenant boundaries.' },
  { key: 'companies', label: 'Companies', route: '/security/companies', icon: '▦', description: 'Manage companies and sub-companies.' },
  { key: 'facilities', label: 'Facilities', route: '/security/facilities', icon: '◈', description: 'Manage sites, units, and facilities.' },
  { key: 'applications', label: 'Applications', route: '/security/applications', icon: '◫', description: 'Manage connected applications.' },
  { key: 'users', label: 'Users', route: '/security/users', icon: '◉', description: 'Manage people and access.' },
  { key: 'groups', label: 'Groups', route: '/security/groups', icon: '◎', description: 'Organize users into groups.' },
  { key: 'roles', label: 'Roles', route: '/security/roles', icon: '◆', description: 'Define reusable access roles.' },
  { key: 'permissions', label: 'Permissions', route: '/security/permissions', icon: '◇', description: 'Control granular capabilities.' },
  { key: 'subscriptions', label: 'Subscriptions', route: '/security/subscriptions', icon: '▤', description: 'Manage tenant subscriptions.' },
  { key: 'plans', label: 'Plans', route: '/security/plans', icon: '▥', description: 'Configure commercial plans.' },
  { key: 'features', label: 'Features', route: '/security/features', icon: '✦', description: 'Configure feature entitlements.' },
  { key: 'api-management', label: 'API Management', route: '/security/api-management', icon: '⌘', description: 'Manage API keys and access.' },
  { key: 'security-center', label: 'Security Center', route: '/security/security-center', icon: '◉', description: 'Monitor security posture.' },
  { key: 'audit-logs', label: 'Audit Logs', route: '/security/audit-logs', icon: '≡', description: 'Review platform activity.' },
  { key: 'notifications', label: 'Notifications', route: '/security/notifications', icon: '♧', description: 'Configure notification channels.' },
  { key: 'billing', label: 'Billing', route: '/security/billing', icon: '$', description: 'Manage billing and invoices.' },
  { key: 'integrations', label: 'Integrations', route: '/security/integrations', icon: '↔', description: 'Connect external systems.' },
  { key: 'developer-portal', label: 'Developer Portal', route: '/security/developer-portal', icon: '</>', description: 'Developer tools and documentation.' },
  { key: 'system-settings', label: 'System Settings', route: '/security/system-settings', icon: '⚙', description: 'Configure global platform settings.' },
];

const DEFAULT_PERMISSIONS: PermissionSet = { read: true, write: true, update: true, delete: true };

@Injectable({ providedIn: 'root' })
export class MockDataService {
  readonly adminMenu = ADMIN_MENU;
  readonly permissions = signal<PermissionSet>(DEFAULT_PERMISSIONS);
  private readonly records = new Map<string, AdminRecord[]>();

  list(key: string): readonly AdminRecord[] {
    const existing = this.records.get(key);
    if (existing) return existing;
    const label = this.labelFor(key);
    const rows = [1, 2, 3, 4].map((index) => ({
      id: `${key.toUpperCase().slice(0, 4)}-${String(index).padStart(3, '0')}`,
      name: `${label} ${index}`,
      status: index === 3 ? 'Pending' : 'Active',
      owner: index % 2 === 0 ? 'Operations team' : 'Platform admin',
      updated: index === 1 ? 'Just now' : `${index} day${index > 2 ? 's' : ''} ago`,
    } satisfies AdminRecord));
    this.records.set(key, rows);
    return rows;
  }

  create(key: string): void {
    const rows = [...this.list(key)];
    const label = this.labelFor(key);
    rows.push({
      id: `${key.toUpperCase().slice(0, 4)}-${String(rows.length + 1).padStart(3, '0')}`,
      name: `${label} ${rows.length + 1}`,
      status: 'Active',
      owner: 'Current operator',
      updated: 'Just now',
    });
    this.records.set(key, rows);
  }

  remove(key: string, id: string): void {
    this.records.set(key, this.list(key).filter((record) => record.id !== id));
  }

  rename(key: string, id: string): void {
    const rows = this.list(key).map((record) =>
      record.id === id ? { ...record, name: `${record.name} (edited)`, updated: 'Just now' } : record,
    );
    this.records.set(key, rows);
  }

  updatePermission(operation: keyof PermissionSet, value: boolean): void {
    this.permissions.update((permissions) => ({ ...permissions, [operation]: value }));
  }

  private labelFor(key: string): string {
    return this.adminMenu.find((item) => item.key === key)?.label ?? key;
  }
}
