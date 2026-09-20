import { environment } from '../../shared/environments/environment';

export const AUTH_API_CONSTANTS = {
  API_URL: environment.authApiUrl,
  login: '/api/auth/users/login',
  register: '/api/auth/users/register',
};
