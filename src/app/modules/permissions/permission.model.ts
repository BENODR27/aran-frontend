export interface PermissionRecord {
  id: string;
  name: string;
  resource: string;
  action: string;
  applicationIds: readonly string[];
  roles: number;
  applications: number;
  status: 'Active' | 'Review' | 'Inactive';
  updated: string;
}

export interface PermissionActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
