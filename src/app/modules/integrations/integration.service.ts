import { Injectable, signal } from '@angular/core';
import { IntegrationActivity, IntegrationRecord } from './integration.model';

@Injectable({ providedIn: 'root' })
export class IntegrationService {
  readonly integrations = signal<IntegrationRecord[]>([
    { id: 'integration-entra', provider: 'Microsoft Entra ID', type: 'Identity provider', tenant: 'Northstar tenant', lastSync: 'Today, 16:41', status: 'Connected', updated: 'Today, 16:41' },
    { id: 'integration-google', provider: 'Google Workspace', type: 'Directory', tenant: 'Cedar tenant', lastSync: 'Today, 15:52', status: 'Connected', updated: 'Today, 15:52' },
    { id: 'integration-okta', provider: 'Okta', type: 'SAML', tenant: 'Atlas tenant', lastSync: 'Today, 14:18', status: 'Pending', updated: 'Sep 18, 2026' },
    { id: 'integration-ldap', provider: 'LDAP Directory', type: 'LDAP', tenant: 'Summit tenant', lastSync: 'Sep 12, 2026', status: 'Error', updated: 'Sep 14, 2026' },
  ]);
  readonly activity: readonly IntegrationActivity[] = [
    { event: 'Directory sync completed', actor: 'Integration Worker', resource: 'Microsoft Entra ID', status: 'Completed', updated: 'Today, 16:41' },
    { event: 'Provider configuration updated', actor: 'Maya Haddad', resource: 'Google Workspace', status: 'Completed', updated: 'Today, 15:52' },
    { event: 'SAML certificate review opened', actor: 'Security Team', resource: 'Okta', status: 'Review', updated: 'Today, 15:09' },
    { event: 'LDAP sync failed', actor: 'Integration Worker', resource: 'LDAP Directory', status: 'Blocked', updated: 'Today, 14:18' },
  ];
  readonly metrics = { connected: 2, pending: 1, errors: 1, syncedToday: '1,284' };
  find(id: string | null): IntegrationRecord | undefined { return this.integrations().find((item) => item.id === id); }
}
