import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Award, Loader2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { fetchAllProjects, type FullProjectData } from '@/lib/projectService';
import { mergeProjectData, type Project } from '@/data/projects';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { domainColors } from '@/data/projects';

const ProjectsWithTeams = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingSupabase, setUsingSupabase] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      // Try to fetch from Supabase
      const supabaseData = await fetchAllProjects();
      
      if (supabaseData.length > 0) {
        // Use Supabase data
        const mergedData = mergeProjectData(supabaseData);
        setProjects(mergedData);
        setUsingSupabase(true);
      } else {
        // Fallback to local data
        const { projects: localProjects } = await import('@/data/projects');
        setProjects(localProjects);
        setUsingSupabase(false);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to local data on error
      const { projects: localProjects } = await import('@/data/projects');
      setProjects(localProjects);
      setUsingSupabase(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Projects with Team Details</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              View all projects with complete team information
            </p>
            {usingSupabase && (
              <p className="text-sm text-green-500">
                ✓ Loading data from Supabase
              </p>
            )}
            {!usingSupabase && (
              <p className="text-sm text-yellow-500">
                ⚠ Using local fallback data (Supabase data not available)
              </p>
            )}
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
                <GlassCard className="h-full flex flex-col">
                  {/* Domain Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        domainColors[project.domain]
                      }`}
                    >
                      {project.domain}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description || 'Description coming soon...'}
                  </p>

                  {/* Team Info */}
                  <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Team: {project.team}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {project.iiit}
                    </div>
                  </div>

                  {/* Team Members */}
                  {project.teamMembers && project.teamMembers.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2">Team Members:</div>
                      <div className="space-y-2">
                        {project.teamMembers.slice(0, 3).map((member, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-2 rounded bg-card/50 border border-border/50"
                          >
                            <div className="font-medium">{member.name}</div>
                            <div className="text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </div>
                            <div className="text-xs text-primary">{member.role}</div>
                          </div>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center">
                            +{project.teamMembers.length - 3} more members
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-2">Tech Stack:</div>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded bg-secondary/20 text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-xs px-2 py-1 text-muted-foreground">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to={`/projects/${project.id}`}>
                        View Full Details
                      </Link>
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Reload Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button onClick={loadProjects} variant="outline" className="gap-2">
              <Loader2 className="w-4 h-4" />
              Reload Projects
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectsWithTeams;
