import type { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://10.50.1.225:3000',
  authApiUrl: 'http://10.50.1.225:81',
  SS_API_URL: 'http://10.50.1.225:3003',
  // Flip this single switch to use the in-memory API during local development.
  mockApi: {
    enabled: false,
    latencyMs: 150,
    permissions: {
      read: true,
      create: true,
      update: true,
      delete: true,
    },
  },
};
