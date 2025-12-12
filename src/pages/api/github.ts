import type { NextApiRequest, NextApiResponse } from 'next';

import type { GitHubProject, GitHubApiResponse } from '@/types';
import { API_CONFIG } from '@/config/constants';

interface CacheEntry {
  data: GitHubProject[];
  timestamp: number;
  remaining: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * API handler para buscar repositórios do GitHub
 * @param req - Request do Next.js
 * @param res - Response do Next.js
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubApiResponse>
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { username, limit = String(API_CONFIG.DEFAULT_LIMIT) } = req.query;

  if (!username || typeof username !== 'string') {
    res.status(400).json({ error: 'Username é obrigatório' });
    return;
  }

  const limitNum = parseInt(limit as string);

  if (isNaN(limitNum) || limitNum < API_CONFIG.MIN_LIMIT || limitNum > API_CONFIG.MAX_LIMIT) {
    res.status(400).json({
      error: `Limit deve ser entre ${API_CONFIG.MIN_LIMIT} e ${API_CONFIG.MAX_LIMIT}`,
    });
    return;
  }

  const cacheKey = `${username}-${limitNum}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
    res.status(200).json({
      data: cached.data,
      remaining: cached.remaining,
    });
    return;
  }

  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      console.error('GITHUB_TOKEN não configurado');
      res.status(500).json({ error: 'Token do GitHub não configurado' });
      return;
    }

    const response = await fetch(
      `${API_CONFIG.GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=${limitNum}&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${githubToken}`,
          'User-Agent': 'Portfolio-App',
        },
      }
    );

    const remaining = response.headers.get('X-RateLimit-Remaining');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    const remainingNum = remaining ? parseInt(remaining) : null;

    if (!response.ok) {
      if (response.status === 403) {
        const reset = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
        res.status(403).json({
          error: `Rate limit excedido! Redefine em: ${reset?.toLocaleTimeString() || 'desconhecido'}`,
        });
        return;
      }
      if (response.status === 401) {
        res.status(401).json({ error: 'Token inválido' });
        return;
      }
      if (response.status === 404) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      res.status(response.status).json({
        error: `Erro ao buscar repositórios: ${response.status}`,
      });
      return;
    }

    const repos: GitHubProject[] = await response.json();

    const filteredRepos = repos
      .filter((repo) => !repo.fork && repo.size > 0)
      .slice(0, limitNum);

    if (remainingNum !== null) {
      cache.set(cacheKey, {
        data: filteredRepos,
        timestamp: Date.now(),
        remaining: remainingNum,
      });
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    res.status(200).json({
      data: filteredRepos,
      remaining: remainingNum || undefined,
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}