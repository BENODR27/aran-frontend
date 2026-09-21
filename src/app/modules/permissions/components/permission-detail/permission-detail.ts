import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { PermissionActivity, PermissionRecord } from '../../permission.model';
import { PermissionService } from '../../permission.service';
import { ApplicationService } from '../../../applications/application.service';

@Component({
  selector: 'app-permission-detail',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './permission-detail.html',
  styleUrl: './permission-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(PermissionService);
  protected readonly applicationService = inject(ApplicationService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly permission = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { name: '', resource: 'Users', action: 'Read', applicationId: '' };
  protected readonly validationError = signal('');
  protected readonly resourceGroups = [
    { name: 'Users', actions: ['Read', 'Create', 'Update', 'Delete', 'Manage'] },
    { name: 'Roles', actions: ['Read', 'Create', 'Update', 'Delete', 'Assign'] },
    { name: 'Applications', actions: ['Read', 'Configure', 'Rotate keys', 'Manage'] },
    { name: 'Audit Logs', actions: ['Read', 'Export', 'Purge'] },
  ] as const;
  protected readonly expandedResources = signal<Set<string>>(new Set(['Users']));
  protected readonly selectedActions = signal<Set<string>>(new Set(['Users: Read']));
  protected readonly tabs = [
    ['Overview', ''],
    ['Permission Catalog', 'catalog'],
    ['Permission Tree', 'tree'],
    ['Permission Matrix', 'matrix'],
  ] as const;
  protected readonly columns: readonly DataTableColumn<PermissionRecord>[] = [
    { key: 'name', header: 'Permission' },
    { key: 'resource', header: 'Resource' },
    { key: 'action', header: 'Action' },
    { key: 'roles', header: 'Roles' },
    { key: 'applications', header: 'Applications' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<PermissionActivity>[] = [
    { key: 'event', header: 'Event' },
    { key: 'actor', header: 'Actor' },
    { key: 'resource', header: 'Resource' },
    { key: 'status', header: 'Status' },
    { key: 'updated', header: 'Last updated' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Permission section';
  }

  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Active' || status === 'Completed') return 'success';
    if (status === 'Review') return 'warning';
    if (status === 'Inactive' || status === 'Blocked') return 'neutral';
    return 'info';
  }

  protected toggleResource(resource: string): void {
    this.expandedResources.update((items) => {
      const next = new Set(items);
      next.has(resource) ? next.delete(resource) : next.add(resource);
      return next;
    });
  }

  protected isResourceExpanded(resource: string): boolean { return this.expandedResources().has(resource); }
  protected isActionSelected(resource: string, action: string): boolean { return this.selectedActions().has(`${resource}: ${action}`); }
  protected checked(event: Event): boolean { return (event.target as HTMLInputElement).checked; }
  protected actionKey(resource: string, action: string): string { return `${resource.toLowerCase()}.${action.toLowerCase().replaceAll(' ', '-')}`; }

  protected toggleAction(resource: string, action: string, checked: boolean): void {
    const permission = `${resource}: ${action}`;
    this.selectedActions.update((items) => {
      const next = new Set(items);
      checked ? next.add(permission) : next.delete(permission);
      return next;
    });
  }

  protected isResourceSelected(resource: string, actions: readonly string[]): boolean {
    return actions.length > 0 && actions.every((action) => this.isActionSelected(resource, action));
  }

  protected toggleResourceActions(resource: string, actions: readonly string[], checked: boolean): void {
    this.selectedActions.update((items) => {
      const next = new Set(items);
      actions.forEach((action) => checked ? next.add(`${resource}: ${action}`) : next.delete(`${resource}: ${action}`));
      return next;
    });
  }

  protected save(): void {
    if (!this.form.applicationId) {
      this.validationError.set('Select an application before creating a permission.');
      return;
    }
    const selections = [...this.selectedActions()];
    const created = this.service.createSelected(this.form.name, selections.length ? selections : [`${this.form.resource}: ${this.form.action}`], [this.form.applicationId]);
    this.router.navigate(['/permissions', created[0].id]);
  }
}
