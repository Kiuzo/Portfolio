import SplitText from '@/components/Components_Esteticos/SplitText';
import ElectricBorder from '@/components/Components_Esteticos/EletricBorder';
import { useGitHubProjects } from "@/hooks/Git_pegar";
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';

export function Projects() {
    const { projects, loading, error } = useGitHubProjects('Kiuzo', 6);

    return (
        <section id="projetos" className='flex flex-col justify-center mt-60 px-4'>

            <SplitText
                text="Meus Projetos"
                className="text-4xl sm:text5xl lg:text-6xl font-semibold text-center text-white"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="100px"
                textAlign="center"
            />

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mx-auto max-w-7xl mt-30 w-full'>

                {projects && projects.map(projeto => (
                    <ElectricBorder
                        key={projeto.id}
                        color="#FFFFFF"
                        speed={1}
                        chaos={0.5}
                        thickness={2}
                        style={{ borderRadius: 16, height: '100%' }}
                    >
                        <div className="flex flex-col min-h-[280px] h-full bg-gray-800 text-white p-5 sm:p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">

                            {/* Título e botão GitHub */}
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <h3 className="text-xl sm:text-2xl font-bold break-words line-clamp-2 flex-1">
                                    {projeto.name}
                                </h3>
                                <a 
                                    href={projeto.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    title="Ver no GitHub"
                                    className="flex-shrink-0 hover:text-cyan-300 transition-colors"
                                >
                                    <FaGithub size={24} className="sm:w-7 sm:h-7" />
                                </a>
                            </div>

                            {/* Descrição */}
                            <p className="text-sm sm:text-base text-gray-300 mb-4 flex-grow line-clamp-3">
                                {projeto.description || 'Sem descrição'}
                            </p>

                            {/* Footer: linguagem, estrelas e forks */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-cyan-300 text-xs sm:text-sm font-semibold border-t border-gray-700 pt-3 mt-auto">

                                {projeto.language && (
                                    <span className="bg-cyan-700 px-2 sm:px-3 py-1 rounded-full truncate max-w-[120px]">
                                        {projeto.language}
                                    </span>
                                )}

                                {projeto.language && <span className="opacity-50 hidden sm:inline">|</span>}

                                <span className="flex items-center gap-1 whitespace-nowrap">
                                    <FaStar size={16} className="text-yellow-400 flex-shrink-0" />
                                    <span className="truncate">{projeto.stargazers_count}</span>
                                </span>

                                <span className="flex items-center gap-1 whitespace-nowrap">
                                    <FaCodeBranch size={16} className="flex-shrink-0" />
                                    <span className="truncate">{projeto.forks_count}</span>
                                </span>

                            </div>

                        </div>
                    </ElectricBorder>
                ))}
            </div>

        </section>
    );
}