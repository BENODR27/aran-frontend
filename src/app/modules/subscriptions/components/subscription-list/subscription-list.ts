import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { SubscriptionActivity, SubscriptionRecord } from '../../subscription.model';
import { SubscriptionService } from '../../subscription.service';
import { TenantService } from '../../../tenants/tenant.service';
import { CompanyService } from '../../../companies/company.service';
import { FacilityService } from '../../../facilities/facility.service';

@Component({
  selector: 'app-subscription-list',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './subscription-list.html',
  styleUrl: './subscription-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriptionList {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(SubscriptionService);
  protected readonly tenantService = inject(TenantService);
  protected readonly companyService = inject(CompanyService);
  protected readonly facilityService = inject(FacilityService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly subscription = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { tenantId: 'tenant-northstar', companyId: 'company-northstar', plan: 'Enterprise', maxUsers: 100 };
  protected readonly selectedFacilityIds = signal<Set<string>>(new Set(['facility-amman']));
  protected readonly validationError = signal('');
  protected readonly tabs = [
    ['Overview', ''],
    ['Plans', 'plans'],
    ['Invoices', 'invoices'],
    ['Usage', 'usage'],
    ['History', 'history'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<SubscriptionRecord>[] = [
    { key: 'tenant', header: 'Tenant' },
    { key: 'plan', header: 'Plan' },
    { key: 'seats', header: 'Seats' },
    { key: 'usage', header: 'Usage' },
    { key: 'renewal', header: 'Renewal' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<SubscriptionActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Subscription section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Trial' || status === 'Review') return 'warning';
    if (status === 'Past due' || status === 'Cancelled' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected companiesForTenant() {
    return this.companyService.companies().filter((company) => company.tenantId === this.form.tenantId);
  }

  protected facilitiesForCompany() {
    return this.facilityService.facilities().filter((facility) => facility.companyId === this.form.companyId);
  }

  protected onTenantChange(): void {
    const company = this.companiesForTenant()[0];
    this.form.companyId = company?.id ?? '';
    this.selectedFacilityIds.set(new Set(this.facilitiesForCompany()[0]?.id ? [this.facilitiesForCompany()[0].id] : []));
  }

  protected onCompanyChange(): void {
    this.selectedFacilityIds.set(new Set(this.facilitiesForCompany()[0]?.id ? [this.facilitiesForCompany()[0].id] : []));
  }

  protected isFacilitySelected(id: string): boolean {
    return this.selectedFacilityIds().has(id);
  }

  protected toggleFacility(id: string, checked: boolean): void {
    this.selectedFacilityIds.update((current) => {
      const next = new Set(current);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }

  protected checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  protected save(): void {
    const tenant = this.tenantService.find(this.form.tenantId);
    const company = this.companyService.find(this.form.companyId);
    const facilities = this.facilityService.facilities().filter((facility) => this.selectedFacilityIds().has(facility.id));
    if (!tenant || !company || company.tenantId !== tenant.id || !facilities.length || facilities.some((facility) => facility.companyId !== company.id) || !Number.isInteger(this.form.maxUsers) || this.form.maxUsers < 1) {
      this.validationError.set('Select a valid tenant, company, at least one facility, and maximum user count.');
      return;
    }
    this.validationError.set('');
    const created = this.service.create(tenant.id, company.id, facilities.map((facility) => facility.id), tenant.name, company.name, facilities.map((facility) => facility.name), this.form.plan, this.form.maxUsers);
    this.router.navigate(['/subscriptions', created.id]);
  }
}
