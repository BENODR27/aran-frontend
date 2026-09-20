import { Injectable } from '@angular/core';
import Swal, { type SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  success(title: string, text: string, timer: number = 3000): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      title,
      text,
      timer,
      icon: 'success',
      showConfirmButton: false,
    });
  }

  error(title: string, text: string, timer: number = 3000): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      title,
      text,
      timer,
      icon: 'error',
      showConfirmButton: false,
    });
  }

  info(title: string, text: string, timer: number = 3000): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      title,
      text,
      timer,
      icon: 'info',
      showConfirmButton: false,
    });
  }

  confirm(
    title: string,
    confirmButtonText: string = 'Yes',
    denyButtonText: string = 'No',
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText,
      denyButtonText,
    });
  }
}
