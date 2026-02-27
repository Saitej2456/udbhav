-- Seed Team Leaders and Their Data
-- Run this script in your Supabase SQL Editor
-- Default password for all team leaders: "Udbhav2026!"

-- Note: You'll need to create auth users first through Supabase Auth UI or API
-- This script assumes auth.users already exist for each email

-- Insert Team Leaders with their team info
-- Format: Insert user profile, team info, and project info for each team

-- 1. IIIT Sri City - Bohar's Bit
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'shyamnavinkumar.m23@iiits.in'), 'shyamnavinkumar.m23@iiits.in', 'Modi Shyam Navinkumar', 'team_leader', 'BOHARSBIT001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'shyamnavinkumar.m23@iiits.in'), 'Bohar''s Bit', 'IIIT Sri City', 'Modi Shyam Navinkumar')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'shyamnavinkumar.m23@iiits.in'), 'Blockchain Property Management', 'A blockchain solution for secure property management and land registry.', 'Blockchain', 'https://github.com/orgs/Bohar-s-Bit/repositories', 'https://docs.google.com/presentation/d/1VPyo26Z8_ZDn1WOXrGpsVTke9gPtv2lYC9eI64OLF68/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 2. IIIT Agartala - TechTonics
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'kumarjinesh740@gmail.com'), 'kumarjinesh740@gmail.com', 'Jinesh Kumar', 'team_leader', 'TECHTONICS001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'kumarjinesh740@gmail.com'), 'TechTonics', 'IIIT Agartala', 'Jinesh Kumar')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'kumarjinesh740@gmail.com'), 'SecureEdge', 'An edge computing-based cybersecurity solution for IoT healthcare devices.', 'Cybersecurity', 'https://github.com/Adiejais2006/Udbhav.git', 'https://docs.google.com/presentation/d/1xMJ_LKIDZmkL05GVfnO5sunyP908j-4ActE33I6Uah0/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 3. IIIT Allahabad - DAOMINATORS
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'adarshkr1375@gmail.com'), 'adarshkr1375@gmail.com', 'Adarsh Kumar', 'team_leader', 'DAOMINATORS001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'adarshkr1375@gmail.com'), 'DAOMINATORS', 'IIIT Allahabad', 'Adarsh Kumar')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'adarshkr1375@gmail.com'), 'Bhumi', 'A blockchain-based land registry system ensuring transparent and secure property transactions.', 'Blockchain', 'https://github.com/Platypus96/Bhumi', 'https://drive.google.com/file/d/1Qy1WKIJz2-f7LxcYelz9W0kzaeVg1IvY/view?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 4. IIIT Bhopal - 404 Found
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'sarthak05patil@gmail.com'), 'sarthak05patil@gmail.com', 'Sarthak Patil', 'team_leader', 'FOUND404001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'sarthak05patil@gmail.com'), '404 Found', 'IIIT Bhopal', 'Sarthak Patil')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'sarthak05patil@gmail.com'), 'Clinical Note Backend', 'A machine learning platform for predictive healthcare analytics and clinical notes.', 'AI/ML', 'https://github.com/ezsarthak/clinical_note_backend.git', 'https://docs.google.com/presentation/d/1X0X8JsDuyKkIRDZprmhrDL8l1nUSU8emruaAWaN18iY/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 5. IIIT Bhubaneswar - Bancode
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'ujsquared@gmail.com'), 'ujsquared@gmail.com', 'Ujjwal Kala', 'team_leader', 'BANCODE001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'ujsquared@gmail.com'), 'Bancode', 'IIIT Bhubaneswar', 'Ujjwal Kala')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'ujsquared@gmail.com'), 'Clinical Note Summarization', 'An AI/ML solution for clinical note summarization and medical data analysis.', 'AI/ML', 'https://github.com/iamanishx/udbhav', 'https://www.canva.com/design/DAG_YBdwvTo/dwYrLX1Km8W6hiuNbCtHAg/view')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 6. IIIT Delhi - Block E-state
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'legendmortal912@gmail.com'), 'legendmortal912@gmail.com', 'Vinyas Maurya', 'team_leader', 'BLOCKESTATE001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'legendmortal912@gmail.com'), 'Block E-state', 'IIIT Delhi', 'Vinyas Maurya')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'legendmortal912@gmail.com'), 'TERRA-VAULT', 'A blockchain-based real estate transaction platform for secure property deals.', 'Blockchain', 'https://github.com/legendmortal912-ops/TERRA-VAULT', 'https://powerpoint.cloud.microsoft/open/onedrive/?docId=E5D5315651BFDE16%21sa805457864224bf1807c4fcdb5872e70&driveId=E5D5315651BFDE16')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 7. IIIT Dharwad - SINISTER-6
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'yashpreetsingh1002@gmail.com'), 'yashpreetsingh1002@gmail.com', 'Yashpreet Singh', 'team_leader', 'SINISTER6001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'yashpreetsingh1002@gmail.com'), 'SINISTER-6', 'IIIT Dharwad', 'Yashpreet Singh')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'yashpreetsingh1002@gmail.com'), 'Clinical ML Pipeline', 'An innovative AI/ML solution for healthcare optimization and clinical decision support.', 'AI/ML', 'https://github.com/Prathameshworks247/InterIIIT-Round3-Submission', 'https://docs.google.com/presentation/d/1MbP72_V2Bf6Xb0PxXcS12PqpakmQLQzF31IYbBJu8tg/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 8. IIIT Kota - HackSmith
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = '2024kuec2075@iiitkota.ac.in'), '2024kuec2075@iiitkota.ac.in', 'Arun', 'team_leader', 'HACKSMITH001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = '2024kuec2075@iiitkota.ac.in'), 'HackSmith', 'IIIT Kota', 'Arun')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = '2024kuec2075@iiitkota.ac.in'), 'DxAssist', 'An AI-driven healthcare diagnostic assistant for patient care optimization.', 'AI/ML', 'https://github.com/ShyamMohan45/DxAssist', 'https://docs.google.com/presentation/d/1AoZhawMbqcgqb7ODuMU_eT708HlB0JlD/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 9. IIIT Kottayam - KanyaRaasi
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'nadindl23bcs111@iiitkottayam.ac.in'), 'nadindl23bcs111@iiitkottayam.ac.in', 'Nadindla Mahabub Mahhen', 'team_leader', 'KANYARAASI001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'nadindl23bcs111@iiitkottayam.ac.in'), 'KanyaRaasi', 'IIIT Kottayam', 'Nadindla Mahabub Mahhen')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'nadindl23bcs111@iiitkottayam.ac.in'), 'Clinical ML Solution', 'A machine learning solution for healthcare data analysis and clinical predictions.', 'AI/ML', 'https://github.com/sabbyX/ubd2', 'https://docs.google.com/presentation/d/1Ri_DcwOf5rrjKJTadkd5ZJgrqA2089Po/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 10. IIIT Manipur - Kaizen
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'rahulsharma.hps@gmail.com'), 'rahulsharma.hps@gmail.com', 'Rahul Sharma', 'team_leader', 'KAIZEN001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'rahulsharma.hps@gmail.com'), 'Kaizen', 'IIIT Manipur', 'Rahul Sharma')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'rahulsharma.hps@gmail.com'), 'E-parchi', 'A digital prescription and healthcare management system.', 'AI/ML', 'https://github.com/rahulsiiitm/kaizen-eparchi', 'https://drive.google.com/file/d/1ntfQHbDGGYEvThLP3f_FusvJSrylRw5h/view?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 11. IIIT Nagpur - Neuronix
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'bt23cse160@iiitn.ac.in'), 'bt23cse160@iiitn.ac.in', 'Nishchal Verma', 'team_leader', 'NEURONIX001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'bt23cse160@iiitn.ac.in'), 'Neuronix', 'IIIT Nagpur', 'Nishchal Verma')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'bt23cse160@iiitn.ac.in'), 'Medora', 'An AI-powered platform for medical diagnostics and patient monitoring.', 'AI/ML', 'https://github.com/harshwardhan-singh-bais/clinical-ml-pipeline', 'https://docs.google.com/presentation/d/1MUAB_qJ2eslzXacfvnPMothPw1l-hM8DVLbDYCBfp2k/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 12. IIIT Naya Raipur - CBOW
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'abhay@iiitnr.edu.in'), 'abhay@iiitnr.edu.in', 'Abhay Yadav', 'team_leader', 'CBOW001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'abhay@iiitnr.edu.in'), 'CBOW', 'IIIT Naya Raipur', 'Abhay Yadav')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'abhay@iiitnr.edu.in'), 'MedApp', 'A comprehensive medical application using NLP for healthcare automation.', 'AI/ML', 'https://github.com/CBOW-submission/MedApp', 'https://docs.google.com/presentation/d/1LMxZ_bhKT-AFzhgCINxgFeQAINRsgIvFrz2ZZYwci9g/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 13. IIIT Pune - Sysmon
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'himanshupatel2125@gmail.com'), 'himanshupatel2125@gmail.com', 'Himanshu Patel', 'team_leader', 'SYSMON001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'himanshupatel2125@gmail.com'), 'Sysmon', 'IIIT Pune', 'Himanshu Patel')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'himanshupatel2125@gmail.com'), 'Land Registry System', 'A blockchain-based land registry and verification system.', 'Blockchain', 'https://github.com/Himanshuu2125/Land-Registry', 'https://docs.google.com/presentation/d/1CyZuogGdwi9pXGZSnSiNAjlW6ZnM0MhpgzEANBm-k1s/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 14. IIIT Raichur - Zero-Deadlock
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'cs23b1034@iiitr.ac.in'), 'cs23b1034@iiitr.ac.in', 'K V Jaya Harsha', 'team_leader', 'ZERODEADLOCK001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'cs23b1034@iiitr.ac.in'), 'Zero-Deadlock', 'IIIT Raichur', 'K V Jaya Harsha')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'cs23b1034@iiitr.ac.in'), 'Med-Insight-AI', 'An AI-powered medical diagnosis assistant providing clinical insights.', 'AI/ML', 'https://github.com/dhanushpachabhatla/Agentic-Clinical-Decision-Support-System', 'https://docs.google.com/presentation/d/1iHZItiHKCWkmSyGN3lLGf3quj5lOC8J5nh7Fdsz9U40/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 15. IIIT Surat - DBDT
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'ui23cs63@iiitsurat.ac.in'), 'ui23cs63@iiitsurat.ac.in', 'Shreyansh Vishwakarma', 'team_leader', 'DBDT001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'ui23cs63@iiitsurat.ac.in'), 'DBDT', 'IIIT Surat', 'Shreyansh Vishwakarma')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'ui23cs63@iiitsurat.ac.in'), 'LandTrust', 'A blockchain-based land verification and trust system.', 'Blockchain', 'https://github.com/ShreyanshVishwakarma/LandTrust', 'https://drive.google.com/drive/folders/1qukX32uWYXQUOySGsno1B6VTULDbb7Dn?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 16. IIIT Tiruchirappalli - The Hawkings
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = '231124@iiitt.ac.in'), '231124@iiitt.ac.in', 'Jarugu Kovid Naidu', 'team_leader', 'HAWKINGS001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = '231124@iiitt.ac.in'), 'The Hawkings', 'IIIT Tiruchirappalli', 'Jarugu Kovid Naidu')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = '231124@iiitt.ac.in'), 'Clinical Data Analysis Platform', 'An advanced AI system for comprehensive medical data analysis.', 'AI/ML', 'https://github.com/Kodi006/IIIT_HACKATHON', 'https://www.canva.com/design/DAG_aiI-GhE/9yiCgYJ7nJ7necMCQgVcrw/edit')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 17. IIIT Una - PromptOps
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'sarthakbansal725@gmail.com'), 'sarthakbansal725@gmail.com', 'Sarthak Bansal', 'team_leader', 'PROMPTOPS001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'sarthakbansal725@gmail.com'), 'PromptOps', 'IIIT Una', 'Sarthak Bansal')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'sarthakbansal725@gmail.com'), 'NeoMed', 'A next-generation AI-powered medical assistant platform.', 'AI/ML', 'https://github.com/SarthakB-06/Neomed', 'https://docs.google.com/presentation/d/1Pmk8nssB3dBqJFtVVWvgbvpqou9a1vLJosS3vltqG6Q/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 18. IIIT Vadodara - Zodiac Z408
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = '202451024@iiitvadodara.ac.in'), '202451024@iiitvadodara.ac.in', 'Ashay Gupta', 'team_leader', 'ZODIAC001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = '202451024@iiitvadodara.ac.in'), 'Zodiac Z408', 'IIIT Vadodara', 'Ashay Gupta')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = '202451024@iiitvadodara.ac.in'), 'TitleVault', 'A blockchain-based secure title management and verification system.', 'Blockchain', 'https://github.com/realmCode/TitleVault', 'https://docs.google.com/presentation/d/1HK94z_Ib0qHFi0TBB693ptIlh1U1dtPVylF45MG4PwQ/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 19. IIIT Vadodara-ICD - DivFlow
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'yugbaid4@gmail.com'), 'yugbaid4@gmail.com', 'Yug Baid', 'team_leader', 'DIVFLOW001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'yugbaid4@gmail.com'), 'DivFlow', 'IIIT Vadodara-ICD', 'Yug Baid')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'yugbaid4@gmail.com'), 'Divflow', 'A blockchain-based dividend distribution and management platform.', 'Blockchain', 'https://github.com/Yug-Baid/DivFlow-Web3-Upgrade', 'https://docs.google.com/presentation/d/1wUHS-oLSUAJbW04XPinv-mXHuDhEXA36H2k_JLeTv5k/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 20. IIIT Kancheepuram - SnackOverflow
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = 'cs24b2051@iiitdm.ac.in'), 'cs24b2051@iiitdm.ac.in', 'Efanio Jens', 'team_leader', 'SNACKOVERFLOW001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = 'cs24b2051@iiitdm.ac.in'), 'SnackOverflow', 'IIIT Kancheepuram', 'Efanio Jens')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = 'cs24b2051@iiitdm.ac.in'), 'CuraGen', 'An AI solution for healthcare process automation and clinical support.', 'AI/ML', 'https://github.com/gokulkrishna1686/curagen-new', 'https://docs.google.com/presentation/d/1NV4lCdGXLwKnRJDtOkLDqYbfs_GwLZijWS1dYTSm7CU/edit?usp=sharing')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- 21. IIIT Kurnool - Nocturnal_Coders
INSERT INTO user_profiles (id, email, name, role, team_code, has_joined_team) VALUES
((SELECT id FROM auth.users WHERE email = '123me0031@iiitk.ac.in'), '123me0031@iiitk.ac.in', 'Piyush Gupta', 'team_leader', 'NOCTURNAL001', true)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name, 
    role = EXCLUDED.role, 
    team_code = EXCLUDED.team_code,
    has_joined_team = EXCLUDED.has_joined_team;

INSERT INTO team_info (user_id, team_name, iiit, representative) VALUES
((SELECT id FROM auth.users WHERE email = '123me0031@iiitk.ac.in'), 'Nocturnal_Coders', 'IIIT Kurnool', 'Piyush Gupta')
ON CONFLICT (user_id) DO UPDATE SET 
    team_name = EXCLUDED.team_name, 
    iiit = EXCLUDED.iiit,
    representative = EXCLUDED.representative;

INSERT INTO project_info (user_id, project_name, description, domain, github_url, demo_url) VALUES
((SELECT id FROM auth.users WHERE email = '123me0031@iiitk.ac.in'), 'GenAI-Powered Clinical Note Summarization', 'An advanced GenAI system that summarizes clinical notes and generates medical hypotheses.', 'AI/ML', 'https://github.com/Pg1910/clinical-rag', 'https://drive.google.com/drive/folders/1M6lsdtnNfvnMHiV5oR9smG4wmfHhPLge')
ON CONFLICT (user_id) DO UPDATE SET 
    project_name = EXCLUDED.project_name,
    description = EXCLUDED.description,
    domain = EXCLUDED.domain,
    github_url = EXCLUDED.github_url,
    demo_url = EXCLUDED.demo_url;

-- Create a summary view
SELECT 'Team Leaders Seeded' as status, COUNT(*) as count FROM user_profiles WHERE role = 'team_leader';
