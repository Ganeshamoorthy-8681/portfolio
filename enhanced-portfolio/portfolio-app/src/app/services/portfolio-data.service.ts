import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Portfolio, Skill, PersonalInfo, Experience, Project, Certification, BlogPost, Education } from '../models/portfolio.model';

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
      github: 'https://github.com/Ganeshamoorthy-8681',
      resumeUrl: '/ganeshamoorthy-resume.pdf'
    },
    skills: [
      // Frontend Skills
      { name: 'HTML', image: 'assets/images/html.png', level: 95, category: 'frontend' },
      { name: 'CSS', image: 'assets/images/css.png', level: 90, category: 'frontend' },
      { name: 'JAVASCRIPT', image: 'assets/images/js.png', level: 85, category: 'frontend' },
      { name: 'SASS', image: 'assets/images/sass.png', level: 80, category: 'frontend' },
      { name: 'TYPESCRIPT', image: 'assets/images/typescript.png', level: 85, category: 'frontend' },
      { name: 'ANGULAR', image: 'assets/images/angular.png', level: 90, category: 'frontend' },
      { name: 'REACT', image: 'assets/images/react.png', level: 75, category: 'frontend' },
      
      // Backend Skills
      { name: 'JAVA', image: 'assets/images/java.png', level: 80, category: 'backend' },
      { name: 'SPRING', image: 'assets/images/spring.png', level: 75, category: 'backend' },
      { name: 'SPRING BOOT', image: 'assets/images/Spring_Boot.png', level: 80, category: 'backend' },
      { name: 'POSTGRESQL', image: 'assets/images/postrgressql.png', level: 70, category: 'backend' },
      { name: 'MONGO DB', image: 'assets/images/mongo-db.png', level: 70, category: 'backend' },
      
      // Tools
      { name: 'GIT', image: 'assets/images/git.png', level: 85, category: 'tools' },
      { name: 'DOCKER', image: 'assets/images/docker.png', level: 70, category: 'tools' },
      { name: 'AZURE', image: 'assets/images/azure.png', level: 75, category: 'tools' },
      { name: 'VS CODE', image: 'assets/images/vscode.png', level: 90, category: 'tools' },
      { name: 'INTELLIJ', image: 'assets/images/intellij.png', level: 80, category: 'tools' }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        role: 'Senior Full Stack Developer',
        duration: 'Jan 2022 - Present',
        description: [
          'Led development of enterprise web applications using Angular, React, and Spring Boot',
          'Architected microservices solutions handling 10M+ daily transactions',
          'Mentored junior developers and established coding standards and best practices',
          'Improved application performance by 40% through optimization and refactoring',
          'Collaborated with cross-functional teams to deliver high-quality software solutions'
        ],
        current: true
      },
      {
        company: 'Digital Innovation Ltd.',
        role: 'Full Stack Developer',
        duration: 'Mar 2020 - Dec 2021',
        description: [
          'Developed responsive web applications using Angular, TypeScript, and Node.js',
          'Implemented RESTful APIs and integrated with various third-party services',
          'Designed and optimized PostgreSQL databases for improved query performance',
          'Participated in Agile development processes and code review sessions',
          'Contributed to CI/CD pipeline setup using Jenkins and Docker'
        ]
      },
      {
        company: 'StartupCorp',
        role: 'Junior Web Developer',
        duration: 'Jun 2019 - Feb 2020',
        description: [
          'Built interactive user interfaces using HTML5, CSS3, and JavaScript',
          'Assisted in developing e-commerce platforms with payment gateway integration',
          'Worked on bug fixes and feature enhancements for existing applications',
          'Learned and applied modern development frameworks and tools',
          'Participated in daily standups and sprint planning meetings'
        ]
      }
    ],
    projects: [
      {
        title: 'TaskFlow - Project Management System',
        description: 'A comprehensive project management application built with Angular and Spring Boot. Features include task tracking, team collaboration, real-time notifications, and advanced analytics dashboard.',
        image: 'assets/taskflow.png',
        technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'PostgreSQL', 'WebSocket', 'JWT'],
        category: 'web',
        liveUrl: 'https://taskflow-demo.com',
        githubUrl: 'https://github.com/yourusername/taskflow',
        featured: true
      },
      {
        title: 'Weather App',
        description: 'A responsive weather application that provides real-time weather data, forecasts, and location-based weather alerts. Built with modern web technologies and integrated with multiple weather APIs.',
        image: 'assets/weatherApp.png',
        technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'Weather API', 'CSS3'],
        category: 'web',
        liveUrl: 'https://weather-app-demo.com',
        githubUrl: 'https://github.com/yourusername/weather-app',
        featured: true
      },
      {
        title: 'Amazon Clone - E-commerce Platform',
        description: 'A full-stack e-commerce platform replicating Amazon\'s core features including product catalog, shopping cart, user authentication, payment processing, and order management.',
        image: 'assets/amazone-clone.png',
        technologies: ['Angular', 'TypeScript', 'Spring Boot', 'MySQL', 'Stripe API', 'AWS S3'],
        category: 'web',
        liveUrl: 'https://amazon-clone-demo.com',
        githubUrl: 'https://github.com/yourusername/amazon-clone',
        featured: true
      },
      {
        title: 'Unify - Team Collaboration Tool',
        description: 'A modern team collaboration platform with real-time messaging, file sharing, video conferencing, and project management capabilities. Designed for remote teams.',
        image: 'assets/unify.png',
        technologies: ['Angular', 'TypeScript', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
        category: 'web',
        liveUrl: 'https://unify-demo.com',
        githubUrl: 'https://github.com/yourusername/unify',
        featured: false
      },
      {
        title: 'DevFolio - Developer Portfolio',
        description: 'A modern, responsive portfolio template for developers. Features dark/light themes, animations, and responsive design. Built with clean code architecture.',
        image: 'assets/devfolio.svg',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'SCSS', 'Bootstrap'],
        category: 'web',
        liveUrl: 'https://devfolio-demo.com',
        githubUrl: 'https://github.com/yourusername/devfolio',
        featured: false
      },
      {
        title: 'REST API - Microservices Architecture',
        description: 'A scalable microservices-based REST API with authentication, rate limiting, caching, and comprehensive documentation. Built following industry best practices.',
        image: 'assets/api-icon.png',
        technologies: ['Spring Boot', 'Java', 'Docker', 'PostgreSQL', 'Redis', 'Swagger'],
        category: 'api',
        githubUrl: 'https://github.com/yourusername/microservices-api',
        featured: false
      }
    ],
    certifications: [
      {
        name: 'Angular Basic Certification',
        image: 'assets/angular-basic-certificate.png',
        issuer: 'Angular',
        date: '2023-06-15',
        credentialId: 'ANG-BASIC-2023-001'
      },
      {
        name: 'Angular Intermediate Certification',
        image: 'assets/angular-intermediate-certificate.png',
        issuer: 'Angular',
        date: '2023-08-20',
        credentialId: 'ANG-INT-2023-002'
      },
      {
        name: 'Microsoft Azure Fundamentals (AZ-900)',
        image: 'assets/az900-certificate.png',
        issuer: 'Microsoft',
        date: '2023-04-10',
        credentialId: 'MS-AZ900-2023-001'
      },
      {
        name: 'Java Basic Programming Certification',
        image: 'assets/java-basic-certificate.png',
        issuer: 'Oracle',
        date: '2023-03-25',
        credentialId: 'JAVA-BASIC-2023-001'
      },
      {
        name: 'Java MongoDB Integration Certification',
        image: 'assets/java-mongo-certificate.png',
        issuer: 'MongoDB University',
        date: '2023-07-12',
        credentialId: 'MONGO-JAVA-2023-001'
      },
      {
        name: 'React Development Certification',
        image: 'assets/react-certificate.png',
        issuer: 'Meta (Facebook)',
        date: '2023-05-18',
        credentialId: 'REACT-META-2023-001'
      },
      {
        name: 'SQL Database Certification',
        image: 'assets/sql-certificate.png',
        issuer: 'Oracle',
        date: '2023-02-28',
        credentialId: 'SQL-ORA-2023-001'
      },
      {
        name: 'Full Stack Web Developer Certification',
        image: 'assets/web-developer-certificate.png',
        issuer: 'Coursera',
        date: '2023-09-15',
        credentialId: 'FSWD-COURSERA-2023-001'
      }
    ],
    education: [
      {
        institution: 'Bharathiar University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        duration: '2020 - 2023',
        cgpa: '8.5',
        description: 'Focused on software development, data structures, algorithms, and modern web technologies. Completed various projects in Java, JavaScript, and database management.',
        achievements: [
          'Graduated with First Class Honours',
          'Led college tech fest web development team',
          'Winner of inter-college coding competition',
          'Published research paper on modern web frameworks'
        ]
      }
    ],
    blogPosts: [
      {
        id: '1',
        title: 'Building Modern Web Applications with Angular and Spring Boot',
        slug: 'building-modern-web-apps-angular-spring-boot',
        excerpt: 'Learn how to create robust, scalable web applications by combining the power of Angular frontend with Spring Boot backend. This comprehensive guide covers everything from project setup to deployment.',
        content: `
# Building Modern Web Applications with Angular and Spring Boot

In today's rapidly evolving web development landscape, creating robust and scalable applications requires the right combination of technologies. In this comprehensive guide, we'll explore how to build modern web applications using Angular for the frontend and Spring Boot for the backend.

## Why Angular and Spring Boot?

### Angular - The Frontend Powerhouse
Angular is a powerful TypeScript-based framework that offers:
- **Component-based architecture** for better code organization
- **TypeScript support** for enhanced developer experience
- **Powerful CLI tools** for rapid development
- **Rich ecosystem** with extensive libraries and tools

### Spring Boot - The Backend Champion
Spring Boot simplifies Java application development with:
- **Auto-configuration** that reduces boilerplate code
- **Embedded servers** for easy deployment
- **Production-ready features** out of the box
- **Extensive integration** with databases and other services

## Project Architecture

Our application follows a clean architecture pattern:

\`\`\`
Frontend (Angular)
├── Components
├── Services
├── Models
└── Guards

Backend (Spring Boot)
├── Controllers
├── Services
├── Repositories
└── Entities
\`\`\`

## Setting Up the Development Environment

### Prerequisites
- Node.js (v16 or higher)
- Java 11 or higher
- Maven or Gradle
- Your favorite IDE (VS Code, IntelliJ IDEA)

### Frontend Setup
\`\`\`bash
npm install -g @angular/cli
ng new my-app
cd my-app
ng serve
\`\`\`

### Backend Setup
\`\`\`bash
# Using Spring Initializr
curl https://start.spring.io/starter.zip \\
  -d dependencies=web,jpa,h2 \\
  -d name=my-backend \\
  -o my-backend.zip
unzip my-backend.zip
cd my-backend
./mvnw spring-boot:run
\`\`\`

## Building the REST API

Let's create a simple REST controller for managing users:

\`\`\`java
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }
}
\`\`\`

## Creating Angular Services

Now let's create an Angular service to consume our REST API:

\`\`\`typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }
}
\`\`\`

## Implementing Authentication

Security is crucial in modern web applications. Let's implement JWT-based authentication:

### Backend JWT Configuration
\`\`\`java
@Component
public class JwtTokenUtil {
    private String secret = "mySecretKey";
    private int jwtExpiration = 86400; // 24 hours

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }
    
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
}
\`\`\`

### Frontend Authentication Service
\`\`\`typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
\`\`\`

## Best Practices and Tips

### 1. Error Handling
Always implement proper error handling in both frontend and backend:

\`\`\`typescript
// Angular Error Interceptor
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized access
        }
        return throwError(error);
      })
    );
  }
}
\`\`\`

### 2. State Management
For complex applications, consider using NgRx for state management:

\`\`\`typescript
// User Actions
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
\`\`\`

### 3. Performance Optimization
- Use OnPush change detection strategy
- Implement lazy loading for routes
- Optimize bundle size with tree shaking
- Use caching strategies for API calls

## Deployment Strategies

### Frontend Deployment
\`\`\`bash
# Build for production
ng build --configuration production

# Deploy to various platforms
# Netlify, Vercel, AWS S3, etc.
\`\`\`

### Backend Deployment
\`\`\`bash
# Create JAR file
./mvnw clean package

# Deploy to cloud platforms
# AWS, Heroku, Docker containers
\`\`\`

## Conclusion

Building modern web applications with Angular and Spring Boot provides a robust foundation for scalable, maintainable applications. The combination offers:

- **Type safety** with TypeScript and Java
- **Rich ecosystems** with extensive libraries
- **Production-ready features** out of the box
- **Strong community support**

As you continue your development journey, remember to:
- Follow best practices and design patterns
- Implement proper testing strategies
- Monitor application performance
- Keep security as a top priority

Happy coding! 🚀

## Resources and Further Reading

- [Angular Official Documentation](https://angular.io/docs)
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Angular Best Practices](https://angular.io/guide/styleguide)
- [Spring Boot Security](https://spring.io/guides/gs/securing-web/)
        `,
        featuredImage: 'assets/angular.png',
        author: 'Ganesha Moorthy',
        publishDate: '2024-01-15',
        readTime: 12,
        tags: ['Angular', 'Spring Boot', 'Full Stack', 'Web Development', 'TypeScript', 'Java'],
        category: 'Web Development',
        featured: true,
        likes: 234,
        views: 1520
      }
    ]
  };

  getPortfolio(): Observable<Portfolio> {
    return of(this.portfolioData);
  }

  getSkillsByCategory(category: 'frontend' | 'backend' | 'tools'): Skill[] {
    return this.portfolioData.skills.filter(skill => skill.category === category);
  }

  getExperiences(): Observable<Experience[]> {
    return of(this.portfolioData.experience);
  }

  getPersonalInfo(): Observable<PersonalInfo> {
    return of(this.portfolioData.personalInfo);
  }

  getProjects(): Observable<Project[]> {
    return of(this.portfolioData.projects);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.portfolioData.projects.filter(project => project.featured));
  }

  getCertifications(): Observable<Certification[]> {
    return of(this.portfolioData.certifications);
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return of(this.portfolioData.blogPosts);
  }

  getFeaturedBlogPosts(): Observable<BlogPost[]> {
    return of(this.portfolioData.blogPosts.filter(post => post.featured));
  }

  getBlogPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return of(this.portfolioData.blogPosts.find(post => post.slug === slug));
  }

  getEducation(): Observable<Education[]> {
    return of(this.portfolioData.education);
  }

  incrementBlogViews(slug: string): Observable<boolean> {
    const post = this.portfolioData.blogPosts.find(p => p.slug === slug);
    if (post && post.views !== undefined) {
      post.views++;
      return of(true);
    }
    return of(false);
  }
}
