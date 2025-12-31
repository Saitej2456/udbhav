import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Menu, X, Home, Info, Award, Building2, Trophy, FolderKanban, Users, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Sponsors', path: '/sponsors', icon: Award },
  { name: 'IIITs', path: '/iiits', icon: Building2 },
  { name: 'Leaderboard', path: '/leaderboard/round-2', icon: Trophy },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Teams', path: '/teams', icon: Users },
  //{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  // Scroll-based motion values
  const scrollY = useMotionValue(0);
  const scrollYSmooth = useSpring(scrollY, { stiffness: 100, damping: 30 });
  
  // Transform scroll into various properties
  const navPadding = useTransform(scrollYSmooth, [0, 100], [20, 8]);
  const navScale = useTransform(scrollYSmooth, [0, 100], [1, 0.98]);
  const navBlur = useTransform(scrollYSmooth, [0, 50], [8, 20]);
  const navBgOpacity = useTransform(scrollYSmooth, [0, 100], [0.3, 0.8]);
  const navY = useTransform(scrollYSmooth, [0, 100], [16, 8]);
  const borderOpacity = useTransform(scrollYSmooth, [0, 100], [0.1, 0.4]);

  const handleScroll = useCallback(() => {
    scrollY.set(window.scrollY);
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ paddingTop: navY }}
      >
        <motion.div
          className="pointer-events-auto"
          style={{ scale: navScale }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center gap-0.5 rounded-full border overflow-hidden"
            style={{
              padding: navPadding,
              backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
              WebkitBackdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
              backgroundColor: useTransform(navBgOpacity, (v) => `hsl(var(--background) / ${v})`),
              borderColor: useTransform(borderOpacity, (v) => `hsl(var(--border) / ${v})`),
              boxShadow: isHovered 
                ? '0 8px 32px -8px hsl(var(--primary) / 0.2), 0 0 0 1px hsl(var(--primary) / 0.1)' 
                : '0 8px 32px -8px hsl(var(--background) / 0.3)',
            }}
            animate={{
              boxShadow: isHovered 
                ? '0 8px 32px -8px hsl(var(--primary) / 0.2), 0 0 0 1px hsl(var(--primary) / 0.1)' 
                : '0 8px 32px -8px hsl(var(--background) / 0.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path || 
                (link.path !== '/' && location.pathname.startsWith(link.path.split('/')[1] ? `/${link.path.split('/')[1]}` : link.path));
              const Icon = link.icon;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative"
                >
                  <motion.div
                    className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Icon size={16} className="relative z-10" />
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary/15 rounded-full"
                        style={{
                          boxShadow: '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.05)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="lg:hidden flex items-center justify-center rounded-full border px-4 py-2"
            style={{
              backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
              WebkitBackdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
              backgroundColor: useTransform(navBgOpacity, (v) => `hsl(var(--background) / ${v})`),
              borderColor: useTransform(borderOpacity, (v) => `hsl(var(--border) / ${v})`),
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-background/90 backdrop-blur-xl" 
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-20 mx-4 bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
            >
              <div className="p-3 space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path ||
                    (link.path !== '/' && location.pathname.startsWith(link.path.split('/')[1] ? `/${link.path.split('/')[1]}` : link.path));
                  const Icon = link.icon;
                  
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-primary/15 text-primary'
                            : 'text-muted-foreground hover:bg-card hover:text-foreground'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{link.name}</span>
                        {isActive && (
                          <motion.div 
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                            layoutId="mobile-indicator"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
