import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { BillingActivity, InvoiceRecord } from '../../billing.model';
import { BillingService } from '../../billing.service';

@Component({
  selector: 'app-billing-list',
  imports: [ContentCard, DataTable, PageHeader, RouterLink, StatusBadge],
  templateUrl: './billing-list.html',
  styleUrl: './billing-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingList {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(BillingService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly invoice = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly tabs = [['Overview', 'overview'], ['Invoices', 'invoices'], ['Payment Methods', 'payment-methods'], ['History', 'history']] as const;
  protected readonly invoiceColumns: readonly DataTableColumn<InvoiceRecord>[] = [
    { key: 'id', header: 'Invoice' }, { key: 'tenant', header: 'Tenant' }, { key: 'amount', header: 'Amount' }, { key: 'issued', header: 'Issued' }, { key: 'due', header: 'Due' }, { key: 'status', header: 'Status' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<BillingActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly paymentColumns: readonly DataTableColumn<{ id: string; tenant: string; type: string; expires: string; status: string; updated: string }>[] = [
    { key: 'tenant', header: 'Tenant' }, { key: 'type', header: 'Payment method' }, { key: 'expires', header: 'Expiry / verification' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Billing overview';
  }
  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Paid' || status === 'Completed' || status === 'Default') return 'success';
    if (status === 'Processing' || status === 'Open' || status === 'Review') return 'warning';
    if (status === 'Overdue' || status === 'Blocked') return 'neutral';
    return 'info';
  }
}

