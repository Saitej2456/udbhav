import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Globe,
  Mail,
  Phone,
  ArrowLeft,
  Award,
  BookOpen,
  Instagram,
  Linkedin,
  Building,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { iiitsData } from "@/data/iiits";

// Import IIIT images
import iiitAgartala1 from "@/assets/photos/iiit-agartala-1.jpg";
import iiitAgartala2 from "@/assets/photos/iiit-agartala-2.jpg";
import iiitAllahabad from "@/assets/photos/iiit-allahabad.jpg";
import iiitDharwad from "@/assets/photos/iiit-dharwad.jpg";
import iiitSriCity from "@/assets/photos/iiit-sri-city.jpg";
import iiitTrichy from "@/assets/photos/iiit-trichy.jpg";
import iiitUna from "@/assets/photos/iiit-una.jpg";
import classroom1 from "@/assets/photos/classroom-1.jpg";
import classroom2 from "@/assets/photos/classroom-2.jpg";
import hackathon1 from "@/assets/photos/hackathon-1.jpg";

// Comprehensive IIIT data with all details
const iiitDetails: Record<
  string,
  {
    name: string;
    location: string;
    state: string;
    established: number;
    students: number;
    description: string;
    website: string;
    achievements: string[];
    contact: {
      email: string;
      phone: string;
      poc: string;
    };
    club: {
      name: string;
      instagram: string;
      linkedin: string;
    };
    images: string[];
  }
> = {
  "iiit-sri-city": {
    name: "IIIT Sri City",
    location: "Sri City, Chittoor District",
    state: "Andhra Pradesh",
    established: 2013,
    students: 900,
    description: 'The Indian Institute of Information Technology, Sri City is an educational institute of national importance located in Sri City, Tirupati district, Andhra Pradesh, India. It was created by the Ministry of Human Resource Development, Government of India, under a partnership with the Andhra Pradesh Government and Sri City consortium. The IIIT campus at Sri City is spread over 80 acres (32 ha). The institute is run by the Board of Governors of the IIIT Society. The Board of Governors include representatives of MHRD, GoAP, and Industry Partners as well as eminent people from academia, industry, and civil society.',
    website: 'https://www.iiits.ac.in',
    achievements: [
      "Organizing Institute for UDBHAV 2025",
      "Strong industry partnerships with top tech companies",
      "Research excellence in AI/ML and Data Science",
      "Active entrepreneurship ecosystem",
    ],
    contact: {
      email: "udbhav@iiits.ac.in",
      phone: "8790327970",
      poc: "Sripathy Siddartha",
    },
    club: {
      name: "ENIGMA",
      instagram: "enigmaiiits",
      linkedin: "https://www.linkedin.com/company/enigmaiiits/",
    },
    images: ["/photos/SriCity1.jpg", "/photos/SriCity2.jpg", "/photos/SriCity3.jpg"],
  },
  "iiit-agartala": {
    name: "IIIT Agartala",
    location: "Agartala",
    state: "Tripura",
    established: 2018,
    students: 350,
    description: 'The Indian Institute of Information Technology, Agartala is one among the 20 IIITs established under the non-profit Public-Private Partnership (PPP) model. It is presently functioning inside the campus of NIT Agartala until the construction of a 52-acre permanent campus in Bodhjung Nagar near Agartala is completed.',
    website: 'https://iiitagartala.ac.in/',
    achievements: [
      "Growing research in emerging technologies",
      "Strong focus on regional tech development",
      "Active coding community",
      "Industry collaborations",
    ],
    contact: {
      email: "info@iiitagar.ac.in",
      phone: "9471649526",
      poc: "Srishant Kumar",
    },
    club: {
      name: "GDG IIIT Agartala",
      instagram: "gdgiiitagartala",
      linkedin: "https://www.linkedin.com/company/gdg-iiit-agartala/",
    },
    images: ["/photos/Agartala1.jpg", "/photos/Agartala2.jpg", "/photos/Agartala3.jpg"],
  },
  "iiit-allahabad": {
    name: "IIIT Allahabad",
    location: "Jhalwa, Prayagraj",
    state: "Uttar Pradesh",
    established: 1999,
    students: 3000,
<<<<<<< HEAD
    description:
      "IIIT Allahabad is one of the oldest and most prestigious IIITs in India. Established in 1999, it has been a pioneer in IT education and research. The institute is known for its strong academic programs, world-class faculty, and excellent placement record.",
    website: "https://www.iiita.ac.in",
=======
    description: 'The Indian Institute of Information Technology, Allahabad (IIIT Allahabad) is a premier public university located in Jhalwa, Prayagraj (previously known as Allahabad), in Uttar Pradesh. It is one of the twenty-five Indian Institutes of Information Technology listed by the Ministry of Education (India).',
    website: 'https://www.iiita.ac.in',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    achievements: [
      "Among the top IIITs in India",
      "Excellent placement record with top companies",
      "Strong research output in AI, Cybersecurity",
      "Alumni in leadership positions globally",
    ],
    contact: {
<<<<<<< HEAD
      email: "coordinator@iiita.ac.in",
      phone: "7248119726",
      poc: "Naitik Jain",
    },
    club: {
      name: "Geekhaven",
      instagram: "geekhaven_iiita",
      linkedin: "https://www.linkedin.com/company/geekhaven-iiita",
=======
      email: 'iib2023036@iiita.ac.in',
      phone: '7248119726',
      poc: 'Naitik Jain',
    },
    club: {
      name: 'Geekhaven',
      instagram: 'geekhaven_iiita',
      linkedin: 'https://www.linkedin.com/company/geekhaven-iiita/?originalSubdomain=in',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    },
    images: ["/photos/Allahabad1.jpg", "/photos/Allahabad2.jpg", "/photos/Allahabad3.jpg"],
  },
  "iiit-dharwad": {
    name: "IIIT Dharwad",
    location: "Dharwad",
    state: "Karnataka",
    established: 2015,
    students: 500,
<<<<<<< HEAD
    description:
      "IIIT Dharwad is a leading technical institute in Karnataka, established in 2015. The institute focuses on cutting-edge research in data science, AI, and related fields, contributing to the growth of the IT sector in the region.",
    website: "https://www.iiitdwd.ac.in",
=======
    description: 'The Indian Institute of Information Technology, Dharwad (IIIT Dharwad) is an Institute of National Importance set up under a non-profit, Public-Private-Partnership (PPP) model by the Ministry of Education (India). It is an academic and research institute funded by the Government of India, the Government of Karnataka and industry partner KEONICS.',
    website: 'https://www.iiitdwd.ac.in',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    achievements: [
      "Strong DSAI research focus",
      "Industry-academia collaborations",
      "Growing placement record",
      "Active tech community",
    ],
    contact: {
<<<<<<< HEAD
      email: "info@iiitdwd.ac.in",
      phone: "6263786699",
      poc: "Savya Sanchi Sharma",
=======
      email: 'savyasanchisharma.official@gmail.com',
      phone: '6263786699',
      poc: 'Savya Sanchi Sharma',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    },
    club: {
      name: "DSAI Society",
      instagram: "dsai_iiitdwd",
      linkedin: "https://www.linkedin.com/company/dsai-society-iiit-dharwad/",
    },
    images: ["/photos/Dharwad1.jpg", "/photos/Dharwad2.jpg", "/photos/Dharwad3.jpg"],
  },
  "iiit-tiruchirappalli": {
    name: "IIIT Tiruchirappalli",
    location: "Tiruchirappalli",
    state: "Tamil Nadu",
    established: 2013,
    students: 500,
<<<<<<< HEAD
    description:
      "IIIT Tiruchirappalli is a prominent technical institute in Tamil Nadu established in 2013. Known for its robotics research and strong technical programs, it produces graduates who excel in both academia and industry.",
    website: "https://www.iiitt.ac.in",
=======
    description: 'The Indian Institute of Information Technology Tiruchirappalli (IIIT-T) is a higher education academic and research institute located in Tiruchirappalli, Tamil Nadu, India. It is one of the Indian Institutes of Information Technology (IIITs) established under the non-profit Public-Private Partnership and is funded by the Government of India, Government of Tamil Nadu and the Indian industry partners in the ratio of 50:35:15. Industry partners include Tata Consultancy Services (TCS), Cognizant Technology Solutions (CTS), Infosys, Ramco Systems, ELCOT, and Navitas (Take Solutions). Together with the other IIITs, it has been granted the status of Institute of National importance in 2017.',
    website: 'https://www.iiitt.ac.in',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    achievements: [
      "Leading robotics research",
      "Strong placement record",
      "Industry partnerships",
      "Active student clubs",
    ],
    contact: {
<<<<<<< HEAD
      email: "info@iiitt.ac.in",
      phone: "7339889592",
      poc: "Ayush Soni",
=======
      email: 'Soniayush312@gmail.com',
      phone: '7339889592',
      poc: 'Ayush Soni',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    },
    club: {
      name: "Robotics Club",
      instagram: "",
      linkedin: "",
    },
    images: ["/photos/Tiruchy1.jpg", "/photos/Tiruchy2.jpg", "/photos/Tiruchy3.jpg"],
  },
  "iiit-una": {
    name: "IIIT Una",
    location: "Una",
    state: "Himachal Pradesh",
    established: 2014,
    students: 600,
<<<<<<< HEAD
    description:
      "IIIT Una is located in the scenic hills of Himachal Pradesh. Established in 2014, it combines quality technical education with a serene learning environment. The institute is known for its focus on emerging technologies and strong student community.",
    website: "https://www.iiitu.ac.in",
=======
    description: 'The Indian Institute of Information Technology Una (IIIT, Una) is one of the Indian Institutes of Information Technology located at Vill. Saloh, Teh. Haroli, Distt. Una Himachal Pradesh-177209, Himachal Pradesh.. Established in 2014, it was recognized as an Institute of National Importance. IIIT Una is a joint venture of the Ministry of Human Resource Development, Government of India, the Govt. of Himachal Pradesh, with Industries in Public-Private Partnership model. The industries are H.P. Power Corporation and H.P. Power Transmission Corporation.',
    website: 'https://www.iiitu.ac.in',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    achievements: [
      "Growing research output",
      "Active coding community (FORCE)",
      "Industry partnerships",
      "Strong alumni network",
    ],
    contact: {
<<<<<<< HEAD
      email: "info@iiitu.ac.in",
      phone: "9350419261",
      poc: "Nikhil Arora",
=======
      email: '23140@iiitu.ac.in',
      phone: '9350419261',
      poc: 'Nikhil Arora',
>>>>>>> b4304fd4953a66dc082f01decb8fe70f8c1de86e
    },
    club: {
      name: "FORCE",
      instagram: "force.iiitu",
      linkedin: "https://www.linkedin.com/company/force-iiitu/",
    },
    images: ["/photos/Una1.jpg", "/photos/Una2.jpg", "/photos/Una3.jpg"],
  },
  'iiit-kalyani': {
    name: 'IIIT Kalyani',
    location: 'Kalyani',
    state: 'West Bengal',
    established: 2014,
    students: 550,
    description: 'The Indian Institute of Information Technology, Kalyani (IIIT Kalyani) is an Indian Institute of Information Technology located at Kalyani, West Bengal and is one of the 31 IIITs set up by government of India. The institute was set up by the Government of India Ministry of Human Resource Development, Government of West Bengal and industry partners (Coal India and Rolta) using the not-for-profit Public Private Partnership (N-PPP) model, at a ratio of 50:35:15 respectively between three parties.',
    website: 'https://www.iiitkalyani.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'cse22042@iiitkalyani.ac.in',
      phone: '9848872618',
      poc: 'Dhanavath Samith Raj',
    },
    club: {
      name: "Student's GYMKHANA",
      instagram: 'iiitkalyani_gymkhana',
      linkedin: 'https://www.linkedin.com/company/gymkhana-iiit-kalyani/',
    },
    images: ["/photos/Kalyani1.png", "/photos/Kalyani2.png", "/photos/Kalyani3.png"],
  },
  'iiit-sonepat': {
    name: 'IIIT Sonepat',
    location: 'Sonepat',
    state: 'Haryana',
    established: 2014,
    students: 500,
    description: 'The Indian Institute of Information Technology Sonepat (IIIT Sonepat) is an Indian Institutes of Information Technology located at Sonipat, Haryana. The academic session of IIIT Sonepat started from its temporary campus at NIT Kurukshetra from year 2014 Right now it is running in Shri Balwant Institute of Technology, GT Road Sonepat. IIIT Sonepat is a joint venture of the Ministry of Human Resource Development, Government of India, the Govt. of Haryana, with Industries in Public-Private Partnership model and has been declared as the Institutes of National Importance.',
    website: 'https://www.iiitsonepat.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'shivanshbit12312003@iiitsonepat.ac.in',
      phone: '8349680308',
      poc: 'Shivansh Agrawal',
    },
    club: {
      name: 'Technical Society',
      instagram: 'aglozenithiiitsonepat',
      linkedin: 'https://www.linkedin.com/in/technical-society-iiit-sonepat-9331ab38b/?originalSubdomain=in',
    },
    images: ["/photos/Sonepat1.jpg", "/photos/Sonepat2.jpg", "/photos/Sonepat3.jpg"],
  },
  'iiit-kottayam': {
    name: 'IIIT Kottayam',
    location: 'Kottayam',
    state: 'Kerala',
    established: 2000,
    students: 600,
    description: 'The Indian Institute of Information Technology, Kottayam (abbreviated IIIT Kottayam or IIITK) is an autonomous engineering Institute located at Valavoor, Palai, Kottayam District, Kerala. It is one of the Indian Institute of Information Technology institutes established by The Ministry of Human Resource Development, Government of India under Public-private partnership mode It is operated on a PPP model and funded by Government of India (50%), Government of Kerala (35%) and Industry Partners (15%) namely CIAL and Rolta Foundation.',
    website: 'https://www.iiitkottayam.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'jugal23bcs41@iiitkottayam.ac.in',
      phone: '7592028073',
      poc: 'Jugal Kakkat',
    },
    club: {
      name: 'Beta Labs',
      instagram: 'betalabs_iiitk',
      linkedin: 'https://www.linkedin.com/company/betalabs-iiitkottayam/',
    },
    images: ["/photos/Kottayam1.jpeg", "/photos/Kottayam2.jpeg", "/photos/Kottayam3.jpeg"],
  },
  'iiitdm-kurnool': {
    name: 'IIITDM Kurnool',
    location: 'Kurnool',
    state: 'Andhra Pradesh',
    established: 2015,
    students: 500,
    description: 'The Indian Institute of Information Technology Design and Manufacturing Kurnool (IIITDM Kurnool) is a technical education institute in the field of Information Technology established by MHRD, Government of India in 2015. The institute started functioning at its permanent campus of in Kurnool.',
    website: 'https://iiitk.ac.in/',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: '123me0023@iiitk.ac.in',
      phone: '7807609929',
      poc: 'Sujal Negi',
    },
    club: {
      name: 'Dataworks (Coding Club)',
      instagram: 'dataworks_iiitk',
      linkedin: 'https://www.linkedin.com/company/dataworks-club-iiitdm-kurnool/?originalSubdomain=in',
    },
    images: [],
  },
  'iiit-bhopal': {
    name: 'IIIT Bhopal',
    location: 'Bhopal',
    state: 'Madhya Pradesh',
    established: 2017,
    students: 450,
    description: 'The Indian Institute of Information Technology Bhopal (IIIT-B) is one among the 20 IIITs established under the non-profit Public-Private Partnership (PPP) model by Ministry of Human Resource Development. It is presently functioning inside the campus of Maulana Azad National Institute of Technology while 50 acres of land were identified for setting up a permanent campus. It was declared as an Institute of National Importance as per The Indian Institute of Information Technology (Public-Private Partnership) Act 2017.',
    website: 'https://www.iiitbhopal.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: '23U02008@iiitbhopal.ac.in',
      phone: '7804021065',
      poc: 'Darsh Dave',
    },
    club: {
      name: 'Xploit',
      instagram: 'xploit.iiitbhopal',
      linkedin: 'https://www.linkedin.com/company/xploitiiitbhopal/?originalSubdomain=in',
    },
    images: ["/photos/Bhopal1.jpg", "/photos/Bhopal2.jpg", "/photos/Bhopal3.jpg"],
  },
  'iiit-vadodara': {
    name: 'IIIT Vadodara',
    location: 'Vadodara',
    state: 'Gujarat',
    established: 2013,
    students: 600,
    description: 'The Indian Institute of Information Technology Vadodara (IIITV) is a higher-education institute located in Gandhinagar, Gujarat, India. It is one of the Indian Institutes of Information Technology established by the Ministry of Education, Government of India under the Indian Institutes of Information Technology (Public-Private Partnership) Act, 2017. The act provides the institute the status of Institute of National Importance.',
    website: 'https://www.iiitvadodara.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: '202451126@iiitvadodara.ac.in',
      phone: '9427117467',
      poc: 'Darshan Patel',
    },
    club: {
      name: 'IIITV Coding Club',
      instagram: 'codingclub_iiitv',
      linkedin: 'https://www.linkedin.com/company/iiitvcc/',
    },
    images: ["/photos/Vadodara1.jpg", "/photos/Vadodara2.jpg", "/photos/Vadodara3.jpg"],
  },
  'iiit-manipur': {
    name: 'IIIT Manipur',
    location: 'Imphal',
    state: 'Manipur',
    established: 2015,
    students: 350,
    description: 'The Indian Institute of Information Technology Senapati, Manipur (IIIT Senapati) is one among the prestigious Indian Institutes of Information Technology, a group of 25 Interdisciplinary Technical Universities of higher education started by the Government of India, focused on Information Technology. It is an "Institute of National Importance", declared by an act of parliament.',
    website: 'https://www.iiitmanipur.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'aary230104010@iiitmanipur.ac.in',
      phone: '9528314394',
      poc: 'Aaryan Sinha',
    },
    club: {
      name: 'Development Club',
      instagram: 'iiitm_community',
      linkedin: 'https://www.linkedin.com/company/developers-club-iiit-manipur/',
    },
    images: [],
  },
  'iiit-surat': {
    name: 'IIIT Surat',
    location: 'Surat',
    state: 'Gujarat',
    established: 2017,
    students: 400,
    description: 'The Indian Institute of Information Technology Surat (IIIT Surat) is one of the Indian Institutes of Information Technology established by MHRD in PPP mode located in Surat, Gujarat.The Institute has been conferred as Institute of National Importance (INI) on Feb 5, 2020. IIIT Surat is operating from its temporary premises at Sardar Vallabhbhai National Institute of Technology (SVNIT). The institute is mentored by SVNIT for an initial period of 2–3 years till the construction of the new campus. The IIIT Surat is built on a public-private partnership (PPP) model, jointly funded by the state government and industry partners Gujarat Narmada Valley Fertilisers & Chemicals, Gujarat Gas and Gujarat Informatics.',
    website: 'https://www.iiitsurat.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'ui23cs13@iiitsurat.ac.in',
      phone: '7850047076',
      poc: 'Bhupendra Kumar',
    },
    club: {
      name: 'GDG IIIT Surat',
      instagram: 'gdg_iiitsurat',
      linkedin: 'https://www.linkedin.com/company/dsc-iiitsurat/',
    },
    images: ["/photos/Surat1.jpg", "/photos/Surat2.jpg", "/photos/Surat3.jpg"],
  },
  'iiit-naya-raipur': {
    name: 'IIIT Naya Raipur',
    location: 'Naya Raipur',
    state: 'Chhattisgarh',
    established: 2015,
    students: 600,
    description: 'The International Institute of Information Technology, Naya Raipur (IIIT-NR), officially Dr. Shyama Prasad Mukherjee International Institute of Information Technology, Naya Raipur, is a state-funded institute in Naya Raipur, Chhattisgarh, India. The institute is focused on research and development in Information Technology (IT) and associated disciplines.',
    website: 'https://www.iiitnr.ac.in/',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'siddharth24102@iiitnr.edu.in',
      phone: '8640098960',
      poc: 'Siddharth',
    },
    club: {
      name: 'AIML',
      instagram: 'aiml_iiitnr',
      linkedin: '',
    },
    images: ["/photos/NayaRaipur1.jpg", "/photos/NayaRaipur2.jpg", "/photos/NayaRaipur3.jpg"],
  },
  'iiit-raichur': {
    name: 'IIIT Raichur',
    location: 'Raichur',
    state: 'Karnataka',
    established: 2019,
    students: 300,
    description: 'The Indian Institute of Information Technology Raichur (abbreviated IIIT Raichur) is a public technical and research university located in the district of Raichur in Karnataka, India which holds the title of Institute of National Importance and is one of the most prestigious colleges in the country. The Institute is being set up with the financial contributions of Ministry of Education, Government of India and Government of Karnataka.',
    website: 'https://www.iiitr.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'cs23b1006@iiitr.ac.in',
      phone: '8904220942',
      poc: 'Amrita Kadam',
    },
    club: {
      name: 'The CodeSoc Club',
      instagram: 'codesoc.iiitraichur',
      linkedin: 'https://www.linkedin.com/company/codesoc-iiitraichur/',
    },
    images: [],
  },
  'iiit-bhagalpur': {
    name: 'IIIT Bhagalpur',
    location: 'Bhagalpur',
    state: 'Bihar',
    established: 2017,
    students: 400,
    description: 'The Indian Institute of Information Technology, Bhagalpur (IIIT Bhagalpur) is one of the IIITs set up by Ministry of Education, Government of India in Public Private Partnership (PPP) mode. It is located on the southern bank of the Ganga River in Sabour , Bhagalpur, the 2nd largest city of Bihar. It was declared as an Institute of National Importance (INI) in September 2020 by Parliament of India. The construction of Phase-1 of its new building/campus was completed in 2024. The institute is now fully functional from its permanent campus in Sabour.',
    website: 'https://www.iiitbh.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'ishaansjha@gmail.com',
      phone: '6351051298',
      poc: 'Ishaan Jha',
    },
    club: {
      name: 'ECell',
      instagram: 'ecell_iiitbh',
      linkedin: 'https://www.linkedin.com/company/entrepreneurship-club-iiit-bhagalpur/?originalSubdomain=in',
    },
    images: ["/photos/Bhagalpur1.jpg", "/photos/Bhagalpur2.jpg", "/photos/Bhagalpur3.jpg"],
  },
  'iiit-kota': {
    name: 'IIIT Kota',
    location: 'Kota',
    state: 'Rajasthan',
    established: 2013,
    students: 600,
    description: 'The Indian Institute of Information Technology Kota[2] (IIIT, Kota) is one of the Indian Institutes of Information Technology proposed to be located at Ranpur near Kota, Rajasthan. It is spread over 100.37 acres, IIIT Kota is a Joint venture of the Ministry of Education (MoE) Government of India, Government of Rajasthan with Industries in Public-Private Partnership model. First batch of IIIT Kota has graduated in the year 2017. IIITK offers technical courses for CSE and ECE branches, with creative project courses. Every year IIITK celebrates its Foundation Day in April. After the IIIT Act was passed in the Parliament in 2017, IIITK has become an "Institute of National Importance", equalling in status with the NITs and IITs, with power of offering degrees officially.',
    website: 'https://www.iiitkota.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: '2023kucp1156@iiitkota.ac.in',
      phone: '8799015820',
      poc: 'Sanidhya Madheshia',
    },
    club: {
      name: 'CodeBase',
      instagram: 'iiitkota_codebase',
      linkedin: 'https://www.linkedin.com/company/codebase-iiitkota/?originalSubdomain=in',
    },
    images: ["/photos/Kota1.png", "/photos/Kota2.png", "/photos/Kota3.png"],
  },
  'iiit-bhubaneshwar': {
    name: 'IIIT Bhubaneshwar',
    location: 'Bhubaneswar',
    state: 'Odisha',
    established: 2006,
    students: 800,
    description: 'The International Institute of Information Technology, Bhubaneswar (IIIT-BH) is a state university located in Bhubaneswar, Odisha, India. It was established in 2006 under the IIIT Act of 2004 by the Government of Odisha. The institute offers undergraduate and postgraduate programs in the fields of Information Technology, Electrical and Electronics, Electronics and Communication, Computer Engineering, and Computer Science. MTech and PhD programs are also available in Computer Science and Electronics and Communication. The institute is a unitary technical university recognised by the University Grants Commission (India).',
    website: 'https://www.iiit-bh.ac.in/',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'b123120@iiit-bh.ac.in',
      phone: '6354607724',
      poc: 'Shivansh Sisodia',
    },
    club: {
      name: 'Tech Society',
      instagram: 'techsociiitbh',
      linkedin: 'https://www.linkedin.com/company/tech-society-iiitbh/?originalSubdomain=in',
    },
    images: ["/photos/Bhubaneshwar1.jpg", "/photos/Bhubaneshwar2.jpg", "/photos/Bhubaneshwar3.jpg"],
  },
  'iiitdm-kancheepuram': {
    name: 'IIITDM Kancheepuram',
    location: 'Chennai',
    state: 'Tamil Nadu',
    established: 2007,
    students: 1200,
    description: 'The Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram (IIITDM Kancheepuram) is a public technical and research institution established in 2007 by the Ministry of Human Resource Development, Government of India to pursue design and manufacturing oriented engineering education, research and to promote the competitive advantage of Indian products in global markets.',
    website: 'https://www.iiitdm.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'cs23i1052@iiitdm.ac.in',
      phone: '8960064987',
      poc: 'Sharad Kumar Dubey',
    },
    club: {
      name: 'CS Club',
      instagram: 'cs.club.iiitdm',
      linkedin: 'https://www.linkedin.com/company/cs-club-iiitdm-kancheepuram/',
    },
    images: [],
  },
  'iiitv-icd': {
    name: 'IIITV-ICD Diu',
    location: 'Diu',
    state: 'Daman and Diu',
    established: 2017,
    students: 400,
    description: 'The Indian Institute of Information Technology Vadodara International Campus Diu (IIITV-ICD) is a satellite campus of Indian Institute of Information Technology Vadodara (IIIT Vadodara, an Institute of National Importance by an Act of Parliament). IIITV-ICD has been established at Education Hub, Kevdi - Diu under partnership with Government of Dadra & Nagar Haveli and Daman & Diu (UT Administration of DNH & DD ) with the approval of Board of Governors (BoG) wherein Ministry of Education (earlier MHRD) is a member. The graduates from this campus will be awarded degree by IIIT Vadodara. The IIITV-ICD will be administered by Board of Governors, Finance Committee and Senate of IIIT Vadodara. The IIITV-ICD will admit its first batch of undergraduate students from Academic Year 2020-21. IIITV-ICD has been accommodated in the state of art campus of “Education Hub” at Diu.',
    website: 'http://diu.iiitvadodara.ac.in/',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'technical@diu.iiitvadodara.ac.in',
      phone: '8828072857',
      poc: 'Akarshhan Kumar',
    },
    club: {
      name: 'Technical Committee',
      instagram: 'technical_iiitvcd',
      linkedin: 'https://www.linkedin.com/company/technical-committee-iiitv/',
    },
    images: ["/photos/ICD1.jpg", "/photos/ICD2.jpg", "/photos/ICD3.jpg"],
  },
  'iiit-nagpur': {
    name: 'IIIT Nagpur',
    location: 'Nagpur',
    state: 'Maharashtra',
    established: 2016,
    students: 700,
    description: 'The Indian Institute of Information Technology, Nagpur (abbreviated IIITN) is one of the Indian Institutes of Information Technology (IIIT) and an Institute of National Importance located in Nagpur, Maharashtra. The institute started functioning from July 2016. It offers Bachelor of Technology (B.Tech.) courses in Electronics and Communication Engineering and Computer Science and Engineering. The institute has shifted to its permanent campus, at Waranga Nagpur.',
    website: 'https://www.iiitn.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'bt23csh014@iiitn.ac.in',
      phone: '8103898190',
      poc: 'Shivang',
    },
    club: {
      name: 'Student Activity Center',
      instagram: 'crispr_iiitn',
      linkedin: 'https://www.linkedin.com/company/crispr-iiit-nagpur/',
    },
    images: ["/photos/Nagpur1.jpg"],
  },
  'iiit-delhi': {
    name: 'IIIT Delhi',
    location: '',
    state: 'New Delhi',
    established: 2008,
    students: 2000,
    description: 'The Indraprastha Institute of Information Technology, Delhi (IIIT-Delhi) is a state university located in Delhi, India. IIIT Delhi offers B.Tech., M.Tech. and Ph.D. degrees. IIITD also offers PhD degrees to students through the Department of Social Sciences and Humanities. ',
    website: 'https://www.iiitd.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'harsh22200@iiitd.ac.in',
      phone: '9998211204',
      poc: 'Harsh',
    },
    club: {
      name: 'BYLD',
      instagram: 'byld.iiitd',
      linkedin: 'https://www.linkedin.com/company/byld-iiit-delhi/?originalSubdomain=in',
    },
    images: [],
  },
  'iiit-pune': {
    name: 'IIIT Pune',
    location: 'Pune',
    state: 'Maharashtra',
    established: 2016,
    students: 1500,
    description: 'The Indian Institute of Information Technology, Pune (abbreviated IIITP), is one of the Indian Institutes of Information Technology, a group of institutes of Higher education in India focused on Information Technology. It is established by the Ministry of Education (MoE), formerly the Ministry of Human Resource Development, Government of India and few industry partners as Not-for-profit Public Private Partnership (N-PPP) Institution. IIIT Pune was declared as an Institute of National Importance (INI) in August 2017.',
    website: 'https://www.iiitp.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: '112316021@ece.iiitp.ac.in',
      phone: '9405582136',
      poc: 'Piyush Kulkarni',
    },
    club: {
      name: 'LocalHost',
      instagram: 'localhost_iiitp',
      linkedin: 'https://www.linkedin.com/company/localhost-iiitp/',
    },
    images: [],
  },
};

const clubNameOverrides: Record<string, string> = {
  "iiit-sri-city": "ENIGMA",
  "iiit-nagpur": "Student Activity Center",
  "iiit-pune": "Localhost",
  "iiitv-icd": "Technical Committee",
  "iiit-vadodara": "IIITV Coding Club",
  "iiit-surat": "GOOGLE DEVELOPER GROUP IIITSurat",
  "iiitdm-kancheepuram": "CS Club",
  "iiit-tiruchirappalli": "Robotics Club",
  "iiit-kottayam": "Beta Labs",
  "iiit-manipur": "Development Club",
  "iiit-kalyani": "Student's GYMKHANA",
  "iiit-agartala": "GDG IIIT Agartala",
  "iiit-dharwad": "DSAI Society",
  "iiit-raichur": "The CodeSoc Club",
  "iiit-una": "FORCE",
  "iiit-kota": "CodeBase",
  "iiit-sonepat": "IIIT Sonepat Technical Society",
  "iiit-naya-raipur": "AIML",
  "iiit-delhi": "BYLD",
  "iiitdm-kurnool": "Dataworks (Coding Club)",
  "iiit-bhubaneshwar": "Tech Society IIIT Bhubaneswar",
  "iiit-allahabad": "Geekhaven",
  "iiit-bhopal": "Xploit",
  "iiit-bhagalpur": "E-Cell",
};

// Default IIIT data for IIITs not in the detailed list
const defaultImages = ["/photos/SriCity1.jpg", "/photos/SriCity2.jpg", "/photos/SriCity3.jpg"];

const getDefaultIIIT = (id: string) => {
  const iiitData = iiitsData.find((iiit) => iiit.id === id);
  const formattedName =
    id
      ?.replace("iiit-", "")
      .replace(/-/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Unknown";
  const instituteName = iiitData?.name || `IIIT ${formattedName}`;
  const locationString = iiitData?.location || "";
  const locationParts = locationString
    ? locationString.split(",").map((part) => part.trim())
    : [];
  const derivedLocation = iiitData
    ? locationParts[0] || locationString || "India"
    : "India";
  const derivedState = iiitData
    ? locationParts.slice(1).join(", ") || locationParts[0] || "India"
    : "India";

  return {
    name: instituteName,
    location: derivedLocation,
    state: derivedState,
    established: iiitData?.established ?? 2015,
    students: iiitData?.students ?? 500,
    description: `${instituteName} is a premier Indian Institute of Information Technology committed to excellence in education and research in computer science and related disciplines. The institute participates in UDBHAV 2025, showcasing the talent and innovation of its students.`,
    website: "https://www.iiit.ac.in",
    achievements: [
      "Quality education in IT",
      "Research contributions",
      "Industry partnerships",
      "Active tech community",
    ],
    contact: {
      email: iiitData?.spoc.email || "info@iiit.ac.in",
      phone: iiitData?.spoc.phone || "Contact SPOC",
      poc: iiitData?.spoc.name || "IIIT Coordinator",
    },
    club: {
      name: clubNameOverrides[id] || iiitData?.club.name || "Tech Club",
      instagram: iiitData?.club.instagram || "",
      linkedin: iiitData?.club.linkedin || "",
    },
    images: defaultImages,
  };
};

const IIITProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const iiit = useMemo(() => {
    if (id && iiitDetails[id]) {
      return iiitDetails[id];
    }
    return getDefaultIIIT(id || "");
  }, [id]);

  const isOrganizing = id === "iiit-sri-city";

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button asChild variant="ghost">
              <Link to="/iiits">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All IIITs
              </Link>
            </Button>
          </motion.div>

          {/* Hero Section with Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-12"
          >
            <GlassCard
              className="overflow-hidden"
              glow={isOrganizing ? "primary" : "none"}
            >
              {/* Image Gallery */}
              {iiit.images.length > 0 ? (
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <motion.img
                  key={activeImage}
                  src={iiit.images[activeImage]}
                  alt={`${iiit.name} campus`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Image Thumbnails */}
                {iiit.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {iiit.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index
                          ? "border-primary scale-110"
                          : "border-border/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
                )}

                {/* Badges */}
                {isOrganizing && (
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
                      Organizing Institute
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-yellow-500/90 text-yellow-950 rounded-full backdrop-blur-sm">
                      Final Venue
                    </span>
                  </div>
                )}
              </div>
              ) : (
                <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Campus images coming soon</p>
                  </div>
                  {/* Badges */}
                  {isOrganizing && (
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
                        Organizing Institute
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-yellow-500/90 text-yellow-950 rounded-full backdrop-blur-sm">
                        Final Venue
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {iiit.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {iiit.location}, {iiit.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Est. {iiit.established}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{iiit.students}+ Students</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild variant="neon">
                    <a
                      href={iiit.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    About
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {iiit.description}
                  </p>
                </GlassCard>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    Achievements
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {iiit.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
                      >
                        <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0" />
                        <span className="text-muted-foreground">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Tech Club */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <GlassCard glow="secondary">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Building className="w-6 h-6 text-secondary" />
                    Tech Club/Society: {iiit.club.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The official tech club representing {iiit.name} at UDBHAV
                    2025.
                  </p>
                  <div className="flex gap-3">
                    {iiit.club.instagram && (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={`https://instagram.com/${iiit.club.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="mr-2 h-4 w-4" />@
                          {iiit.club.instagram}
                        </a>
                      </Button>
                    )}
                    {iiit.club.linkedin && (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={iiit.club.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Event Participation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard glow="accent">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    UDBHAV Participation
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-3xl font-bold text-primary mb-1">
                        4
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Teams Registered
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <div className="text-3xl font-bold text-secondary mb-1">
                        16
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Participants
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="text-3xl font-bold text-accent mb-1">
                        2
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Rounds Cleared
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-4">Point of Contact</h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                      <div className="font-medium mb-1">{iiit.contact.poc}</div>
                      <div className="text-sm text-muted-foreground">
                        IIIT SPOC for UDBHAV
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-5 h-5 text-primary" />
                      <a
                        href={`mailto:${iiit.contact.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        {iiit.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-5 h-5 text-primary" />
                      <a
                        href={`tel:${iiit.contact.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {iiit.contact.phone}
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-4">Quick Facts</h2>
                  <div className="space-y-3">
                    {[
                      { label: "Established", value: iiit.established },
                      { label: "Total Students", value: `${iiit.students}+` },
                      { label: "State", value: iiit.state },
                      { label: "Tech Club", value: iiit.club.name },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                      >
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="font-medium text-right">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Image Gallery Preview */}
              {iiit.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-4">Campus Gallery</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {iiit.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === index
                            ? "border-primary"
                            : "border-transparent hover:border-border"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default IIITProfile;
