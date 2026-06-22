import type { User, Profile, Club, Event, StudyGroup, Team, ChatConversation, Message, Notification, Report } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'aarav.sharma@college.edu', role: 'student', isVerified: true, trustScore: 98, createdAt: '2026-01-10T10:00:00Z' },
  { id: 'u2', email: 'ananya.iyer@college.edu', role: 'student', isVerified: true, trustScore: 95, createdAt: '2026-01-15T12:00:00Z' },
  { id: 'u3', email: 'kabir.verma@college.edu', role: 'club_leader', isVerified: true, trustScore: 92, createdAt: '2026-01-20T14:30:00Z' },
  { id: 'u4', email: 'ria.sen@college.edu', role: 'student', isVerified: true, trustScore: 89, createdAt: '2026-02-01T09:15:00Z' },
  { id: 'u5', email: 'dev.patel@college.edu', role: 'student', isVerified: false, trustScore: 60, createdAt: '2026-03-05T11:00:00Z' },
  { id: 'u6', email: 'neha.gupta@college.edu', role: 'faculty', isVerified: true, trustScore: 100, createdAt: '2025-12-01T08:00:00Z' },
  { id: 'admin', email: 'admin@college.edu', role: 'admin', isVerified: true, trustScore: 100, createdAt: '2025-10-01T00:00:00Z' }
];

export const mockProfiles: Profile[] = [
  {
    userId: 'u1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    college: 'Engineering Institute of Tech',
    branch: 'Computer Science',
    year: 3,
    bio: 'Passionate full-stack developer and AI enthusiast. Love building open-source projects and participating in 36-hour hackathons.',
    skills: ['React', 'Node.js', 'Python', 'TypeScript', 'Docker', 'FastAPI'],
    interests: ['AI/ML', 'Web Development', 'System Design', 'Open Source'],
    techStack: ['MERN', 'Next.js', 'PostgreSQL', 'TailwindCSS'],
    clubs: ['Coding Club', 'ACM Student Chapter'],
    careerGoals: ['Software Engineer at Vercel', 'Startup Founder'],
    availability: [
      { day: 'Monday', time: 'Evening' },
      { day: 'Wednesday', time: 'Afternoon' },
      { day: 'Saturday', time: 'Morning' }
    ],
    lookingFor: ['Hackathon Teammates', 'Study Partners', 'Mentors'],
    projects: [
      { title: 'DevSphere', description: 'A collaborative canvas for developer teams to plan architecture.', techStack: ['React', 'Websockets', 'Node.js'] },
      { title: 'DocuChat AI', description: 'SaaS to query documents using LLMs and vector database.', techStack: ['Python', 'Pinecone', 'OpenAI'] }
    ],
    achievements: [
      { title: '1st Place Winner', issuer: 'Campus Hackathon 2025', date: 'Oct 2025', description: 'Built an automated energy saver system.' },
      { title: 'Dean\'s List', issuer: 'Academic Affairs', date: 'June 2025' }
    ]
  },
  {
    userId: 'u2',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    college: 'Engineering Institute of Tech',
    branch: 'Information Technology',
    year: 2,
    bio: 'UI/UX Designer turned Frontend Engineer. Passionate about beautiful interfaces, accessibility, and micro-interactions.',
    skills: ['Figma', 'React', 'CSS Grid', 'TailwindCSS', 'Framer Motion', 'JavaScript'],
    interests: ['Product Design', 'UI Development', 'Aesthetics', 'Interaction Design'],
    techStack: ['React', 'Framer Motion', 'TailwindCSS', 'Vite'],
    clubs: ['Design & Arts Club', 'WebDev Society'],
    careerGoals: ['Product Designer at Linear', 'Design System Architect'],
    availability: [
      { day: 'Tuesday', time: 'Afternoon' },
      { day: 'Thursday', time: 'Evening' },
      { day: 'Sunday', time: 'Evening' }
    ],
    lookingFor: ['Hackathon Teammates', 'Project Teammates'],
    projects: [
      { title: 'Oasis UI', description: 'A glassmorphism-based lightweight library for React projects.', techStack: ['TypeScript', 'CSS'] }
    ],
    achievements: [
      { title: 'Best Design Award', issuer: 'National Design Challenge', date: 'Nov 2025' }
    ]
  },
  {
    userId: 'u3',
    name: 'Kabir Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    college: 'Engineering Institute of Tech',
    branch: 'Computer Science',
    year: 4,
    bio: 'Lead Developer at Coding Club. Experienced in backend systems, databases, and microservices architecture. Happy to mentor juniors.',
    skills: ['Java', 'Spring Boot', 'Go', 'Kubernetes', 'PostgreSQL', 'Redis', 'System Design'],
    interests: ['Distributed Systems', 'Database Tuning', 'Technical Leadership', 'Mentoring'],
    techStack: ['Spring Boot', 'PostgreSQL', 'AWS', 'Docker'],
    clubs: ['Coding Club', 'Distributed Systems Labs'],
    careerGoals: ['Backend Architect', 'Principal Engineer'],
    availability: [
      { day: 'Friday', time: 'Evening' },
      { day: 'Saturday', time: 'Afternoon' }
    ],
    lookingFor: ['Mentors', 'Project Teammates'],
    projects: [
      { title: 'Campus Query Engine', description: 'High-throughput search engine matching library books with students.', techStack: ['Go', 'Elasticsearch'] }
    ],
    achievements: [
      { title: 'Google Summer of Code Mentee', issuer: 'Google', date: 'Aug 2024' }
    ]
  },
  {
    userId: 'u4',
    name: 'Ria Sen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    college: 'Engineering Institute of Tech',
    branch: 'Electronics Engineering',
    year: 3,
    bio: 'Embedded systems tinkerer and IoT developer. Working at the intersection of hardware and machine learning.',
    skills: ['C++', 'Python', 'Arduino', 'Raspberry Pi', 'TensorFlow', 'Microcontrollers'],
    interests: ['Internet of Things', 'Robotics', 'Edge AI', 'Hardware Design'],
    techStack: ['C++', 'TensorFlow Lite', 'Python'],
    clubs: ['Robotics Society'],
    careerGoals: ['Firmware Engineer at Tesla', 'Robotics Researcher'],
    availability: [
      { day: 'Wednesday', time: 'Morning' },
      { day: 'Friday', time: 'Morning' },
      { day: 'Saturday', time: 'Evening' }
    ],
    lookingFor: ['Study Partners', 'Hackathon Teammates'],
    projects: [
      { title: 'Smart Agriculture IoT Node', description: 'Distributed sensors tracking soil health and transmitting data via LoRa.', techStack: ['C++', 'LoRa', 'ESP32'] }
    ],
    achievements: [
      { title: 'Winner: Smart City Hackathon', issuer: 'Ministry of Electronics', date: 'Jan 2025' }
    ]
  },
  {
    userId: 'u5',
    name: 'Dev Patel',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    college: 'Engineering Institute of Tech',
    branch: 'Information Technology',
    year: 1,
    bio: 'First year student looking to learn. Interested in web development and finding seniors for guidance.',
    skills: ['HTML', 'CSS', 'C', 'JavaScript'],
    interests: ['Competitive Coding', 'Web Development', 'Academics'],
    techStack: ['Vanilla JavaScript'],
    clubs: [],
    careerGoals: ['Learn React & Node', 'Get an internship'],
    availability: [
      { day: 'Saturday', time: 'Morning' },
      { day: 'Sunday', time: 'Morning' }
    ],
    lookingFor: ['Study Partners', 'Mentors'],
    projects: [],
    achievements: []
  },
  {
    userId: 'u6',
    name: 'Dr. Neha Gupta',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    college: 'Engineering Institute of Tech',
    branch: 'Computer Science Department',
    year: 0, // Faculty
    bio: 'Professor of Data Structures and Algorithms. Advisor to the Coding Club. Interested in helping students build projects.',
    skills: ['Algorithms', 'Research', 'Academic Guidance', 'C++', 'Java'],
    interests: ['Algorithmic Research', 'Student Success', 'Tech Mentorship'],
    techStack: [],
    clubs: ['Coding Club'],
    careerGoals: [],
    availability: [
      { day: 'Tuesday', time: 'Morning' },
      { day: 'Thursday', time: 'Morning' }
    ],
    lookingFor: ['Mentors'],
    projects: [],
    achievements: []
  }
];

export const mockClubs: Club[] = [
  {
    id: 'c1',
    name: 'Coding Club',
    description: 'The premier developer community on campus. We organize weekly coding workshops, competitive programming events, hackathons, and build projects together.',
    category: 'technical',
    logo: '💻',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    leaderId: 'u3',
    memberIds: ['u3', 'u1', 'u5'],
    isRecruiting: true,
    createdAt: '2024-08-15T09:00:00Z'
  },
  {
    id: 'c2',
    name: 'Design & Arts Club',
    description: 'A community where creativity flows. We host UI/UX bootcamps, design critiques, graphic art exhibitions, and branding workshops.',
    category: 'cultural',
    logo: '🎨',
    banner: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    leaderId: 'u2',
    memberIds: ['u2', 'u1'],
    isRecruiting: false,
    createdAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'c3',
    name: 'Robotics Society',
    description: 'Exploring the fusion of hardware and AI. From autonomous rovers to humanoid systems, we build them all. Workshops on ROS, Arduino, and Edge AI.',
    category: 'technical',
    logo: '🤖',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    leaderId: 'u4',
    memberIds: ['u4'],
    isRecruiting: true,
    createdAt: '2024-10-10T12:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'VeloHack 2026',
    description: 'A 36-hour hackathon where students build web, mobile, or hardware hacks to solve real-world problems. Supported by industry leaders and local incubation centers.',
    category: 'hackathon',
    date: '2026-07-10T09:00:00Z',
    endDate: '2026-07-11T21:00:00Z',
    venue: 'Campus Seminar Hall A & B',
    organizer: 'Coding Club',
    clubId: 'c1',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    registeredIds: ['u1', 'u2', 'u4'],
    maxCapacity: 150
  },
  {
    id: 'e2',
    title: 'UI/UX Design Masterclass',
    description: 'Learn the fundamentals of visual design, user research, wireframing, and interactive prototyping. Direct hands-on Figma workshops and portfolio reviews.',
    category: 'workshop',
    date: '2026-06-30T14:00:00Z',
    endDate: '2026-06-30T17:00:00Z',
    venue: 'Computer Center Lab 4',
    organizer: 'Design & Arts Club',
    clubId: 'c2',
    banner: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&q=80&w=800',
    registeredIds: ['u1', 'u5'],
    maxCapacity: 50
  },
  {
    id: 'e3',
    title: 'Competitive Coding Clash',
    description: 'Test your problem-solving skills, algorithmic efficiency, and coding speed in this 3-hour campus contest. Cash prizes for top performers.',
    category: 'technical',
    date: '2026-07-02T18:00:00Z',
    endDate: '2026-07-02T21:00:00Z',
    venue: 'Online & Lab 1',
    organizer: 'Coding Club',
    clubId: 'c1',
    banner: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800',
    registeredIds: ['u1', 'u3', 'u5'],
    maxCapacity: 200
  }
];

export const mockStudyGroups: StudyGroup[] = [
  {
    id: 'sg1',
    name: 'DSA Mastery Group',
    subject: 'DSA',
    description: 'Solving Leetcode Medium & Hard problems together, discussing complex algorithms, dynamic programming, and graphs. Focus on placement prep.',
    creatorId: 'u1',
    memberIds: ['u1', 'u4', 'u5'],
    maxMembers: 6,
    schedule: 'Mon, Wed, Fri at 7:00 PM',
    isOpen: true,
    createdAt: '2026-05-15T15:00:00Z'
  },
  {
    id: 'sg2',
    name: 'Deep Learning Papers Review',
    subject: 'AI/ML',
    description: 'Weekly reviews of classic and modern AI/ML papers (Transformers, GANs, Diffusion Models). Building small scale projects in PyTorch.',
    creatorId: 'u1',
    memberIds: ['u1', 'u2'],
    maxMembers: 5,
    schedule: 'Saturday at 4:00 PM',
    isOpen: true,
    createdAt: '2026-05-20T10:00:00Z'
  },
  {
    id: 'sg3',
    name: 'Core OS Systems & Kernel',
    subject: 'OS',
    description: 'Studying threads, memory virtualization, CPU scheduling, file systems, and building custom shell commands in C/C++.',
    creatorId: 'u3',
    memberIds: ['u3', 'u4'],
    maxMembers: 4,
    schedule: 'Tuesday at 6:00 PM',
    isOpen: false,
    createdAt: '2026-06-01T11:00:00Z'
  }
];

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'NeuralByte',
    hackathonName: 'VeloHack 2026',
    description: 'Building a smart dashboard for student clubs to automate recruitment, scheduling, and feedback using small local language models.',
    leaderId: 'u1',
    memberIds: ['u1', 'u2'],
    openRoles: ['Backend', 'AI/ML'],
    requiredSkills: ['Node.js', 'FastAPI', 'PyTorch', 'Vector DBs'],
    status: 'forming',
    createdAt: '2026-06-18T14:00:00Z'
  },
  {
    id: 't2',
    name: 'AeroRover',
    hackathonName: 'VeloHack 2026',
    description: 'Developing a drone-mounted campus pollution monitor transmitting data via LoRa nodes, visualised on a real-time web portal.',
    leaderId: 'u4',
    memberIds: ['u4'],
    openRoles: ['Frontend', 'UI/UX', 'Backend'],
    requiredSkills: ['React', 'Leaflet', 'ESP32', 'C++'],
    status: 'forming',
    createdAt: '2026-06-19T09:00:00Z'
  }
];

export const mockConversations: ChatConversation[] = [
  { id: 'c_dm1', type: 'direct', participantIds: ['u1', 'u2'], lastMessage: 'Let\'s collaborate on the front-end for our hackathon project.', lastMessageTime: '2026-06-22T18:30:00Z' },
  { id: 'c_dm2', type: 'direct', participantIds: ['u1', 'u3'], lastMessage: 'Thank you for the system design advice, Kabir!', lastMessageTime: '2026-06-22T14:15:00Z' },
  { id: 'c_sg1', type: 'study_group', participantIds: ['u1', 'u4', 'u5'], name: 'DSA Mastery Group Chat', lastMessage: 'Dev, did you try solving today\'s DP problem?', lastMessageTime: '2026-06-22T19:00:00Z' },
  { id: 'c_t1', type: 'team', participantIds: ['u1', 'u2'], name: 'NeuralByte Team Chat', lastMessage: 'Figma layout looks incredible. I\'ll begin setting up Vite now.', lastMessageTime: '2026-06-22T18:45:00Z' }
];

export const mockMessages: Message[] = [
  { id: 'm1', conversationId: 'c_dm1', senderId: 'u1', content: 'Hey Ananya! I saw your portfolio. The designs are absolutely beautiful.', timestamp: '2026-06-22T18:15:00Z', readBy: ['u1', 'u2'] },
  { id: 'm2', conversationId: 'c_dm1', senderId: 'u2', content: 'Hey Aarav! Thanks so much. I\'ve been trying to learn React animations.', timestamp: '2026-06-22T18:20:00Z', readBy: ['u1', 'u2'] },
  { id: 'm3', conversationId: 'c_dm1', senderId: 'u1', content: 'We should form a team for VeloHack 2026. Your visual design combined with my back-end logic would make an awesome product.', timestamp: '2026-06-22T18:25:00Z', readBy: ['u1', 'u2'] },
  { id: 'm4', conversationId: 'c_dm1', senderId: 'u2', content: 'I\'m 100% in! Let\'s collaborate on the front-end for our hackathon project.', timestamp: '2026-06-22T18:30:00Z', readBy: ['u1', 'u2'] },
  
  { id: 'm5', conversationId: 'c_dm2', senderId: 'u1', content: 'Hey Kabir, quick question: Should I use Redis cache for high frequency reads of static data?', timestamp: '2026-06-22T14:00:00Z', readBy: ['u1', 'u3'] },
  { id: 'm6', conversationId: 'c_dm2', senderId: 'u3', content: 'Yes! Definitely. Redis would keep read times sub-millisecond. Since it\'s static data, invalidate it on update and set an expiration.', timestamp: '2026-06-22T14:10:00Z', readBy: ['u1', 'u3'] },
  { id: 'm7', conversationId: 'c_dm2', senderId: 'u1', content: 'Thank you for the system design advice, Kabir!', timestamp: '2026-06-22T14:15:00Z', readBy: ['u1', 'u3'] },

  { id: 'm8', conversationId: 'c_sg1', senderId: 'u1', content: 'Hey guys, ready for today\'s Leetcode problem solving session?', timestamp: '2026-06-22T18:50:00Z', readBy: ['u1', 'u4', 'u5'] },
  { id: 'm9', conversationId: 'c_sg1', senderId: 'u4', content: 'Yep, joining in 5 minutes.', timestamp: '2026-06-22T18:52:00Z', readBy: ['u1', 'u4', 'u5'] },
  { id: 'm10', conversationId: 'c_sg1', senderId: 'u5', content: 'I am struggling with standard knapsack problems. Need some help.', timestamp: '2026-06-22T18:55:00Z', readBy: ['u1', 'u4', 'u5'] },
  { id: 'm11', conversationId: 'c_sg1', senderId: 'u1', content: 'Dev, did you try solving today\'s DP problem?', timestamp: '2026-06-22T19:00:00Z', readBy: ['u1', 'u4', 'u5'] }
];

export const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'success', title: 'Registration Confirmed', message: 'You have registered for VeloHack 2026! Prepare your tools.', isRead: false, actionUrl: '/events', createdAt: '2026-06-20T10:00:00Z' },
  { id: 'n2', userId: 'u1', type: 'info', title: 'New Team Request', message: 'Dev Patel requested to join your DSA Mastery Group.', isRead: false, actionUrl: '/study-buddy', createdAt: '2026-06-22T12:00:00Z' },
  { id: 'n3', userId: 'u2', type: 'alert', title: 'Team Formation Notice', message: 'VeloHack registration is closing soon. Ensure your team profile is complete.', isRead: true, actionUrl: '/hackathon', createdAt: '2026-06-21T09:00:00Z' }
];

export const mockReports: Report[] = [
  { id: 'r1', reporterId: 'u2', targetId: 'u5', targetType: 'user', reason: 'Unprofessional behavior', description: 'Spamming message requests asking for study solutions during ongoing college tests.', status: 'pending', createdAt: '2026-06-22T11:00:00Z' }
];
