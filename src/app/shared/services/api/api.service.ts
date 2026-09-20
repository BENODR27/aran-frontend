import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public httpService: HttpService) {}

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
