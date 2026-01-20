import { motion } from 'framer-motion';
import { Clock, Users, Mail } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import PageTransition from '@/components/PageTransition';

interface PendingApprovalProps {
    teamLeaderName?: string;
}

const PendingApproval = ({ teamLeaderName }: PendingApprovalProps) => {
    return (
        <PageTransition>
            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <GlassCard className="space-y-6" glow="primary">
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    delay: 0.2, 
                                    type: 'spring', 
                                    stiffness: 200,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    repeatDelay: 1
                                }}
                                className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center mb-4"
                            >
                                <Clock className="w-8 h-8 text-background" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-warning">
                                Pending Approval
                            </h1>
                            <p className="text-muted-foreground">
                                Your request to join the team has been sent to the team leader
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-warning mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-foreground mb-1">Waiting for Team Leader</p>
                                        <p className="text-sm text-muted-foreground">
                                            {teamLeaderName || 'The team leader'} needs to approve your request before you can access the team dashboard.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                                <p className="text-sm font-semibold text-foreground mb-3">What happens next?</p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>The team leader will review your request</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>Once approved, you'll have full access to the team dashboard</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>You'll be able to view team info, project details, and leaderboard</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-foreground mb-1">Need Help?</p>
                                        <p className="text-sm text-muted-foreground">
                                            Contact your team leader if you've been waiting for a while or if you think there's an issue with your request.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border/50 text-center">
                            <p className="text-xs text-muted-foreground">
                                This page will automatically update once you're approved
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default PendingApproval;
