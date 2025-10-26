import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio-data.service';
import { Skill } from '../../models/portfolio.model';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-skills',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    ScrollAnimateDirective
],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  frontendSkills: Skill[] = [];
  backendSkills: Skill[] = [];
  toolsSkills: Skill[] = [];
  
  isVisible = false;
  private observer!: IntersectionObserver;
  
  skillCategories = [
    {
      title: 'FRONT-END',
      subtitle: 'User Interface & Experience',
      icon: 'web',
      skills: [] as Skill[],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'BACK-END',
      subtitle: 'Server & Database',
      icon: 'storage',
      skills: [] as Skill[],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'TOOLS & OTHERS',
      subtitle: 'Development Tools',
      icon: 'build',
      skills: [] as Skill[],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  constructor(private portfolioService: PortfolioService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.frontendSkills = this.portfolioService.getSkillsByCategory('frontend');
    this.backendSkills = this.portfolioService.getSkillsByCategory('backend');
    this.toolsSkills = this.portfolioService.getSkillsByCategory('tools');
    
    // Assign skills to categories
    this.skillCategories[0].skills = this.frontendSkills;
    this.skillCategories[1].skills = this.backendSkills;
    this.skillCategories[2].skills = this.toolsSkills;
  }

  ngAfterViewInit(): void {
    // this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
