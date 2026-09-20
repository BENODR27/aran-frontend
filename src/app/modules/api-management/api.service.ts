import { Injectable, signal } from '@angular/core';
import { ApiActivity, ApiRecord } from './api.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly records = signal<ApiRecord[]>([
    { id: 'api-prod-key', name: 'Production platform key', type: 'API key', owner: 'Northstar tenant', scope: 'Full API', requests: '1.2M', status: 'Active', updated: 'Today, 16:35' },
    { id: 'api-analytics-oauth', name: 'Analytics OAuth client', type: 'OAuth client', owner: 'Cedar tenant', scope: 'Read analytics', requests: '428K', status: 'Active', updated: 'Today, 15:59' },
    { id: 'api-sync-account', name: 'Directory sync account', type: 'Service account', owner: 'Atlas tenant', scope: 'Users and groups', requests: '92K', status: 'Expiring', updated: 'Sep 18, 2026' },
    { id: 'api-events-hook', name: 'Security events webhook', type: 'Webhook', owner: 'Summit tenant', scope: 'Security events', requests: '18K', status: 'Paused', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly ApiActivity[] = [
    { event: 'API key rotated', actor: 'Maya Haddad', resource: 'Production platform key', status: 'Completed', updated: 'Today, 16:35' },
    { event: 'OAuth scope updated', actor: 'Omar Khalil', resource: 'Analytics OAuth client', status: 'Completed', updated: 'Today, 15:59' },
    { event: 'Service account expiry review', actor: 'Security Team', resource: 'Directory sync account', status: 'Review', updated: 'Today, 15:28' },
    { event: 'Webhook paused', actor: 'Platform Admin', resource: 'Security events webhook', status: 'Completed', updated: 'Today, 14:57' },
    { event: 'Token request blocked', actor: 'Policy Engine', resource: 'Directory sync account', status: 'Blocked', updated: 'Today, 14:26' },
  ];

  create(name: string, owner: string, type: ApiRecord['type'] = 'API key'): ApiRecord {
    const record: ApiRecord = {
      id: `api-${Date.now()}`,
      name: name.trim() || 'New API credential',
      type,
      owner: owner.trim() || 'Unassigned tenant',
      scope: 'Read only',
      requests: '0',
      status: 'Active',
      updated: 'Just now',
    };
    this.records.update((items) => [record, ...items]);
    return record;
  }

  find(id: string | null): ApiRecord | undefined {
    return this.records().find((record) => record.id === id);
  }
}
