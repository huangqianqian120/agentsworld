'use client';

import { Building2, Globe2, Users, Calendar } from 'lucide-react';
import type { Museum } from '@/lib/museums-data';
import { museumTypeColors, continentLabels, type Continent } from '@/lib/museums-data';

interface StatsPanelProps {
  museums: Museum[];
}

export function StatsPanel({ museums }: StatsPanelProps) {
  const totalMuseums = museums.length;
  const totalVisitors = museums.reduce((sum, m) => sum + (m.annualVisitors || 0), 0);
  const continentCounts = museums.reduce((acc, m) => {
    acc[m.continent] = (acc[m.continent] || 0) + 1;
    return acc;
  }, {} as Record<Continent, number>);
  
  const oldestMuseum = museums.reduce((oldest, m) => 
    m.foundedYear < oldest.foundedYear ? m : oldest
  , museums[0]);

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl p-4 shadow-xl">
      <h3 className="text-xs font-medium text-muted-foreground mb-3">统计数据</h3>
      
      <div className="space-y-4">
        {/* Total Museums */}
        <StatItem
          icon={Building2}
          label="博物馆总数"
          value={totalMuseums.toLocaleString()}
          color="text-primary"
        />
        
        {/* Total Visitors */}
        <StatItem
          icon={Users}
          label="年访客总量"
          value={`${(totalVisitors / 1000000).toFixed(1)}M`}
          color="text-accent"
        />
        
        {/* Oldest Museum */}
        <StatItem
          icon={Calendar}
          label="最古老博物馆"
          value={`${oldestMuseum?.foundedYear || '-'}年`}
          subtitle={oldestMuseum?.nameLocal || oldestMuseum?.name}
          color="text-chart-3"
        />
        
        {/* Continent Distribution */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Globe2 className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">大洲分布</span>
          </div>
          <div className="space-y-1.5">
            {Object.entries(continentCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([continent, count]) => (
                <div key={continent} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-14 truncate">
                    {continentLabels[continent as Continent]}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(count / totalMuseums) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium w-6 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ 
  icon: Icon, 
  label, 
  value, 
  subtitle,
  color = "text-foreground"
}: { 
  icon: any; 
  label: string; 
  value: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg bg-muted ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={`text-lg font-bold ${color}`}>{value}</p>
        {subtitle && (
          <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
