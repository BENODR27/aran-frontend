export interface GroupRecord {
  readonly id: string;
  readonly name: string;
  readonly tenant: string;
  readonly applicationIds: readonly string[];
  readonly roleIds: readonly string[];
  readonly members: number;
  readonly roles: number;
  readonly status: 'Active' | 'Review' | 'Inactive';
  readonly updated: string;
}

export interface GroupActivity {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: 'Completed' | 'Review' | 'Blocked';
  readonly updated: string;
}
