export type IIIT = {
  id: string;
  name: string;
  short: string;
  location: string;
  coordinates: [number, number];
  established: number;
  students: number;
  organizing?: boolean;
  spoc: {
    name: string;
    phone: string;
    email: string;
    department: string;
  };
  club: {
    name: string;
    instagram: string;
    linkedin: string;
  };
};

// Unified IIIT dataset sourced from SPOC CSV + site details
export const iiitsData: IIIT[] = [
  {
    id: "iiit-sri-city",
    name: "IIIT Sri City",
    short: "IIITS",
    location: "Sri City, Andhra Pradesh",
    coordinates: [80.0349, 13.554],
    established: 2013,
    students: 900,
    organizing: true,
    spoc: {
      name: "Sripathy Siddartha",
      phone: "8790327970",
      email: "sripathysiddartha.k24@iiits.in",
      department: "",
    },
    club: {
      name: "ENIGMA",
      instagram: "enigmaiiits",
      linkedin:
        "https://www.linkedin.com/company/enigmaiiits/posts/?feedView=all",
    },
  },
  {
    id: "iiit-agartala",
    name: "IIIT Agartala",
    short: "IIITAGT",
    location: "Agartala, Tripura",
    coordinates: [91.2868, 23.8315],
    established: 2018,
    students: 350,
    spoc: {
      name: "Srishant Kumar",
      phone: "9471649526",
      email: "Srishant054@gmail.com",
      department: "Design",
    },
    club: {
      name: "GDG IIIT Agartala",
      instagram: "gdgiiitagartala",
      linkedin: "https://www.linkedin.com/company/gdg-iiit-agartala/",
    },
  },
  {
    id: "iiit-allahabad",
    name: "IIIT Allahabad",
    short: "IIITA",
    location: "Prayagraj, Uttar Pradesh",
    coordinates: [81.7787, 25.4295],
    established: 1999,
    students: 3000,
    spoc: {
      name: "Naitik Jain",
      phone: "7248119726",
      email: "iib2023036@iiita.ac.in",
      department: "Marketing",
    },
    club: {
      name: "Geekhaven",
      instagram: "geekhaven_iiita",
      linkedin: "https://www.linkedin.com/company/geekhaven-iiita/",
    },
  },
  {
    id: "iiit-bhagalpur",
    name: "IIIT Bhagalpur",
    short: "IIITBHG",
    location: "Bhagalpur, Bihar",
    coordinates: [86.9842, 25.2425],
    established: 2017,
    students: 400,
    spoc: {
      name: "Ishaan Jha",
      phone: "6351051298",
      email: "ishaansjha@gmail.com",
      department: "Sponsorship",
    },
    club: {
      name: "E-Cell",
      instagram: "ecell_iiitbh",
      linkedin:
        "https://www.linkedin.com/company/entrepreneurship-club-iiit-bhagalpur/",
    },
  },
  {
    id: "iiit-bhopal",
    name: "IIIT Bhopal",
    short: "IIITBHOPAL",
    location: "Bhopal, Madhya Pradesh",
    coordinates: [77.4126, 23.2599],
    established: 2017,
    students: 450,
    spoc: {
      name: "Darsh Dave",
      phone: "7804021065",
      email: "23U02008@iiitbhopal.ac.in",
      department: "Marketing",
    },
    club: {
      name: "Xploit",
      instagram: "xploit.iiitbhopal",
      linkedin: "https://www.linkedin.com/company/xploitiiitbhopal/",
    },
  },
  {
    id: "iiit-bhubaneshwar",
    name: "IIIT Bhubaneshwar",
    short: "IIITBH",
    location: "Bhubaneswar, Odisha",
    coordinates: [85.8245, 20.2961],
    established: 2006,
    students: 800,
    spoc: {
      name: "Shivansh Sisodia",
      phone: "6354607724",
      email: "b123120@iiit-bh.ac.in",
      department: "Marketing",
    },
    club: {
      name: "Tech Society IIIT Bhubaneswar",
      instagram: "techsociiitbh",
      linkedin: "https://www.linkedin.com/company/tech-society-iiitbh/",
    },
  },
  {
    id: "iiit-dharwad",
    name: "IIIT Dharwad",
    short: "IIITDWD",
    location: "Dharwad, Karnataka",
    coordinates: [75.0065, 15.4589],
    established: 2015,
    students: 500,
    spoc: {
      name: "Savya Sanchi Sharma",
      phone: "6263786699",
      email: "savyasanchisharma.official@gmail.com",
      department: "Sponsorship",
    },
    club: {
      name: "DSAI Society",
      instagram: "dsai_iiitdwd",
      linkedin:
        "https://www.linkedin.com/company/dsai-society-iiit-dharwad/about/",
    },
  },
  {
    id: "iiit-kalyani",
    name: "IIIT Kalyani",
    short: "IIITKAL",
    location: "Kalyani, West Bengal",
    coordinates: [88.4345, 22.9751],
    established: 2014,
    students: 550,
    spoc: {
      name: "Dhanavath Samith Raj",
      phone: "9848872618",
      email: "cse22042@iiitkalyani.ac.in",
      department: "Marketing",
    },
    club: {
      name: "Student's GYMKHANA",
      instagram: "iiitkalyani_gymkhana",
      linkedin: "https://www.linkedin.com/company/gymkhana-iiit-kalyani/",
    },
  },
  {
    id: "iiit-kota",
    name: "IIIT Kota",
    short: "IIITKOTA",
    location: "Kota, Rajasthan",
    coordinates: [75.8648, 25.2138],
    established: 2013,
    students: 600,
    spoc: {
      name: "Sanidhya Madheshia",
      phone: "8799015820",
      email: "2023kucp1156@iiitkota.ac.in",
      department: "Website - Next JS",
    },
    club: {
      name: "CodeBase",
      instagram: "iiitkota_codebase",
      linkedin: "https://www.linkedin.com/company/codebase-iiitkota/",
    },
  },
  {
    id: "iiit-kottayam",
    name: "IIIT Kottayam",
    short: "IIITK",
    location: "Kottayam, Kerala",
    coordinates: [76.6501, 9.7548],
    established: 2000,
    students: 600,
    spoc: {
      name: "Jugal Kakkat",
      phone: "7592028073",
      email: "jugal23bcs41@iiitkottayam.ac.in",
      department: "Marketing",
    },
    club: {
      name: "Beta Labs",
      instagram: "betalabs_iiitk",
      linkedin: "https://www.linkedin.com/company/betalabs-iiitkottayam/",
    },
  },
  {
    id: "iiit-manipur",
    name: "IIIT Manipur",
    short: "IIITMNP",
    location: "Imphal, Manipur",
    coordinates: [93.9268, 24.8138],
    established: 2015,
    students: 350,
    spoc: {
      name: "Aaryan Sinha",
      phone: "9528314394",
      email: "aary230104010@iiitmanipur.ac.in",
      department: "Sponsorship",
    },
    club: {
      name: "Development Club",
      instagram: "iiitm_community",
      linkedin:
        "https://www.linkedin.com/company/developers-club-iiit-manipur/",
    },
  },
  {
    id: "iiit-naya-raipur",
    name: "IIIT Naya Raipur",
    short: "IIITNR",
    location: "Naya Raipur, Chhattisgarh",
    coordinates: [81.7386, 21.1702],
    established: 2015,
    students: 600,
    spoc: {
      name: "Siddharth",
      phone: "8640098960",
      email: "siddharth24102@iiitnr.edu.in",
      department: "Design",
    },
    club: { name: "AIML", instagram: "aiml_iiitnr", linkedin: "" },
  },
  {
    id: "iiit-raichur",
    name: "IIIT Raichur",
    short: "IIITRCR",
    location: "Raichur, Karnataka",
    coordinates: [77.3439, 16.2076],
    established: 2019,
    students: 300,
    spoc: {
      name: "Amrita Kadam",
      phone: "8904220942",
      email: "cs23b1006@iiitr.ac.in",
      department: "Website - Next JS",
    },
    club: {
      name: "The CodeSoc Club",
      instagram: "codesoc.iiitraichur",
      linkedin: "https://www.linkedin.com/company/codesoc-iiitraichur/",
    },
  },
  {
    id: "iiit-sonepat",
    name: "IIIT Sonepat",
    short: "IIITSPT",
    location: "Sonepat, Haryana",
    coordinates: [77.0151, 28.9931],
    established: 2014,
    students: 500,
    spoc: {
      name: "Shivansh Agrawal",
      phone: "8349680308",
      email: "shivanshbit12312003@iiitsonepat.ac.in",
      department: "Website - Next JS",
    },
    club: {
      name: "IIIT Sonepat Technical Society",
      instagram: "aglozenithiiitsonepat",
      linkedin:
        "https://www.linkedin.com/in/technical-society-iiit-sonepat-9331ab38b/",
    },
  },
  {
    id: "iiit-surat",
    name: "IIIT Surat",
    short: "IIITSURAT",
    location: "Surat, Gujarat",
    coordinates: [72.8311, 21.1702],
    established: 2017,
    students: 400,
    spoc: {
      name: "Bhupendra Kumar",
      phone: "7850047076",
      email: "ui23cs13@iiitsurat.ac.in",
      department: "Website - Next JS",
    },
    club: {
      name: "GOOGLE DEVELOPER GROUP IIITSurat",
      instagram: "gdg_iiitsurat",
      linkedin: "https://www.linkedin.com/company/dsc-iiitsurat/",
    },
  },
  {
    id: "iiit-tiruchirappalli",
    name: "IIIT Tiruchirappalli",
    short: "IIITT",
    location: "Tiruchirappalli, Tamil Nadu",
    coordinates: [78.7047, 10.7905],
    established: 2013,
    students: 500,
    spoc: {
      name: "Ayush Soni",
      phone: "7339889592",
      email: "Soniayush312@gmail.com",
      department: "Sponsorship",
    },
    club: { name: "Robotics Club", instagram: "", linkedin: "" },
  },
  {
    id: "iiit-una",
    name: "IIIT Una",
    short: "IIITUNA",
    location: "Una, Himachal Pradesh",
    coordinates: [76.2659, 31.4685],
    established: 2014,
    students: 900,
    spoc: {
      name: "Nikhil Arora",
      phone: "9350419261",
      email: "23140@iiitu.ac.in",
      department: "Marketing",
    },
    club: {
      name: "FORCE",
      instagram: "force.iiitu",
      linkedin: "https://www.linkedin.com/company/force-iiitu/",
    },
  },
  {
    id: "iiit-vadodara",
    name: "IIIT Vadodara",
    short: "IIITV",
    location: "Vadodara, Gujarat",
    coordinates: [73.1812, 22.3119],
    established: 2013,
    students: 600,
    spoc: {
      name: "Darshan Patel",
      phone: "9427117467",
      email: "202451126@iiitvadodara.ac.in",
      department: "Website - Next JS",
    },
    club: {
      name: "IIITV Coding Club",
      instagram: "codingclub_iiitv",
      linkedin: "https://www.linkedin.com/company/iiitvcc/",
    },
  },
  {
    id: "iiitdm-kurnool",
    name: "IIITDM Kurnool",
    short: "IIITDM-KUR",
    location: "Kurnool, Andhra Pradesh",
    coordinates: [78.04, 15.83],
    established: 2015,
    students: 500,
    spoc: {
      name: "Sujal Negi",
      phone: "7807609929",
      email: "123me0023@iiitk.ac.in",
      department: "Marketing",
    },
    club: {
      name: "Dataworks (Coding Club)",
      instagram: "dataworks_iiitk",
      linkedin:
        "https://www.linkedin.com/company/dataworks-club-iiitdm-kurnool/",
    },
  },
  {
    id: "iiitv-icd",
    name: "IIITV-ICD (Diu)",
    short: "IIITV-ICD",
    location: "Diu",
    coordinates: [70.989, 20.714],
    established: 2017,
    students: 400,
    spoc: {
      name: "Akarshhan Kumar",
      phone: "8828072857",
      email: "technical@diu.iiitvadodara.ac.in",
      department: "",
    },
    club: {
      name: "Technical Committee",
      instagram: "technical_iiitvcd",
      linkedin: "https://www.linkedin.com/company/technical-committee-iiitv/",
    },
  },
  {
    id: "iiit-nagpur",
    name: "IIIT Nagpur",
    short: "IIITN",
    location: "Nagpur, Maharashtra",
    coordinates: [79.0882, 21.1458],
    established: 2016,
    students: 700,
    spoc: {
      name: "Shivang",
      phone: "8103898190",
      email: "bt23csh014@iiitn.ac.in",
      department: "",
    },
    club: {
      name: "Student Activity Center",
      instagram: "crispr_iiitn",
      linkedin: "https://www.linkedin.com/company/crispr-iiit-nagpur/",
    },
  },
  {
    id: "iiitdm-kancheepuram",
    name: "IIITDM Kancheepuram",
    short: "IIITDM-K",
    location: "Chennai, Tamil Nadu",
    coordinates: [80.0469, 12.8387],
    established: 2007,
    students: 1200,
    spoc: {
      name: "Sharad Kumar Dubey",
      phone: "8960064987",
      email: "cs23i1052@iiitdm.ac.in",
      department: "Sponsorship",
    },
    club: {
      name: "CS Club",
      instagram: "cs.club.iiitdm",
      linkedin: "https://www.linkedin.com/company/cs-club-iiitdm-kancheepuram/",
    },
  },
  {
    id: "iiit-delhi",
    name: "IIIT Delhi",
    short: "IIITD",
    location: "New Delhi",
    coordinates: [77.2707, 28.5449],
    established: 2008,
    students: 2000,
    spoc: {
      name: "Harsh",
      phone: "9998211204",
      email: "harsh22200@iiitd.ac.in",
      department: "",
    },
    club: {
      name: "BYLD",
      instagram: "byld.iiitd",
      linkedin: "https://www.linkedin.com/company/byld-iiit-delhi/",
    },
  },
  {
    id: "iiit-pune",
    name: "IIIT Pune",
    short: "IIITP",
    location: "Pune, Maharashtra",
    coordinates: [73.8567, 18.5204],
    established: 2016,
    students: 1500,
    spoc: {
      name: "Piyush Kulkarni",
      phone: "9405582136",
      email: "112316021@ece.iiitp.ac.in",
      department: "",
    },
    club: {
      name: "Localhost",
      instagram: "localhost_iiitp",
      linkedin: "https://www.linkedin.com/company/localhost-iiitp/",
    },
  },
];

export const spocsData = [
  {
    id: 87,
    name: "Bhupendra Kumar",
    iiit: "IIIT Surat",
    role: "SPoC",
    email: "errorbhupendra481@gmail.com",
    linkedin: "https://www.linkedin.com/in/bhupendra-kumar-217923294/",
    image:
      "/drive-download-20260106T151449Z-1-001/batch1/Bhupendrakumar_IIITSURAT - Bhupendra Kumar.jpg",
  },
  {
    id: 88,
    name: "Sharad Kumar Dubey",
    iiit: "IIITDM Kancheepuram",
    role: "SPoC",
    email: "cs23i1052@iiitdm.ac.in",
    linkedin: "https://www.linkedin.com/in/sharad-kumar-dubey/",
    instagram: "__sha_ey__",
    image:
      "/drive-download-20260106T151449Z-1-001/batch2/SHARAD - CS23I1052 SHARAD KUMAR DUBEY.png",
  },
  {
    id: 89,
    name: "Hasini Mende",
    iiit: "IIIT Sricity",
    role: "SPoC",
    email: "hasini.m25@iiits.in",
    instagram: "hasini.mende",
    image:
      "/drive-download-20260106T151449Z-1-001/batch2/IMG_20251227_113252 - Hasini Mende.jpg",
  },
  {
    id: 90,
    name: "Shivansh Agrawal",
    iiit: "IIIT Sonepat",
    role: "SPoC",
    email: "shivansh.agrprof@gmail.com",
    linkedin: "https://www.linkedin.com/in/shivansh-agrawal-0920b5214/",
    instagram: "shivanshagr08",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/Shivansh_Agrawal_12312003 - Shivansh Agrawal.jpg",
  },
  {
    id: 91,
    name: "Ayush Soni",
    iiit: "IIIT Tiruchirappalli",
    role: "SPoC",
    email: "soniayush312@gmail.com",
    linkedin: "https://www.linkedin.com/in/soniayush12",
    instagram: "soniayush_12",
    image:
      "/drive-download-20260106T151449Z-1-001/batch1/Ayush soni IIIT Trichy - Ayush Soni.jpg",
  },
  {
    id: 92,
    name: "Sujal Negi",
    iiit: "IIITDM Kurnool",
    role: "SPoC",
    email: "sujalnegi2805@gmail.com",
    linkedin: "https://in.linkedin.com/in/sujalnegi128005",
    instagram: "sujal128005",
    image:
      "/drive-download-20260106T151449Z-1-001/batch1/20250726_155518 - Sujal.jpg",
  },
  {
    id: 93,
    name: "Darsh Dave",
    iiit: "IIIT Bhopal",
    role: "SPoC",
    email: "darsh.dave999@gmail.com",
    linkedin: "https://www.linkedin.com/in/darsh-dave-120062291/",
    instagram: "darsh_theway10",
    image:
      "/drive-download-20260106T151449Z-1-001/batch1/Darsh Dave_IIIT_Bhopal - DARSH DAVE.JPG",
  },
  {
    id: 94,
    name: "Jugal Kakkat",
    iiit: "IIIT Kottayam",
    role: "SPoC",
    email: "jugal23bcs41@iiitkottayam.ac.in",
    linkedin: "https://www.linkedin.com/in/jugal-kakkat",
    instagram: "jugxl",
    image:
      "/drive-download-20260106T151449Z-1-001/batch2/Jugal_IIIT_Kottayam - JUGAL KAKKAT -IIITK.JPG",
  },
  {
    id: 95,
    name: "Shivansh Sisodia",
    iiit: "IIIT Bhubaneswar",
    role: "SPoC",
    email: "b123120@iiit-bh.ac.in",
    linkedin: "https://www.linkedin.com/in/shivansh-sisodia-541391284",
    instagram: "kyayaarshivansh",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/Shivansh_IIIT_Bhubaneswar - Shivansh Sisodia.jpeg",
  },
  {
    id: 96,
    name: "Darshan Patel",
    iiit: "IIIT Vadodara",
    role: "SPoC",
    email: "darshanpatelgdh@gmail.com",
    linkedin: "https://www.linkedin.com/in/darshan-patel-1713062a4",
    instagram: "mrquantum_1915",
    image:
      "/drive-download-20260106T151449Z-1-001/batch1/DarshanPatel_IIIT_Vadodara - Darshan Patel.jpeg",
  },
  {
    id: 97,
    name: "Prem Sagar",
    iiit: "IIIT Dharwad",
    role: "SPoC",
    email: "23bds065@iiitdwd.ac.in",
    linkedin: "https://www.linkedin.com/in/prem-sagar-t-k",
    instagram: "premsagar.tk",
    image:
      "/drive-download-20260106T151449Z-1-001/batch2/IMG_20260101_094650 - THIRUPATI KOPPERA PREM SAGAR IIIT Dharwad.jpg",
  },
  {
    id: 98,
    name: "Sanidhya Madeshia",
    iiit: "IIIT Kota",
    role: "SPoC",
    email: "sanidhyamadheshia@gmail.com",
    linkedin: "https://www.linkedin.com/in/sanidhya-madeshia-620099293/",
    instagram: "ig._sanidhya",
    image:
      "/drive-download-20260106T151449Z-1-001/batch2/IMG_20251116_121916347_HDR - Sanidhya Madheshia.jpg",
  },
  {
    id: 99,
    name: "Shivang Tonde",
    iiit: "IIIT Nagpur",
    role: "SPoC",
    email: "ts@iiitn.ac.in",
    linkedin: "https://www.linkedin.com/in/shivang-tonde-56757528a/",
    instagram: "shivang_tonde_18",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/ShivangTonde_IIIT_Nagpur - Technical Master.jpeg",
  },
  {
    id: 100,
    name: "Savya Sanchi Sharma",
    iiit: "IIIT Dharwad",
    role: "SPoC",
    email: "dsaisoc@iiitdwd.ac.in",
    linkedin: "https://www.linkedin.com/in/savyasanchi-sharma",
    instagram: "dsaisoc_iiitdwd",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/Savya_Sanchi_Sharma_IIIT_Dharwad - Data Science and Artificial Intelligence Society IIIT Dharwad.png",
  },
  {
    id: 101,
    name: "Siddharth",
    iiit: "IIIT Naya Raipur",
    role: "SPoC",
    email: "siddharth24102@iiitnr.edu.in",
    linkedin: "https://www.linkedin.com/in/siddharth-a35a36324",
    instagram: "_siddhrthh",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/Siddharth_IIIT_Naya_Raipur - Siddharth Siddharth.jpg",
  },
  {
    id: 102,
    name: "Srishant Kumar",
    iiit: "IIIT Agartala",
    role: "SPoC",
    email: "srishant054@gmail.com",
    linkedin: "https://linkedin.com/in/iamsrishant",
    instagram: "iamsrishant",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/Srishant_Kumar_IIIT_AGARTALA - Srishant Kumar.jpeg",
  },
  {
    id: 103,
    name: "Amrita Kadam",
    iiit: "IIIT Raichur",
    role: "SPoC",
    email: "amrita0205kadam@gmail.com",
    linkedin: "https://www.linkedin.com/in/amrita-kadam-2a293b287/",
    instagram: "anomaly4509902",
    image:
      "/drive-download-20260106T151449Z-1-001/batch1/Amrita_IIIT_Raichur - Sujata C.jpg",
  },
  {
    id: 104,
    name: "S. Varun Raj",
    iiit: "IIIT Ranchi",
    role: "SPoC",
    email: "varunrajss07@gmail.com",
    linkedin: "https://www.linkedin.com/in/varun-rajss",
    instagram: "varunn_raaajj",
    image:
      "/drive-download-20260106T151449Z-1-001/batch3/VarunRaj_IIIT Ranchi - VarunRaj.jpg",
  },
];