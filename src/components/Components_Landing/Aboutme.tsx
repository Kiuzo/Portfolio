import SpotlightCard from '@/components/Components_Esteticos/Spotlightcard';
import BlurText from '@/components/Components_Esteticos/BlurText';
import {
    BLUR_TEXT_CONFIG,
    SPOTLIGHT_CARD_CONFIG,
    SPACING,
    TYPOGRAPHY,
} from '@/config/constants';

/**
 * Componente AboutMe - Seção "Sobre mim"
 * Exibe informações pessoais, educação e tecnologias
 */
export function AboutMe() {
    return (
        <section id="sobremim" className={`min-h-screen flex justify-center items-center ${SPACING.SECTION_PADDING}`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${SPACING.CARD_GAP} lg:gap-12 ${SPACING.CONTAINER_MAX_WIDTH}`}>
                <div className="flex flex-col items-center">
                    <BlurText
                        text="Sobre mim"
                        delay={BLUR_TEXT_CONFIG.DELAY}
                        animateBy={BLUR_TEXT_CONFIG.ANIMATE_BY}
                        direction={BLUR_TEXT_CONFIG.DIRECTION}
                        className={`${TYPOGRAPHY.SECTION_TITLE} ${SPACING.SECTION_TITLE_MB} text-white`}
                    />

                    <SpotlightCard
                        className={`custom-spotlight-card w-full max-w-2xl ${SPACING.CARD_PADDING} rounded-xl border border-white/10 bg-white/5 shadow-lg`}
                        spotlightColor={SPOTLIGHT_CARD_CONFIG.SPOTLIGHT_COLOR}
                    >
                        <p className={`text-white ${TYPOGRAPHY.PARAGRAPH} leading-relaxed text-left`}>
                            Olá! Meu nome é <span className="font-bold text-cyan-400">David</span>, sou um desenvolvedor
                            front-end apaixonado por criar experiências digitais interativas e modernas.
                            Gosto de trabalhar com <span className="font-semibold text-purple-300">React, Tailwind e animações</span> que dão vida aos projetos.
                            Estou sempre aprendendo novas tecnologias e buscando aprimorar minhas habilidades.
                        </p>
                    </SpotlightCard>
                </div>

                <div className="flex flex-col items-center">
                    <BlurText
                        text="Educação"
                        delay={BLUR_TEXT_CONFIG.DELAY}
                        animateBy={BLUR_TEXT_CONFIG.ANIMATE_BY}
                        direction={BLUR_TEXT_CONFIG.DIRECTION}
                        className={`${TYPOGRAPHY.SECTION_TITLE} ${SPACING.SECTION_TITLE_MB} text-white`}
                    />

                    <SpotlightCard
                        className={`custom-spotlight-card w-full max-w-2xl ${SPACING.CARD_PADDING} rounded-xl border border-white/10 bg-white/5 shadow-lg`}
                        spotlightColor={SPOTLIGHT_CARD_CONFIG.SPOTLIGHT_COLOR}
                    >
                        <p className={`text-white ${TYPOGRAPHY.PARAGRAPH} leading-relaxed text-left`}>
                            Concluí o curso técnico em <span className="font-semibold text-cyan-400">Desenvolvimento de Sistemas</span> na
                            <span className="font-bold text-purple-300"> ETEC Jardim Ângela</span>. Durante esse período,
                            aprendi sobre lógica de programação, banco de dados, desenvolvimento web e mobile,
                            além de ter contato com metodologias ágeis e ferramentas de versionamento como o Git.
                        </p>
                    </SpotlightCard>
                </div>

                <div className="flex flex-col lg:col-span-2">
                    <BlurText
                        text="Tecnologias"
                        delay={BLUR_TEXT_CONFIG.DELAY}
                        animateBy={BLUR_TEXT_CONFIG.ANIMATE_BY}
                        direction={BLUR_TEXT_CONFIG.DIRECTION}
                        className={`${TYPOGRAPHY.SECTION_TITLE} ${SPACING.SECTION_TITLE_MB} text-white text-center justify-center`}
                    />

                    <SpotlightCard
                        className={`custom-spotlight-card w-full ${SPACING.CARD_PADDING} rounded-xl border border-white/10 bg-white/5 shadow-lg`}
                        spotlightColor={SPOTLIGHT_CARD_CONFIG.SPOTLIGHT_COLOR}
                    >
                        <p className={`text-white ${TYPOGRAPHY.PARAGRAPH} leading-relaxed text-left`}>
                            Eu tenho experiência com diversas tecnologias essenciais para desenvolvimento web e design, incluindo{' '}
                            <span className="font-bold text-cyan-400">React, HTML, CSS, Bootstrap e Tailwind CSS</span>{' '}
                            para criar interfaces modernas e responsivas. Além disso, sei{' '}
                            <span className="font-bold text-purple-300">JavaScript</span> e{' '}
                            <span className="font-bold text-cyan-400">TypeScript</span> para programação front-end, com conhecimento em{' '}
                            <span className="font-bold text-purple-300">Node.js</span> para desenvolvimento de servidores.
                            Também trabalho com bancos de dados relacionais usando{' '}
                            <span className="font-bold text-purple-300">MySQL</span> e utilizo ferramentas de versionamento de código, como{' '}
                            <span className="font-bold text-cyan-400">Git e GitHub</span>, para colaborar em projetos de forma eficiente.
                            Para design e prototipagem, uso{' '}
                            <span className="font-bold text-purple-300">Figma</span>, que me permite transformar ideias em layouts funcionais.
                        </p>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
}