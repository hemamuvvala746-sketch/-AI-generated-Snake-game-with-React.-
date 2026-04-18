import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 5, y: 5 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { x: head.x + direction.x, y: head.y + direction.y };

      // Boundary collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 100);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          if (isGameOver) {
            resetGame();
          } else {
            setIsPaused((p) => !p);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameOver]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 120);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    });
    setIsGameOver(false);
    setIsPaused(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full max-w-[400px] mb-2 px-1">
        <div className="text-[var(--color-cyan-glitch)] font-bold text-xl drop-shadow-[0_0_5px_var(--color-cyan-glitch)]">
          SCORE: {score.toString().padStart(5, '0')}
        </div>
        <div className="text-[var(--color-magenta-glitch)] font-bold text-xl drop-shadow-[0_0_5px_var(--color-magenta-glitch)]">
          STATUS: {isGameOver ? 'CRITICAL_FAIL' : isPaused ? 'IDLE' : 'ACTIVE'}
        </div>
      </div>

      <div className="relative border-2 border-[var(--color-cyan-glitch)] p-1 bg-black/80 shadow-[0_0_20px_var(--color-cyan-glitch)] screen-tear">
        {/* Game Area */}
        <div 
          className="relative cyber-grid" 
          style={{ width: GRID_SIZE * 20, height: GRID_SIZE * 20 }}
        >
          {/* Food */}
          <div
            className="absolute bg-[var(--color-magenta-glitch)] shadow-[0_0_10px_var(--color-magenta-glitch)] animate-pulse"
            style={{
              width: 18,
              height: 18,
              left: food.x * 20 + 1,
              top: food.y * 20 + 1,
            }}
          />

          {/* Snake */}
          {snake.map((segment, idx) => (
            <div
              key={idx}
              className={`absolute ${idx === 0 ? 'bg-white' : 'bg-[var(--color-cyan-glitch)]'}`}
              style={{
                width: 18,
                height: 18,
                left: segment.x * 20 + 1,
                top: segment.y * 20 + 1,
                boxShadow: idx === 0 ? '0 0 10px white' : '0 0 5px var(--color-cyan-glitch)',
              }}
            />
          ))}

          {/* Overlays */}
          {(isGameOver || isPaused) && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
              <div className="text-center w-full flex flex-col items-center">
                <h3 className="text-[3.5rem] md:text-[4.5rem] leading-none mb-6 glitch-text tracking-[0.1em] font-glitch font-normal whitespace-nowrap drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] z-50" data-text={isGameOver ? "SYSTEM_FAILURE" : "SYSTEM_PAUSED"}>
                  {isGameOver ? "SYSTEM_FAILURE" : "SYSTEM_PAUSED"}
                </h3>
                <p className="text-[var(--color-cyan-glitch)] animate-pulse cursor-pointer hover:text-white mt-4 text-xl drop-shadow-[0_0_5px_var(--color-cyan-glitch)]" onClick={isGameOver ? resetGame : () => setIsPaused(false)}>
                  [ PRESS SPACE TO {isGameOver ? 'REBOOT' : 'RESUME'} ]
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
