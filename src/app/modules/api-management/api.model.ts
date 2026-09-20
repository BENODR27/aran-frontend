export interface ApiRecord {
  id: string;
  name: string;
  type: 'API key' | 'OAuth client' | 'Service account' | 'Webhook';
  owner: string;
  scope: string;
  requests: string;
  status: 'Active' | 'Expiring' | 'Revoked' | 'Paused';
  updated: string;
}

export interface ApiActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
