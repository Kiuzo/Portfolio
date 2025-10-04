import { useState, useEffect } from 'react';

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
}

export const useGitHubProjects = (username: string, limit: number = 6): UseGitHubProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

             const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}&type=all`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar repositÃ³rios: ${response.status}`);
        }

        const data = await response.json();

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

        setProjects(filteredProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar projetos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProjects();
    }
  }, [username, limit]);

  return { projects, loading, error };
};