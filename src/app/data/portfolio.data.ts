export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  problem: string;
  stack: string[];
  achievements: string[];
  links: ProjectLink[];
  accent: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ArchitectureHighlight {
  title: string;
  summary: string;
  points: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  detail: string;
}

export const profile = {
  name: 'Vinay Nagashettyhalli Basavarajaiah',
  shortName: 'VNB',
  role: 'Full-Stack Developer | Angular & Node.js',
  valueStatement:
    'Building scalable enterprise banking and fintech web applications across GCC markets — from wealth dashboards to payment and compliance flows.',
  location: 'Tumkur, Karnataka · Open to remote & hybrid roles',
  email: 'nbvinay13@gmail.com',
  phone: '+91 7483807090',
  resumeUrl: '/nbVinayresume.pdf',
  githubUrl: 'https://github.com/',
  linkedinUrl: 'https://www.linkedin.com/in/vinay-n-b-7511a9370?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  blogUrl: 'https://dev.to/',
};

export const projects: Project[] = [
  {
    id: 'fab',
    title: 'FAB - First Abu Dhabi Bank',
    role: 'Consultant (Product Engineer) | Intellect Design Arena Ltd',
    problem: 'Implementation and enhancement of LMS and CS modules to meet custom client and enterprise banking requirements.',
    stack: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'HTML', 'CSS', 'REST APIs', 'Angular Material'],
    achievements: [
      'Developed and implemented client-specific requirements, new functionality, and UI enhancements based on business needs.',
      'Participated in requirement analysis, development, testing, debugging, defect resolution, and UAT support.',
      'Collaborated across teams to deliver application changes and ensure smooth deployment.'
    ],
    links: [{ label: 'Resume (PDF)', url: '/nbVinayresume.pdf' }],
    accent: '#0052cc'
  },
  {
    id: 'enbd',
    title: 'ENBD — Digital Banking Platform',
    role: 'Consultant / Product Engineer · Intellect Design Arena',
    problem:
      'Emirates NBD needed a modernized web banking experience — clearer UI flows, wealth insights for relationship managers, and a compliant Egyptian government tax-payment journey.',
    stack: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Node.js',
      'ECharts',
      'NgBootstrap',
      'AG Grid',
      'ExtJS',
    ],
    achievements: [
      'Led UI revamp of layout, usability, and flow — raising line-approval rights to 85% and improving customer engagement.',
      'Built wealth-management dashboards with ECharts (donut & line), RM advisor views, session handling, and cached API integration.',
      'Delivered multi-step tax payment UI with debit-account lookup, ePay fee flows, reactive forms, encrypted APIs, and optional OTP auth.',
    ],
    links: [{ label: 'Resume (PDF)', url: '/nbVinayresume.pdf' }],
    accent: '#0d8a78',
  },
  {
    id: 'adib',
    title: 'ADIB — Angular Banking Modules',
    role: 'Front-End Developer · Hybrid ExtJS / Java / Angular stack',
    problem:
      'Abu Dhabi Islamic Bank needed Angular feature delivery inside a hybrid legacy estate — including UAE WPS Mohre compliance and customer consent management — without breaking ExtJS/Java integrations.',
    stack: ['Angular', 'TypeScript', 'RxJS', 'ExtJS', 'Java APIs', 'HTML', 'CSS'],
    achievements: [
      'Implemented Angular change requests spanning new screens, module enhancements, and Java backend integration.',
      'Delivered Wage Protection System (WPS) Mohre integration for regulatory submission and status tracking with the UAE Ministry of Human Resources.',
      'Built consent-management flows for data-usage and marketing preferences with clear UI and policy-aligned validation.',
    ],
    links: [{ label: 'Resume (PDF)', url: '/nbVinayresume.pdf' }],
    accent: '#3d7ea6',
  },
  {
    id: 'nbf-anb',
    title: 'NBF & ANB — Product Delivery',
    role: 'Full project implementation · Banking product modules',
    problem:
      'National Bank of Fujairah and Arab National Bank required end-to-end screen delivery, Figma-driven UI changes, and stable UAT closure for production go-lives.',
    stack: ['Angular 16', 'TypeScript', 'RxJS', 'AG Grid', 'Node.js', 'HTML', 'CSS'],
    achievements: [
      'Built new module screens from scratch and adapted designs from Figma against client requirements.',
      'Owned change requests end-to-end — development, validation, and approval.',
      'Took products live and resolved critical UAT defects to keep release timelines intact.',
    ],
    links: [{ label: 'Resume (PDF)', url: '/nbVinayresume.pdf' }],
    accent: '#c45c2a',
  },
  {
    id: 'cynergy',
    title: 'Cynergy Bank — Payments Module',
    role: 'Software Engineer · Radiuscard Solutions',
    problem:
      'A UK online-banking portal needed reliable payment journeys — internal transfers, payee management, and sprint-ready UI delivery under Agile lending-standards practices.',
    stack: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Sketch', 'Miro'],
    achievements: [
      'Implemented Internal Transfer and Manage Payee epic functionality from solution designs.',
      'Designed screen flows from Sketch and Miro and built reusable UI components in Agile sprints.',
      'Stabilized builds, fixed UI defects, and unblocked teammates to hit sprint deliverables.',
    ],
    links: [{ label: 'Resume (PDF)', url: '/nbVinayresume.pdf' }],
    accent: '#6b5b95',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Deep Dive',
    items: [
      'Angular (v2–16+) & AngularJS',
      'TypeScript / JavaScript',
      'RxJS (debounceTime, switchMap, scan, shareReplay)',
      'AG Grid & ECharts',
      'Angular Material / NgBootstrap / Bootstrap',
      'HTML5, CSS3, responsive UI from Figma',
    ],
  },
  {
    title: 'Backend & APIs',
    items: [
      'Node.js / Express.js (MEAN)',
      'REST API integration',
      'Encrypted API flows & OTP auth',
      'Java backend integration',
      'Session handling & cached APIs',
      'End-to-end feature delivery',
    ],
  },
  {
    title: 'Database & Persistence',
    items: ['MongoDB', 'MySQL', 'API response caching', 'Secure data access patterns'],
  },
  {
    title: 'Architecture & Delivery',
    items: [
      'Enterprise banking / fintech (GCC & UK)',
      'Hybrid Angular + ExtJS estates',
      'Unit testing: Vitest (this site) · Karma/Jasmine (enterprise)',
      'AWS',
      'GitHub / SVN / JIRA / Agile',
      'AI-assisted tooling (Cursor, Copilot)',
    ],
  },
];

export const architectureHighlights: ArchitectureHighlight[] = [
  {
    title: 'Enterprise UI Performance',
    summary:
      'Banking UIs live or die on grid performance, chart responsiveness, and predictable change detection under heavy data.',
    points: [
      'AG Grid for high-density transaction and admin tables',
      'ECharts visualizations for wealth allocation and historical trends',
      'Cached API integration and session-aware dashboard widgets',
    ],
  },
  {
    title: 'Reactive Forms & Secure Flows',
    summary:
      'Payment and compliance journeys need strong validation, encryption, and optional step-up authentication.',
    points: [
      'Multi-step reactive forms for tax payment and debit-account lookup',
      'Encrypted API contracts with optional OTP authentication',
      'Policy-aligned consent and preference management UIs',
    ],
  },
  {
    title: 'Hybrid Legacy Modernization',
    summary:
      'Ship modern Angular modules beside ExtJS/Java backbones without fracturing the customer experience.',
    points: [
      'Angular CR streams integrated with Java services',
      'Coordinated behavior across ExtJS legacy and Angular modules',
      'UAT defect triage to protect production go-lives',
    ],
  },
  {
    title: 'Testing & Quality',
    summary:
      'This portfolio ships Vitest unit tests for RxJS pipelines. Enterprise banking teams I work with often still use Karma + Jasmine — both prove the same operator contracts.',
    points: [
      'npm test — Vitest specs for project filter, Tech Pulse, and Rx Arcade reducers',
      'Assert debounce, switchMap cancellation, catchError recovery, and scan scoring',
      'Live demos (Tech Pulse + Operator Rush) make the same streams recruiter-visible',
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: 'Intellect Design Arena Ltd',
    role: 'Consultant (Product Engineer)',
    period: 'Oct 2023 — Present',
    highlights: [
      'Delivering Angular banking products for GCC clients including ENBD, NBF, ANB, and ADIB.',
      'Owned UI revamps, wealth dashboards, tax-payment flows, and regulatory integrations (WPS Mohre).',
      'Partnered with Java/ExtJS teams to ship compliant, production-ready modules in hybrid stacks.',
    ],
  },
  {
    company: 'Radiuscard Solutions Pvt Ltd',
    role: 'Software Engineer',
    period: 'Apr 2022 — Oct 2023',
    highlights: [
      'Built payment-module features for Cynergy Bank online banking (UK), including Internal Transfer and Manage Payee.',
      'Translated Sketch/Miro solution designs into Angular components within Agile sprints.',
      'Resolved build issues, UI defects, and supported teammates to meet sprint commitments.',
    ],
  },
  {
    company: 'Stedrant Technoclinic Pvt Ltd',
    role: 'Software Design Engineer',
    period: 'Mar 2020 — Mar 2022',
    highlights: [
      'Developed ANZ payment-module web components for transaction listing, filters, and admin search.',
      'Implemented AngularJS search restricted to second-level administrators for secure access control.',
      'Delivered HTML5/CSS3/JavaScript UI for time-bound transaction queries.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    title: 'Bachelor of Engineering',
    org: 'Siddaganga Institute of Technology, Tumkur, Karnataka',
    detail: 'Engineering foundation supporting 6+ years in enterprise web development',
  },
  {
    title: 'Languages',
    org: 'English · Kannada · Hindi',
    detail: 'Comfortable collaborating across regional and international banking teams',
  },
];

export const navLinks = [
  { label: 'Projects', href: '/#projects', route: null },
  { label: 'Tech Pulse', href: '/#tech-pulse', route: null },
  { label: 'Games', href: '/games', route: '/games' },
  { label: 'Capabilities', href: '/#capabilities', route: null },
  { label: 'Architecture', href: '/#architecture', route: null },
  { label: 'Experience', href: '/#experience', route: null },
  { label: 'Contact', href: '/#contact', route: null },
] as const;
