import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: `<span
    class="skeleton"
    [style.width]="width()"
    [style.height]="height()"
    aria-hidden="true"
  ></span>`,
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  readonly width = input('100%');
  readonly height = input('1rem');
}
