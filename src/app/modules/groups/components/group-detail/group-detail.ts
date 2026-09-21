import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { GroupActivity, GroupRecord } from '../../group.model';
import { GroupService } from '../../group.service';
import { ApplicationService } from '../../../applications/application.service';
import { RoleService } from '../../../roles/role.service';

@Component({
  selector: 'app-group-detail',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './group-detail.html',
  styleUrl: './group-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(GroupService);
  protected readonly applicationService = inject(ApplicationService);
  protected readonly roleService = inject(RoleService);
  protected readonly selectedApplicationIds = signal<Set<string>>(new Set());
  protected readonly selectedRoleIds = signal<Set<string>>(new Set());
  protected readonly validationError = signal('');
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly group = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', tenant: 'Northstar tenant' };
  protected readonly tabs = [
    ['Overview', ''],
    ['Users', 'users'],
    ['Roles', 'roles'],
    ['Permissions', 'permissions'],
    ['Facilities', 'facilities'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<GroupRecord>[] = [
    { key: 'name', header: 'Group' },
    { key: 'tenant', header: 'Tenant' },
    { key: 'members', header: 'Members' },
    { key: 'roles', header: 'Roles' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<GroupActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Group section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Inactive' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected isApplicationSelected(id: string): boolean { return this.selectedApplicationIds().has(id); }
  protected isRoleSelected(id: string): boolean { return this.selectedRoleIds().has(id); }
  protected rolesForApplication(applicationId: string) {
    return this.roleService.roles().filter((role) => role.applicationIds.includes(applicationId));
  }
  protected toggleApplication(id: string, checked: boolean): void {
    this.selectedApplicationIds.update((current) => {
      const next = new Set(current);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
    if (!checked) {
      const roleIds = this.rolesForApplication(id).map((role) => role.id);
      this.selectedRoleIds.update((current) => {
        const next = new Set(current);
        roleIds.forEach((roleId) => next.delete(roleId));
        return next;
      });
    }
  }
  protected toggleRole(id: string, checked: boolean): void {
    this.selectedRoleIds.update((current) => {
      const next = new Set(current);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  }
  protected checked(event: Event): boolean { return (event.target as HTMLInputElement).checked; }

  protected save(): void {
    if (!this.selectedApplicationIds().size || !this.selectedRoleIds().size) {
      this.validationError.set('Select at least one application and one role from the selected applications.');
      return;
    }
    this.validationError.set('');
    const created = this.service.create(this.form.name, this.form.tenant, [...this.selectedApplicationIds()], [...this.selectedRoleIds()]);
    this.router.navigate(['/groups', created.id]);
  }
}
