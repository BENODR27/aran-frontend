import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader } from '../../../../shared/components';
import { CompanyRecord } from '../../company.model';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-list',
  imports: [ContentCard, DataTable, PageHeader, RouterLink],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyList {
  protected readonly service = inject(CompanyService);

  protected readonly columns: readonly DataTableColumn<CompanyRecord>[] = [
    { key: 'name', header: 'Company' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'industry', header: 'Industry' },
    { key: 'facilities', header: 'Facilities' },
    { key: 'users', header: 'Users' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
}
