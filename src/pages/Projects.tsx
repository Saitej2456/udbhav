import { motion } from 'framer-motion';
import { AlertCircle, ExternalLink, Github, Play, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading'; 
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { projects, domainColors } from '@/data/projects';

const rules = [
  "The full details of your respective projects will be reflected once Round 3 ends.",
  "The name of your respective project will be reflected only if you have shared the project name with the organizing team.",
  "If there are any queries regarding the project information, please contact your respective PICs.",
];

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
              Innovative solutions built by India's brightest minds during
              UDBHAV
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <GlassCard className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-warning shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-3">
                    Project Details Note
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {rules.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary font-mono">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
          >
            {[
              { label: "Total Projects", value: projects.length },
              { label: "Domains", value: 3 },
              { label: "Teams", value: projects.length },
            ].map((stat) => (
              <GlassCard key={stat.label} className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
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
                <Link to={`/projects/${project.id}`}>
                  <GlassCard
                    className="h-full flex flex-col group cursor-pointer"
                    glow="primary"
                  >
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          domainColors[project.domain]
                        }`}
                      >
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
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    )}

                    {project.demo ? (
                      <Button
                        asChild
                        variant="glow"
                        size="sm"
                        className="flex-1"
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    ) : (
                      <Button
                        variant="glow"
                        size="sm"
                        className="flex-1 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </Button>
                    )}
                  </div>
                </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;