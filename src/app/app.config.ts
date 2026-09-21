import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/interceptors/auth.interceptor';
import { ResponseInterceptor } from './shared/services/interceptors/response.interceptor';
import { MockApiInterceptor } from './shared/services/interceptors/mock-api.interceptor';
import { provideStore } from '@ngrx/store';
import { tenantsReducer } from './modules/tenants/tenant.state';
import { companiesReducer } from './modules/companies/company.state';
import { facilitiesReducer } from './modules/facilities/facility.state';
import { applicationsReducer } from './modules/applications/application.state';
import { AppState } from './app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([MockApiInterceptor, AuthInterceptor, ResponseInterceptor])),
    provideStore<AppState>({
      tenants: tenantsReducer,
      companies: companiesReducer,
      facilities: facilitiesReducer,
      applications: applicationsReducer,
    }),
  ],
};
