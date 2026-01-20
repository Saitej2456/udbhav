-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'spoc', 'team_leader', 'member')),
    team_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    team_code TEXT UNIQUE,
    has_joined_team BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_team_id ON user_profiles(team_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_team_code ON user_profiles(team_code);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = id);


CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Allow users to view profiles that share the same team_id
CREATE POLICY "Users can view their team members"
    ON user_profiles FOR SELECT
    USING (
        team_id IS NOT NULL AND 
        team_id = (SELECT team_id FROM user_profiles WHERE id = auth.uid())
    );

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create team_info table
CREATE TABLE IF NOT EXISTS team_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    team_name TEXT NOT NULL,
    iiit TEXT NOT NULL,
    representative TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_team_info_user_id ON team_info(user_id);

-- Enable Row Level Security
ALTER TABLE team_info ENABLE ROW LEVEL SECURITY;

-- Create policies for team_info
CREATE POLICY "Users can view their own team info"
    ON team_info FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Team members can view their leader's team info"
    ON team_info FOR SELECT
    USING (
        user_id IN (
            SELECT team_id FROM user_profiles WHERE id = auth.uid() AND has_joined_team = true
        )
    );

CREATE POLICY "Users can insert their own team info"
    ON team_info FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own team info"
    ON team_info FOR UPDATE
    USING (auth.uid() = user_id);

-- Create trigger for team_info updated_at
CREATE TRIGGER update_team_info_updated_at
    BEFORE UPDATE ON team_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create project_info table
CREATE TABLE IF NOT EXISTS project_info (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    project_name TEXT NOT NULL,
    description TEXT NOT NULL,
    domain TEXT NOT NULL,
    github_url TEXT,
    demo_url TEXT,
    tech_stack TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_project_info_user_id ON project_info(user_id);

-- Enable Row Level Security
ALTER TABLE project_info ENABLE ROW LEVEL SECURITY;

-- Create policies for project_info
CREATE POLICY "Users can view their own project info"
    ON project_info FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Team members can view their leader's project info"
    ON project_info FOR SELECT
    USING (
        user_id IN (
            SELECT team_id FROM user_profiles WHERE id = auth.uid() AND has_joined_team = true
        )
    );

CREATE POLICY "Users can insert their own project info"
    ON project_info FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own project info"
    ON project_info FOR UPDATE
    USING (auth.uid() = user_id);

-- Create trigger for project_info updated_at
CREATE TRIGGER update_project_info_updated_at
    BEFORE UPDATE ON project_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create iiit_edits table for SPOC edits
CREATE TABLE IF NOT EXISTS iiit_edits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    iiit_id TEXT NOT NULL,
    spoc_user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    description TEXT,
    about_section TEXT,
    achievements TEXT[],
    campus_gallery TEXT[],
    spoc_name TEXT,
    spoc_phone TEXT,
    spoc_email TEXT,
    spoc_department TEXT,
    club_name TEXT,
    club_instagram TEXT,
    club_linkedin TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(iiit_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_iiit_edits_iiit_id ON iiit_edits(iiit_id);
CREATE INDEX IF NOT EXISTS idx_iiit_edits_spoc_user_id ON iiit_edits(spoc_user_id);

-- Enable Row Level Security
ALTER TABLE iiit_edits ENABLE ROW LEVEL SECURITY;

-- Create policies for iiit_edits
CREATE POLICY "Anyone can view IIIT edits"
    ON iiit_edits FOR SELECT
    USING (true);

CREATE POLICY "SPOCs can insert IIIT edits"
    ON iiit_edits FOR INSERT
    WITH CHECK (
        auth.uid() = spoc_user_id AND
        EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'spoc')
    );

CREATE POLICY "SPOCs can update their IIIT edits"
    ON iiit_edits FOR UPDATE
    USING (
        auth.uid() = spoc_user_id AND
        EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'spoc')
    );

-- Create trigger for iiit_edits updated_at
CREATE TRIGGER update_iiit_edits_updated_at
    BEFORE UPDATE ON iiit_edits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for IIIT photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('iiit-photos', 'iiit-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for iiit-photos bucket
CREATE POLICY "Anyone can view IIIT photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'iiit-photos');

CREATE POLICY "SPOCs can upload IIIT photos"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'iiit-photos' AND
        EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'spoc')
    );

CREATE POLICY "SPOCs can delete their IIIT photos"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'iiit-photos' AND
        EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'spoc')
    );
