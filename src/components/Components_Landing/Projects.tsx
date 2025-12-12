import SplitText from '@/components/Components_Esteticos/SplitText';
import ElectricBorder from '@/components/Components_Esteticos/EletricBorder';
import { useGitHubProjects } from '@/hooks/useGitHubProjects';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import {
    SPLIT_TEXT_CONFIG,
    SPACING,
    TYPOGRAPHY,
    ELECTRIC_BORDER_CONFIG,
    PERSONAL_INFO,
} from '@/config/constants';

/**
 * Componente Projects - Seção de projetos do GitHub
 * Busca e exibe projetos do GitHub do usuário
 */
export function Projects() {
    const { projects } = useGitHubProjects(PERSONAL_INFO.USERNAME, 6);

    return (
        <section id="projetos" className={`flex flex-col justify-center items-center min-h-screen relative ${SPACING.SECTION_PADDING}`}>
            <SplitText
                text="Meus Projetos"
                className={`text-4xl sm:text-5xl lg:text-6xl font-semibold text-center text-white`}
                delay={SPLIT_TEXT_CONFIG.DELAY}
                duration={SPLIT_TEXT_CONFIG.DURATION}
                ease={SPLIT_TEXT_CONFIG.EASE}
                splitType={SPLIT_TEXT_CONFIG.SPLIT_TYPE}
                from={SPLIT_TEXT_CONFIG.FROM}
                to={SPLIT_TEXT_CONFIG.TO}
                threshold={SPLIT_TEXT_CONFIG.THRESHOLD}
                rootMargin="100px"
                textAlign={SPLIT_TEXT_CONFIG.TEXT_ALIGN}
            />

            <div className={`grid grid-cols-1 lg:grid-cols-2 ${SPACING.CARD_GAP} mx-auto ${SPACING.CONTAINER_MAX_WIDTH} ${SPACING.SECTION_CONTENT_MT}`}>
                {projects && projects.map((projeto) => (
                    <ElectricBorder
                        key={projeto.id}
                        color={ELECTRIC_BORDER_CONFIG.COLOR}
                        speed={ELECTRIC_BORDER_CONFIG.SPEED}
                        chaos={ELECTRIC_BORDER_CONFIG.CHAOS}
                        thickness={ELECTRIC_BORDER_CONFIG.THICKNESS}
                        style={{ borderRadius: ELECTRIC_BORDER_CONFIG.BORDER_RADIUS, height: '100%' }}
                    >
                        <div className={`flex flex-col min-h-[280px] h-full bg-gray-800 text-white ${SPACING.CARD_PADDING} rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300`}>
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <h3 className={`${TYPOGRAPHY.CARD_TITLE} font-bold break-words line-clamp-2 flex-1`}>
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

                            <p className="text-sm sm:text-base text-gray-300 mb-4 flex-grow line-clamp-3">
                                {projeto.description || 'Sem descrição'}
                            </p>

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