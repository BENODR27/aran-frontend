import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ApiService } from '../../shared/services/api/api.service';
import { API_ENDPOINTS } from '../../shared/services/api/api-endpoints.constants';
import { ApplicationActivity, ApplicationRecord } from './application.model';
import { applicationActions } from './application.state';
import { AppState } from '../../app.state';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private readonly store = inject(Store<AppState>);
  private readonly api = inject(ApiService);
  readonly applications = toSignal(
    this.store.select((state: AppState): readonly ApplicationRecord[] => state.applications.records),
    { initialValue: [] as readonly ApplicationRecord[] },
  );

  constructor() {
    this.api.list<ApplicationRecord[]>(API_ENDPOINTS.applications).subscribe((applications) => {
      this.store.dispatch(applicationActions.replace({ applications }));
    });
  }

  readonly activity: readonly ApplicationActivity[] = [
    { event: 'Application registered', actor: 'Maya Haddad', resource: 'Operations Console', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Role mapping updated', actor: 'Omar Khalil', resource: 'Billing Gateway', status: 'Completed', updated: 'Today, 15:48' },
    { event: 'Permission review opened', actor: 'Security Team', resource: 'Partner Portal', status: 'Review', updated: 'Today, 15:21' },
    { event: 'Application access disabled', actor: 'Platform Admin', resource: 'Legacy Admin Portal', status: 'Blocked', updated: 'Today, 14:57' },
    { event: 'OAuth credentials rotated', actor: 'System automation', resource: 'Operations Console', status: 'Completed', updated: 'Today, 14:36' },
  ];

  create(name: string, type: string, tenant: string): ApplicationRecord {
    const application: ApplicationRecord = {
      id: `app-${Date.now()}`,
      name: name.trim() || 'New application',
      type,
      tenant: tenant.trim() || 'Unassigned tenant',
      users: 0,
      status: 'Active',
      updated: 'Just now',
    };
    this.store.dispatch(applicationActions.add({ application }));
    return application;
  }

  find(id: string | null): ApplicationRecord | undefined {
    return this.applications().find((application) => application.id === id);
  }
}
