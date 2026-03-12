'use client';

import { Globe, MapPin, Share2, RotateCcw, Maximize, Info } from 'lucide-react';
import type { ViewPreset } from '@/components/globe/museum-globe';
import { cn } from '@/lib/utils';

interface ViewControlsProps {
  currentView: ViewPreset;
  onViewChange: (view: ViewPreset) => void;
  onReset: () => void;
  onShare: () => void;
  onInfo: () => void;
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
  };

  return (
    <div className="flex flex-col gap-2">
      {/* View Presets */}
      <div className="bg-black/80 border border-[#00FF00]/30 rounded-none p-1.5 shadow-xl">
        <div className="flex flex-col gap-1">
          {viewButtons.map(({ id, labelKey }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap",
                currentView === id
                  ? "text-[#00FF00]"
                  : "text-white/70 hover:text-[#00FF00]"
              )}
            >
              {id === 'default' && <Globe className="w-3 h-3 shrink-0" />}
              {labels[labelKey]}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-black/80 border border-[#00FF00]/30 rounded-none p-1.5 shadow-xl">
        <div className="flex flex-col gap-1">
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
      className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-[#00FF00] hover:bg-[#00FF00]/10 transition-colors"
      title={label}
    >
      <Icon className="w-3 h-3" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
