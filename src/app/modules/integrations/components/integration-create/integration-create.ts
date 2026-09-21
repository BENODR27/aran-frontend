import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { IntegrationActivity, IntegrationRecord } from '../../integration.model';
import { IntegrationService } from '../../integration.service';

@Component({
  selector: 'app-integration-create',
  imports: [ContentCard, DataTable, PageHeader, RouterLink, StatusBadge],
  templateUrl: './integration-create.html',
  styleUrl: './integration-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationCreate {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(IntegrationService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly integration = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly tabs = [['Providers', 'providers'], ['Connected Systems', 'connected'], ['Configuration', 'configuration']] as const;
  protected readonly columns: readonly DataTableColumn<IntegrationRecord>[] = [
    { key: 'provider', header: 'Provider' }, { key: 'type', header: 'Type' }, { key: 'tenant', header: 'Tenant' }, { key: 'lastSync', header: 'Last sync' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<IntegrationActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected getActiveTabTitle(): string { return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Integrations'; }
  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Connected' || status === 'Completed') return 'success';
    if (status === 'Pending' || status === 'Review') return 'warning';
    if (status === 'Error' || status === 'Disabled' || status === 'Blocked') return 'neutral';
    return 'info';
  }
}
