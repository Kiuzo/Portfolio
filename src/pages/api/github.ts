import type { NextApiRequest, NextApiResponse } from 'next';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language?: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  size: number;
}

interface ApiResponse {
  data?: GitHubRepo[];
  remaining?: number;
  error?: string;
}

const cache = new Map<string, { data: GitHubRepo[]; timestamp: number; remaining: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, limit = '6' } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username é obrigatório' });
  }

  const limitNum = parseInt(limit as string);

  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    return res.status(400).json({ error: 'Limit deve ser entre 1 e 100' });
  }

  const cacheKey = `${username}-${limitNum}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('✅ Cache hit para', username);
    return res.status(200).json({
      data: cached.data,
      remaining: cached.remaining
    });
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      console.error('❌ GITHUB_TOKEN não configurado');
      return res.status(500).json({ error: 'Token do GitHub não configurado' });
    }

    console.log('🚀 Buscando repositórios de', username);

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limitNum}&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'Portfolio-App'
        }
      }
    );

    const remaining = response.headers.get('X-RateLimit-Remaining');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    const remainingNum = remaining ? parseInt(remaining) : null;

    if (remainingNum !== null) {
      console.log(`📊 Requisições restantes: ${remainingNum}`);
    }

    if (!response.ok) {
      if (response.status === 403) {
        const reset = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
        return res.status(403).json({
          error: `Rate limit excedido! Redefine em: ${reset?.toLocaleTimeString() || 'desconhecido'}`
        });
      }
      if (response.status === 401) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      if (response.status === 404) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      return res.status(response.status).json({ error: `Erro ao buscar repositórios: ${response.status}` });
    }

    const repos: GitHubRepo[] = await response.json();
    console.log(`✅ ${repos.length} repositórios encontrados`);

    const filteredRepos = repos
      .filter((repo) => !repo.fork && repo.size > 0)
      .slice(0, limitNum);

    console.log(`✅ ${filteredRepos.length} projetos após filtro`);

    if (remainingNum !== null) {
      cache.set(cacheKey, {
        data: filteredRepos,
        timestamp: Date.now(),
        remaining: remainingNum
      });
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json({
      data: filteredRepos,
      remaining: remainingNum || undefined
    });

  } catch (error) {
    console.error('❌ Erro ao buscar projetos:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
}