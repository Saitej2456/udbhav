import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
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

// Dashboard Components
import TeamCodeSection from './Dashboard/TeamCodeSection';
import PendingApprovals from './Dashboard/PendingApprovals';
import TeamInfoCard from './Dashboard/TeamInfoCard';
import TeamMembersCard from './Dashboard/TeamMembersCard';
import ProjectDetailsCard from './Dashboard/ProjectDetailsCard';
import CompetitionProgress from './Dashboard/CompetitionProgress';
import AnnouncementsCard from './Dashboard/AnnouncementsCard';
import EditDialogs from './Dashboard/EditDialogs';

const Dashboard = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [teamCode, setTeamCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [removingMember, setRemovingMember] = useState<string | null>(null);
  const [editingTeamInfo, setEditingTeamInfo] = useState(false);
  const [editingProject, setEditingProject] = useState(false);
  const [teamInfoForm, setTeamInfoForm] = useState({ name: '', iiit: '', representative: '' });
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    domain: '',
    github: '',
    demo: '',
    techStack: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      // If user is SPOC, redirect to SPOC dashboard
      if (profile.role === 'spoc') {
        navigate('/spoc/dashboard');
        return;
      }
      loadTeamData();
    }
  }, [profile, navigate]);

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

      // Fetch saved team info from database
      const { data: savedTeamInfo } = await supabase
        .from('team_info')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      // Fetch saved project info from database
      const { data: savedProjectInfo } = await supabase
        .from('project_info')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      // Merge database members with static team data
      const mergedTeam = {
        ...leaderTeam,
        // Use saved data if available, otherwise use static data
        name: savedTeamInfo?.team_name || leaderTeam.name,
        iiit: savedTeamInfo?.iiit || leaderTeam.iiit,
        representative: savedTeamInfo?.representative || leaderTeam.representative,
        members: leaderTeam.members.map(staticMember => {
          // Check if this member has an actual database account
          const dbMember = dbMembers?.find(db => db.email.toLowerCase() === staticMember.email.toLowerCase());
          return {
            ...staticMember,
            hasAccount: !!dbMember,
            isActive: !!dbMember
          };
        }).filter(m => m.email === profile?.email || m.hasAccount), // Show leader + active members
        project: savedProjectInfo ? {
          name: savedProjectInfo.project_name,
          description: savedProjectInfo.description,
          domain: savedProjectInfo.domain,
          github: savedProjectInfo.github_url || '',
          demo: savedProjectInfo.demo_url || '',
          techStack: savedProjectInfo.tech_stack || [],
        } : leaderTeam.project,
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
          // Fetch saved team info for the leader
          const { data: savedTeamInfo } = await supabase
            .from('team_info')
            .select('*')
            .eq('user_id', profile.team_id)
            .single();

          // Fetch saved project info for the leader
          const { data: savedProjectInfo } = await supabase
            .from('project_info')
            .select('*')
            .eq('user_id', profile.team_id)
            .single();

          const updatedTeam = {
            ...memberTeam,
            name: savedTeamInfo?.team_name || memberTeam.name,
            iiit: savedTeamInfo?.iiit || memberTeam.iiit,
            representative: savedTeamInfo?.representative || memberTeam.representative,
            project: savedProjectInfo ? {
              name: savedProjectInfo.project_name,
              description: savedProjectInfo.description,
              domain: savedProjectInfo.domain,
              github: savedProjectInfo.github_url || '',
              demo: savedProjectInfo.demo_url || '',
              techStack: savedProjectInfo.tech_stack || [],
            } : memberTeam.project,
          };

          setTeamData(updatedTeam);
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

  const openTeamInfoEdit = () => {
    if (teamData) {
      setTeamInfoForm({
        name: teamData.name,
        iiit: teamData.iiit,
        representative: teamData.representative,
      });
      setEditingTeamInfo(true);
    }
  };

  const openProjectEdit = () => {
    if (teamData?.project) {
      setProjectForm({
        name: teamData.project.name,
        description: teamData.project.description,
        domain: teamData.project.domain,
        github: teamData.project.github,
        demo: teamData.project.demo,
        techStack: teamData.project.techStack.join(', '),
      });
      setEditingProject(true);
    }
  };

  const saveTeamInfo = async () => {
    setSaving(true);
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('team_info')
        .upsert({
          user_id: user?.id,
          team_name: teamInfoForm.name,
          iiit: teamInfoForm.iiit,
          representative: teamInfoForm.representative,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Update local state
      if (teamData) {
        setTeamData({
          ...teamData,
          name: teamInfoForm.name,
          iiit: teamInfoForm.iiit,
          representative: teamInfoForm.representative,
        });
      }

      toast({
        title: 'Team info updated!',
        description: 'Your team information has been saved successfully.',
      });
      setEditingTeamInfo(false);
    } catch (error: any) {
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const saveProject = async () => {
    setSaving(true);
    try {
      const techStackArray = projectForm.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      // Update in Supabase
      const { error } = await supabase
        .from('project_info')
        .upsert({
          user_id: user?.id,
          project_name: projectForm.name,
          description: projectForm.description,
          domain: projectForm.domain,
          github_url: projectForm.github,
          demo_url: projectForm.demo,
          tech_stack: techStackArray,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Update local state
      if (teamData) {
        setTeamData({
          ...teamData,
          project: {
            name: projectForm.name,
            description: projectForm.description,
            domain: projectForm.domain,
            github: projectForm.github,
            demo: projectForm.demo,
            techStack: techStackArray,
          },
        });
      }

      toast({
        title: 'Project updated!',
        description: 'Your project details have been saved successfully.',
      });
      setEditingProject(false);
    } catch (error: any) {
      toast({
        title: 'Failed to save',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
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
            <TeamCodeSection 
              teamCode={teamCode}
              copied={copied}
              onCopy={copyTeamCode}
            />
          )}

          {/* Pending Member Approvals */}
          {isTeamLeader && (
            <PendingApprovals
              pendingMembers={pendingMembers}
              onApprove={approveMember}
              onReject={setRemovingMember}
            />
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Team Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Team Card */}
              <TeamInfoCard
                teamData={teamData!}
                isTeamLeader={isTeamLeader}
                onEdit={openTeamInfoEdit}
              />

              {/* Team Members */}
              <TeamMembersCard
                teamData={teamData!}
                isTeamLeader={isTeamLeader}
                onRemoveMember={setRemovingMember}
              />
            </div>

            {/* Right Column - Project & Announcements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Info */}
              <ProjectDetailsCard
                teamData={teamData!}
                isTeamLeader={isTeamLeader}
                onEdit={openProjectEdit}
              />

              {/* Ranking */}
              <CompetitionProgress teamData={teamData!} />

              {/* Announcements */}
              <AnnouncementsCard />
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

      {/* Edit Dialogs */}
      <EditDialogs
        editingTeamInfo={editingTeamInfo}
        editingProject={editingProject}
        teamInfoForm={teamInfoForm}
        projectForm={projectForm}
        saving={saving}
        onTeamInfoChange={setTeamInfoForm}
        onProjectChange={setProjectForm}
        onSaveTeamInfo={saveTeamInfo}
        onSaveProject={saveProject}
        onCloseTeamInfo={() => setEditingTeamInfo(false)}
        onCloseProject={() => setEditingProject(false)}
      />
    </PageTransition>
  );
};

export default Dashboard;
