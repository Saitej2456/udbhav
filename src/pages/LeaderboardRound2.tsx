import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Medal, Award, AlertCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

import CountdownTimer from "@/components/CountdownTimer";

// Real Round 2 Results from UDBHAV 2026
const round2Results = [
  { rank: 1, team: 'DAOMINATORS', iiit: 'IIIT Allahabad', score: 78, judges: 'Anurag Singh, Siddhi Khaire' },
  { rank: 2, team: 'Bancode', iiit: 'IIIT Bhubaneswar', score: 77, judges: 'Daavya, Vrijraj Singh' },
  { rank: 3, team: 'Nocturnal_Coders', iiit: 'IIITDM Kurnool', score: 76.75, judges: 'Aakash DhakshnaMoorthy, Shishir Srivastav' },
  { rank: 4, team: 'SINISTER-6', iiit: 'IIIT Dharwad', score: 76, judges: 'Rajni Singh, Shishir Srivastav' },
  { rank: 5, team: 'Kaizen', iiit: 'IIIT Manipur', score: 75, judges: 'Daavya, Vrijraj Singh' },
  { rank: 6, team: 'Zero-Deadlock', iiit: 'IIIT Raichur', score: 74.5, judges: 'Aditya Kumar Singh, Karan Vaswani' },
  { rank: 7, team: 'KanyaRaasi', iiit: 'IIIT Kottayam', score: 74, judges: 'Aman Sharma, Yukti Thakral' },
  { rank: 8, team: "Bohar's Bit", iiit: 'IIIT Sri City', score: 71.5, judges: 'Dhruv Verma, Pawan Singhla' },
  { rank: 9, team: 'DivFlow', iiit: 'IIITV-ICD', score: 70.5, judges: 'Aakash DhakshnaMoorthy, Shishir Srivastav' },
  { rank: 10, team: 'HackSmith', iiit: 'IIIT Kota', score: 70, judges: 'Aakash DhakshnaMoorthy, Shishir Srivastav' },
  { rank: 11, team: 'Team notFound', iiit: 'IIIT Bhagalpur', score: 69, judges: 'Rajni Singh, Shishir Srivastav' },
  { rank: 12, team: 'CBOW', iiit: 'IIIT Naya Raipur', score: 68, judges: 'Aditya Kumar Singh, Karan Vaswani' },
  { rank: 13, team: 'The Hawkings', iiit: 'IIIT Tiruchirappalli', score: 68, judges: 'Anurag Singh, Siddhi Khaire' },
  { rank: 14, team: '404 Found', iiit: 'IIIT Bhopal', score: 67, judges: 'Rajni Singh, Shishir Srivastav' },
  { rank: 15, team: 'DBDT', iiit: 'IIIT Surat', score: 67, judges: 'Tanisha Bansal, Kamal Kashyap' },
  { rank: 16, team: 'SnackOverflow', iiit: 'IIITDM Kancheepuram', score: 67, judges: 'Daavya, Vrijraj Singh' },
  { rank: 17, team: 'PromptOps', iiit: 'IIIT Una', score: 62, judges: 'Anurag Singh, Siddhi Khaire' },
  { rank: 18, team: 'Techtonics_IIITAgartala', iiit: 'IIIT Agartala', score: 60, judges: 'Aman Sharma, Yukti Thakral' },
  { rank: 19, team: 'Block E-state', iiit: 'IIIT Delhi', score: 59, judges: 'Tanisha Bansal, Kamal Kashyap' },
  { rank: 20, team: 'Swarnprasth Supremacy', iiit: 'IIIT Sonepat', score: 57.5, judges: 'Dhruv Verma, Pawan Singhla' },
  { rank: 21, team: 'Neuronix', iiit: 'IIIT Nagpur', score: 51.5, judges: 'Aditya Kumar Singh, Karan Vaswani' },
  { rank: 22, team: 'Zodiac Z408', iiit: 'IIIT Vadodara', score: 51.5, judges: 'Dhruv Verma, Pawan Singhla' },
];

const rules = [
  'Each team has been evaluated by two judges',
  'Each judge scores teams out of 45 marks',
  'Final total score is out of 90 marks (45 + 45)',
  'Original work only - all submissions verified',
  'Any technology stack is allowed',
  'AI-generated content without significant modification results in negative scoring',
];

const LeaderboardRound2 = () => {
  const location = useLocation();

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
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground">Round 2 - Online Ideathon</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              Conducted on Unstop Platform | Finale at IIIT Sri City
            </div>
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
                variant={location.pathname.includes('round-2') ? 'default' : 'ghost'}
              >
                <Link to="/leaderboard/round-2">Round 2</Link>
              </Button>
              <Button
                asChild
                variant={location.pathname.includes('round-3') ? 'default' : 'ghost'}
              >
                <Link to="/leaderboard/round-3">Round 3 (Finale)</Link>
              </Button>
            </div>
          </motion.div>

          {/* Rules */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <GlassCard className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-warning shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-3">Evaluation Criteria</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {rules.map((rule, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary font-mono">{String(index + 1).padStart(2, '0')}.</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Leaderboard Table */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Rankings" subtitle={`${round2Results.length} teams qualified for Round 2`} />
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Rank</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Team</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">IIIT</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Score /90</th>
                    <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Judges</th>
                  </tr>
                </thead>
                <tbody>
                  {round2Results.map((team, index) => (
                    <motion.tr
                      key={team.team}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ 
                        scale: 1.01, 
                        x: 5,
                        transition: { duration: 0.15 }
                      }}
                      className={`border-b border-border/50 hover:bg-card/50 transition-colors cursor-pointer crt-hover ${
                        team.rank <= 3 ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {team.rank === 1 ? (
                            <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />
                          ) : team.rank === 2 ? (
                            <Medal className="w-5 h-5 text-slate-400" />
                          ) : team.rank === 3 ? (
                            <Award className="w-5 h-5 text-amber-600" />
                          ) : (
                            <span className="w-5 text-center font-mono text-muted-foreground">{team.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold glitch-text">{team.team}</span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{team.iiit}</td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-primary font-semibold">{team.score}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground hidden md:table-cell">{team.judges}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Note about qualification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <GlassCard className="text-center max-w-2xl mx-auto" glow="primary">
              <h3 className="text-lg font-bold mb-2">Qualification Note</h3>
              <p className="text-muted-foreground text-sm">
                The team with the highest cumulative score from each IIIT has qualified for the Finale Round 
                that will happen at IIIT Sri City.
              </p>
            </GlassCard>
          </motion.div> 
        </div>
      </div>
    </PageTransition>
  );
};

export default LeaderboardRound2;
