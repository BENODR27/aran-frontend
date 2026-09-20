import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-action-toolbar',
  template: `<div class="action-toolbar">
    <div class="action-toolbar__filters"><ng-content select="[toolbar-filters]" /></div>
    <div class="action-toolbar__actions"><ng-content select="[toolbar-actions]" /></div>
  </div>`,
  styleUrl: './action-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionToolbar {}
