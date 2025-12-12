import SpotlightCard from "@/components/Components_Esteticos/Spotlightcard";
import BlurText from "@/components/Components_Esteticos/BlurText";
import RotatingText from "@/components/Components_Esteticos/RotatingText";

export function AboutMe() {
    return (
        <section id="sobremim" className="min-h-screen flex justify-center px-4">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl w-full">

                <div className="flex flex-col items-center">

                    <BlurText
                        text="Sobre mim"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={() => { }}
                        className="text-5xl sm:text-6xl mb-8 text-white"
                    />

                    <SpotlightCard
                        className="custom-spotlight-card w-full max-w-2xl px-8 py-10 rounded-xl border border-white/10 bg-white/5 shadow-lg"
                        spotlightColor="rgba(98, 238, 252, 0.22)"
                    >

                        <p className="text-white text-lg sm:text-xl leading-relaxed text-left">
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
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={() => { }}
                        className="text-5xl sm:text-6xl mb-8 text-white"
                    />

                    <SpotlightCard
                        className="custom-spotlight-card w-full max-w-2xl px-8 py-10 rounded-xl border border-white/10 bg-white/5 shadow-lg"
                        spotlightColor="rgba(98, 238, 252, 0.22)"
                    >

                        <p className="text-white text-lg sm:text-xl leading-relaxed text-left">
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
                        delay={150}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={() => { }}
                        className="text-5xl sm:text-6xl mb-8  text-white text-center justify-center"
                    />


                    <SpotlightCard
                        className="custom-spotlight-card w-full px-6 sm:px-8 py-8 sm:py-10 rounded-xl border border-white/10 bg-white/5 shadow-lg"
                        spotlightColor="rgba(98, 238, 252, 0.22)"
                    >

                        <p className="text-white text-lg sm:text-xl leading-relaxed text-left">
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

            </div >


        </section>

    );
}