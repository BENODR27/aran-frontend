import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { TenantActivity, TenantRecord } from '../../tenant.model';
import { TenantService } from '../../tenant.service';

@Component({
  selector: 'app-tenant-detail',
  imports: [ContentCard, DataTable, PageHeader, RouterLink, StatusBadge],
  templateUrl: './tenant-detail.html',
  styleUrl: './tenant-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(TenantService);
  protected readonly tenant = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly tabs = [
    ['Overview', ''], ['Companies', 'companies'], ['Applications', 'applications'],
    ['Subscriptions', 'subscriptions'], ['Users', 'users'], ['Audit Logs', 'audit'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<TenantRecord>[] = [
    { key: 'name', header: 'Tenant' }, { key: 'plan', header: 'Plan' }, { key: 'users', header: 'Users' },
    { key: 'companies', header: 'Companies' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<TenantActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Tenant section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Suspended' || status === 'Blocked') return 'neutral';
    return 'info';
  }
}
