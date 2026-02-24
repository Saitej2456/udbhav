import { supabase } from './supabase';

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: string;
  has_joined_team: boolean;
}

export interface TeamInfo {
  id: string;
  team_name: string;
  iiit: string;
  representative: string;
  user_id: string;
}

export interface ProjectInfo {
  id: string;
  project_name: string;
  description: string;
  domain: string;
  github_url: string | null;
  demo_url: string | null;
  tech_stack: string[];
  user_id: string;
}

export interface FullProjectData {
  project: ProjectInfo;
  team: TeamInfo;
  teamLeader: TeamMember;
  teamMembers: TeamMember[];
}

/**
 * Fetch all projects with their team information
 */
export async function fetchAllProjects(): Promise<FullProjectData[]> {
  try {
    // Fetch all project info
    const { data: projects, error: projectError } = await supabase
      .from('project_info')
      .select('*');

    if (projectError) {
      console.error('Error fetching projects:', projectError);
      return [];
    }

    if (!projects || projects.length === 0) {
      return [];
    }

    // Fetch all team info
    const { data: teams, error: teamError } = await supabase
      .from('team_info')
      .select('*');

    if (teamError) {
      console.error('Error fetching teams:', teamError);
      return [];
    }

    // Fetch all user profiles (team leaders and members)
    const { data: users, error: userError } = await supabase
      .from('user_profiles')
      .select('*');

    if (userError) {
      console.error('Error fetching users:', userError);
      return [];
    }

    // Combine the data
    const fullProjectData: FullProjectData[] = projects.map((project) => {
      const team = teams?.find((t) => t.user_id === project.user_id);
      const teamLeader = users?.find((u) => u.id === project.user_id);
      const teamMembers = users?.filter(
        (u) => u.team_id === project.user_id && u.id !== project.user_id
      ) || [];

      return {
        project,
        team: team || {
          id: '',
          team_name: 'Unknown Team',
          iiit: 'Unknown IIIT',
          representative: teamLeader?.name || 'Unknown',
          user_id: project.user_id,
        },
        teamLeader: teamLeader || {
          id: project.user_id,
          email: '',
          name: 'Unknown',
          role: 'team_leader',
          has_joined_team: false,
        },
        teamMembers,
      };
    });

    return fullProjectData;
  } catch (error) {
    console.error('Error in fetchAllProjects:', error);
    return [];
  }
}

/**
 * Fetch a single project by user_id
 */
export async function fetchProjectByUserId(userId: string): Promise<FullProjectData | null> {
  try {
    // Fetch project info
    const { data: project, error: projectError } = await supabase
      .from('project_info')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (projectError || !project) {
      console.error('Error fetching project:', projectError);
      return null;
    }

    // Fetch team info
    const { data: team, error: teamError } = await supabase
      .from('team_info')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (teamError) {
      console.error('Error fetching team:', teamError);
    }

    // Fetch team leader profile
    const { data: teamLeader, error: leaderError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (leaderError) {
      console.error('Error fetching team leader:', leaderError);
    }

    // Fetch team members
    const { data: teamMembers, error: membersError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('team_id', userId)
      .neq('id', userId);

    if (membersError) {
      console.error('Error fetching team members:', membersError);
    }

    return {
      project,
      team: team || {
        id: '',
        team_name: 'Unknown Team',
        iiit: 'Unknown IIIT',
        representative: teamLeader?.name || 'Unknown',
        user_id: userId,
      },
      teamLeader: teamLeader || {
        id: userId,
        email: '',
        name: 'Unknown',
        role: 'team_leader',
        has_joined_team: false,
      },
      teamMembers: teamMembers || [],
    };
  } catch (error) {
    console.error('Error in fetchProjectByUserId:', error);
    return null;
  }
}

/**
 * Fetch team information by user_id
 */
export async function fetchTeamInfo(userId: string) {
  try {
    const { data: team, error: teamError } = await supabase
      .from('team_info')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (teamError) {
      console.error('Error fetching team info:', teamError);
      return null;
    }

    // Fetch team members
    const { data: teamMembers, error: membersError } = await supabase
      .from('user_profiles')
      .select('*')
      .or(`id.eq.${userId},team_id.eq.${userId}`);

    if (membersError) {
      console.error('Error fetching team members:', membersError);
      return { ...team, members: [] };
    }

    return {
      ...team,
      members: teamMembers || [],
    };
  } catch (error) {
    console.error('Error in fetchTeamInfo:', error);
    return null;
  }
}

/**
 * Search for teams by IIIT name or team name
 */
export async function searchTeams(searchQuery: string) {
  try {
    const { data: teams, error } = await supabase
      .from('team_info')
      .select('*')
      .or(`team_name.ilike.%${searchQuery}%,iiit.ilike.%${searchQuery}%`);

    if (error) {
      console.error('Error searching teams:', error);
      return [];
    }

    return teams || [];
  } catch (error) {
    console.error('Error in searchTeams:', error);
    return [];
  }
}

/**
 * Get all teams grouped by IIIT
 */
export async function getTeamsByIIIT() {
  try {
    const { data: teams, error } = await supabase
      .from('team_info')
      .select('*')
      .order('iiit', { ascending: true });

    if (error) {
      console.error('Error fetching teams by IIIT:', error);
      return {};
    }

    // Group by IIIT
    const grouped = (teams || []).reduce((acc, team) => {
      if (!acc[team.iiit]) {
        acc[team.iiit] = [];
      }
      acc[team.iiit].push(team);
      return acc;
    }, {} as Record<string, TeamInfo[]>);

    return grouped;
  } catch (error) {
    console.error('Error in getTeamsByIIIT:', error);
    return {};
  }
}
