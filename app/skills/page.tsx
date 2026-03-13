'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, Package, Zap, Shield, Sparkles, Star, Download, Lock } from 'lucide-react';

// 模拟 Skills 数据 - 游戏技能包风格
const skills = [
  { id: 'ab-test-setup', name: 'A/B Test', nameZh: 'A/B 测试', category: 'Business', description: 'A/B测试和实验设计', installCount: 1234, rating: 4.8, emoji: '🧪', power: 5, rarity: 'blue', price: 0 },
  { id: 'ai-news-aggregator', name: 'AI News', nameZh: 'AI 新闻', category: 'AI', description: '聚合AI/LLM/Agent新闻', installCount: 2341, rating: 4.9, emoji: '🤖', power: 7, rarity: 'purple', price: 0 },
  { id: 'analytics-tracking', name: 'Analytics', nameZh: '分析追踪', category: 'Business', description: '设置和改进分析追踪', installCount: 987, rating: 4.7, emoji: '📊', power: 6, rarity: 'blue', price: 0 },
  { id: 'blogwatcher', name: 'Blog Watcher', nameZh: '博客观察', category: 'Business', description: '监控博客和RSS更新', installCount: 756, rating: 4.5, emoji: '👀', power: 4, rarity: 'green', price: 0 },
  { id: 'competitor-tracker', name: 'Competitor', nameZh: '竞品追踪', category: 'Business', description: '追踪竞争对手动态', installCount: 1567, rating: 4.6, emoji: '🎯', power: 6, rarity: 'blue', price: 0 },
  { id: 'content-strategy', name: 'Content Strategy', nameZh: '内容策略', category: 'Business', description: '内容策略规划', installCount: 1823, rating: 4.8, emoji: '✍️', power: 7, rarity: 'purple', price: 0 },
  { id: 'copywriting', name: 'Copywriting', nameZh: '文案写作', category: 'Business', description: '营销文案撰写', installCount: 3421, rating: 4.9, emoji: '📝', power: 8, rarity: 'orange', price: 0 },
  { id: 'ddg-web-search', name: 'Web Search', nameZh: '网页搜索', category: 'AI', description: 'DuckDuckGo搜索', installCount: 4532, rating: 4.7, emoji: '🔍', power: 6, rarity: 'blue', price: 0 },
  { id: 'document-summarizer', name: 'Doc Summarizer', nameZh: '文档摘要', category: 'AI', description: '长文档摘要生成', installCount: 2134, rating: 4.6, emoji: '📄', power: 5, rarity: 'blue', price: 0 },
  { id: 'entrepreneurship', name: 'Entrepreneurship', nameZh: '创业指导', category: 'Business', description: '创业和商业指导', installCount: 1678, rating: 4.8, emoji: '🚀', power: 9, rarity: 'orange', price: 0 },
  { id: 'firecrawl', name: 'Firecrawl', nameZh: '网页抓取', category: 'AI', description: '网页数据抓取工具', installCount: 3876, rating: 4.9, emoji: '🔥', power: 8, rarity: 'orange', price: 0 },
  { id: 'frontend', name: 'Frontend', nameZh: '前端开发', category: 'Development', description: 'Web和移动端UI构建', installCount: 5678, rating: 4.9, emoji: '💻', power: 9, rarity: 'orange', price: 0 },
  { id: 'growth', name: 'Growth', nameZh: '增长黑客', category: 'Business', description: '产品增长和PMF', installCount: 2345, rating: 4.7, emoji: '📈', power: 8, rarity: 'purple', price: 0 },
  { id: 'hello-world', name: 'Hello World', nameZh: '入门示例', category: 'Development', description: '各种语言的Hello World', installCount: 7890, rating: 5.0, emoji: '🌍', power: 3, rarity: 'green', price: 0 },
  { id: 'html', name: 'HTML Guide', nameZh: 'HTML指南', category: 'Development', description: 'HTML最佳实践', installCount: 3456, rating: 4.6, emoji: '📄', power: 5, rarity: 'blue', price: 0 },
  { id: 'marketing-ideas', name: 'Marketing', nameZh: '营销创意', category: 'Business', description: '139种营销策略', installCount: 4567, rating: 4.8, emoji: '💡', power: 8, rarity: 'orange', price: 0 },
  { id: 'marketing-psychology', name: 'Psychology', nameZh: '营销心理学', category: 'Business', description: '70+心理模型', installCount: 2987, rating: 4.7, emoji: '🧠', power: 7, rarity: 'purple', price: 0 },
  { id: 'mckinsey-consultant', name: 'Consultant', nameZh: '麦肯锡顾问', category: 'Business', description: 'McKinsey风格分析', installCount: 5678, rating: 4.9, emoji: '💼', power: 10, rarity: 'red', price: 0 },
  { id: 'mimeng-writing', name: 'Mimeng', nameZh: '咪蒙写作', category: 'Media', description: '爆款文章写作技巧', installCount: 8765, rating: 4.9, emoji: '✒️', power: 9, rarity: 'orange', price: 0 },
  { id: 'product-strategy', name: 'Product Strategy', nameZh: '产品策略', category: 'Business', description: '产品策略和优先级', installCount: 3456, rating: 4.8, emoji: '🎯', power: 8, rarity: 'purple', price: 0 },
  { id: 'seo-audit', name: 'SEO Audit', nameZh: 'SEO审计', category: 'Business', description: 'SEO健康检查', installCount: 2345, rating: 4.6, emoji: '🔎', power: 6, rarity: 'blue', price: 0 },
  { id: 'user-research', name: 'User Research', nameZh: '用户研究', category: 'Business', description: '用户研究和客户发现', installCount: 1876, rating: 4.7, emoji: '👥', power: 7, rarity: 'purple', price: 0 },
  { id: 'weather', name: 'Weather', nameZh: '天气查询', category: 'Lifestyle', description: '天气和天气预报', installCount: 6789, rating: 4.8, emoji: '🌤️', power: 4, rarity: 'green', price: 0 },
  { id: 'web', name: 'Web Dev', nameZh: 'Web开发', category: 'Development', description: '网站构建和部署', installCount: 5432, rating: 4.9, emoji: '🌐', power: 9, rarity: 'orange', price: 0 },
  { id: 'website', name: 'Website', nameZh: '网站搭建', category: 'Development', description: '快速建站工具', installCount: 4321, rating: 4.8, emoji: '🏗️', power: 8, rarity: 'purple', price: 0 },
];

const categories = ['All', 'AI', 'Business', 'Development', 'Lifestyle', 'Media'];

const categoryLabels: Record<string, Record<string, string>> = {
  All: { en: 'All', zh: '全部' },
  AI: { en: 'AI', zh: 'AI' },
  Business: { en: 'Biz', zh: '商业' },
  Development: { en: 'Dev', zh: '开发' },
  Lifestyle: { en: 'Life', zh: '生活' },
  Media: { en: 'Media', zh: '媒体' },
};

const rarityColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  green: { bg: 'from-green-900/50', border: 'border-green-500/50', glow: 'shadow-green-500/20', text: 'text-green-400' },
  blue: { bg: 'from-blue-900/50', border: 'border-blue-500/50', glow: 'shadow-blue-500/20', text: 'text-blue-400' },
  purple: { bg: 'from-purple-900/50', border: 'border-purple-500/50', glow: 'shadow-purple-500/20', text: 'text-purple-400' },
  orange: { bg: 'from-orange-900/50', border: 'border-orange-500/50', glow: 'shadow-orange-500/20', text: 'text-orange-400' },
  red: { bg: 'from-red-900/50', border: 'border-red-500/50', glow: 'shadow-red-500/30', text: 'text-red-400' },
};

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<'en' | 'zh'>('zh');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('lang') === 'en') setLang('en');
    }
  }, []);

  const isZh = lang === 'zh';

  const filteredSkills = skills.filter(skill => {
    const matchCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       skill.nameZh.includes(searchQuery) ||
                       skill.description.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  const getName = (skill: typeof skills[0]) => isZh ? skill.nameZh : skill.name;
  const getDesc = (skill: typeof skills[0]) => isZh ? `${skill.description}` : skill.description;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* 游戏化背景 */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
      <div className="fixed inset-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(0, 255, 0, 0.05) 0%, transparent 30%),
                         radial-gradient(circle at 20% 90%, rgba(0, 255, 0, 0.08) 0%, transparent 40%)`
      }} />

      {/* 网格背景 */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Header */}
      <header className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-[#00FF00] hover:text-[#00FF00]/80 text-xs mb-3">
            <ChevronLeft className="w-3 h-3" />
            <span>{isZh ? '返回' : 'Back'}</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00FF00] to-[#00AA00] flex items-center justify-center shadow-lg shadow-[#00FF00]/30">
                  <Package className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00FF00] rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#00FF00] tracking-wider">
                  {isZh ? '技能商店' : 'SKILL SHOP'}
                </h1>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">
                  {isZh ? '装备你的AI助手' : 'Equip Your AI Agent'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 筛选 */}
      <section className="relative z-10 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-3">
            {/* 分类 */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-[10px] uppercase tracking-wider transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-[#00FF00] text-black shadow-lg shadow-[#00FF00]/30'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {categoryLabels[cat]?.[isZh ? 'zh' : 'en'] || cat}
                </button>
              ))}
            </div>

            {/* 搜索 */}
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
              <input
                type="text"
                placeholder={isZh ? '搜索技能...' : 'Search skills...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FF00]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 技能卡片网格 */}
      <section className="relative z-10 px-4 py-3 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredSkills.map((skill) => {
              const colors = rarityColors[skill.rarity] || rarityColors.blue;
              return (
                <div
                  key={skill.id}
                  className="group relative bg-gradient-to-b bg-black rounded-xl border border-white/10 overflow-hidden hover:border-[#00FF00]/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  {/* 稀有度光效 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent opacity-50`} />
                  
                  {/* 发光边框效果 */}
                  <div className={`absolute inset-0 border ${colors.border} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative p-3">
                    {/* 顶部：图标 + 稀有度 */}
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center text-xl shadow-lg ${colors.glow}`}>
                        {skill.emoji}
                      </div>
                      <div className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${colors.bg} ${colors.border} ${colors.text}`}>
                        {skill.rarity}
                      </div>
                    </div>

                    {/* 名称 */}
                    <h3 className="font-bold text-xs text-white mb-0.5 truncate group-hover:text-[#00FF00] transition-colors">
                      {getName(skill)}
                    </h3>

                    {/* 描述 */}
                    <p className="text-[9px] text-white/40 line-clamp-1 mb-2 h-3">
                      {getDesc(skill)}
                    </p>

                    {/* 力量值 */}
                    <div className="flex items-center gap-1 mb-2">
                      <Zap className={`w-3 h-3 ${colors.text}`} />
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${colors.bg.replace('50', '70')}`} 
                          style={{ width: `${(skill.power / 10) * 100}%` }}
                        />
                      </div>
                      <span className={`text-[9px] ${colors.text}`}>{skill.power}</span>
                    </div>

                    {/* 底部：使用次数 + 获取按钮 */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1 text-[9px] text-white/30">
                        <Download className="w-2.5 h-2.5" />
                        {skill.installCount >= 1000 ? `${(skill.installCount/1000).toFixed(1)}k` : skill.installCount}
                      </div>
                      <button className={`px-2 py-1 text-[9px] font-bold rounded bg-[#00FF00]/20 text-[#00FF00] hover:bg-[#00FF00] hover:text-black transition-all opacity-0 group-hover:opacity-100`}>
                        {isZh ? '装备' : 'EQUIP'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-10 h-10 text-white/20 mx-auto mb-2" />
              <p className="text-white/40 text-xs">{isZh ? '没有找到技能' : 'No skills found'}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
