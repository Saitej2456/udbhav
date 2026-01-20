import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Edit2, Bell, Trophy, Mail, Phone, Calendar, ExternalLink, Github, Copy, Check, Key, UserCheck, UserX, Loader2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import TeamJoin from '@/components/TeamJoin';
import PendingApproval from '@/components/PendingApproval';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { teamsData, Team } from '@/data/teams';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const announcements = [
  { id: 1, title: 'Grand Finale Schedule Released', date: '2024-03-15', type: 'info' },
  { id: 2, title: 'Project Submission Deadline Extended', date: '2024-03-10', type: 'warning' },
  { id: 3, title: 'Congratulations on Qualifying to Finals!', date: '2024-03-05', type: 'success' },
  { id: 4, title: 'Round 2 Results Announced', date: '2024-03-01', type: 'info' },
];

const Dashboard = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [teamCode, setTeamCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [removingMember, setRemovingMember] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      loadTeamData();
    }
  }, [profile]);

  const loadTeamData = async () => {
    setLoading(true);
    
    // Check if user is a team leader (by representative email match)
    const leaderTeam = teamsData.find(t => 
      t.representativeEmail.toLowerCase() === profile?.email?.toLowerCase()
    );

    if (leaderTeam) {
      // User is a team leader - full access
      // Fetch actual team members from database who have joined
      const { data: dbMembers } = await supabase
        .from('user_profiles')
        .select('*')
        .or(`id.eq.${user?.id},team_id.eq.${user?.id}`)
        .eq('has_joined_team', true);

      // Merge database members with static team data
      const mergedTeam = {
        ...leaderTeam,
        members: leaderTeam.members.map(staticMember => {
          // Check if this member has an actual database account
          const dbMember = dbMembers?.find(db => db.email.toLowerCase() === staticMember.email.toLowerCase());
          return {
            ...staticMember,
            hasAccount: !!dbMember,
            isActive: !!dbMember
          };
        }).filter(m => m.email === profile?.email || m.hasAccount) // Show leader + active members
      };

      setTeamData(mergedTeam);
      await ensureTeamCode();
      await loadPendingMembers();
    } else if (profile?.has_joined_team && profile?.team_id) {
      // User is an approved member - find their team leader's data
      const { data: leaderProfile } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('id', profile.team_id)
        .single();

      if (leaderProfile) {
        const memberTeam = teamsData.find(t =>
          t.representativeEmail.toLowerCase() === leaderProfile.email.toLowerCase()
        );
        
        if (memberTeam) {
          setTeamData(memberTeam);
        }
      }
    }
    
    setLoading(false);
  };

  const ensureTeamCode = async () => {
    if (profile?.team_code) {
      setTeamCode(profile.team_code);
    } else {
      // Generate a unique 8-character code
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ team_code: code })
        .eq('id', user?.id);

      if (!error) {
        setTeamCode(code);
        await refreshProfile();
      }
    }
  };

  const loadPendingMembers = async () => {
    // Fetch members who have joined via code but are pending approval
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('team_id', user?.id)
      .eq('has_joined_team', false);

    setPendingMembers(data || []);
  };

  const approveMember = async (memberId: string, memberName: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ has_joined_team: true })
      .eq('id', memberId);

    if (error) {
      toast({
        title: 'Failed to approve member',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Member approved!',
        description: `${memberName} can now access the team dashboard.`,
      });
      // Reload team data to show the new member
      await loadTeamData();
    }
  };

  const removeMember = async (memberEmail: string, memberName: string) => {
    // First, find the user ID from the email
    const { data: userData, error: lookupError } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', memberEmail)
      .single();

    if (lookupError || !userData) {
      toast({
        title: 'Failed to remove member',
        description: 'Could not find user in database. They may not have signed up yet.',
        variant: 'destructive',
      });
      setRemovingMember(null);
      return;
    }

    const { error } = await supabase
      .from('user_profiles')
      .update({ 
        team_id: null, 
        has_joined_team: false 
      })
      .eq('id', userData.id);

    if (error) {
      toast({
        title: 'Failed to remove member',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Member removed',
        description: `${memberName} has been removed from the team.`,
      });
      setRemovingMember(null);
      // Reload team data to reflect changes
      await loadTeamData();
    }
  };

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCode);
    setCopied(true);
    toast({
      title: 'Team code copied!',
      description: 'Share this code with your team members.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if user is a team leader (by email match in teams data)
  const isTeamLeader = teamsData.some(t => 
    t.representativeEmail.toLowerCase() === profile?.email?.toLowerCase()
  );

  // If user is not a team leader and hasn't properly joined a team, show TeamJoin
  if (!isTeamLeader && (!profile?.has_joined_team || !profile?.team_id)) {
    return (
      <PageTransition>
        <TeamJoin />
      </PageTransition>
    );
  }

  // If user has requested to join but is pending approval
  if (!isTeamLeader && profile?.team_id && !profile?.has_joined_team) {
    return <PendingApproval />;
  }

  // If user should have data but doesn't, show loading or TeamJoin
  if (!loading && !teamData && !isTeamLeader) {
    return (
      <PageTransition>
        <TeamJoin />
      </PageTransition>
    );
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="gradient-text">Team Dashboard</span>
                </h1>
                <p className="text-muted-foreground">Welcome back, {profile?.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/20 text-success">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Rank #{teamData?.rank || '-'}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {teamData?.status || 'Active'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Team Leader Code Section */}
          {isTeamLeader && teamCode && (
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
                      onClick={copyTeamCode}
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
          )}

          {/* Pending Member Approvals */}
          {isTeamLeader && pendingMembers.length > 0 && (
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
                          onClick={() => approveMember(member.id, member.name)}
                          className="bg-success hover:bg-success/80"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setRemovingMember(member.id)}
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
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Team Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Team Card */}
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
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
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

              {/* Team Members */}
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
                                onClick={() => setRemovingMember(member.email)}
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
            </div>

            {/* Right Column - Project & Announcements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <GlassCard glow="accent">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Project Details</h2>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
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

              {/* Ranking */}
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

              {/* Announcements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Announcements
                  </h2>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          announcement.type === 'success'
                            ? 'bg-success/10 border-success'
                            : announcement.type === 'warning'
                            ? 'bg-warning/10 border-warning'
                            : 'bg-primary/10 border-primary'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{announcement.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{announcement.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove Member Confirmation Dialog */}
      <AlertDialog open={!!removingMember} onOpenChange={() => setRemovingMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this member from your team? They will lose access to the team dashboard and will need to rejoin using the team code.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const member = teamData?.members.find(m => m.email === removingMember) || 
                               pendingMembers.find(m => m.id === removingMember);
                if (member) {
                  removeMember(removingMember, member.name || member.email);
                }
              }}
              className="bg-destructive hover:bg-destructive/80"
            >
              Remove Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageTransition>
  );
};

export default Dashboard;
