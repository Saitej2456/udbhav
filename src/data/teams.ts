export type TeamMember = {
  name: string;
  email: string;
  batch: string;
  phone: string;
  role: 'leader' | 'member';
  status?: 'pending' | 'approved';
};

export type Team = {
  id: string;
  name: string;
  iiit: string;
  representative: string;
  representativeEmail: string;
  rank: number;
  status: string;
  members: TeamMember[];
  project: {
    name: string;
    description: string;
    domain: string;
    github: string;
    demo: string;
    techStack: string[];
  };
};

export const teamsData: Team[] = [
  {
    id: 'team-1',
    name: 'TechTitans',
    iiit: 'IIIT Sonepat',
    representative: 'Vikram Singh',
    representativeEmail: 'vikram@iiitsonepat.ac.in',
    rank: 1,
    status: 'Finalist',
    members: [
      { 
        name: 'Vikram Singh', 
        batch: '2022', 
        email: 'vikram@iiitsonepat.ac.in', 
        phone: '+91 98765 43210',
        role: 'leader',
        status: 'approved'
      },
      { 
        name: 'Priya Patel', 
        batch: '2022', 
        email: 'priya@iiitsonepat.ac.in', 
        phone: '+91 98765 43211',
        role: 'member',
        status: 'approved'
      },
      { 
        name: 'Rahul Mehta', 
        batch: '2023', 
        email: 'rahul@iiitsonepat.ac.in', 
        phone: '+91 98765 43212',
        role: 'member',
        status: 'approved'
      },
      { 
        name: 'Sneha Gupta', 
        batch: '2023', 
        email: 'sneha@iiitsonepat.ac.in', 
        phone: '+91 98765 43213',
        role: 'member',
        status: 'approved'
      },
    ],
    project: {
      name: 'AI-Powered Healthcare Platform',
      description: 'An intelligent healthcare platform that uses machine learning to predict diseases, recommend treatments, and connect patients with specialists. Features include symptom analysis, medical image interpretation, and personalized health recommendations.',
      domain: 'AI/ML',
      github: 'https://github.com/techtitans/healthcare-ai',
      demo: 'https://healthcare-ai.demo.com',
      techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
    },
  },
  {
    id: 'team-2',
    name: 'CodeCrafters',
    iiit: 'IIIT Allahabad',
    representative: 'Test User',
    representativeEmail: 'cse23054@iiitkalyani.ac.in', // Replace with your actual email
    rank: 2,
    status: 'Active',
    members: [
      { 
        name: 'Test User', 
        batch: '2023', 
        email: 'cse23054@iiitkalyani.ac.in', // Replace with your actual email
        phone: '+91 98765 00000',
        role: 'leader',
        status: 'approved'
      },
      { 
        name: 'Alice Johnson', 
        batch: '2023', 
        email: 'alice@iiita.ac.in', 
        phone: '+91 98765 00001',
        role: 'member',
        status: 'approved'
      },
      { 
        name: 'Bob Smith', 
        batch: '2024', 
        email: 'bob@iiita.ac.in', 
        phone: '+91 98765 00002',
        role: 'member',
        status: 'approved'
      },
    ],
    project: {
      name: 'Smart City Dashboard',
      description: 'A comprehensive IoT-based dashboard for monitoring and managing smart city infrastructure including traffic, waste management, and energy consumption.',
      domain: 'IoT/Web Development',
      github: 'https://github.com/codecrafters/smart-city',
      demo: 'https://smart-city.demo.com',
      techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Arduino'],
    },
  },
  // Add more teams as needed
];
