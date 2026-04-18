/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './SnakeGame';
import MusicPlayer from './MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 font-mono relative">
      <div className="scanlines"></div>
      
      <header className="mb-8 text-center z-10 w-full max-w-4xl">
        <h1 
          className="text-4xl md:text-6xl mb-2 glitch-text tracking-widest uppercase text-white" 
          data-text="GLITCH.SNAKE_OS"
        >
          GLITCH.SNAKE_OS
        </h1>
        <p className="border-b border-[#00ffff] pb-2 text-[#00ffff] inline-block tracking-widest text-sm md:text-base opacity-80 uppercase">
          Neural-Audio Kinetic Interface // v1.0.4
        </p>
      </header>

      <main className="z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12">
        <div className="w-full max-w-[420px]">
          <SnakeGame />
        </div>
        
        <div className="w-full max-w-[420px] flex flex-col gap-8">
          <MusicPlayer />
          
          <div className="border border-[#ff00ff] p-4 bg-black/40 text-sm xl:text-base text-gray-300 shadow-[0_0_10px_rgba(255,0,255,0.2)]">
            <h4 className="text-[#ff00ff] font-bold mb-2 uppercase border-b border-[#ff00ff]/30 pb-1">{">>"} Instructions</h4>
            <ul className="space-y-1 opacity-80">
              <li>{">"} Use [W][A][S][D] or [ARROWS] to re-route serpent.</li>
              <li>{">"} Consume data packets (Magenta Nodes) to increase score.</li>
              <li>{">"} [SPACE] to pause/reboot system.</li>
              <li>{">"} Avoid sector boundaries and self-intersection.</li>
            </ul>
          </div>
        </div>
      </main>
      
      <div className="fixed bottom-4 left-4 text-xs text-[#00ffff]/50 z-0">
        SYS.STATE: NOMINAL_ERROR<br/>
        UPTIME: UNKNOWN
      </div>
    </div>
  );
}
