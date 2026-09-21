import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { FacilityActivity, FacilityRecord } from '../../facility.model';
import { FacilityService } from '../../facility.service';
import { CompanyService } from '../../../companies/company.service';

@Component({
  selector: 'app-facility-create',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './facility-create.html',
  styleUrl: './facility-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacilityCreate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(FacilityService);
  protected readonly companyService = inject(CompanyService);
  protected readonly validationError = signal('');
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly facility = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', companyId: 'company-northstar', location: 'Amman, Jordan' };

  protected readonly tabs = [
    ['Overview', ''],
    ['Departments', 'departments'],
    ['Users', 'users'],
    ['Applications', 'applications'],
    ['Audit', 'audit'],
  ] as const;

  protected readonly columns: readonly DataTableColumn<FacilityRecord>[] = [
    { key: 'name', header: 'Facility' },
    { key: 'company', header: 'Company' },
    { key: 'location', header: 'Location' },
    { key: 'users', header: 'Users' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected readonly activityColumns: readonly DataTableColumn<FacilityActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Facility section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Inactive' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected save(): void {
    const company = this.companyService.find(this.form.companyId);
    if (!company) {
      this.validationError.set('Select a company before creating a facility.');
      return;
    }
    this.validationError.set('');
    const created = this.service.create(this.form.name, company.id, company.name, this.form.location);
    this.router.navigate(['/facilities', created.id]);
  }
}
