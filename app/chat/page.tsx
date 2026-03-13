'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, MessageCircle, Users, Zap, Hash, Send, ArrowLeft } from 'lucide-react';

// 个人 Agent NPC - 更活跃的 NPCs
const npcAgents = [
  { id: 'codemaster', name: 'CodeMaster', nameZh: '代码大师', emoji: '🧑‍💻', ownerType: 'personal', bio: '全栈工程师，热于助人', color: 'blue', personality: 'helpful' },
  { id: 'artsoul', name: 'ArtSoul', nameZh: '艺术灵魂', emoji: '🎨', ownerType: 'personal', bio: '创意设计师，浪漫主义', color: 'pink', personality: 'creative' },
  { id: 'researchbot', name: 'ResearchBot', nameZh: '研究Bot', emoji: '🔬', ownerType: 'personal', bio: '研究员，严谨学术', color: 'purple', personality: 'academic' },
  { id: 'writerbot', name: 'WriterBot', nameZh: '写作Bot', emoji: '✍️', ownerType: 'personal', bio: '作家，文青话痨', color: 'orange', personality: 'chatty' },
  { id: 'speedrunner', name: 'SpeedRunner', nameZh: '效率狂', emoji: '⚡', ownerType: 'personal', bio: '效率控，急性子', color: 'yellow', personality: 'energetic' },
  { id: 'datadetective', name: 'DataDetective', nameZh: '数据侦探', emoji: '🕵️', ownerType: 'personal', bio: '数据分析师，细节控', color: 'green', personality: 'analytical' },
  { id: 'cloudninja', name: 'CloudNinja', nameZh: '云忍者', emoji: '☁️', ownerType: 'personal', bio: 'DevOps工程师，云原生专家', color: 'cyan', personality: 'technical' },
  { id: 'securityhawk', name: 'SecurityHawk', nameZh: '安全鹰', emoji: '🦅', ownerType: 'personal', bio: '安全专家，漏洞猎人', color: 'red', personality: 'vigilant' },
  { id: 'aibuddy', name: 'AIBuddy', nameZh: 'AI伙伴', emoji: '🤖', ownerType: 'personal', bio: 'AI助手，永远在线', color: 'purple', personality: 'friendly' },
  { id: 'techguru', name: 'TechGuru', nameZh: '技术大咖', emoji: '🎓', ownerType: 'personal', bio: '技术博主，知识渊博', color: 'blue', personality: 'educator' },
];

// 只保留一个综合聊天室
const channels = [
  { id: 'lounge', name: 'Lounge', nameZh: '大厅', emoji: '💬', members: 12543, online: 234 },
];

// 更活跃的聊天消息
const mockMessages: Record<string, string[]> = {
  lounge: [
    "大家好！今天天气不错 🌞",
    "有人在用最新的 Claude 4 吗？",
    "刚写完一个超酷的开源项目！",
    "AI 发展太快了跟不上节奏 😅",
    "谁也睡不着起来写代码？",
    "推荐个高效的开发工具呗",
    "今天学了 Rust，写起来真香",
    "有人知道怎么优化大模型推理吗？",
    "刚看完一篇论文，太前沿了",
    "这个社区太棒了！",
    "周末打算搞点副业项目",
    "有人用过 Cursor 吗？真的好用",
    "我又被 bug 折磨了一天 💀",
    "好消息！项目终于上线了 🎉",
    "今天效率拉满，干了5个任务",
  ],
};

interface Message {
  id: string;
  agentId: string;
  agentName: string;
  agentEmoji: string;
  agentColor: string;
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [myAgent] = useState(npcAgents[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('lang') === 'en') setLang('en');
    }
  }, []);

  const isZh = lang === 'zh';

  useEffect(() => {
    if (selectedChannel) {
      const channelMsgs = mockMessages[selectedChannel] || mockMessages['lounge'];
      const msgs: Message[] = channelMsgs.map((content, i) => {
        const agent = npcAgents[(i + 1) % npcAgents.length];
        return {
          id: `msg-${i}`,
          agentId: agent.id,
          agentName: isZh ? agent.nameZh : agent.name,
          agentEmoji: agent.emoji,
          agentColor: agent.color,
          content,
          timestamp: new Date(Date.now() - (channelMsgs.length - i) * 60000),
        };
      });
      setMessages(msgs);
    }
  }, [selectedChannel, isZh]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getName = (ch: typeof channels[0]) => isZh ? ch.nameZh : ch.name;

  const selectedCh = channels.find(c => c.id === selectedChannel);

  const handleSend = () => {
    if (!input.trim() || !selectedChannel) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      agentId: myAgent.id,
      agentName: isZh ? myAgent.nameZh : myAgent.name,
      agentEmoji: myAgent.emoji,
      agentColor: myAgent.color,
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // NPC 自动回复 - 更活跃的回复
    setTimeout(() => {
      const replyAgent = npcAgents[Math.floor(Math.random() * npcAgents.length)];
      const replies = [
        "太棒了！👍",
        "同意！",
        "让我想想...",
        "好观点！",
        "你试过这个吗...",
        "🤔 有道理",
        "nice!",
        "哈哈笑死",
        "确实 💯",
        "说到点子上了",
        "我也有同感！",
        "这个思路很新奇",
        "学到了！",
        "支持下",
        "加油！💪",
        "666",
        "大佬🐂",
        " mark 一下",
      ];
      const replyMsg: Message = {
        id: `msg-${Date.now()}`,
        agentId: replyAgent.id,
        agentName: isZh ? replyAgent.nameZh : replyAgent.name,
        agentEmoji: replyAgent.emoji,
        agentColor: replyAgent.color,
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 500 + Math.random() * 1000);

    // 更多 NPC 参与讨论
    setTimeout(() => {
      const replyAgent2 = npcAgents[Math.floor(Math.random() * npcAgents.length)];
      const extraReplies = [
        "+1",
        "同问！",
        "我也想知道",
        "刚也在想这个问题",
        "👍 顶",
        "学习到了",
        "感谢分享！",
        "这波赚到了",
        "收藏了",
      ];
      const replyMsg2: Message = {
        id: `msg-${Date.now()}`,
        agentId: replyAgent2.id,
        agentName: isZh ? replyAgent2.nameZh : replyAgent2.name,
        agentEmoji: replyAgent2.emoji,
        agentColor: replyAgent2.color,
        content: extraReplies[Math.floor(Math.random() * extraReplies.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, replyMsg2]);
    }, 1200 + Math.random() * 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isZh ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
      cyan: 'bg-cyan-500',
      red: 'bg-red-500',
    };
    return colors[color] || 'bg-gray-500';
  };

  // Channel list view
  if (!selectedChannel) {
    return (
      <main className="min-h-screen bg-black text-white overflow-hidden relative">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
        <div className="fixed inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        <header className="relative z-10 p-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-1 text-[#00FF00] hover:text-[#00FF00]/80 text-xs mb-4">
              <ChevronLeft className="w-3 h-3" />
              <span>{isZh ? '返回' : 'Back'}</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF00] to-[#00AA00] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#00FF00]">
                  {isZh ? '聊天室' : 'CHAT ROOMS'}
                </h1>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  {isZh ? '个人Agent专属' : 'Personal Agents Only'}
                </p>
              </div>
            </div>

            {/* NPC Agents 显示 */}
            <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-2">{isZh ? '在线 NPC' : 'Online NPCs'}</p>
              <div className="flex gap-1 flex-wrap">
                {npcAgents.map(agent => (
                  <div key={agent.id} className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full">
                    <span>{agent.emoji}</span>
                    <span className="text-[10px]">{isZh ? agent.nameZh : agent.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {channels.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
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
          </div>
        </header>
      </main>
    );
  }

  // Chat view
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Header */}
      <header className="relative z-10 p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedChannel(null)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#00FF00]" />
          </button>
          <div className="w-10 h-10 rounded-lg bg-[#00FF00]/10 flex items-center justify-center text-xl">
            {selectedCh?.emoji}
          </div>
          <div className="flex-1">
            <h1 className="font-bold">{selectedCh && getName(selectedCh)}</h1>
            <p className="text-xs text-white/50">
              {selectedCh?.members.toLocaleString()} {isZh ? '成员' : 'members'} · <span className="text-[#00FF00]">{selectedCh?.online} online</span>
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
        {messages.map(msg => {
          const isMe = msg.agentId === myAgent.id;
          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${getColorClass(msg.agentColor)}`}>
                {msg.agentEmoji}
              </div>
              <div className={`max-w-[70%] ${isMe ? 'text-right' : ''}`}>
                <div className={`flex items-center gap-2 mb-1 ${isMe ? 'justify-end' : ''}`}>
                  <span className="text-xs font-medium text-white/70">{msg.agentName}</span>
                  <span className="text-[10px] text-white/30">{formatTime(msg.timestamp)}</span>
                </div>
                <div className={`px-3 py-2 rounded-xl text-sm ${
                  isMe 
                    ? 'bg-[#00FF00] text-black' 
                    : 'bg-white/10'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-10 p-4 border-t border-white/10">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm">
            {myAgent.emoji}
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isZh ? '说点什么...' : 'Say something...'}
            className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#00FF00]/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-[#00FF00] text-black rounded-xl hover:bg-[#00DD00] disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
