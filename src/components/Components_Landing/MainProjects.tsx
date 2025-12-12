import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import BlurText from '../Components_Esteticos/BlurText';
import SpotlightCard from '../Components_Esteticos/Spotlightcard';

interface Project {
    id: number;
    name: string;
    url: string;
    description: string;
}

export function MainProjects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        {
            id: 2,
            name: 'Projeto Caridade e Esperança',
            url: 'https://prjt-caridade.vercel.app',
            description: 'Uma plataforma dedicada a facilitar doações e apoio a instituições e pessoas em situação de vulnerabilidade social.'
        },
        {
            id: 3,
            name: 'Crud-base',
            url: 'https://crud-base.vercel.app/',
            description: 'Um projeto simples de CRUD (Create, Read, Update, Delete) com foco em demonstrar operações básicas de persistência e manipulação de dados.'
        }
    ];

    return (
        <section
            id="principaisprojetos"
            className="flex flex-col justify-center items-center min-h-screen relative p-4 sm:p-8"
        >
            <BlurText
                text="Meus Principais projetos"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => { }}
                className="text-4xl sm:text-5xl md:text-6xl mb-12 text-white text-center"
            />

            {/* Grid de Projetos */}

            <div className="flex flex-col md:flex-row max-w-7xl w-full mt-10 gap-6 gap-y-8 md:gap-8 justify-center items-stretch px-4">
                {projects.map((project) => (
                    <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}

                        className={`
                            w-full md:w-1/2 lg:w-1/3 p-0 border-0 bg-transparent flex flex-col focus:outline-none 
                            
                            // Adicionamos estas classes para garantir que o botão se estique verticalmente
                            h-full flex-grow
                        `}
                    >
                        <SpotlightCard
                            className="
                                custom-spotlight-card w-full h-full p-6 sm:p-8 
                                rounded-xl border border-gray-800 bg-gray-900/50 shadow-lg 
                                hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 
                                backdrop-blur-sm relative flex flex-col
                                focus:ring-4 focus:ring-cyan-500/50 focus:ring-opacity-50
                            "
                            spotlightColor="rgba(98, 238, 252, 0.22)"
                        >
                            <div className='flex flex-col h-full'>
                                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
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

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="w-full h-full max-w-7xl max-h-[98vh] sm:max-h-[90vh] bg-gray-900 rounded-lg sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-800 transform scale-100 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
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

                        {/* Iframe */}
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
        </section >
    );
}