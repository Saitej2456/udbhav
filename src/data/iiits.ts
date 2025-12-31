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
      linkedin: "https://www.linkedin.com/company/enigmaiiits/",
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
      linkedin: "https://www.linkedin.com/company/dsai-society-iiit-dharwad/",
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
      name: "Student’s GYMKHANA",
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
    students: 600,
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
];
