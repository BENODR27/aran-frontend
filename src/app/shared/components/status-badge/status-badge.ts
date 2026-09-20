import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type StatusBadgeTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

@Component({
  selector: 'app-status-badge',
  template: `<span class="status-badge" [class]="'status-badge status-badge--' + tone()"
    ><span aria-hidden="true"></span>{{ label() }}</span
  >`,
  styleUrl: './status-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadge {
  readonly label = input.required<string>();
  readonly tone = input<StatusBadgeTone>('neutral');
}
