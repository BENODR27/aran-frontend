import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../shared/components';
import { RoleActivity, RoleRecord } from './role.model';
import { RoleService } from './role.service';
import { ApplicationService } from '../applications/application.service';
import { PermissionService } from '../permissions/permission.service';
import { TenantService } from '../tenants/tenant.service';

@Component({
  selector: 'app-role-page',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './role-page.html',
  styleUrl: './role-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolePage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(RoleService);
  protected readonly applicationService = inject(ApplicationService);
  protected readonly permissionService = inject(PermissionService);
  protected readonly tenantService = inject(TenantService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly role = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', tenantId: 'tenant-northstar' };
  protected readonly selectedApplicationIds = signal<Set<string>>(new Set());
  protected readonly expandedGroups = signal<Set<string>>(new Set());
  protected readonly selectedPermissions = signal<Set<string>>(new Set());
  protected readonly validationError = signal('');
  protected readonly tabs = [
    ['Overview', ''],
    ['Permissions', 'permissions'],
    ['Applications', 'applications'],
    ['Features', 'features'],
    ['Facilities', 'facilities'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<RoleRecord>[] = [
    { key: 'name', header: 'Role' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'permissions', header: 'Permissions' },
    { key: 'applications', header: 'Applications' },
    { key: 'assignments', header: 'Assignments' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<RoleActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Role section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Inactive' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected toggleGroup(group: string): void {
    this.expandedGroups.update((items) => {
      const next = new Set(items);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  }

  protected isGroupExpanded(group: string): boolean { return this.expandedGroups().has(group); }

  protected isPermissionSelected(id: string): boolean { return this.selectedPermissions().has(id); }
  protected checked(event: Event): boolean { return (event.target as HTMLInputElement).checked; }
  protected isApplicationSelected(id: string): boolean { return this.selectedApplicationIds().has(id); }

  protected permissionGroups() {
    const selected = this.selectedApplicationIds();
    return this.permissionService.permissions()
      .filter((permission) => permission.applicationIds.some((applicationId) => selected.has(applicationId)))
      .reduce((groups, permission) => {
        const group = groups.find((item) => item.name === permission.resource);
        const item = { id: permission.id, label: permission.name };
        if (group) group.permissions.push(item);
        else groups.push({ name: permission.resource, permissions: [item] });
        return groups;
      }, [] as { name: string; permissions: { id: string; label: string }[] }[]);
  }

  protected toggleApplication(id: string, checked: boolean): void {
    this.selectedApplicationIds.update((items) => {
      const next = new Set(items);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
    if (!checked) {
      const available = new Set(this.permissionGroups().flatMap((group) => group.permissions.map((permission) => permission.id)));
      this.selectedPermissions.update((items) => new Set([...items].filter((permissionId) => available.has(permissionId))));
    }
    this.validationError.set('');
  }

  protected togglePermission(id: string, checked: boolean): void {
    this.selectedPermissions.update((items) => {
      const next = new Set(items);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
    this.validationError.set('');
  }

  protected isGroupSelected(group: readonly { id: string; label: string }[]): boolean {
    return group.length > 0 && group.every((permission) => this.isPermissionSelected(permission.id));
  }

  protected toggleGroupPermissions(group: readonly { id: string; label: string }[], checked: boolean): void {
    this.selectedPermissions.update((items) => {
      const next = new Set(items);
      group.forEach((permission) => checked ? next.add(permission.id) : next.delete(permission.id));
      return next;
    });
  }

  protected save(): void {
    const tenant = this.tenantService.find(this.form.tenantId);
    if (!tenant) {
      this.validationError.set('Select a tenant.');
      return;
    }
    if (!this.form.name.trim()) {
      this.validationError.set('Enter a role name.');
      return;
    }
    if (!this.selectedApplicationIds().size) {
      this.validationError.set('Select at least one application.');
      return;
    }
    if (!this.selectedPermissions().size) {
      this.validationError.set('Select at least one permission from the selected applications.');
      return;
    }
    this.validationError.set('');
    const created = this.service.create(this.form.name, tenant.name, this.selectedPermissions().size, [...this.selectedPermissions()], [...this.selectedApplicationIds()]);
    this.router.navigate(['/roles', created.id]);
  }
}
