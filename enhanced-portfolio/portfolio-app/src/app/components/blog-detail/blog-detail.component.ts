import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

// Models and Services
import { BlogPost } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  blogPost: BlogPost | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadBlogPost(slug);
      } else {
        this.error = 'Blog post not found';
        this.loading = false;
      }
    });
  }

  private loadBlogPost(slug: string): void {
    this.loading = true;
    this.portfolioService.getBlogPostBySlug(slug).subscribe({
      next: (post) => {
        if (post) {
          this.blogPost = post;
          // Increment view count
          this.portfolioService.incrementBlogViews(slug);
        } else {
          this.error = 'Blog post not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blog post';
        this.loading = false;
        console.error('Error loading blog post:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/blog']);
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

  shareBlogPost(): void {
    if (navigator.share && this.blogPost) {
      navigator.share({
        title: this.blogPost.title,
        text: this.blogPost.excerpt,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Could show a toast or notification here
        console.log('URL copied to clipboard');
      });
    }
  }
}
