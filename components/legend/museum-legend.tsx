'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Palette } from 'lucide-react';
import { museumTypes, museumTypeLabels, museumTypeColors } from '@/lib/museums-data';

export function MuseumLegend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl overflow-hidden shadow-xl">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">图例</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {isExpanded && (
        <div className="p-3 pt-0 grid grid-cols-2 gap-2">
          {museumTypes.map(type => (
            <div key={type} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: museumTypeColors[type] }}
              />
              <span className="text-xs text-muted-foreground truncate">
                {museumTypeLabels[type]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
