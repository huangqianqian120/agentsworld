'use client';

import { Globe, Share2, RotateCcw, Info, MessageCircle } from 'lucide-react';
import type { ViewPreset } from '@/components/globe/museum-globe';
import { cn } from '@/lib/utils';

interface ViewControlsProps {
  currentView: ViewPreset;
  onViewChange: (view: ViewPreset) => void;
  onReset: () => void;
  onShare: () => void;
  onInfo: () => void;
  onMarket?: () => void;
  onRandom?: () => void;
  onChat?: () => void;
  isRandomizing?: boolean;
  t?: {
    global: string;
    resetView: string;
    share: string;
    about: string;
    asia: string;
    europe: string;
    americas: string;
    africa: string;
    oceania: string;
    randomDiscovery?: string;
    market?: string;
    chat?: string;
  };
}

const viewButtons: { id: ViewPreset; labelKey: keyof ViewControlsProps['t'] }[] = [
  { id: 'default', labelKey: 'global' },
  { id: 'europe', labelKey: 'europe' },
  { id: 'asia', labelKey: 'asia' },
  { id: 'americas', labelKey: 'americas' },
  { id: 'africa', labelKey: 'africa' },
  { id: 'oceania', labelKey: 'oceania' },
];

export function ViewControls({ 
  currentView, 
  onViewChange, 
  onReset, 
  onShare,
  onInfo,
  onMarket,
  onRandom,
  onChat,
  isRandomizing,
  t,
}: ViewControlsProps) {
  const labels = t || {
    global: '全球',
    resetView: '重置',
    share: '分享',
    about: '关于',
    asia: '亚洲',
    europe: '欧洲',
    americas: '美洲',
    africa: '非洲',
    oceania: '大洋洲',
    randomDiscovery: '随机发现',
    market: '市场',
    chat: '聊天室',
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Top Buttons - Market, Random, Chat */}
      {(onMarket || onRandom || onChat) && (
        <div className="bg-black/80 border border-[#00FF00]/30 rounded-lg p-1.5 shadow-xl">
          <div className="flex flex-col gap-0.5">
            {onMarket && (
              <button
                onClick={onMarket}
                className="w-full px-2 py-1.5 rounded text-xs text-left text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
              >
                {labels.market || '市场'}
              </button>
            )}
            {onRandom && (
              <button
                onClick={onRandom}
                disabled={isRandomizing}
                className="w-full px-2 py-1.5 rounded text-xs text-left text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors disabled:opacity-50"
              >
                {isRandomizing ? '...' : (labels.randomDiscovery || '随机发现')}
              </button>
            )}
            {onChat && (
              <button
                onClick={onChat}
                className="w-full px-2 py-1.5 rounded text-xs text-left text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
              >
                {labels.chat || '聊天室'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* View Presets */}
      <div className="bg-black/80 border border-[#00FF00]/30 rounded-lg p-1.5 shadow-xl">
        <div className="flex flex-col gap-0.5">
          {viewButtons.map(({ id, labelKey }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 whitespace-nowrap",
                currentView === id
                  ? "text-[#00FF00]"
                  : "text-white/70 hover:text-[#00FF00]"
              )}
            >
              {labels[labelKey]}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-black/80 border border-[#00FF00]/30 rounded-lg p-1.5 shadow-xl">
        <div className="flex flex-col gap-0.5">
          <ControlButton
            icon={RotateCcw}
            label={labels.resetView}
            onClick={onReset}
          />
          <ControlButton
            icon={Share2}
            label={labels.share}
            onClick={onShare}
          />
          <ControlButton
            icon={Info}
            label={labels.about}
            onClick={onInfo}
          />
        </div>
      </div>
    </div>
  );
}

function ControlButton({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: any; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-2 py-1.5 rounded text-xs text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors w-full"
      title={label}
    >
      <Icon className="w-3 h-3" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
