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

const cache = new Map<string, { data: Project[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000;

export const useGitHubProjects = (username: string, limit: number = 6): UseGitHubProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [remainingRequests, setRemainingRequests] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const fetchProjects = async () => {
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

        console.log('🚀 Fazendo requisição para API...');

        const response = await fetch(
          `/api/github?username=${encodeURIComponent(username)}&limit=${limit}`,
          {
            signal: abortControllerRef.current.signal
          }
        );

        console.log('📡 Status da resposta:', response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Erro: ${response.status}`);
        }

        const { data, remaining } = await response.json();
        
        if (remaining !== undefined) {
          setRemainingRequests(remaining);
          console.log(`📊 Requisições restantes: ${remaining}`);
          
          if (remaining < 10) {
            console.warn('⚠️ Poucas requisições restantes!');
          }
        }

        console.log(`✅ ${data.length} projetos recebidos`);

        cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });

        setProjects(data);
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

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [username, limit]);

  return { projects, loading, error, remainingRequests };
};