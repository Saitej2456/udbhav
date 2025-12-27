import { memo, useMemo } from 'react';

interface GradualBlurProps {
  position?: 'top' | 'bottom';
  strength?: number;
  height?: string;
  divCount?: number;
  exponential?: boolean;
  opacity?: number;
  target?: 'parent' | 'page';
  className?: string;
}

const GradualBlur = memo(({
  position = 'top',
  strength = 1.5,
  height = '6rem',
  divCount = 5,
  exponential = true,
  opacity = 1,
  target = 'page',
  className = '',
}: GradualBlurProps) => {
  const layers = useMemo(() => {
    return Array.from({ length: divCount }, (_, i) => {
      const progress = (i + 1) / divCount;
      // Calculate blur using exponential or linear progression
      const blurValue = exponential 
        ? Math.pow(progress, 2) * strength * 8
        : progress * strength * 8;
      
      return {
        blur: blurValue,
        opacity: opacity * progress,
        zIndex: i + 1,
      };
    });
  }, [divCount, strength, exponential, opacity]);

  const positionStyles = position === 'top' 
    ? { top: 0, left: 0, right: 0 }
    : { bottom: 0, left: 0, right: 0 };

  const gradientDirection = position === 'top' ? 'to bottom' : 'to top';

  return (
    <div
      className={`pointer-events-none ${target === 'page' ? 'fixed' : 'absolute'} ${className}`}
      style={{
        ...positionStyles,
        height,
        zIndex: target === 'page' ? 1100 : 100,
      }}
    >
      {layers.map((layer, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            background: `linear-gradient(${gradientDirection}, 
              hsla(var(--background) / ${layer.opacity * 0.3}) 0%, 
              transparent 100%
            )`,
            maskImage: `linear-gradient(${gradientDirection}, 
              rgba(0,0,0,${layer.opacity}) 0%, 
              rgba(0,0,0,${layer.opacity * 0.5}) 50%, 
              transparent 100%
            )`,
            WebkitMaskImage: `linear-gradient(${gradientDirection}, 
              rgba(0,0,0,${layer.opacity}) 0%, 
              rgba(0,0,0,${layer.opacity * 0.5}) 50%, 
              transparent 100%
            )`,
            zIndex: layer.zIndex,
          }}
        />
      ))}
    </div>
  );
});

GradualBlur.displayName = 'GradualBlur';

export default GradualBlur;
