import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Disc3 } from 'lucide-react';

const TRACKS = [
  { id: 1, title: 'SYS_OVERRIDE.mp3', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'NEURAL_LINK_ESTABLISHED.wav', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 3, title: 'GHOST_IN_THE_MACHINE.flac', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  const currentTrack = TRACKS[currentTrackIndex];

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    const nextIndex = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrackIndex]);

  return (
    <div className="w-full max-w-md mx-auto border-2 border-[var(--color-magenta-glitch)] bg-black/60 backdrop-blur p-4 mt-8 shadow-[0_0_15px_var(--color-magenta-glitch)]">
      <div className="flex items-center justify-between mb-4 border-b border-[var(--color-cyan-glitch)] pb-2">
        <h2 className="text-xl glitch-text" data-text="AUDIO_SYS_v2.0">AUDIO_SYS_v2.0</h2>
        <Disc3 className={`text-[var(--color-cyan-glitch)] ${isPlaying ? 'animate-spin' : ''}`} />
      </div>
      
      <div className="text-sm mb-4 truncate text-[var(--color-cyan-glitch)]">
        {">"} PLAYING: <span className="animate-pulse">{currentTrack.title}</span>
      </div>

      <div className="flex items-center justify-center gap-6 my-2">
        <button 
          onClick={handlePrev}
          className="text-[var(--color-cyan-glitch)] drop-shadow-[0_0_8px_var(--color-cyan-glitch)] hover:text-[var(--color-magenta-glitch)] hover:drop-shadow-[0_0_12px_var(--color-magenta-glitch)] transition-all active:scale-95"
        >
          <SkipBack size={32} />
        </button>
        <button 
          onClick={handlePlayPause}
          className="w-14 h-14 flex items-center justify-center border-2 border-[var(--color-cyan-glitch)] shadow-[0_0_10px_var(--color-cyan-glitch),inset_0_0_10px_var(--color-cyan-glitch)] text-[var(--color-cyan-glitch)] drop-shadow-[0_0_5px_var(--color-cyan-glitch)] rounded-none hover:bg-[var(--color-magenta-glitch)] hover:border-[var(--color-magenta-glitch)] hover:text-white hover:shadow-[0_0_20px_var(--color-magenta-glitch)] transition-all active:scale-95"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <button 
          onClick={handleSkip}
          className="text-[var(--color-cyan-glitch)] drop-shadow-[0_0_8px_var(--color-cyan-glitch)] hover:text-[var(--color-magenta-glitch)] hover:drop-shadow-[0_0_12px_var(--color-magenta-glitch)] transition-all active:scale-95"
        >
          <SkipForward size={32} />
        </button>
      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.src} 
        onEnded={handleSkip} 
        className="hidden" 
      />
    </div>
  );
}
