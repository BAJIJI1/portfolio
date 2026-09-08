// Central content file — update project/skill/experience info here.

export const profile = {
  name: "Bajiji Borah",
  title: "Full-Stack Software Developer",
  location: "Kigali, Rwanda",
  email: "borah9081@gmail.com",
  phone: "+250 780 112 604",
  github: "https://github.com/BAJIJI1",
  githubHandle: "github.com/BAJIJI1",
  linkedin: "https://linkedin.com/in/bajiji-borah",
  linkedinHandle: "linkedin.com/in/bajiji-borah",
  availability: "Open to Opportunities",
  // Placeholder list — confirm/update these
  currentlyLearning: ["Rust", "Geospatial Systems", "Cloud Computing"],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Kinyarwanda", level: "Native" },
  ],
  cvPath: "/cv/Bajiji_Borah_CV%20!!.pdf",
  photo: "/assets/profile-photo.png",
};

export const profileSummary = `Full-stack software developer based in Kigali, currently working at Zigama CSS, building secure, data-driven web applications end to end — including Z-Connect, a call center management system built largely independently with two-factor authentication, SMS/email notifications, a customer-facing chatbot, and interactive analytics dashboards, as well as a live real-time transaction dashboard for a Fraud Detection System. Comfortable across React, Spring Boot, ASP.NET Core, REST APIs, SQL Server, PostgreSQL, and MySQL, with a track record of picking up new frameworks quickly.`;

export const journeyStory = `My journey into technology began with a science background that developed my passion for problem-solving. At AUCA, I pursued Software Engineering and turned that passion into practical skills through full-stack development and hands-on projects using technologies such as Java, Spring Boot, C#, ASP.NET Core, React, and databases. My experience at Zigama CSS has further strengthened my professional skills by allowing me to work on real-world systems. Today, I continue to grow as a Full Stack Developer, focused on building innovative solutions and creating meaningful impact through technology.`;

export const journeyMilestones = [
  {
    year: "2019 – 2022",
    title: "A2 Science Courses",
    place: "Groupe Scolaire de Gahini",
    description: "Built a foundation in logical thinking and problem-solving through a science-focused curriculum.",
  },
  {
    year: "2022",
    title: "Started Software Engineering",
    place: "Adventist University of Central Africa (AUCA)",
    description: "Began turning curiosity into practical technical skills, building real software solutions.",
  },
  {
    year: "2023",
    title: "Self-Directed Full-Stack Learning",
    place: "Java, Spring Boot, C#, ASP.NET Core, React",
    description: "Explored full-stack development and modern databases through academic and personal projects.",
  },
  {
    year: "Mar 2026",
    title: "Joined Zigama CSS",
    place: "Software Developer",
    description: "Applied skills in a professional environment, contributing to real-world financial systems.",
  },
  {
    year: "2026",
    title: "Built HRMS, Fraud Detection & Z-Connect",
    place: "Zigama CSS",
    description: "Delivered secure, data-driven systems end to end, from access control to live analytics dashboards.",
  },
  {
    year: "Present",
    title: "Growing Toward Technology Leadership",
    place: "Full Stack Developer",
    description: "Continuing to grow with a vision of building innovative technology with meaningful impact.",
  },
];

export const futureVision = `Looking ahead, I want to keep growing as a full-stack developer — expanding from React, Spring Boot, and ASP.NET Core into cloud infrastructure, applied AI, and security-focused system design. The work I've done at Zigama CSS, from the Fraud Detection System's real-time pipelines to Z-Connect's authentication and notification layers, is the foundation I want to build on: larger, more autonomous platforms that Rwandan businesses and institutions can depend on. Long term, I want to lead engineering teams while staying hands-on with the code, turning ambitious ideas into systems that actually ship.`;

export const skillGroups = [
  {
    group: "Programming Languages",
    subtitle: "Core languages for backend, systems & scripting",
    skills: ["Java", "OOP", "C", "C++", "PHP", "JavaScript", "C#"],
  },
  {
    group: "Backend Frameworks",
    subtitle: "Building secure, scalable server-side applications",
    skills: ["C#", "ASP.NET Core MVC", "Spring Boot", "Node.js"],
  },
  {
    group: "Frontend Technologies",
    subtitle: "Crafting responsive, modern user interfaces",
    skills: ["HTML5", "CSS3", "React", "Tailwind CSS", "Bootstrap 5", "jQuery"],
  },
  {
    group: "Databases",
    subtitle: "Relational design across SQL platforms",
    skills: ["SQL Server", "MySQL", "PostgreSQL", "Oracle"],
  },
  {
    group: "Tools & Technologies",
    subtitle: "Version control, testing & dev workflow",
    skills: ["Git", "GitHub", "Postman", "VS Code", "XAMPP", "Docker", "Entity Framework Core"],
  },
  {
    group: "Concepts & Methodologies",
    subtitle: "Architecture patterns & engineering practices",
    skills: ["REST APIs", "OOP", "MVC Architecture", "Database Design", "Version Control"],
  },
];

export const stats = [
  { label: "Years Learning & Building", value: 4, suffix: "+" },
  { label: "Projects Shipped", value: 9, suffix: "+" },
  { label: "Technologies Used", value: 20, suffix: "+" },
  { label: "Production Systems at Zigama CSS", value: 3, suffix: "" },
];

export const experience = {
  role: "Software Developer",
  company: "Zigama CSS",
  location: "Kigali",
  period: "Mar 2026 – Present",
  projects: [
    {
      name: "HRMS",
      subtitle: "Zigama CSS",
      points: [
        "Tested system control weaknesses",
        "Analyzed payroll processing workflow",
        "Tested payroll integrity controls",
        "Implemented HRMS user data structure",
        "Performed access control and role analysis",
      ],
    },
    {
      name: "Fraud Detection System",
      subtitle: "Zigama CSS",
      points: [
        "Deployed a 6-service microservices pipeline in Docker",
        "Built a live dashboard for real-time transaction scoring",
        "Implemented TOTP-based 2FA and 3-tier role-based access control",
      ],
    },
    {
      name: "Z-Connect",
      subtitle: "Zigama Call Center Management System (ZCCMS)",
      points: [
        "Enterprise-grade call center management system, ASP.NET Core MVC, role-based access (Admin/Supervisor/Agent)",
        "Mandatory 2FA enrollment verification, 6-digit OTP password recovery with 3-minute expiry",
        "SMTP + SMS (MTN/Airtel) notification pipelines with dev-mode fallback logging",
        "Customer-facing chatbot for ticket filing/status tracking, automatic department routing, 5-day SLA countdown",
        "Interactive dashboard analytics (3D pie & isometric bar charts), parameter-based printable PDF reports",
        "Full audit logging, safe cascading user deletion, real-time search/filtering",
      ],
      tech: [
        "ASP.NET Core 10.0 MVC",
        "Entity Framework Core",
        "SQL Server",
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "Bootstrap 5",
      ],
    },
  ],
};

export const projectCategories = ["All", "Web", "Mobile", "AI"];

export const projects = [
  {
    slug: "agrioptima",
    name: "AgriOptima",
    tagline: "AI-Powered Crop Recommendation System",
    description:
      "An AI-powered decision-support system helping farmers make informed crop planning decisions based on market trend.",
    features: [
      "AI conversational assistant (AgriChat)",
      "Intelligent crop recommendations",
      "Market demand / profitability analysis",
      "Overproduction risk detection",
      "Scenario comparison",
      "Farmer-friendly interface",
    ],
    tech: ["Java", "Spring Boot", "FastAPI", "PostgreSQL", "AI/ML concepts", "Git"],
    categories: ["Web", "AI"],
    github: "https://github.com/BAJIJI1/AgriOptima-FinalYearProject-",
    images: [
      "/assets/projects/agrioptima-1.png",
      "/assets/projects/agrioptima-2.png",
      "/assets/projects/agrioptima-3.png",
      "/assets/projects/agrioptima-4.png",
      "/assets/projects/agrioptima-5.png",
      "/assets/projects/agrioptima-6.png",
      "/assets/projects/agrioptima-7.png",
    ],
    liveDemo: "https://agri-optima-finalyearproject.vercel.app/",
  },
  {
    slug: "librax",
    name: "Librax",
    tagline: "Role-Driven Library Book & Membership Management System",
    description:
      "Full-stack library management system with role-based access control for librarians, members, and administrators.",
    features: [],
    tech: ["React", "Vite", "Spring Boot", "REST API", "Java", "JavaScript"],
    categories: ["Web"],
    github: "https://github.com/BAJIJI1/Librax",
    images: [
      "/assets/projects/librax-1.png",
      "/assets/projects/librax-2.png",
      "/assets/projects/librax-3.png",
    ],
    liveDemo: null,
  },
  {
    slug: "rwandair-ebooking",
    name: "Rwandair E-Booking System",
    tagline: "Airline Booking Management System",
    description:
      "Airline booking management system for users and administrative staff, with OTP verification for secure access.",
    features: [],
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    categories: ["Web"],
    github: "https://github.com/BAJIJI1/WEB-DESIGN-PROJECT_FinalExam/tree/main/rwandair_booking_system",
    images: [
      "/assets/projects/rwandair-1.png",
      "/assets/projects/rwandair-2.png",
      "/assets/projects/rwandair-3.png",
    ],
    liveDemo: null,
  },
  {
    slug: "medihafi",
    name: "MediHafi",
    tagline: "Smart Health Facility Finder (Android App)",
    description:
      "An Android application that helps users find nearby health facilities quickly and make informed decisions during medical needs, including emergencies.",
    features: [
      "Nearby health facility discovery",
      "Interactive map display with facility markers",
      "Detailed facility profiles (services/contact/availability)",
      "Smart AI-assisted facility recommendation",
      "Search and filtering",
      "Distance display between user and facility",
    ],
    tech: [
      "Java (Android SDK)",
      "Retrofit & OkHttp",
      "OpenAI GPT-4o mini",
      "Google Maps API",
      "OpenStreetMap / osmdroid",
      "SQLite",
      "Android SpeechRecognizer & TextToSpeech",
    ],
    categories: ["Mobile", "AI"],
    github: "https://github.com/BAJIJI1/MediHafi",
    images: [
      "/assets/projects/medihafi-1.png",
      "/assets/projects/medihafi-2.png",
      "/assets/projects/medihafi-3.png",
    ],
    liveDemo: null,
  },
  {
    slug: "spendly",
    name: "Spendly",
    tagline: "Personal Expenses Monitoring System",
    description:
      "A personal finance application for tracking and monitoring individual expenses, helping users understand and manage their spending habits, view spending patterns, and stay on top of their budget.",
    features: [],
    tech: ["React", "Vite", "Spring Boot", "REST API", "Java", "JavaScript"],
    categories: ["Web"],
    github: "https://github.com/BAJIJI1/Spendly",
    images: [
      "/assets/projects/spendly-1.png",
      "/assets/projects/spendly-2.png",
      "/assets/projects/spendly-3.png",
    ],
    // Placeholder — replace once deployed
    liveDemo: "https://spendly-demo.vercel.app",
    liveDemoPlaceholder: true,
  },
  {
    slug: "fitflow",
    name: "FitFlow",
    tagline: "Gym Management Platform",
    description:
      "An ASP.NET Core Razor Pages gym management platform for admins, trainers, and members, covering identity/role management, class scheduling, bookings with waitlist handling, and automated email notifications.",
    features: [
      "Admin management of users/trainers/members/classes",
      "Trainer-created and edited schedules with collision prevention",
      "Member class browsing/booking/waitlist/cancellation",
      "Automatic waitlist promotion when a slot frees up",
      "Booking lifecycle email notifications",
      "Background reminder emails shortly before class time",
    ],
    tech: [
      ".NET 10",
      "ASP.NET Core Razor Pages",
      "Entity Framework Core 10",
      "SQL Server",
      "ASP.NET Core Identity",
      "Postmark",
    ],
    categories: ["Web"],
    github: "https://github.com/BAJIJI1/FitFlow",
    images: [
      "/assets/projects/fitflow-1.png",
      "/assets/projects/fitflow-2.png",
      "/assets/projects/fitflow-3.png",
    ],
    // Placeholder — replace once deployed
    liveDemo: "https://fitflow-demo.vercel.app",
    liveDemoPlaceholder: true,
  },
];

export const testimonials = [
  {
    name: "Bisengimana Ivan",
    title: "System Developer, Rwanda Revenue Authority, Kigali",
    quote: "A dedicated and fast-learning developer with strong problem-solving skills.",
    photo: "/assets/testimonials/bisengimana-ivan.jpg",
  },
  {
    name: "Iragena Aimable",
    title: "Lecturer, Adventist University of Central Africa (AUCA), Kigali",
    quote: "One of the most consistent and hardworking students I have supervised.",
    photo: "/assets/testimonials/iragena-aimable.jpg",
  },
  {
    name: "Maj Emile Musoni",
    title: "IT Director, Zigama CSS, Kigali",
    quote: "A reliable developer who brings both technical skill and a strong sense of ownership to every project.",
    photo: "/assets/testimonials/emile-musoni.jpg",
  },
];

export const education = [
  {
    degree: "Bachelor's Degree in Information Technology, Major in Software Engineering",
    place: "Adventist University of Central Africa (AUCA), Kigali",
    period: "Expected Nov 2026",
    details:
      "Related coursework: .NET, Web Technology, Java Programming, OOP, PL/SQL, DBMS, Software Testing, Data Structures & Algorithms, Mobile Programming, C Programming, Software Modelling and Design",
  },
  {
    degree: "Advanced Level (A2), Science Courses",
    place: "Groupe Scolaire de Gahini, Kigali, Kayonza",
    period: "Jan 2019 – Aug 2022",
    details: "Science Courses",
  },
];

// Real issuer badge/logo shown on each certificate card. Add the files and
// they'll appear automatically — falls back to a generic badge icon until then.
export const issuerLogos = {
  "Cisco Networking Academy": "/assets/issuers/cisco.png",
  "Internet Society": "/assets/issuers/internet-society.png",
  "The Gym Rwanda": "/assets/issuers/the-gym-rwanda.png",
};

export const certificates = [
  {
    name: "Ethical Hacker (Intermediate)",
    issuer: "Cisco Networking Academy",
    date: "Aug 2024",
    description: "Intermediate-level training in ethical hacking methodology, vulnerability assessment, and penetration testing fundamentals.",
    // Fill in once you share the credential ID / verification link.
    credentialId: null,
    credentialUrl: null,
    // Certificate paper image — add the file and it will show automatically.
    paper: "/assets/certificates/ethical-hacker-intermediate.jpg",
    // Downloadable PDF — add the file and a "Download PDF" button appears in the modal.
    pdf: null,
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Aug 2024",
    description: "Core cybersecurity concepts covering common threats, vulnerabilities, and best practices for protecting systems and data.",
    credentialId: null,
    credentialUrl: null,
    paper: "/assets/certificates/intro-to-cybersecurity.jpg",
    pdf: null,
  },
  {
    name: "Advanced Network Operations",
    issuer: "Internet Society",
    date: "Jul 2024",
    description: "Deepened skills in network security, routing, and infrastructure operations for building reliable, resilient networks.",
    credentialId: null,
    credentialUrl: null,
    paper: "/assets/certificates/advanced-network-operations.jpg",
    pdf: null,
  },
  {
    name: "Computer Hardware Basics Course",
    issuer: "Cisco Networking Academy",
    date: "Jun 2024",
    description: "Core computer hardware concepts, from components and assembly to basic troubleshooting.",
    credentialId: null,
    credentialUrl: null,
    paper: "/assets/certificates/computer-hardware-basics.jpg",
    pdf: null,
  },
  {
    name: "Introduction to Network Operations",
    issuer: "Internet Society",
    date: "Apr 2024",
    description: "Foundational training covering core networking concepts, protocols, and day-to-day operational best practices.",
    credentialId: "102943669",
    credentialUrl: null,
    paper: "/assets/certificates/intro-network-operations.jpg",
    pdf: null,
  },
  {
    name: "Networking Essentials",
    issuer: "Cisco Networking Academy",
    date: "Jan 2024",
    description: "Fundamentals of networking, including addressing, protocols, and core infrastructure concepts.",
    credentialId: null,
    credentialUrl: null,
    paper: "/assets/certificates/networking-essentials.jpg",
    pdf: null,
  },
  {
    name: "Preparatory Training (Coding)",
    issuer: "The Gym Rwanda",
    date: "Jan 2026",
    description: "Intensive bootcamp-style preparation in programming fundamentals, logic, and problem-solving ahead of full-stack training.",
    credentialId: null,
    credentialUrl: null,
    paper: "/assets/certificates/preparatory-training-coding.jpg",
    pdf: null,
  },
];

// Placeholder — replace YOUR_FORM_ID with the real Formspree form ID once created.
export const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";

export const objectiveOptions = [
  "Job opportunity",
  "Freelance / contract project",
  "Collaboration",
  "Just saying hello",
  "Other",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Vision", href: "#vision" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
