export interface TenantRecord {
  readonly id: string;
  readonly name: string;
  readonly plan: string;
  readonly users: number;
  readonly companies: number;
  readonly status: 'Active' | 'Review' | 'Suspended';
  readonly updated: string;
}

export interface TenantActivity {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: 'Completed' | 'Review' | 'Blocked';
  readonly updated: string;
}
