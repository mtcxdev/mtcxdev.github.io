import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { createPortal } from 'react-dom';

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
type Mode = 'demo' | 'playing' | 'over';

const COLS = 26;
const ROWS = 14;
const START: Point[] = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
};

function same(a: Point, b: Point) { return a.x === b.x && a.y === b.y; }
function randomFood(snake: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) {
    if (!snake.some(part => part.x === x && part.y === y)) free.push({ x, y });
  }
  return free[Math.floor(Math.random() * free.length)] || { x: 1, y: 1 };
}

export function PixelCatchGame({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ mode: 'demo' as Mode, snake: START.map(p => ({ ...p })), food: { x: 16, y: 7 }, direction: 'right' as Direction, queued: 'right' as Direction, score: 0, elapsed: 0, lastStep: 0, demoTurn: 0 });
  const [mode, setMode] = useState<Mode>('demo');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { onReady?.(); }, [onReady]);
  const touchStartRef = useRef<{x:number;y:number}|null>(null);

  const reset = useCallback((nextMode: Mode) => {
    const state = stateRef.current;
    state.mode = nextMode;
    state.snake = START.map(p => ({ ...p }));
    state.food = nextMode === 'demo' ? { x: 16, y: 7 } : randomFood(state.snake);
    state.direction = 'right';
    state.queued = 'right';
    state.score = 0;
    state.elapsed = 0;
    state.lastStep = 0;
    state.demoTurn = 0;
    setScore(0);
    setMode(nextMode);
    if (nextMode === 'playing') requestAnimationFrame(() => boardRef.current?.focus());
  }, []);

  const changeDirection = useCallback((direction: Direction) => {
    const state = stateRef.current;
    if (state.mode !== 'playing') return;
    const current = state.queued;
    const opposite = (a: Direction, b: Direction) =>
      (a === 'up' && b === 'down') || (a === 'down' && b === 'up') ||
      (a === 'left' && b === 'right') || (a === 'right' && b === 'left');
    if (!opposite(current, direction)) state.queued = direction;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const board = boardRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !board || !context) return;
    let frame = 0;
    let lastTime = 0;
    let accumulator = 0;
    let width = 1;
    let height = 1;
    const resize = () => {
      const rect = board.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(board);
    resize();

    const step = () => {
      const state = stateRef.current;
      if (state.mode === 'demo') {
        // A gentle loop makes the classic game legible before anyone presses Play.
        state.elapsed += 1;
        if (state.elapsed % 7 === 0) {
          const cycle = Math.floor(state.elapsed / 7) % 44;
          if (cycle < 12) state.queued = 'right';
          else if (cycle < 15) state.queued = 'down';
          else if (cycle < 27) state.queued = 'left';
          else if (cycle < 30) state.queued = 'up';
          else state.queued = 'right';
          if (cycle === 0) {
            state.snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
            state.direction = 'right';
          }
        }
      }
      state.direction = state.queued;
      const vector = VECTORS[state.direction];
      const head = state.snake[0];
      let next = { x: head.x + vector.x, y: head.y + vector.y };

      if (state.mode === 'demo') {
        if (next.x < 1 || next.x >= COLS - 1 || next.y < 1 || next.y >= ROWS - 1) {
          state.direction = state.direction === 'right' ? 'down' : state.direction === 'down' ? 'left' : state.direction === 'left' ? 'up' : 'right';
          state.queued = state.direction;
          const v = VECTORS[state.direction];
          next = { x: head.x + v.x, y: head.y + v.y };
        }
        if (state.snake.some(part => same(part, next))) {
          state.snake = START.map(p => ({ ...p }));
          state.direction = 'right';
          state.queued = 'right';
          next = { x: 8, y: 7 };
        }
      } else {
        const hitWall = next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS;
        const body = state.snake.slice(0, same(next, state.food) ? undefined : -1);
        if (hitWall || body.some(part => same(part, next))) {
          state.mode = 'over';
          setMode('over');
          return;
        }
      }

      state.snake.unshift(next);
      if (same(next, state.food)) {
        if (state.mode === 'playing') {
          state.score += 10;
          setScore(state.score);
          setBest(value => Math.max(value, state.score));
        }
        state.food = randomFood(state.snake);
      } else {
        state.snake.pop();
      }
    };

    const draw = (time: number) => {
      const state = stateRef.current;
      if (state.mode === 'playing') {
        if (!lastTime) lastTime = time;
        accumulator += Math.min(time - lastTime, 80);
        lastTime = time;
        const speed = Math.max(76, 145 - state.score * 0.45);
        while (accumulator >= speed && state.mode === 'playing') {
          step();
          accumulator -= speed;
        }
      } else if (state.mode === 'demo') {
        if (!lastTime) lastTime = time;
        accumulator += Math.min(time - lastTime, 80);
        lastTime = time;
        while (accumulator >= 190) {
          step();
          accumulator -= 190;
        }
      } else {
        lastTime = time;
      }

      const cell = Math.min(width / COLS, height / ROWS);
      const offsetX = (width - cell * COLS) / 2;
      const offsetY = (height - cell * ROWS) / 2;
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue('--accent').trim() || '#8df0b2';
      const text = styles.getPropertyValue('--text').trim() || '#e8eee9';
      const line = styles.getPropertyValue('--line').trim() || '#29332d';
      const muted = styles.getPropertyValue('--muted').trim() || '#8a958d';
      context.clearRect(0, 0, width, height);

      context.fillStyle = line;
      context.globalAlpha = 0.48;
      for (let x = 0; x <= COLS; x++) {
        context.fillRect(offsetX + x * cell, offsetY, Math.max(.5, cell * .025), cell * ROWS);
      }
      for (let y = 0; y <= ROWS; y++) {
        context.fillRect(offsetX, offsetY + y * cell, cell * COLS, Math.max(.5, cell * .025));
      }
      context.globalAlpha = 1;

      // Apple-style pixel food.
      const fx = offsetX + state.food.x * cell;
      const fy = offsetY + state.food.y * cell;
      context.fillStyle = '#ff7b72';
      context.fillRect(fx + cell * .18, fy + cell * .24, cell * .64, cell * .62);
      context.fillRect(fx + cell * .32, fy + cell * .12, cell * .36, cell * .76);
      context.fillStyle = accent;
      context.fillRect(fx + cell * .52, fy + cell * .04, cell * .23, cell * .16);

      state.snake.forEach((part, index) => {
        const inset = Math.max(1, cell * .09);
        const x = offsetX + part.x * cell + inset;
        const y = offsetY + part.y * cell + inset;
        const size = cell - inset * 2;
        context.globalAlpha = index === 0 ? 1 : Math.max(.42, .92 - index * .035);
        context.fillStyle = accent;
        context.fillRect(x, y, size, size);
        if (index === 0) {
          context.fillStyle = '#102019';
          const eye = Math.max(1.5, cell * .11);
          if (state.direction === 'left' || state.direction === 'right') {
            const eyeX = state.direction === 'right' ? x + size * .67 : x + size * .2;
            context.fillRect(eyeX, y + size * .22, eye, eye);
            context.fillRect(eyeX, y + size * .65, eye, eye);
          } else {
            const eyeY = state.direction === 'down' ? y + size * .67 : y + size * .2;
            context.fillRect(x + size * .22, eyeY, eye, eye);
            context.fillRect(x + size * .65, eyeY, eye, eye);
          }
        }
      });
      context.globalAlpha = 1;

      if (state.mode === 'demo') {
        context.fillStyle = text;
        context.globalAlpha = .72;
        context.font = `600 10px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.textAlign = 'left';
        context.fillText('SNAKE', 12, 18);
        context.globalAlpha = 1;
      }
      if (state.mode === 'over') {
        context.fillStyle = 'rgba(5, 12, 8, .68)';
        context.fillRect(0, 0, width, height);
        context.fillStyle = text;
        context.textAlign = 'center';
        context.font = `600 22px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillText('GAME OVER', width / 2, height / 2 - 4);
        context.fillStyle = muted;
        context.font = `11px ui-monospace, SFMono-Regular, Menlo, monospace`;
        context.fillText('Restart for another run', width / 2, height / 2 + 18);
      }
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsOpen(false); reset('demo'); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, reset]);

  const startGame = () => { setIsOpen(true); reset('playing'); };
  const closeGame = () => { setIsOpen(false); reset('demo'); };
  const handleSwipeStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleSwipeEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 22) return;
    changeDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  };

  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, Direction> = {
      ArrowUp: 'up', w: 'up', W: 'up',
      ArrowDown: 'down', s: 'down', S: 'down',
      ArrowLeft: 'left', a: 'left', A: 'left',
      ArrowRight: 'right', d: 'right', D: 'right',
    };
    if (keys[event.key]) {
      event.preventDefault();
      if (stateRef.current.mode !== 'playing') reset('playing');
      else changeDirection(keys[event.key]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      reset('playing');
    }
  };

  const gameMarkup = <div className={`snake-game ${isOpen ? 'snake-game-open' : ''}`}>
    {isOpen && <div className="snake-modal-top"><span><b>Snake</b><small>ARROW KEYS · WASD · SWIPE</small></span><button type="button" aria-label="Exit game" onClick={closeGame}><span>×</span> Exit</button></div>}
    <div className={`game-board snake-board mode-${mode}`} ref={boardRef} tabIndex={0} role="application" aria-label="Snake game. Use arrow keys or WASD to move, or swipe to change direction." onKeyDown={handleKey} onTouchStart={handleSwipeStart} onTouchEnd={handleSwipeEnd}>
      <canvas ref={canvasRef} aria-hidden="true" />
      {mode !== 'playing' && <button className="snake-start-button" type="button" onClick={startGame}>{mode === 'over' ? 'Play again' : 'Play Snake'} <span aria-hidden="true">↗</span></button>}
    </div>
    <div className="game-footer snake-footer"><span>{mode === 'playing' ? 'EAT · GROW · DON’T CRASH' : mode === 'over' ? 'RUN ENDED · TRY AGAIN' : 'CLASSIC SNAKE'}</span><span>SCORE <b>{String(score).padStart(3, '0')}</b></span><span>BEST <b>{String(best).padStart(3, '0')}</b></span><button type="button" onClick={startGame}>{mode === 'playing' ? 'Restart' : 'Play'} <ArrowUpRight size={12}/></button></div>
  </div>;
  return isOpen ? createPortal(gameMarkup, document.body) : gameMarkup;
}
