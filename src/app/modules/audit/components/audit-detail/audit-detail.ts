import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { AuditRecord } from '../../audit.model';
import { AuditService } from '../../audit.service';

@Component({
  selector: 'app-audit-detail',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './audit-detail.html',
  styleUrl: './audit-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditDetail {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(AuditService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly record = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected search = '';
  protected category = 'All categories';
  protected status = 'All statuses';
  protected readonly tabs = [['Audit Logs', 'logs'], ['Activity Timeline', 'timeline']] as const;
  protected readonly columns: readonly DataTableColumn<AuditRecord>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' },
    { key: 'category', header: 'Category' }, { key: 'status', header: 'Status' }, { key: 'timestamp', header: 'Timestamp' },
  ];

  protected get filteredRecords(): readonly AuditRecord[] {
    const query = this.search.trim().toLowerCase();
    return this.service.records().filter((item) => {
      const matchesSearch = !query || `${item.event} ${item.actor} ${item.resource} ${item.ipAddress}`.toLowerCase().includes(query);
      const matchesCategory = this.category === 'All categories' || item.category === this.category;
      const matchesStatus = this.status === 'All statuses' || item.status === this.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Audit Logs';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Success') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Failed') return 'neutral';
    return 'info';
  }
}

