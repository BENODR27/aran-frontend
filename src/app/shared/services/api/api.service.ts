import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../shared/services/http/http.service';
import { environment } from '../../environments/environment';
import {
  API_ENDPOINTS,
  ApiEndpoint,
} from './api-endpoints.constants';

export { API_ENDPOINTS };
export type { ApiEndpoint };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public httpService: HttpService) {}

  /**
   * Return the absolute URL for a module resource.
   *
   * Feature services should pass an API_ENDPOINTS value instead of building
   * `/api/...` URLs themselves.
   */
  resourceUrl(endpoint: ApiEndpoint): string {
    return `${environment.apiUrl.replace(/\/+$/, '')}/api/${endpoint}`;
  }

  list<T>(endpoint: ApiEndpoint, query = ''): Observable<T> {
    return this.httpService.get<T>(this.resourceUrl(endpoint) + query);
  }

  getById<T>(endpoint: ApiEndpoint, id: string | number): Observable<T> {
    return this.httpService.get<T>(`${this.resourceUrl(endpoint)}/${encodeURIComponent(String(id))}`);
  }

  create<T, TPayload>(endpoint: ApiEndpoint, payload: TPayload): Observable<T> {
    return this.httpService.post<T>(this.resourceUrl(endpoint), payload);
  }

  update<T, TPayload>(
    endpoint: ApiEndpoint,
    id: string | number,
    payload: TPayload,
  ): Observable<T> {
    return this.httpService.patch<T>(
      `${this.resourceUrl(endpoint)}/${encodeURIComponent(String(id))}`,
      payload,
    );
  }

  remove(endpoint: ApiEndpoint, id: string | number): Observable<void> {
    return this.httpService.delete<void>(
      `${this.resourceUrl(endpoint)}/${encodeURIComponent(String(id))}`,
    );
  }

  getDatasByFilter(query: string, apiUrl: string): Observable<any> {
    return this.httpService.get<any>(apiUrl + (query ? query : ''));
  }
  dataCustomGet(data: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(apiUrl + '/customGet', data);
  }
  datasCustomGet(data: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(apiUrl + '/customGetAll', data);
  }
  getDatas(apiUrl: string): Observable<any> {
    return this.httpService.get<any>(apiUrl);
  }

  getDataById(id: number, apiUrl: string): Observable<any> {
    return this.httpService.get<any>(`${apiUrl}/${id}`);
  }

  addData(data: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(apiUrl, data);
  }
  createBatch(datas: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(`${apiUrl}/createBatch`, datas);
  }
  updateData(id: number, data: any, apiUrl: string): Observable<any> {
    return this.httpService.put<any>(`${apiUrl}/${id}`, data);
  }
  updateBatch(datas: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(`${apiUrl}/updateBatch`, datas);
  }
  customUpdateAll(datas: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(`${apiUrl}/customUpdateAll`, datas);
  }
  deleteData(id: number, apiUrl: string): Observable<void> {
    return this.httpService.delete<void>(`${apiUrl}/${id}`);
  }
  deleteWithFilter(data: any, apiUrl: string): Observable<any> {
    return this.httpService.post<any>(apiUrl + '/deleteWithFilter', data);
  }
  patchData(id: number, data: Partial<any>, apiUrl: string): Observable<any> {
    return this.httpService.patch<any>(`${apiUrl}/${id}`, data);
  }

  patchDataByFilter(query: string, data: any, apiUrl: string): Observable<any> {
    return this.httpService.patch<any>(
      apiUrl + '/updateWithFilter' + (query ? query : ''),
      data,
    );
  }
  updateBulkDataEach(data: any, apiUrl: string): Observable<any> {
    return this.httpService.patch<any>(apiUrl + '/updateBulkDataEach', data);
  }
}
