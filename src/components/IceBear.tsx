import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import iceBearImage from "@/assets/ice-bear.png";

const messages: Record<string, string> = {
  "/": "Final Round Venue: IIIT Sri City 🏆",
  "/about": "You can visit us on Instagram and LinkedIn 📱",
  "/sponsors": "To sponsor, please mail udbhav@iiits.in 📧",
  "/iiits": "Click on individual IIIT to know more about them 🎓",
  "/projects": "These projects are cooler than my fridge 🧊",
  "/teams": "We are stronger together, like bears in a stack 🐻",
};

const IceBear = () => {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(true);
  const [hasAutoShown, setHasAutoShown] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);
  const [hasShownFooterMessage, setHasShownFooterMessage] = useState(false);

  const currentMessage = isAtFooter && !hasShownFooterMessage
    ? "Click logo for bad pacman 🎮"
    : messages[location.pathname] || messages["/"];

  // Auto-hide after 7 seconds on first load
  useEffect(() => {
    if (!hasAutoShown) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setHasAutoShown(true);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [hasAutoShown]);

  // Reset auto-show when route changes
  useEffect(() => {
    setHasAutoShown(false);
    setShowMessage(true);
    setHasShownFooterMessage(false);
  }, [location.pathname]);

  // Detect footer visibility
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;
        
        if (isFooterVisible && !isAtFooter && !hasShownFooterMessage) {
          setIsAtFooter(true);
          setShowMessage(true);
          
          // Hide footer message after 3 seconds
          setTimeout(() => {
            setShowMessage(false);
            setHasShownFooterMessage(true);
            setIsAtFooter(false);
          }, 3000);
        } else if (!isFooterVisible) {
          setIsAtFooter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAtFooter, hasShownFooterMessage]);

  const handleClick = () => {
    if (hasAutoShown) {
      setShowMessage(!showMessage);
    }
  };

  return (
    <motion.div
      className="fixed right-6 z-50 flex flex-col items-end gap-2"
      initial={{ bottom: -80 }}
      animate={{ 
        bottom: showMessage ? 24 : -60
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative max-w-[250px] rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-3 text-sm text-slate-800 font-medium shadow-xl border border-white/50"
          >
            {currentMessage}
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-white/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ice Bear Image */}
      <motion.div
        className="cursor-pointer select-none"
        onClick={handleClick}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative"
          animate={showMessage ? { rotate: [0, -3, 3, -3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <img
            src={iceBearImage}
            alt="Ice Bear"
            className="w-20 h-20 object-contain drop-shadow-lg"
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IceBear;
