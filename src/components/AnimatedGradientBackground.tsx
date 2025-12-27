import { memo } from 'react';

const AnimatedGradientBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs using pure CSS animations for better performance */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] opacity-20 animate-gradient-float-1"
        style={{
          background: 'radial-gradient(circle, hsl(200 100% 55%) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          willChange: 'transform',
        }}
      />
      
      <div
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full blur-[70px] md:blur-[100px] opacity-15 animate-gradient-float-2"
        style={{
          background: 'radial-gradient(circle, hsl(265 85% 65%) 0%, transparent 70%)',
          top: '20%',
          right: '-5%',
          willChange: 'transform',
        }}
      />
      
      <div
        className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full blur-[60px] md:blur-[90px] opacity-15 animate-gradient-float-3"
        style={{
          background: 'radial-gradient(circle, hsl(235 85% 65%) 0%, transparent 70%)',
          bottom: '10%',
          left: '20%',
          willChange: 'transform',
        }}
      />

      {/* Reduced particle count - only 8 particles with CSS animations */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 animate-particle-float"
          style={{
            left: `${10 + (i * 11)}%`,
            top: `${15 + (i * 10) % 70}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${5 + (i % 3)}s`,
          }}
        />
      ))}

      {/* Static mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(at 20% 80%, hsla(200 100% 55% / 0.1) 0%, transparent 50%),
            radial-gradient(at 80% 20%, hsla(265 85% 65% / 0.1) 0%, transparent 50%),
            radial-gradient(at 40% 40%, hsla(235 85% 65% / 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Static grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(200 100% 55%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(200 100% 55%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
});

AnimatedGradientBackground.displayName = 'AnimatedGradientBackground';

export default AnimatedGradientBackground;
