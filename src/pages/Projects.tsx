import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Users } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

const projects = [
  {
    id: 1,
    name: 'AI-Powered Healthcare Platform',
    team: 'TechTitans',
    iiit: 'IIIT Sonepat',
    description: 'An intelligent healthcare platform that uses machine learning to predict diseases, recommend treatments, and connect patients with specialists.',
    domain: 'AI/ML',
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: null,
  },
  {
    id: 2,
    name: 'Decentralized Identity System',
    team: 'CodeBreakers',
    iiit: 'IIIT Hyderabad',
    description: 'A blockchain-based identity verification system that gives users complete control over their personal data while ensuring security and privacy.',
    domain: 'Blockchain',
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: null,
  },
  {
    id: 3,
    name: 'Secure Voting Blockchain',
    team: 'CryptoKnights',
    iiit: 'IIIT Guwahati',
    description: 'A tamper-proof electronic voting system built on blockchain technology, ensuring transparent and secure elections.',
    domain: 'Blockchain',
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: null,
  },
  {
    id: 4,
    name: 'Smart City Traffic Management',
    team: 'ByteForce',
    iiit: 'IIIT Delhi',
    description: 'An AI-driven traffic management system that optimizes signal timing, predicts congestion, and provides real-time routing.',
    domain: 'AI/ML',
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: null,
  },
  {
    id: 5,
    name: 'Quantum-Safe Encryption',
    team: 'QuantumLeap',
    iiit: 'IIIT Vadodara',
    description: 'A post-quantum cryptography library that protects data against future quantum computing threats.',
    domain: 'Cybersecurity',
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: null,
  },
  {
    id: 6,
    name: 'NLP-Based Legal Assistant',
    team: 'NeuralNinjas',
    iiit: 'IIIT Bangalore',
    description: 'An AI-powered legal assistant that analyzes documents, provides case law references, and helps draft legal documents.',
    domain: 'AI/ML',
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: null,
  },
  {
    id: 7,
    name: 'Threat Detection System',
    team: 'SecureShield',
    iiit: 'IIIT Kottayam',
    description: 'Real-time cybersecurity threat detection using machine learning to identify and neutralize attacks.',
    domain: 'Cybersecurity',
    github: 'https://github.com',
    demo: null,
    image: null,
  },
  {
    id: 8,
    name: 'Edge Computing Framework',
    team: 'CloudChasers',
    iiit: 'IIIT Nagpur',
    description: 'A lightweight framework for deploying AI models on edge devices with minimal latency.',
    domain: 'AI/ML',
    github: 'https://github.com',
    demo: 'https://demo.com',
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
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Team Info */}
                  <div className="flex items-center gap-2 py-3 border-t border-border/50 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{project.team}</span>
                    <span>•</span>
                    <span>{project.iiit}</span>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-3 border-t border-border/50">
                    {project.github && (
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button asChild variant="glow" size="sm" className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
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
