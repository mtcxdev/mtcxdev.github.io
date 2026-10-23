import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Code2, ExternalLink, GitBranch, Globe2, Moon, Sun } from 'lucide-react';
import './App.css';
import { PageViews } from './components/PageViews';
const PixelCatchGame = lazy(() => import('./components/PixelCatchGame').then(module => ({ default: module.PixelCatchGame })));

type Contribution = { date: string; count: number; level: number };
type Repo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; updated_at: string };
const USER = 'mtcxdev';
const TECH = [
  { group: 'Languages', items: [['TypeScript','typescript'],['JavaScript','javascript'],['Python','python'],['Solidity','solidity'],['HTML5','html5'],['CSS3','css3'],['SQL','postgresql']] },
  { group: 'Frameworks & runtimes', items: [['React','react'],['Next.js','nextdotjs'],['Vite','vite'],['Node.js','nodedotjs'],['Express','express'],['FastAPI','fastapi'],['Django','django'],['Tailwind CSS','tailwindcss'],['Bun','bun'],['Hono','hono']] },
  { group: 'Libraries & testing', items: [['Three.js','threedotjs'],['Framer Motion','framer'],['Lucide','lucide'],['Axios','axios'],['Zod','zod'],['TanStack Query','reactquery'],['Prisma','prisma'],['Puppeteer','puppeteer'],['Playwright','playwright'],['Vitest','vitest'],['Ethers.js','ethers'],['wagmi','wagmi']] },
  { group: 'Web3 & blockchain', items: [['Hardhat','hardhat'],['OpenZeppelin','openzeppelin'],['Solana','solana'],['viem','viem'],['Privy','privy'],['Base','base'],['WalletConnect','walletconnect']] },
  { group: 'Data & infrastructure', items: [['PostgreSQL','postgresql'],['MongoDB','mongodb'],['Redis','redis'],['Supabase','supabase'],['Cloudflare','cloudflare'],['Docker','docker'],['AWS','amazonaws'],['Vercel','vercel'],['Render','render'],['Nginx','nginx']] },
  { group: 'Product & workflow', items: [['Git','git'],['GitHub Actions','githubactions'],['Figma','figma'],['Linux','linux'],['Sentry','sentry'],['PostHog','posthog'],['Stripe','stripe'],['Brevo','brevo']] },
];

function GithubActivity({ onLoaded }: { onLoaded: () => void }) {
  const [contributions,setContributions] = useState<Contribution[]>([]);
  const [repos,setRepos] = useState<Repo[]>([]);
  const [status,setStatus] = useState<'loading'|'ready'|'error'>('loading');
  useEffect(() => {
    let live = true;
    Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`).then(r=>{if(!r.ok) throw new Error('contributions unavailable'); return r.json()}),
      fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`).then(r=>{if(!r.ok) throw new Error('repositories unavailable'); return r.json()})
    ]).then(([activity,repositoryList])=>{ if(!live)return; setContributions(activity.contributions||[]); setRepos(repositoryList); setStatus('ready'); onLoaded(); }).catch(()=>{if(live){setStatus('error');onLoaded()}});
    return ()=>{live=false};
  },[onLoaded]);
  const visibleContributions = useMemo(() => {
    const days = 365;
    const cutoff = new Date(); cutoff.setHours(0,0,0,0); cutoff.setDate(cutoff.getDate()-days+1);
    return contributions.filter(day => day.date && new Date(`${day.date}T00:00:00`) >= cutoff);
  },[contributions]);
  const weeks = useMemo(()=>{ const all=[...visibleContributions]; if(!all.length)return []; const firstDay=new Date(`${all[0].date}T00:00:00`).getDay(); for(let i=0;i<firstDay;i++)all.unshift({date:'',count:0,level:0}); const pad=(7-(all.length%7))%7; for(let i=0;i<pad;i++) all.push({date:'',count:0,level:0}); const result:Contribution[][]=[]; for(let i=0;i<all.length;i+=7) result.push(all.slice(i,i+7)); return result; },[visibleContributions]);
  const totalContributions = visibleContributions.reduce((sum,day)=>sum+day.count,0);
  return <section className="section github-section" id="github">
    <div className="section-heading"><div><p className="eyebrow">GitHub</p><h2>Building in <em>public.</em></h2></div><a className="text-link" href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">View profile <ArrowUpRight size={16}/></a></div>
    <div className="github-panel"><div className="github-panel-top"><div className="github-identity"><img src={`https://github.com/${USER}.png?size=96`} alt=""/><div><strong>@{USER}</strong><span>{totalContributions.toLocaleString()} contributions</span></div></div><a href={`https://github.com/${USER}?tab=repositories`} target="_blank" rel="noreferrer" aria-label="Browse repositories"><GitBranch size={20}/></a></div>
      {status==='loading' && <div className="loading-state">Loading contributions…</div>}
      {status==='error' && <div className="loading-state">GitHub activity is temporarily unavailable. <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">Open profile ↗</a></div>}
      {status==='ready' && <><div className="contrib-scroll"><div className="contrib-grid" aria-label="GitHub contribution activity for the last year">{weeks.map((week,i)=><div className="contrib-week" key={i}>{week.map((day,j)=><span key={`${i}-${j}`} className={`contrib-day level-${Math.min(4,day.level||0)}`} title={day.date?`${day.count} contributions on ${day.date}`:'No activity'}/>)}</div>)}</div></div><div className="contrib-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i className={`contrib-day level-${n}`} key={n}/>)}<span>More</span></div></>}
    </div>
    <div className="repo-heading"><span className="eyebrow">Public repositories</span><span className="repo-count">{repos.length}</span></div>
    <div className="repo-grid">{repos.map(repo=><a className="repo-card" key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer"><div className="repo-card-title"><GitBranch size={17}/><strong>{repo.name}</strong><ArrowUpRight size={15}/></div>{repo.description&&<p>{repo.description}</p>}<div className="repo-meta">{repo.language&&<span><i className="language-dot"/>{repo.language}</span>}<span><img className="brand-icon tiny-brand-icon" src="https://cdn.simpleicons.org/github" alt="" /> {repo.stargazers_count}</span></div></a>)}</div>
  </section>;
}

function LocalTimeCard() {
  const [now,setNow] = useState(() => new Date());
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer); }, []);
  const viewerZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'your device time';
  const format = (zone: string) => new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(now);
  return <div className="time-card" aria-label="Local times"><span className="time-card-label">TIME ZONES</span><div className="time-row"><span>Your time <small>{viewerZone.replaceAll('_',' ')}</small></span><strong>{format(viewerZone)}</strong></div><div className="time-row"><span>My time <small>Lagos, Nigeria</small></span><strong>{format('Africa/Lagos')}</strong></div></div>;
}


function FavouriteSongPlayer() {
  return <section className="favourite-song" aria-label="Favourite song">
    <div className="favourite-song-top"><span className="eyebrow">ON REPEAT</span><span className="song-live"><i/> PERSONAL ROTATION</span></div>
    <div className="song-player-main">
      <a className="song-vinyl" href="https://www.youtube.com/watch?v=HydkjjDNTmY" target="_blank" rel="noreferrer" aria-label="Listen to Jane! by The Long Faces on Spotify"><span className="vinyl-label"><i>J!</i></span></a>
      <div className="song-copy"><span className="song-track-number">FAVOURITE TRACK · 001</span><h3>Jane!</h3><p>The Long Faces</p><div className="song-waveform" aria-hidden="true">{Array.from({length:28},(_,i)=><i key={i} style={{'--bar':(18+((i*17+11)%28))+'px'} as React.CSSProperties}/>)}</div></div>
    </div>
    <div className="song-player-links"><span><i/> INDIE ROCK · 3:07</span><a href="https://www.youtube.com/watch?v=HydkjjDNTmY" target="_blank" rel="noreferrer">Play full track <ArrowUpRight size={14}/></a></div>
    <iframe className="song-spotify-embed" src="https://www.youtube-nocookie.com/embed/HydkjjDNTmY?rel=0" title="Jane! by The Long Faces — full track on YouTube" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
  </section>;
}

function MiniGame({ onReady }: { onReady: () => void }) {
  return <section className="game-dock" id="play" aria-label="Snake game preview"><div className="game-dock-preview"><Suspense fallback={<div className="game-board loading-state">Loading game…</div>}><PixelCatchGame onReady={onReady} /></Suspense></div></section>;
}

export function App() {
  const [theme,setTheme] = useState<'dark'|'light'>(() => { try { return (localStorage.getItem('mtcx-theme') as 'dark'|'light') || (matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'); } catch { return 'dark'; } });
  const [scrolled,setScrolled] = useState(false);
  const [githubReady,setGithubReady] = useState(false);
  const [gameReady,setGameReady] = useState(false);
  const [minimumTimeElapsed,setMinimumTimeElapsed] = useState(false);
  const [introVisible,setIntroVisible] = useState(true);
  const markGameReady = useCallback(() => setGameReady(true), []);
  const markGithubReady = useCallback(() => setGithubReady(true), []);
  useEffect(()=>{const timer=window.setTimeout(()=>setMinimumTimeElapsed(true),1900);return()=>window.clearTimeout(timer)},[]);
  useEffect(()=>{if(githubReady&&gameReady&&minimumTimeElapsed){const timer=window.setTimeout(()=>setIntroVisible(false),460);return()=>window.clearTimeout(timer)}},[githubReady,gameReady,minimumTimeElapsed]);
  useEffect(()=>{const timer=window.setTimeout(()=>{setGithubReady(true);setGameReady(true)},8000);return()=>window.clearTimeout(timer)},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme; try{localStorage.setItem('mtcx-theme',theme)}catch{}},[theme]);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>32);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
  useEffect(()=>{const nodes=Array.from(document.querySelectorAll<HTMLElement>('.section-heading, .intro-strip, .personal-intro, .personal-detail, .about-note, .payre-showcase, .stack-group, .github-panel, .repo-card, .contact-content'));if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});nodes.forEach((node,index)=>{node.dataset.reveal=index%2===0?'left':'right';observer.observe(node)});return()=>observer.disconnect()},[]);
  return <div className="site-shell">
    {introVisible && <div className={`intro-loader ${githubReady&&gameReady&&minimumTimeElapsed?'is-exiting':''}`} aria-hidden="true"><div className="loader-page"><div className="loader-header"><span className="loader-brand">MTCX<span>.</span></span><span className="loader-header-controls"><i/><i/></span></div><div className="loader-snake-cta"><i/><span>Play Snake <b>↗</b></span><div className="loader-snake"><i/><i/><i/></div></div><section className="loader-hero-real"><div className="loader-hero-copy"><div className="loader-headline-real"><i/><i/><i/></div><div className="loader-description-real"><i/><i/><i/></div><div className="loader-buttons-real"><i/><i/></div><div className="loader-footnotes-real"><i/><i/></div></div><span className="loader-scroll-cue"><i/></span></section><div className="loader-strip-real"><i/><span><i/><i/><i/></span></div><section className="loader-personal-real"><div className="loader-personal-title"><i/><i/><i/></div><div className="loader-personal-content"><div className="loader-song-card"><i/><span><i/><i/><i/></span></div><div className="loader-detail-grid"><i/><i/><i/></div></div></section></div><div className="loader-shimmer" /></div>}
    <div className="ambient-grid" aria-hidden="true"/><header className={`site-header ${scrolled?'is-scrolled':''}`}><a className="brand" href="#top" aria-label="MTCX Dev home"><span className="brand-mark">MTCX<span>.</span></span><span className="brand-name">MTCX <b>DEV</b></span></a><nav className="main-nav" aria-label="Main navigation"><a href="#personal">Personal</a><a href="#about">About</a><a href="#stack">Stack</a><a href="#github">GitHub</a><a href="#contact">Contact</a></nav><div className="header-actions"><span className="availability"><i/> Available for select work</span><button className="theme-toggle" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`}>{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}</button><a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={15}/></a></div></header>
    <MiniGame onReady={markGameReady}/>
    <main id="top"><section className="hero section"><div className="hero-copy"><h1>Ideas into<br/><span className="headline-outline">things that</span><br/><span className="headline-accent">work.</span></h1><p className="hero-description">I design, engineer, and ship thoughtful digital products — from expressive interfaces to the systems powering them.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Start a conversation <ArrowUpRight size={16}/></a><a className="button button-quiet" href="#github">Explore my code <ArrowDownRight size={16}/></a></div><div className="hero-footnote"><span><Code2 size={14}/> Full-stack engineering</span><span><Globe2 size={14}/> Nigeria · Working worldwide</span></div></div><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15}/></a></section>
    <section className="intro-strip"><span className="eyebrow">WHAT I CARE ABOUT</span><p>Good software should feel <em>considered.</em> Clear in its purpose, delightful in its details, and dependable beneath the surface.</p><span className="strip-symbol"><Code2 size={28}/></span></section>
    <section className="section personal-section" id="personal"><div className="personal-intro"><p className="eyebrow">A little about me</p><h2>Timothy<span>.</span></h2><p className="personal-role">Lead Developer <span>at</span> MTCX Media</p><a className="x-profile-card" href="https://x.com/mtcxdev" target="_blank" rel="noreferrer" aria-label="Open MTCX on X"><img className="x-profile-avatar" src="https://unavatar.io/x/mtcxdev" alt="MTCX profile avatar on X" loading="lazy"/><span className="x-profile-copy"><strong>MTCX</strong><span>@mtcxdev</span><small>Developer · Digital builder</small></span><span className="x-profile-action">View profile <ArrowUpRight size={15}/></span></a><FavouriteSongPlayer /></div><div className="personal-details"><LocalTimeCard/><div className="personal-detail"><span>WORK</span><strong>Building digital products</strong><p>Leading development at MTCX Media, from the first idea to the finished product.</p></div><div className="personal-detail"><span>BUSINESS</span><strong>MTCX Media</strong><p>A business registered with Nigeria’s Corporate Affairs Commission (CAC).</p></div><div className="personal-detail"><span>BIRTHDAY</span><strong>10 March</strong><p>A little detail about the person behind the work.</p></div></div></section>
    <section className="section about-section" id="about"><div className="section-heading"><div><p className="eyebrow">About</p><h2>Engineer by craft.<br/><em>Builder by nature.</em></h2></div><p className="section-lead">I work across product design and software engineering to turn ambitious ideas into useful, lasting experiences.</p></div><div className="about-grid"><div className="about-note"><span className="note-number">01</span><h3>Thoughtful by design.</h3><p>Interfaces with intention, systems with a clear shape, and details that make a product feel complete.</p></div><div className="about-note"><span className="note-number">02</span><h3>Practical by default.</h3><p>Performance, accessibility, maintainability, and real user needs are part of the build — not a later pass.</p></div><div className="about-note"><span className="note-number">03</span><h3>Curious at the edges.</h3><p>I enjoy the overlap between frontend craft, backend systems, developer tooling, and playful experiments.</p></div></div></section>
    <section className="section payre-section" id="payre"><div className="section-heading"><div><p className="eyebrow">Featured product</p><h2>One thing worth<br/><em>showing you.</em></h2></div></div><div className="payre-showcase"><div className="payre-screenshot-frame"><img src="/projects/payre-live.png" alt="Screenshot of the Payre payment product" loading="lazy" /></div><div className="payre-preview-bottom"><div><strong>Payre</strong><span>Payments, thoughtfully built.</span></div><a className="text-link" href="https://payre.onrender.com" target="_blank" rel="noreferrer">Visit Payre <ExternalLink size={15}/></a></div></div></section>
    <section className="section stack-section" id="stack"><div className="section-heading"><div><p className="eyebrow">Toolkit</p><h2>The tools behind<br/><em>the work.</em></h2></div><p className="section-lead">A living toolkit, grouped by how I use it — not a wall of badges.</p></div><details className="stack-details"><summary><span>Explore the full toolkit</span><span className="stack-summary-count">{TECH.reduce((count,group)=>count+group.items.length,0)} technologies</span><span className="stack-summary-icon" aria-hidden="true">+</span></summary><div className="stack-groups">{TECH.map((group,i)=><div className="stack-group" key={group.group}><div className="stack-group-label"><span>0{i+1}</span><h3>{group.group}</h3></div><div className="stack-items">{group.items.map(([name,slug],j)=><div className="stack-item" key={`${name}-${j}`}><img loading="lazy" src={`https://cdn.simpleicons.org/${slug}/${theme==='dark'?'E7E7E7':'202020'}`} alt="" onError={e=>{(e.currentTarget as HTMLImageElement).style.visibility='hidden'}}/><span>{name}</span></div>)}</div></div>)}</div></details></section>
    <GithubActivity onLoaded={markGithubReady}/>
    <section className="contact-section" id="contact"><div className="contact-glow"/><div className="contact-content"><p className="eyebrow">Contact</p><h2>Let’s make<br/><em>it real.</em></h2><p>Have a product to build, a tricky problem to solve, or an idea you want to explore? I’m listening.</p><div className="contact-actions"><a className="button button-primary" href="mailto:devmtcx@gmail.com">Email me <ArrowUpRight size={16}/></a><a className="button button-quiet" href={`https://github.com/${USER}`} target="_blank" rel="noreferrer"><img className="brand-icon tiny-brand-icon" src="https://cdn.simpleicons.org/github" alt="" /> GitHub</a></div></div> </section></main>
    <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">MTCX<span>.</span></span><span className="brand-name">MTCX <b>DEV</b></span></a><span><a href="mailto:devmtcx@gmail.com">devmtcx@gmail.com</a></span><div className="footer-links"><a href="https://x.com/mtcxdev" target="_blank" rel="noreferrer" aria-label="X"><img className="brand-icon" src="https://cdn.simpleicons.org/x" alt="" /><span>X</span></a><a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer" aria-label="GitHub"><img className="brand-icon" src="https://cdn.simpleicons.org/github" alt="" /><span>GitHub</span></a><a href="mailto:devmtcx@gmail.com" aria-label="Email"><img className="brand-icon" src="https://cdn.simpleicons.org/gmail" alt="" /><span>Email</span></a><a href="#top">Back to top <ArrowUpRight size={13}/></a></div><span className="footer-year">© {new Date().getFullYear()}</span><PageViews /></footer>
  </div>;
}
export default App;
