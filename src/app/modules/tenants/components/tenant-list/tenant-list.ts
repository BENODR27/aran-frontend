import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader } from '../../../../shared/components';
import { TenantRecord } from '../../tenant.model';
import { TenantService } from '../../tenant.service';

@Component({
  selector: 'app-tenant-list',
  imports: [ContentCard, DataTable, PageHeader, RouterLink],
  templateUrl: './tenant-list.html',
  styleUrl: './tenant-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantList {
  protected readonly service = inject(TenantService);
  protected readonly columns: readonly DataTableColumn<TenantRecord>[] = [
    { key: 'name', header: 'Tenant' },
    { key: 'plan', header: 'Plan' },
    { key: 'users', header: 'Users' },
    { key: 'companies', header: 'Companies' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
}
