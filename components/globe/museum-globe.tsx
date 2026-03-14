'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import type { Agent } from '@/lib/agents-data';
import { agentTypeColors } from '@/lib/agents-data';

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm">Loading Globe...</p>
      </div>
    </div>
  ),
});

interface AgentGlobeProps {
  agents: Agent[];
  onAgentClick: (agent: Agent) => void;
  onAgentHover: (agent: Agent | null) => void;
  viewPreset?: ViewPreset;
}

export type ViewPreset = 'default' | 'europe' | 'asia' | 'americas' | 'africa' | 'oceania';

const viewPresets: Record<ViewPreset, { lat: number; lng: number; altitude: number }> = {
  default: { lat: 30, lng: 0, altitude: 2.5 },
  europe: { lat: 50, lng: 10, altitude: 1.5 },
  asia: { lat: 35, lng: 105, altitude: 1.8 },
  americas: { lat: 25, lng: -100, altitude: 2 },
  africa: { lat: 0, lng: 20, altitude: 1.8 },
  oceania: { lat: -25, lng: 135, altitude: 2 },
};

export function AgentGlobe({ agents, onAgentClick, onAgentHover, viewPreset = 'default' }: AgentGlobeProps) {
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize globe controls
  useEffect(() => {
    if (globeRef.current && globeReady) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !isHovering;
        controls.autoRotateSpeed = 0.8;
        controls.enableZoom = true;
        controls.minDistance = 150;
        controls.maxDistance = 500;
      }
    }
  }, [globeReady, isHovering]);

  // Handle view preset changes
  useEffect(() => {
    if (globeRef.current && globeReady) {
      const preset = viewPresets[viewPreset];
      globeRef.current.pointOfView(preset, 1000);
    }
  }, [viewPreset, globeReady]);

  // Calculate marker size based on popularity
  const getMarkerSize = useCallback((agent: Agent) => {
    const baseSize = 0.3;
    const popularityBonus = (agent.popularity / 100) * 0.7;
    return baseSize + popularityBonus;
  }, []);

  // Marker HTML element - tech style with glow
  const markerElement = useCallback((agent: Agent) => {
    const el = document.createElement('div');
    const color = agentTypeColors[agent.type];
    el.className = 'agent-marker';
    el.style.cssText = `
      width: 16px;
      height: 16px;
      background: ${color};
      border-radius: 50%;
      border: 2px solid #FFFFFF;
      box-shadow: 
        0 0 6px ${color},
        0 0 12px ${color},
        0 0 20px ${color}80,
        inset 0 0 3px rgba(255,255,255,0.9);
      cursor: pointer;
      pointer-events: auto;
      animation: techPulse 1s ease-in-out infinite;
    `;
    
    // Add click handler
    el.addEventListener('click', () => {
      console.log('Marker clicked:', agent.name);
    });
    
    return el;
  }, []);

  // Points data for globe
  const pointsData = useMemo(() => {
    return agents.map(agent => ({
      ...agent,
      size: getMarkerSize(agent),
      color: agentTypeColors[agent.type],
    }));
  }, [agents, getMarkerSize]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style jsx global>{`
        @keyframes techPulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
            box-shadow: 
              0 0 6px var(--agent-color),
              0 0 12px var(--agent-color),
              0 0 20px var(--agent-color);
          }
          50% { 
            transform: scale(1.8);
            opacity: 0.6;
            box-shadow: 
              0 0 10px var(--agent-color),
              0 0 20px var(--agent-color),
              0 0 35px var(--agent-color);
          }
        }
        .agent-marker {
          pointer-events: auto !important;
          cursor: pointer !important;
          z-index: 1000 !important;
        }
        .agent-marker:hover {
          transform: scale(2) !important;
          z-index: 100;
        }
      `}</style>
      
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          showGraticules={true}
          showAtmosphere={false}
          
          // Points (agents) - custom HTML markers with tech style
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          pointRadius={0.5}
          pointEl={markerElement}
          pointsMerge={false}
          enablePointerEvent={true}
          onPointClick={(point: any) => {
            console.log('Clicked point:', point);
            onAgentClick(point as Agent);
          }}
          onPointHover={(point: any) => onAgentHover(point as Agent | null)}
          
          onGlobeReady={() => setGlobeReady(true)}
          animateIn={true}
        />
      )}
      
      
    </div>
  );
}
