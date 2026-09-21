import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiEntity {
  readonly id: string | number;
}

export interface ApiResponse<T> {
  readonly data: T;
  readonly message?: string;
  readonly success?: boolean;
}

type ApiPayload<T> = T | ApiResponse<T>;

@Injectable({ providedIn: 'root' })
export class ApiResourceService {
  private readonly http = inject(HttpClient);

  list<T extends ApiEntity>(resource: string): Observable<readonly T[]> {
    return this.http
      .get<ApiPayload<readonly T[]>>(this.url(resource))
      .pipe(map((response) => this.unwrap(response)));
  }

  get<T extends ApiEntity>(resource: string, id: string | number): Observable<T> {
    return this.http
      .get<ApiPayload<T>>(this.url(`${resource}/${id}`))
      .pipe(map((response) => this.unwrap(response)));
  }

  create<T extends ApiEntity, TPayload extends object>(
    resource: string,
    payload: TPayload,
  ): Observable<T> {
    return this.http
      .post<ApiPayload<T>>(this.url(resource), payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  update<T extends ApiEntity, TPayload extends object>(
    resource: string,
    id: string | number,
    payload: TPayload,
  ): Observable<T> {
    return this.http
      .patch<ApiPayload<T>>(this.url(`${resource}/${id}`), payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  remove(resource: string, id: string | number): Observable<void> {
    return this.http
      .delete<ApiPayload<void>>(this.url(`${resource}/${id}`))
      .pipe(map(() => undefined));
  }

  private unwrap<T>(response: ApiPayload<T>): T {
    return this.isApiResponse(response) ? response.data : response;
  }

  private isApiResponse<T>(response: ApiPayload<T>): response is ApiResponse<T> {
    return typeof response === 'object' && response !== null && 'data' in response;
  }

  private url(resource: string): string {
    const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
    return `${environment.apiUrl}/api/${normalizedResource}`;
  }
}
