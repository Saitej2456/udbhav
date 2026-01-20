# Role-Based Signup & Team Management Implementation

## Overview
This implementation adds role-based signup and team management functionality to the UDBHAV platform with three distinct user roles: **Admin**, **SPOC**, and **Team Leader**.

## Features Implemented

### 1. Role-Based Signup ✅
- Users can select their role during signup:
  - **Admin**: Full access to all features
  - **SPOC**: Single Point of Contact for IIIT
  - **Team Leader**: Can create and manage a team
- User metadata (name, role) is stored in the database
- Each user gets a profile in the `user_profiles` table

### 2. Team Management System ✅

#### Team Leader Features:
- **Automatic Team Code Generation**: Each team leader gets a unique 8-character code
- **Code Sharing**: Team leaders can copy and share their team code with members
- **Full Dashboard Access**: Immediate access to team dashboard with:
  - Team information
  - Member list
  - Project details
  - Leaderboard ranking
  - Announcements

#### Team Member Features:
- **Join via Code**: Members must enter team code to join a team
- **Restricted Access**: Until joined, members only see the team join prompt
- **Post-Join Access**: After joining, members can view full team dashboard

### 3. Database Schema ✅

```sql
user_profiles table:
- id (UUID, FK to auth.users)
- email (TEXT)
- name (TEXT)
- role (TEXT: admin/spoc/team_leader/member)
- team_id (UUID, FK to user_profiles - references team leader)
- team_code (TEXT, UNIQUE - for team leaders)
- has_joined_team (BOOLEAN)
- created_at, updated_at (TIMESTAMPS)
```

## User Flow

### Team Leader Flow:
1. Sign up → Select "Team Leader" role
2. Get redirected to Dashboard
3. Automatically assigned a unique team code
4. Can view team code in prominent banner
5. Share code with team members
6. See members join in real-time

### Team Member Flow:
1. Sign up → Select "Team Leader" role (or get invited)
2. See "Join Team" screen instead of dashboard
3. Enter team code provided by team leader
4. Join team successfully
5. Get full access to team dashboard

### Admin/SPOC Flow:
1. Sign up → Select respective role
2. Get full dashboard access
3. Can manage/view all teams (to be implemented)

## File Changes

### Modified Files:
1. **src/pages/Signup.tsx**
   - Added role selection with radio buttons
   - Added name field
   - Updated signUp to pass metadata

2. **src/contexts/AuthContext.tsx**
   - Added UserProfile interface
   - Added profile state and fetching
   - Updated signUp to create user profile
   - Added refreshProfile function

3. **src/pages/Dashboard.tsx**
   - Added role-based view logic
   - Team code display for leaders
   - TeamJoin component integration
   - Dynamic team data fetching

### New Files:
1. **src/components/TeamJoin.tsx**
   - Component for members to join teams via code
   - Code validation and team joining logic

2. **supabase_schema.sql**
   - Database schema for user_profiles table
   - RLS policies
   - Indexes and triggers

## Setup Instructions

### 1. Run the Database Migration
Execute the SQL in `supabase_schema.sql` in your Supabase SQL editor:
```bash
# Copy contents of supabase_schema.sql and run in Supabase Dashboard > SQL Editor
```

### 2. Environment Variables
Ensure these are set in your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies (if needed)
```bash
npm install
# or
pnpm install
```

### 4. Run the Application
```bash
npm run dev
# or
pnpm dev
```

## Testing the Implementation

### Test as Team Leader:
1. Sign up with role "Team Leader"
2. Verify you see the team code banner
3. Copy the team code
4. Check that dashboard displays correctly

### Test as Team Member:
1. Sign up with role "Team Leader" (will need to be changed to "Member" after creation)
2. Verify you see the "Join Team" screen
3. Enter a team code from a team leader
4. Verify successful join and dashboard access

## Next Steps / Future Enhancements

1. **Add "Member" role to signup** - Currently defaults to team_leader
2. **Admin Dashboard** - Separate view for admins to manage all teams
3. **SPOC Dashboard** - IIIT-specific management view
4. **Real-time Updates** - Use Supabase realtime for live member joins
5. **Team Invitations** - Email invites with team codes
6. **Member Removal** - Allow team leaders to remove members
7. **Project Submission** - Team project upload and management
8. **Leaderboard Integration** - Connect to actual leaderboard data
9. **Notifications** - Alert team leaders when members join
10. **Team Size Limits** - Enforce maximum team size

## Security Considerations

✅ Row Level Security (RLS) enabled
✅ Users can only view their own profile
✅ Team members can view other team members
✅ Team codes are unique and indexed
✅ Auth required for all operations

## Troubleshooting

### Issue: Team code not showing
- Check if user role is 'team_leader'
- Verify team_code is generated in database
- Check browser console for errors

### Issue: Can't join team
- Verify team code is correct (case-insensitive)
- Check if team leader exists with that code
- Verify database policies allow the operation

### Issue: Dashboard not loading
- Check if user is authenticated
- Verify user_profiles table exists
- Check browser console for API errors

## Database Queries for Debugging

```sql
-- View all users
SELECT * FROM user_profiles;

-- View team leaders with codes
SELECT id, name, role, team_code FROM user_profiles WHERE role = 'team_leader';

-- View team members for a specific leader
SELECT * FROM user_profiles WHERE team_id = 'leader-uuid-here';

-- Check team join status
SELECT name, role, has_joined_team FROM user_profiles;
```
