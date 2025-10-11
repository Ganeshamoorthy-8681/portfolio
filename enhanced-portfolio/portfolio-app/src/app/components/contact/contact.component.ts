import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Models and Services
import { PersonalInfo } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  personalInfo: PersonalInfo | null = null;
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isSubmitting = false;

  socialLinks = [
    {
      name: 'Email',
      icon: 'email',
      url: '',
      color: '#EA4335'
    },
    {
      name: 'LinkedIn',
      icon: 'work',
      url: '',
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      icon: 'code',
      url: '',
      color: '#333'
    }
  ];

  constructor(
    private portfolioService: PortfolioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPersonalInfo();
  }

  private loadPersonalInfo(): void {
    this.portfolioService.getPersonalInfo().subscribe(info => {
      this.personalInfo = info;
      this.updateSocialLinks();
    });
  }

  private updateSocialLinks(): void {
    if (this.personalInfo) {
      this.socialLinks[0].url = `mailto:${this.personalInfo.email}`;
      this.socialLinks[1].url = this.personalInfo.linkedin;
      this.socialLinks[2].url = this.personalInfo.github || '';
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.showSuccessMessage();
        this.resetForm();
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.showErrorMessage('Please fill in all required fields.');
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
  }

  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  private showSuccessMessage(): void {
    this.snackBar.open('Message sent successfully! I\'ll get back to you soon.', 'Close', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  openSocialLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  downloadResume(): void {
    if (this.personalInfo?.resumeUrl) {
      window.open(this.personalInfo.resumeUrl, '_blank');
    }
  }
}
