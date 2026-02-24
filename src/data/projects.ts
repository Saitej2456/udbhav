import type { FullProjectData } from '@/lib/projectService';

export interface Project {
  id: number;
  name: string;
  team: string;
  iiit: string;
  description: string;
  fullDescription?: string;
  domain: string;
  github: string;
  demo: string;
  image: string | null;
  features?: string[];
  techStack?: string[];
  challenges?: string;
  impact?: string;
  teamMembers?: Array<{ name: string; email: string; role: string }>;
  userId?: string; // Link to Supabase user_id
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Bhumi',
    team: 'DAOMINATORS',
    iiit: 'IIIT Allahabad',
    description: 'A blockchain-based land registry system ensuring transparent and secure property transactions.',
    fullDescription: 'Bhumi is a revolutionary blockchain-based land registry system designed to transform property transactions in India. By leveraging distributed ledger technology, Bhumi ensures complete transparency, security, and immutability of land records. The platform eliminates traditional inefficiencies in land registration, reduces fraud, and provides a tamper-proof system for property ownership verification. With smart contracts automating the registration process, Bhumi significantly reduces the time and cost involved in property transactions while maintaining the highest standards of security and compliance.',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
    features: [
      'Immutable land records on blockchain',
      'Smart contract-based property transfers',
      'Digital identity verification',
      'Automated compliance checking',
      'Real-time transaction tracking'
    ],
    techStack: ['Ethereum', 'Solidity', 'React', 'Node.js', 'IPFS'],
    challenges: 'Integrating legacy land records into blockchain while maintaining data integrity and ensuring scalability for millions of property records.',
    impact: 'Reducing property fraud by 95% and cutting down registration time from weeks to hours.'
  },
  {
    id: 2,
    name: 'Problem Statement: 1',
    team: 'Bancode',
    iiit: 'IIIT Bhubaneswar',
    description: 'An AI/ML solution addressing complex healthcare challenges.',
    fullDescription: 'This innovative AI/ML solution tackles critical healthcare challenges through advanced machine learning algorithms and data analytics. The project demonstrates exceptional technical prowess in applying artificial intelligence to real-world medical scenarios, providing insights and solutions that can significantly improve patient outcomes and healthcare delivery.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: ['Python', 'TensorFlow', 'Scikit-learn'],
    challenges: '',
    impact: ''
  },
  {
    id: 3,
    name: 'GenAI-Powered Clinical Note Summarization and Hypothesis Generation',
    team: 'Nocturnal_Code',
    iiit: 'IIIT Kurnool',
    description: 'An advanced GenAI system that summarizes clinical notes and generates medical hypotheses.',
    fullDescription: 'This cutting-edge GenAI-powered system revolutionizes clinical documentation by automatically summarizing lengthy clinical notes and generating evidence-based medical hypotheses. Using state-of-the-art natural language processing and large language models, the platform helps healthcare professionals save time on documentation while improving diagnostic accuracy. The system analyzes patient histories, symptoms, and test results to suggest potential diagnoses and treatment pathways, serving as an intelligent assistant for medical practitioners.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [
      'Automated clinical note summarization',
      'AI-driven hypothesis generation',
      'Medical terminology extraction',
      'Evidence-based recommendations',
      'Integration with EMR systems'
    ],
    techStack: ['GPT-4', 'LangChain', 'Python', 'FastAPI', 'PostgreSQL'],
    challenges: 'Ensuring medical accuracy and compliance with HIPAA regulations while maintaining high performance.',
    impact: 'Reducing documentation time by 60% and improving diagnostic accuracy through AI-assisted hypothesis generation.'
  },
  {
    id: 4,
    name: 'Problem Statement: 1',
    team: 'SINISTER-6',
    iiit: 'IIIT Dharwad',
    description: 'An innovative AI/ML solution for healthcare optimization.',
    fullDescription: 'SINISTER-6 presents a comprehensive AI/ML solution designed to optimize healthcare processes through intelligent automation and predictive analytics. The project leverages machine learning algorithms to analyze healthcare data patterns and provide actionable insights for improving patient care and operational efficiency.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 5,
    name: 'E-parchi',
    team: 'Kaizen',
    iiit: 'IIIT Manipur',
    description: 'A digital prescription and healthcare management system.',
    fullDescription: 'E-parchi is a comprehensive digital healthcare platform that modernizes prescription management and patient care coordination. The system enables doctors to generate digital prescriptions, patients to access their medical history, and pharmacies to verify and dispense medications efficiently. By digitizing the entire prescription workflow, E-parchi reduces errors, prevents fraud, and improves healthcare accessibility, especially in rural and underserved areas.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [
      'Digital prescription generation',
      'QR code-based verification',
      'Patient medical history tracking',
      'Pharmacy integration',
      'Medicine interaction checker'
    ],
    techStack: ['React Native', 'Node.js', 'MongoDB', 'TensorFlow'],
    challenges: 'Building trust among healthcare providers and ensuring seamless adoption across diverse stakeholders.',
    impact: 'Eliminating prescription fraud and improving medication adherence by 40%.'
  },
  {
    id: 6,
    name: 'Med-Insight-AI',
    team: 'Zero-Deadlock',
    iiit: 'IIIT Raichur',
    description: 'An AI-powered medical diagnosis assistant providing clinical insights.',
    fullDescription: 'Med-Insight-AI is an advanced artificial intelligence platform designed to assist medical professionals in diagnosis and treatment planning. Using deep learning and computer vision, the system analyzes medical images, lab reports, and patient data to provide comprehensive diagnostic insights. The platform supports multiple medical specialties and continuously learns from new cases to improve accuracy and provide evidence-based recommendations.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [
      'Medical image analysis',
      'Multi-modal data integration',
      'Differential diagnosis suggestions',
      'Treatment pathway recommendations',
      'Real-time consultation support'
    ],
    techStack: ['PyTorch', 'OpenCV', 'Flask', 'React', 'Docker'],
    challenges: 'Training models on diverse datasets while maintaining high accuracy across different demographics.',
    impact: 'Supporting early detection of diseases with 92% accuracy and reducing diagnostic time by 50%.'
  },
  {
    id: 7,
    name: 'Problem Statement: 1',
    team: 'KanyaRaasi',
    iiit: 'IIIT Kottayam',
    description: 'A machine learning solution for healthcare data analysis.',
    fullDescription: 'KanyaRaasi team has developed a sophisticated machine learning solution focused on healthcare data analysis and predictive modeling. The project demonstrates innovative approaches to extracting meaningful insights from complex medical datasets, enabling better decision-making in healthcare settings.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 8,
    name: 'Problem Statement: 2',
    team: "Bohar's Bit",
    iiit: 'IIIT Sri City',
    description: 'A blockchain solution for secure property management.',
    fullDescription: "Bohar's Bit presents an innovative blockchain-based solution for secure property management and transactions. The platform leverages distributed ledger technology to ensure transparency, reduce fraud, and streamline property-related processes. By implementing smart contracts and decentralized verification systems, the project aims to revolutionize how property rights are recorded and transferred.",
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 9,
    name: 'Divflow',
    team: 'DivFlow',
    iiit: 'IIIT Vadodara-ICD',
    description: 'A blockchain-based dividend distribution and management platform.',
    fullDescription: 'Divflow is a sophisticated blockchain platform that automates and secures dividend distribution processes for companies and investors. Using smart contracts, the system ensures transparent, instant, and accurate dividend payments while maintaining complete audit trails. The platform eliminates intermediaries, reduces costs, and provides shareholders with real-time visibility into their investments and dividend earnings.',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
    features: [
      'Automated dividend distribution',
      'Smart contract-based payments',
      'Real-time shareholder portal',
      'Transparent audit trails',
      'Multi-currency support'
    ],
    techStack: ['Ethereum', 'Web3.js', 'React', 'Node.js', 'PostgreSQL'],
    challenges: 'Ensuring regulatory compliance across different jurisdictions while maintaining decentralization.',
    impact: 'Reducing dividend processing time from days to minutes and cutting costs by 70%.'
  },
  {
    id: 10,
    name: 'Problem Statement: 1',
    team: 'HackSmith',
    iiit: 'IIIT Kota',
    description: 'An AI-driven healthcare solution focusing on patient care optimization.',
    fullDescription: 'HackSmith team has engineered an AI-driven healthcare solution that optimizes patient care through intelligent data analysis and predictive modeling. The platform uses advanced machine learning algorithms to identify patterns in patient data, predict potential health risks, and recommend personalized treatment plans.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 11,
    name: 'NodeHealth',
    team: 'Team notFound',
    iiit: 'IIIT Bhagalpur',
    description: 'A decentralized healthcare data management system.',
    fullDescription: 'NodeHealth is a revolutionary decentralized healthcare data management system that puts patients in control of their medical information. Using distributed nodes and encryption, the platform ensures secure storage and sharing of medical records while maintaining patient privacy. Healthcare providers can access authorized patient data instantly, enabling better coordinated care and reducing medical errors.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [
      'Decentralized data storage',
      'Patient-controlled access',
      'End-to-end encryption',
      'Interoperable health records',
      'AI-powered health insights'
    ],
    techStack: ['Node.js', 'IPFS', 'React', 'MongoDB', 'TensorFlow'],
    challenges: 'Balancing data privacy with accessibility while ensuring system scalability.',
    impact: 'Empowering patients with data ownership and reducing duplicate medical tests by 35%.'
  },
  {
    id: 12,
    name: 'Problem Statement: 1',
    team: 'CBOW',
    iiit: 'IIIT Naya Raipur',
    description: 'A natural language processing solution for healthcare applications.',
    fullDescription: 'CBOW team has developed a sophisticated natural language processing solution tailored for healthcare applications. The project leverages advanced NLP techniques to extract meaningful information from medical texts, automate documentation, and improve communication between healthcare systems.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 13,
    name: 'Problem Statement: 1',
    team: 'The Hawkings',
    iiit: 'IIIT Tiruchirappalli',
    description: 'An advanced AI system for medical data analysis.',
    fullDescription: 'The Hawkings team presents an advanced AI system designed to analyze complex medical data and provide actionable insights. The platform combines multiple machine learning techniques to process various types of medical information, from imaging data to clinical notes, offering comprehensive support for healthcare decision-making.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 14,
    name: 'Problem Statement: 1',
    team: '404 Found',
    iiit: 'IIIT Bhopal',
    description: 'A machine learning platform for predictive healthcare analytics.',
    fullDescription: '404 Found team has created a comprehensive machine learning platform focused on predictive healthcare analytics. The system analyzes historical patient data to forecast health trends, identify at-risk populations, and recommend preventive interventions, ultimately improving population health outcomes.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 15,
    name: 'LandTrust',
    team: 'DBDT',
    iiit: 'IIIT Surat',
    description: 'A blockchain-based land verification and trust system.',
    fullDescription: 'LandTrust is a comprehensive blockchain-based platform designed to establish trust and transparency in land transactions. By recording all property information on an immutable ledger, the system prevents fraud, streamlines verification processes, and provides instant proof of ownership. LandTrust integrates with government registries and uses cryptographic proofs to ensure that every land transaction is legitimate and traceable.',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
    features: [
      'Blockchain-based land registry',
      'Instant ownership verification',
      'Fraud prevention mechanisms',
      'Government integration',
      'Historical transaction records'
    ],
    techStack: ['Hyperledger Fabric', 'React', 'Node.js', 'MongoDB'],
    challenges: 'Digitizing existing land records and ensuring adoption by government authorities.',
    impact: 'Eliminating land disputes through transparent records and reducing verification time by 80%.'
  },
  {
    id: 16,
    name: 'Problem Statement: 1',
    team: 'SnackOverflow',
    iiit: 'IIIT Kancheepuram',
    description: 'An AI solution for healthcare process automation.',
    fullDescription: 'SnackOverflow team has developed an innovative AI solution focused on automating various healthcare processes. The platform uses machine learning to streamline administrative tasks, optimize resource allocation, and enhance patient experience through intelligent automation.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 17,
    name: 'NeoMed',
    team: 'PromptOps',
    iiit: 'IIIT Una',
    description: 'A next-generation AI-powered medical assistant platform.',
    fullDescription: 'NeoMed is a cutting-edge AI-powered medical assistant platform that revolutionizes patient care through intelligent automation and personalized healthcare recommendations. The system uses advanced natural language processing and machine learning to understand patient symptoms, provide preliminary assessments, and guide users to appropriate care. NeoMed also assists healthcare providers by analyzing patient data and suggesting evidence-based treatment options.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [
      'AI symptom checker',
      'Personalized health recommendations',
      'Virtual health assistant',
      'Appointment scheduling automation',
      'Medication reminders and tracking'
    ],
    techStack: ['GPT-4', 'Python', 'Flutter', 'Firebase', 'Docker'],
    challenges: 'Ensuring medical accuracy while maintaining user-friendly conversational interface.',
    impact: 'Improving healthcare accessibility for 100,000+ users and reducing unnecessary ER visits by 30%.'
  },
  {
    id: 18,
    name: 'SecureEdge',
    team: 'Techtonics_IIITA',
    iiit: 'IIIT Agartala',
    description: 'An edge computing-based cybersecurity solution for IoT healthcare devices.',
    fullDescription: 'SecureEdge is an innovative cybersecurity platform designed specifically for IoT healthcare devices using edge computing technology. The system provides real-time threat detection and prevention at the network edge, protecting sensitive medical devices and patient data from cyber attacks. By processing security operations locally, SecureEdge ensures low latency and high reliability, critical for life-saving medical equipment.',
    domain: 'Cybersecurity',
    github: '',
    demo: '',
    image: null,
    features: [
      'Edge-based threat detection',
      'Real-time IoT device monitoring',
      'Automated security patching',
      'Anomaly detection using AI',
      'Zero-trust architecture'
    ],
    techStack: ['Python', 'TensorFlow', 'Docker', 'Kubernetes', 'Rust'],
    challenges: 'Balancing security measures with device performance constraints in resource-limited IoT environments.',
    impact: 'Protecting 10,000+ medical IoT devices and preventing 99.9% of attempted cyber attacks.'
  },
  {
    id: 19,
    name: 'Problem Statement: 2',
    team: 'Block E-state',
    iiit: 'IIIT Delhi',
    description: 'A blockchain-based real estate transaction platform.',
    fullDescription: 'Block E-state is a comprehensive blockchain platform that transforms real estate transactions through decentralization and transparency. The system enables peer-to-peer property transactions, eliminates intermediaries, and uses smart contracts to automate the entire buying and selling process. With features like fractional ownership and instant settlement, Block E-state makes real estate investment more accessible and efficient.',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 20,
    name: 'Problem Statement: 1',
    team: 'Swarnprasth Super',
    iiit: 'IIIT Sonepat',
    description: 'An AI-based healthcare management solution.',
    fullDescription: 'Swarnprasth Super team has developed an advanced AI-based healthcare management solution that integrates various aspects of patient care. The platform uses machine learning to optimize hospital operations, predict patient needs, and improve overall healthcare delivery efficiency.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [],
    techStack: [],
    challenges: '',
    impact: ''
  },
  {
    id: 21,
    name: 'Medora',
    team: 'Neuronix',
    iiit: 'IIIT Nagpur',
    description: 'An AI-powered platform for medical diagnostics and patient monitoring.',
    fullDescription: 'Medora is a sophisticated AI-powered platform that combines medical diagnostics with continuous patient monitoring. Using deep learning and computer vision, Medora analyzes medical images, vital signs, and patient data to provide early disease detection and real-time health monitoring. The platform alerts healthcare providers to critical changes in patient conditions, enabling proactive interventions and personalized care plans.',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
    features: [
      'AI-powered disease detection',
      'Real-time patient monitoring',
      'Predictive health analytics',
      'Wearable device integration',
      'Automated alert system'
    ],
    techStack: ['TensorFlow', 'Keras', 'React', 'Node.js', 'InfluxDB'],
    challenges: 'Achieving high accuracy across diverse patient populations and integrating with multiple device types.',
    impact: 'Enabling early disease detection with 90% accuracy and reducing hospital readmissions by 25%.'
  },
  {
    id: 22,
    name: 'TitleVault',
    team: 'Zodiac Z408',
    iiit: 'IIIT Vadodara',
    description: 'A blockchain-based secure title management and verification system.',
    fullDescription: 'TitleVault is a revolutionary blockchain platform for secure title management and verification of property ownership. The system creates an immutable record of all property titles, preventing fraud and ensuring instant verification of ownership. Using advanced cryptography and smart contracts, TitleVault automates title transfers, eliminates paperwork, and provides a single source of truth for property ownership information.',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
    features: [
      'Blockchain-based title storage',
      'Instant title verification',
      'Smart contract transfers',
      'Historical ownership tracking',
      'Integration with legal systems'
    ],
    techStack: ['Ethereum', 'Solidity', 'IPFS', 'React', 'Express.js'],
    challenges: 'Migrating legacy title records to blockchain while maintaining legal validity.',
    impact: 'Eliminating title fraud and reducing property transfer time from weeks to hours.'
  },
];

export const domainColors: Record<string, string> = {
  'AI/ML': 'bg-primary/20 text-primary',
  'Blockchain': 'bg-secondary/20 text-secondary',
  'Cybersecurity': 'bg-accent/20 text-accent',
};

/**
 * Convert Supabase project data to local Project format
 */
export function convertSupabaseToProject(data: FullProjectData, index: number): Project {
  return {
    id: index + 1,
    name: data.project.project_name,
    team: data.team.team_name,
    iiit: data.team.iiit,
    description: data.project.description,
    domain: data.project.domain,
    github: data.project.github_url || '',
    demo: data.project.demo_url || '',
    image: null,
    techStack: data.project.tech_stack || [],
    userId: data.project.user_id,
    teamMembers: [
      {
        name: data.teamLeader.name,
        email: data.teamLeader.email,
        role: 'Team Leader',
      },
      ...data.teamMembers.map((member) => ({
        name: member.name,
        email: member.email,
        role: 'Member',
      })),
    ],
  };
}

/**
 * Merge Supabase data with local fallback data
 * Returns Supabase data if available, otherwise returns local data
 */
export function mergeProjectData(supabaseProjects: FullProjectData[]): Project[] {
  if (supabaseProjects.length > 0) {
    return supabaseProjects.map((data, index) => convertSupabaseToProject(data, index));
  }
  return projects;
}
