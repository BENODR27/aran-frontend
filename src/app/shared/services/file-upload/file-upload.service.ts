import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { S_CONSTANTS } from '../../constants/s-constants';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = S_CONSTANTS.API_URL + '/api/ss'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}
  uploadImages(files: File[], pjname: string): Observable<any> {
    const formData = new FormData();
    formData.set('pjname', pjname);
    files.forEach((file) => formData.append('images', file));

    return this.http.post<any>(`${this.apiUrl}/upload/images`, formData);
  }
  uploadFiles(files: File[], pjname: string): Observable<any> {
    const formData = new FormData();
    formData.set('pjname', pjname);
    files.forEach((file) => formData.append('files', file));

    return this.http.post<any>(`${this.apiUrl}/upload/files`, formData);
  }
  // Method to upload image
  uploadImage(file: File, pjname: string): Observable<any> {
    const formData = new FormData();
    formData.set('pjname', pjname);

    formData.append('image', file, file.name); // 'image' is the field name in your form-data

    return this.http.post(`${this.apiUrl}/upload/image`, formData);
  }

  // Method to upload video
  uploadVideo(file: File, pjname: string): Observable<any> {
    const formData = new FormData();
    formData.set('pjname', pjname);

    formData.append('video', file, file.name); // 'video' is the field name in your form-data

    return this.http.post(`${this.apiUrl}/upload/video`, formData);
  }
}
