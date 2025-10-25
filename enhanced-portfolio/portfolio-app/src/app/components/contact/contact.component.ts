import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { PersonalInfo } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';
import { HttpClient, HttpParams } from '@angular/common/http';


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
    ReactiveFormsModule,
    MatIconModule,
    ScrollAnimateDirective
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  hideSuccess(): void {
    this.showSuccess = false;
    this.successMessage = '';
  }
  personalInfo: PersonalInfo | null = null;
  contactForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';
  showError: boolean = false;
  successMessage: string = '';
  showSuccess: boolean = false;

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

  constructor (
    private portfolioService: PortfolioService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

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
    this.hideError();

    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.handleFormSubmission();
    } else {
      // Mark all fields as touched to show validation errors
      this.contactForm.markAllAsTouched();
      this.showErrorAlert('Please fix the errors below and try again.');
    }
  }

  handleFormSubmission() {
    const entry = new HttpParams({
      fromObject: {
        'form-name': 'contact',
        ...this.contactForm.value,
      }
    });

    this.http.post('/', entry.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
      .subscribe({
        next: () => {
          this.resetForm();
          this.isSubmitting = false;
          this.showSuccess = true;
          this.successMessage = 'Message sent successfully! I\'ll get back to you soon.';
        },
        error: (error) => {
          this.showErrorAlert('Failed to send message. Please try again later.');
          this.isSubmitting = false;
        }
      });
  }

  // Public method for template use (keeping for backward compatibility if needed)
  isFormValid(): boolean {
    return this.contactForm.valid;
  }

  openEmailClient(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  getSocialIcon(platform: string): string {
    const iconMap: { [key: string]: string; } = {
      'linkedin': 'business',
      'github': 'code',
      'website': 'language'
    };
    return iconMap[platform.toLowerCase()] || 'link';
  }

  private resetForm(): void {
    this.contactForm.reset();
    this.hideError();
  }


  // Simple alert methods for inline error display
  showErrorAlert(message: string): void {
    this.errorMessage = message;
    this.showError = true;
  }

  hideError(): void {
    this.showError = false;
    this.errorMessage = '';
  }

  // Reactive form helper methods
  hasFieldError(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (control && control.errors && (control.dirty || control.touched)) {
      if (control.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`;
      }
    }
    return '';
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
