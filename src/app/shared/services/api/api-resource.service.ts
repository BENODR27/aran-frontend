import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiEntity {
  readonly id: string | number;
}

@Injectable({ providedIn: 'root' })
export class ApiResourceService {
  private readonly http = inject(HttpClient);

  list<T extends ApiEntity>(resource: string): Observable<readonly T[]> {
    return this.http.get<readonly T[]>(this.url(resource));
  }

  get<T extends ApiEntity>(resource: string, id: string | number): Observable<T> {
    return this.http.get<T>(this.url(`${resource}/${id}`));
  }

  create<T extends ApiEntity, TPayload extends object>(resource: string, payload: TPayload): Observable<T> {
    return this.http.post<T>(this.url(resource), payload);
  }

  update<T extends ApiEntity, TPayload extends object>(
    resource: string,
    id: string | number,
    payload: TPayload,
  ): Observable<T> {
    return this.http.patch<T>(this.url(`${resource}/${id}`), payload);
  }

  remove(resource: string, id: string | number): Observable<void> {
    return this.http.delete<void>(this.url(`${resource}/${id}`));
  }

  private url(resource: string): string {
    const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
    return `${environment.apiUrl}/api/${normalizedResource}`;
  }
}
