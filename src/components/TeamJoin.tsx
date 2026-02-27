import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Key, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/GlassCard';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { teamsData } from '@/data/teams';

const TeamJoin = () => {
    const [teamCode, setTeamCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user, profile, refreshProfile } = useAuth();

    const handleJoinTeam = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!teamCode.trim()) {
            toast({
                title: 'Team code required',
                description: 'Please enter the team code provided by your team leader.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);

        try {
            // Find team leader with this code
            const { data: teamLeader, error: teamError } = await supabase
                .from('user_profiles')
                .select('id, team_id, name, email')
                .eq('team_code', teamCode.trim())
                .eq('role', 'team_leader')
                .single();

            if (teamError || !teamLeader) {
                toast({
                    title: 'Invalid team code',
                    description: 'No team found with this code. Please check and try again.',
                    variant: 'destructive',
                });
                setLoading(false);
                return;
            }

            // Find the team in teams.ts by leader's email
            const teamInfo = teamsData.find(t => 
                t.representativeEmail.toLowerCase() === teamLeader.email.toLowerCase()
            );

            // Check if user is trying to join as the team leader
            if (profile?.email?.toLowerCase() === teamLeader.email.toLowerCase()) {
                toast({
                    title: 'Already a leader',
                    description: 'You are registered as the team leader. You cannot join your own team.',
                    variant: 'destructive',
                });
                setLoading(false);
                return;
            }

            // Allow any email with valid team code to join (leader will approve/reject)

            // Update current user's profile to request to join team (pending approval)
            const { error: updateError } = await supabase
                .from('user_profiles')
                .update({
                    team_id: teamLeader.team_id || teamLeader.id,
                    has_joined_team: false, // Set to false for pending approval
                })
                .eq('id', user?.id);

            if (updateError) {
                toast({
                    title: 'Failed to join team',
                    description: updateError.message,
                    variant: 'destructive',
                });
                setLoading(false);
                return;
            }

            toast({
                title: 'Join request sent!',
                description: `Your request to join ${teamInfo.name} has been sent to the team leader for approval.`,
            });

            // Refresh profile to update context
            await refreshProfile();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An unexpected error occurred. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <GlassCard className="space-y-6" glow="primary">
                    <div className="text-center space-y-2">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4"
                        >
                            <Users className="w-8 h-8 text-background" />
                        </motion.div>
                        <h1 className="text-3xl font-bold gradient-text">
                            Join Your Team
                        </h1>
                        <p className="text-muted-foreground">
                            Enter the team code provided by your team leader
                        </p>
                    </div>

                    <form onSubmit={handleJoinTeam} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="teamCode" className="text-foreground">
                                Team Code
                            </Label>
                            <div className="relative">
                                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    id="teamCode"
                                    type="text"
                                    placeholder="Enter team code"
                                    value={teamCode}
                                    onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                                    required
                                    className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors uppercase"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                This code is unique to your team and provided by your team leader
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full crt-button bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow-primary transition-all duration-300"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Joining team...
                                </>
                            ) : (
                                <>
                                    <Users className="w-4 h-4 mr-2" />
                                    Join Team
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="pt-4 border-t border-border/50">
                        <div className="text-sm text-muted-foreground space-y-2">
                            <p className="font-semibold text-foreground">Need help?</p>
                            <ul className="space-y-1 text-xs">
                                <li>• Contact your team leader for the team code</li>
                                <li>• Make sure you're entering the code correctly</li>
                                <li>• Team codes are case-insensitive</li>
                            </ul>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default TeamJoin;
