import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly menuToggle = output<void>();

  constructor(private readonly router: Router) {}

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}
