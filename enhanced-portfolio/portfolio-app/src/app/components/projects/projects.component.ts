import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ScrollAnimateDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  selectedProject: Project | null = null;
  isImageModalOpen: boolean = false;
  
  categories = [
    { value: 'all', label: 'All Projects', icon: 'apps' },
    { value: 'web', label: 'Web Apps', icon: 'web' },
    { value: 'mobile', label: 'Mobile Apps', icon: 'phone_android' },
    { value: 'api', label: 'APIs', icon: 'api' },
    { value: 'tools', label: 'Tools', icon: 'build' }
  ];

  constructor(
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.portfolioService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.allProjects = projects;
        this.filteredProjects = projects;
      },
      error: (error: any) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.allProjects;

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(project => 
        project.category?.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchLower)
        )
      );
    }

    this.filteredProjects = filtered;
  }

  openProjectDetails(project: Project): void {
    // Implementation for opening project details modal
    console.log('Opening project details for:', project.title);
  }

  openLiveProject(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  openGithubRepo(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  openImageModal(project: Project): void {
    this.selectedProject = project;
    this.isImageModalOpen = true;
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
    this.selectedProject = null;
    // Remove body class to restore scrolling
    document.body.classList.remove('modal-open');
  }

  getTechnologyColor(tech: string): string {
    const colors: { [key: string]: string } = {
      'Angular': '#dd1b16',
      'React': '#61dafb',
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'Java': '#ed8b00',
      'Spring Boot': '#6db33f',
      'Node.js': '#339933',
      'HTML': '#e34f26',
      'CSS': '#1572b6',
      'SCSS': '#cf649a',
      'MongoDB': '#47a248',
      'PostgreSQL': '#336791',
      'Docker': '#2496ed',
      'AWS': '#ff9900',
      'Azure': '#0078d4'
    };
    return colors[tech] || '#6c757d';
  }

  getProjectIcon(project: Project): string {
    if (project.category === 'web') return 'web';
    if (project.category === 'mobile') return 'phone_android';
    if (project.category === 'api') return 'api';
    if (project.category === 'tools') return 'build';
    return 'code';
  }



  onImageError(event: any): void {
    if (event.target) {
      // event.target.src = 'assets/portfolio.svg';
    }
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.applyFilters();
  }
}
