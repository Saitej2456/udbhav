import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

// Sponsor data will be revealed soon; keeping arrays empty for now.
const tier1Sponsors: never[] = [];
const tier2Sponsors: never[] = [];
const otherSponsors: never[] = [];

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

          {/* Sponsors Coming Soon */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center py-32 min-h-96 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Sponsors will be revealed soon</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're excited to announce our partners. Stay tuned for updates!
            </p>
          </motion.section>

          {/* Become a Sponsor CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Button asChild variant="outline" size="lg">
              <a href="mailto:udbhav@iiits.in">
                <Mail className="mr-2 w-4 h-4" />
                Become a Sponsor
              </a>
            </Button>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;
