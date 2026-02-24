import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

interface Sponsor {
  name: string;
  logo: string;
  website?: string;
  maxHeight?: string;
  maxWidth?: string;
}

interface SponsorCategory {
  title: string;
  sponsors: Sponsor[];
  gridClass?: string;
}

const sponsorCategories: SponsorCategory[] = [
  {
    title: "Community Partners",
    sponsors: [
      { name: "Hacktour India", logo: "/hacktour.png", maxHeight: "max-h-28" },
      { name: "Hackhalt", logo: "/Hackhalt.jpg" },
    ],
    gridClass: "grid-cols-1 md:grid-cols-2 gap-8",
  },
  {
    title: "Platform Partner",
    sponsors: [
      { name: "Unstop", logo: "/unstop.jpg", maxHeight: "max-h-28", maxWidth:"w-40" },
    ],
    gridClass: "grid-cols-1 max-w-2xl mx-auto",
  },
  {
    title: "Merchandise Partner",
    sponsors: [
      { name: "Doon Merchandise", logo: "/doonmerchandise.png", maxHeight: "max-h-28" },
    ],
    gridClass: "grid-cols-1 max-w-md mx-auto",
  },
  {
    title: "Hiring Partner",
    sponsors: [
      { name: "Velric", logo: "/velcric.jpeg" },
    ],
    gridClass: "grid-cols-1 max-w-md mx-auto",
  },
  {
    title: "EdTech Partner",
    sponsors: [
      { name: "GoClasses", logo: "/goclasses.png" },
    ],
    gridClass: "grid-cols-1 max-w-md mx-auto",
  },
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

          {/* Sponsor Categories */}
          <div className="space-y-20">
            {sponsorCategories.map((category, categoryIndex) => (
              <motion.section
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  <span className="gradient-text">{category.title}</span>
                </h2>
                <div className={`grid ${category.gridClass}`}>
                  {category.sponsors.map((sponsor, index) => (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="group"
                    >
                      <div className="glass-card p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 h-full flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className={`w-full h-auto ${sponsor.maxHeight || "max-h-32"} object-contain transition-all duration-300`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Become a Sponsor CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="glass-card p-12 rounded-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Interested in Sponsoring?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join us in empowering the next generation of innovators and
                technologists across India
              </p>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:udbhav@iiits.in">
                  <Mail className="mr-2 w-4 h-4" />
                  Become a Sponsor
                </a>
              </Button>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;
