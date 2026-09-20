import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCard {
  readonly title = input('');
  readonly description = input('');
  readonly padded = input(true);
}
