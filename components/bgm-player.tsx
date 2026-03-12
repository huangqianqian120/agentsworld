'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BGMPlayerProps {
  src?: string;
}

export function BGMPlayer({ src }: BGMPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play when component mounts
    if (audioRef.current && src) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Auto-play blocked:', error);
      });
    }
  }, [src]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="p-2 bg-black/80 border border-[#00FF00]/30 rounded-full hover:bg-[#00FF00]/10 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-[#00FF00]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#00FF00]" />
          )}
        </button>
        <button
          onClick={togglePlay}
          className="px-3 py-2 bg-black/80 border border-[#00FF00]/30 text-[#00FF00] text-sm rounded-full hover:bg-[#00FF00]/10 transition-colors"
        >
          {isPlaying ? 'Playing' : 'Play BGM'}
        </button>
      </div>
    </>
  );
}
