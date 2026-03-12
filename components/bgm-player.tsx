'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface BGMPlayerProps {
  src?: string;
}

export function BGMPlayer({ src }: BGMPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && src) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // Auto-play blocked by browser
      });
    }
  }, [src]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 p-3 bg-black/80 border border-[#00FF00]/30 rounded-full hover:bg-[#00FF00]/10 transition-colors"
        title={isMuted ? 'Play' : 'Pause'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-[#00FF00]" />
        ) : (
          <Volume2 className="w-5 h-5 text-[#00FF00]" />
        )}
      </button>
    </>
  );
}
