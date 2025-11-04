import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDarkTheme$: Observable<boolean>;
  isMenuOpen = false;
  activeSection = 'home';
  isScrolled = false;

  navigationItems = [
    { label: 'Home', link: '#hero', icon: 'home', isRoute: false, section: 'hero' },
    { label: 'Skills', link: '#skills', icon: 'code', isRoute: false, section: 'skills' },
    { label: 'Experience', link: '#experience', icon: 'work', isRoute: false, section: 'experience' },
    { label: 'Projects', link: '#projects', icon: 'folder', isRoute: false, section: 'projects' },
    { label: 'Blog', link: 'blog', icon: 'article', isRoute: true, section: 'blog' },
    { label: 'Certifications', link: '#certifications', icon: 'verified', isRoute: false, section: 'certifications' },
    { label: 'Education', link: '#education', icon: 'school', isRoute: false, section: 'education' },
    { label: 'Contact', link: '#contact', icon: 'mail', isRoute: false, section: 'contact' }
  ];

  constructor (
    private themeService: ThemeService,
    private router: Router
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme();
  }

  ngOnInit(): void {
    this.updateActiveSection();
    
    // Listen for route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveSection();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // Update scroll state for header styling
    this.isScrolled = window.scrollY > 50;

    // Update active section based on scroll position
    this.updateActiveSection();
  }

  private updateActiveSection(): void {

    // Check if we're on the blog page
    if (this.router.url.startsWith('/blog')) {
      this.activeSection = 'blog';
      return;
    }

    const sections = ['hero', 'skills', 'experience', 'projects', 'certifications', 'education', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section) as HTMLElement;
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleNavigation(item: any): void {
    
    if (item.isRoute) {
      // Navigate to route
      this.router.navigate([item.link]);
    } else {
      // Special handling for hero section
      if (item.section === 'hero') {
        if (this.router.url !== '/') {
          // If not on home page, navigate to home
          this.router.navigate(['/']);
        } else {
          // If already on home page, scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      } else {
        // For other sections, check if we're on the home page first
        if (this.router.url !== '/') {
          this.router.navigate(['/']).then(() => {
            setTimeout(() => this.scrollToSection(item.link), 100);
          });
        } else {
          this.scrollToSection(item.link);
        }
      }
    }
    // Close mobile menu after navigation
    this.isMenuOpen = false;
  }

  scrollToSection(link: string): void {
    const element = document.querySelector(link) as HTMLElement;
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
