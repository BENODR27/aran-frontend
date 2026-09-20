import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActionToolbar, ContentCard, DataTable, PageHeader, StatusBadge } from '../../shared/components';
import { ManagementRow } from './management.model';
import { ManagementService } from './management.service';

@Component({
  selector: 'app-management-page',
  imports: [ActionToolbar, ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './management-page.html',
  styleUrl: './management-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ManagementService);
  protected readonly entity = this.route.snapshot.data['entity'] as string;
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly itemId = this.route.snapshot.paramMap.get('id');
  protected readonly config = this.service.config(this.entity);
  protected readonly columns = this.config.columns;
  protected readonly rows = this.config.rows;
  protected readonly form = { name: '', owner: '', status: 'Active' };

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Inactive') return 'neutral';
    return 'info';
  }

  protected selectedRow(): ManagementRow | undefined {
    return this.rows.find((row) => row.id === this.itemId);
  }

  protected save(): void {
    this.service.create(this.entity, this.form.name, this.form.owner, this.form.status);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
