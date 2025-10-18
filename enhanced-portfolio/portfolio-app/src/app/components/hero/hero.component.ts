import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PortfolioService } from '../../services/portfolio-data.service';
import { ThemeService } from '../../services/theme.service';
import { PersonalInfo } from '../../models/portfolio.model';

@Component({
  selector: 'app-hero',
  imports: [
    CommonModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  personalInfo: PersonalInfo | null = null;
  typedRoles = ['Full Stack Developer', 'Angular Expert', 'Java Developer', 'Frontend Specialist', 'Tech Enthusiast'];
  currentRoleIndex = 0;
  currentRole = '';
  isDarkTheme$: Observable<boolean>;
  private typingInterval: any;
  private roleInterval: any;

  constructor(
    private portfolioService: PortfolioService,
    private themeService: ThemeService
  ) {
    this.isDarkTheme$ = this.themeService.isDarkTheme();
  }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe(portfolio => {
      this.personalInfo = portfolio.personalInfo;
    });
    
    this.startTypingAnimation();
  }

  ngOnDestroy(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.roleInterval) clearInterval(this.roleInterval);
  }

  private startTypingAnimation(): void {
    const typeRole = () => {
      const role = this.typedRoles[this.currentRoleIndex];
      let charIndex = 0;
      
      this.typingInterval = setInterval(() => {
        if (charIndex < role.length) {
          this.currentRole = role.substring(0, charIndex + 1);
          charIndex++;
        } else {
          clearInterval(this.typingInterval);
          
          // Wait before erasing
          setTimeout(() => {
            const eraseInterval = setInterval(() => {
              if (this.currentRole.length > 0) {
                this.currentRole = this.currentRole.substring(0, this.currentRole.length - 1);
              } else {
                clearInterval(eraseInterval);
                this.currentRoleIndex = (this.currentRoleIndex + 1) % this.typedRoles.length;
                setTimeout(typeRole, 500);
              }
            }, 50);
          }, 2000);
        }
      }, 100);
    };
    
    typeRole();
  }

  downloadResume(): void {
    if (this.personalInfo?.resumeUrl) {
      const link = document.createElement('a');
      link.href = this.personalInfo.resumeUrl;
      link.download = 'ganeshamoorthy-resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  scrollToContact(): void {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
