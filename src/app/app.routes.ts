import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/components/login/login').then(({ Login }) => Login),
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes').then(({ DASHBOARD_ROUTES }) => DASHBOARD_ROUTES),
      },
      {
        path: 'tenants',
        loadChildren: () => import('./modules/tenants/tenants.routes').then(({ TENANTS_ROUTES }) => TENANTS_ROUTES),
      },
      {
        path: 'companies',
        loadChildren: () => import('./modules/companies/companies.routes').then(({ COMPANIES_ROUTES }) => COMPANIES_ROUTES),
      },
      {
        path: 'facilities',
        loadChildren: () => import('./modules/facilities/facilities.routes').then(({ FACILITIES_ROUTES }) => FACILITIES_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/users/users.routes').then(({ USERS_ROUTES }) => USERS_ROUTES),
      },
      {
        path: 'groups',
        loadChildren: () => import('./modules/groups/groups.routes').then(({ GROUPS_ROUTES }) => GROUPS_ROUTES),
      },
      {
        path: 'roles',
        loadChildren: () => import('./modules/roles/roles.routes').then(({ ROLES_ROUTES }) => ROLES_ROUTES),
      },
      {
        path: 'permissions',
        loadChildren: () => import('./modules/permissions/permissions.routes').then(({ PERMISSIONS_ROUTES }) => PERMISSIONS_ROUTES),
      },
      {
        path: 'applications',
        loadChildren: () => import('./modules/applications/applications.routes').then(({ APPLICATIONS_ROUTES }) => APPLICATIONS_ROUTES),
      },
      {
        path: 'subscriptions',
        loadChildren: () => import('./modules/subscriptions/subscriptions.routes').then(({ SUBSCRIPTIONS_ROUTES }) => SUBSCRIPTIONS_ROUTES),
      },
      {
        path: 'plans',
        loadChildren: () => import('./modules/plans/plans.routes').then(({ PLANS_ROUTES }) => PLANS_ROUTES),
      },
      {
        path: 'features',
        loadChildren: () => import('./modules/features/features.routes').then(({ FEATURES_ROUTES }) => FEATURES_ROUTES),
      },
      {
        path: 'api-management',
        loadChildren: () => import('./modules/api-management/api-management.routes').then(({ API_MANAGEMENT_ROUTES }) => API_MANAGEMENT_ROUTES),
      },
      {
        path: 'security',
        loadChildren: () => import('./modules/security/security.routes').then(({ SECURITY_ROUTES }) => SECURITY_ROUTES),
      },
      {
        path: 'audit',
        loadChildren: () => import('./modules/audit/audit.routes').then(({ AUDIT_ROUTES }) => AUDIT_ROUTES),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./modules/notifications/notifications.routes').then(({ NOTIFICATIONS_ROUTES }) => NOTIFICATIONS_ROUTES),
      },
      {
        path: 'billing',
        loadChildren: () => import('./modules/billing/billing.routes').then(({ BILLING_ROUTES }) => BILLING_ROUTES),
      },
      {
        path: 'integrations',
        loadChildren: () => import('./modules/integrations/integrations.routes').then(({ INTEGRATIONS_ROUTES }) => INTEGRATIONS_ROUTES),
      },
      {
        path: 'developer-portal',
        loadChildren: () => import('./modules/developer-portal/developer-portal.routes').then(({ DEVELOPER_PORTAL_ROUTES }) => DEVELOPER_PORTAL_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then(({ SETTINGS_ROUTES }) => SETTINGS_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
