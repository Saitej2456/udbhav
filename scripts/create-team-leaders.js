#!/usr/bin/env node
/**
 * Script to create team leader accounts in Supabase Auth
 * Run with: node scripts/create-team-leaders.js
 * 
 * Make sure to set your Supabase credentials in .env file:
 * VITE_SUPABASE_URL=your_supabase_url
 * VITE_SUPABASE_ANON_KEY=your_anon_key
 * SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file manually
const envPath = join(__dirname, '..', '.env');
let envVars = {};

try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').trim();
      if (key && value) {
        envVars[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    }
  });
} catch (error) {
  console.error('❌ Error reading .env file:', error.message);
  process.exit(1);
}

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Default password for all team leaders
const DEFAULT_PASSWORD = 'Udbhav2026!';

// Team leaders data
const teamLeaders = [
  { email: 'shyamnavinkumar.m23@iiits.in', name: 'Modi Shyam Navinkumar', team: 'Bohar\'s Bit', iiit: 'IIIT Sri City', teamCode: 'BOHARSBIT001' },
  { email: 'kumarjinesh740@gmail.com', name: 'Jinesh Kumar', team: 'TechTonics', iiit: 'IIIT Agartala', teamCode: 'TECHTONICS001' },
  { email: 'adarshkr1375@gmail.com', name: 'Adarsh Kumar', team: 'DAOMINATORS', iiit: 'IIIT Allahabad', teamCode: 'DAOMINATORS001' },
  { email: 'sarthak05patil@gmail.com', name: 'Sarthak Patil', team: '404 Found', iiit: 'IIIT Bhopal', teamCode: 'FOUND404001' },
  { email: 'ujsquared@gmail.com', name: 'Ujjwal Kala', team: 'Bancode', iiit: 'IIIT Bhubaneswar', teamCode: 'BANCODE001' },
  { email: 'legendmortal912@gmail.com', name: 'Vinyas Maurya', team: 'Block E-state', iiit: 'IIIT Delhi', teamCode: 'BLOCKESTATE001' },
  { email: 'yashpreetsingh1002@gmail.com', name: 'Yashpreet Singh', team: 'SINISTER-6', iiit: 'IIIT Dharwad', teamCode: 'SINISTER6001' },
  { email: '2024kuec2075@iiitkota.ac.in', name: 'Arun', team: 'HackSmith', iiit: 'IIIT Kota', teamCode: 'HACKSMITH001' },
  { email: 'nadindl23bcs111@iiitkottayam.ac.in', name: 'Nadindla Mahabub Mahhen', team: 'KanyaRaasi', iiit: 'IIIT Kottayam', teamCode: 'KANYARAASI001' },
  { email: 'rahulsharma.hps@gmail.com', name: 'Rahul Sharma', team: 'Kaizen', iiit: 'IIIT Manipur', teamCode: 'KAIZEN001' },
  { email: 'bt23cse160@iiitn.ac.in', name: 'Nishchal Verma', team: 'Neuronix', iiit: 'IIIT Nagpur', teamCode: 'NEURONIX001' },
  { email: 'abhay@iiitnr.edu.in', name: 'Abhay Yadav', team: 'CBOW', iiit: 'IIIT Naya Raipur', teamCode: 'CBOW001' },
  { email: 'himanshupatel2125@gmail.com', name: 'Himanshu Patel', team: 'Sysmon', iiit: 'IIIT Pune', teamCode: 'SYSMON001' },
  { email: 'cs23b1034@iiitr.ac.in', name: 'K V Jaya Harsha', team: 'Zero-Deadlock', iiit: 'IIIT Raichur', teamCode: 'ZERODEADLOCK001' },
  { email: 'ui23cs63@iiitsurat.ac.in', name: 'Shreyansh Vishwakarma', team: 'DBDT', iiit: 'IIIT Surat', teamCode: 'DBDT001' },
  { email: '231124@iiitt.ac.in', name: 'Jarugu Kovid Naidu', team: 'The Hawkings', iiit: 'IIIT Tiruchirappalli', teamCode: 'HAWKINGS001' },
  { email: 'sarthakbansal725@gmail.com', name: 'Sarthak Bansal', team: 'PromptOps', iiit: 'IIIT Una', teamCode: 'PROMPTOPS001' },
  { email: '202451024@iiitvadodara.ac.in', name: 'Ashay Gupta', team: 'Zodiac Z408', iiit: 'IIIT Vadodara', teamCode: 'ZODIAC001' },
  { email: 'yugbaid4@gmail.com', name: 'Yug Baid', team: 'DivFlow', iiit: 'IIIT Vadodara-ICD', teamCode: 'DIVFLOW001' },
  { email: 'cs24b2051@iiitdm.ac.in', name: 'Efanio Jens', team: 'SnackOverflow', iiit: 'IIIT Kancheepuram', teamCode: 'SNACKOVERFLOW001' },
  { email: '123me0031@iiitk.ac.in', name: 'Piyush Gupta', team: 'Nocturnal_Coders', iiit: 'IIIT Kurnool', teamCode: 'NOCTURNAL001' }
];

async function createTeamLeader(leader) {
  console.log(`\n📧 Creating account for ${leader.name} (${leader.email})...`);
  
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: leader.email,
      password: DEFAULT_PASSWORD,
      email_confirm: true,
      user_metadata: {
        name: leader.name,
        role: 'team_leader'
      }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`⚠️  User already exists: ${leader.email}`);
        
        // Try to get existing user
        const { data: existingUser } = await supabase.auth.admin.listUsers();
        const user = existingUser?.users?.find(u => u.email === leader.email);
        
        if (user) {
          // Update user profile
          await updateUserProfile(user.id, leader);
          return { success: true, existing: true };
        }
      } else {
        throw authError;
      }
    }

    if (authData.user) {
      console.log(`✅ Auth account created: ${authData.user.id}`);
      
      // Create user profile
      await updateUserProfile(authData.user.id, leader);
      
      return { success: true, userId: authData.user.id };
    }
  } catch (error) {
    console.error(`❌ Error creating ${leader.email}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function updateUserProfile(userId, leader) {
  // Insert/update user profile
  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({
      id: userId,
      email: leader.email,
      name: leader.name,
      role: 'team_leader',
      team_code: leader.teamCode,
      has_joined_team: true
    }, {
      onConflict: 'id'
    });

  if (profileError) {
    console.error(`❌ Profile error for ${leader.email}:`, profileError.message);
  } else {
    console.log(`✅ Profile created/updated for ${leader.name}`);
  }
}

async function main() {
  console.log('🚀 Starting team leader account creation...');
  console.log(`📝 Total team leaders to create: ${teamLeaders.length}`);
  console.log(`🔑 Default password: ${DEFAULT_PASSWORD}`);
  console.log('─'.repeat(60));

  const results = {
    created: 0,
    existing: 0,
    failed: 0,
    errors: []
  };

  for (const leader of teamLeaders) {
    const result = await createTeamLeader(leader);
    
    if (result.success) {
      if (result.existing) {
        results.existing++;
      } else {
        results.created++;
      }
    } else {
      results.failed++;
      results.errors.push({ email: leader.email, error: result.error });
    }
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n' + '─'.repeat(60));
  console.log('📊 Summary:');
  console.log(`✅ Successfully created: ${results.created}`);
  console.log(`⚠️  Already existing: ${results.existing}`);
  console.log(`❌ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach(({ email, error }) => {
      console.log(`   ${email}: ${error}`);
    });
  }

  console.log('\n✨ Done!');
  console.log('\n📋 Next steps:');
  console.log('1. Run the seed_team_leaders.sql script in Supabase SQL Editor');
  console.log('2. Team leaders can now login with their email and password: ' + DEFAULT_PASSWORD);
  console.log('3. Advise team leaders to change their password after first login');
}

main().catch(console.error);
