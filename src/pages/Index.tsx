import { memo } from "react";
import GradualBlur from "@/components/GradualBlur";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Cpu,
  Shield,
  Coins,
  Trophy,
  MapPin,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SectionHeading from "@/components/SectionHeading";
import GlassCard from "@/components/GlassCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import CRTMonitorHero from "@/components/CRTMonitorHero";
import AnimatedGradientBackground from "@/components/AnimatedGradientBackground";
import CountdownTimer from "@/components/CountdownTimer";

const stats = [
  { label: "IIITs Participating", value: 24, suffix: "" },
  { label: "Prize Pool", value: 150000, prefix: "₹", suffix: "" },
  { label: "Domains", value: 3, suffix: "" },
  { label: "Hours Hackathon", value: 24, suffix: "" },
];

const domains = [
  {
    name: "AI / ML",
    icon: Cpu,
    description:
      "Creating intelligent systems capable of performing tasks that typically require human intelligence, such as learning, reasoning, problem-solving, and decision-making.",
    color: "from-primary to-primary-glow",
  },
  {
    name: "Blockchain",
    icon: Coins,
    description:
      "Protecting computer systems, networks, and data from digital threats like attacks, damage, or unauthorized access.",
    color: "from-secondary to-secondary-glow",
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    description:
      "Decentralized, immutable digital ledger that securely records transactions across a network of computers, building trust and transparency without needing a central authority.",
    color: "from-accent to-accent-glow",
  },
];

const sponsors = [
  {
    name: "SBI Cards and Payment Services Limited",
    tier: 1,
    logo: "/sbi-card.jpg",
  },
];

const featuredIIITs = [
  { name: "IIIT Sri City", location: "Andhra Pradesh", organizing: true },
  { name: "IIIT Allahabad", location: "Uttar Pradesh" },
  { name: "IIIT Bhubaneswar", location: "Odisha" },
  { name: "IIITDM Kurnool", location: "Andhra Pradesh" },
];

const prizes = [
  {
    place: "Winner",
    amount: "₹75,000",
    extras: "Certificate + Trophy",
    gradient: "from-yellow-400 to-amber-600",
  },
  {
    place: "1st Runner-up",
    amount: "₹50,000",
    extras: "Certificate",
    gradient: "from-slate-300 to-slate-500",
  },
  {
    place: "2nd Runner-up",
    amount: "₹25,000",
    extras: "Certificate",
    gradient: "from-amber-600 to-amber-800",
  },
];

const timeline = [
  {
    round: "Round 1",
    title: "Intra-IIIT Round",
    description: "Top 4 teams from each participating IIITs will be selected",
    icon: Users,
  },
  {
    round: "Round 2",
    title: "Online Inter-IIIT Round",
    description: "Top 1 team from each participating IIIT will be selected",
    icon: Cpu,
  },
  {
    round: "Round 3",
    title: "Grand Finale @ IIIT Sri City",
    description:
      "Offline Inter-IIIT Round where  the best team from all IIITs will be decided",
    icon: Trophy,
    venue: true,
  },
];

// Simplified fade animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Memoized card components for better performance
const StatCard = memo(
  ({ stat, index }: { stat: (typeof stats)[0]; index: number }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <GlassCard className="text-center" glow="primary">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
          <AnimatedCounter
            end={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
          />
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground">
          {stat.label}
        </div>
      </GlassCard>
    </motion.div>
  )
);
StatCard.displayName = "StatCard";

const DomainCard = memo(
  ({ domain, index }: { domain: (typeof domains)[0]; index: number }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <GlassCard className="h-full group" glow="primary">
        <div
          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <domain.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 gradient-text">
          {domain.name}
        </h3>
        <p className="text-sm text-muted-foreground">{domain.description}</p>
      </GlassCard>
    </motion.div>
  )
);
DomainCard.displayName = "DomainCard";

const PrizeCard = memo(
  ({ prize, index }: { prize: (typeof prizes)[0]; index: number }) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <GlassCard
        className="text-center relative overflow-hidden"
        glow={index === 0 ? "primary" : "none"}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prize.gradient}`}
        />
        <Trophy
          className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 ${
            index === 0
              ? "text-yellow-400"
              : index === 1
              ? "text-slate-400"
              : "text-amber-600"
          }`}
        />
        <h3 className="text-lg sm:text-xl font-bold mb-1">{prize.place}</h3>
        <div className="text-sm text-gray-400 mb-2">Prizes worth</div>
        <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
          {prize.amount}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {prize.extras}
        </p>
      </GlassCard>
    </motion.div>
  )
);
PrizeCard.displayName = "PrizeCard";

const Index = () => {
  return (
    <PageTransition>
      <div className="">
        <GradualBlur
          position="bottom"
          target="page"
          exponential={true}
          strength={1.5}
          divCount={5}
          opacity={1}
          height="8rem"
        />
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <AnimatedGradientBackground />

          {/* CRT Vignette */}
          {/* <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, hsla(225 25% 4% / 0.8) 100%)",
            }}
          /> */}

          <div className="container mx-auto px-4 relative z-10 pt-16 sm:pt-28">
            <div className="text-center max-w-5xl mx-auto">
              {/* System Readout */}
              <div className="mb-6 sm:mb-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="font-mono text-xs sm:text-sm text-muted-foreground">
                    FINAL_VENUE:{" "}
                    <span className="text-primary">IIIT SRI CITY</span> {">"}{" "}
                    STATUS: <span className="text-success">CONFIRMED</span>
                  </span>
                </div>
              </div>

              {/* Main Title */}
              <h1
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-3 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="gradient-text">UDBHAV</span>
              </h1>

              {/* Tagline with ScrollReveal */}
              <div
                className="mb-6 sm:mb-8 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <ScrollReveal
                  enableBlur={true}
                  blurStrength={4}
                  baseOpacity={0.1}
                  baseRotation={3}
                  textClassName="text-lg sm:text-xl md:text-2xl text-muted-foreground"
                >
                  India's First Inter IIIT Hackathon
                </ScrollReveal>
              </div>

              {/* Countdown Timer */}
              <div
                className="mb-8 sm:mb-10 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <CountdownTimer />
              </div>

              {/* Binary Animated Readout */}
              <div
                className="mb-8 sm:mb-12 animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="glass-strong inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-xl border border-primary/20">
                  <div className="font-mono text-xs sm:text-sm md:text-base space-y-1">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                      <span className="text-primary">{">"}</span>
                      <span className="text-muted-foreground">
                        Participants...
                      </span>
                      <span className="text-success">[24 IIITs]</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                      <span className="text-secondary">{">"}</span>
                      <span className="text-muted-foreground">Domains...</span>
                      <span className="text-success">
                        [AI/ML, BLOCKCHAIN, CYBER SECURITY]
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                      <span className="text-accent">{">"}</span>
                      <span className="text-muted-foreground">
                        Prize pool...
                      </span>
                      <span className="text-warning">[₹1,50,000]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CRT Monitor with Orbiting Photos */}
              {/*<div
                className="animate-fade-in"
                style={{ animationDelay: "0.8s" }}
              >
                <CRTMonitorHero />
              </div>*/}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16 md:py-20 w-[90%] mx-auto relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Domains Section */}
        <section className="py-12 sm:py-16 md:py-20  w-[90%] mx-auto relative">
          <div className="container mx-auto px-3">
            <SectionHeading
              title="Competition Domains"
              subtitle="Choose your battlefield and showcase your expertise"
            />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {domains.map((domain, index) => (
                <DomainCard key={domain.name} domain={domain} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="container mx-auto px-4 relative">
            <SectionHeading
              title="Prizes"
              subtitle="Compete for glory and rewards"
            />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {prizes.map((prize, index) => (
                <PrizeCard key={prize.place} prize={prize} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors Preview */}
        <section className="py-12 sm:py-16 md:py-20 relative">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Our Sponsors"
              subtitle="Backed by industry leaders"
            />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="w-full sm:w-80"
                >
                  <GlassCard
                    className="text-center aspect-video flex items-center justify-center bg-white p-4"
                    glow={sponsor.tier === 1 ? "primary" : "none"}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/sponsors">
                  View All Sponsors <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* IIITs Preview */}
        <section className="py-12 sm:py-16 md:py-20  w-[90%] mx-auto relative">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Participating IIITs"
              subtitle="The brightest institutions, united"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {featuredIIITs.map((iiit, index) => (
                <motion.div
                  key={iiit.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    to={`/iiits/${iiit.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <GlassCard
                      className="text-center h-full group"
                      glow={iiit.organizing ? "primary" : "none"}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                        {iiit.name === "IIIT Sri City" && (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/en/4/49/IIIT_Sri_City_Logo.png"
                            alt="IIIT Sri City Logo"
                            className="object-contain w-10 h-10 sm:w-14 sm:h-14"
                          />
                        )}
                        {iiit.name === "IIIT Allahabad" && (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/en/2/2e/Indian_Institute_of_Information_Technology%2C_Allahabad_Logo.png"
                            alt="IIIT Allahabad Logo"
                            className="object-contain w-10 h-10 sm:w-14 sm:h-14"
                          />
                        )}
                        {iiit.name === "IIIT Bhubaneswar" && (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/en/b/b2/IIIT_Bhubaneswar_Logo.png"
                            alt="IIIT Bhubaneswar Logo"
                            className="object-contain w-14 h-14 sm:w-14 sm:h-14"
                          />
                        )}
                        {iiit.name === "IIITDM Kurnool" && (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/en/5/5f/Indian_Institute_of_Information_Technology_Design_and_Manufacturing%2C_Kurnool_logo.png"
                            alt="IIITDM Kurnool Logo"
                            className="object-contain w-10 h-10 sm:w-14 sm:h-14"
                          />
                        )}
                        {/* fallback icon if no logo */}
                        {!(
                          iiit.name === "IIIT Sri City" ||
                          iiit.name === "IIIT Allahabad" ||
                          iiit.name === "IIIT Bhubaneswar" ||
                          iiit.name === "IIITDM Kurnool"
                        ) && (
                          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold mb-1">
                        {iiit.name}
                      </h3>
                      <div className="flex items-center justify-center gap-1 text-xs sm:text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {iiit.location}
                      </div>
                      {iiit.organizing && (
                        <span className="inline-block px-2 py-1 mt-2 text-[10px] sm:text-xs font-medium bg-primary/20 text-primary rounded-full">
                          Organizing
                        </span>
                      )}
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/iiits">
                  View All IIITs <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Event Timeline */}
        <section className="py-12 sm:py-16 md:py-20 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="container mx-auto px-4 relative">
            <SectionHeading
              title="Event Overview"
              subtitle="Your journey to innovation"
            />
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

                {timeline.map((item, index) => (
                  <motion.div
                    key={item.round}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeIn}
                    transition={{ delay: index * 0.15, duration: 0.4 }}
                    className="relative pl-16 sm:pl-20 pb-8 sm:pb-12 last:pb-0"
                  >
                    <div
                      className={`absolute left-2 sm:left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                        "venue" in item
                          ? "bg-gradient-to-br from-yellow-400 to-amber-600 ring-2 ring-yellow-400/50"
                          : "bg-gradient-to-br from-primary to-accent"
                      }`}
                    >
                      <item.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <GlassCard
                      glow={"venue" in item ? "secondary" : "primary"}
                      className={"venue" in item ? "border-yellow-400/30" : ""}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] sm:text-xs font-mono text-primary">
                          {item.round}
                        </span>
                        {"venue" in item && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-yellow-400/20 text-yellow-400 rounded-full">
                            <MapPin className="w-3 h-3" /> Final Venue
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {item.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
