import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { AUTH_API_CONSTANTS as AAC } from '../../constants/auth-api.constants';
import { LoadingService } from '../Loading/loading.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem<string>('token');
  const isAuthRequest = [AAC.login, AAC.register].some((url) => req.url.includes(url));
  const authenticatedRequest =
    token && !isAuthRequest ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  loadingService.show();
  return next(authenticatedRequest).pipe(finalize(() => loadingService.hide()));
}
