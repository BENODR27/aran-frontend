import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `<div class="modal-backdrop" role="presentation" (click)="close.emit()">
    <section
      class="modal"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="titleId()"
      (click)="$event.stopPropagation()"
    >
      <header>
        <h2 [id]="titleId()">{{ title() }}</h2>
        <button type="button" aria-label="Close dialog" (click)="close.emit()">×</button>
      </header>
      <div class="modal__body"><ng-content /></div>
      <footer><ng-content select="[modal-footer]" /></footer>
    </section>
  </div>`,
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
  readonly title = input.required<string>();
  readonly titleId = input('modal-title');
  readonly close = output<void>();
}
