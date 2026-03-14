'use client';

import type { Agent } from '@/lib/agents-data';
import { agentTypeColors, agentTypeLabels } from '@/lib/agents-data';

interface AgentHoverCardProps {
  agent: Agent;
  position: { x: number; y: number };
}

export function AgentHoverCard({ agent, position }: AgentHoverCardProps) {
  const typeColor = agentTypeColors[agent.type];
  
  // Adjust position to keep card in viewport
  const adjustedX = Math.min(position.x, window.innerWidth - 280);
  const adjustedY = Math.min(position.y, window.innerHeight - 120);
  
  return (
    <div 
      className="fixed z-40 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
      style={{ 
        left: adjustedX + 20,
        top: adjustedY - 10,
      }}
    >
      <div className="bg-popover border border-border rounded-lg shadow-xl p-3 min-w-[220px] max-w-[260px]">
        <div className="flex items-start gap-2.5">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold text-sm shrink-0"
            style={{ backgroundColor: '#00FF00' }}
          >
            {agent.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm leading-tight truncate">
              {agent.nameLocal || agent.name}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {agent.city}, {agent.country}
            </p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          <span 
            className="px-1.5 py-0.5 text-[10px] font-medium rounded"
            style={{ backgroundColor: `${typeColor}25`, color: typeColor }}
          >
            {agentTypeLabels[agent.type]}
          </span>
          <span className="text-[10px] text-muted-foreground">
            {agent.foundedYear}年发布
          </span>
        </div>
        
        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
          {agent.description}
        </p>
        
        <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">热门度</span>
          <div className="flex items-center gap-1.5">
            <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ width: `${agent.popularity}%`, backgroundColor: typeColor }}
              />
            </div>
            <span className="text-[10px] font-medium">{agent.popularity}%</span>
          </div>
        </div>
        
        <p className="mt-2 text-[10px] text-primary">点击查看详情</p>
      </div>
    </div>
  );
}
