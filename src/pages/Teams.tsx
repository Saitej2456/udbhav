import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail, Instagram } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

const teamCategories = [
  'All',
  'Organizing Team',
  'Sponsorship',
  'Marketing',
  'Design',
  'Ground Team',
  'Video',
  'Ground Design',
  'Website',
  'SPoC',
];

const teamMembers = [
  // Organizing Team (IIIT Sri City Core)
  { id: 1, name: 'Sripathy Siddartha', role: 'Organiser', category: 'Organizing Team' },
  { id: 2, name: 'K Sidharth', role: 'Head - Operations', category: 'Organizing Team', linkedin: 'https://www.linkedin.com/in/siddharth-k-48b408219/', email: 'siddharth@iiits.in', instagram: 'siddharth_k_576', image: '/drive-download-20260106T151449Z-1-001/batch3/Siddharth_K_IIITSRICITY - SIDDHARTH KANCHARLA.JPG' },
  { id: 3, name: 'Shounak Banerjee', role: 'Head - Finance', category: 'Organizing Team', linkedin: 'https://www.linkedin.com/in/shounak-banerjee-819007324', email: 'shounakbanerjee.2006@gmail.com', instagram: 'notshounak06', image: '/drive-download-20260106T151449Z-1-001/batch1/DSC_0273 - SHOUNAK BANERJEE.JPG' },
  { id: 4, name: 'Raniel Babu Chintha', role: 'Chief of Records', category: 'Organizing Team', linkedin: 'Raniel Babu Chinta', email: 'babuchinta.r25@iiits.in', instagram: 'raniel_babu_chinta', image: '/drive-download-20260106T151449Z-1-001/batch3/profile photo - Raniel Babu Chinta.png' },
  { id: 5, name: 'Saptarsi', role: 'Head - Social Media', category: 'Organizing Team', linkedin: 'https://www.linkedin.com/in/saptarsi-saha-72029a358', email: 'saptarsi.s24@iiits.in', instagram: 'itz_sapta_07', image: '/drive-download-20260106T151449Z-1-001/batch3/Saptarsi_IIIT_Sricity - Saptarsi Saha.jpg' },
  { id: 6, name: 'Sai Tej', role: 'Program Director', category: 'Organizing Team' },
  { id: 7, name: 'Sujai', role: 'Core Member', category: 'Organizing Team', email: 'sujaishukla55555@gmail.com', instagram: 'serious_sometimes_', image: '/drive-download-20260106T151449Z-1-001/batch3/Sujai_IIIT_Sricity - sujai shukla.jpg' },

  // Sponsor Team
  { id: 8, name: 'Polepalli Ranga Pallavi', role: 'Sponsorship Lead', category: 'Sponsor Team', linkedin: 'Ranga Pallavi Polepalli', email: 'rangapallavi.p25@iiits.in', instagram: 'Simply.pallavi_', image: '/drive-download-20260106T151449Z-1-001/batch2/Pallavi_IIIT Sricity - ranga Pallavi Polepalli.jpg' },
  { id: 9, name: 'Khyati Jayani Manne', role: 'Sponsorship', category: 'Sponsor Team', linkedin: 'khyati-jayani-manne', email: 'khyati.m25@iiits.in', instagram: 'khyatijayani_07', image: '/drive-download-20260106T151449Z-1-001/batch2/Khyati_IIIT_SriCity - Khyati Jayani Manne.jpg' },
  { id: 10, name: 'Himanshu Jaiswal', role: 'Sponsorship - IIIT Agartala', category: 'Sponsor Team' },
  { id: 11, name: 'Shubham Rakheja', role: 'Sponsorship - IIIT Agartala', category: 'Sponsor Team' },
  { id: 12, name: 'Anish Kumar', role: 'Sponsorship - IIIT Bhopal', category: 'Sponsor Team' },
  { id: 13, name: 'Pradnesh Fernandez A', role: 'Sponsorship - IIIT Dharwad', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/pradneshfernandez', email: '23bds044@iiitdwd.ac.in', instagram: 'pradneshfernandez', image: '/drive-download-20260106T151449Z-1-001/batch1/IMG-20241010-WA0093 - Pradnesh Fernandez A.jpg' },
  { id: 14, name: 'Sparsh Mittal', role: 'Sponsorship - IIIT Dharwad', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/sparsh-mittal-470952324', email: 'sparshmittal358@icloud.com', instagram: '_sparshxd', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_7465 - SPARSH MITTAL IIIT Dharwad.jpeg' },
  { id: 15, name: 'Sathvik Bhat', role: 'Sponsorship - IIIT Bhubaneshwar', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/sathvik-bhat-025451267', email: 'sathvi2018@gmail.com', instagram: 'sathvikbhatofficial', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_20251223_195147_944 - Sathvik Bhat.webp' },
  { id: 16, name: 'Prachi Gupta', role: 'Sponsorship - IIIT Kota', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/prachi-gupta-74122a324', email: 'prachig2808@gmail.com', instagram: 'prachiii28_', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG-20250911-WA0056 - Prachi Gupta.jpg' },
  { id: 17, name: 'Kashish Nandwani', role: 'Sponsorship - IIIT Sonepat', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/kashish-nandwani-284872291/', email: 'kashishnandwani2012@gmail.com', instagram: 'mystique_kashish', image: '/drive-download-20260106T151449Z-1-001/batch3/img - Kashish Nandwani.jpg' },
  { id: 18, name: 'Dinesh Sharma', role: 'Sponsorship - IIITDM Kurnool', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/dinesh-sharma-459245294', email: 'dineshsharma004785@gmail.com', image: '/drive-download-20260106T151449Z-1-001/batch1/Dinesh_IIITDM_Kurnool - Dinesh Sharma.jpeg' },
  { id: 19, name: 'Harshil Patel', role: 'Sponsorship - IIITV-ICD', category: 'Sponsor Team' },

  // Development Team (Website - Next JS)


  { id: 20, name: 'Waqas Omar', role: 'Website Dev - IIIT Kalyani', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/md-waqas-omar-b70572291/', email: 'cse23066@iiitkalyani.ac.in', instagram: 'waqas_omar_11', image: '/drive-download-20260106T151449Z-1-001/batch3/Waqas_IIIT_Kalyani - MD WAQAS OMAR.jpeg' },
  { id: 21, name: 'Indradeep Mandal', role: 'Website Dev - IIIT Kalyani', category: 'Development Team', linkedin: 'www.linkedin.com/in/indradeep-mandal-574686290', email: 'cse23054@iiitkalyani.ac.in', instagram: 'screechingensign_03', image: '/drive-download-20260106T151449Z-1-001/batch3/indradeep.jpeg' },
  { id: 22, name: 'Atharwa Zawar', role: 'Website Dev - IIIT Allahabad', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/atharwa-zawar-476597292', email: 'atharwazawar23@gmail.com', instagram: 'atharwazawar23', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG-20250331-WA0109 - Atharwa Zawar.jpg' },
  { id: 23, name: 'Mokshe Jain', role: 'Website Dev - IIIT Allahabad', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/mokshe', email: 'iib2023034@iiita.ac.in', instagram: 'mokshe_2511', image: '/drive-download-20260106T151449Z-1-001/batch2/Mokshe_IIIT_Allahabad - Mokshe Jain.JPG' },
  { id: 24, name: 'Abhinav Sudhi', role: 'Website Dev - IIIT Kottayam', category: 'Development Team' },
  { id: 25, name: 'Vishnunath A Suresh', role: 'Website Dev - IIIT Kottayam', category: 'Development Team' },
  { id: 26, name: 'Noel Georgi', role: 'Website Dev - IIIT Kottayam', category: 'Development Team' },
  { id: 27, name: 'Rahul Sharma', role: 'Website Dev - IIIT Manipur', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/rahulsharma2k4/', email: 'rahulsharma.hps@gmail.com', instagram: 'sk3tchmeout', image: '/drive-download-20260106T151449Z-1-001/batch2/Rahul Sharma - Rahul Sharma.jpg' },
  { id: 28, name: 'Aishwary', role: 'Website Dev - IIIT Manipur', category: 'Development Team' },
  { id: 29, name: 'Devansh Bohare', role: 'Website Dev - IIIT Surat', category: 'Development Team' },
  { id: 30, name: 'Adarsh Pandey', role: 'Website Dev - IIIT Surat', category: 'Development Team' },
  { id: 31, name: 'Ronit Choudhary', role: 'Website Dev - IIIT Surat', category: 'Development Team' },
  { id: 32, name: 'Ayush Awasthi', role: 'Website Dev - IIIT Vadodara', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/ayush-awasthi-258b23336/', email: 'ayushawasthi2205@gmail.com', instagram: 'ayushawasthi8615', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG-20250919-WA0021 - Ayush Awasthi.jpg' },
  { id: 33, name: 'Priyanshu', role: 'Website Dev - IIIT Vadodara', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/0xanshu', email: 'priyanshu.jsx@gmail.com', instagram: 'i.amm.priyanshu', image: '/drive-download-20260106T151449Z-1-001/batch1/Airbrush-Image-Enhancer-1749977217121 - PRIYANSHU.jpeg' },
  { id: 34, name: 'Divyam Khandelwal', role: 'Website Dev - IIIT Vadodara', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/divyam-khandelwal-b54594338', email: 'divyamproff1521@gmail.com', instagram: 'divvvvvyam', image: '/drive-download-20260106T151449Z-1-001/batch1/1767215449590~4 - Divyam Khandelwal.jpg' },
  { id: 35, name: 'Ansh Ahuja', role: 'Website Dev - IIIT Vadodara', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/ansh-ahuja-3081662b9/', email: 'anshahuja770@gmail.com', instagram: 'ansh_ah0', image: '/drive-download-20260106T151449Z-1-001/batch1/ANSH_AHUJA_IIIT_Vadodara - ANSH AHUJA.png' },

  // Design Team
  { id: 36, name: 'Joshith', role: 'Head of Art Department', category: 'Design Team', email: 'joshith.v25@iiits.in', instagram: 'joshith.vr', image: '/drive-download-20260106T151449Z-1-001/batch1/29787d1a-f437-470d-84cc-4b907bdf9b00 - Joshith chowdary Vunnam reddy.jpeg' },
  { id: 37, name: 'Mani Sharan Raj Mengani', role: 'Head of Video Department', category: 'Design Team', email: 'manisharanraj.m24@iiits.in', instagram: 'Itzmanisushi', image: '/drive-download-20260106T151449Z-1-001/batch2/ManiSharanRaj_IIIT_SriCity - MANI SHARAN RAJ MENGANI.jpg' },
  { id: 38, name: 'Aditya Kumar', role: 'Design - IIIT Dharwad/Raichur', category: 'Design Team' },
  { id: 39, name: 'Sukrit Aryan', role: 'Design - IIIT Bhagalpur', category: 'Design Team' },
  { id: 40, name: 'Maaz Md.', role: 'Design - IIIT Bhagalpur', category: 'Design Team' },
  { id: 41, name: 'Ankur', role: 'Design - IIIT Kota', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/ankur-singh-03ba44380', email: 'ankurp22singh@gmail.com', instagram: 'a_nkurrr', image: '/drive-download-20260106T151449Z-1-001/batch1/Ankur_IIITKota - ANKUR SINGH.webp' },
  { id: 42, name: 'Advik', role: 'Design - IIIT Kota', category: 'Design Team', linkedin: 'Advik Saksena', email: 'saksenaadvik@gmail.com', instagram: 'adic_saksena', image: '/drive-download-20260106T151449Z-1-001/batch1/Document from Advik - ADVIK SAKSENA.jpg' },
  { id: 43, name: 'Muvvala Sahithi', role: 'Design - IIIT Kottayam', category: 'Design Team', linkedin: 'Muvvala Sahithi', email: 'muvvalasahithi24bcs0195@iiitkottayam.ac.in', instagram: 'muvvala_sahithi', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG-20250112-WA0151 - Sahithi Muvvala.jpg' },
  { id: 44, name: 'Nabhaan Abdullah', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 45, name: 'Sahaja Pallapothula', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 46, name: 'Malla Sai Snehaja', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 47, name: 'Gauri Lekshmi Sathya', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 48, name: 'Yogita Kumari', role: 'Design - IIIT Manipur', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/yogita-kumari-090277297', email: 'yogi230101091@iiitmanipur.ac.in', instagram: 'My_graphites_grit', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG-20251205-WA0020 - yogita kumari.jpg' },
  { id: 49, name: 'Akhil Reddy', role: 'Design - IIIT Naya Raipur', category: 'Design Team' },
  { id: 50, name: 'Utkarsh Gupta', role: 'Design - IIIT Naya Raipur', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/utkarsh-gupta-23645a313', email: 'utkarsh24102@iiitnr.edu.in', instagram: 'utkarshgupta3503', image: '/drive-download-20260106T151449Z-1-001/batch3/Utkarsh_Gupta_IIIT_Naya_Raipur - Utkarsh Gupta.jpg' },
  { id: 51, name: 'Saransh Sharma', role: 'Design - IIIT Raichur', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/saransh-sharma-3a3a3a2b5', email: 'cs24b1052@iiitr.ac.in', instagram: '__.the_slayer._', image: '/drive-download-20260106T151449Z-1-001/batch1/20251127_082110 - Saransh Sharma.jpg' },
  { id: 52, name: 'Varshava', role: 'Lead Design', category: 'Design Team' },
  { id: 53, name: 'Rehan Gupta', role: 'Design - IIIT Una', category: 'Design Team', linkedin: 'Rehan Gupta', email: '24152@iiitu.ac.in', instagram: 'rehan_gupta78', image: '/drive-download-20260106T151449Z-1-001/batch2/Rehan_IIIT_Una - Rehan Gupta.png' },
  { id: 54, name: 'Raj Gopal', role: 'Design - IIIT Una', category: 'Design Team', linkedin: 'Raj Gopal Lavuri', email: 'rajlavuri077@gmail.com', instagram: 'bobby__xox__', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_3346 - Raj Lavuri.JPG' },
  { id: 55, name: 'Rishi Menpara', role: 'Design - IIITV-ICD', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/rishimenpara', email: 'reesheemenpara1@gmail.com', instagram: 'rishi_menpara', image: '/drive-download-20260106T151449Z-1-001/batch1/20250601_122628 - Reeshee Menpara.jpg' },
  { id: 56, name: 'Shivam Vats', role: 'Design - IIITDM Kurnool', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/vatshivam/', email: '123ad0028@iiitk.ac.in', image: '/drive-download-20260106T151449Z-1-001/batch3/ShivamVats_IIITDM_Kurnool - 123AD0028 Shivam.png' },

  // Marketing Team
  { id: 57, name: 'Pratyusha Sathpathy', role: 'Marketing - IIIT Bhubaneshwar', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/pratyusha-satapathy-21223a330', email: 'b224037@iiit-bh.ac.in', instagram: 'pratyushasatapathy44', image: '/drive-download-20260106T151449Z-1-001/batch1/1000195160 - Pratyusha Satapathy.jpg' },
  { id: 58, name: 'Keertan Kumar Singh', role: 'Marketing - IIIT Bhubaneshwar', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/keertan-kumar-kk', email: 'keertanreads@gmail.com', instagram: 'i.kk__', image: '/drive-download-20260106T151449Z-1-001/batch2/Keertan _IIIT_Bhubaneswar - Keertan Kumar Singh.jpg' },
  { id: 59, name: 'Tirtha Desai', role: 'Marketing - IIIT Bhubaneshwar', category: 'Marketing Team' },
  { id: 60, name: 'Ayush Prasad', role: 'Marketing - IIIT Kalyani', category: 'Marketing Team' },
  { id: 61, name: 'Aysha Lintha', role: 'Marketing - IIIT Kottayam', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/aysha-lintha-a3b9341b7', email: 'ayshalintha1@gmail.com', instagram: 'linthaysha', image: '/drive-download-20260106T151449Z-1-001/batch1/Aysha_Lintha_IIIT_Kottayam - AYSHA LINTHA.jpg' },
  { id: 62, name: 'Poshika Bhatnagar', role: 'Marketing - IIIT Sonepat', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/poshika-bhatnagar-b1aa8628b', email: 'poshikabhatnagar777@gmail.com', instagram: 'poshikabhatnagar', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_20250507_191330 - Poshika Bhatnagar.jpg' },
  { id: 63, name: 'Shubham', role: 'Marketing - IIIT Tiruchirappalli', category: 'Marketing Team' },
  { id: 64, name: 'Siddhant Dixit', role: 'Marketing - IIIT Kota', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/siddhant-dixit', email: 'dixitsiddhant88@gmail.com', instagram: 'Siddhant.dixittt', image: '/drive-download-20260106T151449Z-1-001/batch3/SiddhantDixit_IIIT_KOTA - siddhant dixit.jpeg' },
  { id: 65, name: 'Hetanshu Bhambhani', role: 'Marketing - IIIT Sri City', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/hetanshu-bhambhani', email: 'hetanshuchetanbhai@iiits.in', instagram: 'hetanshu._457', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG20250820182201 - Hetanshu Chetanbhai Bhambhani.jpg' },
  { id: 66, name: 'V V Sasidhar', role: 'Marketing - IIIT Sricity', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/sasidhar-07-', email: 'venkatasasidhar.v25@iiits.in', instagram: '_sasidhar_07_', image: '/drive-download-20260106T151449Z-1-001/batch3/Sasidhar_IIIT_Sricity - Venkata Sasidhar Vanapamula.jpg' },
  { id: 67, name: 'Aryaman Saraf', role: 'Marketing - IIIT Sri City', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/aryaman-saraf', email: 'aryamansaraf12@gmail.com', instagram: 't_o_x_i_c_g_a_m_e_r', image: '/drive-download-20260106T151449Z-1-001/batch1/AryamanSaraf_IIIT_SriCity - Aryaman Saraf.png' },
  { id: 68, name: 'Raj Gopal', role: 'Marketing - IIIT Una', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/raj-gopal-lavuri', email: 'rajlavuri077@gmail.com', instagram: 'bobby__xox__', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_3346 - Raj Lavuri.JPG' },
  { id: 69, name: 'S.VarunRaj', role: 'Marketing - IIIT Ranchi', category: 'Marketing Team', linkedin: 'https://www.linkedin.com/in/varun-rajss', email: 'varunrajss07@gmail.com', instagram: 'varunn_raaajj', image: '/drive-download-20260106T151449Z-1-001/batch3/VarunRaj_IIIT Ranchi - VarunRaj.jpg' },

  // Ground Team
  { id: 70, name: 'Khyati Jayani Manne', role: 'Ground Team - IIIT Sri City', category: 'Ground Team', linkedin: 'https://www.linkedin.com/in/khyati-jayani-manne', email: 'khyati.m25@iiits.in', instagram: 'khyatijayani_07', image: '/drive-download-20260106T151449Z-1-001/batch2/Khyati_IIIT_SriCity - Khyati Jayani Manne.jpg' },
  { id: 71, name: 'Namish Bishnoi', role: 'Ground Team - IIITS', category: 'Ground Team', linkedin: 'https://www.linkedin.com/in/namish-bishnoi-0a38b3390', email: 'namish.b25@iiits.in', image: '/drive-download-20260106T151449Z-1-001/batch1/20251206_200727 - Namish Bishnoi.jpg' },
  { id: 72, name: 'Polepalli Ranga Pallavi', role: 'Ground Team - IIIT Sricity', category: 'Ground Team', linkedin: 'https://www.linkedin.com/in/ranga-pallavi-polepalli', email: 'rangapallavi.p25@iiits.in', instagram: 'Simply.pallavi_', image: '/drive-download-20260106T151449Z-1-001/batch2/Pallavi_IIIT Sricity - ranga Pallavi Polepalli.jpg' },
  { id: 73, name: 'Kakumani Subba Sai Sahasra', role: 'Ground Team - IIIT Sricity', category: 'Ground Team', linkedin: 'https://www.linkedin.com/in/sai-sahasra-k-s', email: 'subbasaisahasra.k25@iiits.in', instagram: 'sahasraa__02', image: '/drive-download-20260106T151449Z-1-001/batch2/Sai_Sahasra_IIITS - SUBBA SAI SAHASRA KAKUMANI.jpg' },
  { id: 74, name: 'Hamsini Uppalapati', role: 'Ground Team - IIIT Sricity', category: 'Ground Team', linkedin: 'https://www.linkedin.com/in/hamsini-uppalapati-451631389', email: 'hamsini.u25@iiits.in', instagram: '_hxmsinii_', image: '/drive-download-20260106T151449Z-1-001/batch1/Hamsini_iiitsricity - Hamsini Uppalapati.jpg' },
  { id: 75, name: 'Naga Hanvitha Gurram', role: 'Ground Team - IIIT Sricity', category: 'Ground Team', email: 'nagahanvitha.g25@iiits.in', instagram: 'lm0_honeyy', image: '/drive-download-20260106T151449Z-1-001/batch1/Hanvitha_IIIT - NAGA HANVITHA GURRAM.png' },
  { id: 76, name: 'A Thirumala Sai', role: 'Ground Team - IIIT Sricity', category: 'Ground Team', email: 'jamalanaik.a25@gmail.com', instagram: 'M.r_sai_naik', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_2954 - Thirumala Sai Jamla Naik Ajmeer.jpeg' },
  { id: 77, name: 'Tanvi Mudili', role: 'Ground Team - IIIT Sricity', category: 'Ground Team', linkedin: 'https://www.linkedin.com/in/tanvi-mudili-b64aa9380', email: 'mudilitanvi@gmail.com', instagram: 'tanvi.131', image: '/drive-download-20260106T151449Z-1-001/batch1/68e00e75-1b33-446b-96a1-7ce3a5c1b049-1_all_14129 - MUDILI TANVI.jpg' },

  // Ground Design
  { id: 78, name: 'Polepalli Ranga Pallavi', role: 'Ground Design - IIIT Sricity', category: 'Ground Design', linkedin: 'https://www.linkedin.com/in/ranga-pallavi-polepalli', email: 'rangapallavi.p25@iiits.in', instagram: 'Simply.pallavi_', image: '/drive-download-20260106T151449Z-1-001/batch2/Pallavi_IIIT Sricity - ranga Pallavi Polepalli.jpg' },
  { id: 79, name: 'Kakumani Subba Sai Sahasra', role: 'Ground Design - IIIT Sricity', category: 'Ground Design', linkedin: 'https://www.linkedin.com/in/sai-sahasra-k-s', email: 'subbasaisahasra.k25@iiits.in', instagram: 'sahasraa__02', image: '/drive-download-20260106T151449Z-1-001/batch2/Sai_Sahasra_IIITS - SUBBA SAI SAHASRA KAKUMANI.jpg' },
  { id: 80, name: 'Hamsini Uppalapati', role: 'Ground Design - IIIT Sricity', category: 'Ground Design', linkedin: 'https://www.linkedin.com/in/hamsini-uppalapati-451631389', email: 'hamsini.u25@iiits.in', instagram: '_hxmsinii_', image: '/drive-download-20260106T151449Z-1-001/batch1/Hamsini_iiitsricity - Hamsini Uppalapati.jpg' },
  { id: 81, name: 'Naga Hanvitha Gurram', role: 'Ground Design - IIIT Sricity', category: 'Ground Design', email: 'nagahanvitha.g25@iiits.in', instagram: 'lm0_honeyy', image: '/drive-download-20260106T151449Z-1-001/batch1/Hanvitha_IIIT - NAGA HANVITHA GURRAM.png' },
  { id: 82, name: 'Joshith VR', role: 'Ground Design - IIIT SRICITY', category: 'Ground Design', email: 'joshith.v25@iiits.in', instagram: 'joshith.vr', image: '/drive-download-20260106T151449Z-1-001/batch1/29787d1a-f437-470d-84cc-4b907bdf9b00 - Joshith chowdary Vunnam reddy.jpeg' },

  // Video Team
  { id: 83, name: 'Andhavarapu Gayatri Devi', role: 'Video - IIIT Sricity', category: 'Video Team', email: 'gayatridevi.a25@iiits.in', instagram: 'gayatridevi_andhavarapu', image: '/drive-download-20260106T151449Z-1-001/Gayatri_devi_IIIT_sricity - Gayatri Devi Andhavarapu.jpg' },
  { id: 84, name: 'A Thirumala Sai', role: 'Video - IIIT Sricity', category: 'Video Team', email: 'jamalanaik.a25@gmail.com', instagram: 'M.r_sai_naik', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_2954 - Thirumala Sai Jamla Naik Ajmeer.jpeg' },
  { id: 85, name: 'Harshavarshan', role: 'Video - IIIT SRICITY', category: 'Video Team', email: 'harshavardhannaik.d25@iiits.in', instagram: 'Harshaa_34_', image: '/drive-download-20260106T151449Z-1-001/batch1/Gemini_Generated_Image_8klkf98klkf98klk - HARSHAVARDHAN NAIK DARAVATH.jpeg' },
  { id: 86, name: 'Srishant Kumar', role: 'Video - IIIT Agartala', category: 'Video Team', linkedin: 'https://linkedin.com/in/iamsrishant', email: 'srishant054@gmail.com', instagram: 'iamsrishant', image: '/drive-download-20260106T151449Z-1-001/batch3/Srishant_Kumar_IIIT_AGARTALA - Srishant Kumar.jpeg' },

  // SPoC
  { id: 87, name: 'Bhupendra Kumar', role: 'SPoC - IIIT SURAT', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/bhupendra-kumar-217923294/', email: 'errorbhupendra481@gmail.com', image: '/drive-download-20260106T151449Z-1-001/batch1/Bhupendrakumar_IIITSURAT - Bhupendra Kumar.jpg' },
  { id: 88, name: 'Sharad Kumar Dubey', role: 'SPoC - IIITDM Kancheepuram', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/sharad-kumar-dubey/', email: 'cs23i1052@iiitdm.ac.in', instagram: '__sha_ey__', image: '/drive-download-20260106T151449Z-1-001/batch2/SHARAD - CS23I1052 SHARAD KUMAR DUBEY.png' },
  { id: 89, name: 'Hasini Mende', role: 'SPoC - IIIT Sricity', category: 'SPoC', email: 'hasini.m25@iiits.in', instagram: 'hasini.mende', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_20251227_113252 - Hasini Mende.jpg' },
  { id: 90, name: 'Shivansh Agrawal', role: 'SPoC - IIIT Sonepat', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/shivansh-agrawal-0920b5214/', email: 'shivansh.agrprof@gmail.com', instagram: 'shivanshagr08', image: '/drive-download-20260106T151449Z-1-001/batch3/Shivansh_Agrawal_12312003 - Shivansh Agrawal.jpg' },
  { id: 91, name: 'Ayush Soni', role: 'SPoC - IIIT Tiruchirappalli', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/soniayush12', email: 'soniayush312@gmail.com', instagram: 'soniayush_12', image: '/drive-download-20260106T151449Z-1-001/batch1/Ayush soni IIIT Trichy - Ayush Soni.jpg' },
  { id: 92, name: 'Sujal Negi', role: 'SPoC - IIITDM Kurnool', category: 'SPoC', linkedin: 'https://in.linkedin.com/in/sujalnegi128005', email: 'sujalnegi2805@gmail.com', instagram: 'sujal128005', image: '/drive-download-20260106T151449Z-1-001/batch1/20250726_155518 - Sujal.jpg' },
  { id: 93, name: 'Darsh Dave', role: 'SPoC - IIIT Bhopal', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/darsh-dave-120062291/', email: 'darsh.dave999@gmail.com', instagram: 'darsh_theway10', image: '/drive-download-20260106T151449Z-1-001/batch1/Darsh Dave_IIIT_Bhopal - DARSH DAVE.JPG' },
  { id: 94, name: 'Jugal Kakkat', role: 'SPoC - IIIT Kottayam', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/jugal-kakkat', email: 'jugal23bcs41@iiitkottayam.ac.in', instagram: 'jugxl', image: '/drive-download-20260106T151449Z-1-001/batch2/Jugal_IIIT_Kottayam - JUGAL KAKKAT -IIITK.JPG' },
  { id: 95, name: 'Shivansh Sisodia', role: 'SPoC - IIIT Bhubaneswar', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/shivansh-sisodia-541391284', email: 'b123120@iiit-bh.ac.in', instagram: 'kyayaarshivansh', image: '/drive-download-20260106T151449Z-1-001/batch3/Shivansh_IIIT_Bhubaneswar - Shivansh Sisodia.jpeg' },
  { id: 96, name: 'Darshan Patel', role: 'SPoC - IIIT Vadodara', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/darshan-patel-1713062a4', email: 'darshanpatelgdh@gmail.com', instagram: 'mrquantum_1915', image: '/drive-download-20260106T151449Z-1-001/batch1/DarshanPatel_IIIT_Vadodara - Darshan Patel.jpeg' },
  { id: 97, name: 'Prem Sagar', role: 'SPoC - IIIT Dharwad', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/prem-sagar-t-k', email: '23bds065@iiitdwd.ac.in', instagram: 'premsagar.tk', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_20260101_094650 - THIRUPATI KOPPERA PREM SAGAR IIIT Dharwad.jpg' },
  { id: 98, name: 'Sanidhya Madeshia', role: 'SPoC - IIIT Kota', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/sanidhya-madeshia-620099293/', email: 'sanidhyamadheshia@gmail.com', instagram: 'ig._sanidhya', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG_20251116_121916347_HDR - Sanidhya Madheshia.jpg' },
  { id: 99, name: 'Shivang Tonde', role: 'SPoC - IIIT Nagpur', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/shivang-tonde-56757528a/', email: 'ts@iiitn.ac.in', instagram: 'shivang_tonde_18', image: '/drive-download-20260106T151449Z-1-001/batch3/ShivangTonde_IIIT_Nagpur - Technical Master.jpeg' },
  { id: 100, name: 'Savya Sanchi Sharma', role: 'SPoC - IIIT DHARWAD', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/savyasanchi-sharma', email: 'dsaisoc@iiitdwd.ac.in', instagram: 'dsaisoc_iiitdwd', image: '/drive-download-20260106T151449Z-1-001/batch3/Savya_Sanchi_Sharma_IIIT_Dharwad - Data Science and Artificial Intelligence Society IIIT Dharwad.png' },
  { id: 101, name: 'Siddharth', role: 'SPoC - IIIT Naya Raipur', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/siddharth-a35a36324', email: 'siddharth24102@iiitnr.edu.in', instagram: '_siddhrthh', image: '/drive-download-20260106T151449Z-1-001/batch3/Siddharth_IIIT_Naya_Raipur - Siddharth Siddharth.jpg' },
  { id: 102, name: 'Srishant Kumar', role: 'SPoC - IIIT Agartala', category: 'SPoC', linkedin: 'https://linkedin.com/in/iamsrishant', email: 'srishant054@gmail.com', instagram: 'iamsrishant', image: '/drive-download-20260106T151449Z-1-001/batch3/Srishant_Kumar_IIIT_AGARTALA - Srishant Kumar.jpeg' },
  { id: 103, name: 'Amrita Kadam', role: 'SPoC - IIIT Raichur', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/amrita-kadam-2a293b287/', email: 'amrita0205kadam@gmail.com', instagram: 'anomaly4509902', image: '/drive-download-20260106T151449Z-1-001/batch1/Amrita_IIIT_Raichur - Sujata C.jpg' },
  { id: 104, name: 'S.VarunRaj', role: 'SPoC - IIIT Ranchi', category: 'SPoC', linkedin: 'https://www.linkedin.com/in/varun-rajss', email: 'varunrajss07@gmail.com', instagram: 'varunn_raaajj', image: '/drive-download-20260106T151449Z-1-001/batch3/VarunRaj_IIIT Ranchi - VarunRaj.jpg' },

  // Additional Sponsorship Members
  { id: 105, name: 'Anand Khumkar', role: 'Sponsorship - IIIT SRI CITY', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/anand-khumkar-62aa1a37a', email: 'khumkaranand.s25@iiits.in', instagram: 'i_m_just_ask', image: '/drive-download-20260106T151449Z-1-001/batch2/IMG-20251209-WA0269~2 - Anand Khumkar.jpg' },
  { id: 106, name: 'V V Sasidhar', role: 'Sponsorship - IIIT Sricity', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/sasidhar-07-', email: 'venkatasasidhar.v25@iiits.in', instagram: '_sasidhar_07_', image: '/drive-download-20260106T151449Z-1-001/batch3/Sasidhar_IIIT_Sricity - Venkata Sasidhar Vanapamula.jpg' },
  { id: 107, name: 'Sricharan', role: 'Sponsorship - IIIT Sri city', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/sricharan-k', email: 'Sricharan.k25@iiits.in', instagram: 'sk7770z', image: '/drive-download-20260106T151449Z-1-001/batch3/Screenshot 2025-12-28 230918 - Sricharan Kancharla.png' },
  { id: 108, name: 'Tanvi Mudili', role: 'Sponsorship - IIIT Sricity', category: 'Sponsor Team', linkedin: 'https://www.linkedin.com/in/tanvi-mudili-b64aa9380', email: 'mudilitanvi@gmail.com', instagram: 'tanvi.131', image: '/drive-download-20260106T151449Z-1-001/batch1/68e00e75-1b33-446b-96a1-7ce3a5c1b049-1_all_14129 - MUDILI TANVI.jpg' },

  // Additional Design Members
  { id: 109, name: 'Piyali Barman', role: 'Design - IIIT Sri city', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/piyali-barman-424085381', email: 'piyali.b25@iiits.in', instagram: '@piyalii__', image: '/drive-download-20260106T151449Z-1-001/batch2/Piyali_Barman_IIIT_Sricity - Piyali Barman.jpg' },
  { id: 110, name: 'Sujai', role: 'Design - IIITS', category: 'Design Team', email: 'sujaishukla55555@gmail.com', instagram: 'serious_sometimes_', image: '/drive-download-20260106T151449Z-1-001/batch3/Sujai_IIIT_Sricity - sujai shukla.jpg' },
  { id: 111, name: 'Varshini M', role: 'Design - IIIT Tiruchirapalli', category: 'Design Team', linkedin: 'https://www.linkedin.com/in/varshini-munipalli', email: 'varshini.munipalli7@gmail.com', instagram: 'var_shini_5', image: '/drive-download-20260106T151449Z-1-001/batch3/Varshini_IIIT_Tiruchirappalli - Shiny Varsha.jpg' },

  // Additional Website Members
  { id: 112, name: 'Gandra Rithvik Rao', role: 'Website Dev - IIIT SriCity', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/rithvik-rao-8600882a2/', email: 'rithvikrao.g23@iiits.in', instagram: 'rithvik1101', image: '/drive-download-20260106T151449Z-1-001/batch2/Rithvik_IIIT_SRICITY - RITHVIK RAO GANDRA.jpeg' },
  { id: 113, name: 'Shivansh Agrawal', role: 'Website Dev - IIIT Sonepat', category: 'Development Team', linkedin: 'https://www.linkedin.com/in/shivansh-agrawal-0920b5214/', email: 'shivansh.agrprof@gmail.com', instagram: 'shivanshagr08', image: '/drive-download-20260106T151449Z-1-001/batch3/Shivansh_Agrawal_12312003 - Shivansh Agrawal.jpg' },
];

const Teams = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMembers = teamMembers.filter(member => {
    return selectedCategory === 'All' || member.category === selectedCategory;
  });

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Our Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind UDBHAV
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {teamCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Team Members by Category */}
          {selectedCategory === 'All' ? (
            Object.entries(groupedMembers).map(([category, members], categoryIndex) => (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <SectionHeading title={category} align="left" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="text-center group" hover>
                        {/* Avatar */}
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-colors overflow-hidden">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

                        {/* Social Links */}
                        <div className="flex justify-center gap-2 mt-2">
                          {member.linkedin ? (
                            <a
                              href={member.linkedin.startsWith('http') ? member.linkedin : `https://www.linkedin.com/in/${member.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                            </a>
                          ) : (
                            <span className="w-8 h-8 rounded-lg bg-card flex items-center justify-center opacity-30">
                              <Linkedin className="w-4 h-4 text-muted-foreground" />
                            </span>
                          )}
                          {member.instagram ? (
                            <a
                              href={`https://www.instagram.com/${member.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary" />
                            </a>
                          ) : (
                            <span className="w-8 h-8 rounded-lg bg-card flex items-center justify-center opacity-30">
                              <Instagram className="w-4 h-4 text-muted-foreground" />
                            </span>
                          )}
                          {member.email ? (
                            <a
                              href={`mailto:${member.email}`}
                              className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                            </a>
                          ) : (
                            <span className="w-8 h-8 rounded-lg bg-card flex items-center justify-center opacity-30">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                            </span>
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))
          ) : (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard className="text-center group" hover>
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-colors overflow-hidden">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{member.role}</p>

                      {/* Social Links */}
                      <div className="flex justify-center gap-2 mt-2 relative z-10"> {/* Added z-10 to ensure it's on top */}
                        {member.linkedin && (
                          <a
                            href={
                              member.linkedin.startsWith('http')
                                ? member.linkedin
                                : `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.linkedin)}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors"
                          // Removed e.stopPropagation() unless you have an onClick on the Card itself
                          >
                            <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </a>
                        )}

                        {member.instagram && member.instagram.trim() !== "" && (
                          <a
                            href={`https://www.instagram.com/${member.instagram.replace('@', '').trim()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors"
                          >
                            <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </a>
                        )}

                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors"
                          >
                            <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </a>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {filteredMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No team members found for the selected filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Teams;
