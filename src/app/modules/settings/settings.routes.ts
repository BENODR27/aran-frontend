import { Routes } from '@angular/router';
import { SettingsPage } from './settings-page';

export const SETTINGS_ROUTES: Routes = [
  { path: '', component: SettingsPage, data: { tab: 'general' } },
  { path: 'general', component: SettingsPage, data: { tab: 'general' } },
  { path: 'email', component: SettingsPage, data: { tab: 'email' } },
  { path: 'localization', component: SettingsPage, data: { tab: 'localization' } },
  { path: 'theme', component: SettingsPage, data: { tab: 'theme' } },
];
