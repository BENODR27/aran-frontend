import { DataTableColumn } from '../../shared/components';
import { ApiActivity, ApiRecord } from './api.model';

export const API_TABS = [
  ['API Keys', 'api-keys'],
  ['OAuth', 'oauth-clients'],
  ['Webhooks', 'webhooks'],
  ['Tokens', 'tokens'],
  ['Analytics', 'analytics'],
] as const;

export const API_COLUMNS: readonly DataTableColumn<ApiRecord>[] = [
  { key: 'name', header: 'Credential' },
  { key: 'type', header: 'Type' },
  { key: 'owner', header: 'Owner' },
  { key: 'scope', header: 'Scope' },
  { key: 'requests', header: 'Requests' },
  { key: 'status', header: 'Status' },
  { key: 'updated', header: 'Last updated' },
];

export const API_ACTIVITY_COLUMNS: readonly DataTableColumn<ApiActivity>[] = [
  { key: 'event', header: 'Event' },
  { key: 'actor', header: 'Actor' },
  { key: 'resource', header: 'Resource' },
  { key: 'status', header: 'Status' },
  { key: 'updated', header: 'Last updated' },
];

export function apiStatusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
  if (status === 'Active' || status === 'Completed') return 'success';
  if (status === 'Expiring' || status === 'Review') return 'warning';
  if (status === 'Revoked' || status === 'Paused' || status === 'Blocked') return 'neutral';
  return 'info';
}
