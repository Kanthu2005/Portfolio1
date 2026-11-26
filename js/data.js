/* ==========================================================================
   THE PORTFOLIO DEPOT — VERIFIED DATA & CONFIGURATION
   Update placeholder email, resume path, or pending repo URLs here.
   ========================================================================== */

window.PORTFOLIO_DATA = {
  profile: {
    name: 'Kanthu Naik',
    location: 'Damargidda (Village), Narayanpet (Dist), Hyderabad, Telangana, India',
    pinCode: 'PIN CODE 509407',
    qualification: 'B.Tech Graduate in Information Technology',
    college: 'Vidya Jyothi Institute of Technology (VJIT), Hyderabad',
    email: 'naikkanthu2@gmail.com',
    emailIsPlaceholder: false,
    resumeUrl: 'assets/RESUME.pdf',
    github: 'https://github.com/Kanthu2005',
    linkedin: 'https://linkedin.com/in/kanthu2005',
    instagram: 'https://www.instagram.com/i_m_kanthu_18/',
    youtube: 'https://www.youtube.com/@ExploreWithKanthu'
  },

  containers: [
    {
      id: 'home',
      number: '01',
      navLabel: 'Home',
      color: '#e5322d',
      dark: '#a91f1b',
      accent: '#ffd23f',
      labelLines: ['PORT', 'FOLIO'],
      tag: 'KANTHU',
      desktopSlot: { xPct: 0.50, yPct: 0.65, w: 254, rx: -6, ry: -10, rz: 2, z: 12 },
      mobileSlot: { xPct: 0.50, yPct: 0.63, w: 150, rx: -6, ry: -10, rz: 2, z: 12 },
      ariaLabel: 'Container 01: Home and Introduction — Kanthu Naik'
    },
    {
      id: 'projects',
      number: '02',
      navLabel: 'Projects',
      color: '#f26a1f',
      dark: '#b84a10',
      accent: '#ff9960',
      labelLines: ['MY', 'WORK'],
      tag: 'PROJECTS',
      desktopSlot: { xPct: 0.25, yPct: 0.78, w: 274, rx: -5, ry: 12, rz: -3, z: 15 },
      mobileSlot: { xPct: 0.27, yPct: 0.75, w: 154, rx: -5, ry: 10, rz: -3, z: 15 },
      ariaLabel: 'Container 02: Selected Software and AI Projects'
    },
    {
      id: 'about',
      number: '03',
      navLabel: 'About',
      color: '#1d55d8',
      dark: '#123a9c',
      accent: '#76b5ff',
      labelLines: ['ABOUT', 'ME'],
      tag: 'ABOUT',
      desktopSlot: { xPct: 0.14, yPct: 0.65, w: 218, rx: -8, ry: 14, rz: -4, z: 11 },
      mobileSlot: { xPct: 0.23, yPct: 0.60, w: 134, rx: -7, ry: 12, rz: -4, z: 11 },
      ariaLabel: 'Container 03: About Me and Professional Background'
    },
    {
      id: 'skills',
      number: '04',
      navLabel: 'Skills',
      color: '#f6b919',
      dark: '#c08a0a',
      accent: '#ffd23f',
      labelLines: ['TECH', 'STACK'],
      tag: 'SKILLS',
      desktopSlot: { xPct: 0.44, yPct: 0.82, w: 236, rx: -7, ry: -13, rz: 3, z: 17 },
      mobileSlot: { xPct: 0.73, yPct: 0.75, w: 140, rx: -7, ry: -11, rz: 3, z: 16 },
      ariaLabel: 'Container 04: Technical Skills and Technologies'
    },
    {
      id: 'education',
      number: '05',
      navLabel: 'Education',
      color: '#97a1ad',
      dark: '#6c7682',
      accent: '#dce6f5',
      labelLines: ['MY', 'JOURNEY'],
      tag: 'EDUCATION',
      desktopSlot: { xPct: 0.86, yPct: 0.64, w: 218, rx: -9, ry: -15, rz: 4, z: 11 },
      mobileSlot: { xPct: 0.77, yPct: 0.60, w: 134, rx: -8, ry: -13, rz: 4, z: 11 },
      ariaLabel: 'Container 05: Education and Certifications'
    },
    {
      id: 'experience',
      number: '06',
      navLabel: 'What I Do',
      color: '#e5322d',
      dark: '#a91f1b',
      accent: '#ff8c88',
      labelLines: ['WHAT', 'I DO'],
      tag: 'PROFILE',
      desktopSlot: { xPct: 0.64, yPct: 0.79, w: 242, rx: -6, ry: 9, rz: -2, z: 16 },
      mobileSlot: { xPct: 0.29, yPct: 0.88, w: 142, rx: -6, ry: 8, rz: -2, z: 18 },
      ariaLabel: 'Container 06: What I Do and Engineering Capabilities'
    },
    {
      id: 'contact',
      number: '07',
      navLabel: 'Contact',
      color: '#2546b8',
      dark: '#172f80',
      accent: '#8cb4ff',
      labelLines: ['SAY', 'HELLO'],
      tag: 'CONTACT',
      desktopSlot: { xPct: 0.83, yPct: 0.80, w: 226, rx: -8, ry: -14, rz: 4, z: 14 },
      mobileSlot: { xPct: 0.73, yPct: 0.88, w: 138, rx: -8, ry: -12, rz: 3, z: 17 },
      ariaLabel: 'Container 07: Contact Details and Social Profiles'
    }
  ],

  projects: [
    {
      id: 'dineflow',
      code: 'PROJECT 01',
      name: 'DineFlow',
      subtitle: 'Restaurant & Kitchen Management System',
      description: 'A full-stack restaurant management platform designed to manage menu operations, customer orders, kitchen workflows, billing and inventory tracking.',
      features: [
        'Menu management',
        'Order management',
        'Kitchen operations',
        'Billing',
        'Inventory tracking',
        'Low-stock notifications'
      ],
      tech: ['Python', 'FastAPI', 'React.js', 'MongoDB'],
      image: 'assets/projects/dineflow.svg',
      github: 'https://github.com/Kanthu2005/DineFlow',
      live: 'https://dineflow-ixlpf4dpg-kanthu2005.vercel.app'
    },
    {
      id: 'proctorai',
      code: 'PROJECT 02',
      name: 'ProctorAI',
      subtitle: 'AI-Powered Online Assessment Platform',
      description: 'An intelligent online assessment platform that helps recruiters conduct structured assessments while monitoring examination integrity.',
      features: [
        'Recruiter dashboard',
        'Candidate dashboard',
        'Assessment creation',
        'MCQ, descriptive and coding questions',
        'Multi-language coding assessments',
        'AI-assisted proctoring',
        'Malpractice event monitoring',
        'Assessment results and reports'
      ],
      tech: ['React.js', 'Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'AI', 'Computer Vision'],
      image: 'assets/projects/proctorai.svg',
      github: 'https://github.com/Kanthu2005/AI-PROCTOR',
      live: ''
    },
    {
      id: 'hireme-ai',
      code: 'PROJECT 03',
      name: 'Hire-Me AI',
      subtitle: 'AI-Powered Job Portal and Resume Screening',
      description: 'A recruitment platform designed to simplify candidate discovery through resume screening, ATS-based keyword matching and candidate ranking.',
      features: [
        'Job seeker dashboard',
        'Recruiter dashboard',
        'Resume screening',
        'Candidate ranking',
        'Job management',
        'Application tracking'
      ],
      tech: ['Python', 'AI', 'Modern Web Technologies', 'Database Integration'],
      image: 'assets/projects/hireme.svg',
      github: 'https://github.com/Kanthu2005/Hire_ME',
      live: ''
    },
    {
      id: 'stockflow',
      code: 'PROJECT 04',
      name: 'StockFlow',
      subtitle: 'Inventory & Stock Management System',
      description: 'A modern inventory management platform designed to help businesses organize products, monitor stock levels and manage inventory operations efficiently.',
      features: [
        'Organization management',
        'User management',
        'Product management',
        'Stock monitoring',
        'Inventory thresholds',
        'Low-stock alerts',
        'Inventory dashboards',
        'Operational settings'
      ],
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'React.js'],
      image: 'assets/projects/stockflow.svg',
      github: 'https://github.com/Kanthu2005/StockFlow',
      live: 'https://stock-flow-ten-ashy.vercel.app/'
    },
    {
      id: 'ai-cli-agent',
      code: 'PROJECT 05',
      name: 'AI Command Line Agent',
      subtitle: 'Intelligent AI-Powered Terminal Assistant',
      description: 'An AI-powered command-line assistant designed to understand natural-language instructions and help developers interact with their development environment more efficiently.',
      features: [
        'Natural-language commands',
        'AI-assisted terminal workflows',
        'Command explanations',
        'Development assistance',
        'Intelligent task execution',
        'Error explanation',
        'Safe command confirmation before potentially destructive actions'
      ],
      tech: ['Python', 'LLMs', 'Prompt Engineering', 'Automation'],
      image: 'assets/projects/cli-agent.svg',
      github: 'https://github.com/Kanthu2005/ai-command-line-agent',
      live: ''
    },
    {
      id: 'ai-browser-agent',
      code: 'PROJECT 06',
      name: 'AI Browser Search Agent',
      subtitle: 'Intelligent AI Web Search and Research Assistant',
      description: 'An AI-powered browser search agent designed to discover information, explore web pages and organize research into useful summaries.',
      features: [
        'Natural-language search',
        'Intelligent query processing',
        'Web page discovery',
        'Content extraction',
        'AI-powered summarization',
        'Research organization',
        'Source links and references'
      ],
      tech: ['Python', 'AI', 'LLMs', 'APIs', 'Browser Automation'],
      image: 'assets/projects/browser-agent.svg',
      github: 'https://github.com/Kanthu2005/AI-browser-search-agent-',
      live: ''
    },
    {
      id: 'daymate-ai',
      code: 'PROJECT 07',
      name: 'DayMate AI',
      subtitle: 'AI-Powered Personal Productivity Platform',
      description: 'A unified productivity application designed to help users manage daily activities, tasks, finances, documents, habits and personal goals through an intelligent AI assistant.',
      features: [
        'Task management',
        'Smart reminders',
        'Personal finance tracking',
        'Document vault',
        'Habit tracking',
        'Goal management',
        'AI assistant',
        'Document intelligence using RAG',
        'Productivity analytics',
        'Automation'
      ],
      tech: ['React Native', 'Expo', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL'],
      image: 'assets/projects/daymate.svg',
      github: '', // PLACEHOLDER: add verified repository URL
      live: ''
    }
  ],

  skills: [
    {
      group: 'Programming Languages',
      items: [
        { name: 'Python', icon: 'code' },
        { name: 'Java', icon: 'coffee' }
      ]
    },
    {
      group: 'Backend Development',
      items: [
        { name: 'FastAPI', icon: 'bolt' },
        { name: 'REST APIs', icon: 'plug' }
      ]
    },
    {
      group: 'Frontend',
      items: [
        { name: 'React.js', icon: 'atom' }
      ]
    },
    {
      group: 'Databases',
      items: [
        { name: 'PostgreSQL', icon: 'db' },
        { name: 'MongoDB', icon: 'leaf' },
        { name: 'Redis', icon: 'layers' }
      ]
    },
    {
      group: 'AI & Generative AI',
      items: [
        { name: 'LLM Fundamentals', icon: 'spark' },
        { name: 'RAG', icon: 'search' },
        { name: 'Prompt Engineering', icon: 'terminal' },
        { name: 'AI Application Development', icon: 'cpu' }
      ]
    },
    {
      group: 'Tools & Automation',
      items: [
        { name: 'Git', icon: 'branch' },
        { name: 'GitHub', icon: 'github' },
        { name: 'Docker', icon: 'box' },
        { name: 'n8n', icon: 'flow' }
      ]
    }
  ],

  education: [
    {
      degree: 'B.Tech — Information Technology',
      school: 'Vidya Jyothi Institute of Technology, Hyderabad',
      period: '2022–2026',
      score: 'CGPA: 8.50'
    },
    {
      degree: 'Intermediate — MPC',
      school: 'TSWRIES Junior Boys College',
      period: '2020–2022',
      score: 'Percentage: 82.2%'
    },
    {
      degree: 'SSC',
      school: 'ZPHS Damaragidda',
      period: '2015–2020',
      score: 'GPA: 10'
    }
  ],

  certifications: [
    { title: 'C++ Certification', issuer: 'Cisco Networking Academy' },
    { title: 'Java Certification', issuer: 'Infosys Springboard' },
    { title: 'Data Science', issuer: 'Wipro TalentNext' },
    { title: 'Artificial Intelligence', issuer: 'Infosys Finishing School for Employability' }
  ],

  capabilities: [
    {
      num: '01',
      title: 'Backend Development',
      desc: 'Building REST APIs, server-side applications and database-driven systems.',
      projectId: 'dineflow',
      projectLabel: 'DineFlow'
    },
    {
      num: '02',
      title: 'Full-Stack Development',
      desc: 'Creating complete web applications with modern frontend and backend technologies.',
      projectId: 'stockflow',
      projectLabel: 'StockFlow'
    },
    {
      num: '03',
      title: 'AI Application Development',
      desc: 'Building applications powered by LLMs, RAG and prompt engineering.',
      projectId: 'daymate-ai',
      projectLabel: 'DayMate AI'
    },
    {
      num: '04',
      title: 'Workflow Automation',
      desc: 'Automating repetitive processes and integrating services.',
      projectId: 'ai-cli-agent',
      projectLabel: 'AI CLI Agent'
    },
    {
      num: '05',
      title: 'Database Management',
      desc: 'Designing and managing relational and NoSQL database systems.',
      projectId: 'proctorai',
      projectLabel: 'ProctorAI'
    },
    {
      num: '06',
      title: 'Problem Solving',
      desc: 'Breaking down complex problems into practical and maintainable solutions.',
      projectId: 'hireme-ai',
      projectLabel: 'Hire-Me AI'
    }
  ]
};
