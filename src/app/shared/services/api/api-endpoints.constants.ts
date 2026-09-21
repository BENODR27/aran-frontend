/**
 * Canonical API resources used by the application modules.
 *
 * Keep these values relative to the API base URL. The API services add the
 * configured `/api` prefix so environments can change without touching a
 * feature module.
 */
export const API_ENDPOINTS = {
  tenants: 'tenants',
  companies: 'companies',
  facilities: 'facilities',
  users: 'users',
  groups: 'groups',
  roles: 'roles',
  permissions: 'permissions',
  applications: 'applications',
  subscriptions: 'subscriptions',
  plans: 'plans',
  features: 'features',
  billing: 'billing',
  notifications: 'notifications',
  integrations: 'integrations',
  audit: 'audit',
  security: 'security',
  settings: 'settings',
  management: 'management',
  apiManagement: 'api-management',
  developerPortal: 'developer-portal',
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];

export const API_OPERATIONS = {
  customGet: 'customGet',
  customGetAll: 'customGetAll',
  createBatch: 'createBatch',
  updateBatch: 'updateBatch',
  customUpdateAll: 'customUpdateAll',
  deleteWithFilter: 'deleteWithFilter',
  updateWithFilter: 'updateWithFilter',
  updateBulkDataEach: 'updateBulkDataEach',
} as const;
