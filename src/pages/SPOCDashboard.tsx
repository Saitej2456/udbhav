import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { teamsData } from '@/data/teams';
import { getIIITFromEmail } from '@/data/iiitDomainMapping';
import { iiitsData } from '@/data/iiits';

const SPOCDashboard = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<any[]>([]);
  const myIIIT = getIIITFromEmail(profile?.email || '');
  const myIIITData = iiitsData.find(i => i.id === myIIIT);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    setLoading(true);
    
    // Filter teams to show only those from the SPOC's IIIT
    const myIIITTeams = teamsData.filter(team => {
      // Match team's IIIT with SPOC's IIIT
      return myIIITData && team.iiit.toLowerCase().includes(myIIITData.name.toLowerCase().split(' ').slice(1).join(' '));
    });

    // Get team leaders from the SPOC's IIIT only
    const teamLeaders = myIIITTeams.map(t => t.representativeEmail);
    
    const { data: profiles } = await supabase
      .from('user_profiles')
      .select('*')
      .in('email', teamLeaders);

    // Merge with teams data
    const mergedTeams = myIIITTeams.map(team => {
      const leaderProfile = profiles?.find(
        p => p.email.toLowerCase() === team.representativeEmail.toLowerCase()
      );
      return {
        ...team,
        leaderProfile,
      };
    });

    setTeams(mergedTeams);
    setLoading(false);
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading SPOC dashboard...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">SPOC Dashboard</span>
              </h1>
            </div>
            <p className="text-muted-foreground">Welcome, {profile?.name}</p>
            {myIIITData && (
              <p className="text-sm text-muted-foreground mt-1">
                {myIIITData.name} • {myIIITData.location}
              </p>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <GlassCard glow="primary">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                {myIIIT && (
                  <Button asChild variant="neon">
                    <Link to={`/iiits/${myIIIT}`}>
                      Edit My IIIT
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link to="/iiits">
                    View All IIITs
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/teams">
                    View Teams Page
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Teams Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              {myIIITData?.name} Teams (Read-Only View)
            </h2>
            {teams.length === 0 ? (
              <GlassCard>
                <p className="text-muted-foreground text-center py-8">
                  No teams registered from {myIIITData?.name} yet.
                </p>
              </GlassCard>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">{team.iiit}</p>
                      </div>
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                        Rank #{team.rank}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Leader</p>
                        <p className="font-semibold">{team.representative}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Project</p>
                        <p className="font-semibold">{team.project.name}</p>
                        <p className="text-xs text-muted-foreground">{team.project.domain}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Members</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{team.members.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View-only access
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SPOCDashboard;
