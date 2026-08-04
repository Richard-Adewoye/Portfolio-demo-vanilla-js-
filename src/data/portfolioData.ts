import { ProfileData, Project, Experience, Skill, Testimonial, Service } from '../types';

export const initialProfileData: ProfileData = {
  name: "Alex Rivera",
  title: "Senior Full Stack & UI Systems Engineer",
  tagline: "Architecting high-performance web applications, intuitive user interfaces, and scalable full-stack products.",
  bio: "I am a full-stack engineer with over 6 years of experience transforming complex technical problems into fluid, human-centric software. Specializing in TypeScript, React, Node.js, and modern AI integrations, I bridge the gap between pixel-perfect design systems and robust backend architecture.",
  avatarUrl: "/src/assets/images/portfolio_avatar_1785880482337.jpg",
  email: "alex.rivera.dev@example.com",
  phone: "+1 (555) 382-9104",
  location: "San Francisco, CA (Remote)",
  availabilityStatus: "Available for Q3 Projects & Full-Time Senior Roles",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    dribbble: "https://dribbble.com"
  },
  stats: {
    yearsExperience: 6,
    projectsCompleted: 38,
    happyClients: 29,
    codeCommitsThisYear: 1840
  }
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Apex - Enterprise Analytics Dashboard",
    shortDescription: "Real-time high-throughput telemetry and metrics visualizer with custom WebGL widgets and micro-frontend architecture.",
    fullDescription: "Apex is an enterprise-grade observability platform designed for infrastructure teams monitoring global server clusters. Built with React 19, TypeScript, and WebSockets, it streams over 50,000 telemetry events per second with 60 FPS visual rendering.",
    category: "fullstack",
    image: "/src/assets/images/project_dashboard_1785880497075.jpg",
    tags: ["React 19", "TypeScript", "Node.js", "Express", "Tailwind CSS", "Recharts", "WebSocket"],
    featured: true,
    completionYear: "2025",
    liveUrl: "https://apex-analytics-demo.example.com",
    githubUrl: "https://github.com/alexrivera/apex-analytics",
    metrics: [
      { label: "Performance Gain", value: "3.4x faster" },
      { label: "Active Nodes Monitored", value: "12,000+" },
      { label: "Render Frame Rate", value: "60 FPS steady" }
    ],
    keyFeatures: [
      "Sub-millisecond chart canvas rendering for heavy streaming data",
      "Customizable drag-and-drop widget layouts with auto-persistence",
      "Multi-tenant RBAC security matrix with server-side proxying",
      "Dark mode visual contrast tuning for mission-critical operations rooms"
    ],
    hasInteractiveDemo: true,
    demoType: "analytics-chart"
  },
  {
    id: "proj-2",
    title: "NeuroPrompt AI Studio",
    shortDescription: "Generative AI workflow orchestration tool with node-based prompt chain visualizer and latency benchmarks.",
    fullDescription: "NeuroPrompt AI Studio allows developers and product teams to test, refine, and deploy multi-stage LLM chains. Features real-time token tracking, comparative model side-by-side benchmarking, and instant API code export.",
    category: "ai",
    image: "/src/assets/images/project_ai_studio_1785880510140.jpg",
    tags: ["TypeScript", "Gemini API", "React", "Tailwind CSS", "Express", "VectorDB"],
    featured: true,
    completionYear: "2026",
    liveUrl: "https://neuroprompt-ai.example.com",
    githubUrl: "https://github.com/alexrivera/neuroprompt-studio",
    metrics: [
      { label: "Token Efficiency", value: "+42% saved" },
      { label: "Prompt Chains Run", value: "1.2M+" },
      { label: "Model Latency Reduction", value: "180ms avg" }
    ],
    keyFeatures: [
      "Visual node graph editor for orchestrating Gemini & multi-modal model chains",
      "Live cost estimation & token usage telemetry breakdown",
      "One-click export to TypeScript SDK & Python serverless functions",
      "Custom prompt version control and regression evaluation suites"
    ],
    hasInteractiveDemo: true,
    demoType: "ai-prompt"
  },
  {
    id: "proj-3",
    title: "Aura - Minimalist Luxury E-Commerce",
    shortDescription: "Ultra-fast headless commerce platform with 3D product previews, instant checkout, and personalized recommendations.",
    fullDescription: "Aura reimagines luxury online retail through extreme speed, spatial product visualizers, and seamless micro-interactions. Engineered using headless React, Stripe integration, and automated image optimization.",
    category: "frontend",
    image: "/src/assets/images/project_ecommerce_1785880522950.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion", "Stripe API", "Node.js"],
    featured: true,
    completionYear: "2025",
    liveUrl: "https://aura-storefront.example.com",
    githubUrl: "https://github.com/alexrivera/aura-commerce",
    metrics: [
      { label: "Conversion Lift", value: "+28%" },
      { label: "Lighthouse Score", value: "100 / 100" },
      { label: "Page Load Speed", value: "0.4s" }
    ],
    keyFeatures: [
      "Sub-second page load times with aggressive image caching & CDN optimization",
      "Smooth cart drawer with real-time stock sync & guest express checkout",
      "Interactive product variant color picker & dynamic design viewer",
      "Accessible keyboard navigation and screen-reader tested components"
    ],
    hasInteractiveDemo: true,
    demoType: "palette-generator"
  },
  {
    id: "proj-4",
    title: "Nexus - Design System & UI Kit",
    shortDescription: "Production-ready accessible component library used across 14 enterprise web products.",
    fullDescription: "Nexus is a unified design system containing 60+ fully accessible React components, WCAG AA contrast tokens, and automated Storybook visual testing pipelines.",
    category: "design",
    image: "https://picsum.photos/seed/nexus-design/1200/675",
    tags: ["React", "Tailwind CSS", "TypeScript", "WCAG 2.1 AA", "Storybook"],
    featured: false,
    completionYear: "2024",
    liveUrl: "https://nexus-ui.example.com",
    githubUrl: "https://github.com/alexrivera/nexus-design-system",
    metrics: [
      { label: "Components Created", value: "65+" },
      { label: "Dev Adoption", value: "100% of teams" },
      { label: "UI Bug Drop", value: "-65%" }
    ],
    keyFeatures: [
      "Zero-dependency flexible primitives with polymorphic ref forwarding",
      "Dark and light theme token mapping with custom CSS variable generator",
      "Comprehensive accessibility testing matrix conforming to WAI-ARIA standards"
    ],
    hasInteractiveDemo: true,
    demoType: "component-builder"
  },
  {
    id: "proj-5",
    title: "Pulse Mobile - Fitness Tracker Companion",
    shortDescription: "Cross-platform mobile companion app for tracking heart rate zones, workouts, and personal fitness milestones.",
    fullDescription: "Pulse provides athletes with real-time biometric tracking, custom workout routine scheduling, and offline data sync when training off the grid.",
    category: "mobile",
    image: "https://picsum.photos/seed/pulse-mobile/1200/675",
    tags: ["React Native", "TypeScript", "Tailwind CSS", "SQLite", "GraphQL"],
    featured: false,
    completionYear: "2024",
    liveUrl: "https://pulse-fit.example.com",
    githubUrl: "https://github.com/alexrivera/pulse-mobile",
    metrics: [
      { label: "App Store Rating", value: "4.9 / 5.0" },
      { label: "Active Athletes", value: "45,000+" }
    ],
    keyFeatures: [
      "Offline-first local database sync with automatic server reconciliation",
      "Custom audio cues and haptic feedback during high-intensity intervals",
      "Interactive biometric trend charts with weekly digest generator"
    ],
    hasInteractiveDemo: false
  }
];

export const initialExperiences: Experience[] = [
  {
    id: "exp-1",
    role: "Staff UI / Frontend Systems Engineer",
    company: "Vanguard Tech Labs",
    companyUrl: "https://vanguardlabs.example.com",
    location: "San Francisco, CA",
    type: "full-time",
    period: "2023 - Present",
    description: "Leading frontend architecture and core web client engineering across enterprise data analysis and AI cloud platforms.",
    highlights: [
      "Architected micro-frontend deployment pipelines cutting release time from 3 days to 25 minutes.",
      "Mentored a team of 9 engineers, establishing TypeScript strict standards and automated UI test coverage.",
      "Spearheaded company-wide design system adoption across 14 web products."
    ],
    skillsUsed: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Express", "Micro-frontends", "Node.js"]
  },
  {
    id: "exp-2",
    role: "Senior Full Stack Engineer",
    company: "Lumina Cloud Systems",
    companyUrl: "https://luminacloud.example.com",
    location: "San Jose, CA (Hybrid)",
    type: "full-time",
    period: "2021 - 2023",
    description: "Developed distributed web applications and high-throughput API gateways for enterprise cloud storage management.",
    highlights: [
      "Engineered server-side streaming API endpoints handling over 10M daily payload requests.",
      "Reduced bundle sizes by 48% via dynamic code splitting and tree-shaking strategies.",
      "Co-designed automated real-time alert engine using WebSockets and Redis pub/sub."
    ],
    skillsUsed: ["TypeScript", "Node.js", "Express", "React", "PostgreSQL", "Docker", "Tailwind CSS"]
  },
  {
    id: "exp-3",
    role: "Frontend Developer & UI Designer",
    company: "Kinetic Digital Agency",
    companyUrl: "https://kineticagency.example.com",
    location: "Oakland, CA",
    type: "full-time",
    period: "2019 - 2021",
    description: "Created bespoke web experiences, e-commerce platforms, and interactive visual sites for Fortune 500 brands.",
    highlights: [
      "Delivered 18 custom client projects on time and within budget constraints.",
      "Won Awwwards Site of the Day for luxury fashion brand interactive microsite.",
      "Pioneered component-driven design workflow bridging Figma to React."
    ],
    skillsUsed: ["React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Figma", "REST APIs"]
  },
  {
    id: "exp-4",
    role: "B.S. in Computer Science & Human-Computer Interaction",
    company: "University of California, Berkeley",
    location: "Berkeley, CA",
    type: "education",
    period: "2015 - 2019",
    description: "Graduated with Honors. Specialization in Algorithms, Software Engineering Systems, and User Interface Research.",
    highlights: [
      "President of Web Development Developers Club (UC Berkeley)",
      "Dean's Honor List for 6 consecutive semesters",
      "Published undergraduate capstone thesis on Web Performance Optimization"
    ],
    skillsUsed: ["Data Structures", "Algorithms", "Software Engineering", "UI/UX Research", "C++", "Python"]
  }
];

export const initialSkills: Skill[] = [
  // Frontend
  { id: "s1", name: "React & React Server Tools", category: "frontend", proficiency: 96, level: "Expert", yearsExperience: 6, iconName: "Code", isTopSkill: true },
  { id: "s2", name: "TypeScript", category: "frontend", proficiency: 94, level: "Expert", yearsExperience: 6, iconName: "FileCode", isTopSkill: true },
  { id: "s3", name: "Tailwind CSS & Styling", category: "frontend", proficiency: 98, level: "Expert", yearsExperience: 5, iconName: "Palette", isTopSkill: true },
  { id: "s4", name: "Next.js & Modern SSR", category: "frontend", proficiency: 90, level: "Expert", yearsExperience: 4, iconName: "Layers", isTopSkill: true },
  { id: "s5", name: "Web Performance & Lighthouse", category: "frontend", proficiency: 92, level: "Expert", yearsExperience: 5, iconName: "Zap", isTopSkill: true },
  { id: "s6", name: "Motion / Animation Libraries", category: "frontend", proficiency: 88, level: "Advanced", yearsExperience: 4, iconName: "Sparkles", isTopSkill: false },

  // Backend
  { id: "s7", name: "Node.js & Express API Routes", category: "backend", proficiency: 92, level: "Expert", yearsExperience: 6, iconName: "Server", isTopSkill: true },
  { id: "s8", name: "RESTful & GraphQL APIs", category: "backend", proficiency: 90, level: "Expert", yearsExperience: 5, iconName: "Globe", isTopSkill: true },
  { id: "s9", name: "Gemini AI SDK & Agent Logic", category: "backend", proficiency: 88, level: "Advanced", yearsExperience: 2, iconName: "Bot", isTopSkill: true },
  { id: "s10", name: "WebSockets & Realtime State", category: "backend", proficiency: 86, level: "Advanced", yearsExperience: 4, iconName: "Activity", isTopSkill: false },

  // Database
  { id: "s11", name: "PostgreSQL & Relational DBs", category: "database", proficiency: 88, level: "Advanced", yearsExperience: 5, iconName: "Database", isTopSkill: true },
  { id: "s12", name: "Firestore & NoSQL Stores", category: "database", proficiency: 90, level: "Expert", yearsExperience: 4, iconName: "HardDrive", isTopSkill: false },
  { id: "s13", name: "Redis Caching", category: "database", proficiency: 82, level: "Proficient", yearsExperience: 3, iconName: "Cpu", isTopSkill: false },

  // Design
  { id: "s14", name: "Design System Architecture", category: "design", proficiency: 94, level: "Expert", yearsExperience: 5, iconName: "LayoutGrid", isTopSkill: true },
  { id: "s15", name: "Figma to Code Workflow", category: "design", proficiency: 92, level: "Expert", yearsExperience: 6, iconName: "Figma", isTopSkill: false },
  { id: "s16", name: "WCAG AA Accessibility", category: "design", proficiency: 90, level: "Expert", yearsExperience: 5, iconName: "Eye", isTopSkill: false },

  // Tools
  { id: "s17", name: "Git & GitHub Workflows", category: "tools", proficiency: 95, level: "Expert", yearsExperience: 6, iconName: "GitBranch", isTopSkill: false },
  { id: "s18", name: "Vite, Esbuild & Bundlers", category: "tools", proficiency: 91, level: "Expert", yearsExperience: 4, iconName: "Settings", isTopSkill: false },
  { id: "s19", name: "Docker & Containerization", category: "tools", proficiency: 84, level: "Proficient", yearsExperience: 3, iconName: "Box", isTopSkill: false }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Dr. Elena Rostova",
    role: "VP of Product Engineering",
    company: "Vanguard Tech Labs",
    avatar: "https://picsum.photos/seed/elena/200/200",
    quote: "Alex is an extraordinary engineering talent. He doesn't just write code; he elevates the entire user experience. Our telemetry platform response speed skyrocketed by 3.4x under his technical leadership.",
    rating: 5,
    projectWorkedOn: "Apex Analytics Platform"
  },
  {
    id: "t-2",
    name: "Marcus Vance",
    role: "Founder & CEO",
    company: "Aura Luxury Brands",
    avatar: "https://picsum.photos/seed/marcus/200/200",
    quote: "Working with Alex was a game-changer for our brand launch. His commitment to pixel perfection, blazing-fast web performance, and zero-friction communication made our platform an instant hit.",
    rating: 5,
    projectWorkedOn: "Aura E-Commerce Storefront"
  },
  {
    id: "t-3",
    name: "Sophia Chen",
    role: "Lead UX Researcher",
    company: "Lumina Cloud Systems",
    avatar: "https://picsum.photos/seed/sophia/200/200",
    quote: "Alex has a rare dual mastery: profound deep backend understanding combined with an incredible eye for clean, accessible design. He turns complex specifications into effortless web apps.",
    rating: 5,
    projectWorkedOn: "Design System & Cloud Console"
  }
];

export const initialServices: Service[] = [
  {
    id: "serv-1",
    title: "Full-Stack Web App Engineering",
    shortDesc: "End-to-end custom web applications built with React, TypeScript, Node.js, and serverless APIs for high reliability.",
    icon: "Code2",
    deliverables: [
      "Robust TypeScript architecture",
      "Performant database schema & REST/GraphQL APIs",
      "Responsive, mobile-optimized UI",
      "Comprehensive test coverage & documentation"
    ],
    startingPrice: "$3,500"
  },
  {
    id: "serv-2",
    title: "Design Systems & UI Architecture",
    shortDesc: "Modular, accessible, and scalable UI component libraries with Tailwind CSS, WCAG AA compliance, and tokens.",
    icon: "Layout",
    deliverables: [
      "Reusable React component library",
      "Tailwind theme customization & tokens",
      "Storybook visual catalog",
      "Accessibility & keyboard audit"
    ],
    startingPrice: "$2,800"
  },
  {
    id: "serv-3",
    title: "AI Integration & Generative Workflows",
    shortDesc: "Integrating LLMs, Gemini API SDKs, prompt engineering tools, and intelligent search capabilities directly into web apps.",
    icon: "Sparkles",
    deliverables: [
      "Secure server-side API proxy routing",
      "Streamed AI completion handling",
      "Custom vector context or search pipelines",
      "Cost monitoring & rate-limit guards"
    ],
    startingPrice: "$3,000"
  },
  {
    id: "serv-4",
    title: "Web Performance & UX Audit",
    shortDesc: "Deep-dive diagnostic analysis to fix slow page loads, reduce bundle size, eliminate layout shifts, and maximize Lighthouse scores.",
    icon: "Gauge",
    deliverables: [
      "Comprehensive Lighthouse & Web Vitals audit",
      "Bundle size breakdown & code-splitting plan",
      "Core Web Vitals remediation report",
      "1-on-1 engineering advisory session"
    ],
    startingPrice: "$1,500"
  }
];
