import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';

const teamCategories = [
  'All',
  'Organizing Team',
  'Sponsor Team',
  'Development Team',
  'Design Team',
  'Marketing Team',
];

const teamMembers = [
  // Organizing Team (IIIT Sri City Core)
  { id: 1, name: 'Sripathy Siddartha', role: 'Organiser', category: 'Organizing Team' },
  { id: 2, name: 'K Sidharth', role: 'Head - Operations', category: 'Organizing Team' },
  { id: 3, name: 'Shounak Banerjee', role: 'Head - Finance', category: 'Organizing Team' },
  { id: 4, name: 'Raniel Babu Chintha', role: 'Chief of Records', category: 'Organizing Team' },
  { id: 5, name: 'Saptarsi', role: 'Head - Social Media', category: 'Organizing Team' },
  { id: 6, name: 'Sai Tej', role: 'Program Director', category: 'Organizing Team' },
  { id: 7, name: 'Sujai', role: 'Core Member', category: 'Organizing Team' },
  
  // Sponsor Team
  { id: 8, name: 'Polepalli Ranga Pallavi', role: 'Sponsorship Lead', category: 'Sponsor Team' },
  { id: 9, name: 'Khyati Jayani Manne', role: 'Sponsorship', category: 'Sponsor Team' },
  { id: 10, name: 'Himanshu Jaiswal', role: 'Sponsorship - IIIT Agartala', category: 'Sponsor Team' },
  { id: 11, name: 'Shubham Rakheja', role: 'Sponsorship - IIIT Agartala', category: 'Sponsor Team' },
  { id: 12, name: 'Anish Kumar', role: 'Sponsorship - IIIT Bhopal', category: 'Sponsor Team' },
  { id: 13, name: 'Pradnesh Fernandez A', role: 'Sponsorship - IIIT Dharwad', category: 'Sponsor Team' },
  { id: 14, name: 'Sparsh Mittal', role: 'Sponsorship - IIIT Dharwad', category: 'Sponsor Team' },
  { id: 15, name: 'Sathvik Bhat', role: 'Sponsorship - IIIT Bhubaneshwar', category: 'Sponsor Team' },
  { id: 16, name: 'Prachi Gupta', role: 'Sponsorship - IIIT Kota', category: 'Sponsor Team' },
  { id: 17, name: 'Kashish Nandwani', role: 'Sponsorship - IIIT Sonepat', category: 'Sponsor Team' },
  { id: 18, name: 'Dinesh Sharma', role: 'Sponsorship - IIITDM Kurnool', category: 'Sponsor Team' },
  { id: 19, name: 'Harshil Patel', role: 'Sponsorship - IIITV-ICD', category: 'Sponsor Team' },
  
  // Development Team (Website - Next JS)
  { id: 20, name: 'Mokshe Jain', role: 'Website Dev - IIIT Allahabad', category: 'Development Team' },
  { id: 21, name: 'Atharwa Zawar', role: 'Website Dev - IIIT Allahabad', category: 'Development Team' },
  { id: 22, name: 'Waqas Omar', role: 'Website Dev - IIIT Kalyani', category: 'Development Team' },
  { id: 23, name: 'Indradeep Mondal', role: 'Website Dev - IIIT Kalyani', category: 'Development Team' },
  { id: 24, name: 'Abhinav Sudhi', role: 'Website Dev - IIIT Kottayam', category: 'Development Team' },
  { id: 25, name: 'Vishnunath A Suresh', role: 'Website Dev - IIIT Kottayam', category: 'Development Team' },
  { id: 26, name: 'Noel Georgi', role: 'Website Dev - IIIT Kottayam', category: 'Development Team' },
  { id: 27, name: 'Rahul Sharma', role: 'Website Dev - IIIT Manipur', category: 'Development Team' },
  { id: 28, name: 'Aishwary', role: 'Website Dev - IIIT Manipur', category: 'Development Team' },
  { id: 29, name: 'Devansh Bohare', role: 'Website Dev - IIIT Surat', category: 'Development Team' },
  { id: 30, name: 'Adarsh Pandey', role: 'Website Dev - IIIT Surat', category: 'Development Team' },
  { id: 31, name: 'Ronit Choudhary', role: 'Website Dev - IIIT Surat', category: 'Development Team' },
  { id: 32, name: 'Ayush Awasthi', role: 'Website Dev - IIIT Vadodara', category: 'Development Team' },
  { id: 33, name: 'Priyanshu', role: 'Website Dev - IIIT Vadodara', category: 'Development Team' },
  { id: 34, name: 'Divyam Khandelwal', role: 'Website Dev - IIIT Vadodara', category: 'Development Team' },
  { id: 35, name: 'Ansh Ahuja', role: 'Website Dev - IIIT Vadodara', category: 'Development Team' },
  
  // Design Team
  { id: 36, name: 'Joshith', role: 'Head of Art Department', category: 'Design Team' },
  { id: 37, name: 'Mani Sharan Raj Mengani', role: 'Head of Video Department', category: 'Design Team' },
  { id: 38, name: 'Aditya Kumar', role: 'Design - IIIT Dharwad/Raichur', category: 'Design Team' },
  { id: 39, name: 'Sukrit Aryan', role: 'Design - IIIT Bhagalpur', category: 'Design Team' },
  { id: 40, name: 'Maaz Md.', role: 'Design - IIIT Bhagalpur', category: 'Design Team' },
  { id: 41, name: 'Ankur', role: 'Design - IIIT Kota', category: 'Design Team' },
  { id: 42, name: 'Advik', role: 'Design - IIIT Kota', category: 'Design Team' },
  { id: 43, name: 'Muvvala Sahithi', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 44, name: 'Nabhaan Abdullah', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 45, name: 'Sahaja Pallapothula', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 46, name: 'Malla Sai Snehaja', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 47, name: 'Gauri Lekshmi Sathya', role: 'Design - IIIT Kottayam', category: 'Design Team' },
  { id: 48, name: 'Yogita Kumari', role: 'Design - IIIT Manipur', category: 'Design Team' },
  { id: 49, name: 'Akhil Reddy', role: 'Design - IIIT Naya Raipur', category: 'Design Team' },
  { id: 50, name: 'Utkarsh Gupta', role: 'Design - IIIT Naya Raipur', category: 'Design Team' },
  { id: 51, name: 'Saransh Sharma', role: 'Design - IIIT Raichur', category: 'Design Team' },
  { id: 52, name: 'Varshava', role: 'Lead Design', category: 'Design Team' },
  { id: 53, name: 'Rehan Gupta', role: 'Design - IIIT Una', category: 'Design Team' },
  { id: 54, name: 'Raj Gopal', role: 'Design - IIIT Una', category: 'Design Team' },
  { id: 55, name: 'Rishi Menpara', role: 'Design - IIITV-ICD', category: 'Design Team' },
  { id: 56, name: 'Shivam Vats', role: 'Design - IIITDM Kurnool', category: 'Design Team' },
  
  // Marketing Team
  { id: 57, name: 'Pratyusha Sathpathy', role: 'Marketing - IIIT Bhubaneshwar', category: 'Marketing Team' },
  { id: 58, name: 'Keertan Kumar Singh', role: 'Marketing - IIIT Bhubaneshwar', category: 'Marketing Team' },
  { id: 59, name: 'Tirtha Desai', role: 'Marketing - IIIT Bhubaneshwar', category: 'Marketing Team' },
  { id: 60, name: 'Ayush Prasad', role: 'Marketing - IIIT Kalyani', category: 'Marketing Team' },
  { id: 61, name: 'Aysha Lintha', role: 'Marketing - IIIT Kottayam', category: 'Marketing Team' },
  { id: 62, name: 'Poshika Bhatnagar', role: 'Marketing - IIIT Sonepat', category: 'Marketing Team' },
  { id: 63, name: 'Shubham', role: 'Marketing - IIIT Tiruchirappalli', category: 'Marketing Team' },
];

const Teams = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMembers = teamMembers.filter(member => {
    return selectedCategory === 'All' || member.category === selectedCategory;
  });

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

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
              <span className="gradient-text">Our Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind UDBHAV
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {teamCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Team Members by Category */}
          {selectedCategory === 'All' ? (
            Object.entries(groupedMembers).map(([category, members], categoryIndex) => (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-16"
              >
                <SectionHeading title={category} align="left" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="text-center group" hover>
                        {/* Avatar */}
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-colors">
                          <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                        
                        {/* Social Links */}
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors">
                            <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </a>
                          <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors">
                            <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </a>
                          <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors">
                            <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </a>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))
          ) : (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlassCard className="text-center group" hover>
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-colors">
                        <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                      
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors">
                          <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors">
                          <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-lg bg-card hover:bg-primary/20 flex items-center justify-center transition-colors">
                          <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </a>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {filteredMembers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No team members found for the selected filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Teams;
