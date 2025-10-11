import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./components/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
