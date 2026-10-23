import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

type CounterResponse = { pageViews?: number };

/** A deliberately minimal, page-view-only public counter. */
export function PageViews() {
  const [views, setViews] = useState<number | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_PAGEVIEWS_API_URL as string | undefined;
    if (!endpoint) { setAvailable(false); return; }
    const controller = new AbortController();
    fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Counter unavailable'); return response.json() as Promise<CounterResponse>; })
      .then(data => { if (typeof data.pageViews === 'number' && Number.isFinite(data.pageViews)) setViews(data.pageViews); else setAvailable(false); })
      .catch(error => { if (!(error instanceof Error && error.name === 'AbortError')) setAvailable(false); });
    return () => controller.abort();
  }, []);

  if (!available) return null;
  return <span className="page-views" aria-label={views === null ? 'Page views loading' : `${views.toLocaleString()} page views`}><Eye size={13} aria-hidden="true"/><span className="page-views-label">VIEWS</span><strong>{views === null ? '—' : views.toLocaleString()}</strong></span>;
}
