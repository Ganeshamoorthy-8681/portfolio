import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private themeSubject = new BehaviorSubject<Theme>('dark');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Default to dark theme and apply it
      this.setTheme('dark');
    }
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem('portfolio-theme', theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    const html = document.documentElement;
    
    // Remove existing theme classes
    body.classList.remove('dark-theme', 'light-theme');
    html.classList.remove('dark', 'light');
    
    // Apply new theme classes
    body.classList.add(`${theme}-theme`);
    html.classList.add(theme);
    
    // Set data-theme attribute for CSS targeting
    html.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);
  }

  isDarkTheme(): Observable<boolean> {
    return new Observable(observer => {
      this.theme$.subscribe(theme => {
        observer.next(theme === 'dark');
      });
    });
  }
}
