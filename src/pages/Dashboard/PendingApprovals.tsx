import { motion } from 'framer-motion';
import { Bell, UserCheck, UserX } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

interface PendingApprovalsProps {
  pendingMembers: any[];
  onApprove: (memberId: string, memberName: string) => void;
  onReject: (memberId: string) => void;
}

const PendingApprovals = ({ pendingMembers, onApprove, onReject }: PendingApprovalsProps) => {
  if (pendingMembers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-8"
    >
      <GlassCard glow="secondary">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-warning" />
          Pending Member Requests ({pendingMembers.length})
        </h3>
        <div className="space-y-3">
          {pendingMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onApprove(member.id, member.name)}
                  className="bg-success hover:bg-success/80"
                >
                  <UserCheck className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onReject(member.id)}
                >
                  <UserX className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default PendingApprovals;
