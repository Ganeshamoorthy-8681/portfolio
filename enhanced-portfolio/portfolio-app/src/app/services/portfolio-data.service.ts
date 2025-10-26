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
      { name: 'HTML', image: 'assets/images/html.png', level: 95, category: 'frontend', useCase: 'Building semantic web page structures' },
      { name: 'CSS', image: 'assets/images/css.png', level: 90, category: 'frontend', useCase: 'Styling responsive and modern interfaces' },
      { name: 'JAVASCRIPT', image: 'assets/images/js.png', level: 85, category: 'frontend', useCase: 'Creating interactive web applications' },
      { name: 'SASS', image: 'assets/images/sass.png', level: 80, category: 'frontend', useCase: 'Writing maintainable CSS with variables' },
      { name: 'TYPESCRIPT', image: 'assets/images/typescript.png', level: 85, category: 'frontend', useCase: 'Type-safe JavaScript development' },
      { name: 'ANGULAR', image: 'assets/images/angular.png', level: 90, category: 'frontend', useCase: 'Building enterprise-level web applications' },
      { name: 'REACT', image: 'assets/images/react.png', level: 75, category: 'frontend', useCase: 'Developing component-based user interfaces' },

      // Backend Skills
      { name: 'JAVA', image: 'assets/images/java.png', level: 80, category: 'backend', useCase: 'Object-oriented backend development' },
      { name: 'SPRING', image: 'assets/images/spring.png', level: 75, category: 'backend', useCase: 'Dependency injection and MVC architecture' },
      { name: 'SPRING BOOT', image: 'assets/images/Spring_Boot.png', level: 80, category: 'backend', useCase: 'Rapid microservices development' },
      { name: 'POSTGRESQL', image: 'assets/images/postrgressql.png', level: 70, category: 'backend', useCase: 'Relational database management' },
      { name: 'MONGO DB', image: 'assets/images/mongo-db.png', level: 70, category: 'backend', useCase: 'NoSQL document-based data storage' },

      // Tools
      { name: 'GIT', image: 'assets/images/git.png', level: 85, category: 'tools', useCase: 'Version control and team collaboration' },
      { name: 'DOCKER', image: 'assets/images/docker.png', level: 70, category: 'tools', useCase: 'Containerizing applications for deployment' },
      { name: 'AZURE', image: 'assets/images/azure.png', level: 75, category: 'tools', useCase: 'Cloud hosting and DevOps solutions' },
      { name: 'VS CODE', image: 'assets/images/vscode.png', level: 90, category: 'tools', useCase: 'Primary IDE for web development' },
      { name: 'INTELLIJ', image: 'assets/images/intellij.png', level: 80, category: 'tools', useCase: 'Java development and debugging' }
    ],
    experience: [
      {
        company: 'Commvault',
        role: 'Software Engineer',
        duration: 'Sep 2023 - Present',
        description: [
          'Led development of enterprise web applications using Angular, React, and Spring Boot',
          'Mentored junior developers and established coding standards and best practices',
          'Improved application performance by 40% through optimization and refactoring',
          'Collaborated with cross-functional teams to deliver high-quality software solutions',
          'Participated in Agile development processes and code review sessions',
        ],
        current: true,
        icon: "rocket"
      },
      {
        company: 'Commvault',
        role: 'Software Engineer Intern',
        duration: 'Aug 2022 - Aug 2023',
        description: [
          'Built a strong foundation in full-stack development through hands-on experience',
          'Gained proficiency in Angular, JavaScript, TypeScript, and Spring Boot',
          'Contributed to team projects and collaborated with senior developers',
          'Learned best practices for code quality, testing, and deployment',
        ],
        icon: "laptop"
      }
    ],
    projects: [
      {
        title: 'IAM - Identity and Access Management System',
        description: 'A full-stack application for managing users and permissions using role-based access control.',
        image: 'assets/images/iam.png',
        technologies: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'JWT'],
        category: 'web',
        liveUrl: 'https://ganesh-iam.netlify.app/',
        githubUrl: 'https://github.com/Ganeshamoorthy-8681/spring-security-v2',
        featured: false
      },
      {
        title: 'TaskFlow - Project Management System',
        description: 'A comprehensive project management application built with Angular and Spring Boot',
        image: 'assets/images/taskflow.png',
        technologies: ['Angular', 'TypeScript', 'Spring Boot', 'Java', 'PostgreSQL'],
        category: 'web',
        liveUrl: '',
        githubUrl: 'https://github.com/Ganeshamoorthy-8681/todoapp-Backend',
        featured: true
      },
      {
        title: 'Cine Sphere',
        description: 'Explore detailed information about movies and TV shows. From cast and crew to plot summaries.',
        image: 'assets/images/cinesphere.png',
        technologies: ['React', 'JavaScript', 'Movie API', 'Material-UI'],
        category: 'web',
        liveUrl: 'https://movie-app-topaz-nine.vercel.app/',
        githubUrl: 'https://github.com/Ganeshamoorthy-8681/MovieApp',
        featured: true
      },
      {
        title: 'Weather App',
        description: 'A responsive weather application that provides real-time weather data, forecasts.',
        image: 'assets/images/weatherApp.png',
        technologies: ['React', 'JavaScript', 'Weather API', 'Material-UI'],
        category: 'web',
        liveUrl: 'https://weather-app-demo.com',
        githubUrl: 'https://github.com/Ganeshamoorthy-8681/WeatherApp',
        featured: true
      },

      // {
      //   title: 'Amazon Clone',
      //   description: 'Developed a clone of the Amazon e-commerce landing page to strengthen my HTML and CSS skills. This project involved replicating the layout, styling, and core elements, including product listings, navigation menus, and a search bar.',
      //   image: 'assets/images/amazone-clone.png',
      //   technologies: ['HTML5', 'CSS3', 'JavaScript'],
      //   category: 'web',
      //   liveUrl: 'https://ganeshamoorthy-8681.github.io/amazon-recreated/',
      //   githubUrl: 'https://github.com/Ganeshamoorthy-8681/amazon-recreated',
      //   featured: true
      // },
      // {
      //   title: 'Unify',
      //   description: 'Developed a responsive landing page based on a UX designer’s mockup, using the Unify template as a design reference.',
      //   image: 'assets/images/unify.png',
      //   technologies: ['HTML5', 'CSS3', 'Responsive Design'],
      //   category: 'web',
      //   liveUrl: 'https://ganeshamoorthy-8681.github.io/res-unify/',
      //   githubUrl: 'https://github.com/Ganeshamoorthy-8681/res-unify',
      //   featured: false
      // }
    ],
    certifications: [
      {
        name: 'Microsoft Azure Fundamentals (AZ-900)',
        image: 'assets/images/az900-certificate.png',
        issuer: 'Microsoft',
        date: '2025-01-11',
        credentialId: 'CDB25032D79552C1'
      },
      {
        name: 'Google Ai Essentials',
        image: 'assets/images/google-ai-essentials_page-0001.jpg',
        issuer: 'Coursera',
        date: '2025-04-06',
        credentialId: 'ZBZWQ2ZGT8EU'
      },
      {
        name: 'Angular Intermediate Certification',
        image: 'assets/images/angular-intermediate-certificate.png',
        issuer: 'HackerRank',
        date: '2024-10-01',
        credentialId: '83343A4091B9'
      },
      {
        name: 'Java MongoDB Integration Certification',
        image: 'assets/images/java-mongo-certificate.png',
        issuer: 'Udemy',
        date: '2024-09-08',
        credentialId: 'UC-ecfeeee19-194d-47d0-bfd1-21a992e9e98f'
      },
      {
        name: 'React Development Certification',
        image: 'assets/images/react-certificate.png',
        issuer: 'HackerRank',
        date: '2024-02-22',
        credentialId: '863F72ccE210'
      },
      {
        name: 'SQL Database Certification',
        image: 'assets/images/sql-certificate.png',
        issuer: 'Udemy',
        date: '2024-02-28',
        credentialId: 'UC-6952a9c2-cf99-4bbc-b3c3-6014dfafb9ae'
      },
      {
        name: 'Full Stack Web Developer Certification',
        image: 'assets/images/web-developer-certificate.png',
        issuer: 'Udemy',
        date: '2023-09-15',
        credentialId: 'UC-320f6f46-0b06-44e3-c76037fd8ce4'
      }
    ],
    education: [
      {
        institution: 'E.G.S. Pillay Engineering College, Nagapattinam',
        degree: 'Bachelor of Engineering',
        field: 'Electronics and Communication Engineering',
        duration: '2019 - 2023',
        cgpa: '8.81 / 10',
        description: 'Completed a comprehensive curriculum covering core engineering principles, programming, and system design.',
        achievements: [
          'Graduated with First Class Honors',
          'Teach Web Development to Junior Students as Part of College Club',
          'Completed a Project on IoT-based Smart Home Automation System.'
        ]
      }
    ],
    blogPosts: [
      {
        id: '1',
        title: 'Breaking Monoliths: Micro-Frontends in Angular with Native Federation',
        slug: 'breaking-monoliths-micro-frontends-angular-native-federation',
        contentType: 'markdown',
        excerpt: 'Learn how to break monolithic architectures by implementing micro-frontends in your Angular applications using native federation techniques.',
        content:
        `
# Breaking Monoliths: Micro-Frontends in Angular with Native Federation

In today's rapidly evolving web development landscape, creating robust and scalable applications requires the right combination of technologies. In this comprehensive guide, we'll explore how to break free from monolithic architectures by implementing micro-frontends in your Angular applications using native federation techniques.

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

\`\`\`typescript
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
- Node.js (v18 or higher)
- Java 17 or higher
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

## Best Practices and Deployment

### Performance Optimization
- Use OnPush change detection strategy
- Implement lazy loading for routes
- Optimize bundle size with tree shaking
- Use caching strategies for API calls

### Deployment
\`\`\`bash
# Build for production
ng build --configuration production

# Create JAR file
./mvnw clean package
\`\`\`

## Conclusion

Building modern web applications with Angular and Spring Boot provides a robust foundation for scalable, maintainable applications. Happy coding! 🚀
        `,
        featuredImage: 'assets/images/angular.png',
        author: 'Ganesha Moorthy',
        publishDate: '2025-03-26',
        readTime: 8,
        tags: ['Angular', 'Web Development', 'TypeScript', 'Micro-Frontends'],
        category: 'Web Development',
        featured: true,
        isExternal: true,
        externalUrl: 'https://medium.com/p/breaking-monoliths-micro-frontends-in-angular-with-native-federation',
        externalPlatform: 'Medium',
        likes: 0,
        views: 0
      },
//       {
//         id: '2',
//         title: 'Mastering TypeScript: Advanced Features for Modern Development',
//         slug: 'mastering-typescript-advanced-features',
//         contentType: 'markdown',
//         excerpt: 'Dive deep into TypeScript\'s advanced features including generics, decorators, and utility types. Learn how to write type-safe, maintainable code that scales with your applications.',
//         content: `
// # Mastering TypeScript: Advanced Features for Modern Development

// TypeScript has revolutionized JavaScript development by adding static type checking and modern language features. In this comprehensive guide, we'll explore advanced TypeScript features that will elevate your development skills.

// ## Advanced Type System

// ### Generic Types
// Generics allow you to create reusable components that work with multiple types:

// \`\`\`typescript
// interface Repository<T> {
//   findById(id: string): Promise<T | null>;
//   save(entity: T): Promise<T>;
//   delete(id: string): Promise<void>;
// }

// class UserRepository implements Repository<User> {
//   async findById(id: string): Promise<User | null> {
//     // Implementation
//     return null;
//   }
  
//   async save(user: User): Promise<User> {
//     // Implementation
//     return user;
//   }
  
//   async delete(id: string): Promise<void> {
//     // Implementation
//   }
// }
// \`\`\`

// ### Utility Types
// TypeScript provides powerful utility types for common transformations:

// \`\`\`typescript
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }

// // Create a type without password
// type PublicUser = Omit<User, 'password'>;

// // Create a type with optional properties
// type PartialUser = Partial<User>;

// // Create a type with only specific properties
// type UserCredentials = Pick<User, 'email' | 'password'>;
// \`\`\`

// ## Decorators and Metadata

// Decorators provide a way to add metadata and modify classes:

// \`\`\`typescript
// function Injectable(target: any) {
//   target.prototype.isInjectable = true;
// }

// function LogMethod(target: any, propertyName: string, descriptor: PropertyDescriptor) {
//   const method = descriptor.value;
  
//   descriptor.value = function (...args: any[]) {
//     console.log(\`Calling \${propertyName} with args:\`, args);
//     const result = method.apply(this, args);
//     console.log(\`Method \${propertyName} returned:\`, result);
//     return result;
//   };
// }

// @Injectable
// class DataService {
//   @LogMethod
//   fetchData(id: string): string {
//     return \`Data for \${id}\`;
//   }
// }
// \`\`\`

// ## Advanced Patterns

// ### Builder Pattern with TypeScript
// \`\`\`typescript
// class QueryBuilder {
//   private query: string = '';
  
//   select(fields: string[]): this {
//     this.query += \`SELECT \${fields.join(', ')} \`;
//     return this;
//   }
  
//   from(table: string): this {
//     this.query += \`FROM \${table} \`;
//     return this;
//   }
  
//   where(condition: string): this {
//     this.query += \`WHERE \${condition} \`;
//     return this;
//   }
  
//   build(): string {
//     return this.query.trim();
//   }
// }

// const query = new QueryBuilder()
//   .select(['name', 'email'])
//   .from('users')
//   .where('active = true')
//   .build();
// \`\`\`

// ## Conclusion

// These advanced TypeScript features provide powerful tools for building robust, maintainable applications. Continue practicing and exploring to master the full potential of TypeScript!
//         `,
//         featuredImage: 'assets/images/typescript.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-02-20',
//         readTime: 8,
//         tags: ['TypeScript', 'JavaScript', 'Programming', 'Web Development', 'Advanced'],
//         category: 'TypeScript',
//         featured: false,
//         likes: 189,
//         views: 1200
//       },
//       {
//         id: '3',
//         title: 'Cloud-Native Applications with Docker and Azure',
//         slug: 'cloud-native-docker-azure',
//         isExternal: true,
//         externalPlatform: 'Dev.to',
//         externalUrl: 'https://dev.to/ganeshamoorthy',
//         excerpt: 'Learn how to containerize applications with Docker and deploy them to Azure. This guide covers container best practices, Azure Container Instances, and deployment strategies.',
//         content: `
// # Cloud-Native Applications with Docker and Azure

// Modern applications are increasingly built with cloud-native principles in mind. This comprehensive guide will walk you through containerizing applications with Docker and deploying them to Microsoft Azure.

// ## Understanding Containerization

// Containers provide a lightweight, portable way to package applications with their dependencies:

// \`\`\`dockerfile
// # Multi-stage build for Node.js application
// FROM node:18-alpine AS builder
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci --only=production

// FROM node:18-alpine AS runtime
// WORKDIR /app
// COPY --from=builder /app/node_modules ./node_modules
// COPY . .
// EXPOSE 3000
// CMD ["node", "server.js"]
// \`\`\`

// ## Azure Container Services

// Azure offers multiple container hosting options:
// - **Azure Container Instances (ACI)**: Serverless containers
// - **Azure Kubernetes Service (AKS)**: Managed Kubernetes
// - **Azure App Service**: Platform-as-a-Service with container support

// ## Deployment Pipeline

// \`\`\`yaml
// # Azure DevOps Pipeline
// trigger:
// - main

// pool:
//   vmImage: 'ubuntu-latest'

// steps:
// - task: Docker@2
//   inputs:
//     command: 'build'
//     Dockerfile: '**/Dockerfile'
//     tags: '$(Build.BuildId)'

// - task: AzureCLI@2
//   inputs:
//     azureSubscription: 'Azure-Subscription'
//     scriptType: 'bash'
//     scriptLocation: 'inlineScript'
//     inlineScript: |
//       az container create \\
//         --resource-group myResourceGroup \\
//         --name myapp \\
//         --image myregistry.azurecr.io/myapp:$(Build.BuildId)
// \`\`\`

// This approach ensures consistent, scalable deployments across environments.
//         `,
//         featuredImage: 'assets/images/azure.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-03-10',
//         readTime: 15,
//         tags: ['Docker', 'Azure', 'Cloud', 'DevOps', 'Containers'],
//         category: 'Cloud',
//         featured: false,
//         likes: 156,
//         views: 980
//       },
//       {
//         id: '4',
//         title: 'Reactive Programming with Java Spring WebFlux',
//         slug: 'reactive-programming-spring-webflux',
//         excerpt: 'Explore reactive programming concepts and learn how to build non-blocking, scalable applications using Spring WebFlux. Perfect for handling high-concurrency scenarios.',
//         content: `
// # Reactive Programming with Java Spring WebFlux

// Reactive programming is a paradigm that deals with asynchronous data streams and the propagation of changes. Spring WebFlux brings reactive programming to the Spring ecosystem.

// ## Core Concepts

// ### Mono and Flux
// \`\`\`java
// // Mono - 0 or 1 element
// @GetMapping("/user/{id}")
// public Mono<User> getUser(@PathVariable String id) {
//     return userRepository.findById(id);
// }

// // Flux - 0 to N elements
// @GetMapping("/users")
// public Flux<User> getAllUsers() {
//     return userRepository.findAll();
// }
// \`\`\`

// ### Reactive Repository
// \`\`\`java
// @Repository
// public interface UserRepository extends ReactiveMongoRepository<User, String> {
    
//     Flux<User> findByLastNameStartingWith(String lastName);
    
//     @Query("{ 'age': { $gte: ?0, $lte: ?1 } }")
//     Flux<User> findByAgeBetween(int minAge, int maxAge);
    
//     Mono<User> findByEmail(String email);
// }
// \`\`\`

// ## Building Reactive REST APIs

// \`\`\`java
// @RestController
// @RequestMapping("/api/v1/users")
// public class UserController {
    
//     private final UserService userService;
    
//     public UserController(UserService userService) {
//         this.userService = userService;
//     }
    
//     @PostMapping
//     public Mono<ResponseEntity<User>> createUser(@RequestBody User user) {
//         return userService.createUser(user)
//             .map(savedUser -> ResponseEntity.ok(savedUser))
//             .defaultIfEmpty(ResponseEntity.badRequest().build());
//     }
    
//     @GetMapping("/search")
//     public Flux<User> searchUsers(@RequestParam String term) {
//         return userService.searchUsers(term)
//             .take(50) // Limit results
//             .timeout(Duration.ofSeconds(5)); // Add timeout
//     }
// }
// \`\`\`

// ## Error Handling and Resilience

// \`\`\`java
// @Service
// public class UserService {
    
//     public Mono<User> getUserWithFallback(String id) {
//         return userRepository.findById(id)
//             .switchIfEmpty(Mono.error(new UserNotFoundException(id)))
//             .onErrorResume(ex -> {
//                 log.error("Error fetching user: {}", ex.getMessage());
//                 return Mono.just(createDefaultUser());
//             })
//             .retry(3)
//             .timeout(Duration.ofSeconds(2));
//     }
    
//     public Flux<User> getAllUsersWithBackpressure() {
//         return userRepository.findAll()
//             .onBackpressureBuffer(1000)
//             .delayElements(Duration.ofMillis(100));
//     }
// }
// \`\`\`

// ## Performance Benefits

// Reactive programming excels in:
// - **High-concurrency scenarios**
// - **I/O-intensive operations**
// - **Real-time data streaming**
// - **Resource-efficient applications**

// \`\`\`java
// // Traditional blocking approach
// @GetMapping("/blocking")
// public List<User> getBlockingUsers() {
//     // Blocks thread for each database call
//     return userRepository.findAll();
// }

// // Reactive non-blocking approach
// @GetMapping("/reactive")
// public Flux<User> getReactiveUsers() {
//     // Non-blocking, handles backpressure
//     return userRepository.findAll();
// }
// \`\`\`

// ## Testing Reactive Code

// \`\`\`java
// @Test
// public void testUserCreation() {
//     User user = new User("John", "john@example.com");
    
//     StepVerifier.create(userService.createUser(user))
//         .expectNextMatches(savedUser -> 
//             savedUser.getId() != null && 
//             savedUser.getName().equals("John")
//         )
//         .verifyComplete();
// }

// @Test
// public void testErrorHandling() {
//     StepVerifier.create(userService.getUserById("invalid-id"))
//         .expectError(UserNotFoundException.class)
//         .verify();
// }
// \`\`\`

// ## Conclusion

// Spring WebFlux provides powerful tools for building reactive applications. While it requires a mindset shift from traditional blocking code, the benefits in scalability and resource utilization make it worth the investment for appropriate use cases.

// Start with simple reactive endpoints and gradually adopt more advanced patterns as your team becomes comfortable with reactive programming concepts.
//         `,
//         featuredImage: 'assets/images/spring.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-04-05',
//         readTime: 10,
//         tags: ['Java', 'Spring WebFlux', 'Reactive Programming', 'Backend', 'Performance'],
//         category: 'Java',
//         featured: false,
//         likes: 201,
//         views: 1350
//       },
//       {
//         id: '5',
//         title: 'Modern CSS Techniques: Grid, Flexbox, and Beyond',
//         slug: 'modern-css-techniques-grid-flexbox',
//         isExternal: true,
//         externalPlatform: 'CSS-Tricks',
//         externalUrl: 'https://css-tricks.com',
//         excerpt: 'Master modern CSS layout techniques including CSS Grid, Flexbox, and custom properties. Learn how to create responsive, maintainable designs with clean, semantic code.',
//         content: `
// # Modern CSS Techniques: Grid, Flexbox, and Beyond

// CSS has evolved tremendously in recent years. Modern layout techniques like CSS Grid and Flexbox have revolutionized how we approach web design. Let's explore these powerful tools.

// ## CSS Grid: The Ultimate Layout Tool

// CSS Grid provides two-dimensional layout control:

// \`\`\`css
// .grid-container {
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   grid-gap: 2rem;
//   padding: 2rem;
// }

// .grid-item {
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   border-radius: 8px;
//   padding: 1.5rem;
//   color: white;
// }

// /* Named grid areas */
// .layout {
//   display: grid;
//   grid-template-areas:
//     "header header header"
//     "sidebar main main"
//     "footer footer footer";
//   grid-template-rows: auto 1fr auto;
//   min-height: 100vh;
// }

// .header { grid-area: header; }
// .sidebar { grid-area: sidebar; }
// .main { grid-area: main; }
// .footer { grid-area: footer; }
// \`\`\`

// ## Flexbox: One-Dimensional Mastery

// Perfect for component-level layouts:

// \`\`\`css
// .flex-container {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 1rem;
// }

// .card {
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   min-height: 300px;
// }

// .card-content {
//   flex: 1;
// }

// .card-actions {
//   margin-top: auto;
//   padding-top: 1rem;
// }
// \`\`\`

// ## CSS Custom Properties (Variables)

// \`\`\`css
// :root {
//   --primary-color: #3b82f6;
//   --secondary-color: #8b5cf6;
//   --text-color: #1f2937;
//   --bg-color: #ffffff;
//   --border-radius: 8px;
//   --spacing-unit: 1rem;
  
//   /* Dark mode */
//   --dark-bg: #1f2937;
//   --dark-text: #f9fafb;
// }

// [data-theme="dark"] {
//   --bg-color: var(--dark-bg);
//   --text-color: var(--dark-text);
// }

// .button {
//   background: var(--primary-color);
//   color: white;
//   border-radius: var(--border-radius);
//   padding: calc(var(--spacing-unit) * 0.5) var(--spacing-unit);
//   transition: transform 0.2s ease;
// }

// .button:hover {
//   transform: translateY(-2px);
//   box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
// }
// \`\`\`

// ## Advanced Responsive Design

// \`\`\`css
// /* Container queries (when supported) */
// .card-container {
//   container-type: inline-size;
// }

// @container (min-width: 400px) {
//   .card {
//     display: flex;
//     align-items: center;
//   }
  
//   .card-image {
//     width: 150px;
//     height: 150px;
//   }
// }

// /* Modern responsive typography */
// .responsive-text {
//   font-size: clamp(1rem, 4vw, 2.5rem);
//   line-height: 1.4;
// }

// /* Intrinsic web design */
// .responsive-grid {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 2rem;
// }
// \`\`\`

// These modern CSS techniques provide powerful, efficient ways to create responsive, maintainable designs.
//         `,
//         featuredImage: 'assets/images/css.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-05-12',
//         readTime: 7,
//         tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design', 'Frontend'],
//         category: 'CSS',
//         featured: false,
//         likes: 143,
//         views: 890
//       },
//       {
//         id: '6',
//         title: 'Building RESTful APIs: Best Practices and Design Patterns',
//         slug: 'restful-apis-best-practices',
//         excerpt: 'Learn how to design and implement robust RESTful APIs following industry best practices. Covers HTTP methods, status codes, versioning, authentication, and error handling.',
//         content: `
// # Building RESTful APIs: Best Practices and Design Patterns

// RESTful APIs are the backbone of modern web applications. This guide covers essential best practices and design patterns for creating robust, scalable APIs.

// ## REST Principles

// ### Resource-Based URLs
// \`\`\`
// Good:
// GET /api/v1/users
// GET /api/v1/users/123
// POST /api/v1/users
// PUT /api/v1/users/123
// DELETE /api/v1/users/123

// Avoid:
// GET /api/v1/getUsers
// POST /api/v1/createUser
// GET /api/v1/user/delete/123
// \`\`\`

// ### HTTP Status Codes
// \`\`\`java
// @RestController
// @RequestMapping("/api/v1/users")
// public class UserController {

//     @GetMapping("/{id}")
//     public ResponseEntity<User> getUser(@PathVariable Long id) {
//         return userService.findById(id)
//             .map(user -> ResponseEntity.ok(user))
//             .orElse(ResponseEntity.notFound().build());
//     }

//     @PostMapping
//     public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserRequest request) {
//         User user = userService.createUser(request);
//         return ResponseEntity.status(HttpStatus.CREATED)
//             .location(URI.create("/api/v1/users/" + user.getId()))
//             .body(user);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<User> updateUser(
//             @PathVariable Long id, 
//             @Valid @RequestBody UpdateUserRequest request) {
        
//         return userService.updateUser(id, request)
//             .map(user -> ResponseEntity.ok(user))
//             .orElse(ResponseEntity.notFound().build());
//     }
// }
// \`\`\`

// ## Error Handling

// \`\`\`java
// @ControllerAdvice
// public class ApiExceptionHandler {

//     @ExceptionHandler(ValidationException.class)
//     public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
//         ErrorResponse error = ErrorResponse.builder()
//             .status(HttpStatus.BAD_REQUEST.value())
//             .message("Validation failed")
//             .details(ex.getErrors())
//             .timestamp(Instant.now())
//             .build();
            
//         return ResponseEntity.badRequest().body(error);
//     }

//     @ExceptionHandler(ResourceNotFoundException.class)
//     public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
//         ErrorResponse error = ErrorResponse.builder()
//             .status(HttpStatus.NOT_FOUND.value())
//             .message(ex.getMessage())
//             .timestamp(Instant.now())
//             .build();
            
//         return ResponseEntity.notFound().build();
//     }
// }

// @Data
// @Builder
// public class ErrorResponse {
//     private int status;
//     private String message;
//     private List<String> details;
//     private Instant timestamp;
// }
// \`\`\`

// ## Pagination and Filtering

// \`\`\`java
// @GetMapping
// public ResponseEntity<PageResponse<User>> getUsers(
//         @RequestParam(defaultValue = "0") int page,
//         @RequestParam(defaultValue = "20") int size,
//         @RequestParam(defaultValue = "id") String sortBy,
//         @RequestParam(defaultValue = "asc") String sortDir,
//         @RequestParam(required = false) String filter) {
    
//     Pageable pageable = PageRequest.of(page, size, 
//         Sort.Direction.fromString(sortDir), sortBy);
    
//     Page<User> users = userService.findUsers(filter, pageable);
    
//     PageResponse<User> response = PageResponse.<User>builder()
//         .content(users.getContent())
//         .page(users.getNumber())
//         .size(users.getSize())
//         .totalElements(users.getTotalElements())
//         .totalPages(users.getTotalPages())
//         .first(users.isFirst())
//         .last(users.isLast())
//         .build();
    
//     return ResponseEntity.ok(response);
// }
// \`\`\`

// ## API Versioning

// \`\`\`java
// // URL versioning
// @RequestMapping("/api/v1/users")
// public class UserV1Controller { }

// @RequestMapping("/api/v2/users")
// public class UserV2Controller { }

// // Header versioning
// @RequestMapping("/api/users")
// public class UserController {
    
//     @GetMapping(headers = "API-Version=1")
//     public ResponseEntity<UserV1> getUserV1(@PathVariable Long id) {
//         // V1 implementation
//     }
    
//     @GetMapping(headers = "API-Version=2")
//     public ResponseEntity<UserV2> getUserV2(@PathVariable Long id) {
//         // V2 implementation
//     }
// }
// \`\`\`

// ## Security and Authentication

// \`\`\`java
// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         return http
//             .csrf(csrf -> csrf.disable())
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/v1/auth/**").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/v1/users").hasRole("USER")
//                 .requestMatchers(HttpMethod.POST, "/api/v1/users").hasRole("ADMIN")
//                 .anyRequest().authenticated()
//             )
//             .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
//             .build();
//     }
// }

// // Rate limiting
// @Component
// public class RateLimitingFilter implements Filter {
    
//     private final RedisTemplate<String, String> redisTemplate;
    
//     @Override
//     public void doFilter(ServletRequest request, ServletResponse response, 
//                         FilterChain chain) throws IOException, ServletException {
        
//         HttpServletRequest httpRequest = (HttpServletRequest) request;
//         String clientId = getClientId(httpRequest);
        
//         if (isRateLimited(clientId)) {
//             HttpServletResponse httpResponse = (HttpServletResponse) response;
//             httpResponse.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
//             return;
//         }
        
//         chain.doFilter(request, response);
//     }
// }
// \`\`\`

// ## API Documentation

// \`\`\`java
// @RestController
// @RequestMapping("/api/v1/users")
// @Tag(name = "User Management", description = "Operations related to user management")
// public class UserController {

//     @GetMapping("/{id}")
//     @Operation(summary = "Get user by ID", description = "Retrieve a specific user by their unique identifier")
//     @ApiResponses({
//         @ApiResponse(responseCode = "200", description = "User found"),
//         @ApiResponse(responseCode = "404", description = "User not found"),
//         @ApiResponse(responseCode = "403", description = "Access denied")
//     })
//     public ResponseEntity<User> getUser(
//             @Parameter(description = "User ID", required = true)
//             @PathVariable Long id) {
//         // Implementation
//     }
// }
// \`\`\`

// ## Testing

// \`\`\`java
// @WebMvcTest(UserController.class)
// class UserControllerTest {

//     @Autowired
//     private MockMvc mockMvc;
    
//     @MockBean
//     private UserService userService;

//     @Test
//     void shouldReturnUser_WhenUserExists() throws Exception {
//         User user = new User(1L, "John Doe", "john@example.com");
//         when(userService.findById(1L)).thenReturn(Optional.of(user));

//         mockMvc.perform(get("/api/v1/users/1"))
//             .andExpect(status().isOk())
//             .andExpect(jsonPath("$.id").value(1))
//             .andExpect(jsonPath("$.name").value("John Doe"))
//             .andExpect(jsonPath("$.email").value("john@example.com"));
//     }

//     @Test
//     void shouldReturn404_WhenUserNotFound() throws Exception {
//         when(userService.findById(999L)).thenReturn(Optional.empty());

//         mockMvc.perform(get("/api/v1/users/999"))
//             .andExpect(status().isNotFound());
//     }
// }
// \`\`\`

// ## Performance Optimization

// \`\`\`java
// // Caching
// @Service
// public class UserService {
    
//     @Cacheable(value = "users", key = "#id")
//     public Optional<User> findById(Long id) {
//         return userRepository.findById(id);
//     }
    
//     @CacheEvict(value = "users", key = "#user.id")
//     public User updateUser(User user) {
//         return userRepository.save(user);
//     }
// }

// // Async processing
// @RestController
// public class AsyncController {
    
//     @PostMapping("/api/v1/reports")
//     public ResponseEntity<String> generateReport(@RequestBody ReportRequest request) {
//         CompletableFuture.supplyAsync(() -> reportService.generateReport(request));
        
//         return ResponseEntity.accepted()
//             .body("Report generation started. Check status at /api/v1/reports/status/" + request.getId());
//     }
// }
// \`\`\`

// Following these best practices ensures your APIs are robust, scalable, and maintainable. Remember to always consider security, performance, and developer experience when designing your APIs.
//         `,
//         featuredImage: 'assets/images/spring.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-06-18',
//         readTime: 14,
//         tags: ['REST API', 'Spring Boot', 'Backend', 'Architecture', 'Best Practices'],
//         category: 'Backend',
//         featured: true,
//         likes: 287,
//         views: 1890
//       },
//       {
//         id: '7',
//         title: 'Introduction to Web Development: HTML Structure and Semantics',
//         slug: 'introduction-web-development-html',
//         contentType: 'html',
//         excerpt: 'A beginner-friendly guide to HTML structure and semantic elements. Learn how to build accessible, well-structured web pages using modern HTML5 features.',
//         content: `
// <article class="html-content">
//   <header>
//     <h1>Introduction to Web Development: HTML Structure and Semantics</h1>
//     <p class="lead">HTML (HyperText Markup Language) is the foundation of web development. In this guide, we'll explore how to create well-structured, semantic HTML documents.</p>
//   </header>

//   <section>
//     <h2>What is Semantic HTML?</h2>
//     <p>Semantic HTML uses elements that have meaning and describe the content they contain. Instead of using generic <code>&lt;div&gt;</code> elements everywhere, we use specific elements like:</p>
    
//     <ul>
//       <li><strong>&lt;header&gt;</strong> - For page or section headers</li>
//       <li><strong>&lt;nav&gt;</strong> - For navigation menus</li>
//       <li><strong>&lt;main&gt;</strong> - For the main content area</li>
//       <li><strong>&lt;article&gt;</strong> - For standalone content</li>
//       <li><strong>&lt;section&gt;</strong> - For thematic groupings</li>
//       <li><strong>&lt;aside&gt;</strong> - For sidebar content</li>
//       <li><strong>&lt;footer&gt;</strong> - For page or section footers</li>
//     </ul>
//   </section>

//   <section>
//     <h2>HTML Document Structure</h2>
//     <p>Every HTML document follows a standard structure:</p>
    
//     <pre><code class="language-html">&lt;!DOCTYPE html&gt;
// &lt;html lang="en"&gt;
// &lt;head&gt;
//   &lt;meta charset="UTF-8"&gt;
//   &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
//   &lt;title&gt;Page Title&lt;/title&gt;
// &lt;/head&gt;
// &lt;body&gt;
//   &lt;header&gt;
//     &lt;h1&gt;Site Title&lt;/h1&gt;
//     &lt;nav&gt;
//       &lt;!-- Navigation links --&gt;
//     &lt;/nav&gt;
//   &lt;/header&gt;
  
//   &lt;main&gt;
//     &lt;article&gt;
//       &lt;!-- Main content --&gt;
//     &lt;/article&gt;
//   &lt;/main&gt;
  
//   &lt;footer&gt;
//     &lt;!-- Footer content --&gt;
//   &lt;/footer&gt;
// &lt;/body&gt;
// &lt;/html&gt;</code></pre>
//   </section>

//   <section>
//     <h2>Accessibility Benefits</h2>
//     <blockquote>
//       <p>"Good HTML is the foundation of accessibility. When we use semantic elements correctly, we provide screen readers and other assistive technologies with the context they need to help users navigate our content."</p>
//     </blockquote>
    
//     <p>Key accessibility practices include:</p>
//     <ol>
//       <li>Using proper heading hierarchy (h1, h2, h3, etc.)</li>
//       <li>Adding alt text to images</li>
//       <li>Using form labels correctly</li>
//       <li>Ensuring sufficient color contrast</li>
//       <li>Making interactive elements keyboard accessible</li>
//     </ol>
//   </section>

//   <footer>
//     <p><em>Remember: Good HTML structure is the foundation of great web development. Take time to plan your document structure before you start coding!</em></p>
//   </footer>
// </article>
//         `,
//         featuredImage: 'assets/images/html.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-07-22',
//         readTime: 6,
//         tags: ['HTML', 'Web Development', 'Accessibility', 'Semantics', 'Beginner'],
//         category: 'HTML',
//         featured: false,
//         likes: 134,
//         views: 756
//       },
//       {
//         id: '8',
//         title: 'Quick Guide: Setting Up Your Development Environment',
//         slug: 'quick-guide-dev-environment-setup',
//         contentType: 'text',
//         excerpt: 'A straightforward, no-nonsense guide to setting up a modern web development environment. Perfect for beginners who want to get started quickly.',
//         content: `Setting Up Your Development Environment

// Getting started with web development can feel overwhelming, but setting up your development environment doesn't have to be complicated. Here's a simple guide to get you up and running quickly.

// **Essential Tools You'll Need:**

// 1. **Code Editor**
//    Visual Studio Code (VS Code) is the most popular choice among developers. It's free, lightweight, and has excellent extensions for web development.
//    Download from: https://code.visualstudio.com

// 2. **Web Browser**
//    Chrome or Firefox with developer tools are essential for testing and debugging your applications.

// 3. **Version Control**
//    Git is crucial for tracking changes in your code and collaborating with others.
//    Download from: https://git-scm.com

// 4. **Package Manager**
//    Node.js comes with npm (Node Package Manager) which you'll need for managing JavaScript libraries.
//    Download from: https://nodejs.org

// **Quick Setup Steps:**

// Step 1: Install VS Code
// - Download and install VS Code
// - Install essential extensions:
//   * Live Server (for local development server)
//   * Prettier (code formatting)
//   * Auto Rename Tag
//   * Bracket Pair Colorizer

// Step 2: Install Git
// - Download and install Git
// - Set up your global configuration:
//   git config --global user.name "Your Name"
//   git config --global user.email "your.email@example.com"

// Step 3: Install Node.js
// - Download and install the LTS version
// - Verify installation by running: node --version

// Step 4: Create Your First Project
// - Create a new folder for your project
// - Open it in VS Code
// - Create an index.html file
// - Use Live Server extension to preview your work

// **Recommended VS Code Extensions:**

// * HTML CSS Support
// * JavaScript (ES6) code snippets
// * Path Intellisense
// * GitLens
// * Material Icon Theme
// * One Dark Pro (theme)

// **Pro Tips:**

// - Learn keyboard shortcuts early - they'll save you tons of time
// - Customize your VS Code settings to match your preferences
// - Set up a consistent folder structure for your projects
// - Use the integrated terminal in VS Code instead of switching between applications
// - Enable auto-save to avoid losing work

// **Next Steps:**

// Once you have your environment set up, start with basic HTML and CSS projects. Practice building simple web pages before moving on to JavaScript and frameworks.

// Remember: The best development environment is the one you're comfortable using. Don't feel pressured to use every tool available - start simple and add complexity as you grow.

// Happy coding!`,
//         featuredImage: 'assets/images/vscode.png',
//         author: 'Ganesha Moorthy',
//         publishDate: '2024-08-15',
//         readTime: 4,
//         tags: ['Development Environment', 'VS Code', 'Git', 'Beginner', 'Setup'],
//         category: 'Tools',
//         featured: false,
//         likes: 98,
//         views: 542
//       }
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
