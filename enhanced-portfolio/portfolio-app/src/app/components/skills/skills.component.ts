import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { PortfolioService } from '../../services/portfolio-data.service';
import { Skill } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  frontendSkills: Skill[] = [];
  backendSkills: Skill[] = [];
  toolsSkills: Skill[] = [];
  
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

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.frontendSkills = this.portfolioService.getSkillsByCategory('frontend');
    this.backendSkills = this.portfolioService.getSkillsByCategory('backend');
    this.toolsSkills = this.portfolioService.getSkillsByCategory('tools');
    
    // Assign skills to categories
    this.skillCategories[0].skills = this.frontendSkills;
    this.skillCategories[1].skills = this.backendSkills;
    this.skillCategories[2].skills = this.toolsSkills;
  }

  onSkillHover(skill: Skill, isEnter: boolean): void {
    // Add hover animations or effects here if needed
    if (isEnter) {
      // console.log(`Hovering over ${skill.name}`);
    }
  }
}
