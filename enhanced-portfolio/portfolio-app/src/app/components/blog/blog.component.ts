import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

// Models and Services
import { BlogPost } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    ScrollAnimateDirective,
    HeaderComponent,
    FooterComponent
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

  isExternalPost(post: BlogPost): boolean {
    return post.isExternal || false;
  }

  getPostUrl(post: BlogPost): string {
    return this.isExternalPost(post) ? post.externalUrl || '#' : `/blog/${post.slug}`;
  }

  getReadButtonText(post: BlogPost): string {
    return this.isExternalPost(post) ? 'Read on ' + (post.externalPlatform || 'External Site') : 'Read Full Article';
  }

  getReadButtonIcon(post: BlogPost): string {
    return this.isExternalPost(post) ? 'launch' : 'read_more';
  }

  handlePostClick(post: BlogPost, event?: Event): void {
    if (this.isExternalPost(post)) {
      if (post.externalUrl) {
        window.open(post.externalUrl, '_blank', 'noopener,noreferrer');
      }
    }
    // For internal posts, let the routerLink handle navigation
  }
}
