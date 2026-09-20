export interface AuditRecord {
  id: string;
  event: string;
  actor: string;
  resource: string;
  category: 'Identity' | 'Security' | 'Authorization' | 'System' | 'Billing';
  ipAddress: string;
  status: 'Success' | 'Review' | 'Failed';
  timestamp: string;
  details: string;
}

export interface AuditMetric {
  label: string;
  value: string;
  tone: 'success' | 'warning' | 'info' | 'neutral';
}
