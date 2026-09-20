export interface InvoiceRecord {
  id: string;
  tenant: string;
  amount: string;
  issued: string;
  due: string;
  status: 'Paid' | 'Open' | 'Overdue' | 'Processing';
  updated: string;
}

export interface BillingActivity {
  event: string;
  actor: string;
  resource: string;
  status: 'Completed' | 'Review' | 'Blocked';
  updated: string;
}
