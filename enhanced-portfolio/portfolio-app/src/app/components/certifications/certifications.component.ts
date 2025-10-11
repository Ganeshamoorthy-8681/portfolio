import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Certification } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-certifications',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.css'
})
export class CertificationsComponent implements OnInit {
  allCertifications: Certification[] = [];
  filteredCertifications: Certification[] = [];
  selectedProvider: string = 'all';
  searchTerm: string = '';
  
  providers = [
    { value: 'all', label: 'All Providers', icon: 'school' },
    { value: 'microsoft', label: 'Microsoft', icon: 'business' },
    { value: 'oracle', label: 'Oracle', icon: 'storage' },
    { value: 'angular', label: 'Angular', icon: 'web' },
    { value: 'react', label: 'React', icon: 'code' },
    { value: 'coursera', label: 'Coursera', icon: 'school' },
    { value: 'udemy', label: 'Udemy', icon: 'play_circle' }
  ];

  constructor(
    private portfolioService: PortfolioService,
    private dialog: MatDialog
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
    // Implementation for opening certification modal with enlarged image
    console.log('Opening certification modal for:', certification.name);
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
