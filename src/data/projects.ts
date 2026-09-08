export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  year: string;
  headline: string;
  description: string;
  technologies: string[];
  features: string[];
  featuredImage: string;
  gallery: { src: string; caption: string }[];
  layout: 'large-horizontal' | 'offset' | 'vertical' | 'wide' | 'split';
}

export const PROJECTS: Project[] = [
  {
    id: 'payre',
    number: '01',
    name: 'Payre',
    category: 'Web3 & FinTech / Payment Gateway',
    year: '2026',
    headline: 'Direct-to-Wallet Multi-Chain Settlement Infrastructure',
    description:
      'A high-performance, non-custodial cryptocurrency payment gateway developed for PAYRE INFRA LTD. Allows digital merchants to accept stablecoins (USDC, USDT) across Base, Solana, Polygon, and Ethereum with zero escrow lockup, sub-second settlement, and an official Model Context Protocol (MCP) server for autonomous AI assistants.',
    technologies: [
      'Next.js 16',
      'TypeScript',
      'Node.js',
      'Solidity',
      'PostgreSQL',
      'Tailwind CSS',
      'Model Context Protocol (MCP)'
    ],
    features: [
      'Zero-escrow instant merchant settlement',
      'CREATE2 deterministic deposit proxy contracts',
      'Multi-chain coverage (Base L2, Solana, Polygon, Arbitrum)',
      'Official Model Context Protocol (MCP) server integration',
      'Direct-to-wallet non-custodial checkout widget'
    ],
    featuredImage: '/projects/payre/payre-home.png',
    gallery: [
      {
        src: '/projects/payre/payre-home.png',
        caption: 'Payre Platform Landing - Direct settlement, zero chargebacks, sub-second finality'
      },
      {
        src: '/projects/payre/payre-login.png',
        caption: 'Merchant Portal Authentication - Minimalist high-trust access control'
      },
      {
        src: '/projects/payre/payre-mobile.png',
        caption: 'Mobile Viewport - Responsive merchant experience'
      }
    ],
    layout: 'large-horizontal'
  },
  {
    id: 'danella',
    number: '02',
    name: 'Dan&Ella Importations',
    category: 'Luxury E-Commerce / Store Manager PWA',
    year: '2026',
    headline: 'Curated Luxury Fashion Boutique & Real-Time WhatsApp Commerce',
    description:
      'A boutique fashion and Italian leather goods e-commerce platform built for Dan&Ella Importations. Features transparent pricing, a seamless direct WhatsApp ordering funnel, and a standalone progressive web application (PWA) Store Manager admin portal for live inventory management, product duplication, and order fulfillment.',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Supabase',
      'Tailwind CSS v4',
      'Lucide React',
      'Sharp'
    ],
    features: [
      'High-conversion direct WhatsApp ordering funnel',
      'Standalone Store Manager PWA with offline support',
      'Instant product catalog and SKU duplication pipeline',
      'Editorial luxury design with bespoke typography hierarchy',
      'Optimized image pipeline with Next.js Turbopack and Sharp'
    ],
    featuredImage: '/projects/danella/danella-hero.png',
    gallery: [
      {
        src: '/projects/danella/danella-hero.png',
        caption: 'Dan&Ella Boutique Storefront - Curated Italian leather bags & elevated apparel'
      },
      {
        src: '/projects/danella/danella-collection.png',
        caption: 'Dan&Ella /shop Catalogue - Full product matrix with category filtering & pricing'
      },
      {
        src: '/projects/danella/danella-products.png',
        caption: 'Store Manager PWA (/store-manager) - Telemetry overview, inventory toggles & live management'
      }
    ],
    layout: 'vertical'
  },
  {
    id: 'mt-flights',
    number: '03',
    name: 'MT Flights',
    category: 'Travel Tech / Algorithmic Booking Engine',
    year: '2026',
    headline: 'Real-Time Flight Search & Hybrid Crypto-Fiat Wallet',
    description:
      'A robust airline flight search and automated ticketing application combining live Google Flights normalization via SerpApi, deterministic CREATE2 EVM deposit sessions, deterministic settlement ledgers, and an automated Puppeteer headless PDF e-ticketing pipeline with instant Telegram operations alerts.',
    technologies: [
      'Node.js',
      'Express',
      'TypeScript',
      'PostgreSQL',
      'Ethers.js',
      'Puppeteer'
    ],
    features: [
      'Live Flights normalization & route discovery',
      'Deterministic stablecoin deposit sessions',
      'Automated headless PDF ticket rendering & storage',
      'Real-time Telegram operational notifications bot',
      'Idempotent wallet ledger with row-locked database transactions'
    ],
    featuredImage: '/projects/mt-flights/flights-home.png',
    gallery: [
      {
        src: '/projects/mt-flights/flights-home.png',
        caption: 'MT Flights Home - Search hundreds of routes with zero booking fees'
      },
      {
        src: '/projects/mt-flights/flights-mobile.png',
        caption: 'Mobile Interface - Streamlined search and flight booking on mobile'
      },
      {
        src: '/projects/mt-flights/flights-preview-1.png',
        caption: 'Search Matrix - Multi-airline price comparison and departure schedule'
      }
    ],
    layout: 'offset'
  },
  {
    id: 'mt-flex',
    number: '04',
    name: 'MtFlex',
    category: 'Telecom Infrastructure / Utility Billing',
    year: '2026',
    headline: 'Automated Multi-Network Airtime & Data Dispensing Portal',
    description:
      'An automated telecommunications utility platform providing instant data bundles, airtime refills, electricity tokens, and education pins across cellular networks. Built with Next.js 15, PostgreSQL, Drizzle ORM, and automated webhook transaction reconciliation.',
    technologies: [
      'Next.js 15',
      'TypeScript',
      'PostgreSQL',
      'Drizzle ORM',
      'shadcn/ui',
      'Tailwind CSS v4'
    ],
    features: [
      'Automated carrier API dispensing with sub-5s fulfillment',
      'HMAC webhook payment verification and ledger reconciliation',
      'Drizzle ORM transactional schema migrations',
      'Admin telemetry for carrier float balances and error rates',
      'Responsive design with light/dark architectural tokens'
    ],
    featuredImage: '/projects/mt-flex/mtflex-hero.png',
    gallery: [
      {
        src: '/projects/mt-flex/mtflex-hero.png',
        caption: 'MtFlex Portal - Instant delivery across MTN, Airtel, Glo, and 9mobile'
      },
      {
        src: '/projects/mt-flex/mtflex-dashboard.png',
        caption: 'Auth & Wallet Dashboard - Clean sign-in and user management'
      },
      {
        src: '/projects/mt-flex/mtflex-mobile.png',
        caption: 'Mobile Responsive Layout - Frictionless phone top-up experience'
      }
    ],
    layout: 'wide'
  },
  {
    id: 'mtcx-tools',
    number: '05',
    name: 'MTCX Tools',
    category: 'Digital Storefront / Frictionless Delivery',
    year: '2026',
    headline: 'High-Velocity Digital Asset & Utility Marketplace',
    description:
      'A high-volume digital storefront facilitating instant delivery of verified social accounts, virtual phone numbers, airtime refills, and digital tools. Built on a client-side React 18 and Vite 6 architecture with Framer Motion, WebGL visual elements, and high-concurrency order dispatching.',
    technologies: [
      'React 18',
      'Vite 6',
      'TypeScript',
      'Framer Motion',
      'Django REST Framework',
      'Tailwind CSS'
    ],
    features: [
      'Sub-100ms client-side route transitions and prerendered sitemaps',
      'Interactive WebGL canvas visual elements and Framer Motion micro-interactions',
      'Automated digital asset delivery engine',
      'High-concurrency order dispatching with strict security constraints'
    ],
    featuredImage: '/projects/mtcx-tools/store-hero.png',
    gallery: [
      {
        src: '/projects/mtcx-tools/store-hero.png',
        caption: 'MTCX Tools Storefront - Your Digital Life, Fully Unlocked'
      },
      {
        src: '/projects/mtcx-tools/store-catalog.png',
        caption: 'Catalogue Matrix - Verified credentials, virtual phone rentals & social boosts'
      },
      {
        src: '/projects/mtcx-tools/store-mobile.png',
        caption: 'Mobile Storefront - Fast on-the-go browsing and order placement'
      },
      {
        src: '/projects/mtcx-tools/store-desktop.png',
        caption: 'Interface Detail - Instant checkout & delivery telemetry'
      }
    ],
    layout: 'split'
  }
];

export const SERVICES = [
  {
    number: '01',
    title: 'Web Design & Engineering',
    tagline: 'Architectural web experiences engineered for real-world conversion and speed.',
    deliverables: ['Custom Design Systems', 'Next.js & Vite SPAs', 'Performance Tuning (<1s LCP)', 'Zero-Template Craft'],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript']
  },
  {
    number: '02',
    title: 'Web Applications & SaaS',
    tagline: 'Scalable digital products designed around users, workflows, and business goals.',
    deliverables: ['Full-Stack Platforms', 'Role-Based Dashboards', 'Multi-Tenant Databases', 'Real-Time Sync'],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Drizzle ORM', 'Supabase']
  },
  {
    number: '03',
    title: 'FinTech & Web3 Infrastructure',
    tagline: 'Direct-to-wallet payment gateways, smart contracts, and settlement engines.',
    deliverables: ['EVM CREATE2 Smart Proxies', 'Stablecoin Settlements', 'Non-Custodial Protocols', 'Autonomous MCP Servers'],
    technologies: ['Solidity', 'Ethers.js', 'Solana Web3.js', 'Model Context Protocol (MCP)']
  },
  {
    number: '04',
    title: 'E-Commerce & Custom Stores',
    tagline: 'High-performance commerce experiences designed to make buying effortless.',
    deliverables: ['Custom Boutique Storefronts', 'Direct WhatsApp Pipelines', 'Admin Inventory PWAs', 'Idempotent Ledgers'],
    technologies: ['Next.js App Router', 'Supabase', 'Tailwind CSS', 'PWA']
  },
  {
    number: '05',
    title: 'API & Backend Systems',
    tagline: 'Robust serverless microservices, webhooks, and headless rendering pipelines.',
    deliverables: ['High-Throughput APIs', 'Headless PDF Generation', 'HMAC Webhook Queues', 'Operational Alert Bots'],
    technologies: ['Express', 'Node.js', 'Puppeteer', 'TypeScript']
  },
  {
    number: '06',
    title: 'Interactive & Creative Development',
    tagline: 'Lightweight interactive experiences that give digital products another dimension.',
    deliverables: ['Pure CSS 3D Transforms', 'Micro-Interactions', 'Audio & Motion Design', 'Accessible Animation'],
    technologies: ['CSS 3D Engine', 'Framer Motion', 'Canvas / WebGL', 'A11y Standards']
  }
];

export const PROCESS_STEPS = [
  {
    number: '01',
    phase: 'DISCOVER',
    title: 'Deconstruct the Idea',
    description: 'We analyze the core problem, target audience, business model, and technical constraints to establish a clear architectural blueprint before writing a single line of code.'
  },
  {
    number: '02',
    phase: 'DESIGN',
    title: 'Shape the Visual System',
    description: 'We craft an unapologetically distinctive, functional visual identity-curating typography, interaction choreography, layout density, and design tokens.'
  },
  {
    number: '03',
    phase: 'ENGINEER',
    title: 'Build with Modern Foundations',
    description: 'We build the experience using production-hardened stacks: clean TypeScript, resilient database schemas, deterministic smart contracts, and accessible components.'
  },
  {
    number: '04',
    phase: 'LAUNCH',
    title: 'Optimize, Harden & Ship',
    description: 'We rigorously test across viewports, conduct performance profiling, audit accessibility (WCAG AA), set up operational alerts, and ship to production.'
  }
];

export const TECH_STACK = [
  { name: 'TypeScript', category: 'Language', note: 'Strict end-to-end type safety' },
  { name: 'Python', category: 'Language', note: 'Django REST & backend services' },
  { name: 'Solidity', category: 'Language', note: 'EVM smart contracts & proxies' },
  { name: 'SQL', category: 'Language', note: 'Relational schemas & ACID queries' },
  { name: 'Next.js', category: 'Framework', note: 'App Router, Turbopack & SSR' },
  { name: 'React', category: 'Framework', note: 'React 19 & 18 component model' },
  { name: 'Node.js', category: 'Runtime', note: 'V8 server runtime & concurrency' },
  { name: 'Express', category: 'Framework', note: 'High-throughput microservice APIs' },
  { name: 'Django REST', category: 'Framework', note: 'Python backend API services' },
  { name: 'PostgreSQL', category: 'Database', note: 'Relational ACID persistence' },
  { name: 'Supabase', category: 'Backend SDK', note: 'Auth, storage & cloud DB' },
  { name: 'Drizzle ORM', category: 'Package', note: 'Zero-overhead SQL migrations' },
  { name: 'Tailwind CSS', category: 'Package', note: 'Utility token design systems' },
  { name: 'Framer Motion', category: 'Package', note: 'Spring motion & layout transitions' },
  { name: 'Puppeteer', category: 'Package', note: 'Headless Chrome & PDF rendering' },
  { name: 'Ethers.js', category: 'Package', note: 'EVM blockchain RPC & contracts' },
  { name: 'Sharp', category: 'Package', note: 'High-performance image pipelines' },
  { name: 'MCP SDK', category: 'Package', note: 'Model Context Protocol servers' },
  { name: 'shadcn/ui', category: 'Package', note: 'Radix primitive UI components' },
  { name: 'Vite', category: 'Tooling', note: 'Next-gen bundler & fast HMR' }
];
