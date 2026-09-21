import { Routes } from '@angular/router';
import { SettingsList } from './components/settings-list/settings-list';
import { SettingsDetail } from './components/settings-detail/settings-detail';

export const SETTINGS_ROUTES: Routes = [
  { path: '', component: SettingsList },
  { path: 'general', component: SettingsDetail, data: { tab: 'general' } },
  { path: 'email', component: SettingsDetail, data: { tab: 'email' } },
  { path: 'localization', component: SettingsDetail, data: { tab: 'localization' } },
  { path: 'theme', component: SettingsDetail, data: { tab: 'theme' } },
  { path: ':id', component: SettingsDetail },
];
