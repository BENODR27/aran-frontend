export interface SecurityRecord {
  id: string;
  subject: string;
  type: string;
  location: string;
  device: string;
  status: 'Active' | 'Blocked' | 'Review' | 'Locked';
  updated: string;
}

export interface SecurityActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
