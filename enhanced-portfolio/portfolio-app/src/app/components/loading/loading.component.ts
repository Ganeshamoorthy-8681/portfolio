import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-container" [class.fullscreen]="fullscreen">
      <div class="loading-content">
        <div class="loading-spinner">
          <div class="spinner-circle"></div>
          <div class="spinner-circle"></div>
          <div class="spinner-circle"></div>
        </div>
        <p class="loading-text" *ngIf="message">{{ message }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() message = 'Loading...';
  @Input() fullscreen = false;
}
