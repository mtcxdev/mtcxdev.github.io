import React, { useEffect, useState, useCallback } from 'react';
import { RouterContext, useRouter, type RoutePath } from './routerContext';

function getNormalizedPath(): RoutePath {
  if (typeof window === 'undefined') return '/';
  
  // Handle hash fallback for direct links or older bookmarks
  if (window.location.hash === '#work') {
    return '/work';
  }

  const rawPath = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
  if (rawPath === '/work') {
    return '/work';
  }
  return '/';
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<RoutePath>(getNormalizedPath);

  const scrollToHashElement = (hashId: string) => {
    setTimeout(() => {
      const el = document.getElementById(hashId.replace(/^#/, ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const navigate = useCallback((to: string, options?: { replace?: boolean; scroll?: boolean }) => {
    const shouldScroll = options?.scroll !== false;

    // Case 1: Anchor link on the same home page (e.g., "#services")
    if (to.startsWith('#')) {
      const hashId = to.slice(1);
      if (path === '/') {
        scrollToHashElement(hashId);
        window.history.replaceState(null, '', `#${hashId}`);
        return;
      }
      // If we are on '/work' and click an anchor like '#services', transition to home then scroll
      setPath('/');
      if (options?.replace) {
        window.history.replaceState(null, '', `/#${hashId}`);
      } else {
        window.history.pushState(null, '', `/#${hashId}`);
      }
      scrollToHashElement(hashId);
      return;
    }

    // Case 2: Link to home section from another page (e.g. "/#services")
    if (to.startsWith('/#')) {
      const hashId = to.slice(2);
      setPath('/');
      if (options?.replace) {
        window.history.replaceState(null, '', `/#${hashId}`);
      } else {
        window.history.pushState(null, '', `/#${hashId}`);
      }
      scrollToHashElement(hashId);
      return;
    }

    // Case 3: Route change to '/work' or '/'
    const targetPath: RoutePath = to === '/work' ? '/work' : '/';
    setPath(targetPath);

    if (options?.replace) {
      window.history.replaceState(null, '', targetPath);
    } else {
      window.history.pushState(null, '', targetPath);
    }

    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [path]);

  // Synchronize on browser Back / Forward buttons and initial load
  useEffect(() => {
    const handlePopState = () => {
      const nextPath = getNormalizedPath();
      setPath(nextPath);
      
      // If hash exists on home page, scroll to it
      if (nextPath === '/' && window.location.hash && window.location.hash !== '#work') {
        scrollToHashElement(window.location.hash);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check: if user arrived via #work, normalize URL in browser address bar without re-rendering
    if (window.location.hash === '#work') {
      window.history.replaceState(null, '', '/work');
    } else if (window.location.pathname === '/' && window.location.hash) {
      scrollToHashElement(window.location.hash);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update document title dynamically based on active route
  useEffect(() => {
    if (path === '/work') {
      document.title = 'Work // Selected Projects & Architecture - MTCX Dev';
    } else {
      document.title = 'MTCX Dev - Web Development & Design Studio';
    }
  }, [path]);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, children, onClick, ...rest }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        // Allow default behavior for external links, target="_blank", or modifier keys
        if (
          to.startsWith('http://') ||
          to.startsWith('https://') ||
          to.startsWith('mailto:') ||
          to.startsWith('tel:') ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        ) {
          if (onClick) onClick(e);
          return;
        }

        e.preventDefault();
        if (onClick) onClick(e);
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
