import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificationsComponent } from '../certifications/certifications.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificationsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Theme is already initialized in the service constructor
  }
}
