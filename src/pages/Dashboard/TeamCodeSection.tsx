import { motion } from 'framer-motion';
import { Key, Copy, Check } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

interface TeamCodeSectionProps {
  teamCode: string;
  copied: boolean;
  onCopy: () => void;
}

const TeamCodeSection = ({ teamCode, copied, onCopy }: TeamCodeSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <GlassCard glow="secondary">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Key className="w-5 h-5 text-secondary" />
              Your Team Code
            </h3>
            <p className="text-sm text-muted-foreground">
              Share this code with your team members to let them join
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/50 font-mono text-xl font-bold text-secondary">
              {teamCode}
            </div>
            <Button
              onClick={onCopy}
              variant="outline"
              size="icon"
              className="hover:bg-secondary/20"
            >
              {copied ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TeamCodeSection;
