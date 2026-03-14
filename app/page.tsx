'use client';

import { useState, useCallback, useEffect } from 'react';
import { AgentGlobe, type ViewPreset } from '@/components/globe/museum-globe';
import { AgentDetailCard } from '@/components/museum/museum-detail-card';
import { AgentHoverCard } from '@/components/museum/museum-hover-card';
import { ViewControls } from '@/components/controls/view-controls';
import { InfoModal } from '@/components/modals/info-modal';
import { ShareModal } from '@/components/modals/share-modal';
import { agents as defaultAgents, type Agent } from '@/lib/agents-data';
import { translations, type Language } from '@/lib/i18n';
import { BGMPlayer } from '@/components/bgm-player';
import { X } from 'lucide-react';

export default function AgentGlobePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  
  useEffect(() => {
    setIsMounted(true);
    
    // 从 API 获取 Agent 数据
    fetch('/api/agents')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setAgents(result.data as Agent[]);
        }
      })
      .catch(console.error);
  }, []);
  
  const t = translations[language];
  
  // State
  const [viewPreset, setViewPreset] = useState<ViewPreset>('default');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<Agent | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [randomCard, setRandomCard] = useState<Agent | null>(null);

  const agentList = agents;

  const handleAgentClick = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
    setHoveredAgent(null);
    setRandomCard(null);
  }, []);

  const handleAgentHover = useCallback((agent: Agent | null) => {
    setHoveredAgent(agent);
  }, []);

  const handleSearchSelect = useCallback((agent: Agent) => {
    setSelectedAgent(agent);
    const continentViewMap: Record<string, ViewPreset> = {
      'Europe': 'europe',
      'Asia': 'asia',
      'North America': 'americas',
      'South America': 'americas',
      'Africa': 'africa',
      'Oceania': 'oceania',
    };
    const newView = continentViewMap[agent.continent] || 'default';
    setViewPreset(newView);
  }, []);

  const handleRandomDiscovery = useCallback(() => {
    setIsRandomizing(true);
    setRandomCard(null);
    
    let count = 0;
    const interval = setInterval(() => {
      const randomAgent = agentList[Math.floor(Math.random() * agentList.length)];
      setRandomCard(randomAgent);
      count++;
      
      if (count > 5) {
        clearInterval(interval);
        setIsRandomizing(false);
        const finalAgent = agentList[Math.floor(Math.random() * agentList.length)];
        setRandomCard(finalAgent);
        
        const continentViewMap: Record<string, ViewPreset> = {
          'Europe': 'europe',
          'Asia': 'asia',
          'North America': 'americas',
          'South America': 'americas',
          'Africa': 'africa',
          'Oceania': 'oceania',
        };
        const newView = continentViewMap[finalAgent.continent] || 'default';
        setViewPreset(newView);
      }
    }, 200);
  }, [agentList]);

  const closeRandomCard = useCallback(() => {
    setRandomCard(null);
  }, []);

  const handleReset = useCallback(() => {
    setViewPreset('default');
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  if (!isMounted) {
    return (
      <main className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-bold text-[#00FF00]">{t.title}</h1>
          <p className="text-xs text-[#00FF00]/70 animate-pulse">{t.loading}</p>
        </div>
      </main>
    );
  }

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Globe */}
      <div className="absolute inset-0">
        <AgentGlobe
          agents={agentList}
          onAgentClick={handleAgentClick}
          onAgentHover={handleAgentHover}
          viewPreset={viewPreset}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="bg-[#00FF00] px-4 py-2">
            <h1 className="text-lg md:text-xl font-bold text-black leading-tight">
              {t.title}
            </h1>
            <p className="text-xs text-black/70">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => window.location.href = '/join?lang=' + language}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-[#00FF00] to-[#00DD00] text-black hover:from-[#00EE00] hover:to-[#00CC00] transition-all shadow-lg shadow-[#00FF00]/20"
            >
              {language === 'en' ? '+ Join' : '+ 入驻'}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
              className="px-2 py-2 text-xs font-medium text-[#00FF00] hover:text-[#00FF00]/70 transition-colors"
            >
              {language === 'en' ? '中/英' : 'EN/中'}
            </button>
          </div>
        </div>
      </header>

      {/* Right Sidebar - Controls */}
      <aside className="absolute right-4 md:right-6 top-24 md:top-28 z-10 hidden md:block">
        <ViewControls
          currentView={viewPreset}
          onViewChange={setViewPreset}
          onReset={handleReset}
          onShare={() => setShowShareModal(true)}
          onInfo={() => setShowInfoModal(true)}
          onMarket={() => window.location.href = '/skills?lang=' + language}
          onRandom={handleRandomDiscovery}
          onChat={() => window.location.href = '/chat?lang=' + language}
          isRandomizing={isRandomizing}
          t={t}
        />
      </aside>

      {/* Random Card - Floating in center */}
      {randomCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
             onClick={closeRandomCard}>
          <div 
            className="relative w-full max-w-md bg-black/90 border border-[#00FF00]/50 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeRandomCard}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#00FF00] flex items-center justify-center text-3xl shadow-lg shadow-[#00FF00]/30">
                  {randomCard.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {randomCard.nameLocal || randomCard.name}
                  </h2>
                  <p className="text-sm text-white/60">{randomCard.city}, {randomCard.country}</p>
                </div>
              </div>
              
              <p className="text-sm text-white/80 mb-4">{randomCard.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {randomCard.capabilities.slice(0, 4).map((cap: string) => (
                  <span key={cap} className="px-2 py-1 text-xs bg-[#00FF00]/20 text-[#00FF00] rounded-full">
                    {cap}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => {
                  handleAgentClick(randomCard);
                  closeRandomCard();
                }}
                className="w-full py-3 bg-[#00FF00] text-black font-bold rounded-xl hover:bg-[#00DD00] transition-colors"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-10 md:hidden">
        <div className="flex items-center justify-between gap-2 bg-card/95 backdrop-blur-md border border-border rounded-xl p-2 shadow-xl">
          <button
            onClick={() => setShowInfoModal(true)}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            关于
          </button>
          <button
            onClick={handleRandomDiscovery}
            disabled={isRandomizing}
            className="px-3 py-2 text-sm text-[#00FF00] font-medium"
          >
            {isRandomizing ? '...' : '随机'}
          </button>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-primary font-medium">{agentList.length}</span>
            <span className="text-muted-foreground">个</span>
          </div>
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            分享
          </button>
        </div>
      </div>

      {hoveredAgent && !selectedAgent && !randomCard && (
        <AgentHoverCard
          agent={hoveredAgent}
          position={mousePosition}
        />
      )}

      {selectedAgent && (
        <AgentDetailCard
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {showInfoModal && (
        <InfoModal onClose={() => setShowInfoModal(false)} />
      )}

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background/60 to-transparent pointer-events-none" />

      <BGMPlayer src="/bgm.m4a" />
    </main>
  );
}
