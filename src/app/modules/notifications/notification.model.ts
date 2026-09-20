export interface NotificationRecord {
  id: string;
  subject: string;
  channel: 'Email' | 'SMS' | 'Push' | 'In-app';
  audience: string;
  delivered: string;
  status: 'Sent' | 'Scheduled' | 'Draft' | 'Failed';
  updated: string;
}

export interface NotificationActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
