export interface RoleRecord {
  id: string;
  name: string;
  tenant: string;
  permissions: number;
  permissionIds?: readonly string[];
  readonly applicationIds: readonly string[];
  applications: number;
  assignments: number;
  status: 'Active' | 'Review' | 'Inactive';
  updated: string;
}

export interface RoleActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
