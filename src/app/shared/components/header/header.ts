import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CustomColorKey, ThemeMode, ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly menuToggle = output<void>();
  protected readonly customThemeOpen = signal(false);

  constructor(
    private readonly router: Router,
    protected readonly themeService: ThemeService,
  ) {}

  logout(): void {
    this.router.navigate(['/auth/login']);
  }

  protected changeTheme(event: Event): void {
    const theme = (event.target as HTMLSelectElement).value as ThemeMode;
    this.themeService.setTheme(theme);
    this.customThemeOpen.set(theme === 'custom');
  }

  protected changeCustomColor(key: CustomColorKey, event: Event): void {
    this.themeService.setCustomColor(key, (event.target as HTMLInputElement).value);
  }

  protected resetCustomColors(): void {
    this.themeService.resetCustomColors();
  }

  protected saveCustomTheme(): void {
    this.customThemeOpen.set(false);
  }

  protected openCustomTheme(): void {
    this.customThemeOpen.set(true);
  }
}
