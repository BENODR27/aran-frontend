import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../shared/components';
import { CompanyActivity, CompanyRecord } from './company.model';
import { CompanyService } from './company.service';
import { TenantService } from '../tenants/tenant.service';

@Component({
  selector: 'app-company-page',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './company-page.html',
  styleUrl: './company-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(CompanyService);
  protected readonly tenantService = inject(TenantService);
  protected readonly validationError = signal('');
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly companyId = this.route.snapshot.paramMap.get('id');
  protected readonly company = this.service.find(this.companyId);
  protected readonly form = { name: '', tenantId: 'tenant-northstar', industry: 'Manufacturing' };

  protected readonly tabs = [
    ['Overview', ''],
    ['Facilities', 'facilities'],
    ['Users', 'users'],
    ['Applications', 'applications'],
    ['Features', 'features'],
    ['Subscriptions', 'subscriptions'],
    ['Audit Logs', 'audit'],
  ] as const;

  protected readonly columns: readonly DataTableColumn<CompanyRecord>[] = [
    { key: 'name', header: 'Company' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'industry', header: 'Industry' },
    { key: 'facilities', header: 'Facilities' },
    { key: 'users', header: 'Users' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected readonly activityColumns: readonly DataTableColumn<CompanyActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Company section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Suspended' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected save(): void {
    const tenant = this.tenantService.find(this.form.tenantId);
    if (!tenant) {
      this.validationError.set('Select an active tenant before creating a company.');
      return;
    }
    this.validationError.set('');
    const created = this.service.create(this.form.name, tenant.id, tenant.name, this.form.industry);
    this.router.navigate(['/companies', created.id]);
  }
}
