import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  className?: string;
  glow?: 'primary' | 'secondary' | 'accent' | 'none';
  hover?: boolean;
  crtEffect?: boolean;
  variant?: 'default' | 'premium' | 'subtle';
}

const GlassCard = ({ 
  children, 
  className, 
  glow = 'none',
  hover = true,
  crtEffect = true,
  variant = 'default',
  ...props 
}: GlassCardProps) => {
  const glowClasses = {
    primary: 'hover:shadow-glow-primary',
    secondary: 'hover:shadow-glow-secondary',
    accent: 'hover:shadow-glow-accent',
    none: '',
  };

  const variantClasses = {
    default: 'glass rounded-2xl',
    premium: 'glass-premium rounded-2xl',
    subtle: 'glass-subtle rounded-xl',
  };

  return (
    <motion.div
      className={cn(
        variantClasses[variant],
        'p-6 transition-all duration-300',
        hover && 'hover:-translate-y-1',
        crtEffect && 'crt-button scan-line-hover',
        glowClasses[glow],
        className
      )}
      whileHover={crtEffect ? { 
        scale: 1.01,
        transition: { duration: 0.2 }
      } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
