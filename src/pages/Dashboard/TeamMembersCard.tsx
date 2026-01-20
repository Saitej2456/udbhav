import { motion } from 'framer-motion';
import { Mail, Phone, UserX } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Team } from '@/data/teams';

interface TeamMembersCardProps {
  teamData: Team;
  isTeamLeader: boolean;
  onRemoveMember: (memberEmail: string) => void;
}

const TeamMembersCard = ({ teamData, isTeamLeader, onRemoveMember }: TeamMembersCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard>
        <h2 className="text-xl font-bold mb-6">Team Members</h2>
        <div className="space-y-4">
          {teamData?.members?.length > 0 ? (
            teamData.members.map((member: any) => (
              <div key={member.email} className="p-4 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{member.name}</p>
                      {member.role === 'leader' && (
                        <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">
                          Lead
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Batch {member.batch}</p>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                    </div>
                  </div>
                  {isTeamLeader && member.role !== 'leader' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveMember(member.email)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <UserX className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No team members yet
            </p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TeamMembersCard;
