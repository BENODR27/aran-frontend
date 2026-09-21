import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentCard, PageHeader, StatusBadge } from '../../../../shared/components';
import { ThemeMode, ThemeService } from '../../../../shared/services/theme/theme.service';
import { SettingsProfile } from '../../settings.model';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-settings-create',
  imports: [ContentCard, FormsModule, PageHeader, RouterLink, StatusBadge],
  templateUrl: './settings-create.html',
  styleUrl: './settings-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCreate {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = inject(SettingsService);
  protected readonly themeService = inject(ThemeService);
  protected readonly tab = this.route.snapshot.data['tab'] as string | undefined;
  protected readonly tabs = [['General', 'general'], ['Email', 'email'], ['Localization', 'localization'], ['Theme', 'theme']] as const;
  protected readonly form: SettingsProfile = { ...this.service.profile() };
  protected readonly themeOptions: readonly { label: string; value: ThemeMode; description: string }[] = [
    { label: 'Light', value: 'light', description: 'Bright interface for daytime operations.' },
    { label: 'Dark', value: 'dark', description: 'Low-light interface for focused monitoring.' },
    { label: 'Custom', value: 'custom', description: 'Use the saved brand color configuration.' },
  ];

  protected getActiveTabTitle(): string {
    return this.tabs.find((item) => item[1] === this.tab)?.[0] ?? 'General settings';
  }

  protected save(): void {
    this.service.profile.set({ ...this.form });
  }

  protected changeTheme(theme: ThemeMode): void {
    this.themeService.setTheme(theme);
  }
}
