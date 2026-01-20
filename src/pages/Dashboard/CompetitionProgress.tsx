import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Team } from '@/data/teams';

interface CompetitionProgressProps {
  teamData: Team;
}

const CompetitionProgress = ({ teamData }: CompetitionProgressProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Competition Progress
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-3xl font-bold text-success mb-1">#{teamData?.rank || '-'}</p>
            <p className="text-xs text-muted-foreground">Current Rank</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-3xl font-bold text-primary mb-1">{teamData?.members?.length || 0}</p>
            <p className="text-xs text-muted-foreground">Team Members</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <p className="text-3xl font-bold text-secondary mb-1">-</p>
            <p className="text-xs text-muted-foreground">Rounds Cleared</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default CompetitionProgress;
