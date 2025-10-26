import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { Certification } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-certifications',
  imports: [
    FormsModule,
    MatIconModule,
    ScrollAnimateDirective
],
  templateUrl: './certifications.component.html',
  standalone: true
})
export class CertificationsComponent implements OnInit {
  allCertifications: Certification[] = [];
  filteredCertifications: Certification[] = [];
  selectedProvider: string = 'all';
  searchTerm: string = '';
  selectedCertification: Certification | null = null;
  isModalOpen: boolean = false;
  
  providers = [
    { value: 'all', label: 'All Providers', icon: 'school' },
    { value: 'microsoft', label: 'Microsoft', icon: 'business' },
    { value: 'HackerRank', label: 'HackerRank', icon: 'code' },
    { value: 'coursera', label: 'Coursera', icon: 'school' },
    { value: 'udemy', label: 'Udemy', icon: 'play_circle' }
  ];

  constructor(
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.loadCertifications();
  }

  private loadCertifications(): void {
    this.portfolioService.getCertifications().subscribe({
      next: (certifications: Certification[]) => {
        this.allCertifications = certifications;
        this.filteredCertifications = certifications;
      },
      error: (error: any) => {
        console.error('Error loading certifications:', error);
      }
    });
  }

  onProviderChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.allCertifications;

    // Apply provider filter
    if (this.selectedProvider !== 'all') {
      filtered = filtered.filter(cert => 
        cert.issuer?.toLowerCase().includes(this.selectedProvider.toLowerCase()) ||
        cert.name.toLowerCase().includes(this.selectedProvider.toLowerCase())
      );
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(cert =>
        cert.name.toLowerCase().includes(searchLower) ||
        cert.issuer?.toLowerCase().includes(searchLower) ||
        cert.credentialId?.toLowerCase().includes(searchLower)
      );
    }

    this.filteredCertifications = filtered;
  }

  openCertificationModal(certification: Certification): void {
    this.selectedCertification = certification;
    this.isModalOpen = true;
    // Add body class to prevent scrolling
    document.body.classList.add('modal-open');
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedCertification = null;
    // Remove body class to restore scrolling
    document.body.classList.remove('modal-open');
  }

  downloadCertificate(certification: Certification): void {
    // Implementation for downloading certificate
    if (certification.image) {
      const link = document.createElement('a');
      link.href = certification.image;
      link.download = `${certification.name.replace(/\s+/g, '_')}_Certificate.png`;
      link.click();
    }
  }

  copyCertificationLink(certification: Certification): void {
    if (certification.credentialId) {
      navigator.clipboard.writeText(certification.credentialId).then(() => {
        console.log('Credential ID copied to clipboard');
      });
    }
  }

  getCertificationProvider(certification: Certification): string {
    if (!certification.issuer) return 'general';
    
    const issuer = certification.issuer.toLowerCase();
    if (issuer.includes('microsoft')) return 'microsoft';
    if (issuer.includes('oracle')) return 'oracle';
    if (issuer.includes('angular')) return 'angular';
    if (issuer.includes('react')) return 'react';
    if (issuer.includes('coursera')) return 'coursera';
    if (issuer.includes('udemy')) return 'udemy';
    return 'general';
  }

  getProviderBorderClass(certification: Certification): string {
    const provider = this.getCertificationProvider(certification);
    const borderClasses: { [key: string]: string } = {
      'microsoft': 'border-t-blue-500',
      'oracle': 'border-t-red-500',
      'angular': 'border-t-red-600',
      'react': 'border-t-cyan-400',
      'coursera': 'border-t-blue-600',
      'udemy': 'border-t-purple-600',
      'general': 'border-t-purple-500'
    };
    return borderClasses[provider] || 'border-t-purple-500';
  }

  getCertificationIcon(certification: Certification): string {
    const provider = this.getCertificationProvider(certification);
    const iconMap: { [key: string]: string } = {
      'microsoft': 'business',
      'oracle': 'storage',
      'angular': 'web',
      'react': 'code',
      'coursera': 'school',
      'udemy': 'play_circle',
      'general': 'verified'
    };
    return iconMap[provider] || 'verified';
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedProvider = 'all';
    this.applyFilters();
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch {
      return dateString;
    }
  }

}
