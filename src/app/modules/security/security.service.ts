import { Injectable, signal } from '@angular/core';
import { SecurityActivity, SecurityRecord } from './security.model';

@Injectable({ providedIn: 'root' })
export class SecurityService {
  readonly sessions = signal<SecurityRecord[]>([
    { id: 'session-maya', subject: 'Maya Haddad', type: 'Administrator', location: 'Amman, JO', device: 'Chrome / macOS', status: 'Active', updated: 'Today, 16:38' },
    { id: 'session-omar', subject: 'Omar Khalil', type: 'Security Operator', location: 'Dubai, AE', device: 'Edge / Windows', status: 'Active', updated: 'Today, 16:21' },
    { id: 'session-lina', subject: 'Lina Saad', type: 'Company Admin', location: 'Riyadh, SA', device: 'Safari / iOS', status: 'Review', updated: 'Today, 15:46' },
    { id: 'session-bot', subject: 'Unknown device', type: 'Unrecognized', location: 'Frankfurt, DE', device: 'Chrome / Linux', status: 'Blocked', updated: 'Today, 14:59' },
  ]);

  readonly activity: readonly SecurityActivity[] = [
    { event: 'MFA challenge completed', actor: 'Maya Haddad', resource: 'Session session-maya', status: 'Completed', updated: 'Today, 16:38' },
    { event: 'Suspicious login reviewed', actor: 'Security Team', resource: 'Session session-lina', status: 'Review', updated: 'Today, 16:02' },
    { event: 'Device blocked', actor: 'Policy Engine', resource: 'Unknown device', status: 'Blocked', updated: 'Today, 14:59' },
    { event: 'Password policy published', actor: 'Platform Admin', resource: 'Global policy', status: 'Completed', updated: 'Today, 14:42' },
    { event: 'IP restriction updated', actor: 'Omar Khalil', resource: 'Corporate network', status: 'Completed', updated: 'Today, 14:18' },
  ];

  readonly metrics = {
    failedLogins: 27,
    lockedUsers: 4,
    blockedDevices: 9,
    activeSessions: 186,
    securityAlerts: 6,
  };

  readonly passwordPolicy = {
    minimumLength: 12,
    expirationDays: 90,
    historyCount: 8,
    mfaRequired: true,
  };

  readonly ipRestrictions = signal([
    { id: 'ip-corporate', name: 'Corporate network', range: '10.24.0.0/16', scope: 'All tenants', status: 'Active', updated: 'Today, 14:18' },
    { id: 'ip-vpn', name: 'Operations VPN', range: '172.20.10.0/24', scope: 'Security team', status: 'Active', updated: 'Sep 18, 2026' },
    { id: 'ip-review', name: 'Temporary vendor access', range: '203.0.113.0/28', scope: 'Cedar tenant', status: 'Review', updated: 'Sep 16, 2026' },
  ]);

  find(id: string | null): SecurityRecord | undefined {
    return this.sessions().find((session) => session.id === id);
  }
}
