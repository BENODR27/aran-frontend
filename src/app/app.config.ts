import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/interceptors/auth.interceptor';
import { ResponseInterceptor } from './shared/services/interceptors/response.interceptor';
import { MockApiInterceptor } from './shared/services/interceptors/mock-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([MockApiInterceptor, AuthInterceptor, ResponseInterceptor])),
  ],
};
