export interface Env {
  PAGE_VIEWS: KVNamespace;
  ALLOWED_ORIGINS?: string;
}

const KEY = 'portfolio:page-views';
const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
  const headers: Record<string, string> = { 'Vary': 'Origin', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Accept' };
  if (allowed.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...JSON_HEADERS, ...cors } });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!['GET', 'POST'].includes(request.method)) return json({ error: 'Method not allowed' }, 405, cors);
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
    if (origin && !allowed.includes(origin)) return json({ error: 'Origin not allowed' }, 403, cors);

    try {
      const stored = await env.PAGE_VIEWS.get(KEY);
      const record = stored ? JSON.parse(stored) as { pageViews?: unknown; updatedAt?: unknown } : {};
      const current = typeof record.pageViews === 'number' && Number.isSafeInteger(record.pageViews) && record.pageViews >= 0 ? record.pageViews : 0;
      const pageViews = request.method === 'POST' ? current + 1 : current;
      const updatedAt = request.method === 'POST' ? new Date().toISOString() : (typeof record.updatedAt === 'string' ? record.updatedAt : null);
      if (request.method === 'POST') await env.PAGE_VIEWS.put(KEY, JSON.stringify({ pageViews, updatedAt }));
      return json({ pageViews, updatedAt }, 200, cors);
    } catch {
      return json({ error: 'Counter temporarily unavailable' }, 503, cors);
    }
  }
};
