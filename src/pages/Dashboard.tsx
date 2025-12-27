import { motion } from 'framer-motion';
import { Users, Edit2, Bell, Trophy, Mail, Phone, Calendar, MapPin, ExternalLink, Github } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

const teamData = {
  name: 'TechTitans',
  iiit: 'IIIT Sonepat',
  representative: 'Vikram Singh',
  rank: 1,
  status: 'Finalist',
  members: [
    { name: 'Vikram Singh', batch: '2022', email: 'vikram@iiitsonepat.ac.in', phone: '+91 98765 43210' },
    { name: 'Priya Patel', batch: '2022', email: 'priya@iiitsonepat.ac.in', phone: '+91 98765 43211' },
    { name: 'Rahul Mehta', batch: '2023', email: 'rahul@iiitsonepat.ac.in', phone: '+91 98765 43212' },
    { name: 'Sneha Gupta', batch: '2023', email: 'sneha@iiitsonepat.ac.in', phone: '+91 98765 43213' },
  ],
  project: {
    name: 'AI-Powered Healthcare Platform',
    description: 'An intelligent healthcare platform that uses machine learning to predict diseases, recommend treatments, and connect patients with specialists. Features include symptom analysis, medical image interpretation, and personalized health recommendations.',
    domain: 'AI/ML',
    github: 'https://github.com/techtitans/healthcare-ai',
    demo: 'https://healthcare-ai.demo.com',
    techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
  },
};

const announcements = [
  { id: 1, title: 'Grand Finale Schedule Released', date: '2024-03-15', type: 'info' },
  { id: 2, title: 'Project Submission Deadline Extended', date: '2024-03-10', type: 'warning' },
  { id: 3, title: 'Congratulations on Qualifying to Finals!', date: '2024-03-05', type: 'success' },
  { id: 4, title: 'Round 2 Results Announced', date: '2024-03-01', type: 'info' },
];

const Dashboard = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="gradient-text">Team Dashboard</span>
                </h1>
                <p className="text-muted-foreground">Welcome back, {teamData.representative}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/20 text-success">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Rank #{teamData.rank}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {teamData.status}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Team Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Team Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassCard glow="primary">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Team Info
                    </h2>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Team Name</p>
                      <p className="font-semibold text-lg">{teamData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">IIIT</p>
                      <p className="font-semibold">{teamData.iiit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Team Representative</p>
                      <p className="font-semibold">{teamData.representative}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Team Members */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-6">Team Members</h2>
                  <div className="space-y-4">
                    {teamData.members.map((member, index) => (
                      <div key={index} className="p-4 rounded-lg bg-card/50 border border-border/50">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">Batch {member.batch}</p>
                          </div>
                          {index === 0 && (
                            <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">
                              Lead
                            </span>
                          )}
                        </div>
                        <div className="mt-3 space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Right Column - Project & Announcements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <GlassCard glow="accent">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Project Details</h2>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold gradient-text">{teamData.project.name}</h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                          {teamData.project.domain}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{teamData.project.description}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {teamData.project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-card border border-border text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border">
                      <Button asChild variant="neon">
                        <a href={teamData.project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button asChild variant="cyber">
                        <a href={teamData.project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Ranking */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Competition Progress
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                      <p className="text-3xl font-bold text-success mb-1">#1</p>
                      <p className="text-xs text-muted-foreground">Current Rank</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-3xl font-bold text-primary mb-1">98</p>
                      <p className="text-xs text-muted-foreground">Total Score</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                      <p className="text-3xl font-bold text-secondary mb-1">3/3</p>
                      <p className="text-xs text-muted-foreground">Rounds Cleared</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Announcements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <GlassCard>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Announcements
                  </h2>
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div
                        key={announcement.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          announcement.type === 'success'
                            ? 'bg-success/10 border-success'
                            : announcement.type === 'warning'
                            ? 'bg-warning/10 border-warning'
                            : 'bg-primary/10 border-primary'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{announcement.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{announcement.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
