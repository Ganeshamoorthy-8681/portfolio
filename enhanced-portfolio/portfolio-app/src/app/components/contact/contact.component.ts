import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
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

  constructor(
    private portfolioService: PortfolioService
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
    const iconMap: { [key: string]: string } = {
      'linkedin': 'business',
      'github': 'code',
      'twitter': 'alternate_email',
      'instagram': 'photo_camera',
      'facebook': 'people',
      'youtube': 'play_circle',
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
    // Simple console log for now - can be replaced with toast notification
    console.log('Message sent successfully! I\'ll get back to you soon.');
    alert('Message sent successfully! I\'ll get back to you soon.');
  }

  private showErrorMessage(message: string): void {
    // Simple console log for now - can be replaced with toast notification
    console.error('Error:', message);
    alert(`Error: ${message}`);
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
