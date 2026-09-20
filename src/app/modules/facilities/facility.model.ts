export interface FacilityRecord {
  readonly id: string;
  readonly name: string;
  readonly companyId: string;
  readonly company: string;
  readonly location: string;
  readonly users: number;
  readonly status: 'Active' | 'Review' | 'Inactive';
  readonly updated: string;
}

export interface FacilityActivity {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: 'Completed' | 'Review' | 'Blocked';
  readonly updated: string;
}
