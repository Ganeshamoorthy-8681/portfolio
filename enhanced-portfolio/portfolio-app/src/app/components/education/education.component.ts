import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

// Models and Services
import { Education } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {
  education: Education[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadEducation();
  }

  private loadEducation(): void {
    this.portfolioService.getEducation().subscribe(education => {
      this.education = education;
    });
  }
}
