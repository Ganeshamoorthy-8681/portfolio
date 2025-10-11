import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { AnimationService } from '../services/animation.service';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' = 'fadeIn';
  @Input() delay: number = 0;

  constructor(
    private elementRef: ElementRef,
    private animationService: AnimationService
  ) {}

  ngOnInit(): void {
    // Add initial animation classes
    this.elementRef.nativeElement.classList.add('animate-element', this.animationType);
    
    // Add delay if specified
    if (this.delay > 0) {
      this.elementRef.nativeElement.style.animationDelay = `${this.delay}ms`;
    }

    // Observe for intersection
    this.animationService.observeElement(this.elementRef);
  }

  ngOnDestroy(): void {
    this.animationService.unobserveElement(this.elementRef);
  }
}
