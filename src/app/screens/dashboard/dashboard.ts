import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ActionToolbar,
  ContentCard,
  DataTable,
  DataTableColumn,
  PageHeader,
  StatusBadge,
} from '../../shared/components';

interface ActivityRow {
  readonly id: string;
  readonly batch: string;
  readonly facility: string;
  readonly status: string;
  readonly updated: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [ActionToolbar, ContentCard, DataTable, PageHeader, StatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected readonly activities: readonly ActivityRow[] = [
    {
      id: 'ACT-1048',
      batch: 'BT-2026-00142',
      facility: 'Amman Central',
      status: 'Completed',
      updated: 'Today, 10:42',
    },
    {
      id: 'ACT-1047',
      batch: 'BT-2026-00141',
      facility: 'Irbid North',
      status: 'In progress',
      updated: 'Today, 10:18',
    },
    {
      id: 'ACT-1046',
      batch: 'BT-2026-00140',
      facility: 'Zarqa Hub',
      status: 'Pending',
      updated: 'Today, 09:55',
    },
    {
      id: 'ACT-1045',
      batch: 'BT-2026-00139',
      facility: 'Amman Central',
      status: 'Completed',
      updated: 'Yesterday, 16:22',
    },
    {
      id: 'ACT-1044',
      batch: 'BT-2026-00138',
      facility: 'Aqaba South',
      status: 'Attention',
      updated: 'Yesterday, 14:08',
    },
  ];
  protected readonly columns: readonly DataTableColumn<ActivityRow>[] = [
    { key: 'id', header: 'Activity', width: '8rem' },
    { key: 'batch', header: 'Batch reference' },
    { key: 'facility', header: 'Facility' },
    { key: 'status', header: 'Status', format: (value) => value },
    { key: 'updated', header: 'Last updated' },
  ];
}
