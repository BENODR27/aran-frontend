import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { FeatureActivity, FeatureRecord } from '../../feature.model';
import { FeatureService } from '../../feature.service';

@Component({
  selector: 'app-feature-list',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './feature-list.html',
  styleUrl: './feature-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureList {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(FeatureService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly feature = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', key: '', category: 'Security' };
  protected readonly tabs = [
    ['Overview', ''],
    ['Enable / Disable', 'toggle'],
    ['Overrides', 'overrides'],
    ['Schedule', 'schedule'],
    ['Tenant Assignment', 'tenants'],
    ['Company Assignment', 'companies'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<FeatureRecord>[] = [
    { key: 'name', header: 'Feature' },
    { key: 'key', header: 'Feature key' },
    { key: 'category', header: 'Category' },
    { key: 'assignments', header: 'Assignments' },
    { key: 'overrides', header: 'Overrides' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<FeatureActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Feature section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Enabled' || status === 'Completed') return 'success';
    if (status === 'Scheduled' || status === 'Review') return 'warning';
    if (status === 'Disabled' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected save(): void {
    const created = this.service.create(this.form.name, this.form.key, this.form.category);
    this.router.navigate(['/features', created.id]);
  }
}
