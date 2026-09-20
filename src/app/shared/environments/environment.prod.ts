import type { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://api.styx.classicfashion.com',
  authApiUrl: 'https://auth.styx.classicfashion.com',
  SS_API_URL: 'https://api.styx.classicfashion.com',
  mockApi: {
    enabled: false,
  },
};
