import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, PageHeader, StatusBadge } from '../../../../shared/components';
import { ApiRecord } from '../../api.model';
import { ApiService } from '../../api.service';
import { API_ACTIVITY_COLUMNS, API_COLUMNS, API_TABS, apiStatusTone } from '../../api.constants';

@Component({
  selector: 'app-api-create',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './api-create.html',
  styleUrl: './api-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiCreate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(ApiService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly record = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = {
    name: '',
    owner: 'Northstar tenant',
    type: 'API key' as ApiRecord['type'],
  };
  protected readonly tabs = API_TABS;
  protected readonly columns = API_COLUMNS;
  protected readonly activityColumns = API_ACTIVITY_COLUMNS;

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'API section';
  }
  protected statusTone = apiStatusTone;
  protected save(): void {
    const created = this.service.create(this.form.name, this.form.owner, this.form.type);
    this.router.navigate(['/api-management', created.id]);
  }
}
