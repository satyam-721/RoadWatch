## Project Structure

```text
RoadWatch-Backend/
│
├── .mvn/                      # Maven wrapper files
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── net/tejas/roadwatch/
│   │   │
│   │   │   ├── aop/          # Aspect-Oriented Programming utilities
│   │   │   │   └── LoggingAspect.java
│   │   │   │
│   │   │   ├── controller/   # REST API endpoints/controllers
│   │   │   │
│   │   │   ├── service/      # Business logic layer
│   │   │   │
│   │   │   ├── dto/          # Data Transfer Objects (API request/response models)
│   │   │   │
│   │   │   ├── model/        # Database entities / domain models
│   │   │   │   └── Complaint.java
│   │   │   │
│   │   │   ├── repo/         # Database repositories (JPA interfaces)
│   │   │   │   └── ComplaintRepo.java
│   │   │   │
│   │   │   └── RoadWatchApplication.java
│   │   │       # Main Spring Boot application entry point
│   │   │
│   │   └── resources/        # Configuration files and static resources
│   │       ├── application.properties
│   │       └── static/
│   │
│   └── test/                 # Unit and integration tests
│
├── pom.xml                   # Maven dependencies and build configuration
├── mvnw                      # Maven wrapper script (Linux/Mac)
├── mvnw.cmd                  # Maven wrapper script (Windows)
└── HELP.md                   # Generated Spring Boot help/documentation
```
