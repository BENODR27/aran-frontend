export interface AdminMenuItem {
  readonly key: string;
  readonly label: string;
  readonly route: string;
  readonly icon: string;
  readonly description: string;
}

export interface AdminRecord {
  readonly id: string;
  readonly name: string;
  readonly status: 'Active' | 'Pending' | 'Suspended';
  readonly owner: string;
  readonly updated: string;
}

export interface PermissionSet {
  readonly read: boolean;
  readonly write: boolean;
  readonly update: boolean;
  readonly delete: boolean;
}
