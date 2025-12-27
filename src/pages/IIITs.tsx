import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, Star, Map, User, Phone, Instagram, Linkedin, Search, X } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IndiaMap3D from '@/components/IndiaMap3D';

// Complete IIIT data with SPOCs and Club details from Masterdex
const iiitsData = [
  { 
    id: 'iiit-sri-city', 
    name: 'IIIT Sri City', 
    location: 'Andhra Pradesh', 
    established: 2013, 
    organizing: true, 
    students: 900,
    spoc: { name: 'Sripathy Siddartha', phone: '8790327970' },
    club: { name: 'ENIGMA', instagram: 'enigmaiiits', linkedin: 'https://www.linkedin.com/company/enigmaiiits/' }
  },
  { 
    id: 'iiit-agartala', 
    name: 'IIIT Agartala', 
    location: 'Tripura', 
    established: 2018, 
    students: 350,
    spoc: { name: 'Srishant Kumar', phone: '9471649526' },
    club: { name: 'GDG IIIT Agartala', instagram: 'gdgiiitagartala', linkedin: 'https://www.linkedin.com/company/gdg-iiit-agartala/' }
  },
  { 
    id: 'iiit-allahabad', 
    name: 'IIIT Allahabad', 
    location: 'Uttar Pradesh', 
    established: 1999, 
    students: 3000,
    spoc: { name: 'Naitik Jain', phone: '7248119726' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-bhagalpur', 
    name: 'IIIT Bhagalpur', 
    location: 'Bihar', 
    established: 2017, 
    students: 400,
    spoc: { name: 'Ishaan Jha', phone: '6351051298' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-bhopal', 
    name: 'IIIT Bhopal', 
    location: 'Madhya Pradesh', 
    established: 2017, 
    students: 450,
    spoc: { name: 'Darsh Dave', phone: '7804021065' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-bhubaneshwar', 
    name: 'IIIT Bhubaneshwar', 
    location: 'Odisha', 
    established: 2006, 
    students: 800,
    spoc: { name: 'Shivansh Sisodia', phone: '6354607724' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-dharwad', 
    name: 'IIIT Dharwad', 
    location: 'Karnataka', 
    established: 2015, 
    students: 500,
    spoc: { name: 'Savya Sanchi Sharma', phone: '6263786699' },
    club: { name: 'DSAI Society', instagram: 'dsai_iiitdwd', linkedin: 'https://www.linkedin.com/company/dsai-society-iiit-dharwad/' }
  },
  { 
    id: 'iiit-kalyani', 
    name: 'IIIT Kalyani', 
    location: 'West Bengal', 
    established: 2014, 
    students: 550,
    spoc: { name: 'Dhanavath Samith Raj', phone: '9848872618' },
    club: { name: "Student's GYMKHANA", instagram: 'iiitkalyani_gymkhana', linkedin: 'https://www.linkedin.com/company/gymkhana-iiit-kalyani/' }
  },
  { 
    id: 'iiit-kota', 
    name: 'IIIT Kota', 
    location: 'Rajasthan', 
    established: 2013, 
    students: 600,
    spoc: { name: 'Sanidhya Madheshia', phone: '8799015820' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-kottayam', 
    name: 'IIIT Kottayam', 
    location: 'Kerala', 
    established: 2000, 
    students: 600,
    spoc: { name: 'Jugal Kakkat', phone: '7592028073' },
    club: { name: 'Beta Labs', instagram: 'betalabs_iiitk', linkedin: 'https://www.linkedin.com/company/betalabs-iiitkottayam/' }
  },
  { 
    id: 'iiit-manipur', 
    name: 'IIIT Manipur', 
    location: 'Manipur', 
    established: 2015, 
    students: 350,
    spoc: { name: 'Aaryan Sinha', phone: '9528314394' },
    club: { name: 'Development Club', instagram: 'iiitm_community', linkedin: 'https://www.linkedin.com/company/developers-club-iiit-manipur/' }
  },
  { 
    id: 'iiit-naya-raipur', 
    name: 'IIIT Naya Raipur', 
    location: 'Chhattisgarh', 
    established: 2015, 
    students: 600,
    spoc: { name: 'Siddharth', phone: '8640098960' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-raichur', 
    name: 'IIIT Raichur', 
    location: 'Karnataka', 
    established: 2019, 
    students: 300,
    spoc: { name: 'Amrita Kadam', phone: '8904220942' },
    club: { name: 'The CodeSoc Club', instagram: 'codesoc.iiitraichur', linkedin: 'https://www.linkedin.com/company/codesoc-iiitraichur/' }
  },
  { 
    id: 'iiit-sonepat', 
    name: 'IIIT Sonepat', 
    location: 'Haryana', 
    established: 2014, 
    students: 500,
    spoc: { name: 'Shivansh Agrawal', phone: '8349680308' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-surat', 
    name: 'IIIT Surat', 
    location: 'Gujarat', 
    established: 2017, 
    students: 400,
    spoc: { name: 'Bhupendra Kumar', phone: '7850047076' },
    club: { name: 'GDG IIITSurat', instagram: 'gdg_iiitsurat', linkedin: 'https://www.linkedin.com/company/dsc-iiitsurat/' }
  },
  { 
    id: 'iiit-tiruchirappalli', 
    name: 'IIIT Tiruchirappalli', 
    location: 'Tamil Nadu', 
    established: 2013, 
    students: 500,
    spoc: { name: 'Ayush Soni', phone: '7339889592' },
    club: { name: 'Robotics Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiit-una', 
    name: 'IIIT Una', 
    location: 'Himachal Pradesh', 
    established: 2014, 
    students: 600,
    spoc: { name: 'Nikhil Arora', phone: '9350419261' },
    club: { name: 'FORCE', instagram: 'force.iiitu', linkedin: 'https://www.linkedin.com/company/force-iiitu/' }
  },
  { 
    id: 'iiit-vadodara', 
    name: 'IIIT Vadodara', 
    location: 'Gujarat', 
    established: 2013, 
    students: 600,
    spoc: { name: 'Darshan Patel', phone: '9427117467' },
    club: { name: 'IIITV Coding Club', instagram: 'codingclub_iiitv', linkedin: 'https://www.linkedin.com/company/iiitvcc/' }
  },
  { 
    id: 'iiitdm-kurnool', 
    name: 'IIITDM Kurnool', 
    location: 'Andhra Pradesh', 
    established: 2015, 
    students: 500,
    spoc: { name: 'Sujal Negi', phone: '7807609929' },
    club: { name: 'Tech Club', instagram: '', linkedin: '' }
  },
  { 
    id: 'iiitv-icd', 
    name: 'IIITV-ICD (Diu)', 
    location: 'Diu', 
    established: 2017, 
    students: 400,
    spoc: { name: 'Akarshhan Kumar', phone: '8828072857' },
    club: { name: 'Technical Committee', instagram: 'technical_iiitvcd', linkedin: 'https://www.linkedin.com/company/technical-committee-iiitv/' }
  },
  { 
    id: 'iiit-nagpur', 
    name: 'IIIT Nagpur', 
    location: 'Maharashtra', 
    established: 2016, 
    students: 700,
    spoc: { name: 'Shivang', phone: '8103898190' },
    club: { name: 'Student Activity Center', instagram: 'crispr_iiitn', linkedin: 'https://www.linkedin.com/company/crispr-iiit-nagpur/' }
  },
  { 
    id: 'iiit-pune', 
    name: 'IIIT Pune', 
    location: 'Maharashtra', 
    established: 2016, 
    students: 500,
    spoc: { name: 'Piyush Kulkarni', phone: '9405582136' },
    club: { name: 'Localhost', instagram: 'localhost_iiitp', linkedin: 'https://www.linkedin.com/company/localhost-iiitp/' }
  },
  { 
    id: 'iiitdm-kancheepuram', 
    name: 'IIITDM Kancheepuram', 
    location: 'Tamil Nadu', 
    established: 2007, 
    students: 1200,
    spoc: { name: 'Contact TBA', phone: '' },
    club: { name: 'CS Club', instagram: 'cs.club.iiitdm', linkedin: 'https://www.linkedin.com/company/cs-club-iiitdm-kancheepuram/' }
  },
];

const IIITs = () => {
  const [viewMode, setViewMode] = useState<'map' | 'grid' | 'spocs'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIIITs = useMemo(() => {
    if (!searchQuery.trim()) return iiitsData;
    const query = searchQuery.toLowerCase();
    return iiitsData.filter(iiit => 
      iiit.name.toLowerCase().includes(query) ||
      iiit.location.toLowerCase().includes(query) ||
      iiit.club.name.toLowerCase().includes(query) ||
      iiit.spoc.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const organizingIIIT = filteredIIITs.find(iiit => iiit.organizing);
  const otherIIITs = filteredIIITs.filter(iiit => !iiit.organizing);

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
              <span className="gradient-text">Participating IIITs</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              {iiitsData.length} Indian Institutes of Information Technology, united for innovation
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search IIITs by name, location, club..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-card/50 border-border/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-3">
                Found {filteredIIITs.length} result{filteredIIITs.length !== 1 ? 's' : ''}
              </p>
            )}
          </motion.div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="glass inline-flex rounded-lg p-1">
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="gap-2"
              >
                <Map className="w-4 h-4" />
                Map View
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === 'spocs' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('spocs')}
                className="gap-2"
              >
                <User className="w-4 h-4" />
                SPOCs
              </Button>
            </div>
          </motion.div>

          {/* Map View */}
          {viewMode === 'map' && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-16"
            >
              <SectionHeading
                title="Interactive Map"
                subtitle="Click on any marker to explore the IIIT"
              />
              <IndiaMap3D />
            </motion.section>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <>
              {/* Organizing IIIT */}
              {organizingIIIT && (
                <section className="mb-16">
                  <SectionHeading
                    title="Organizing Institute & Final Venue"
                    subtitle="Host of UDBHAV 2026 | 24-25 January"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/iiits/${organizingIIIT.id}`}>
                      <GlassCard className="max-w-3xl mx-auto group" glow="primary">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Star className="w-12 h-12 text-primary-foreground" />
                          </div>
                          <div className="text-center md:text-left flex-1">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 flex-wrap">
                              <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                                Organizing
                              </span>
                              <span className="px-2 py-1 text-xs font-medium bg-yellow-400/20 text-yellow-400 rounded-full">
                                Final Venue
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold gradient-text mb-2">{organizingIIIT.name}</h3>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-3">
                              <MapPin className="w-4 h-4" />
                              <span>{organizingIIIT.location}</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Est:</span>
                                <span className="ml-2 text-foreground font-medium">{organizingIIIT.established}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Students:</span>
                                <span className="ml-2 text-foreground font-medium">{organizingIIIT.students}+</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Club:</span>
                                <span className="ml-2 text-foreground font-medium">{organizingIIIT.club.name}</span>
                              </div>
                              <div className="flex items-center justify-center md:justify-start gap-2">
                                {organizingIIIT.club.instagram && (
                                  <a 
                                    href={`https://instagram.com/${organizingIIIT.club.instagram}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 rounded-lg bg-card hover:bg-primary/20 transition-colors"
                                  >
                                    <Instagram className="w-4 h-4 text-muted-foreground hover:text-primary" />
                                  </a>
                                )}
                                {organizingIIIT.club.linkedin && (
                                  <a 
                                    href={organizingIIIT.club.linkedin} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 rounded-lg bg-card hover:bg-primary/20 transition-colors"
                                  >
                                    <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                </section>
              )}

              {/* All IIITs Grid */}
              <section>
                <SectionHeading
                  title="All Participating IIITs"
                  subtitle={`${otherIIITs.length} institutes competing for glory`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {otherIIITs.map((iiit, index) => (
                    <motion.div
                      key={iiit.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <GlassCard className="h-full group" hover>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                              {iiit.name.split(' ')[1]?.substring(0, 3) || 'IIIT'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors truncate">
                              {iiit.name}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span className="truncate">{iiit.location}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              <span className="text-primary font-medium">{iiit.club.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {iiit.club.instagram && (
                                <a 
                                  href={`https://instagram.com/${iiit.club.instagram}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1 rounded bg-card hover:bg-primary/20 transition-colors"
                                >
                                  <Instagram className="w-3 h-3 text-muted-foreground hover:text-primary" />
                                </a>
                              )}
                              {iiit.club.linkedin && (
                                <a 
                                  href={iiit.club.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1 rounded bg-card hover:bg-primary/20 transition-colors"
                                >
                                  <Linkedin className="w-3 h-3 text-muted-foreground hover:text-primary" />
                                </a>
                              )}
                              <Link 
                                to={`/iiits/${iiit.id}`}
                                className="ml-auto p-1 rounded bg-card hover:bg-primary/20 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-primary" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* SPOCs View */}
          {viewMode === 'spocs' && (
            <section>
              <SectionHeading
                title="Single Points of Contact (SPOCs)"
                subtitle="Representatives from each participating IIIT"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {iiitsData.map((iiit, index) => (
                  <motion.div
                    key={iiit.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <GlassCard className="h-full" glow={iiit.organizing ? 'primary' : 'none'}>
                      {iiit.organizing && (
                        <span className="inline-block px-2 py-1 text-[10px] font-medium bg-primary/20 text-primary rounded-full mb-3">
                          Organizing IIIT
                        </span>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{iiit.spoc.name}</h4>
                          <p className="text-xs text-muted-foreground truncate">SPOC - {iiit.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{iiit.location}</span>
                        </div>
                        {iiit.spoc.phone && (
                          <a 
                            href={`tel:${iiit.spoc.phone}`}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                          >
                            <Phone className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium text-primary">Contact</span>
                          </a>
                        )}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Stats */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total IIITs', value: String(iiitsData.length) },
                { label: 'States Covered', value: '18' },
                { label: 'Total Students', value: '12K+' },
                { label: 'First Edition', value: '2026' },
              ].map((stat) => (
                <GlassCard key={stat.label} className="text-center" glow="primary">
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default IIITs;
