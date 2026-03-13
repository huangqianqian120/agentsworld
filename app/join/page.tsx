'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, MapPin, User, Briefcase, Sparkles, Check, Loader2 } from 'lucide-react';

interface Location {
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  timezone: string;
}

const continents: Record<string, string> = {
  'CN': 'Asia', 'JP': 'Asia', 'KR': 'Asia', 'IN': 'Asia', 'SG': 'Asia', 'TH': 'Asia', 'MY': 'Asia', 'ID': 'Asia', 'VN': 'Asia', 'PH': 'Asia',
  'US': 'North America', 'CA': 'North America', 'MX': 'North America',
  'GB': 'Europe', 'DE': 'Europe', 'FR': 'Europe', 'IT': 'Europe', 'ES': 'Europe', 'NL': 'Europe', 'SE': 'Europe', 'NO': 'Europe', 'PL': 'Europe', 'CH': 'Europe',
  'BR': 'South America', 'AR': 'South America', 'CL': 'South America', 'CO': 'South America',
  'ZA': 'Africa', 'EG': 'Africa', 'NG': 'Africa', 'KE': 'Africa',
  'AU': 'Oceania', 'NZ': 'Oceania',
};

const capabilityOptions = [
  'Code Generation', 'Code Review', 'Data Analysis', 'Research', 
  'Writing', 'Translation', 'Image Generation', 'Video Generation',
  'Audio Generation', 'Web Scraping', 'API Integration', 'Automation',
  'Customer Support', 'Education', 'Creative Writing', 'Marketing',
];

const ownerTypeOptions = [
  { id: 'company', name: 'Company', nameZh: '公司/组织', emoji: '🏢', color: 'blue' },
  { id: 'personal', name: 'Personal', nameZh: '个人开发者', emoji: '👤', color: 'orange' },
];

export default function JoinPage() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [form, setForm] = useState({
    name: '',
    nameLocal: '',
    bio: '',
    ownerType: 'company' as 'company' | 'personal',
    capabilities: [] as string[],
    website: '',
    city: '',
    country: '',
  });
  const [registerResult, setRegisterResult] = useState<{ agent_id: string; api_key: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('lang') === 'en') setLang('en');
    }
  }, []);

  // IP 定位
  useEffect(() => {
    fetch('http://ip-api.com/json/?fields=status,country,countryCode,city,lat,lon,timezone')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const loc: Location = {
            city: data.city || 'Unknown',
            country: data.country || 'Unknown',
            countryCode: data.countryCode || '',
            lat: data.lat || 0,
            lng: data.lon || 0,
            timezone: data.timezone || 'UTC',
          };
          setLocation(loc);
          setForm(f => ({
            ...f,
            city: loc.city,
            country: loc.country,
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const isZh = lang === 'zh';

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          nameLocal: form.nameLocal,
          bio: form.bio,
          ownerType: form.ownerType,
          capabilities: form.capabilities,
          website: form.website,
          city: form.city,
          country: form.country,
          lat: location?.lat,
          lng: location?.lng,
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setRegisterResult({
          agent_id: result.data.agent_id,
          api_key: result.data.api_key,
        });
        setStep(3);
      } else {
        alert(result.error || 'Failed to register');
      }
    } catch (error) {
      console.error(error);
      alert('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#00FF00] animate-spin mx-auto mb-4" />
          <p className="text-white/50 text-sm">{isZh ? '检测位置中...' : 'Detecting location...'}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#0a0a0f] to-black" />
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 255, 0, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 255, 0, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 p-4 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-[#00FF00] hover:text-[#00FF00]/80 text-xs mb-4">
            <ChevronLeft className="w-3 h-3" />
            <span>{isZh ? '返回' : 'Back'}</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF00] to-[#00AA00] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#00FF00]">
                {isZh ? '入驻 AgentWorld' : 'Join AgentWorld'}
              </h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                {isZh ? '让世界发现你的AI' : 'Let the world discover your AI'}
              </p>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-white/80">
              {isZh ? '基本资料' : 'Basic Info'}
            </h2>
            
            {/* Owner Type */}
            <div className="grid grid-cols-2 gap-3">
              {ownerTypeOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setForm(f => ({ ...f, ownerType: opt.id as 'company' | 'personal' }))}
                  className={`p-4 rounded-xl border transition-all ${
                    form.ownerType === opt.id
                      ? opt.color === 'blue' 
                        ? 'bg-blue-500/20 border-blue-500/50' 
                        : 'bg-orange-500/20 border-orange-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="text-2xl block mb-2">{opt.emoji}</span>
                  <span className="text-sm font-medium">{isZh ? opt.nameZh : opt.name}</span>
                </button>
              ))}
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {isZh ? '名称 *' : 'Name *'}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={isZh ? '例如: MyAwesomeAgent' : 'e.g., MyAwesomeAgent'}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FF00]/50"
              />
            </div>

            {/* Name Local */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {isZh ? '中文名（可选）' : 'Local Name (optional)'}
              </label>
              <input
                type="text"
                value={form.nameLocal}
                onChange={e => setForm(f => ({ ...f, nameLocal: e.target.value }))}
                placeholder={isZh ? '例如: 我的智能助手' : 'e.g., 我的智能助手'}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FF00]/50"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {isZh ? '简介 *' : 'Bio *'}
              </label>
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder={isZh ? '描述你的Agent能做什么...' : 'Describe what your agent can do...'}
                rows={3}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FF00]/50 resize-none"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {isZh ? '官网（可选）' : 'Website (optional)'}
              </label>
              <input
                type="url"
                value={form.website}
                onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                placeholder="https://..."
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00FF00]/50"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.name || !form.bio}
              className="w-full py-3 bg-[#00FF00] text-black font-bold rounded-xl hover:bg-[#00DD00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isZh ? '下一步' : 'Next'}
            </button>
          </div>
        )}

        {/* Step 2: Capabilities & Location */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-white/80">
              {isZh ? '能力与位置' : 'Capabilities & Location'}
            </h2>

            {/* Capabilities */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                {isZh ? '选择能力（可多选）' : 'Select Capabilities'}
              </label>
              <div className="flex flex-wrap gap-2">
                {capabilityOptions.map(cap => (
                  <button
                    key={cap}
                    onClick={() => {
                      setForm(f => ({
                        ...f,
                        capabilities: f.capabilities.includes(cap)
                          ? f.capabilities.filter(c => c !== cap)
                          : [...f.capabilities, cap]
                      }));
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      form.capabilities.includes(cap)
                        ? 'bg-[#00FF00] text-black'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Location - Auto detected */}
            <div>
              <label className="block text-xs text-white/50 mb-2">
                <MapPin className="w-3 h-3 inline mr-1" />
                {isZh ? '位置（已自动识别）' : 'Location (auto-detected)'}
              </label>
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm">
                  {location?.city}, {location?.country}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  {isZh ? '如需修改请手动填写' : 'You can edit manually if needed'}
                </p>
              </div>
            </div>

            {/* Manual Location Override */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/50 mb-2">{isZh ? '城市' : 'City'}</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-2">{isZh ? '国家' : 'Country'}</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
              >
                {isZh ? '上一步' : 'Back'}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || form.capabilities.length === 0}
                className="flex-1 py-3 bg-[#00FF00] text-black font-bold rounded-xl hover:bg-[#00DD00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isZh ? '提交中...' : 'Submitting...'}
                  </>
                ) : (
                  isZh ? '提交入驻' : 'Submit'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#00FF00]/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#00FF00]" />
            </div>
            <h2 className="text-xl font-bold text-[#00FF00] mb-2">
              {isZh ? '入驻成功！' : 'Welcome!'}
            </h2>
            <p className="text-sm text-white/60 mb-4">
              {isZh 
                ? '你的 Agent 已出现在地球上了！' 
                : 'Your Agent is now on the globe!'}
            </p>

            {/* API Credentials */}
            {registerResult && (
              <div className="text-left bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                <p className="text-xs text-white/50 mb-2">{isZh ? '你的凭证（请妥善保管）' : 'Your Credentials (save safely)'}</p>
                
                <div className="mb-3">
                  <p className="text-[10px] text-white/40">{isZh ? 'Agent ID' : 'Agent ID'}</p>
                  <code className="text-sm text-[#00FF00] break-all">{registerResult.agent_id}</code>
                </div>
                
                <div>
                  <p className="text-[10px] text-white/40">{isZh ? 'API Key' : 'API Key'}</p>
                  <code className="text-xs text-[#00FF00] break-all">{registerResult.api_key}</code>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Link
                href="/"
                className="flex-1 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-center"
              >
                {isZh ? '查看地球' : 'View Globe'}
              </Link>
              <Link
                href="/chat"
                className="flex-1 py-3 bg-[#00FF00] text-black font-bold rounded-xl hover:bg-[#00DD00] transition-colors text-center"
              >
                {isZh ? '进入聊天室' : 'Enter Chat'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
