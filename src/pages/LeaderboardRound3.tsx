import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Trophy, Medal, Award, Crown, Star, Sparkles } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";

import CountdownTimer from "@/components/CountdownTimer";

const finalists = [
  {
    rank: 1,
    team: "SINISTER-6",
    iiit: "IIIT Dharwad",
    score: 100,
    project: "Problem Statement: 1",
  },
  {
    rank: 2,
    team: "Neuronix",
    iiit: "IIIT Nagpur",
    score: 95,
    project: "Medora",
  },
  {
    rank: 3,
    team: "Bohar's Bit",
    iiit: "IIIT Sri City",
    score: 90,
    project: "Problem Statement: 2",
  },
  {
    rank: 4,
    team: "404 Found",
    iiit: "IIIT Bhopal",
    score: 87,
    project: "Problem Statement: 1",
  },
  {
    rank: 5,
    team: "Block E-state",
    iiit: "IIIT Delhi",
    score: 85,
    project: "Problem Statement: 2",
  },
  {
    rank: 6,
    team: "Techtonics_IIIT Agartala",
    iiit: "IIIT Agartala",
    score: 83,
    project: "SecureEdge",
  },
  {
    rank: 7,
    team: "Bancode",
    iiit: "IIIT Bhubaneswar",
    score: 81,
    project: "Problem Statement: 1",
  },
  {
    rank: 8,
    team: "DivFlow",
    iiit: "IIIT Vadodara-ICD",
    score: 79,
    project: "Divflow",
  },
  {
    rank: 9,
    team: "DAOMINATORS",
    iiit: "IIIT Allahabad",
    score: 77,
    project: "Bhumi",
  },
  {
    rank: 10,
    team: "Sysmon",
    iiit: "TBA",
    score: 75,
    project: "TBA",
  },
  {
    rank: 11,
    team: "Kaizen",
    iiit: "IIIT Manipur",
    score: 73,
    project: "E-parchi",
  },
  {
    rank: 12,
    team: "CBOW",
    iiit: "IIIT Naya Raipur",
    score: 71,
    project: "Problem Statement: 1",
  },
  {
    rank: 13,
    team: "KanyaRaasi",
    iiit: "IIIT Kottayam",
    score: 69,
    project: "Problem Statement: 1",
  },
  {
    rank: 14,
    team: "Nocturnal_Coders",
    iiit: "IIIT Kurnool",
    score: 67,
    project: "GenAI-Powered Clinical Note Summarization",
  },
  {
    rank: 15,
    team: "Zodaic_Z408",
    iiit: "IIIT Vadodara",
    score: 65,
    project: "TitleVault",
  },
  {
    rank: 16,
    team: "Hexsmith",
    iiit: "TBA",
    score: 63,
    project: "TBA",
  },
  {
    rank: 17,
    team: "Zero-Deadlock",
    iiit: "IIIT Raichur",
    score: 61,
    project: "Med-Insight-AI",
  },
  {
    rank: 18,
    team: "PromptOps",
    iiit: "IIIT Una",
    score: 59,
    project: "NeoMed",
  },
  {
    rank: 19,
    team: "DBDT",
    iiit: "IIIT Surat",
    score: 57,
    project: "LandTrust",
  },
  {
    rank: 20,
    team: "The Hawkings",
    iiit: "IIIT Tiruchirappalli",
    score: 55,
    project: "Problem Statement: 1",
  },
  {
    rank: 21,
    team: "SnackOverflow",
    iiit: "IIIT Kancheepuram",
    score: 53,
    project: "Problem Statement: 1",
  },
];

const prizes = [
  {
    place: "Winner",
    amount: "₹75,000",
    icon: Crown,
    gradient: "from-yellow-400 to-amber-600",
    extras: "Certificate + Trophy",
  },
  {
    place: "1st Runner-up",
    amount: "₹50,000",
    icon: Trophy,
    gradient: "from-slate-300 to-slate-500",
    extras: "Certificate",
  },
  {
    place: "2nd Runner-up",
    amount: "₹25,000",
    icon: Medal,
    gradient: "from-amber-600 to-amber-800",
    extras: "Certificate",
  },
];

const LeaderboardRound3 = () => {
  const location = useLocation();
  const topThree = finalists.slice(0, 3);
  const rest = finalists.slice(3);

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
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Grand Finale
              </span>
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Final Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Round 3 - The Champions
            </p>
          </motion.div>

          {/* Round Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="glass inline-flex rounded-lg p-1">
              <Button
                asChild
                variant={
                  location.pathname.includes("round-2") ? "default" : "ghost"
                }
              >
                <Link to="/leaderboard/round-2">Round 2</Link>
              </Button>
              <Button
                asChild
                variant={
                  location.pathname.includes("round-3") ? "default" : "ghost"
                }
              >
                <Link to="/leaderboard/round-3">Round 3 (Finale)</Link>
              </Button>
            </div>
          </motion.div>

          {/* Top 3 Podium */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="order-1 md:order-1"
              >
                <GlassCard
                  className="text-center relative overflow-hidden"
                  glow="secondary"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prizes[1].gradient}`}
                  />
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg">
                    <Trophy className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-slate-400 mb-2">
                    2nd
                  </div>
                  <h3 className="text-xl font-bold mb-1">To Be Announced</h3>
                  <p className="text-sm text-muted-foreground mb-2">—</p>
                  <div className="text-2xl font-bold gradient-text mb-1">
                    Prize TBA
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Details will be revealed
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <span className="font-medium">Project:</span> To Be
                    Announced
                  </div>
                </GlassCard>
              </motion.div>

              {/* 1st Place - Winner */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="order-2 md:order-2"
              >
                <GlassCard
                  className="text-center relative overflow-hidden md:-mt-8"
                  glow="primary"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${prizes[0].gradient}`}
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Crown className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                  </div>
                  <div className="w-28 h-28 mx-auto mb-4 mt-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-glow-primary animate-pulse-glow">
                    <Star className="w-14 h-14 text-primary-foreground" />
                  </div>
                  <div className="text-5xl font-bold text-yellow-400 mb-2 text-glow-primary">
                    1st
                  </div>
                  <h3 className="text-2xl font-bold mb-1">
                    Winner To Be Announced
                  </h3>
                  <p className="text-muted-foreground mb-2">—</p>
                  <div className="text-3xl font-bold gradient-text mb-1">
                    Prize TBA
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Stay tuned for results
                  </p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="font-medium">Project:</span> To Be
                    Announced
                  </div>
                </GlassCard>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="order-3 md:order-3"
              >
                <GlassCard
                  className="text-center relative overflow-hidden"
                  glow="accent"
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${prizes[2].gradient}`}
                  />
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                    <Medal className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold text-amber-600 mb-2">
                    3rd
                  </div>
                  <h3 className="text-xl font-bold mb-1">To Be Announced</h3>
                  <p className="text-sm text-muted-foreground mb-2">—</p>
                  <div className="text-2xl font-bold gradient-text mb-1">
                    Prize TBA
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Will be announced soon
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <span className="font-medium">Project:</span> To Be
                    Announced
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </motion.section>

          <div
            className="mb-8 sm:mb-10 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <CountdownTimer />
          </div>

          {/* Rest of Finalists */}
       {/* {   <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              <span className="gradient-text">All Finalists</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Rank</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Team</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">IIIT</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Project</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((team, index) => (
                    <motion.tr
                      key={team.team}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-card/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono text-muted-foreground">{team.rank}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold">{team.team}</span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{team.iiit}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{team.project}</td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-primary">{team.score}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>} */}

          
        </div>
      </div>
    </PageTransition>
  );
};

export default LeaderboardRound3;
