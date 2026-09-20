import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="loading-state" role="status" aria-live="polite">
      <span class="loading-state__spinner" aria-hidden="true"></span>
      <span>{{ message() }}</span>
    </div>
  `,
  styleUrl: './loading-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingState {
  readonly message = input('Loading...');
}
