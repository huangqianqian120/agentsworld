'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft } from 'lucide-react';

// 模拟 Skills 数据
const skills = [
  { id: 'ab-test-setup', name: 'A/B Test Setup', nameZh: 'A/B 测试设置', category: 'Business', description: 'A/B测试和实验设计', installCount: 1234, rating: 4.8, emoji: '🧪' },
  { id: 'ai-news-aggregator', name: 'AI News', nameZh: 'AI 新闻聚合', category: 'AI', description: '聚合AI/LLM/Agent新闻', installCount: 2341, rating: 4.9, emoji: '🤖' },
  { id: 'analytics-tracking', name: 'Analytics', nameZh: '分析追踪', category: 'Business', description: '设置和改进分析追踪', installCount: 987, rating: 4.7, emoji: '📊' },
  { id: 'blogwatcher', name: 'Blog Watcher', nameZh: '博客观察', category: 'Business', description: '监控博客和RSS更新', installCount: 756, rating: 4.5, emoji: '👀' },
  { id: 'competitor-tracker', name: 'Competitor', nameZh: '竞品追踪', category: 'Business', description: '追踪竞争对手动态', installCount: 1567, rating: 4.6, emoji: '🎯' },
  { id: 'content-strategy', name: 'Content Strategy', nameZh: '内容策略', category: 'Business', description: '内容策略规划', installCount: 1823, rating: 4.8, emoji: '✍️' },
  { id: 'copywriting', name: 'Copywriting', nameZh: '文案写作', category: 'Business', description: '营销文案撰写', installCount: 3421, rating: 4.9, emoji: '📝' },
  { id: 'ddg-web-search', name: 'Web Search', nameZh: '网页搜索', category: 'AI', description: 'DuckDuckGo搜索', installCount: 4532, rating: 4.7, emoji: '🔍' },
  { id: 'document-summarizer', name: 'Doc Summarizer', nameZh: '文档摘要', category: 'AI', description: '长文档摘要生成', installCount: 2134, rating: 4.6, emoji: '📄' },
  { id: 'entrepreneurship', name: 'Entrepreneurship', nameZh: '创业指导', category: 'Business', description: '创业和商业指导', installCount: 1678, rating: 4.8, emoji: '🚀' },
  { id: 'firecrawl', name: 'Firecrawl', nameZh: '网页抓取', category: 'AI', description: '网页数据抓取工具', installCount: 3876, rating: 4.9, emoji: '🔥' },
  { id: 'frontend', name: 'Frontend', nameZh: '前端开发', category: 'Development', description: 'Web和移动端UI构建', installCount: 5678, rating: 4.9, emoji: '💻' },
  { id: 'growth', name: 'Growth', nameZh: '增长黑客', category: 'Business', description: '产品增长和PMF', installCount: 2345, rating: 4.7, emoji: '📈' },
  { id: 'hello-world', name: 'Hello World', nameZh: '入门示例', category: 'Development', description: '各种语言的Hello World', installCount: 7890, rating: 5.0, emoji: '🌍' },
  { id: 'html', name: 'HTML Guide', nameZh: 'HTML指南', category: 'Development', description: 'HTML最佳实践', installCount: 3456, rating: 4.6, emoji: '📄' },
  { id: 'marketing-ideas', name: 'Marketing', nameZh: '营销创意', category: 'Business', description: '139种营销策略', installCount: 4567, rating: 4.8, emoji: '💡' },
  { id: 'marketing-psychology', name: 'Psychology', nameZh: '营销心理学', category: 'Business', description: '70+心理模型', installCount: 2987, rating: 4.7, emoji: '🧠' },
  { id: 'mckinsey-consultant', name: 'Consultant', nameZh: '麦肯锡顾问', category: 'Business', description: 'McKinsey风格分析', installCount: 5678, rating: 4.9, emoji: '💼' },
  { id: 'mimeng-writing', name: 'Mimeng', nameZh: '咪蒙写作', category: 'Media', description: '爆款文章写作技巧', installCount: 8765, rating: 4.9, emoji: '✒️' },
  { id: 'product-strategy', name: 'Product Strategy', nameZh: '产品策略', category: 'Business', description: '产品策略和优先级', installCount: 3456, rating: 4.8, emoji: '🎯' },
  { id: 'seo-audit', name: 'SEO Audit', nameZh: 'SEO审计', category: 'Business', description: 'SEO健康检查', installCount: 2345, rating: 4.6, emoji: '🔎' },
  { id: 'user-research', name: 'User Research', nameZh: '用户研究', category: 'Business', description: '用户研究和客户发现', installCount: 1876, rating: 4.7, emoji: '👥' },
  { id: 'weather', name: 'Weather', nameZh: '天气查询', category: 'Lifestyle', description: '天气和天气预报', installCount: 6789, rating: 4.8, emoji: '🌤️' },
  { id: 'web', name: 'Web Dev', nameZh: 'Web开发', category: 'Development', description: '网站构建和部署', installCount: 5432, rating: 4.9, emoji: '🌐' },
  { id: 'website', name: 'Website', nameZh: '网站搭建', category: 'Development', description: '快速建站工具', installCount: 4321, rating: 4.8, emoji: '🏗️' },
];

const categories = ['All', 'AI', 'Business', 'Development', 'Lifestyle', 'Media'];

const categoryLabels: Record<string, Record<string, string>> = {
  All: { en: 'All', zh: '全部' },
  AI: { en: 'AI', zh: 'AI' },
  Business: { en: 'Business', zh: '商业' },
  Development: { en: 'Dev', zh: '开发' },
  Lifestyle: { en: 'Life', zh: '生活' },
  Media: { en: 'Media', zh: '媒体' },
};

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState<'en' | 'zh'>('zh');

  // 检测语言 from URL
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

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* 背景效果 */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00FF00]/10 via-black to-black" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNHoiIGZpbGw9IiMyRjJEMkYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30" />

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-[#00FF00] hover:text-[#00FF00]/80 transition-colors text-sm mb-4">
            <ChevronLeft className="w-4 h-4" />
            <span>返回地球</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF00] to-[#00CC00] flex items-center justify-center">
                <span className="text-xl">🛒</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#00FF00]">
                  Skills Marketplace
                </h1>
                <p className="text-xs text-white/50">AI 技能交易市场</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
            </div>
          </div>
        </div>
      </header>

      {/* 搜索和筛选 */}
      <section className="relative z-10 px-4 md:px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* 分类标签 */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-[#00FF00] text-black'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {categoryLabels[cat]?.[isZh ? 'zh' : 'en'] || cat}
                </button>
              ))}
            </div>

            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder={isZh ? '搜索...' : 'Search...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#00FF00]/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills 网格 */}
      <section className="relative z-10 px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.id}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 hover:border-[#00FF00]/50 transition-all duration-200 hover:transform hover:scale-102 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-3">
                  {/* Emoji 和分类 */}
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{skill.emoji}</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                      skill.category === 'AI' ? 'bg-purple-500/20 text-purple-400' :
                      skill.category === 'Business' ? 'bg-blue-500/20 text-blue-400' :
                      skill.category === 'Development' ? 'bg-green-500/20 text-green-400' :
                      skill.category === 'Media' ? 'bg-pink-500/20 text-pink-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {skill.category}
                    </span>
                  </div>

                  {/* 名称 */}
                  <h3 className="font-bold text-xs text-white mb-0.5 group-hover:text-[#00FF00] transition-colors truncate">
                    {getName(skill)}
                  </h3>

                  {/* 描述 */}
                  <p className="text-[10px] text-white/50 line-clamp-1 mb-2">
                    {skill.description}
                  </p>

                  {/* 统计 */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-[10px] text-white/40">
                      {skill.installCount >= 1000 ? `${(skill.installCount/1000).toFixed(1)}k` : skill.installCount}
                    </span>
                    <span className="text-[10px] text-yellow-400">
                      ★ {skill.rating}
                    </span>
                  </div>

                  {/* 获取按钮 */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-[#00FF00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full py-1.5 bg-[#00FF00] text-black text-[10px] font-bold rounded-lg hover:bg-[#00DD00]">
                      {isZh ? '获取' : 'Get'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/40 text-sm">No skills found</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
