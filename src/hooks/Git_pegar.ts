import { useState, useEffect, useRef } from 'react';

interface Project {
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
}

interface UseGitHubProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  remainingRequests: number | null;
}

// Cache simples em memória
const cache = new Map<string, { data: Project[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export const useGitHubProjects = (username: string, limit: number = 6): UseGitHubProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [remainingRequests, setRemainingRequests] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancela requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchProjects = async () => {
      // DEBUG: Verifica se o token está sendo lido
      console.log('🔑 Token:', process.env.NEXT_PUBLIC_GITHUB_TOKEN ? 'Presente' : 'AUSENTE');
      console.log('👤 Username:', username);
      console.log('📊 Limit:', limit);

      // Verifica cache primeiro
      const cacheKey = `${username}-${limit}`;
      const cached = cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('✅ Usando dados do cache');
        setProjects(cached.data);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        abortControllerRef.current = new AbortController();

        console.log('🚀 Fazendo requisição para API do GitHub...');

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}&type=owner`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
            },
            signal: abortControllerRef.current.signal
          }
        );

        // Captura informações de rate limit
        const remaining = response.headers.get('X-RateLimit-Remaining');
        const resetTime = response.headers.get('X-RateLimit-Reset');
        
        if (remaining) {
          setRemainingRequests(parseInt(remaining));
          console.log(`📊 Requisições restantes: ${remaining}`);
          
          if (parseInt(remaining) < 10) {
            console.warn('⚠️ Poucas requisições restantes!');
          }
        }

        console.log('📡 Status da resposta:', response.status);

        if (!response.ok) {
          if (response.status === 403) {
            const reset = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
            throw new Error(
              `Rate limit excedido! Redefine em: ${reset?.toLocaleTimeString() || 'desconhecido'}`
            );
          }
          if (response.status === 401) {
            throw new Error('Token inválido ou não configurado. Verifique NEXT_PUBLIC_GITHUB_TOKEN');
          }
          throw new Error(`Erro ao buscar repositórios: ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ ${data.length} repositórios encontrados`);

        const filteredProjects = data
          .filter((repo: any) => !repo.fork && repo.size > 0)
          .slice(0, limit)
          .map((repo: any) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            topics: repo.topics || [],
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count
          }));

        console.log(`✅ ${filteredProjects.length} projetos após filtro`);

        // Salva no cache
        cache.set(cacheKey, {
          data: filteredProjects,
          timestamp: Date.now()
        });

        setProjects(filteredProjects);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('🚫 Requisição cancelada');
          return;
        }
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMessage);
        console.error('❌ Erro ao buscar projetos:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProjects();
    }

    // Cleanup: cancela requisição ao desmontar
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [username, limit]);

  return { projects, loading, error, remainingRequests };
};