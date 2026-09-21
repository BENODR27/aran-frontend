import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { CompanyActivity, CompanyRecord } from '../../company.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-detail',
  imports: [ContentCard, DataTable, PageHeader, RouterLink, StatusBadge],
  templateUrl: './company-detail.html',
  styleUrl: './company-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(CompanyService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly companyId = this.route.snapshot.paramMap.get('id');
  protected readonly company = this.service.find(this.companyId);

  protected readonly tabs = [
    ['Overview', ''],
    ['Facilities', 'facilities'],
    ['Users', 'users'],
    ['Applications', 'applications'],
    ['Features', 'features'],
    ['Subscriptions', 'subscriptions'],
    ['Audit Logs', 'audit'],
  ] as const;

  protected readonly columns: readonly DataTableColumn<CompanyRecord>[] = [
    { key: 'name', header: 'Company' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'industry', header: 'Industry' },
    { key: 'facilities', header: 'Facilities' },
    { key: 'users', header: 'Users' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected readonly activityColumns: readonly DataTableColumn<CompanyActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Company section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Suspended' || status === 'Blocked') return 'neutral';
    return 'info';
  }
}
