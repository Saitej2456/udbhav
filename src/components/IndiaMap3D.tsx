import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Calendar, ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import GlassCard from './GlassCard';
import { geoMercator } from 'd3-geo';
import { iiitsData } from '@/data/iiits';

// TopoJSON for India - states only (verified working URL)
const INDIA_TOPO_JSON = "https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson";


interface IndiaMap3DProps {
  className?: string;
}

const IndiaMap3D = ({ className = '' }: IndiaMap3DProps) => {
  const [hoveredIIIT, setHoveredIIIT] = useState<string | null>(null);
  const [selectedIIIT, setSelectedIIIT] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const selectedData = useMemo(() => {
    return iiitsData.find(iiit => iiit.id === selectedIIIT);
  }, [selectedIIIT]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mapWidth = size.width || 800;
  const mapHeight = size.height || 600;

  const projection = useMemo(() => {
    return geoMercator()
      .scale(1100)
      .center([82, 22])
      .translate([mapWidth / 2, mapHeight / 2]);
  }, [mapWidth, mapHeight]);

  const handleMarkerClick = (id: string) => {
    setSelectedIIIT(selectedIIIT === id ? null : id);
  };

  return (
    <div className={`relative w-full aspect-[4/3] ${className}`} ref={containerRef}>
      {/* Background */}
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.08) 0%, hsl(var(--background)) 70%)',
        }}
      />

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1100,
            center: [82, 22],
          }}
          width={mapWidth}
          height={mapHeight}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <linearGradient id="indiaFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
            <filter id="borderGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feFlood floodColor="hsl(185, 100%, 50%)" floodOpacity="0.4" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static map - no zoom/pan */}
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="url(#indiaFill)"
                  stroke="hsl(185, 100%, 50%)"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      outline: "none",
                      filter: "url(#borderGlow)",
                    },
                    hover: {
                      fill: "hsl(var(--primary) / 0.3)",
                      outline: "none",
                    },
                    pressed: {
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* IIIT Markers - properly projected */}
          {iiitsData.map((iiit) => {
            const isHovered = hoveredIIIT === iiit.id;
            const isSelected = selectedIIIT === iiit.id;
            const markerSize = iiit.organizing ? 8 : 5;

            return (
              <Marker
                key={iiit.id}
                coordinates={iiit.coordinates}
                onMouseEnter={() => setHoveredIIIT(iiit.id)}
                onMouseLeave={() => setHoveredIIIT(null)}
                onClick={() => handleMarkerClick(iiit.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow effect */}
                <circle
                  r={markerSize * 2}
                  fill={iiit.organizing ? "hsl(280, 100%, 70%)" : "hsl(185, 100%, 55%)"}
                  opacity={0.3}
                />
                {/* Main marker */}
                <circle
                  r={isHovered || isSelected ? markerSize * 1.5 : markerSize}
                  fill={iiit.organizing ? "hsl(280, 100%, 70%)" : "hsl(185, 100%, 55%)"}
                  stroke={iiit.organizing ? "hsl(280, 100%, 85%)" : "hsl(185, 100%, 75%)"}
                  strokeWidth={1.5}
                  style={{
                    filter: `drop-shadow(0 0 ${iiit.organizing ? 12 : 6}px ${iiit.organizing ? "hsl(280, 100%, 60%)" : "hsl(185, 100%, 50%)"})`,
                    transition: 'r 0.2s ease',
                  }}
                />
                {iiit.organizing && (
                  <text
                    textAnchor="middle"
                    y={3}
                    style={{
                      fontSize: 8,
                      fontWeight: 'bold',
                      fill: 'white',
                      pointerEvents: 'none',
                    }}
                  >
                    ★
                  </text>
                )}
              </Marker>
            );
          })}
        </ComposableMap>

        {/* HTML Tooltips overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {iiitsData.map((iiit) => {
            const projected = projection(iiit.coordinates);
            if (!projected) return null;

            const [x, y] = projected;
            const isHovered = hoveredIIIT === iiit.id;
            const isSelected = selectedIIIT === iiit.id;

            return (
              <AnimatePresence key={iiit.id}>
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute whitespace-nowrap z-50 pointer-events-none"
                    style={{
                      left: x,
                      top: y - 10,
                      transform: 'translate(-50%, -100%)',
                    }}
                  >
                    <div 
                      className="px-3 py-2 rounded-lg text-center backdrop-blur-xl"
                      style={{
                        background: 'hsl(var(--card) / 0.95)',
                        border: '1px solid hsl(var(--primary) / 0.3)',
                        boxShadow: '0 8px 32px hsl(var(--primary) / 0.25)',
                      }}
                    >
                      <p className="text-sm font-bold text-foreground">{iiit.short}</p>
                      <p className="text-xs text-muted-foreground">{iiit.location}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      </motion.div>

      {/* Selected IIIT Info Card */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute top-4 right-4 z-50 w-80"
          >
            <GlassCard className="relative" glow={selectedData.organizing ? 'accent' : 'primary'}>
              <button
                onClick={() => setSelectedIIIT(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="mb-4">
                {selectedData.organizing && (
                  <span className="inline-block px-2.5 py-1 text-[10px] font-semibold bg-accent/20 text-accent rounded-full mb-2">
                    ⭐ Organizing Institute
                  </span>
                )}
                <h3 className="text-xl font-bold gradient-text">{selectedData.name}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedData.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Est.</p>
                    <p className="text-base font-semibold">{selectedData.established}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Students</p>
                    <p className="text-base font-semibold">{selectedData.students}+</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/iiits/${selectedData.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                View Full Profile
                <ExternalLink className="w-4 h-4" />
              </Link>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-4 left-4 backdrop-blur-xl rounded-xl px-5 py-3 z-20"
        style={{
          background: 'hsl(var(--card) / 0.9)',
          border: '1px solid hsl(var(--border) / 0.5)',
          boxShadow: '0 10px 30px hsl(var(--primary) / 0.1)',
        }}
      >
        <div className="flex items-center gap-5 text-xs">
          <div className="flex items-center gap-2">
            <div 
              className="w-3.5 h-3.5 rounded-full bg-primary"
              style={{ boxShadow: '0 0 10px hsl(var(--primary) / 0.8)' }}
            />
            <span className="text-muted-foreground font-medium">Participating IIIT</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
              style={{ boxShadow: '0 0 10px hsl(var(--accent) / 0.8)' }}
            >
              <span className="text-[8px] text-accent-foreground">★</span>
            </div>
            <span className="text-muted-foreground font-medium">Organizing IIIT</span>
          </div>
        </div>
      </motion.div>

      {/* IIIT Count Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute top-4 left-4 backdrop-blur-xl rounded-xl px-5 py-3 z-20"
        style={{
          background: 'hsl(var(--card) / 0.9)',
          border: '1px solid hsl(var(--border) / 0.5)',
          boxShadow: '0 10px 30px hsl(var(--primary) / 0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold gradient-text">{iiitsData.length}</div>
          <div className="text-xs text-muted-foreground leading-tight font-medium">
            IIITs<br />Mapped
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IndiaMap3D;
