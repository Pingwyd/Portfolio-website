export const projects = [
  {
    title: "Loyalty Card App",
    badge: "Client Work",
    badgeClass: "badge-client",
    meta: "May 2026 - Present",
    description:
      "Full-stack loyalty card system with QR-based check-ins and real-time WebSocket updates. Role-based dashboards (Owner, Staff, Customer) with dark glassmorphism UI, staff scanner with camera selection, audit trail, JWT auth, RBAC, rate limiting with lockout, and self-scan prevention.",
    skills: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Jinja2", "Bootstrap 5", "WebSockets", "JWT"],
    github: "https://github.com/Pingwyd",
    private: true,
  },
  {
    title: "Hospitality Unit Bot",
    badge: "Freelance Project",
    badgeClass: "badge-freelance",
    meta: "Oct 2025 - Nov 2025",
    description:
      "Built a Telegram bot to streamline and optimize posting activities for the protocol subunit in the Hospitality Unit. Integrated auto-scheduled posting that saved time and ensured proper participation, increasing user engagement by ~45% in pilot testing.",
    skills: ["Python", "SQLite", "Telegram Bot API", "GitHub Copilot"],
    github: "https://github.com/Pingwyd/Hospi-bot",
    thumbnail: null,
  },
  {
    title: "Car Park Allocation System",
    badge: "Team Member",
    badgeClass: "badge-team",
    meta: "Ota, Ogun State - July 2025",
    description:
      "Developed an information system to automatically allocate parking spaces to workers using QR codes with embedded employee information. Tracks Employee ID, Name, Department, check-in/check-out times. Worked on database integration (defining schema, tables, relationships) and QR code development.",
    skills: ["Python", "SQLite", "Flask", "QRcode", "OpenCV", "pyzbar", "Pillow"],
    github: "https://github.com/Pingwyd/Car-park-Allocation-System",
  },
  {
    title: "Nudge",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "March 2026 - Present",
    description:
      "Cross-platform desktop productivity app built with Python and PyQt6 using a 3-layer architecture. Features persistent reminders, system tray integration, task groups with drag-and-drop, theming system (dark/light/OLED), auto-update pipeline via GitHub Releases, and CI/CD with GitHub Actions.",
    skills: ["Python", "PyQt6", "GitHub Actions", "CI/CD", "PyInstaller"],
    github: "https://github.com/Pingwyd/Nudge",
  },
  {
    title: "Employee Management System",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "Oct 2025 - Nov 2025",
    description:
      "Built a RESTful Employee Management System with 3-layer architecture (Controller, Service, Repository) handling HR operations across Admin, Manager, and Employee roles. Secured with JWT authentication, RBAC, and BCrypt password encryption. Implemented email verification with OTP dispatch via SMTP.",
    skills: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "JWT", "BCrypt", "SMTP"],
    github: "https://github.com/Pingwyd/EmployeeManagementSystem",
    thumbnail: null,
  },
  {
    title: "Farm Labor Connect",
    badge: "Hackathon",
    badgeClass: "badge-group",
    meta: "2025",
    description:
      "Handled backend for a web app connecting farmers with agricultural workers using Flask and SQLAlchemy. Implemented RBAC (Admin, Farmer, Laborer), 2FA, BCrypt hashing, CSRF protection, XSS sanitization, encrypted document storage, and Interswitch payment API integration.",
    skills: ["Flask", "SQLAlchemy", "PostgreSQL", "2FA", "BCrypt", "CSRF", "Fernet", "Interswitch API"],
    github: "https://github.com/Pingwyd/Farm-Labor-Connect",
    thumbnail: null,
  },
]

export const skillCategories = [
  {
    label: "Languages",
    skills: ["Python", "Java"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["Flask", "FastAPI", "Spring Boot", "SQLAlchemy", "JPA", "PyQt6", "OpenCV"],
  },
  {
    label: "Tools & Infrastructure",
    skills: ["PostgreSQL", "SQLite", "Docker", "Git", "JWT", "RBAC", "BCrypt", "WebSockets", "REST APIs", "CI/CD", "GitHub Actions"],
  },
]

export const process = [
  {
    step: "01",
    title: "Discover",
    description: "Understanding goals, requirements, and constraints before writing a line of code.",
  },
  {
    step: "02",
    title: "Design",
    description: "Architecture, database schema, and API contracts that scale.",
  },
  {
    step: "03",
    title: "Build",
    description: "Clean, tested, production-ready code with proper error handling.",
  },
  {
    step: "04",
    title: "Ship",
    description: "Deploy, monitor, and iterate based on real usage.",
  },
]
