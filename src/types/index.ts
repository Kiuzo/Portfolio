export interface GitHubProject {
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

export interface NavItem {
    label: string;
    href: string;
}

export interface Project {
    id: number;
    name: string;
    url: string;
    description: string;
}

export interface AnimationConfig {
    duration: number;
    delay: number;
    ease: string;
}

export interface UseGitHubProjectsReturn {
    projects: GitHubProject[];
    loading: boolean;
    error: string | null;
    remainingRequests: number | null;
}

export interface GitHubApiResponse {
    data?: GitHubProject[];
    remaining?: number;
    error?: string;
}
