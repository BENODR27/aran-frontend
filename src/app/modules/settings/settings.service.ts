import { Injectable, signal } from '@angular/core';
import { SettingsProfile } from './settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly profile = signal<SettingsProfile>({
    platformName: 'Aran IAM Platform',
    supportEmail: 'support@aran.example',
    defaultTimezone: 'Asia/Amman',
    defaultLocale: 'en-US',
    dateFormat: 'MMM dd, yyyy',
    emailProvider: 'Amazon SES',
    emailFrom: 'notifications@aran.example',
  });
}
