import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiEndpoint } from './api-endpoints.constants';

export interface ApiEntity {
  readonly id: string | number;
}

export interface ApiResponse<T> {
  readonly data: T;
  readonly message?: string;
  readonly success?: boolean;
}

type ApiPayload<T> = T | ApiResponse<T>;
export type ApiQueryParams = Record<
  string,
  string | number | boolean | readonly (string | number)[]
>;

@Injectable({ providedIn: 'root' })
export class ApiResourceService {
  private readonly http = inject(HttpClient);

  list<T extends ApiEntity>(
    resource: ApiEndpoint | string,
    query?: ApiQueryParams,
  ): Observable<readonly T[]> {
    return this.http
      .get<ApiPayload<readonly T[]>>(this.url(resource), {
        params: this.params(query),
      })
      .pipe(map((response) => this.unwrap(response)));
  }

  getById<T extends ApiEntity>(resource: ApiEndpoint | string, id: string | number): Observable<T> {
    return this.http
      .get<ApiPayload<T>>(this.url(`${resource}/${this.encodeId(id)}`))
      .pipe(map((response) => this.unwrap(response)));
  }

  create<T extends ApiEntity, TPayload extends object>(
    resource: ApiEndpoint | string,
    payload: TPayload,
  ): Observable<T> {
    return this.http
      .post<ApiPayload<T>>(this.url(resource), payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  update<T extends ApiEntity, TPayload extends object>(
    resource: ApiEndpoint | string,
    id: string | number,
    payload: TPayload,
  ): Observable<T> {
    return this.http
      .patch<ApiPayload<T>>(this.url(`${resource}/${this.encodeId(id)}`), payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  remove(resource: ApiEndpoint | string, id: string | number): Observable<void> {
    return this.http
      .delete<ApiPayload<void>>(this.url(`${resource}/${this.encodeId(id)}`))
      .pipe(map(() => undefined));
  }

  get<T>(resource: ApiEndpoint | string, query?: ApiQueryParams): Observable<T> {
    return this.http
      .get<ApiPayload<T>>(this.url(resource), { params: this.params(query) })
      .pipe(map((response) => this.unwrap(response)));
  }

  post<T, TPayload extends object>(
    resource: ApiEndpoint | string,
    payload: TPayload,
  ): Observable<T> {
    return this.http
      .post<ApiPayload<T>>(this.url(resource), payload)
      .pipe(map((response) => this.unwrap(response)));
  }

  private unwrap<T>(response: ApiPayload<T>): T {
    return this.isApiResponse(response) ? response.data : response;
  }

  private isApiResponse<T>(response: ApiPayload<T>): response is ApiResponse<T> {
    return typeof response === 'object' && response !== null && 'data' in response;
  }

  private url(resource: string): string {
    const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
    if (normalizedResource.startsWith('http://') || normalizedResource.startsWith('https://')) {
      return normalizedResource;
    }
    return `${environment.apiUrl.replace(/\/+$/, '')}/api/${normalizedResource}`;
  }

  private encodeId(id: string | number): string {
    return encodeURIComponent(String(id));
  }

  private params(query?: ApiQueryParams): HttpParams | undefined {
    if (!query) return undefined;

    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          params = params.append(key, String(item));
        });
      } else {
        params = params.set(key, String(value));
      }
    });
    return params;
  }
}
