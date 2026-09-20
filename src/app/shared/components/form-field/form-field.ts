import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  template: `<div class="form-field">
    <label [for]="inputId()"
      >{{ label() }}
      @if (required()) {
        <span aria-hidden="true">*</span>
      }</label
    ><ng-content />
    <p class="form-field__hint" [id]="inputId() + '-hint'">{{ hint() }}</p>
  </div>`,
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  readonly label = input.required<string>();
  readonly inputId = input.required<string>();
  readonly hint = input('');
  readonly required = input(false);
}
