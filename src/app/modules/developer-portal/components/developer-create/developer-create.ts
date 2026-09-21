import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { DeveloperActivity, DeveloperRecord } from '../../developer.model';
import { DeveloperService } from '../../developer.service';

@Component({
  selector: 'app-developer-create',
  imports: [ContentCard, DataTable, PageHeader, RouterLink, StatusBadge],
  templateUrl: './developer-create.html',
  styleUrl: './developer-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperCreate {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(DeveloperService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly record = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly tabs = [['API Docs', 'api-docs'], ['SDK Downloads', 'sdk-downloads'], ['OAuth Management', 'oauth-management']] as const;
  protected readonly columns: readonly DataTableColumn<DeveloperRecord>[] = [
    { key: 'name', header: 'Resource' }, { key: 'type', header: 'Type' }, { key: 'version', header: 'Version' }, { key: 'language', header: 'Language' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<DeveloperActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected getActiveTabTitle(): string { return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Developer Portal'; }
  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Published' || status === 'Available' || status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Blocked') return 'neutral';
    return 'info';
  }
}
