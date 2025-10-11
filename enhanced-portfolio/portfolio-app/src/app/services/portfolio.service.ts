import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Portfolio, Skill, Experience, Project, Certification, Education, PersonalInfo } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioData: Portfolio = {
    personalInfo: {
      name: 'GANESHA MOORTHY',
      title: 'Frontend Web Developer',
      description: "I'm a passionate software developer with a front-end focus, dedicated to creating engaging user experiences. I bring a user-centered approach, teamwork, and intermediate backend skills to deliver seamless functionality and innovative solutions. Let's work together to bring your project to life!",
      email: 'ganeshamoorthy8681@gmail.com',
      linkedin: 'https://www.linkedin.com/in/ganesha-moorthy/',
      resumeUrl: '/ganeshamoorthy-resume.pdf'
    },
    skills: [
      // Frontend Skills
      { name: 'HTML', image: 'images/html.png', level: 90, category: 'frontend' },
      { name: 'CSS', image: 'images/css.png', level: 85, category: 'frontend' },
      { name: 'JavaScript', image: 'images/js.png', level: 88, category: 'frontend' },
      { name: 'TypeScript', image: 'images/typescript.png', level: 85, category: 'frontend' },
      { name: 'SASS', image: 'images/sass.png', level: 80, category: 'frontend' },
      { name: 'Angular', image: 'images/angular.png', level: 90, category: 'frontend' },
      { name: 'React', image: 'images/react.png', level: 75, category: 'frontend' },
      
      // Backend Skills
      { name: 'Java', image: 'images/java.png', level: 80, category: 'backend' },
      { name: 'Spring', image: 'images/spring.png', level: 75, category: 'backend' },
      { name: 'Spring Boot', image: 'images/Spring_Boot.png', level: 78, category: 'backend' },
      { name: 'PostgreSQL', image: 'images/postrgressql.png', level: 70, category: 'backend' },
      { name: 'MongoDB', image: 'images/mongo-db.png', level: 72, category: 'backend' },
      
      // Tools
      { name: 'Git', image: 'images/git.png', level: 85, category: 'tools' },
      { name: 'Docker', image: 'images/docker.png', level: 65, category: 'tools' },
      { name: 'Azure', image: 'images/azure.png', level: 70, category: 'tools' },
      { name: 'VS Code', image: 'images/vscode.png', level: 95, category: 'tools' },
      { name: 'IntelliJ', image: 'images/intellij.png', level: 80, category: 'tools' }
    ],
    experience: [
      {
        company: 'COMMVAULT',
        role: 'Engineer',
        duration: 'APR 2024 - Present',
        description: [
          'Enhanced and maintained the product after acquisition, implementing features aligned with the acquiring company\'s requirements.'
        ],
        current: true
      },
      {
        company: 'APPRANIX',
        role: 'Programmer Analyst',
        duration: 'SEP 2023 - APR 2024',
        description: [
          'Developed customer-focused features and enhancements using Angular, improving user experience and optimizing performance and efficiency.',
          'Collaborated with cross-functional teams to improve interfaces, mentored junior developers on technologies and workflows, and adhered to Agile practices throughout the product lifecycle.'
        ]
      },
      {
        company: 'APPRANIX',
        role: 'Programmer Analyst Intern',
        duration: 'AUG 2022 - AUG 2023',
        description: [
          'Built a strong foundation in JavaScript, TypeScript, SCSS, Angular, and Angular Material through hands-on projects and training.',
          'Worked on key features of the product as part of training, gaining hands-on experience and enhancing functionality.'
        ]
      }
    ],
    projects: [
      {
        title: 'TASK FLOW APP',
        description: 'A task management application that allows users to create, update, and track tasks efficiently. It provides an intuitive interface to manage workflows, ensuring better task organization and productivity.',
        image: 'images/taskflow.png',
        technologies: ['Angular', 'Angular Material', 'Spring Boot'],
        liveUrl: 'https://ganeshamoorthy-task-management.netlify.app/',
        featured: true
      },
      {
        title: 'CINE SPHERE APP',
        description: 'Explore detailed information about movies and TV shows. From cast and crew to plot summaries, our app offers everything you need to discover your next favorite title!',
        image: 'images/cinesphere.png',
        technologies: ['React', 'React Router', 'REST API'],
        liveUrl: 'https://movie-app-topaz-nine.vercel.app',
        featured: true
      },
      {
        title: 'AMAZON E-COMMERCE CLONE',
        description: 'Developed a clone of the Amazon e-commerce landing page to strengthen my HTML and CSS skills. This project involved replicating the layout, styling, and core elements, including product listings, navigation menus, and a search bar.',
        image: 'images/amazone-clone.png',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: 'https://ganeshamoorthy-8681.github.io/amazon-recreated/'
      },
      {
        title: 'UNIFY',
        description: 'Developed a responsive landing page from a design provided by a UX designer, using the Unify template as a reference.',
        image: 'images/unify.png',
        technologies: ['HTML', 'CSS', 'Responsive Web'],
        liveUrl: 'https://ganeshamoorthy-8681.github.io/res-unify/'
      },
      {
        title: 'WEATHER WISE APP',
        description: 'A modern weather application built with React, designed to provide users with real-time weather updates and forecasts. This app integrates with a weather API to fetch accurate data and presents it in a user-friendly interface.',
        image: 'images/weatherApp.png',
        technologies: ['React', 'Material UI', 'REST API'],
        liveUrl: 'https://ganeshamoorthy-weather-app.netlify.app'
      }
    ],
    certifications: [
      { name: 'Azure Fundamentals', image: 'images/az900-certificate.png', issuer: 'Microsoft' },
      { name: 'Angular Intermediate', image: 'images/angular-intermediate-certificate.png' },
      { name: 'Angular Basic', image: 'images/angular-basic-certificate.png' },
      { name: 'React Certificate', image: 'images/react-certificate.png' },
      { name: 'Web Developer Certificate', image: 'images/web-developer-certificate.png' },
      { name: 'Java Basic Certificate', image: 'images/java-basic-certificate.png' },
      { name: 'Java MongoDB Certificate', image: 'images/java-mongo-certificate.png' },
      { name: 'SQL Certificate', image: 'images/sql-certificate.png' },
      { name: 'Google AI Essentials', image: 'images/google-ai-essentials_page-0001.jpg', issuer: 'Google' }
    ],
    education: [
      {
        institution: 'E.G.S PILLAY ENGINEERING COLLEGE',
        degree: 'B.E',
        field: 'ELECTRONICS AND COMMUNICATION ENGINEERING',
        duration: '2019 - 2023',
        cgpa: '8.85',
        description: 'My background in Electronics and Communication Engineering has given me strong problem-solving skills, which I now apply in UI development to write clean, organized code and create user-friendly, detail-focused interfaces.'
      }
    ]
  };

  private portfolioSubject = new BehaviorSubject<Portfolio>(this.portfolioData);

  getPortfolio(): Observable<Portfolio> {
    return this.portfolioSubject.asObservable();
  }

  getSkillsByCategory(category: 'frontend' | 'backend' | 'tools'): Skill[] {
    return this.portfolioData.skills.filter(skill => skill.category === category);
  }

  getFeaturedProjects(): Project[] {
    return this.portfolioData.projects.filter(project => project.featured);
  }

  getAllProjects(): Project[] {
    return this.portfolioData.projects;
  }
}
