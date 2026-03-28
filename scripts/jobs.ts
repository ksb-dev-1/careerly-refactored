import {
  Currency,
  JobMode,
  JobStatus,
  JobType,
  SalaryPeriod,
} from "@/generated/prisma/client";

export const placeholderJobs = [
  // 1
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Adobe",
    companyName: "Adobe",
    experienceMin: 2,
    experienceMax: 4,
    role: "UI/UX Designer",
    jobType: JobType.FULL_TIME,
    location: "Bangalore, India",
    jobMode: JobMode.REMOTE,
    salary: 1200000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["figma", "ux design", "wireframing", "prototyping"],
    openings: 1,
    isFeatured: false,
    // category: Category.UI_UX_DESIGN,
    description: `
As a UI/UX Designer at Adobe, you will shape intuitive and visually engaging user experiences for creative products used by millions of designers, photographers, and creators worldwide. You will work closely with product managers and engineers to translate complex ideas into elegant, user-friendly interfaces. Your work will help define how users interact with Adobe’s tools, ensuring seamless workflows, accessibility, and delightful visual design. This role is ideal for someone passionate about solving real user problems through thoughtful design and innovation.

#### Responsibilities
- Design user interfaces and user flows
- Create wireframes, prototypes, and design systems
- Conduct usability testing and iterate on feedback
- Collaborate closely with product and engineering teams

#### Requirements
- 2–4 years of UI/UX design experience
- Strong proficiency with Figma
- Solid understanding of user-centered design principles
- A strong design portfolio

#### Why Join Us
- Design products used by global creators
- Collaborative and design-driven culture
- Strong focus on innovation and creativity
`,
  },

  // 2
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Neilsen",
    companyName: "Nielsen",
    experienceMin: 1,
    experienceMax: 2,
    role: "User Research Analyst",
    jobType: JobType.FULL_TIME,
    location: "Pune, India",
    jobMode: JobMode.ONSITE,
    salary: 900000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["user research", "interviews", "survey design", "analysis"],
    openings: 2,
    isFeatured: false,
    // category: Category.HUMAN_RESEARCH,
    description: `
As a User Research Analyst at Nielsen, you will conduct qualitative and quantitative research to uncover user behaviors, motivations, and pain points, turning insights into clear recommendations that guide product teams in creating more effective and user-friendly experiences across digital platforms and data-driven services.

#### Responsibilities
- Conduct user interviews and surveys
- Analyze behavioral data and research findings
- Translate insights into clear recommendations
- Work with UX and product teams

#### Requirements
- 1–3 years of research or analytics experience
- Strong analytical and communication skills
- Experience with research methodologies

#### Why Join Us
- Work with data-driven decision making
- Influence product and user experience strategy
`,
  },

  // 3
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Hubspot",
    companyName: "HubSpot",
    experienceMin: 2,
    experienceMax: 5,
    role: "Digital Marketing Specialist",
    jobType: JobType.FULL_TIME,
    location: "Mumbai, India",
    jobMode: JobMode.ONSITE,
    salary: 1000000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["seo", "google ads", "content marketing", "analytics"],
    openings: 1,
    isFeatured: false,
    // category: Category.DIGITAL_MARKETING,
    description: `
As a Digital Marketing Specialist at HubSpot, you will plan, execute, and optimize multi-channel digital marketing campaigns that increase brand visibility, generate qualified leads, and drive business growth by leveraging SEO, paid advertising, content marketing strategies, and data analytics to continuously improve campaign performance.

#### Responsibilities
- Manage SEO and paid advertising campaigns
- Create and optimize content for digital channels
- Analyze campaign performance using analytics tools
- Collaborate with content and sales teams

#### Requirements
- 2–5 years of digital marketing experience
- Hands-on experience with SEO and Google Ads
- Strong analytical mindset

#### Why Join Us
- High-impact marketing ownership
- Data-driven and collaborative culture
`,
  },

  // 4
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Netflix",
    companyName: "Netflix",
    experienceMin: 3,
    experienceMax: 6,
    role: "Motion Graphics Designer",
    jobType: JobType.FULL_TIME,
    location: "Hyderabad, India",
    jobMode: JobMode.ONSITE,
    salary: 1400000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["after effects", "motion design", "video editing"],
    openings: 1,
    isFeatured: false,
    // category: Category.VIDEO_AND_ANIMATION,
    description: `
As a Motion Graphics Designer at Netflix, you will create visually compelling animations and motion design assets that enhance storytelling and marketing campaigns, collaborating with creative teams to produce engaging visuals that capture audience attention while maintaining brand consistency across global entertainment platforms.

#### Responsibilities
- Design motion graphics and animations
- Collaborate with creative and marketing teams
- Maintain visual consistency across projects
- Deliver high-quality video assets

#### Requirements
- 3–6 years of motion design experience
- Expertise in After Effects and video tools
- Strong creative portfolio

#### Why Join Us
- Work on globally recognized content
- Creative freedom and ownership
`,
  },

  // 5
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Google",
    companyName: "Google",
    experienceMin: 3,
    experienceMax: 5,
    role: "Frontend Engineer",
    jobType: JobType.FULL_TIME,
    location: "San Francisco, USA",
    jobMode: JobMode.HYBRID,
    salary: 135000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.USD,
    jobStatus: JobStatus.OPEN,
    skills: ["react.js", "typescript", "accessibility"],
    openings: 3,
    isFeatured: false,
    // category: Category.DEVELOPMENT,
    description: `
As a Frontend Engineer at Google, you will build scalable, high-performance web interfaces that deliver fast, accessible, and reliable user experiences for millions of users worldwide while collaborating with designers and backend engineers to implement modern web technologies and improve performance, maintainability, and usability.

#### Responsibilities
- Develop scalable frontend features
- Improve accessibility and performance
- Collaborate with design and backend teams
- Write clean and maintainable code

#### Requirements
- 3–5 years frontend experience
- Strong React and TypeScript skills
- Knowledge of web accessibility standards

#### Why Join Us
- Global product impact
- World-class engineering culture
`,
  },

  // 6
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Amazon",
    companyName: "Amazon",
    experienceMin: 4,
    experienceMax: 7,
    role: "Backend Engineer",
    jobType: JobType.FULL_TIME,
    location: "Bangalore, India",
    jobMode: JobMode.HYBRID,
    salary: 3200000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["node.js", "aws", "microservices", "postgresql"],
    openings: 5,
    isFeatured: true,
    // category: Category.DEVELOPMENT,
    description: `
As a Backend Engineer at Amazon, you will design and develop highly scalable distributed systems and microservices that power large-scale applications, ensuring high performance, reliability, and fault tolerance while working with modern cloud technologies to handle massive amounts of data and user traffic.

#### Responsibilities
- Design REST and event-driven services
- Build scalable microservices
- Optimize database performance
- Ensure system reliability

#### Requirements
- 4–7 years backend experience
- Strong Node.js and AWS knowledge
- Experience with distributed systems

#### Why Join Us
- High-scale systems
- Strong ownership culture
- Career growth opportunities
`,
  },

  // 7
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Microsoft",
    companyName: "Microsoft",
    experienceMin: 2,
    experienceMax: 4,
    role: "Full Stack Developer",
    jobType: JobType.FULL_TIME,
    location: "Hyderabad, India",
    jobMode: JobMode.REMOTE,
    salary: 2400000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["react", "node.js", "azure", "sql"],
    openings: 4,
    isFeatured: false,
    // category: Category.DEVELOPMENT,
    description: `
As a Full Stack Developer at Microsoft, you will build modern cloud-powered applications by developing both frontend and backend features, collaborating with cross-functional teams to deliver scalable, maintainable, and secure solutions that power enterprise and consumer products used by millions worldwide.

#### Responsibilities
- Build full-stack features
- Collaborate across teams
- Write clean and testable code
- Improve system scalability

#### Requirements
- 2–4 years experience
- Full stack development skills
- Cloud platform exposure preferred

#### Why Join Us
- Flexible work culture
- Learning-focused environment
`,
  },

  // 8
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Netflix",
    companyName: "Netflix",
    experienceMin: 5,
    experienceMax: 8,
    role: "Senior Software Engineer",
    jobType: JobType.FULL_TIME,
    location: "Los Gatos, USA",
    jobMode: JobMode.REMOTE,
    salary: 180000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.USD,
    jobStatus: JobStatus.OPEN,
    skills: ["java", "spring boot", "distributed systems"],
    openings: 2,
    isFeatured: false,
    // category: Category.DEVELOPMENT,
    description: `
As a Senior Software Engineer at Netflix, you will design and optimize distributed backend systems that deliver reliable streaming experiences to millions of users, solving complex engineering challenges related to performance, scalability, and system reliability while mentoring engineers and driving technical innovation.

#### Responsibilities
- Design distributed systems
- Improve system performance
- Lead technical initiatives
- Mentor engineers

#### Requirements
- 5–8 years experience
- Strong Java and system design skills
- Experience with high-scale platforms

#### Why Join Us
- Freedom and responsibility culture
- Top-of-market compensation
`,
  },

  // 9
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Startup",
    companyName: "TechNova",
    experienceMin: 1,
    experienceMax: 3,
    role: "Junior Software Developer",
    jobType: JobType.INTERNSHIP,
    location: "Pune, India",
    jobMode: JobMode.ONSITE,
    salary: 120000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["javascript", "react", "git"],
    openings: 6,
    isFeatured: false,
    // category: Category.DEVELOPMENT,
    description: `
As a Junior Software Developer at TechNova, you will work closely with experienced engineers to build real-world software features, improve application performance, and contribute to modern web development projects while gaining hands-on experience with industry best practices, collaborative development, and agile workflows.

#### Responsibilities
- Implement frontend features
- Fix bugs and improve UI
- Learn best practices
- Work closely with senior engineers

#### Requirements
- 1–3 years experience
- Good JavaScript fundamentals
- Willingness to learn

#### Why Join Us
- Startup exposure
- Fast learning curve
- Supportive team
`,
  },

  // 10
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Spotify",
    companyName: "Spotify",
    experienceMin: 1,
    experienceMax: 3,
    role: "Audio Content Specialist",
    jobType: JobType.INTERNSHIP,
    location: "Mumbai, India",
    jobMode: JobMode.REMOTE,
    salary: 80000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["audio editing", "content curation", "sound design"],
    openings: 2,
    isFeatured: false,
    // category: Category.MUSIC_AND_AUDIO,
    description: `
As an Audio Content Specialist at Spotify, you will manage, curate, and enhance high-quality audio content and playlists to create engaging listening experiences for users while collaborating with editorial and content teams to ensure audio quality, relevance, and consistency across the platform.

#### Responsibilities
- Edit and review audio content
- Curate playlists and audio collections
- Ensure audio quality and consistency
- Collaborate with content teams

#### Requirements
- Experience in audio editing or sound design
- Strong attention to detail
- Passion for music and audio content

#### Why Join Us
- Influence global audio experiences
- Creative and collaborative culture
`,
  },

  // 11
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Sap",
    companyName: "SAP",
    experienceMin: 4,
    experienceMax: 6,
    role: "Machine Learning Engineer",
    jobType: JobType.FULL_TIME,
    location: "Berlin, Germany",
    jobMode: JobMode.ONSITE,
    salary: 85000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.EUR,
    jobStatus: JobStatus.OPEN,
    skills: ["python", "ml", "tensorflow", "data pipelines"],
    openings: 2,
    isFeatured: true,
    // category: Category.AI_SERVICES,
    description: `
As a Machine Learning Engineer at SAP, you will develop and deploy scalable machine learning solutions that analyze complex datasets, improve predictive capabilities, and power intelligent enterprise applications while collaborating with engineers and data scientists to bring AI innovations into production systems.

#### Responsibilities
- Build and deploy ML pipelines
- Work with structured and unstructured data
- Collaborate with cross-functional teams
- Optimize model accuracy and performance

#### Requirements
- 4–6 years ML experience
- Strong Python and ML frameworks knowledge
- Experience with production ML systems

#### Why Join Us
- Large-scale enterprise impact
- Strong focus on innovation
`,
  },

  // 12
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Booking",
    companyName: "Booking.com",
    experienceMin: 2,
    experienceMax: 5,
    role: "Product Designer",
    jobType: JobType.FULL_TIME,
    location: "Amsterdam, Netherlands",
    jobMode: JobMode.REMOTE,
    salary: 70000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.EUR,
    jobStatus: JobStatus.OPEN,
    skills: ["figma", "design systems", "usability testing"],
    openings: 1,
    isFeatured: false,
    // category: Category.UI_UX_DESIGN,
    description: `
As a Product Designer at Booking.com, you will design seamless and user-focused travel booking experiences, creating intuitive interfaces and workflows that help millions of travelers discover accommodations easily while collaborating with product managers and engineers to continuously improve usability and engagement.

#### Responsibilities
- Design user flows and interfaces
- Conduct usability testing
- Collaborate with engineers and PMs
- Maintain design systems

#### Requirements
- 2–5 years product design experience
- Strong Figma skills
- User-focused design mindset

#### Why Join Us
- Global user base
- Design-led product culture
`,
  },

  // 13
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Openai",
    companyName: "OpenAI Labs",
    experienceMin: 3,
    experienceMax: 5,
    role: "AI Engineer",
    jobType: JobType.FULL_TIME,
    location: "Bangalore, India",
    jobMode: JobMode.ONSITE,
    salary: 2000000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["python", "machine learning", "llms", "pytorch"],
    openings: 2,
    isFeatured: false,
    // category: Category.AI_SERVICES,
    description: `
As an AI Engineer at OpenAI Labs, you will design and build advanced machine learning models and intelligent systems that power next-generation AI applications, working with large datasets and deep learning frameworks to create scalable solutions that push the boundaries of artificial intelligence.

#### Responsibilities
- Build and train ML models
- Work with large datasets and LLMs
- Optimize model performance and reliability
- Collaborate with research and product teams

#### Requirements
- 3–5 years of ML or AI experience
- Strong Python and deep learning knowledge
- Experience with PyTorch or similar frameworks

#### Why Join Us
- Work on cutting-edge AI research
- High-impact and fast-paced environment
`,
  },

  // 14
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Deloitte",
    companyName: "Deloitte",
    experienceMin: 2,
    experienceMax: 4,
    role: "Business Analyst",
    jobType: JobType.FULL_TIME,
    location: "Gurgaon, India",
    jobMode: JobMode.HYBRID,
    salary: 1100000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.INR,
    jobStatus: JobStatus.OPEN,
    skills: ["business analysis", "sql", "excel", "stakeholder management"],
    openings: 3,
    isFeatured: false,
    // category: Category.AI_SERVICES,
    description: `
As a Business Analyst at Deloitte, you will analyze business processes and datasets to generate actionable insights that help organizations improve decision-making, optimize operations, and deliver strategic solutions while collaborating with stakeholders to identify opportunities for innovation and growth.

#### Responsibilities
- Gather and document business requirements
- Analyze datasets and create reports
- Work with stakeholders to define solutions
- Support data-driven decision making

#### Requirements
- 2–4 years of business analysis experience
- Strong SQL and Excel skills
- Excellent communication skills

#### Why Join Us
- Exposure to diverse industries
- Strong learning and career growth paths
`,
  },

  // 15
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Shopify",
    companyName: "Shopify",
    experienceMin: 2,
    experienceMax: 4,
    role: "Growth Marketing Manager",
    jobType: JobType.FULL_TIME,
    location: "New York, USA",
    jobMode: JobMode.REMOTE,
    salary: 95000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.USD,
    jobStatus: JobStatus.OPEN,
    skills: ["growth marketing", "seo", "email marketing"],
    openings: 1,
    isFeatured: false,
    // category: Category.DIGITAL_MARKETING,
    description: `
As a Growth Marketing Manager at Shopify, you will drive customer acquisition and product growth by designing data-driven marketing experiments, optimizing conversion funnels, and executing performance marketing campaigns that increase engagement and revenue across multiple digital channels.

#### Responsibilities
- Optimize acquisition funnels
- Run growth experiments
- Analyze marketing performance
- Collaborate with product teams

#### Requirements
- Growth or performance marketing experience
- Strong analytical skills
- Experience with SEO and email marketing

#### Why Join Us
- High ownership role
- Startup-like growth mindset
`,
  },

  // 16
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Amazon",
    companyName: "Amazon",
    experienceMin: 3,
    experienceMax: 6,
    role: "Business Intelligence Analyst",
    jobType: JobType.FULL_TIME,
    location: "Toronto, Canada",
    jobMode: JobMode.HYBRID,
    salary: 110000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.USD,
    jobStatus: JobStatus.OPEN,
    skills: ["sql", "dashboards", "data modeling"],
    openings: 2,
    isFeatured: false,
    // category: Category.BUSINESS_ANALYSIS,
    description: `
As a Business Intelligence Analyst at Amazon, you will transform large volumes of business data into meaningful insights by building dashboards, analyzing key metrics, and delivering data-driven recommendations that help leadership teams make strategic decisions and improve operational performance.

#### Responsibilities
- Design dashboards and reports
- Analyze business metrics
- Work with large datasets
- Support leadership decision making

#### Requirements
- Strong SQL skills
- Experience with BI tools
- Analytical thinking

#### Why Join Us
- Massive scale and impact
- Data-first culture
`,
  },

  // 17
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=McKinsey",
    companyName: "McKinsey & Company",
    experienceMin: 2,
    experienceMax: 5,
    role: "Management Consultant",
    jobType: JobType.FULL_TIME,
    location: "Munich, Germany",
    jobMode: JobMode.ONSITE,
    salary: 90000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.EUR,
    jobStatus: JobStatus.OPEN,
    skills: ["strategy", "problem solving", "presentation"],
    openings: 3,
    isFeatured: false,
    // category: Category.CONSULTING,
    description: `
As a Management Consultant at McKinsey & Company, you will work with leading organizations to solve complex strategic and operational challenges by analyzing data, developing actionable recommendations, and collaborating with executives to drive impactful business transformations.

#### Responsibilities
- Analyze business problems
- Develop strategic recommendations
- Work directly with clients
- Present insights to leadership

#### Requirements
- Strong problem-solving skills
- Excellent communication
- Consulting or analytics background

#### Why Join Us
- Prestigious global exposure
- Accelerated career growth
`,
  },

  // 18
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Zendesk",
    companyName: "Zendesk",
    experienceMin: 1,
    experienceMax: 3,
    role: "Customer Support Specialist",
    jobType: JobType.FULL_TIME,
    location: "Austin, USA",
    jobMode: JobMode.ONSITE,
    salary: 65000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.USD,
    jobStatus: JobStatus.OPEN,
    skills: ["customer support", "crm", "communication"],
    openings: 4,
    isFeatured: false,
    // category: Category.CUSTOMER_SUPPORT,
    description: `
As a Customer Support Specialist at Zendesk, you will deliver exceptional customer service experiences by resolving product and account issues across digital channels while maintaining high satisfaction levels and collaborating with internal teams to improve overall customer support processes.

#### Responsibilities
- Handle customer inquiries via chat and email
- Resolve technical and account issues
- Maintain high satisfaction scores
- Collaborate with internal teams

#### Requirements
- Strong communication skills
- Customer-first mindset
- Experience with CRM tools

#### Why Join Us
- Customer-centric culture
- Remote-friendly environment
`,
  },

  // 19
  {
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Ubisoft",
    companyName: "Ubisoft",
    experienceMin: 3,
    experienceMax: 5,
    role: "3D Animation Artist",
    jobType: JobType.FULL_TIME,
    location: "Paris, France",
    jobMode: JobMode.HYBRID,
    salary: 68000,
    salaryPeriod: SalaryPeriod.YEARLY,
    currency: Currency.EUR,
    jobStatus: JobStatus.OPEN,
    skills: ["3d animation", "maya", "blender"],
    openings: 2,
    isFeatured: false,
    // category: Category.VIDEO_AND_ANIMATION,
    description: `
As a 3D Animation Artist at Ubisoft, you will create high-quality character and environment animations that bring immersive video game worlds to life, collaborating with designers and developers to ensure fluid movement, realism, and artistic excellence in globally recognized gaming titles.

#### Responsibilities
- Design high-quality 3D animations
- Collaborate with game designers
- Ensure animation quality and consistency
- Meet production deadlines

#### Requirements
- Strong experience with Maya or Blender
- Solid animation portfolio
- Passion for gaming

#### Why Join Us
- Work on globally loved games
- Creative and collaborative teams
`,
  },
];
