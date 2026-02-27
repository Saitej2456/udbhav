import { motion } from 'framer-motion';
import { Mail, Phone, UserX, UserCheck, UserPlus } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Team } from '@/data/teams';

interface TeamMembersCardProps {
  teamData: Team;
  isTeamLeader: boolean;
  onRemoveMember: (memberEmail: string, memberName: string) => void;
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
            teamData.members.map((member: any) => {
              const hasJoined = member.hasAccount && member.isActive;
              const isLeader = member.role === 'leader';
              
              return (
                <div key={member.email} className="p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-semibold">{member.name}</p>
                        {isLeader && (
                          <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary flex items-center gap-1">
                            <UserCheck className="w-3 h-3" />
                            Leader
                          </span>
                        )}
                        {!isLeader && hasJoined && (
                          <span className="px-2 py-0.5 rounded text-xs bg-success/20 text-success flex items-center gap-1">
                            <UserCheck className="w-3 h-3" />
                            Joined
                          </span>
                        )}
                        {!isLeader && !hasJoined && (
                          <span className="px-2 py-0.5 rounded text-xs bg-muted-foreground/20 text-muted-foreground flex items-center gap-1">
                            <UserPlus className="w-3 h-3" />
                            Not Joined
                          </span>
                        )}
                      </div>
                      {member.batch && <p className="text-sm text-muted-foreground">Batch {member.batch}</p>}
                      <div className="mt-2 space-y-1 text-sm">
                        {member.email && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{member.email}</span>
                          </div>
                        )}
                        {member.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {isTeamLeader && !isLeader && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemoveMember(member.email, member.name)}
                        disabled={!hasJoined}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={hasJoined ? 'Remove member' : 'Member must join first'}
                      >
                        <UserX className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
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
