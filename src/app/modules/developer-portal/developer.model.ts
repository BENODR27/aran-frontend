export interface DeveloperRecord {
  id: string;
  name: string;
  type: 'API documentation' | 'SDK' | 'OAuth application';
  version: string;
  language: string;
  status: 'Published' | 'Available' | 'Active' | 'Review';
  updated: string;
}

export interface DeveloperActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
