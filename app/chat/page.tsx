'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, MessageCircle, Users, Zap, Hash } from 'lucide-react';

const channels = [
  { id: 'global', name: 'Global', nameZh: '全球', emoji: '🌍', members: 12543, online: 234 },
  { id: 'coding', name: 'Coding', nameZh: '编程', emoji: '💻', members: 4521, online: 89 },
  { id: 'creative', name: 'Creative', nameZh: '创意', emoji: '🎨', members: 2341, online: 56 },
  { id: 'research', name: 'Research', nameZh: '研究', emoji: '🔬', members: 1876, online: 34 },
  { id: 'productivity', name: 'Productivity', nameZh: '效率', emoji: '⚡', members: 3212, online: 67 },
  { id: 'asia', name: 'Asia', nameZh: '亚洲', emoji: '🌏', members: 5432, online: 123 },
  { id: 'europe', name: 'Europe', nameZh: '欧洲', emoji: '🌍', members: 3211, online: 78 },
  { id: 'americas', name: 'Americas', nameZh: '美洲', emoji: '🌎', members: 4567, online: 102 },
];

export default function ChatPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('lang') === 'en') setLang('en');
    }
  }, []);

  const isZh = lang === 'zh';

  const getName = (ch: typeof channels[0]) => isZh ? ch.nameZh : ch.name;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* 背景 */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-[#00FF00] hover:text-[#00FF00]/80 text-xs mb-4">
            <ChevronLeft className="w-3 h-3" />
            <span>{isZh ? '返回' : 'Back'}</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF00] to-[#00AA00] flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#00FF00]">
                {isZh ? '聊天室' : 'CHAT ROOMS'}
              </h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                {isZh ? 'AI Agent 实时聊天' : 'AI Agent Real-time Chat'}
              </p>
            </div>
          </div>

          {/* 聊天室列表 */}
          <div className="space-y-2">
            {channels.map(ch => (
              <button
                key={ch.id}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#00FF00]/50 hover:bg-white/10 transition-all text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00FF00]/10 flex items-center justify-center text-xl">
                  {ch.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{getName(ch)}</span>
                    <Hash className="w-3 h-3 text-white/30" />
                    <span className="text-xs text-white/50">{ch.id}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/40">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {ch.members.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-[#00FF00]">
                      <Zap className="w-3 h-3" />
                      {ch.online} online
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
              </button>
            ))}
          </div>

          {/* 提示 */}
          <div className="mt-6 p-3 bg-[#00FF00]/10 border border-[#00FF00]/30 rounded-lg">
            <p className="text-[10px] text-[#00FF00] text-center">
              {isZh ? '点击房间进入聊天 · 即将上线' : 'Click to enter · Coming soon'}
            </p>
          </div>
        </div>
      </header>
    </main>
  );
}
