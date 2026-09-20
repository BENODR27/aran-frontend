import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private colorSubject = new BehaviorSubject<any>(null);
  public currentColors = this.colorSubject.asObservable();

  // Fetch colors from API (mocked)
  fetchColorsFromApi(): void {
    const defaultColors = {
      primary: '#76323F',
      secondary: '#565656',
      background: '#f1f1f1',
      bodytextcolor: '#333333',
      sidebartextcolor: '#f1f1f1',
    };
    this.colorSubject.next(defaultColors);
    this.applyColors(defaultColors);
  }

  // Apply colors globally
  applyColors(colors: any): void {
    if (colors) {
      Object.keys(colors).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, colors[key]);
      });
    }
  }

  // Update color dynamically
  updateColor(key: string, value: string): void {
    const currentColors = this.colorSubject.value || {};
    currentColors[key] = value;
    this.colorSubject.next(currentColors);
    this.applyColors(currentColors);
  }
}
