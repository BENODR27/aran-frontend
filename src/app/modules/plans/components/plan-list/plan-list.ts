import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { PlanActivity, PlanRecord } from '../../plan.model';
import { PlanService } from '../../plan.service';

@Component({
  selector: 'app-plan-list',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './plan-list.html',
  styleUrl: './plan-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanList {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(PlanService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly plan = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', description: '', price: '$0 / month' };
  protected readonly tabs = [
    ['Overview', ''],
    ['Features', 'features'],
    ['Subscriptions', 'subscriptions'],
    ['Usage', 'usage'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<PlanRecord>[] = [
    { key: 'name', header: 'Plan' },
    { key: 'description', header: 'Description' },
    { key: 'price', header: 'Price' },
    { key: 'subscribers', header: 'Subscribers' },
    { key: 'features', header: 'Features' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<PlanActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Plan section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Draft' || status === 'Review') return 'warning';
    if (status === 'Archived' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected save(): void {
    const created = this.service.create(this.form.name, this.form.description, this.form.price);
    this.router.navigate(['/plans', created.id]);
  }
}
