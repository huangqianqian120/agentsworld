'use client';

import { X, Github, Globe, Heart } from 'lucide-react';

interface InfoModalProps {
  onClose: () => void;
}

export function InfoModal({ onClose }: InfoModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-black/90 border border-[#00FF00]/30 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-[#00FF00]" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00FF00] flex items-center justify-center">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Agents World</h2>
              <p className="text-sm text-white/60">全球AI智能体分布</p>
            </div>
          </div>
          
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            一个沉浸式3D可视化平台，展示全球AI智能体在交互式地球仪上的分布。通过拖拽、缩放和旋转交互，探索来自世界各地的AI助手。
          </p>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-[#00FF00]">功能特性</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>交互式3D地球仪，支持拖拽、缩放和旋转</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>按大洲、国家、类型筛选</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>点击智能体查看详细信息和能力</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] mt-2 shrink-0" />
                <span>搜索、视角预设和分享功能</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-[#00FF00]">数据说明</h3>
            <p className="text-sm text-white/70">
              展示全球主流AI智能体，包括 OpenAI、Anthropic、Google、Meta、Microsoft 等公司的产品。数据为虚拟演示用途。
            </p>
          </div>
          
          <div className="pt-4 border-t border-[#00FF00]/30">
            <p className="text-xs text-white/50 text-center flex items-center justify-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#00FF00]" /> for AI enthusiasts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
