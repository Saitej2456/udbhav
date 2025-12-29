import { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  position: Position;
  color: string;
  direction: Position;
  scared?: boolean;
}

const GRID_SIZE = 15;
const CELL_SIZE = 24;

// Reuse single AudioContext
let audioContext: AudioContext | null = null;
let isAudioInitialized = false;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const initAudio = () => {
  if (isAudioInitialized) return;
  const context = getAudioContext();
  
  // Create a silent buffer to keep context alive
  const buffer = context.createBuffer(1, 1, 22050);
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
  
  isAudioInitialized = true;
};

const playTone = (frequency: number, duration: number, type: OscillatorType = 'square', volume: number = 0.1) => {
  try {
    const context = getAudioContext();
    
    // Resume context if suspended (browser autoplay policy)
    if (context.state === 'suspended') {
      context.resume().catch(() => {});
    }
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    
    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
    
    // Clean up oscillator after it stops
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  } catch (e) {
    // Audio not supported, fail silently
  }
};

// Debounce sound effects to prevent audio lag
let lastEatSoundTime = 0;
const playEatSound = () => {
  const now = Date.now();
  if (now - lastEatSoundTime < 100) return; // Prevent rapid-fire sounds
  lastEatSoundTime = now;
  playTone(587.33, 0.05, 'square', 0.08); // D5
  setTimeout(() => playTone(659.25, 0.05, 'square', 0.08), 50); // E5
};

const playGhostSound = () => {
  playTone(200, 0.15, 'sawtooth', 0.12);
  setTimeout(() => playTone(150, 0.15, 'sawtooth', 0.12), 100);
  setTimeout(() => playTone(100, 0.2, 'sawtooth', 0.1), 200);
};

const playGameOverSound = () => {
  const notes = [392, 349.23, 329.63, 293.66, 261.63]; // G4, F4, E4, D4, C4
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'square', 0.1), i * 150);
  });
};

const playVictorySound = () => {
  const notes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.15, 'square', 0.1), i * 100);
  });
};

const createMaze = (): number[][] => {
  const maze: number[][] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    maze[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      if (y === 0 || y === GRID_SIZE - 1 || x === 0 || x === GRID_SIZE - 1) {
        maze[y][x] = 1; // Wall
      } else if ((x === 2 || x === 12) && (y >= 2 && y <= 4)) {
        maze[y][x] = 1;
      } else if ((x === 2 || x === 12) && (y >= 10 && y <= 12)) {
        maze[y][x] = 1;
      } else if (y === 7 && (x >= 5 && x <= 9)) {
        maze[y][x] = 1;
      } else if ((x === 5 || x === 9) && (y >= 5 && y <= 9)) {
        maze[y][x] = 1;
      } else {
        maze[y][x] = 2; // Dot
      }
    }
  }
  maze[7][7] = 0; // Pac-Man start
  maze[3][7] = 0; // Ghost area
  return maze;
};

// Memoized Cell component to prevent unnecessary re-renders
const MazeCell = memo(({ cell, x, y }: { cell: number; x: number; y: number }) => {
  return (
    <div
      className="absolute"
      style={{
        left: x * CELL_SIZE,
        top: y * CELL_SIZE,
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
    >
      {cell === 1 && (
        <div className="w-full h-full bg-primary/30 border border-primary/50" />
      )}
      {cell === 2 && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary/80" />
        </div>
      )}
    </div>
  );
});

MazeCell.displayName = 'MazeCell';

interface PacManGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const PacManGame = ({ isOpen, onClose }: PacManGameProps) => {
  const [maze, setMaze] = useState<number[][]>(createMaze);
  const [pacman, setPacman] = useState<Position>({ x: 7, y: 7 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [ghosts, setGhosts] = useState<Ghost[]>([
    { position: { x: 3, y: 3 }, color: 'hsl(var(--destructive))', direction: { x: 1, y: 0 } },
    { position: { x: 11, y: 3 }, color: 'hsl(var(--secondary))', direction: { x: -1, y: 0 } },
    { position: { x: 3, y: 11 }, color: 'hsl(var(--accent))', direction: { x: 0, y: -1 } },
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(true);
  const [ghostsScared, setGhostsScared] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const lastCollisionCheckRef = useRef<string>('');
  const mazeRef = useRef<number[][]>(createMaze());
  const gameStartTimeRef = useRef<number>(0);

  // Initialize audio on game open
  useEffect(() => {
    if (isOpen) {
      initAudio();
      gameStartTimeRef.current = Date.now(); // Initialize game start time
      
      // Keep audio context alive with periodic silent tones
      const keepAliveInterval = setInterval(() => {
        const context = getAudioContext();
        if (context.state === 'suspended') {
          context.resume().catch(() => {});
        }
      }, 3000); // Check every 3 seconds
      
      return () => clearInterval(keepAliveInterval);
    }
  }, [isOpen]);

  const resetGame = useCallback(() => {
    const newMaze = createMaze();
    setMaze(newMaze);
    mazeRef.current = newMaze;
    setPacman({ x: 7, y: 7 });
    setDirection({ x: 1, y: 0 });
    setGhosts([
      { position: { x: 3, y: 3 }, color: 'hsl(var(--destructive))', direction: { x: 1, y: 0 }, scared: false },
      { position: { x: 11, y: 3 }, color: 'hsl(var(--secondary))', direction: { x: -1, y: 0 }, scared: false },
      { position: { x: 3, y: 11 }, color: 'hsl(var(--accent))', direction: { x: 0, y: -1 }, scared: false },
    ]);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setGhostsScared(false);
    gameStartTimeRef.current = Date.now();
  }, []);

  const movePacman = useCallback(() => {
    if (gameOver || gameWon) return;

    setPacman(prev => {
      const newX = prev.x + direction.x;
      const newY = prev.y + direction.y;

      // Use ref to check walls and dots without depending on maze state
      if (mazeRef.current[newY]?.[newX] !== 1) {
        if (mazeRef.current[newY]?.[newX] === 2) {
          setMaze(m => {
            const newMaze = [...m];
            newMaze[newY] = [...newMaze[newY]];
            newMaze[newY][newX] = 0;
            
            // Update ref for ghosts to use
            mazeRef.current = newMaze;
            
            // Check if all dots are collected
            const hasDotsLeft = newMaze.some(row => row.some(cell => cell === 2));
            if (!hasDotsLeft) {
              setGameWon(true);
              playVictorySound();
            }
            
            return newMaze;
          });
          setScore(s => s + 10);
          playEatSound();
        }
        return { x: newX, y: newY };
      }
      return prev;
    });

    setMouthOpen(m => !m);
  }, [direction, gameOver, gameWon]);

  const moveGhosts = useCallback(() => {
    setGhosts(prevGhosts => {
      const newGhosts = prevGhosts.map(ghost => {
        // Don't move if scared (frozen state)
        if (ghost.scared) return ghost;
        
        const possibleMoves: Position[] = [];
        const directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];

        directions.forEach(dir => {
          const newX = ghost.position.x + dir.x;
          const newY = ghost.position.y + dir.y;
          // Use ref to check walls without depending on maze state
          if (mazeRef.current[newY]?.[newX] !== 1) {
            possibleMoves.push(dir);
          }
        });

        if (possibleMoves.length === 0) return ghost;

        // Prefer current direction, otherwise pick random
        const currentDirValid = possibleMoves.some(
          m => m.x === ghost.direction.x && m.y === ghost.direction.y
        );

        const newDir = currentDirValid && Math.random() > 0.3
          ? ghost.direction
          : possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        return {
          ...ghost,
          position: {
            x: ghost.position.x + newDir.x,
            y: ghost.position.y + newDir.y,
          },
          direction: newDir,
        };
      });
      
      // Check collision after ghost movement
      setPacman(currentPacman => {
        const hasCollision = newGhosts.some(ghost => 
          !ghost.scared && ghost.position.x === currentPacman.x && ghost.position.y === currentPacman.y
        );
        
        if (hasCollision && !gameOver && !gameWon) {
          playGhostSound();
          playGameOverSound();
          setGameOver(true);
        }
        
        return currentPacman;
      });
      
      return newGhosts;
    });
  }, [gameOver, gameWon]);

  // Check collision - optimized to prevent multiple checks
  useEffect(() => {
    const collisionKey = `${pacman.x},${pacman.y}`;
    if (gameOver || lastCollisionCheckRef.current === collisionKey) return;
    
    lastCollisionCheckRef.current = collisionKey;
    
    const hasCollision = ghosts.some(ghost => 
      !ghost.scared && ghost.position.x === pacman.x && ghost.position.y === pacman.y
    );
    
    if (hasCollision) {
      playGhostSound();
      playGameOverSound();
      setGameOver(true);
    }
  }, [pacman, ghosts, gameOver]);

  // Periodic ghost freeze mechanic - every 20 seconds, freeze for 3-4 seconds
  useEffect(() => {
    if (!isOpen || gameOver || gameWon) return;

    let lastFreezeState = false;

    const checkGhostFreeze = setInterval(() => {
      const elapsedTime = Date.now() - gameStartTimeRef.current;
      const cycleTime = elapsedTime % 23500; // 23.5 second total cycle (20s active + 3.5s frozen)
      
      const shouldFreeze = cycleTime >= 20000; // After 20 seconds in each cycle = frozen for 3.5 seconds
      
      // Only update if state actually changes
      if (shouldFreeze !== lastFreezeState) {
        lastFreezeState = shouldFreeze;
        setGhosts(prevGhosts => prevGhosts.map(g => ({ ...g, scared: shouldFreeze })));
      }
    }, 100); // Check every 100ms for smooth transitions

    return () => clearInterval(checkGhostFreeze);
  }, [isOpen, gameOver, gameWon]);

  // Game loop - slower, smoother intervals
  useEffect(() => {
    if (!isOpen || gameOver || gameWon) return;

    const pacmanInterval = setInterval(movePacman, 250); // Slower for smoother movement
    const ghostInterval = setInterval(moveGhosts, 400); // Much slower ghosts

    return () => {
      clearInterval(pacmanInterval);
      clearInterval(ghostInterval);
    };
  }, [isOpen, movePacman, moveGhosts, gameOver, gameWon]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Initialize audio on first user interaction
      if (!isAudioInitialized) {
        initAudio();
      }
      
      e.preventDefault();
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus game on open
  useEffect(() => {
    if (isOpen && gameRef.current) {
      gameRef.current.focus();
    }
  }, [isOpen]);

  const getRotation = () => {
    if (direction.x === 1) return 0;
    if (direction.x === -1) return 180;
    if (direction.y === -1) return -90;
    if (direction.y === 1) return 90;
    return 0;
  };

  // Memoize maze rendering to prevent re-renders
  const mazeElements = useMemo(() => 
    maze.map((row, y) =>
      row.map((cell, x) => (
        <MazeCell key={`${x}-${y}`} cell={cell} x={x} y={y} />
      ))
    ),
    [maze]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            ref={gameRef}
            tabIndex={0}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative p-6 rounded-2xl border border-primary/30 bg-card/90 shadow-2xl outline-none"
            onClick={(e) => {
              e.stopPropagation();
              // Initialize audio on click
              if (!isAudioInitialized) {
                initAudio();
              }
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-primary font-mono">PAC-MAN</h2>
              <p className="text-sm text-muted-foreground">Use arrow keys or WASD to move</p>
              <p className="text-lg font-mono text-foreground mt-2">Score: {score}</p>
            </div>

            {/* Game Board */}
            <div
              className="relative rounded-lg overflow-hidden border-2 border-primary/50"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                background: 'hsl(var(--background))',
              }}
            >
              {/* Maze */}
              {mazeElements}

              {/* Pac-Man */}
              <motion.div
                className="absolute"
                animate={{
                  left: pacman.x * CELL_SIZE,
                  top: pacman.y * CELL_SIZE,
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut" 
                }}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${getRotation()}deg)` }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="hsl(50, 100%, 50%)"
                      d={mouthOpen
                        ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0l8 10-8 10"
                        : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                      }
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Ghosts */}
              {ghosts.map((ghost, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    left: ghost.position.x * CELL_SIZE,
                    top: ghost.position.y * CELL_SIZE,
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        fill={ghost.scared ? 'hsl(var(--muted))' : ghost.color}
                        d="M12 2C8.14 2 5 5.14 5 9v11l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V9c0-3.86-3.14-7-7-7zm-2 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-destructive mb-2">GAME OVER</p>
                  <p className="text-lg text-foreground mb-4">Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-mono hover:bg-primary/90 transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              )}
              
              {/* Victory Overlay */}
              {gameWon && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-primary mb-2">YOU WIN! 🎉</p>
                  <p className="text-lg text-foreground mb-4">Final Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-mono hover:bg-primary/90 transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="mt-4 grid grid-cols-3 gap-2 max-w-[150px] mx-auto md:hidden">
              <div />
              <button
                onClick={() => {
                  initAudio();
                  setDirection({ x: 0, y: -1 });
                }}
                className="p-3 bg-muted rounded-lg active:bg-primary/20"
              >
                ▲
              </button>
              <div />
              <button
                onClick={() => {
                  initAudio();
                  setDirection({ x: -1, y: 0 });
                }}
                className="p-3 bg-muted rounded-lg active:bg-primary/20"
              >
                ◀
              </button>
              <button
                onClick={() => {
                  initAudio();
                  setDirection({ x: 0, y: 1 });
                }}
                className="p-3 bg-muted rounded-lg active:bg-primary/20"
              >
                ▼
              </button>
              <button
                onClick={() => {
                  initAudio();
                  setDirection({ x: 1, y: 0 });
                }}
                className="p-3 bg-muted rounded-lg active:bg-primary/20"
              >
                ▶
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PacManGame;
