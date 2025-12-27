import { useState, useEffect, memo } from 'react';

const EVENT_DATE = new Date('2026-01-24T00:00:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const difference = EVENT_DATE.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="glass-strong px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 rounded-xl border border-primary/30 min-w-[60px] sm:min-w-[80px] md:min-w-[100px]">
      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text font-mono">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-2 font-mono uppercase tracking-wider">
      {label}
    </span>
  </div>
));
TimeUnit.displayName = 'TimeUnit';

const CountdownTimer = memo(() => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Event Date */}
      <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="font-mono text-sm sm:text-base md:text-lg text-foreground font-semibold">
          24-25 January 2026
        </span>
      </div>
      
      {/* Countdown */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <span className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold animate-pulse">:</span>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <span className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold animate-pulse">:</span>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <span className="text-2xl sm:text-3xl md:text-4xl text-primary font-bold animate-pulse hidden sm:block">:</span>
        <div className="hidden sm:block">
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

export default CountdownTimer;