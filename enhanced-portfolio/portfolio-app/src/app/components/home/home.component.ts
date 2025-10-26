import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificationsComponent } from '../certifications/certifications.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificationsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  private scrollListener!: () => void;
  private currentSection = '';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Theme is already initialized in the service constructor
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
      
      // Handle initial fragment navigation
      this.route.fragment.subscribe(fragment => {
        if (fragment && fragment !== 'hero') {
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              const headerHeight = 80;
              const elementPosition = element.offsetTop - headerHeight;
              window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
              });
            }
          }, 100);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupScrollListener(): void {
    const sections = ['hero', 'skills', 'experience', 'projects', 'certifications', 'education', 'contact'];
    
    this.scrollListener = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            if (this.currentSection !== section) {
              this.currentSection = section;
              // Update URL fragment without triggering navigation
              if (section === 'hero') {
                // For hero section, use just the base URL without fragment
                window.history.replaceState(null, '', '/');
              } else {
                // For other sections, use fragment
                const url = this.router.createUrlTree([], { fragment: section }).toString();
                window.history.replaceState(null, '', url);
              }
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }
}
