import { useEffect, useRef, memo, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal = memo(({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;
    
    // Get all word spans
    const words = textElement.querySelectorAll('.scroll-reveal-word');

    // Container rotation animation
    gsap.fromTo(
      container,
      { rotateX: baseRotation },
      {
        rotateX: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    // Word animations
    words.forEach((word, index) => {
      const delay = index * 0.02;
      
      gsap.fromTo(
        word,
        {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: `top+=${delay * 1000} bottom`,
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [baseOpacity, baseRotation, blurStrength, enableBlur, rotationEnd, wordAnimationEnd]);

  // Split text into words
  const renderContent = () => {
    if (typeof children === 'string') {
      return children.split(' ').map((word, index) => (
        <span 
          key={index} 
          className={`scroll-reveal-word inline-block mr-[0.25em] ${textClassName}`}
          style={{ 
            opacity: baseOpacity,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          }}
        >
          {word}
        </span>
      ));
    }
    return children;
  };

  return (
    <div
      ref={containerRef}
      className={`scroll-reveal-container perspective-[1000px] ${containerClassName}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={textRef} className="scroll-reveal-text">
        {renderContent()}
      </div>
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;
