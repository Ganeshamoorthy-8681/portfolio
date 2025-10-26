import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Experience } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-experience',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ScrollAnimateDirective
],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  private loadExperiences(): void {
    this.portfolioService.getExperiences().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
      }
    });
  }

  getExperienceIcon(company: string): string {
    // Return appropriate icon based on company or role
    const icons: { [key: string]: string } = {
      'Commvault(formely appranix)': 'business',
      'Digital Innovation Ltd.': 'code',
      'StartupCorp': 'rocket_launch'
    };
    return icons[company] || 'work';
  }

  isCurrentRole(experience: Experience): boolean {
    return experience.current || false;
  }
}
