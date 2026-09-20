import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActionToolbar,
  ContentCard,
  DataTable,
  DataTableColumn,
  PageHeader,
  StatusBadge,
} from '../../shared/components';

interface ActivityRow {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: string;
  readonly updated: string;
}

interface Metric {
  readonly label: string;
  readonly value: string;
  readonly change: string;
  readonly detail: string;
  readonly tone: 'success' | 'warning' | 'info';
}

@Component({
  selector: 'app-dashboard',
  imports: [ActionToolbar, ContentCard, DataTable, PageHeader, StatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly metrics: readonly Metric[] = [
    { label: 'Active tenants', value: '248', change: '+12.5%', detail: 'vs last month', tone: 'success' },
    { label: 'Registered users', value: '8,642', change: '+8.2%', detail: 'vs last month', tone: 'success' },
    { label: 'API availability', value: '99.98%', change: '+0.04%', detail: 'last 30 days', tone: 'info' },
    { label: 'Open issues', value: '12', change: '3 urgent', detail: 'require attention', tone: 'warning' },
  ];

  protected readonly activities: readonly ActivityRow[] = [
    { event: 'User invited', actor: 'Maya Haddad', resource: 'Northstar tenant', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Role assigned', actor: 'Omar Khalil', resource: 'Operations Admin role', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Permission updated', actor: 'Lina Saad', resource: 'Reports:export', status: 'Completed', updated: 'Today, 15:21' },
    { event: 'Login challenge failed', actor: 'Unknown actor', resource: 'Maya Haddad account', status: 'Attention', updated: 'Today, 14:57' },
    { event: 'Group membership changed', actor: 'Yousef Nasser', resource: 'Finance Approvers group', status: 'Completed', updated: 'Today, 14:36' },
    { event: 'API key rotated', actor: 'System automation', resource: 'Billing integration', status: 'Completed', updated: 'Today, 13:52' },
    { event: 'User access suspended', actor: 'Rami Saleh', resource: 'Former contractor account', status: 'Completed', updated: 'Today, 13:18' },
    { event: 'Tenant administrator created', actor: 'Platform Admin', resource: 'Cedar Manufacturing', status: 'Completed', updated: 'Today, 12:44' },
    { event: 'Role policy review started', actor: 'Security Team', resource: 'Tenant Admin role', status: 'In progress', updated: 'Today, 12:07' },
    { event: 'MFA enrollment completed', actor: 'Sara Mansour', resource: 'Sara Mansour account', status: 'Completed', updated: 'Today, 11:32' },
  ];

  protected readonly columns: readonly DataTableColumn<ActivityRow>[] = [
    { key: 'event', header: 'Event', width: '13rem' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected readonly reportBars = [
    { label: 'Tenant activity', value: 86, color: '#2563eb' },
    { label: 'API requests', value: 72, color: '#0ea5e9' },
    { label: 'Successful operations', value: 94, color: '#16a34a' },
    { label: 'Storage utilization', value: 58, color: '#f59e0b' },
  ];

  protected readonly analytics = [
    { label: 'Completed operations', value: '1,284', detail: 'This month', change: '+18.6%', tone: 'success' },
    { label: 'Average response time', value: '184 ms', detail: 'Across all APIs', change: '-12.4%', tone: 'success' },
    { label: 'Active facilities', value: '36 / 42', detail: '86% reporting today', change: '+4.2%', tone: 'info' },
  ];
}
