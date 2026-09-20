import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `<span class="avatar" [class]="'avatar avatar--' + size()" [attr.aria-label]="name()">
    @if (image() && !imageFailed()) {
      <img [src]="image()" [alt]="name()" (error)="imageFailed.set(true)" />
    } @else {
      <span aria-hidden="true">{{ initials() }}</span>
    }
  </span>`,
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  readonly name = input.required<string>();
  readonly image = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  protected readonly imageFailed = signal(false);
  protected readonly initials = computed(() =>
    this.name()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase(),
  );
}
