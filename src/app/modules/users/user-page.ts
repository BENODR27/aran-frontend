import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../shared/components';
import { UserActivity, UserRecord } from './user.model';
import { UserService } from './user.service';
import { TenantService } from '../tenants/tenant.service';
import { CompanyService } from '../companies/company.service';
import { FacilityService } from '../facilities/facility.service';
import { ApplicationService } from '../applications/application.service';
import { GroupService } from '../groups/group.service';

@Component({
  selector: 'app-user-page',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(UserService);
  protected readonly tenantService = inject(TenantService);
  protected readonly companyService = inject(CompanyService);
  protected readonly facilityService = inject(FacilityService);
  protected readonly applicationService = inject(ApplicationService);
  protected readonly groupService = inject(GroupService);
  protected readonly selectedFacilityIds = signal<Set<string>>(new Set());
  protected readonly selectedApplicationIds = signal<Set<string>>(new Set());
  protected readonly selectedGroupIds = signal<Set<string>>(new Set());
  protected readonly validationError = signal('');
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly user = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', email: '', password: '', tenantId: 'tenant-northstar', companyId: 'company-northstar' };
  protected readonly tabs = [
    ['Profile', 'profile'],
    ['Roles', 'roles'],
    ['Permissions', 'permissions'],
    ['Groups', 'groups'],
    ['Sessions', 'sessions'],
    ['Devices', 'devices'],
    ['Activity', 'activity'],
    ['Audit Logs', 'audit'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<UserRecord>[] = [
    { key: 'name', header: 'User' },
    { key: 'email', header: 'Email' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'role', header: 'Primary role' },
    { key: 'status', header: 'Status' },
    { key: 'lastLogin', header: 'Last activity' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<UserActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'User profile';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Pending' || status === 'Review') return 'warning';
    if (status === 'Suspended' || status === 'Blocked') return 'neutral';
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
    this.selectedApplicationIds.set(new Set());
    this.selectedFacilityIds.set(new Set());
    this.selectedGroupIds.set(new Set());
  }

  protected onCompanyChange(): void {
    this.selectedFacilityIds.set(new Set());
    this.selectedGroupIds.set(new Set());
  }

  protected applicationsForTenant() {
    const tenant = this.tenantService.find(this.form.tenantId);
    return this.applicationService.applications().filter((application) => application.tenant === tenant?.name);
  }

  protected isApplicationSelected(id: string): boolean {
    return this.selectedApplicationIds().has(id);
  }

  protected toggleApplication(id: string, checked: boolean): void {
    this.selectedApplicationIds.update((current) => {
      const next = new Set(current);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
    this.selectedGroupIds.set(new Set());
  }

  protected groupsForApplication() {
    const tenant = this.tenantService.find(this.form.tenantId);
    return this.groupService.groups().filter((group) =>
      group.tenant === tenant?.name
      && group.applicationIds.length === 1
      && this.selectedApplicationIds().has(group.applicationIds[0])
    );
  }

  protected isGroupSelected(id: string): boolean {
    return this.selectedGroupIds().has(id);
  }

  protected toggleGroup(id: string, checked: boolean): void {
    this.selectedGroupIds.update((current) => {
      const next = new Set(current);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
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
    if (!tenant || !company || company.tenantId !== tenant.id || !this.selectedFacilityIds().size || !this.selectedApplicationIds().size) {
      this.validationError.set('Select a tenant, company, at least one facility, and at least one application.');
      return;
    }
    this.validationError.set('');
    const created = this.service.create(this.form.name, this.form.email, this.form.password, tenant.id, company.id, [...this.selectedFacilityIds()], [...this.selectedApplicationIds()], [...this.selectedGroupIds()], tenant.name);
    this.router.navigate(['/users', created.id]);
  }
}
