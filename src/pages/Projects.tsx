import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Users } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading'; 
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    name: 'Bhumi',
    team: 'DAOMINATORS',
    iiit: 'IIIT Allahabad',
    description: '',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 2,
    name: 'Problem Statement: 1',
    team: 'Bancode',
    iiit: 'IIIT Bhubaneswar',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 3,
    name: 'GenAI-Powered Clinical Note Summarization and Hypothesis Generation',
    team: 'Nocturnal_Code',
    iiit: 'IIIT Kurnool',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 4,
    name: 'Problem Statement: 1',
    team: 'SINISTER-6',
    iiit: 'IIIT Dharwad',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 5,
    name: 'E-parchi',
    team: 'Kaizen',
    iiit: 'IIIT Manipur',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 6,
    name: 'Med-Insight-AI',
    team: 'Zero-Deadlock',
    iiit: 'IIIT Raichur',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 7,
    name: 'Problem Statement: 1',
    team: 'KanyaRaasi',
    iiit: 'IIIT Kottayam',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 8,
    name: 'Problem Statement: 2',
    team: "Bohar's Bit",
    iiit: 'IIIT Sri City',
    description: '',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 9,
    name: 'Divflow',
    team: 'DivFlow',
    iiit: 'IIIT Vadodara-ICD',
    description: '',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 10,
    name: 'Problem Statement: 1',
    team: 'HackSmith',
    iiit: 'IIIT Kota',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 11,
    name: 'NodeHealth',
    team: 'Team notFound',
    iiit: 'IIIT Bhagalpur',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 12,
    name: 'Problem Statement: 1',
    team: 'CBOW',
    iiit: 'IIIT Naya Raipur',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 13,
    name: 'Problem Statement: 1',
    team: 'The Hawkings',
    iiit: 'IIIT Tiruchirappalli',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 14,
    name: 'Problem Statement: 1',
    team: '404 Found',
    iiit: 'IIIT Bhopal',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 15,
    name: 'LandTrust',
    team: 'DBDT',
    iiit: 'IIIT Surat',
    description: '',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 16,
    name: 'Problem Statement: 1',
    team: 'SnackOverflow',
    iiit: 'IIIT Kancheepuram',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 17,
    name: 'NeoMed',
    team: 'PromptOps',
    iiit: 'IIIT Una',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 18,
    name: 'SecureEdge',
    team: 'Techtonics_IIITA',
    iiit: 'IIIT Agartala',
    description: '',
    domain: 'Cybersecurity',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 19,
    name: 'Problem Statement: 2',
    team: 'Block E-state',
    iiit: 'IIIT Delhi',
    description: '',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 20,
    name: 'Problem Statement: 1',
    team: 'Swarnprasth Super',
    iiit: 'IIIT Sonepat',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 21,
    name: 'Medora',
    team: 'Neuronix',
    iiit: 'IIIT Nagpur',
    description: '',
    domain: 'AI/ML',
    github: '',
    demo: '',
    image: null,
  },
  {
    id: 22,
    name: 'TitleVault',
    team: 'Zodiac Z408',
    iiit: 'IIIT Vadodara',
    description: '',
    domain: 'Blockchain',
    github: '',
    demo: '',
    image: null,
  },
];

const domainColors: Record<string, string> = {
  'AI/ML': 'bg-primary/20 text-primary',
  'Blockchain': 'bg-secondary/20 text-secondary',
  'Cybersecurity': 'bg-accent/20 text-accent',
};

const Projects = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative solutions built by India's brightest minds during UDBHAV
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
          >
            {[
              { label: 'Total Projects', value: projects.length },
              { label: 'Domains', value: 3 },
              { label: 'Teams', value: projects.length },
            ].map((stat) => (
              <GlassCard key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col group" glow="primary">
                  {/* Image Placeholder */}
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 mb-4 overflow-hidden relative group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-card/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Play className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="absolute inset-0 grid-overlay opacity-30" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${domainColors[project.domain]}`}>
                        {project.domain}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    {/* Description is currently empty, but space is preserved */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 min-h-[1.25rem]">
                      {project.description || "Description coming soon..."}
                    </p>
                  </div>

                  {/* Team Info */}
                  <div className="flex items-center gap-2 py-3 border-t border-border/50 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-medium truncate">{project.team}</span>
                    <span>•</span>
                    <span className="truncate">{project.iiit}</span>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-3 border-t border-border/50">
                    {project.github ? (
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 opacity-50 cursor-not-allowed" disabled>
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    )}
                    
                    {project.demo ? (
                      <Button asChild variant="glow" size="sm" className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    ) : (
                      <Button variant="glow" size="sm" className="flex-1 opacity-50 cursor-not-allowed" disabled>
                         <ExternalLink className="w-4 h-4 mr-1" />
                         Demo
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;