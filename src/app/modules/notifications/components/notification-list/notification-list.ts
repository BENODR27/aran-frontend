import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentCard, DataTable, DataTableColumn, PageHeader, StatusBadge } from '../../../../shared/components';
import { NotificationActivity, NotificationRecord } from '../../notification.model';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-notification-list',
  imports: [ContentCard, DataTable, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './notification-list.html',
  styleUrl: './notification-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationList {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly service = inject(NotificationService);
  protected readonly mode = this.route.snapshot.data['mode'] as string | undefined;
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly record = this.service.find(this.route.snapshot.paramMap.get('id'));
  protected readonly form = { subject: '', channel: 'Email' as NotificationRecord['channel'], audience: 'All tenant users' };
  protected readonly tabs = [['Templates', 'templates'], ['Campaigns', 'campaigns'], ['History', 'history'], ['Schedules', 'schedules']] as const;
  protected readonly columns: readonly DataTableColumn<NotificationRecord>[] = [
    { key: 'subject', header: 'Notification' }, { key: 'channel', header: 'Channel' }, { key: 'audience', header: 'Audience' }, { key: 'delivered', header: 'Delivery' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected readonly activityColumns: readonly DataTableColumn<NotificationActivity>[] = [
    { key: 'event', header: 'Event' }, { key: 'actor', header: 'Actor' }, { key: 'resource', header: 'Resource' }, { key: 'status', header: 'Status' }, { key: 'updated', header: 'Last updated' },
  ];
  protected getActiveTabTitle(): string { return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'Notifications'; }
  protected statusTone(status: string): 'success' | 'warning' | 'info' | 'neutral' {
    if (status === 'Sent' || status === 'Completed') return 'success';
    if (status === 'Scheduled' || status === 'Review') return 'warning';
    if (status === 'Draft') return 'info';
    if (status === 'Failed' || status === 'Blocked') return 'neutral';
    return 'info';
  }
  protected save(): void {
    const created = this.service.create(this.form.subject, this.form.channel, this.form.audience);
    this.router.navigate(['/notifications', created.id]);
  }
}
