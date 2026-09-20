import { Injectable, signal } from '@angular/core';
import { BillingActivity, InvoiceRecord } from './billing.model';

@Injectable({ providedIn: 'root' })
export class BillingService {
  readonly invoices = signal<InvoiceRecord[]>([
    { id: 'INV-2026-1048', tenant: 'Northstar tenant', amount: '$2,400.00', issued: 'Sep 01, 2026', due: 'Oct 01, 2026', status: 'Processing', updated: 'Today, 16:46' },
    { id: 'INV-2026-1047', tenant: 'Cedar tenant', amount: '$899.00', issued: 'Sep 01, 2026', due: 'Oct 01, 2026', status: 'Paid', updated: 'Today, 15:53' },
    { id: 'INV-2026-1046', tenant: 'Atlas tenant', amount: '$299.00', issued: 'Aug 28, 2026', due: 'Sep 28, 2026', status: 'Overdue', updated: 'Today, 15:18' },
    { id: 'INV-2026-1045', tenant: 'Summit tenant', amount: '$899.00', issued: 'Sep 14, 2026', due: 'Oct 14, 2026', status: 'Open', updated: 'Sep 14, 2026' },
  ]);

  readonly activity: readonly BillingActivity[] = [
    { event: 'Invoice payment received', actor: 'Billing Automation', resource: 'INV-2026-1047', status: 'Completed', updated: 'Today, 15:53' },
    { event: 'Payment method updated', actor: 'Maya Haddad', resource: 'Northstar tenant', status: 'Completed', updated: 'Today, 15:42' },
    { event: 'Past-due invoice flagged', actor: 'Billing Automation', resource: 'INV-2026-1046', status: 'Review', updated: 'Today, 15:18' },
    { event: 'Invoice generated', actor: 'Billing Automation', resource: 'INV-2026-1048', status: 'Completed', updated: 'Today, 14:56' },
    { event: 'Payment retry blocked', actor: 'Payment Gateway', resource: 'Atlas tenant', status: 'Blocked', updated: 'Today, 14:29' },
  ];

  readonly metrics = {
    monthlyRevenue: '$38,460',
    outstanding: '$4,280',
    paidThisMonth: '$32,910',
    overdue: '3',
  };

  readonly paymentMethods = [
    { id: 'pm-visa', tenant: 'Northstar tenant', type: 'Visa ending 4242', expires: '09/28', status: 'Default', updated: 'Today, 15:42' },
    { id: 'pm-mastercard', tenant: 'Cedar tenant', type: 'Mastercard ending 1088', expires: '01/29', status: 'Default', updated: 'Sep 18, 2026' },
    { id: 'pm-bank', tenant: 'Atlas tenant', type: 'Bank transfer', expires: 'Verified', status: 'Review', updated: 'Sep 16, 2026' },
  ];

  find(id: string | null): InvoiceRecord | undefined {
    return this.invoices().find((invoice) => invoice.id === id);
  }
}
