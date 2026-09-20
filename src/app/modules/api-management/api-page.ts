import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../shared/components';
import { ApiActivity, ApiRecord } from './api.model';
import { ApiService } from './api.service';

@Component({
  selector: 'app-api-page',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './api-page.html',
  styleUrl: './api-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(ApiService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly record = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', owner: 'Northstar tenant', type: 'API key' as ApiRecord['type'] };
  protected readonly tabs = [['API Keys', 'api-keys'], ['OAuth', 'oauth-clients'], ['Webhooks', 'webhooks'], ['Tokens', 'tokens'], ['Analytics', 'analytics']] as const;
  protected readonly columns: readonly DataTableColumn<ApiRecord>[] = [
    { key: 'name', header: 'Credential' }, { key: 'type', header: 'Type' }, { key: 'owner', header: 'Owner' },
    { key: 'scope', header: 'Scope' }, { key: 'requests', header: 'Requests' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<ApiActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string { return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'API section'; }
  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Expiring' || status === 'Review') return 'warning';
    if (status === 'Revoked' || status === 'Paused' || status === 'Blocked') return 'neutral';
    return 'info';
  }
  protected save(): void {
    const created = this.service.create(this.form.name, this.form.owner, this.form.type);
    this.router.navigate(['/api-management', created.id]);
  }
}
