import { Injectable, signal } from '@angular/core';
import { NotificationActivity, NotificationRecord } from './notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly records = signal<NotificationRecord[]>([
    { id: 'notification-invite', subject: 'New user invitation', channel: 'Email', audience: 'Northstar administrators', delivered: '248 delivered', status: 'Sent', updated: 'Today, 16:44' },
    { id: 'notification-security', subject: 'Security alert digest', channel: 'In-app', audience: 'Security operators', delivered: '32 delivered', status: 'Sent', updated: 'Today, 16:12' },
    { id: 'notification-renewal', subject: 'Subscription renewal reminder', channel: 'Email', audience: 'Cedar billing contacts', delivered: 'Scheduled Oct 01', status: 'Scheduled', updated: 'Today, 15:38' },
    { id: 'notification-maintenance', subject: 'Platform maintenance notice', channel: 'Push', audience: 'All tenant users', delivered: 'Not sent', status: 'Draft', updated: 'Sep 18, 2026' },
  ]);

  readonly activity: readonly NotificationActivity[] = [
    { event: 'Campaign sent', actor: 'Notification Service', resource: 'New user invitation', status: 'Completed', updated: 'Today, 16:44' },
    { event: 'Template approved', actor: 'Maya Haddad', resource: 'Security alert digest', status: 'Completed', updated: 'Today, 16:12' },
    { event: 'Schedule changed', actor: 'Omar Khalil', resource: 'Subscription renewal reminder', status: 'Review', updated: 'Today, 15:38' },
    { event: 'Template draft created', actor: 'Communications Team', resource: 'Platform maintenance notice', status: 'Completed', updated: 'Today, 14:57' },
    { event: 'Delivery attempt blocked', actor: 'Policy Engine', resource: 'External recipient', status: 'Blocked', updated: 'Today, 14:24' },
  ];

  readonly metrics = { sentToday: '1,842', deliveryRate: '98.6%', scheduled: '14', failed: '9' };

  create(subject: string, channel: NotificationRecord['channel'], audience: string): NotificationRecord {
    const record: NotificationRecord = {
      id: `notification-${Date.now()}`,
      subject: subject.trim() || 'New notification',
      channel,
      audience: audience.trim() || 'Unassigned audience',
      delivered: 'Not sent',
      status: 'Draft',
      updated: 'Just now',
    };
    this.records.update((items) => [record, ...items]);
    return record;
  }

  find(id: string | null): NotificationRecord | undefined {
    return this.records().find((record) => record.id === id);
  }
}
