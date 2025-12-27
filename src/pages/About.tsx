import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Users, 
  Lightbulb, 
  Globe, 
  Calendar, 
  MapPin, 
  Trophy,
  Code,
  Rocket,
  Heart,
  ChevronRight,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: Globe,
    title: 'Open to All Domains',
    description: 'An open hackathon involving all domains of the ever-growing IT world - from AI/ML to Blockchain to Cybersecurity.',
  },
  {
    icon: Users,
    title: 'Inter-IIIT Collaboration',
    description: 'Teams from different IIITs unite, bringing diverse perspectives and fostering nationwide collaboration.',
  },
  {
    icon: Lightbulb,
    title: 'Choose Your Challenge',
    description: 'Teams can choose their respective domains and problem statements, allowing their best form to shine.',
  },
  {
    icon: Trophy,
    title: 'Compete for Glory',
    description: 'Showcase your skills, compete with the brightest minds, and win prizes worth ₹1,50,000.',
  },
];

const timeline = [
  {
    round: 'Round 1',
    title: 'Team Formation & Intra-IIIT Selection',
    description: 'Each IIIT conducts internal selections. Top 4 teams from each institute qualify for the next round.',
    icon: Users,
    status: 'upcoming',
  },
  {
    round: 'Round 2',
    title: 'Online Ideathon',
    description: '12-hour online hackathon on Unstop platform. Teams present their ideas and prototypes.',
    icon: Code,
    status: 'upcoming',
  },
  {
    round: 'Round 3',
    title: 'Grand Finale @ IIIT Sri City',
    description: '24-hour offline hackathon at IIIT Sri City, Andhra Pradesh. Top teams battle for the championship.',
    icon: Trophy,
    status: 'upcoming',
    highlight: true,
  },
];

const stats = [
  { value: '24+', label: 'IIITs Participating' },
  { value: '100+', label: 'Teams Expected' },
  { value: '₹1.5L', label: 'Prize Pool' },
  { value: '24hrs', label: 'Hackathon Duration' },
];

const organizingTeam = [
  { role: 'Organiser', name: 'Sripathy Siddartha' },
  { role: 'Head - Operations', name: 'K Sidharth' },
  { role: 'Head - Finance', name: 'Shounak Banerjee' },
  { role: 'Chief of Records', name: 'Raniel Babu Chintha' },
  { role: 'Head - Social Media', name: 'Saptarsi' },
  { role: 'Program Director', name: 'Sai Tej' },
];

const faqs = [
  {
    question: 'Who can participate in UDBHAV?',
    answer: 'UDBHAV is exclusively open to students from all IIITs (Indian Institutes of Information Technology) across India. Students from any year of study can participate as long as they are currently enrolled.',
  },
  {
    question: 'How do I register for UDBHAV?',
    answer: 'Registration happens through your IIIT\'s tech club. First, participate in your institute\'s internal selection (Round 1). The top 4 teams from each IIIT will qualify for Round 2 on Unstop. Contact your IIIT\'s SPOC for more details.',
  },
  {
    question: 'What is the team size requirement?',
    answer: 'Each team must consist of 3-4 members. All team members must be from the same IIIT. Cross-IIIT teams are not allowed.',
  },
  {
    question: 'What domains can we build projects in?',
    answer: 'UDBHAV covers three main domains: AI/ML (Machine Learning, Deep Learning, NLP, Computer Vision), Blockchain (Web3, DeFi, Smart Contracts), and Cybersecurity (Network Security, Cryptography). Teams can choose any domain and problem statement within these areas.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'No, participation in UDBHAV is completely free. There are no registration fees for any round of the hackathon.',
  },
  {
    question: 'What are the prizes?',
    answer: 'The total prize pool is ₹1,50,000. Winner receives ₹75,000 + Certificate + Trophy, 1st Runner-up receives ₹50,000 + Certificate, and 2nd Runner-up receives ₹25,000 + Certificate.',
  },
  {
    question: 'Where is the final round held?',
    answer: 'The Grand Finale (Round 3) will be held at IIIT Sri City, Andhra Pradesh on 24-25 January 2026. It is a 24-hour offline hackathon. Travel and accommodation details will be shared with qualified teams.',
  },
  {
    question: 'How many teams qualify from each IIIT?',
    answer: 'Top 4 teams from each IIIT\'s internal selection qualify for Round 2. From Round 2, the top-performing teams across all IIITs will be invited to the Grand Finale at IIIT Sri City.',
  },
];

const FeatureCard = memo(({ feature, index }: { feature: typeof features[0]; index: number }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={fadeIn}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <GlassCard className="h-full group" glow="primary">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <feature.icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </GlassCard>
  </motion.div>
));
FeatureCard.displayName = 'FeatureCard';

const About = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">India's First Inter-IIIT Hackathon</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              About <span className="gradient-text">UDBHAV</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              UDBHAV is India's First Inter-IIIT Hackathon, an open hackathon to involve all domains 
              of the ever-growing IT World. Teams from different IIITs can choose their respective 
              domains and problem statements, allowing their best form to come out to the world.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">24-25 January 2026</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">IIIT Sri City, Andhra Pradesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <GlassCard className="text-center" glow="primary">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="What Makes UDBHAV Special" 
            subtitle="A platform for innovation, collaboration, and excellence" 
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="text-center" glow="secondary">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  To create a unified platform where the brightest minds from all IIITs across India 
                  can collaborate, innovate, and push the boundaries of technology. UDBHAV aims to 
                  foster a culture of innovation while building lasting connections across institutions.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Event Timeline" 
            subtitle="Your journey from selection to the grand finale" 
          />
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.round}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.15, duration: 0.4 }}
                  className="relative pl-16 sm:pl-20 pb-10 last:pb-0"
                >
                  <div className={`absolute left-2 sm:left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                    item.highlight 
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-600 ring-2 ring-yellow-400/50' 
                      : 'bg-gradient-to-br from-primary to-accent'
                  }`}>
                    <item.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <GlassCard glow={item.highlight ? 'secondary' : 'primary'} className={item.highlight ? 'border-yellow-400/30' : ''}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-primary">{item.round}</span>
                      {item.highlight && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-yellow-400/20 text-yellow-400 rounded-full">
                          <MapPin className="w-3 h-3" /> Final Venue
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizing Team Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container mx-auto px-4 relative">
          <SectionHeading 
            title="Organizing Committee" 
            subtitle="The team behind UDBHAV from IIIT Sri City" 
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {organizingTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{member.name}</h4>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Everything you need to know about UDBHAV" 
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Common Questions</h3>
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-border/50 rounded-lg px-4 data-[state=open]:bg-card/50"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <GlassCard className="relative overflow-hidden" glow="primary">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              <Rocket className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Join UDBHAV?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Be part of India's first Inter-IIIT Hackathon. Connect with your local IIIT tech club 
                to participate in the intra-IIIT selection rounds.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/iiits">
                    View Participating IIITs <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/teams">
                    Meet the Teams <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
