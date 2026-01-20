import { motion } from 'framer-motion';
import { Edit2, Github, ExternalLink } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Team } from '@/data/teams';

interface ProjectDetailsCardProps {
  teamData: Team;
  isTeamLeader: boolean;
  onEdit: () => void;
}

const ProjectDetailsCard = ({ teamData, isTeamLeader, onEdit }: ProjectDetailsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
    >
      <GlassCard glow="accent">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Project Details</h2>
          {isTeamLeader && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold gradient-text">{teamData?.project?.name}</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                {teamData?.project?.domain}
              </span>
            </div>
            <p className="text-muted-foreground">{teamData?.project?.description}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {teamData?.project?.techStack?.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-card border border-border text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {(teamData?.project?.github || teamData?.project?.demo) && (
            <div className="flex gap-3 pt-4 border-t border-border">
              {teamData?.project?.github && (
                <Button asChild variant="neon">
                  <a href={teamData.project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
              {teamData?.project?.demo && (
                <Button asChild variant="cyber">
                  <a href={teamData.project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProjectDetailsCard;
