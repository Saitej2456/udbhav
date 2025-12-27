import { memo, useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

// Participating IIITs
const participatingIIITs = [
  { name: 'IIIT Allahabad', short: 'IIITA' },
  { name: 'IIIT Delhi', short: 'IIITD' },
  { name: 'IIIT Kottayam', short: 'IIITK' },
  { name: 'IIIT Kurnool', short: 'IIITKL' },
  { name: 'IIIT Sri City', short: 'IIITS' },
  { name: 'IIIT Vadodara', short: 'IIITV' },
  { name: 'IIIT Una', short: 'IIITU' },
  { name: 'IIIT Sonepat', short: 'IIITSP' },
  { name: 'IIIT Kalyani', short: 'IIITKY' },
  { name: 'IIIT Dharwad', short: 'IIITDW' },
  { name: 'IIIT Tiruchirappalli', short: 'IIITT' },
  { name: 'IIIT Nagpur', short: 'IIITN' },
  { name: 'IIIT Pune', short: 'IIITP' },
  { name: 'IIIT Bhopal', short: 'IIITB' },
  { name: 'IIIT Surat', short: 'IIITSR' },
  { name: 'IIIT Agartala', short: 'IIITAG' },
  { name: 'IIIT Kancheepuram', short: 'IIITDM' },
  { name: 'IIIT Manipur', short: 'IIITM' },
  { name: 'IIIT Bhagalpur', short: 'IIITBH' },
  { name: 'IIIT Raichur', short: 'IIITR' },
];

// Heart path points generator
const getHeartPoint = (t: number, scale = 1) => {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  return { x: x * scale, y: y * scale };
};

// Trail offsets for the trailing effect
const trailOffsets = [0.08, 0.16, 0.24];

const CRTMonitorHero = memo(() => {
  const [offset, setOffset] = useState(0);
  const numPoints = participatingIIITs.length;
  const heartScale = 14;

  // Animate offset to rotate IIITs along the heart path
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 0.005) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4">
      {/* Heart-shaped container - static, doesn't rotate */}
      <div className="relative flex items-center justify-center w-[280px] h-[260px] sm:w-[380px] sm:h-[340px] md:w-[480px] md:h-[420px] lg:w-[550px] lg:h-[480px]">
        {/* Central text */}
        <div className="absolute z-10 text-center animate-fade-in">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text mb-2">
            UDBHAV 2026
          </h2>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-mono">
            {'>'} Code the Future
          </p>
        </div>

        {/* Trail effects behind each badge */}
        {participatingIIITs.map((iiit, index) => {
          const baseT = (index / numPoints) * Math.PI * 2;

          return trailOffsets.map((trailOffset, trailIndex) => {
            const t = baseT + offset - trailOffset;
            const { x, y } = getHeartPoint(t, heartScale);
            const opacity = 0.3 - trailIndex * 0.1;
            const scale = 0.8 - trailIndex * 0.15;

            return (
              <div
                key={`${iiit.short}-trail-${trailIndex}`}
                className="absolute pointer-events-none z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity,
                }}
              >
                <div
                  className="w-8 h-4 sm:w-10 sm:h-5 rounded-full blur-sm"
                  style={{
                    background: `radial-gradient(ellipse, hsl(var(--primary) / ${0.5 - trailIndex * 0.15}) 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          });
        })}

        {/* IIIT badges rotating along the heart path */}
        {participatingIIITs.map((iiit, index) => {
          const baseT = (index / numPoints) * Math.PI * 2;
          const t = baseT + offset;
          const { x, y } = getHeartPoint(t, heartScale);

          return (
            <div
              key={iiit.short}
              className="absolute z-20 group animate-fade-in"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 -m-1 rounded-full blur-md opacity-40"
                style={{
                  background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
                }}
              />

              {/* Badge */}
              <div
                className="relative flex items-center gap-1 px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded-full bg-card/95 border border-primary/40 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110 group-hover:border-primary cursor-pointer"
                style={{
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4), 0 0 10px hsl(var(--primary) / 0.2)',
                }}
              >
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/25 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-primary" />
                </div>
                <span className="text-[6px] sm:text-[7px] md:text-[8px] font-semibold text-foreground whitespace-nowrap">
                  {iiit.short}
                </span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-card border border-border rounded text-[8px] sm:text-[9px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] shadow-lg">
                {iiit.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

CRTMonitorHero.displayName = 'CRTMonitorHero';

export default CRTMonitorHero;
