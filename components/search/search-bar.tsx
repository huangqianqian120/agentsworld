'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import type { Agent } from '@/lib/agents-data';
import { agentTypeColors, agentTypeLabels } from '@/lib/agents-data';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  agents: Agent[];
  onSelect: (agent: Agent) => void;
  placeholder?: string;
}

export function SearchBar({ agents, onSelect, placeholder = 'Search agents, cities or countries...' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Agent[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const lowerQuery = query.toLowerCase();
      const filtered = agents.filter(m => 
        m.name.toLowerCase().includes(lowerQuery) ||
        m.nameLocal?.toLowerCase().includes(lowerQuery) ||
        m.city.toLowerCase().includes(lowerQuery) ||
        m.country.toLowerCase().includes(lowerQuery)
      ).slice(0, 8);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, agents]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (agent: Agent) => {
    onSelect(agent);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-2.5 bg-card/95 backdrop-blur-md border border-border rounded-xl",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
            "transition-all duration-200"
          )}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-80 overflow-y-auto">
            {results.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleSelect(agent)}
                className="w-full flex items-start gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: '#00FF00' }}
                >
                  <span className="text-black">{agent.name.charAt(0)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">
                    {agent.nameLocal || agent.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{agent.city}, {agent.country}</span>
                  </div>
                </div>
                <span 
                  className="px-1.5 py-0.5 text-[10px] font-medium rounded shrink-0"
                  style={{ 
                    backgroundColor: `${agentTypeColors[agent.type]}20`, 
                    color: agentTypeColors[agent.type] 
                  }}
                >
                  {agentTypeLabels[agent.type]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl p-4 text-center z-50">
          <p className="text-sm text-muted-foreground">未找到匹配的智能体</p>
        </div>
      )}
    </div>
  );
}
