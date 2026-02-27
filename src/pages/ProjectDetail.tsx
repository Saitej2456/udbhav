import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Users,
  Lightbulb,
  Target,
  Code2,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Brain,
  Lock,
  LinkIcon
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { projects, domainColors } from '@/data/projects';
import { Badge } from '@/components/ui/badge';

// Domain-specific visual configurations
const domainVisuals: Record<string, { gradient: string; icon: typeof Brain }> = {
  'AI/ML': { 
    gradient: 'from-purple-500/20 via-blue-500/20 to-cyan-500/20', 
    icon: Brain 
  },
  'Blockchain': { 
    gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20', 
    icon: LinkIcon 
  },
  'Cybersecurity': { 
    gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20', 
    icon: Lock 
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const DomainIcon = domainVisuals[project.domain]?.icon || Brain;
  const gradientClass = domainVisuals[project.domain]?.gradient || 'from-primary/10 to-accent/10';

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button asChild variant="ghost" className="gap-2">
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </Button>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <GlassCard className="overflow-hidden">
              {/* Enhanced Project Image with Domain-specific Gradient */}
              <div className={`aspect-video w-full bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  <div className="absolute inset-0 grid-overlay" />
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div 
                      className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <DomainIcon className="w-16 h-16 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
                    <p className="text-sm text-muted-foreground">#{String(project.id).padStart(2, '0')} - {project.domain} Solution</p>
                  </div>
                </div>
                
                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
              </div>

              {/* Project Header */}
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      domainColors[project.domain]
                    }`}
                  >
                    {project.domain}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{project.team}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{project.iiit}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                  {project.name}
                </h1>

                <p className="text-lg text-muted-foreground mb-6">
                  {project.description || 'An innovative solution developed during UDBHAV'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.github ? (
                    <Button asChild variant="outline" size="lg">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <Github className="w-5 h-5" />
                        View Code
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" size="lg" disabled className="gap-2">
                      <Github className="w-5 h-5" />
                      Code Coming Soon
                    </Button>
                  )}

                  {project.demo ? (
                    <Button asChild variant="glow" size="lg">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gap-2"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    </Button>
                  ) : (
                    <Button variant="glow" size="lg" disabled className="gap-2">
                      <ExternalLink className="w-5 h-5" />
                      Demo Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Full Description */}
          {project.fullDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <GlassCard>
                <div className="flex items-start gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-3">About the Project</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <GlassCard>
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <GlassCard>
                <div className="flex items-start gap-3 mb-4">
                  <Code2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm px-3 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Two Column Layout for Challenges and Impact */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Challenges */}
            {project.challenges && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-warning shrink-0 mt-1" />
                    <div>
                      <h2 className="text-xl font-bold mb-3">Challenges</h2>
                      <p className="text-muted-foreground">{project.challenges}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Impact */}
            {project.impact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h2 className="text-xl font-bold mb-3">Impact</h2>
                      <p className="text-muted-foreground">{project.impact}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Team Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard>
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">Team Information</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Team Name</div>
                      <div className="font-semibold">{project.team}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Institute</div>
                      <div className="font-semibold">{project.iiit}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Domain</div>
                      <div className="font-semibold">{project.domain}</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex justify-between items-center mt-12 pt-8 border-t border-border/50"
          >
            {project.id > 1 ? (
              <Button asChild variant="outline">
                <Link to={`/projects/${project.id - 1}`} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Previous Project
                </Link>
              </Button>
            ) : (
              <div />
            )}

            {project.id < projects.length ? (
              <Button asChild variant="outline">
                <Link to={`/projects/${project.id + 1}`} className="gap-2">
                  Next Project
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
