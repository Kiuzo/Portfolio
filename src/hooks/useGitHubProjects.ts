import { useState, useEffect, useRef } from 'react';

import type { GitHubProject, UseGitHubProjectsReturn } from '@/types';
import { API_CONFIG } from '@/config/constants';

interface CacheEntry {
    data: GitHubProject[];
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Hook para buscar projetos do GitHub de um usuário
 * @param username - Nome de usuário do GitHub
 * @param limit - Número máximo de projetos a retornar (padrão: 6)
 * @returns Objeto contendo projetos, estado de loading, erro e requisições restantes
 */
export function useGitHubProjects(
    username: string,
    limit: number = API_CONFIG.DEFAULT_LIMIT
): UseGitHubProjectsReturn {
    const [projects, setProjects] = useState<GitHubProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [remainingRequests, setRemainingRequests] = useState<number | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const fetchProjects = async (): Promise<void> => {
            const cacheKey = `${username}-${limit}`;
            const cached = cache.get(cacheKey);

            if (cached && Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
                setProjects(cached.data);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                abortControllerRef.current = new AbortController();

                const response = await fetch(
                    `/api/github?username=${encodeURIComponent(username)}&limit=${limit}`,
                    {
                        signal: abortControllerRef.current.signal,
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Erro: ${response.status}`);
                }

                const { data, remaining } = await response.json();

                if (remaining !== undefined) {
                    setRemainingRequests(remaining);

                    if (remaining < 10) {
                        console.warn('Poucas requisições restantes!');
                    }
                }

                cache.set(cacheKey, {
                    data,
                    timestamp: Date.now(),
                });

                setProjects(data);
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }
                const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
                setError(errorMessage);
                console.error('Erro ao buscar projetos:', errorMessage);
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
}
