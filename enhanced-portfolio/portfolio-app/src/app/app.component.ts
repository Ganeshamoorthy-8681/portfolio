import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Enhanced Portfolio - Ganesha Moorthy';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Initialize theme service
    this.themeService.getCurrentTheme();
  }
}
