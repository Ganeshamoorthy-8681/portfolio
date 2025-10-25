import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { PersonalInfo } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


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
    MatIconModule,
    ScrollAnimateDirective
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

  constructor (
    private portfolioService: PortfolioService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

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
      this.handleFormSubmission();
    } else {
      this.showErrorMessage('Please fill in all required fields.');
    }
  }

  handleFormSubmission() {

    const formData = new URLSearchParams();
    formData.set('name', this.contactForm.name);
    formData.set('email', this.contactForm.email);
    formData.set('subject', this.contactForm.subject);
    formData.set('message', this.contactForm.message);
    formData.set("form-name", "contact");

    this.http.post('/', formData.toString(), { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
      .subscribe({
        next: () => {
          this.showSuccessMessage();
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.showErrorMessage('Failed to send message. Please try again later.');
          this.isSubmitting = false;
        }
      });
  }

  // Public method for template use
  isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
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
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  private showSuccessMessage(): void {
    this.toastr.success('Message sent successfully! I\'ll get back to you soon.');
  }

  private showErrorMessage(message: string): void {
    this.toastr.error(message);
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
