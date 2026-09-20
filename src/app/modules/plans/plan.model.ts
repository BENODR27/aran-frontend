export interface PlanRecord {
  id: string;
  name: string;
  description: string;
  price: string;
  subscribers: number;
  features: number;
  status: 'Active' | 'Draft' | 'Archived';
  updated: string;
}

export interface PlanActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
