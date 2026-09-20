import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface BreadcrumbItem {
  readonly label: string;
  readonly url?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  template: `<nav aria-label="Breadcrumb">
    <ol class="breadcrumbs">
      @for (item of items(); track item.label; let last = $last) {
        <li>
          <button [disabled]="last || !item.url" (click)="navigate.emit(item)" type="button">
            {{ item.label }}
          </button>
          @if (!last) {
            <span aria-hidden="true">/</span>
          }
        </li>
      }
    </ol>
  </nav>`,
  styleUrl: './breadcrumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs {
  readonly items = input.required<readonly BreadcrumbItem[]>();
  readonly navigate = output<BreadcrumbItem>();
}
