import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

import BlurText from '../Components_Esteticos/BlurText';
import SpotlightCard from '../Components_Esteticos/Spotlightcard';
import type { Project } from '@/types';
import { MAIN_PROJECTS } from '@/config/projects';
import {
    BLUR_TEXT_CONFIG,
    SPOTLIGHT_CARD_CONFIG,
    SPACING,
    TYPOGRAPHY,
} from '@/config/constants';

/**
 * Componente MainProjects - Seção de principais projetos
 * Exibe projetos destacados com modal de preview
 */
export function MainProjects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section
            id="principaisprojetos"
            className={`flex flex-col justify-center items-center min-h-screen relative ${SPACING.SECTION_PADDING}`}
        >
            <BlurText
                text="Meus Principais projetos"
                delay={BLUR_TEXT_CONFIG.DELAY}
                animateBy={BLUR_TEXT_CONFIG.ANIMATE_BY}
                direction={BLUR_TEXT_CONFIG.DIRECTION}
                className={`text-center justify-center ${TYPOGRAPHY.SECTION_TITLE} ${SPACING.SECTION_TITLE_MB} text-white`}
            />

            <div className={`flex flex-col md:flex-row ${SPACING.CONTAINER_MAX_WIDTH} ${SPACING.SECTION_CONTENT_MT} ${SPACING.CARD_GAP} justify-center items-stretch`}>
                {MAIN_PROJECTS.map((project) => (
                    <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="w-full md:w-1/2 lg:w-1/3 p-0 border-0 bg-transparent flex flex-col focus:outline-none h-full flex-grow"
                    >
                        <SpotlightCard
                            className={`custom-spotlight-card w-full h-full ${SPACING.CARD_PADDING} rounded-xl border border-gray-800 bg-gray-900/50 shadow-lg hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 backdrop-blur-sm relative flex flex-col focus:ring-4 focus:ring-cyan-500/50 focus:ring-opacity-50`}
                            spotlightColor={SPOTLIGHT_CARD_CONFIG.SPOTLIGHT_COLOR}
                        >
                            <div className='flex flex-col h-full'>
                                <h3 className={`${TYPOGRAPHY.CARD_TITLE} font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors`}>
                                    {project.name}
                                </h3>
                                <p className="text-gray-400 text-sm sm:text-base leading-relaxed flex-grow">
                                    {project.description}
                                </p>
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 flex items-center gap-2 text-cyan-400 text-sm opacity-100 transition-opacity duration-300 justify-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className='text-cyan-400 text-center hover:text-cyan-300 transition-colors'>Ver projeto</span>
                                    <ExternalLink size={16} className='text-cyan-400 text-center hover:text-cyan-300 transition-colors' />
                                </a>
                            </div>
                        </SpotlightCard>
                    </button>
                ))}
            </div>

            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="w-full h-full max-w-7xl max-h-[98vh] sm:max-h-[90vh] bg-gray-900 rounded-lg sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-800 transform scale-100 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 sm:p-6 bg-gray-800/90 border-b border-gray-700 backdrop-blur-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 flex-1">
                                <h2 className="text-lg sm:text-2xl font-semibold text-white truncate max-w-[80%]">
                                    {selectedProject.name}
                                </h2>

                                <a
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors duration-200 text-xs sm:text-sm font-medium border border-cyan-500/30 hover:border-cyan-500/50"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink size={16} />
                                    Abrir em nova aba
                                </a>
                            </div>

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 sm:p-3 hover:bg-gray-700 rounded-lg transition-colors ml-2 sm:ml-4 focus:outline-none focus:ring-2 focus:ring-white"
                                aria-label="Fechar Modal"
                            >
                                <X size={20} className="text-gray-400 hover:text-white transition-colors" />
                            </button>
                        </div>

                        <div className="flex-1 relative bg-white">
                            <iframe
                                src={selectedProject.url}
                                className="w-full h-full border-0"
                                title={selectedProject.name}
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}