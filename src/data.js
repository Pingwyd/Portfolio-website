export const projects = [
  {
    title: "Loyalty Card App",
    badge: "Client Work",
    badgeClass: "badge-client",
    meta: "May 2026 - Present",
    description:
      "Full-stack loyalty card system with QR-based check-ins and real-time WebSocket updates. Role-based dashboards (Owner, Staff, Customer) with dark glassmorphism UI, staff scanner with camera selection, audit trail, JWT auth, RBAC, rate limiting with lockout, and self-scan prevention.",
    skills: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Jinja2", "Bootstrap 5", "WebSockets", "JWT"],
    link: "https://github.com/Pingwyd",
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
    link: "https://github.com/Pingwyd/Hospi-bot",
  },

  {
    title: "Farm Labor Connect",
    badge: "Hackathon",
    badgeClass: "badge-group",
    meta: "2025",
    description:
      "Handled backend for a web app connecting farmers with agricultural workers using Flask and SQLAlchemy. Implemented RBAC (Admin, Farmer, Laborer), 2FA, BCrypt hashing, CSRF protection, XSS sanitization, encrypted document storage, and Interswitch payment API integration.",
    skills: ["Flask", "SQLAlchemy", "PostgreSQL", "2FA", "BCrypt", "CSRF", "Fernet", "Interswitch API"],
    link: "https://github.com/Pingwyd/Farm-Labor-Connect",
  },

  {
    title: "Digital Nurse",
    badge: "HACKATHON WINNER",
    badgeClass: "badge-winner",
    meta: "2025",
    description:
      "First place at Fintech Africa Launchpad Africa Demo Day, Cohort 2. A pregnancy companion app for Nigerian women, providing guidance and resources alongside hospitals, midwives, and nurses.",
    skills: ["Python", "FastAPI", "PostgreSQL"],
    link: "https://digitalnurse.com.ng",
  },

  {
    title: "Nudge",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "March 2026 - Present",
    description:
      "Cross-platform desktop productivity app built with Python and PyQt6 using a 3-layer architecture. Features persistent reminders, system tray integration, task groups with drag-and-drop, theming system (dark/light/OLED), auto-update pipeline via GitHub Releases, and CI/CD with GitHub Actions.",
    skills: ["Python", "PyQt6", "GitHub Actions", "CI/CD", "PyInstaller"],
    link: "https://github.com/Pingwyd/Nudge",
  },
  {
    title: "Employee Management System",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "Oct 2025 - Nov 2025",
    description:
      "Built a RESTful Employee Management System with 3-layer architecture (Controller, Service, Repository) handling HR operations across Admin, Manager, and Employee roles. Secured with JWT authentication, RBAC, and BCrypt password encryption. Implemented email verification with OTP dispatch via SMTP.",
    skills: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "JWT", "BCrypt", "SMTP"],
    link: "https://github.com/Pingwyd/EmployeeManagementSystem",
  },
  
  {
    title: "Opti",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "2025",
    description:
      "A prompt optimizer that holds context on a given project so prompts stay relevant to what you're actually building. Designed to reduce repetitive context setup across development sessions.",
    skills: ["Python", "LLM APIs"],
    link: "https://github.com/Pingwyd/opti",
  },
  {
    title: "LlamaBox",
    badge: "Personal",
    badgeClass: "badge-personal",
    meta: "2025",
    description:
      "An Electron wrapper for llama.cpp, allowing you to run it as a standalone desktop application instead of in a browser or terminal.",
    skills: ["Electron", "Node.js", "C++"],
    link: "https://github.com/Pingwyd/Llamabox",
  },

    {
    title: "Car Park Allocation System",
    badge: "Team Member",
    badgeClass: "badge-team",
    meta: "Ota, Ogun State - July 2025",
    description:
      "Developed an information system to automatically allocate parking spaces to workers using QR codes with embedded employee information. Tracks Employee ID, Name, Department, check-in/check-out times. Worked on database integration (defining schema, tables, relationships) and QR code development.",
    skills: ["Python", "SQLite", "Flask", "QRcode", "OpenCV", "pyzbar", "Pillow"],
    link: "https://github.com/Pingwyd/Car-park-Allocation-System",
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
