export interface SubscriptionRecord {
  id: string;
  tenantId: string;
  companyId: string;
  facilityId: string;
  facilityIds: readonly string[];
  tenant: string;
  company: string;
  facility: string;
  facilities: readonly string[];
  plan: string;
  seats: number;
  maxUsers: number;
  usage: string;
  renewal: string;
  status: 'Active' | 'Trial' | 'Past due' | 'Cancelled';
  updated: string;
}

export interface SubscriptionActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
