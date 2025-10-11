import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

// Models and Services
import { BlogPost } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  allPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  featuredPost: BlogPost | null = null;
  
  // Filter properties
  searchTerm: string = '';
  selectedCategory: string = 'all';
  selectedTag: string = 'all';
  
  // Filter options
  categories = [
    { value: 'all' as const, label: 'All Categories' },
    { value: 'Angular', label: 'Angular' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Tutorial', label: 'Tutorial' },
    { value: 'Career', label: 'Career' }
  ];
  
  allTags: string[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadBlogPosts();
    this.loadFeaturedPost();
    this.extractAllTags();
  }

  private loadBlogPosts(): void {
    this.portfolioService.getBlogPosts().subscribe(posts => {
      console.log('Blog posts loaded:', posts);
      this.allPosts = posts;
      this.filteredPosts = [...this.allPosts];
    });
  }

  private loadFeaturedPost(): void {
    this.portfolioService.getFeaturedBlogPosts().subscribe(featuredPosts => {
      console.log('Featured posts loaded:', featuredPosts);
      this.featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : null;
    });
  }

  private extractAllTags(): void {
    const tagSet = new Set<string>();
    this.allPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    this.allTags = Array.from(tagSet).sort();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onTagChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredPosts = this.allPosts.filter(post => {
      // Search filter
      const matchesSearch = this.searchTerm === '' || 
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory = this.selectedCategory === 'all' || 
        post.category === this.selectedCategory;

      // Tag filter
      const matchesTag = this.selectedTag === 'all' || 
        post.tags.includes(this.selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedTag = 'all';
    this.filteredPosts = [...this.allPosts];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  getReadTimeText(minutes: number): string {
    return `${minutes} min read`;
  }

  handleImageError(event: any): void {
    // Prevent infinite loop by checking if we're already using the fallback
    if (event.target.src.includes('data:image')) {
      return;
    }
    // Use a simple colored rectangle as fallback
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NjcxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0Ij5CbG9nIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
  }
}
