import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              element.classList.add('animate-in');
              
              // Add staggered animation for child elements
              const children = element.querySelectorAll('[data-animate-child]');
              children.forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('animate-in');
                }, index * 100);
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );
    }
  }

  observeElement(element: ElementRef): void {
    if (this.observer && element.nativeElement) {
      this.observer.observe(element.nativeElement);
    }
  }

  unobserveElement(element: ElementRef): void {
    if (this.observer && element.nativeElement) {
      this.observer.unobserve(element.nativeElement);
    }
  }

  // Utility method to add entrance animations
  addEntranceAnimation(element: HTMLElement, animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' = 'fadeIn'): void {
    element.classList.add('animate-element', animationType);
  }

  // Utility method for staggered animations
  staggerChildren(parent: HTMLElement, delay: number = 100): void {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      setTimeout(() => {
        child.classList.add('animate-in');
      }, index * delay);
    });
  }

  // Smooth scroll to element
  scrollToElement(elementId: string, offset: number = 80): void {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}
