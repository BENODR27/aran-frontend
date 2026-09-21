import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { SecurityActivity, SecurityRecord } from '../../security.model';
import { SecurityService } from '../../security.service';

@Component({
  selector: 'app-security-create',
  imports: [ContentCard, DataTable, PageHeader, RouterLink, StatusBadge],
  templateUrl: './security-create.html',
  styleUrl: './security-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityCreate {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(SecurityService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly session = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly tabs = [['Dashboard', 'dashboard'], ['Sessions', 'session-management'], ['Password Policies', 'password-policies'], ['IP Restrictions', 'ip-restrictions']] as const;
  protected readonly columns: readonly DataTableColumn<SecurityRecord>[] = [
    { key: 'subject', header: 'Subject' }, { key: 'type', header: 'Type' }, { key: 'location', header: 'Location' }, { key: 'device', header: 'Device' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<SecurityActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly ipColumns: readonly DataTableColumn<{ id: string; name: string; range: string; scope: string; status: string; updated: string }>[] = [
    { key: 'name', header: 'Restriction' }, { key: 'range', header: 'IP range' }, { key: 'scope', header: 'Scope' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Security Center';
  }
  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Blocked' || status === 'Locked') return 'neutral';
    return 'info';
  }
}
