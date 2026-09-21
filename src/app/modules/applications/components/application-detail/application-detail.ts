import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { ApplicationActivity, ApplicationRecord } from '../../application.model';
import { ApplicationService } from '../../application.service';

@Component({
  selector: 'app-application-detail',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './application-detail.html',
  styleUrl: './application-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(ApplicationService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly application = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', type: 'Web application', tenant: 'Northstar tenant' };
  protected readonly tabs = [
    ['Overview', ''],
    ['Features', 'features'],
    ['Roles', 'roles'],
    ['Permissions', 'permissions'],
    ['Configuration', 'configuration'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<ApplicationRecord>[] = [
    { key: 'name', header: 'Application' },
    { key: 'type', header: 'Type' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'users', header: 'Users' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<ApplicationActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Application section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Inactive' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected save(): void {
    const created = this.service.create(this.form.name, this.form.type, this.form.tenant);
    this.router.navigate(['/applications', created.id]);
  }
}

