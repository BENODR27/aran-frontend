import { AuthService } from './../auth/auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

export function ResponseInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        notificationService.info('Unauthorized', 'Please log in again.', 4000);
        authService.logout();
      } else if (error.status === 400) {
        notificationService.error(
          'Something went wrong',
          error.error?.message ?? 'Please check your request.',
          4000,
        );
      } else if (error.status === 404) {
        notificationService.error('Not found', 'The requested resource was not found.', 4000);
      } else {
        notificationService.error(
          'Request failed',
          'Something went wrong. Please try again later.',
          3000,
        );
      }

      return throwError(() => error);
    }),
  );
}
