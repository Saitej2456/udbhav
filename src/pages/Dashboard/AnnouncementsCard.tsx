import { motion } from 'framer-motion';
import { Bell, Calendar } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

const announcements = [
  { id: 1, title: 'Grand Finale Schedule Released', date: '2024-03-15', type: 'info' },
  { id: 2, title: 'Project Submission Deadline Extended', date: '2024-03-10', type: 'warning' },
  { id: 3, title: 'Congratulations on Qualifying to Finals!', date: '2024-03-05', type: 'success' },
  { id: 4, title: 'Round 2 Results Announced', date: '2024-03-01', type: 'info' },
];

const AnnouncementsCard = () => {
  return (
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
  );
};

export default AnnouncementsCard;
