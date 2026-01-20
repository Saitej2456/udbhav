import { motion } from 'framer-motion';
import { Users, Edit2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Team } from '@/data/teams';

interface TeamInfoCardProps {
  teamData: Team;
  isTeamLeader: boolean;
  onEdit: () => void;
}

const TeamInfoCard = ({ teamData, isTeamLeader, onEdit }: TeamInfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <GlassCard glow="primary">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Team Info
          </h2>
          {isTeamLeader && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Team Name</p>
            <p className="font-semibold text-lg">{teamData?.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">IIIT</p>
            <p className="font-semibold">{teamData?.iiit}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Team Representative</p>
            <p className="font-semibold">{teamData?.representative}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TeamInfoCard;
