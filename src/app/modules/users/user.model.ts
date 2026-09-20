export interface UserRecord {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly tenantId: string;
  readonly companyId: string;
  readonly facilityIds: readonly string[];
  readonly applicationIds: readonly string[];
  readonly groupIds: readonly string[];
  readonly passwordSet: boolean;
  readonly tenant: string;
  readonly role: string;
  readonly status: 'Active' | 'Pending' | 'Suspended';
  readonly lastLogin: string;
}

export interface UserActivity {
  readonly event: string;
  readonly actor: string;
  readonly resource: string;
  readonly status: 'Completed' | 'Review' | 'Blocked';
  readonly updated: string;
}
