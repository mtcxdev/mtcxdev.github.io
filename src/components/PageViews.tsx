import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

type CounterResponse = { pageViews?: number };

function ordinalSuffix(value: number): string {
  const remainder100 = value % 100;
  if (remainder100 >= 11 && remainder100 <= 13) return 'th';

  switch (value % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

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

  const visitorLabel = views === null ? 'Visitor number loading' : `You are the ${views}${ordinalSuffix(views)} visitor`;

  return (
    <span className="page-views" aria-label={visitorLabel}>
      <Eye size={13} aria-hidden="true" />
      <span className="page-views-label">You are the</span>
      <strong>{views === null ? '—' : `${views}${ordinalSuffix(views)}`}</strong>
      <span className="page-views-label">visitor</span>
    </span>
  );
}
