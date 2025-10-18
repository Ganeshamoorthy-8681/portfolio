import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Markdown and Syntax Highlighting
import { marked } from 'marked';
import hljs from 'highlight.js';

// Models and Services
import { BlogPost } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blogPost: BlogPost | null = null;
  parsedContent: SafeHtml | null = null;
  loading = true;
  contentLoading = false;
  error: string | null = null;
  contentType: 'markdown' | 'html' | 'text' = 'markdown';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    private sanitizer: DomSanitizer
  ) {
    // Configure marked
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

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

    // Add global copy function for code blocks
    (window as any).copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
  }

  ngOnDestroy(): void {
    // Clean up global function
    if ((window as any).copyCodeToClipboard) {
      delete (window as any).copyCodeToClipboard;
    }
  }

  private loadBlogPost(slug: string): void {
    this.loading = true;
    this.contentLoading = false;
    this.portfolioService.getBlogPostBySlug(slug).subscribe({
      next: (post) => {
        if (post) {
          this.blogPost = post;
          this.contentType = post.contentType || 'markdown';
          // Process content based on type
          this.processContent(post.content, this.contentType);
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

  private processContent(content: string, contentType: 'markdown' | 'html' | 'text'): void {
    this.contentLoading = true;
    
    // Add a small delay to show loading state for better UX
    setTimeout(() => {
      try {
        switch (contentType) {
          case 'markdown':
            this.parseMarkdownContent(content);
            break;
          case 'html':
            this.parseHtmlContent(content);
            break;
          case 'text':
            this.parseTextContent(content);
            break;
          default:
            // Default to markdown
            this.parseMarkdownContent(content);
        }
      } catch (error) {
        console.error(`Error processing ${contentType} content:`, error);
        this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(
          '<div class="error-content"><p>Error loading content. Please try again later.</p></div>'
        );
      } finally {
        this.contentLoading = false;
      }
    }, 300); // Small delay for better UX
  }

  private parseMarkdownContent(markdown: string): void {
    try {
      // Parse markdown to HTML
      const htmlContent = marked(markdown);
      
      // Apply syntax highlighting to code blocks
      const highlightedContent = this.applySyntaxHighlighting(htmlContent as string);
      
      // Sanitize and set the content
      this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(highlightedContent);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(
        '<div class="error-content"><p>Error parsing markdown content</p></div>'
      );
    }
  }

  private parseHtmlContent(html: string): void {
    try {
      // Apply syntax highlighting to any code blocks in the HTML
      const highlightedContent = this.applySyntaxHighlighting(html);
      
      // Sanitize the HTML content
      this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(highlightedContent);
    } catch (error) {
      console.error('Error parsing HTML:', error);
      this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(
        '<div class="error-content"><p>Error parsing HTML content</p></div>'
      );
    }
  }

  private parseTextContent(text: string): void {
    try {
      // Convert plain text to HTML with proper formatting
      const htmlContent = text
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        // Handle basic formatting
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        // Handle URLs
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
      
      this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
    } catch (error) {
      console.error('Error parsing text:', error);
      this.parsedContent = this.sanitizer.bypassSecurityTrustHtml(
        '<div class="error-content"><p>Error parsing text content</p></div>'
      );
    }
  }

  private applySyntaxHighlighting(html: string): string {
    // Replace code blocks with highlighted versions
    return html.replace(/<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
      const decodedCode = this.htmlDecode(code);
      let highlightedCode: string;
      const detectedLang = lang || 'auto';
      
      if (lang && hljs.getLanguage(lang)) {
        try {
          highlightedCode = hljs.highlight(decodedCode, { language: lang }).value;
        } catch (err) {
          highlightedCode = hljs.highlightAuto(decodedCode).value;
        }
      } else {
        const result = hljs.highlightAuto(decodedCode);
        highlightedCode = result.value;
        // Use detected language if available
        if (result.language) {
          lang = result.language;
        }
      }
      
      const displayLang = this.getLanguageDisplayName(lang || detectedLang);
      const encodedCode = this.htmlEncode(decodedCode);
      
      return `<pre class="hljs" data-language="${displayLang}">
        <button class="code-copy-btn" onclick="copyCodeToClipboard(this)" data-code="${encodedCode}">
          <mat-icon>content_copy</mat-icon>
          <span>Copy</span>
        </button>
        <code class="language-${lang || 'auto'}">${highlightedCode}</code>
      </pre>`;
    });
  }

  private getLanguageDisplayName(lang: string): string {
    const languageMap: { [key: string]: string } = {
      'javascript': 'JS',
      'js': 'JS',
      'typescript': 'TS',
      'ts': 'TS',
      'java': 'Java',
      'python': 'Python',
      'html': 'HTML',
      'css': 'CSS',
      'bash': 'Bash',
      'shell': 'Shell',
      'json': 'JSON',
      'sql': 'SQL',
      'xml': 'XML',
      'yaml': 'YAML',
      'markdown': 'MD',
      'php': 'PHP',
      'csharp': 'C#',
      'cpp': 'C++',
      'c': 'C',
      'go': 'Go',
      'rust': 'Rust',
      'kotlin': 'Kotlin',
      'swift': 'Swift',
      'auto': 'Code'
    };
    
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  }

  private htmlDecode(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  private htmlEncode(text: string): string {
    const txt = document.createElement('textarea');
    txt.textContent = text;
    return txt.innerHTML;
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

  getContentTypeDisplay(): string {
    switch (this.contentType) {
      case 'markdown':
        return 'Markdown';
      case 'html':
        return 'HTML';
      case 'text':
        return 'Text';
      default:
        return 'Content';
    }
  }

  getContentTypeIcon(): string {
    switch (this.contentType) {
      case 'markdown':
        return 'code';
      case 'html':
        return 'web';
      case 'text':
        return 'text_fields';
      default:
        return 'article';
    }
  }

  getContentCssClass(): string {
    return `blog-content ${this.contentType}-content`;
  }

  copyCodeToClipboard(button: HTMLElement): void {
    const code = button.getAttribute('data-code');
    if (code) {
      const decodedCode = this.htmlDecode(code);
      
      navigator.clipboard.writeText(decodedCode).then(() => {
        // Update button state
        const originalContent = button.innerHTML;
        button.innerHTML = '<mat-icon>check</mat-icon><span>Copied!</span>';
        button.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalContent;
          button.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy code:', err);
        // Fallback: show error state
        const originalContent = button.innerHTML;
        button.innerHTML = '<mat-icon>error</mat-icon><span>Error</span>';
        
        setTimeout(() => {
          button.innerHTML = originalContent;
        }, 2000);
      });
    }
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
