export interface ApplicationRecord {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly tenant: string;
  readonly users: number;
  readonly status: 'Active' | 'Review' | 'Inactive';
  readonly updated: string;
}

export interface ApplicationActivity {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: 'Completed' | 'Review' | 'Blocked';
  readonly updated: string;
}
