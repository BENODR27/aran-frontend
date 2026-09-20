export interface FeatureRecord {
  id: string;
  name: string;
  key: string;
  category: string;
  assignments: number;
  overrides: number;
  status: 'Enabled' | 'Disabled' | 'Scheduled' | 'Review';
  updated: string;
}

export interface FeatureActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
