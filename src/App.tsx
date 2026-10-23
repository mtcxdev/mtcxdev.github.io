import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Code2, ExternalLink, GitBranch, Globe2, Moon, Sun } from 'lucide-react';
import './App.css';
import { PageViews } from './components/PageViews';
const PixelScene = lazy(() => import('./components/PixelScene').then(module => ({ default: module.PixelScene })));
const PixelCatchGame = lazy(() => import('./components/PixelCatchGame').then(module => ({ default: module.PixelCatchGame })));

type Contribution = { date: string; count: number; level: number };
type Repo = { name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; updated_at: string };
const USER = 'mtcxdev';
const TECH = [
  { group: 'Languages', items: [['TypeScript','typescript'],['JavaScript','javascript'],['Python','python'],['Solidity','solidity'],['HTML5','html5'],['CSS3','css3']] },
  { group: 'Frameworks & runtimes', items: [['React','react'],['Next.js','nextdotjs'],['Vite','vite'],['Node.js','nodedotjs'],['Express','express'],['Tailwind CSS','tailwindcss']] },
  { group: 'Libraries & packages', items: [['Framer Motion','framer'],['Lucide','lucide'],['Axios','axios'],['Zod','zod'],['Puppeteer','puppeteer'],['Ethers.js','ethers']] },
  { group: 'Web3 & blockchain', items: [['Hardhat','hardhat'],['Solana web3.js','solana'],['viem','viem'],['Privy','privy']] },
  { group: 'Data & infrastructure', items: [['PostgreSQL','postgresql'],['Redis','redis'],['Cloudflare','cloudflare'],['Supabase','supabase']] },
  { group: 'Software & workflow', items: [['Git','git'],['GitHub Actions','githubactions'],['Figma','figma'],['Linux','linux']] },
];

function GithubActivity() {
  const [contributions,setContributions] = useState<Contribution[]>([]);
  const [repos,setRepos] = useState<Repo[]>([]);
  const [status,setStatus] = useState<'loading'|'ready'|'error'>('loading');
  const [timeframe,setTimeframe] = useState<'3m'|'6m'|'1y'>('1y');
  useEffect(() => {
    let live = true;
    Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`).then(r=>{if(!r.ok) throw new Error('contributions unavailable'); return r.json()}),
      fetch(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=4`).then(r=>{if(!r.ok) throw new Error('repositories unavailable'); return r.json()})
    ]).then(([activity,repositoryList])=>{ if(!live)return; setContributions(activity.contributions||[]); setRepos(repositoryList); setStatus('ready'); }).catch(()=>{if(live)setStatus('error')});
    return ()=>{live=false};
  },[]);
  const visibleContributions = useMemo(() => {
    const days = timeframe==='3m' ? 92 : timeframe==='6m' ? 183 : 365;
    const cutoff = new Date(); cutoff.setHours(0,0,0,0); cutoff.setDate(cutoff.getDate()-days+1);
    return contributions.filter(day => day.date && new Date(`${day.date}T00:00:00`) >= cutoff);
  },[contributions,timeframe]);
  const weeks = useMemo(()=>{ const all=[...visibleContributions]; if(!all.length)return []; const firstDay=new Date(`${all[0].date}T00:00:00`).getDay(); for(let i=0;i<firstDay;i++)all.unshift({date:'',count:0,level:0}); const pad=(7-(all.length%7))%7; for(let i=0;i<pad;i++) all.push({date:'',count:0,level:0}); const result:Contribution[][]=[]; for(let i=0;i<all.length;i+=7) result.push(all.slice(i,i+7)); return result; },[visibleContributions]);
  const totalContributions = visibleContributions.reduce((sum,day)=>sum+day.count,0);
  return <section className="section github-section" id="github">
    <div className="section-heading"><div><p className="eyebrow">GitHub</p><h2>Building in <em>public.</em></h2></div><a className="text-link" href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">View profile <ArrowUpRight size={16}/></a></div>
    <div className="github-panel"><div className="github-panel-top"><div className="github-identity"><img src={`https://github.com/${USER}.png?size=96`} alt=""/><div><strong>@{USER}</strong><span>{totalContributions.toLocaleString()} contributions</span></div></div><a href={`https://github.com/${USER}?tab=repositories`} target="_blank" rel="noreferrer" aria-label="Browse repositories"><GitBranch size={20}/></a></div>
      <div className="contrib-timeframes" role="group" aria-label="Contribution timeframe">{([{value:'3m',label:'3 months'},{value:'6m',label:'6 months'},{value:'1y',label:'1 year'}] as const).map(option=><button key={option.value} type="button" className={timeframe===option.value?'is-active':''} aria-pressed={timeframe===option.value} onClick={()=>setTimeframe(option.value)}>{option.label}</button>)}</div>
      {status==='loading' && <div className="loading-state">Loading contributions…</div>}
      {status==='error' && <div className="loading-state">GitHub activity is temporarily unavailable. <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">Open profile ↗</a></div>}
      {status==='ready' && <><div className="contrib-scroll"><div className="contrib-grid" aria-label={`GitHub contribution activity for the last ${timeframe==='1y'?'year':timeframe==='6m'?'six months':'three months'}`}>{weeks.map((week,i)=><div className="contrib-week" key={i}>{week.map((day,j)=><span key={`${i}-${j}`} className={`contrib-day level-${Math.min(4,day.level||0)}`} title={day.date?`${day.count} contributions on ${day.date}`:'No activity'}/>)}</div>)}</div></div><div className="contrib-legend"><span>Less</span>{[0,1,2,3,4].map(n=><i className={`contrib-day level-${n}`} key={n}/>)}<span>More</span></div><p className="contrib-note">Commits made as “MTCX DEV” count when their commit email is linked to this GitHub account. The author name alone does not control attribution. <a href="https://github.com/settings/emails" target="_blank" rel="noreferrer">Check email settings</a>.</p></>}
    </div>
    <div className="repo-heading"><span className="eyebrow">Repositories</span></div>
    <div className="repo-grid">{repos.map(repo=><a className="repo-card" key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer"><div className="repo-card-title"><GitBranch size={17}/><strong>{repo.name}</strong><ArrowUpRight size={15}/></div>{repo.description&&<p>{repo.description}</p>}<div className="repo-meta">{repo.language&&<span><i className="language-dot"/>{repo.language}</span>}<span>★ {repo.stargazers_count}</span></div></a>)}</div>
  </section>;
}

function MiniGame() {
  return <div className="game-card"><div className="game-head"><div><h3>Snake</h3></div></div><p className="muted">The classic, stripped back to its essentials. Eat, grow, and try not to run into yourself.</p><Suspense fallback={<div className="game-board loading-state">Preparing the scene…</div>}><PixelCatchGame /></Suspense></div>;
}

export function App() {
  const [theme,setTheme] = useState<'dark'|'light'>(() => { try { return (localStorage.getItem('mtcx-theme') as 'dark'|'light') || (matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'); } catch { return 'dark'; } });
  useEffect(()=>{document.documentElement.dataset.theme=theme; try{localStorage.setItem('mtcx-theme',theme)}catch{}},[theme]);
  return <div className="site-shell">
    <div className="ambient-grid" aria-hidden="true"/><header className="site-header"><a className="brand" href="#top" aria-label="MTCX Dev home"><span className="brand-mark">M<span>.</span></span><span className="brand-name">MTCX <b>DEV</b></span></a><nav className="main-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#stack">Stack</a><a href="#github">GitHub</a><a href="#contact">Contact</a></nav><div className="header-actions"><span className="availability"><i/> Available for select work</span><button className="theme-toggle" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`}>{theme==='dark'?<Sun size={17}/>:<Moon size={17}/>}</button><a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={15}/></a></div></header>
    <main id="top"><section className="hero section"><div className="hero-copy"><div className="hero-kicker"><span className="status-pip"/> FULL-STACK DEVELOPER  </div><h1>Ideas into<br/><span className="headline-outline">things that</span><br/><span className="headline-accent">work.</span></h1><p className="hero-description">I design, engineer, and ship thoughtful digital products — from expressive interfaces to the systems powering them.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Start a conversation <ArrowUpRight size={16}/></a><a className="button button-quiet" href="#github">Explore my code <ArrowDownRight size={16}/></a></div><div className="hero-footnote"><span><Code2 size={14}/> Full-stack engineering</span><span><Globe2 size={14}/> Nigeria · Working worldwide</span></div></div><div className="hero-art"><Suspense fallback={<div className="pixel-scene" aria-hidden="true" />}><PixelScene/></Suspense></div><a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15}/></a></section>
    <section className="intro-strip"><span className="eyebrow">WHAT I CARE ABOUT</span><p>Good software should feel <em>considered.</em> Clear in its purpose, delightful in its details, and dependable beneath the surface.</p><span className="strip-symbol">✳</span></section>
    <section className="section about-section" id="about"><div className="section-heading"><div><p className="eyebrow">About</p><h2>Engineer by craft.<br/><em>Builder by nature.</em></h2></div><p className="section-lead">I work across product design and software engineering to turn ambitious ideas into useful, lasting experiences.</p></div><div className="about-grid"><div className="about-note"><span className="note-number">01</span><h3>Thoughtful by design.</h3><p>Interfaces with intention, systems with a clear shape, and details that make a product feel complete.</p></div><div className="about-note"><span className="note-number">02</span><h3>Practical by default.</h3><p>Performance, accessibility, maintainability, and real user needs are part of the build — not a later pass.</p></div><div className="about-note"><span className="note-number">03</span><h3>Curious at the edges.</h3><p>I enjoy the overlap between frontend craft, backend systems, developer tooling, and playful experiments.</p></div></div></section>
    <section className="section payre-section" id="payre"><div className="section-heading"><div><p className="eyebrow">Featured product</p><h2>One thing worth<br/><em>showing you.</em></h2></div></div><a className="payre-preview" href="https://payre.onrender.com" target="_blank" rel="noreferrer" aria-label="Visit Payre website"><div className="payre-preview-top"><span className="payre-logo">payre<span>.</span></span><span className="payre-preview-status">Payre</span><span className="preview-dots"><i/><i/><i/></span></div><div className="payre-screenshot-frame"><img src="/projects/payre-live.png" alt="Screenshot of the live Payre website" loading="lazy" /></div><div className="payre-preview-bottom"><span>Payre</span><span>Open Payre <ArrowUpRight size={14}/></span></div></a><div className="payre-caption"><p>A product-led payment experience. Explore Payre on its own website — no project catalogue, no case-study detour.</p><a className="text-link" href="https://payre.onrender.com" target="_blank" rel="noreferrer">Visit Payre <ExternalLink size={15}/></a></div></section>
    <section className="section stack-section" id="stack"><div className="section-heading"><div><p className="eyebrow">Toolkit</p><h2>The tools behind<br/><em>the work.</em></h2></div><p className="section-lead">A living toolkit, grouped by how I use it — not a wall of badges.</p></div><div className="stack-groups">{TECH.map((group,i)=><div className="stack-group" key={group.group}><div className="stack-group-label"><span>0{i+1}</span><h3>{group.group}</h3></div><div className="stack-items">{group.items.map(([name,slug],j)=><div className="stack-item" key={`${name}-${j}`}><img loading="lazy" src={`https://cdn.simpleicons.org/${slug}/${theme==='dark'?'E7E7E7':'202020'}`} alt="" onError={e=>{(e.currentTarget as HTMLImageElement).style.visibility='hidden'}}/><span>{name}</span></div>)}</div></div>)}</div></section>
    <GithubActivity/>
    <section className="section play-section" id="play"><div className="section-heading"><div><p className="eyebrow">Play</p><h2>Serious about craft.<br/><em>Not always serious.</em></h2></div><p className="section-lead">A small interactive corner for the curious. Because the web can be useful and playful.</p></div><MiniGame/></section>
    <section className="contact-section" id="contact"><div className="contact-glow"/><div className="contact-content"><p className="eyebrow">Contact</p><h2>Let’s make<br/><em>it real.</em></h2><p>Have a product to build, a tricky problem to solve, or an idea you want to explore? I’m listening.</p><div className="contact-actions"><a className="button button-primary" href="mailto:devmtcx@gmail.com">Email me <ArrowUpRight size={16}/></a><a className="button button-quiet" href="https://x.com/mtcxdev" target="_blank" rel="noreferrer">Follow on X <ArrowUpRight size={16}/></a><a className="button button-quiet" href={`https://github.com/${USER}`} target="_blank" rel="noreferrer"><GitBranch size={16}/> GitHub</a></div></div> </section></main>
    <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">M<span>.</span></span><span className="brand-name">MTCX <b>DEV</b></span></a><span><a href="mailto:devmtcx@gmail.com">devmtcx@gmail.com</a></span><div><a href="https://x.com/mtcxdev" target="_blank" rel="noreferrer">X <ArrowUpRight size={13}/></a><a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a><a href="#top">Back to top ↑</a></div><span className="footer-year">© {new Date().getFullYear()}</span><PageViews /></footer>
  </div>;
}
export default App;
