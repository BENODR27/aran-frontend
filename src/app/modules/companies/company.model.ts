export interface CompanyRecord {
  readonly id: string;
  readonly name: string;
  readonly tenantId: string;
  readonly tenant: string;
  readonly industry: string;
  readonly facilities: number;
  readonly users: number;
  readonly status: 'Active' | 'Review' | 'Suspended';
  readonly updated: string;
}

export interface CompanyActivity {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: 'Completed' | 'Review' | 'Blocked';
  readonly updated: string;
}
