import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert" [class]="'alert alert--' + tone()" role="alert">
      <span class="alert__icon" aria-hidden="true">{{ icon() }}</span>
      <div class="alert__content">
        <strong>{{ title() }}</strong
        ><ng-content />
      </div>
      @if (dismissible()) {
        <button
          class="alert__close"
          type="button"
          aria-label="Dismiss alert"
          (click)="dismiss.emit()"
        >
          ×
        </button>
      }
    </div>
  `,
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alert {
  readonly title = input.required<string>();
  readonly tone = input<AlertTone>('info');
  readonly dismissible = input(false);
  readonly dismiss = output<void>();
  protected icon(): string {
    return { info: 'i', success: '✓', warning: '!', danger: '×' }[this.tone()];
  }
}
