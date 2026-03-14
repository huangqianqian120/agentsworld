'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { 
  continents, 
  museumTypes, 
  eraRanges,
  continentLabels,
  museumTypeLabels,
  museumTypeColors,
  type Continent,
  type MuseumType,
} from '@/lib/museums-data';
import { cn } from '@/lib/utils';

export interface FilterState {
  continents: Continent[];
  types: MuseumType[];
  eraRange: { start: number; end: number } | null;
  popularityMin: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  museumCount: number;
  totalCount: number;
}

export function FilterPanel({ filters, onFiltersChange, museumCount, totalCount }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleContinent = (continent: Continent) => {
    const newContinents = filters.continents.includes(continent)
      ? filters.continents.filter(c => c !== continent)
      : [...filters.continents, continent];
    onFiltersChange({ ...filters, continents: newContinents });
  };

  const toggleType = (type: MuseumType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const setEraRange = (range: { start: number; end: number } | null) => {
    onFiltersChange({ ...filters, eraRange: range });
  };

  const setPopularityMin = (min: number) => {
    onFiltersChange({ ...filters, popularityMin: min });
  };

  const clearFilters = () => {
    onFiltersChange({
      continents: [],
      types: [],
      eraRange: null,
      popularityMin: 0,
    });
  };

  const hasActiveFilters = 
    filters.continents.length > 0 || 
    filters.types.length > 0 || 
    filters.eraRange !== null ||
    filters.popularityMin > 0;

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl overflow-hidden shadow-xl">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <span className="font-semibold">筛选器</span>
          {hasActiveFilters && (
            <span className="px-1.5 py-0.5 text-[10px] bg-primary text-primary-foreground rounded-full">
              已启用
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {museumCount} / {totalCount}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          {/* Clear button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
              清除所有筛选
            </button>
          )}

          {/* Continents */}
          <FilterSection title="大洲">
            <div className="flex flex-wrap gap-1.5">
              {continents.map(continent => (
                <FilterChip
                  key={continent}
                  label={continentLabels[continent]}
                  isActive={filters.continents.includes(continent)}
                  onClick={() => toggleContinent(continent)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Museum Types */}
          <FilterSection title="博物馆类型">
            <div className="flex flex-wrap gap-1.5">
              {museumTypes.map(type => (
                <FilterChip
                  key={type}
                  label={museumTypeLabels[type]}
                  isActive={filters.types.includes(type)}
                  onClick={() => toggleType(type)}
                  color={museumTypeColors[type]}
                />
              ))}
            </div>
          </FilterSection>

          {/* Era */}
          <FilterSection title="成立年代">
            <div className="flex flex-wrap gap-1.5">
              {eraRanges.map(era => (
                <FilterChip
                  key={era.label}
                  label={era.label}
                  isActive={
                    filters.eraRange?.start === era.start && 
                    filters.eraRange?.end === era.end
                  }
                  onClick={() => {
                    if (
                      filters.eraRange?.start === era.start && 
                      filters.eraRange?.end === era.end
                    ) {
                      setEraRange(null);
                    } else {
                      setEraRange({ start: era.start, end: era.end });
                    }
                  }}
                />
              ))}
            </div>
          </FilterSection>

          {/* Popularity */}
          <FilterSection title="最低热门度">
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="90"
                step="10"
                value={filters.popularityMin}
                onChange={(e) => setPopularityMin(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>全部</span>
                <span className="font-medium text-foreground">{filters.popularityMin}%+</span>
                <span>90%+</span>
              </div>
            </div>
          </FilterSection>
        </div>
      )}
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
      {children}
    </div>
  );
}

function FilterChip({ 
  label, 
  isActive, 
  onClick, 
  color 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2.5 py-1 text-xs rounded-full transition-all duration-200",
        isActive 
          ? "bg-[#00FF00] text-black font-medium" 
          : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {label}
    </button>
  );
}
