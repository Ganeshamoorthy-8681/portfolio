import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]'
})
export class ScrollAnimateDirective implements OnInit {
  @Input('appScrollAnimate') animationClass = 'animate-fade-in';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.3 } // trigger when 10% visible
    );

    observer.observe(this.el.nativeElement);
  }
}
