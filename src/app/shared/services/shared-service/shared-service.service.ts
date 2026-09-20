import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceService {
  private navbarItemsSource = new BehaviorSubject<any[]>(
    this.getStoredNavbarItems()
  );
  navbarItems$ = this.navbarItemsSource.asObservable();

  updateNavbarItems(items: any[]) {
    this.navbarItemsSource.next(items);
    localStorage.setItem('navbarItems', JSON.stringify(items)); // Store in LocalStorage
  }

  private getStoredNavbarItems(): any[] {
    return JSON.parse(localStorage.getItem('navbarItems') || '[]'); // Retrieve from LocalStorage
  }
}
