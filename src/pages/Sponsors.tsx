import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";

const tier1Sponsors = [
  {
    name: "SBI Cards and Payment Services Limited",
    logo: "/sbi-card.jpg",
    description: "Leading payment solutions provider",
  },
];

const tier2Sponsors = [
  {
    name: "SBI Cards and Payment Services Limited",
    logo: "/sbi-card.jpg",
    description: "Leading payment solutions provider",
  },
];

const otherSponsors = [
  { name: "SBI Cards and Payment Services Limited", logo: "/sbi-card.jpg" },
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
              Backed by industry leaders who believe in empowering the next
              generation of innovators
            </p>
          </motion.div>

          {/* Tier 1 Sponsors */}
          <section className="mb-20">
            <SectionHeading
              title="Diamond Partners"
              subtitle="Our premier sponsors driving innovation"
            />
            <div className="flex flex-wrap justify-center gap-8">
              {tier1Sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="w-full md:w-80"
                >
                  <GlassCard
                    className="text-center h-full group"
                    glow="primary"
                  >
                    <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-white flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-colors group-hover:shadow-glow-primary overflow-hidden">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{sponsor.name}</h3>
                    <p className="text-muted-foreground">
                      {sponsor.description}
                    </p>
                    <div className="mt-4 inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      Diamond
                    </div>
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
            className="mt-20 text-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link to="/sponsors">
                Become a Sponsor <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;
