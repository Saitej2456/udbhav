import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';

const tier1Sponsors = [
  { name: 'TechGiant Corp', logo: 'TG', description: 'Leading technology solutions provider' },
  { name: 'InnovateLabs', logo: 'IL', description: 'Pioneering AI research company' },
  { name: 'Future Systems', logo: 'FS', description: 'Cloud infrastructure specialists' },
];

const tier2Sponsors = [
  { name: 'Digital Pioneers', logo: 'DP', description: 'Digital transformation experts' },
  { name: 'CodeCraft Inc', logo: 'CC', description: 'Software development leaders' },
  { name: 'DataFlow', logo: 'DF', description: 'Big data analytics platform' },
  { name: 'SecureNet', logo: 'SN', description: 'Cybersecurity solutions' },
];

const otherSponsors = [
  { name: 'StartupHub', logo: 'SH' },
  { name: 'DevTools Pro', logo: 'DT' },
  { name: 'CloudBase', logo: 'CB' },
  { name: 'AIFirst', logo: 'AF' },
  { name: 'BlockChain Labs', logo: 'BL' },
  { name: 'Quantum Computing', logo: 'QC' },
  { name: 'Neural Networks', logo: 'NN' },
  { name: 'Edge Computing', logo: 'EC' },
];

const Sponsors = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Our Sponsors</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Backed by industry leaders who believe in empowering the next generation of innovators
            </p>
          </motion.div>

          {/* Tier 1 Sponsors */}
          <section className="mb-20">
            <SectionHeading
              title="Platinum Partners"
              subtitle="Our premier sponsors driving innovation"
            />
            <div className="grid md:grid-cols-3 gap-8">
              {tier1Sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <GlassCard className="text-center h-full group" glow="primary">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-colors group-hover:shadow-glow-primary">
                      <span className="text-4xl font-bold gradient-text">{sponsor.logo}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{sponsor.name}</h3>
                    <p className="text-muted-foreground">{sponsor.description}</p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      Platinum
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tier 2 Sponsors */}
          <section className="mb-20">
            <SectionHeading
              title="Gold Partners"
              subtitle="Supporting excellence in technology"
            />
            <div className="grid md:grid-cols-4 gap-6">
              {tier2Sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="text-center h-full group" glow="secondary">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center border border-secondary/30 group-hover:border-secondary/60 transition-colors">
                      <span className="text-2xl font-bold gradient-text-secondary">{sponsor.logo}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{sponsor.name}</h3>
                    <p className="text-sm text-muted-foreground">{sponsor.description}</p>
                    <div className="mt-3 inline-block px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      Gold
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Other Sponsors */}
          <section>
            <SectionHeading
              title="Community Partners"
              subtitle="Making this event possible"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {otherSponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard className="text-center aspect-square flex flex-col items-center justify-center group p-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center mb-2 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {sponsor.logo}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center">
                      {sponsor.name}
                    </span>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Become a Sponsor CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <GlassCard className="text-center max-w-2xl mx-auto" glow="accent">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Become a Sponsor</h2>
              <p className="text-muted-foreground">
                Partner with UDBHAV and connect with the brightest minds from India's premier technical institutions.
              </p>
            </GlassCard>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;
