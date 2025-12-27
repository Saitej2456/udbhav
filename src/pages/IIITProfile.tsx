import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Globe, Mail, Phone, ArrowLeft, Award, BookOpen, Instagram, Linkedin, Building } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

// Import IIIT images
import iiitAgartala1 from '@/assets/photos/iiit-agartala-1.jpg';
import iiitAgartala2 from '@/assets/photos/iiit-agartala-2.jpg';
import iiitAllahabad from '@/assets/photos/iiit-allahabad.jpg';
import iiitDharwad from '@/assets/photos/iiit-dharwad.jpg';
import iiitSriCity from '@/assets/photos/iiit-sri-city.jpg';
import iiitTrichy from '@/assets/photos/iiit-trichy.jpg';
import iiitUna from '@/assets/photos/iiit-una.jpg';
import classroom1 from '@/assets/photos/classroom-1.jpg';
import classroom2 from '@/assets/photos/classroom-2.jpg';
import hackathon1 from '@/assets/photos/hackathon-1.jpg';

// Comprehensive IIIT data with all details
const iiitDetails: Record<string, {
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
}> = {
  'iiit-sri-city': {
    name: 'IIIT Sri City',
    location: 'Sri City, Chittoor District',
    state: 'Andhra Pradesh',
    established: 2013,
    students: 900,
    description: 'IIIT Sri City is a premier institute established in 2013 as a Public-Private Partnership. Located in the state-of-the-art Sri City integrated business hub, it offers world-class infrastructure and education in computer science and related fields. As the organizing institute and final venue for UDBHAV 2025, it leads the inter-IIIT hackathon initiative.',
    website: 'https://www.iiits.ac.in',
    achievements: [
      'Organizing Institute for UDBHAV 2025',
      'Strong industry partnerships with top tech companies',
      'Research excellence in AI/ML and Data Science',
      'Active entrepreneurship ecosystem',
    ],
    contact: {
      email: 'udbhav@iiits.ac.in',
      phone: '8790327970',
      poc: 'Sripathy Siddartha',
    },
    club: {
      name: 'ENIGMA',
      instagram: 'enigmaiiits',
      linkedin: 'https://www.linkedin.com/company/enigmaiiits/',
    },
    images: [iiitSriCity, classroom1, hackathon1],
  },
  'iiit-agartala': {
    name: 'IIIT Agartala',
    location: 'Agartala',
    state: 'Tripura',
    established: 2018,
    students: 350,
    description: 'IIIT Agartala is a young and dynamic institute established in 2018. It focuses on providing quality education in information technology and computer science, serving the Northeast region of India with cutting-edge technical education.',
    website: 'https://www.iiitagar.ac.in',
    achievements: [
      'Growing research in emerging technologies',
      'Strong focus on regional tech development',
      'Active coding community',
      'Industry collaborations',
    ],
    contact: {
      email: 'info@iiitagar.ac.in',
      phone: '9471649526',
      poc: 'Srishant Kumar',
    },
    club: {
      name: 'GDG IIIT Agartala',
      instagram: 'gdgiiitagartala',
      linkedin: 'https://www.linkedin.com/company/gdg-iiit-agartala/',
    },
    images: [iiitAgartala1, iiitAgartala2, classroom2],
  },
  'iiit-allahabad': {
    name: 'IIIT Allahabad',
    location: 'Jhalwa, Prayagraj',
    state: 'Uttar Pradesh',
    established: 1999,
    students: 3000,
    description: 'IIIT Allahabad is one of the oldest and most prestigious IIITs in India. Established in 1999, it has been a pioneer in IT education and research. The institute is known for its strong academic programs, world-class faculty, and excellent placement record.',
    website: 'https://www.iiita.ac.in',
    achievements: [
      'Among the top IIITs in India',
      'Excellent placement record with top companies',
      'Strong research output in AI, Cybersecurity',
      'Alumni in leadership positions globally',
    ],
    contact: {
      email: 'coordinator@iiita.ac.in',
      phone: '7248119726',
      poc: 'Naitik Jain',
    },
    club: {
      name: 'Tech Club',
      instagram: '',
      linkedin: '',
    },
    images: [iiitAllahabad, classroom1, hackathon1],
  },
  'iiit-dharwad': {
    name: 'IIIT Dharwad',
    location: 'Dharwad',
    state: 'Karnataka',
    established: 2015,
    students: 500,
    description: 'IIIT Dharwad is a leading technical institute in Karnataka, established in 2015. The institute focuses on cutting-edge research in data science, AI, and related fields, contributing to the growth of the IT sector in the region.',
    website: 'https://www.iiitdwd.ac.in',
    achievements: [
      'Strong DSAI research focus',
      'Industry-academia collaborations',
      'Growing placement record',
      'Active tech community',
    ],
    contact: {
      email: 'info@iiitdwd.ac.in',
      phone: '6263786699',
      poc: 'Savya Sanchi Sharma',
    },
    club: {
      name: 'DSAI Society',
      instagram: 'dsai_iiitdwd',
      linkedin: 'https://www.linkedin.com/company/dsai-society-iiit-dharwad/',
    },
    images: [iiitDharwad, classroom2, hackathon1],
  },
  'iiit-tiruchirappalli': {
    name: 'IIIT Tiruchirappalli',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    established: 2013,
    students: 500,
    description: 'IIIT Tiruchirappalli is a prominent technical institute in Tamil Nadu established in 2013. Known for its robotics research and strong technical programs, it produces graduates who excel in both academia and industry.',
    website: 'https://www.iiitt.ac.in',
    achievements: [
      'Leading robotics research',
      'Strong placement record',
      'Industry partnerships',
      'Active student clubs',
    ],
    contact: {
      email: 'info@iiitt.ac.in',
      phone: '7339889592',
      poc: 'Ayush Soni',
    },
    club: {
      name: 'Robotics Club',
      instagram: '',
      linkedin: '',
    },
    images: [iiitTrichy, classroom1, hackathon1],
  },
  'iiit-una': {
    name: 'IIIT Una',
    location: 'Una',
    state: 'Himachal Pradesh',
    established: 2014,
    students: 600,
    description: 'IIIT Una is located in the scenic hills of Himachal Pradesh. Established in 2014, it combines quality technical education with a serene learning environment. The institute is known for its focus on emerging technologies and strong student community.',
    website: 'https://www.iiitu.ac.in',
    achievements: [
      'Growing research output',
      'Active coding community (FORCE)',
      'Industry partnerships',
      'Strong alumni network',
    ],
    contact: {
      email: 'info@iiitu.ac.in',
      phone: '9350419261',
      poc: 'Nikhil Arora',
    },
    club: {
      name: 'FORCE',
      instagram: 'force.iiitu',
      linkedin: 'https://www.linkedin.com/company/force-iiitu/',
    },
    images: [iiitUna, classroom2, hackathon1],
  },
};

// Default IIIT data for IIITs not in the detailed list
const defaultImages = [classroom1, classroom2, hackathon1];

const getDefaultIIIT = (id: string) => {
  const formattedName = id?.replace('iiit-', '').replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Unknown';
  return {
    name: `IIIT ${formattedName}`,
    location: 'India',
    state: 'India',
    established: 2015,
    students: 500,
    description: `IIIT ${formattedName} is a premier Indian Institute of Information Technology committed to excellence in education and research in computer science and related disciplines. The institute participates in UDBHAV 2025, showcasing the talent and innovation of its students.`,
    website: 'https://www.iiit.ac.in',
    achievements: [
      'Quality education in IT',
      'Research contributions',
      'Industry partnerships',
      'Active tech community',
    ],
    contact: {
      email: 'info@iiit.ac.in',
      phone: 'Contact SPOC',
      poc: 'IIIT Coordinator',
    },
    club: {
      name: 'Tech Club',
      instagram: '',
      linkedin: '',
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
    return getDefaultIIIT(id || '');
  }, [id]);

  const isOrganizing = id === 'iiit-sri-city';

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
            <GlassCard className="overflow-hidden" glow={isOrganizing ? 'primary' : 'none'}>
              {/* Image Gallery */}
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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {iiit.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index 
                          ? 'border-primary scale-110' 
                          : 'border-border/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
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

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{iiit.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{iiit.location}, {iiit.state}</span>
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
                    <a href={iiit.website} target="_blank" rel="noopener noreferrer">
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
                  <p className="text-muted-foreground leading-relaxed">{iiit.description}</p>
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
                        <span className="text-muted-foreground">{achievement}</span>
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
                    Tech Club: {iiit.club.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    The official tech club representing {iiit.name} at UDBHAV 2025.
                  </p>
                  <div className="flex gap-3">
                    {iiit.club.instagram && (
                      <Button asChild variant="outline" size="sm">
                        <a 
                          href={`https://instagram.com/${iiit.club.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <Instagram className="mr-2 h-4 w-4" />
                          @{iiit.club.instagram}
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
                  <h2 className="text-2xl font-bold mb-4 gradient-text">UDBHAV Participation</h2>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="text-3xl font-bold text-primary mb-1">4</div>
                      <div className="text-sm text-muted-foreground">Teams Registered</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <div className="text-3xl font-bold text-secondary mb-1">16</div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <div className="text-3xl font-bold text-accent mb-1">2</div>
                      <div className="text-sm text-muted-foreground">Rounds Cleared</div>
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
                      <div className="text-sm text-muted-foreground">IIIT SPOC for UDBHAV</div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href={`mailto:${iiit.contact.email}`} className="hover:text-primary transition-colors">
                        {iiit.contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="w-5 h-5 text-primary" />
                      <a href={`tel:${iiit.contact.phone}`} className="hover:text-primary transition-colors">
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
                      { label: 'Established', value: iiit.established },
                      { label: 'Total Students', value: `${iiit.students}+` },
                      { label: 'State', value: iiit.state },
                      { label: 'Tech Club', value: iiit.club.name },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Image Gallery Preview */}
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
                            ? 'border-primary' 
                            : 'border-transparent hover:border-border'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default IIITProfile;
