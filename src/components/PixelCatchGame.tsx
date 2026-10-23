import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { createPortal } from 'react-dom';

type Point = { x: number; y: number };
type Direction = 'up' | 'down' | 'left' | 'right';
type Mode = 'demo' | 'playing' | 'over';

const BASE_COLS = 26;
const BASE_ROWS = 14;
const CELL_SIZE = 24;
function startSnake(cols: number, rows: number): Point[] {
  const x = Math.max(2, Math.floor(cols / 2));
  const y = Math.max(1, Math.floor(rows / 2));
  return [{ x, y }, { x: x - 1, y }, { x: x - 2, y }];}
const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
};

function same(a: Point, b: Point) { return a.x === b.x && a.y === b.y; }
function randomFood(snake: Point[], cols: number, rows: number): Point {
  const free: Point[] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    if (!snake.some(part => part.x === x && part.y === y)) free.push({ x, y });
  }
  return free[Math.floor(Math.random() * free.length)] || { x: 1, y: 1 };
}

function playGameTone(frequency: number, duration: number) {
  try {
    const AudioContextConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const context = new AudioContextConstructor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square'; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    oscillator.connect(gain); gain.connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + duration);
    oscillator.onended = () => { void context.close(); };
  } catch { /* Audio is optional. */ }
}
function buzz(pattern: number | number[]) {
  try { if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(pattern); } catch { /* Not supported on every browser. */ }
}

export function PixelCatchGame({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef(BASE_COLS);
  const rowsRef = useRef(BASE_ROWS);
  const stateRef = useRef({ mode: 'demo' as Mode, snake: startSnake(BASE_COLS, BASE_ROWS), food: { x: 16, y: 7 },  direction: 'right' as Direction, queued: 'right' as Direction, score: 0, elapsed: 0, lastStep: 0, demoTurn: 0 });
  const [mode, setMode] = useState<Mode>('demo');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [soundOn, setSoundOn] = useState(() => { try { return localStorage.getItem('snake-sound') !== 'off'; } catch { return true; } });
  const [vibrationOn, setVibrationOn] = useState(() => { try { return localStorage.getItem('snake-vibration') !== 'off'; } catch { return true; } });
  const soundRef = useRef(soundOn);
  const vibrationRef = useRef(vibrationOn);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { soundRef.current = soundOn; try { localStorage.setItem('snake-sound', soundOn ? 'on' : 'off'); } catch {} }, [soundOn]);
  useEffect(() => { vibrationRef.current = vibrationOn; try { localStorage.setItem('snake-vibration', vibrationOn ? 'on' : 'off'); } catch {} }, [vibrationOn]);
  useEffect(() => { onReady?.(); }, [onReady]);
  const touchStartRef = useRef<{x:number;y:number}|null>(null);

  const reset = useCallback((nextMode: Mode) => {
    const state = stateRef.current;
    state.mode = nextMode;
    state.snake = startSnake(colsRef.current, rowsRef.current);
    state.food = nextMode === 'demo' ? { x: Math.min(colsRef.current - 3, Math.floor(colsRef.current * .62)), y: Math.floor(rowsRef.current / 2) } : randomFood(state.snake, colsRef.current, rowsRef.current);
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
      const cols = Math.max(12, Math.floor(width / CELL_SIZE));
      const rows = Math.max(8, Math.floor(height / CELL_SIZE));
      if (cols !== colsRef.current || rows !== rowsRef.current) {
        colsRef.current = cols; rowsRef.current = rows;
        const state = stateRef.current;
        state.snake = startSnake(cols, rows);
        state.food = state.mode === 'demo' ? { x: Math.min(cols - 3, Math.floor(cols * .62)), y: Math.floor(rows / 2) } : randomFood(state.snake, cols, rows);
        state.direction = 'right'; state.queued = 'right';
      }
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
          const cols = colsRef.current, rows = rowsRef.current;
          const horizontal = Math.max(4, cols - 4), vertical = Math.max(3, rows - 4);
          const cycle = Math.floor(state.elapsed / 7) % (horizontal * 2 + vertical * 2);
          if (cycle < horizontal) state.queued = 'right';
          else if (cycle < horizontal + vertical) state.queued = 'down';
          else if (cycle < horizontal * 2 + vertical) state.queued = 'left';
          else state.queued = 'up';
          if (cycle === 0) { state.snake = startSnake(cols, rows); state.direction = 'right'; }
        }
      }
      state.direction = state.queued;
      const vector = VECTORS[state.direction];
      const head = state.snake[0];
      let next = { x: head.x + vector.x, y: head.y + vector.y };

      if (state.mode === 'demo') {
        if (next.x < 1 || next.x >= colsRef.current - 1 || next.y < 1 || next.y >= rowsRef.current - 1) {
          state.direction = state.direction === 'right' ? 'down' : state.direction === 'down' ? 'left' : state.direction === 'left' ? 'up' : 'right';
          state.queued = state.direction;
          const v = VECTORS[state.direction];
          next = { x: head.x + v.x, y: head.y + v.y };
        }
        if (state.snake.some(part => same(part, next))) {
          state.snake = startSnake(colsRef.current, rowsRef.current);
          state.direction = 'right';
          state.queued = 'right';
          next = { x: 8, y: 7 };
        }
      } else {
        const hitWall = next.x < 0 || next.x >= colsRef.current || next.y < 0 || next.y >= rowsRef.current;
        const body = state.snake.slice(0, same(next, state.food) ? undefined : -1);
        if (hitWall || body.some(part => same(part, next))) {
          state.mode = 'over';
          setMode('over');
          if (soundRef.current) playGameTone(150, .22);
          if (vibrationRef.current) buzz([45,35,70]);
          return;
        }
      }

      state.snake.unshift(next);
      if (same(next, state.food)) {
        if (state.mode === 'playing') {
          if (soundRef.current) playGameTone(660, .09);
          if (vibrationRef.current) buzz(24);
          state.score += 10;
          setScore(state.score);
          setBest(value => Math.max(value, state.score));
        }
        state.food = randomFood(state.snake, colsRef.current, rowsRef.current);
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
        const speed = Math.max(100, 175 - state.score * 0.35);
        while (accumulator >= speed && state.mode === 'playing') {
          step();
          accumulator -= speed;
        }
      } else if (state.mode === 'demo') {
        if (!lastTime) lastTime = time;
        accumulator += Math.min(time - lastTime, 80);
        lastTime = time;
        while (accumulator >= 220) {
          step();
          accumulator -= 220;
        }
      } else {
        lastTime = time;
      }

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const cellW = width / cols;
      const cellH = height / rows;
      const cell = Math.min(cellW, cellH);
      const offsetX = 0;
      const offsetY = 0;
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue('--game-snake').trim() || styles.getPropertyValue('--accent').trim() || '#8df0b2';
      const text = styles.getPropertyValue('--text').trim() || '#e8eee9';
      const line = styles.getPropertyValue('--game-grid').trim() || styles.getPropertyValue('--line').trim() || '#29332d';
      const muted = styles.getPropertyValue('--muted').trim() || '#8a958d';
      const boardBg = styles.getPropertyValue('--game-bg').trim() || '#0a100c';
      const wall = styles.getPropertyValue('--game-wall').trim() || accent;
      context.clearRect(0, 0, width, height);
      context.fillStyle = boardBg;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = line;
      context.lineWidth = Math.max(1, Math.min(cellW, cellH) * .035);
      context.globalAlpha = .85;
      context.beginPath();
      for (let x = 1; x < cols; x++) { context.moveTo(x * cellW, 0); context.lineTo(x * cellW, height); }
      for (let y = 1; y < rows; y++) { context.moveTo(0, y * cellH); context.lineTo(width, y * cellH); }
      context.stroke();
      context.globalAlpha = 1;
      // Visible perimeter matches the actual collision boundary.
      context.strokeStyle = wall;
      context.lineWidth = Math.max(2, Math.min(cellW, cellH) * .12);
      context.strokeRect(context.lineWidth / 2, context.lineWidth / 2, width - context.lineWidth, height - context.lineWidth);

      // Apple-style pixel food.
      const fx = offsetX + state.food.x * cellW;
      const fy = offsetY + state.food.y * cellH;
      context.fillStyle = '#ff7b72';
      context.fillRect(fx + cellW * .18, fy + cellH * .24, cellW * .64, cellH * .62);
      context.fillRect(fx + cellW * .32, fy + cellH * .12, cellW * .36, cellH * .76);
      context.fillStyle = accent;
      context.fillRect(fx + cellW * .52, fy + cellH * .04, cellW * .23, cellH * .16);

      state.snake.forEach((part, index) => {
        const insetX = Math.max(1, cellW * .09);
        const insetY = Math.max(1, cellH * .09);
        const x = offsetX + part.x * cellW + insetX;
        const y = offsetY + part.y * cellH + insetY;
        const sizeW = cellW - insetX * 2;
        const sizeH = cellH - insetY * 2;
        context.globalAlpha = index === 0 ? 1 : Math.max(.42, .92 - index * .035);
        context.fillStyle = accent;
        context.fillRect(x, y, sizeW, sizeH);
        if (index === 0) {
          context.fillStyle = styles.getPropertyValue('--game-eye').trim() || '#102019';
          const eye = Math.max(1.5, cell * .11);
          if (state.direction === 'left' || state.direction === 'right') {
            const eyeX = state.direction === 'right' ? x + sizeW * .67 : x + sizeW * .2;
            context.fillRect(eyeX, y + sizeH * .22, eye, eye);
            context.fillRect(eyeX, y + sizeH * .65, eye, eye);
          } else {
            const eyeY = state.direction === 'down' ? y + sizeH * .67 : y + sizeH * .2;
            context.fillRect(x + sizeW * .22, eyeY, eye, eye);
            context.fillRect(x + sizeW * .65, eyeY, eye, eye);
          }
        }
      });
      context.globalAlpha = 1;

      if (state.mode === 'demo') {
      }
      if (state.mode === 'over') {
        context.fillStyle = styles.getPropertyValue('--game-overlay').trim() || 'rgba(5, 12, 8, .68)';
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
    if (isOpen) requestAnimationFrame(() => boardRef.current?.focus());
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
    <div className="game-footer snake-footer"><span>{mode === 'playing' ? 'EAT · GROW · DON’T CRASH' : mode === 'over' ? 'RUN ENDED · TRY AGAIN' : 'CLASSIC SNAKE'}</span><span>SCORE <b>{String(score).padStart(3, '0')}</b></span><span>BEST <b>{String(best).padStart(3, '0')}</b></span><button type="button" className="game-setting" aria-pressed={soundOn} onClick={() => setSoundOn(value => !value)}>{soundOn ? 'Sound on' : 'Sound off'}</button><button type="button" className="game-setting" aria-pressed={vibrationOn} onClick={() => setVibrationOn(value => !value)}>{vibrationOn ? 'Vibration on' : 'Vibration off'}</button><button type="button" onClick={startGame}>{mode === 'playing' ? 'Restart' : 'Play'} <ArrowUpRight size={12}/></button></div>
  </div>;
  return isOpen ? createPortal(gameMarkup, document.body) : gameMarkup;
}
