import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ExternalLink, Star, Map, User, Phone, Instagram, Linkedin, Search, X, Mail } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IndiaMap3D from '@/components/IndiaMap3D';
import { iiitsData } from '@/data/iiits';

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
      iiit.spoc.name.toLowerCase().includes(query) ||
      iiit.spoc.department?.toLowerCase().includes(query) ||
      iiit.spoc.email?.toLowerCase().includes(query)
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
              {iiitsData.length} IIITs, united for innovation
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
                          <div className="w-24 h-24 rounded-2xl bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform p-2 overflow-hidden">
                            <img 
                              src="/photos/iiit sri city.png" 
                              alt="IIIT Sri City logo"
                              className="w-full h-full object-contain"
                            />
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
                  {otherIIITs.map((iiit, index) => {
                    // Map IIIT logos
                    const logoMap: Record<string, string> = {
                      'iiit-agartala': '/photos/Indian_Institute_of_Information_Technology,_Agartala_Logo.png',
                      'iiit-allahabad': '/photos/IIIT_allahabad.png',
                      'iiit-bhagalpur': '/photos/Indian_Institute_of_Information_Technology,_Bhagalpur_logo.png',
                      'iiit-bhopal': '/photos/Indian_Institute_of_Information_Technology,_Bhopal_Logo.png',
                      'iiit-bhubaneshwar': '/photos/IIIT_Bhubaneswar_Logo.png',
                      'iiit-dharwad': '/photos/Indian_Institute_of_Information_Technology,_Dharwad_Logo.svg.png',
                      'iiit-kota': '/photos/iiitkota.png',
                      'iiit-kottayam': '/photos/iiit kottayam.jpg',
                      'iiit-manipur': '/photos/IIIT_Manipur.png',
                      'iiit-naya-raipur': '/photos/iiit naya raipur.jpg',
                      'iiit-raichur': '/photos/IIIT Raichur.png',
                      'iiit-sonepat': '/photos/Indian_Institute_of_Information_Technology,_Sonepat_logo.png',
                      'iiit-surat': '/photos/IIIT_Surat_logo.jpg',
                      'iiit-tiruchirappalli': '/photos/iiit trichy.png',
                      'iiit-una': '/photos/Indian_Institute_of_Information_Technology,_Una_logo.png',
                      'iiit-vadodara': '/photos/iiit vadodra.png',
                      'iiitdm-kurnool': '/photos/Indian_Institute_of_Information_Technology_Design_and_Manufacturing,_Kurnool_logo.png',
                      'iiitv-icd': '/photos/iiit vcd.png',
                      'iiit-nagpur': '/photos/iiit nagpur.png',
                      'iiitdm-kancheepuram': '/photos/iiitdm kancheepuram.png',
                      'iiit-delhi': '/photos/iiit delhi.png',
                      'iiit-sri-city': '/photos/iiit sri city.png',
                    };
                    const logo = logoMap[iiit.id];
                    
                    return (
                    <motion.div
                      key={iiit.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <GlassCard className="h-full group" hover>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors overflow-hidden p-1">
                            {logo ? (
                              <img 
                                src={logo} 
                                alt={`${iiit.name} logo`}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                {iiit.name.split(' ')[1]?.substring(0, 3) || 'IIIT'}
                              </span>
                            )}
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
                    );
                  })}
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
                      {iiit.spoc.department && (
                        <p className="text-xs font-medium text-primary mb-2 truncate">{iiit.spoc.department}</p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{iiit.location}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {iiit.spoc.phone && (
                          <a 
                            href={`tel:${iiit.spoc.phone}`}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                          >
                            <Phone className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium text-primary">Call</span>
                          </a>
                        )}
                        {iiit.spoc.email && (
                          <a
                            href={`mailto:${iiit.spoc.email}`}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
                          >
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs font-medium text-foreground truncate">Email</span>
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
