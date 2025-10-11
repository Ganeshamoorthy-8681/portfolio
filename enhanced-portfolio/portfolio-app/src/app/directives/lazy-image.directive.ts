import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit, OnDestroy {
  @Input() appLazyImage!: string;
  @Input() placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNkM2Ljc0NTc2IDI2IDYgMTkuMjU0MiA2IDE2QzYgMTIuNzQ1OCA2Ljc0NTc2IDYgMjAgNkMzMy4yNTQyIDYgMzQgMTIuNzQ1OCAzNCAxNkMzNCAxOS4yNTQyIDMzLjI1NDIgMjYgMjAgMjZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMCAyMkM5LjUwNjU5IDIyIDkgMTcuNDkzNCA5IDE1QzkgMTIuNTA2NiA5LjUwNjU5IDggMjAgOEMzMC40OTM0IDggMzEgMTIuNTA2NiAzMSAxNUMzMSAxNy40OTM0IDMwLjQ5MzQgMjIgMjAgMjJaIiBmaWxsPSIjNjM3Mzg1Ii8+Cjwvc3ZnPgo=';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage();
              this.observer?.unobserve(this.el.nativeElement);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.loadImage();
    }

    // Set placeholder
    this.el.nativeElement.src = this.placeholder;
    this.el.nativeElement.classList.add('lazy-loading');
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private loadImage(): void {
    const img = new Image();
    img.onload = () => {
      this.el.nativeElement.src = this.appLazyImage;
      this.el.nativeElement.classList.remove('lazy-loading');
      this.el.nativeElement.classList.add('lazy-loaded');
    };
    img.onerror = () => {
      this.el.nativeElement.classList.remove('lazy-loading');
      this.el.nativeElement.classList.add('lazy-error');
    };
    img.src = this.appLazyImage;
  }
}
