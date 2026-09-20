import { Injectable, signal } from '@angular/core';
import { AuditRecord } from './audit.model';

@Injectable({ providedIn: 'root' })
export class AuditService {
  readonly records = signal<AuditRecord[]>([
    { id: 'audit-1001', event: 'User invited', actor: 'Maya Haddad', resource: 'Nour Al-Salem', category: 'Identity', ipAddress: '10.24.18.12', status: 'Success', timestamp: 'Today, 16:42', details: 'Invitation sent for the Northstar tenant administrator role.' },
    { id: 'audit-1002', event: 'Role permissions changed', actor: 'Omar Khalil', resource: 'Security Operator', category: 'Authorization', ipAddress: '172.20.10.8', status: 'Success', timestamp: 'Today, 16:25', details: 'Added audit export permission to the Security Operator role.' },
    { id: 'audit-1003', event: 'Failed login attempt', actor: 'Unknown device', resource: 'Lina Saad account', category: 'Security', ipAddress: '203.0.113.42', status: 'Failed', timestamp: 'Today, 15:58', details: 'Login blocked after repeated invalid credentials from an untrusted network.' },
    { id: 'audit-1004', event: 'API key rotated', actor: 'Platform Admin', resource: 'Production platform key', category: 'System', ipAddress: '10.24.4.5', status: 'Success', timestamp: 'Today, 15:37', details: 'Production API credential was rotated according to policy.' },
    { id: 'audit-1005', event: 'Subscription updated', actor: 'Billing Automation', resource: 'Cedar tenant', category: 'Billing', ipAddress: '10.24.2.20', status: 'Success', timestamp: 'Today, 15:14', details: 'Professional plan seat allocation increased to 120 seats.' },
    { id: 'audit-1006', event: 'MFA enrollment reviewed', actor: 'Security Team', resource: 'Atlas tenant', category: 'Security', ipAddress: '172.20.10.15', status: 'Review', timestamp: 'Today, 14:49', details: 'Review opened for privileged users without registered backup factors.' },
    { id: 'audit-1007', event: 'Feature assignment changed', actor: 'Lina Saad', resource: 'Audit log export', category: 'Authorization', ipAddress: '10.24.31.7', status: 'Success', timestamp: 'Today, 14:21', details: 'Company-level feature override was created for the reporting team.' },
    { id: 'audit-1008', event: 'IP restriction updated', actor: 'Omar Khalil', resource: 'Corporate network', category: 'Security', ipAddress: '172.20.10.8', status: 'Success', timestamp: 'Today, 13:56', details: 'Trusted network range was updated for the operations VPN.' },
  ]);

  readonly metrics = {
    eventsToday: '1,284',
    successfulEvents: '97.8%',
    reviewQueue: '18',
    failedEvents: '27',
  };

  find(id: string | null): AuditRecord | undefined {
    return this.records().find((record) => record.id === id);
  }
}
