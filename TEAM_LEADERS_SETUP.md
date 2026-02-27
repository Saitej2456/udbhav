# Team Leaders Setup Guide

This guide explains how to give all team leaders access to the UDBHAV platform.

## Prerequisites

1. Access to Supabase dashboard
2. Service role key from Supabase (Settings > API > service_role key)
3. Node.js installed on your system

## Setup Steps

### Step 1: Configure Environment Variables

Add the following to your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Required for creating users
```

### Step 2: Create Team Leader Auth Accounts

Run the Node.js script to create auth accounts for all team leaders:

```bash
node scripts/create-team-leaders.js
```

This script will:
- Create auth accounts for all 21 team leaders
- Set default password: `Udbhav2026!`
- Create user profiles with team_leader role
- Handle existing accounts gracefully

### Step 3: Seed Team and Project Data

After creating auth accounts, run the SQL script in Supabase SQL Editor:

1. Go to Supabase Dashboard > SQL Editor
2. Open `seed_team_leaders.sql` file
3. Copy and paste the entire content
4. Click "Run" to execute

This will populate:
- User profiles
- Team information
- Project details

## Team Leaders List

All 21 team leaders have been configured:

| Email | Name | Team | IIIT | Team Code |
|-------|------|------|------|-----------|
| shyamnavinkumar.m23@iiits.in | Modi Shyam Navinkumar | Bohar's Bit | IIIT Sri City | BOHARSBIT001 |
| kumarjinesh740@gmail.com | Jinesh Kumar | TechTonics | IIIT Agartala | TECHTONICS001 |
| adarshkr1375@gmail.com | Adarsh Kumar | DAOMINATORS | IIIT Allahabad | DAOMINATORS001 |
| sarthak05patil@gmail.com | Sarthak Patil | 404 Found | IIIT Bhopal | FOUND404001 |
| ujsquared@gmail.com | Ujjwal Kala | Bancode | IIIT Bhubaneswar | BANCODE001 |
| legendmortal912@gmail.com | Vinyas Maurya | Block E-state | IIIT Delhi | BLOCKESTATE001 |
| yashpreetsingh1002@gmail.com | Yashpreet Singh | SINISTER-6 | IIIT Dharwad | SINISTER6001 |
| 2024kuec2075@iiitkota.ac.in | Arun | HackSmith | IIIT Kota | HACKSMITH001 |
| nadindl23bcs111@iiitkottayam.ac.in | Nadindla Mahabub Mahhen | KanyaRaasi | IIIT Kottayam | KANYARAASI001 |
| rahulsharma.hps@gmail.com | Rahul Sharma | Kaizen | IIIT Manipur | KAIZEN001 |
| bt23cse160@iiitn.ac.in | Nishchal Verma | Neuronix | IIIT Nagpur | NEURONIX001 |
| abhay@iiitnr.edu.in | Abhay Yadav | CBOW | IIIT Naya Raipur | CBOW001 |
| himanshupatel2125@gmail.com | Himanshu Patel | Sysmon | IIIT Pune | SYSMON001 |
| cs23b1034@iiitr.ac.in | K V Jaya Harsha | Zero-Deadlock | IIIT Raichur | ZERODEADLOCK001 |
| ui23cs63@iiitsurat.ac.in | Shreyansh Vishwakarma | DBDT | IIIT Surat | DBDT001 |
| 231124@iiitt.ac.in | Jarugu Kovid Naidu | The Hawkings | IIIT Tiruchirappalli | HAWKINGS001 |
| sarthakbansal725@gmail.com | Sarthak Bansal | PromptOps | IIIT Una | PROMPTOPS001 |
| 202451024@iiitvadodara.ac.in | Ashay Gupta | Zodiac Z408 | IIIT Vadodara | ZODIAC001 |
| yugbaid4@gmail.com | Yug Baid | DivFlow | IIIT Vadodara-ICD | DIVFLOW001 |
| cs24b2051@iiitdm.ac.in | Efanio Jens | SnackOverflow | IIIT Kancheepuram | SNACKOVERFLOW001 |
| 123me0031@iiitk.ac.in | Piyush Gupta | Nocturnal_Coders | IIIT Kurnool | NOCTURNAL001 |

## Default Credentials

- **Password for all team leaders**: `Udbhav2026!`
- Team leaders should change their password after first login

## Login Process

Team leaders can now:
1. Go to `/login` page
2. Enter their email and password
3. Access their dashboard at `/dashboard`
4. View and edit their team and project information

## Troubleshooting

### Script fails with "Missing Supabase credentials"
- Make sure `.env` file contains all required keys
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set (not just anon key)

### User already exists error
- The script handles this gracefully and updates the profile
- No action needed

### SQL script fails
- Make sure auth users were created first (Step 3)
- Check Supabase logs for specific errors
- Ensure RLS policies are correctly set

## Security Notes

- Service role key bypasses Row Level Security - keep it secure
- Never commit `.env` file to git
- Advise team leaders to change password on first login
- Consider enabling 2FA for team leader accounts

## Support

For issues or questions, contact the UDBHAV technical team.
