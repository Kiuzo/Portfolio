import styles from '@/styles/portfolio.module.css';
import SplitText from '@/components/SplitText';
import Plasma from '@/components/Plasma';
import SpotlightCard from "@/components/Spotlightcard";
import BlurText from "@/components/BlurText";
import RotatingText from "@/components/RotatingText";
import GooeyNav from '@/components/GooeyNav';
import ScrollReveal from '@/components/ScrolReveal';
import ElectricBorder from '@/components/EletricBorder';
import { useGitHubProjects } from "@/hooks/Git_pegar";

/* IGNORAR */
const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

/* IGNORAR NAV */
const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Home() {
  const { projects, loading, error } = useGitHubProjects('Kiuzo', 6);

  return (
    <div className={styles.background} style={{ position: 'relative', zIndex: 0 }}>

      {/* PLASMA - background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Plasma
          color="#3B59B3"
          speed={0.2}
          direction="forward"
          scale={1}
          opacity={0.8}
          mouseInteractive={false}
        />
      </div>

      {/* IMPORTAÇÃO DE FONTES */}
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </div>

      {/* NAVBAR FIXA NO TOPO COM Z-INDEX ALTO */}
      <div
        className="fixed top-0 left-0 right-0 flex justify-center items-start"
        style={{ zIndex: 9999 }}
      >
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/* CONTAINER PRINCIPAL DO CONTEÚDO */}
      <div
        className="flex flex-col justify-center items-center min-h-screen relative"
        style={{ zIndex: 20, paddingTop: '80px' /* espaço pro nav fixo */ }}
      >
        {/* DAVID SOARES */}
        <SplitText
          text="David Soares Lopes"
          className="text-6xl font-semibold text-center text-white"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        {/* DEV FRONT END */}
        <div className="mt-4">
          <SplitText
            text="Desenvolvedor Front-end"
            className="text-3xl font-semibold text-center text-white"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
      </div>

      {/* SEÇÃO: SOBRE MIM + EDUCAÇÃO */}
      <section
        className="w-full flex flex-col items-center justify-center px-4 sm:px-8 mt-24 mb-32"
        style={{ zIndex: 20, position: 'relative' }}
      >
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-7xl">

          {/* SOBRE MIM */}
          <div className="flex-1 flex flex-col items-center">
            <BlurText
              text="Sobre mim"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-5xl sm:text-6xl mb-8 text-white"
            />

            <SpotlightCard
              className="custom-spotlight-card w-full max-w-2xl px-8 py-10 rounded-xl border border-white/10 bg-white/5 shadow-lg"
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
              <p className="text-white text-lg sm:text-xl leading-relaxed text-left">
                Olá! Meu nome é <span className="font-bold text-cyan-400">David</span>, sou um desenvolvedor
                front-end apaixonado por criar experiências digitais interativas e modernas.
                Gosto de trabalhar com <span className="font-semibold text-purple-300">React, Tailwind e animações</span> que dão vida aos projetos.
                Estou sempre aprendendo novas tecnologias e buscando aprimorar minhas habilidades.
              </p>
            </SpotlightCard>
          </div>

          {/* EDUCAÇÃO */}
          <div className="flex-1 flex flex-col items-center mt-12 lg:mt-0">
            <BlurText
              text="Educação"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-5xl sm:text-6xl mb-8 text-white"
            />

            <SpotlightCard
              className="custom-spotlight-card w-full max-w-2xl px-8 py-10 rounded-xl border border-white/10 bg-white/5 shadow-lg"
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
              <p className="text-white text-lg sm:text-xl leading-relaxed text-left">
                Concluí o curso técnico em <span className="font-semibold text-cyan-400">Desenvolvimento de Sistemas</span> na
                <span className="font-bold text-purple-300"> ETEC Jardim Ângela</span>. Durante esse período,
                aprendi sobre lógica de programação, banco de dados, desenvolvimento web e mobile,
                além de ter contato com metodologias ágeis e ferramentas de versionamento como o Git.
              </p>
            </SpotlightCard>
          </div>

        </div>
      </section>

      {/* SEÇÃO: TECNOLOGIAS */}
      <section
        className="w-full flex flex-col items-center justify-center px-4 sm:px-8 mt-20 mb-32"
        style={{ zIndex: 20, position: 'relative' }}
      >
        <BlurText
          text="Tecnologias"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl sm:text-6xl mb-8 text-white"
        />

        <div className="flex justify-center items-center mt-15">
          <RotatingText
            texts={['React', 'Html', 'Css', 'BootStrap', 'Tailwind', 'JavaScript', 'MySQL', 'TypeScript', 'Git', 'Node.js', 'Figma', 'GitHub']}
            mainClassName="px-3 sm:px-4 md:px-5 bg-cyan-300 text-black overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg text-lg sm:text-xl font-semibold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={4000}
          />
        </div>

        <SpotlightCard
          className="custom-spotlight-card w-full max-w-2xl mt-15 px-8 py-10 rounded-xl border border-white/10 bg-white/5 shadow-lg"
          spotlightColor="rgba(255, 255, 255, 0.1)"
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
      </section>

      {/* MEUS PROJETOS */}
      <section
        className="w-full flex flex-col items-center justify-center px-4 sm:px-8 mt-10 mb-32"
        style={{ zIndex: 20, position: 'relative' }}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          Meus Projetos
        </ScrollReveal>

        <div className='mt-25'>

          {projects.map(projeto => (
            <ElectricBorder
              key={projeto.id}
              color="#7df9ff"
              speed={1}
              chaos={0.5}
              thickness={2}
              style={{ borderRadius: 16 }}
            >
              <div className="text-white p-6 mb-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-xl shadow-lg hover:shadow-cyan-500 transition-shadow duration-300">
                <h3 className="text-3xl font-bold mb-3 p-2 border-b border-cyan-400">
                  {projeto.name}
                </h3>
                <p className="text-gray-300 mb-4 min-h-[3rem]">
                  {projeto.description || 'Sem descrição'}
                </p>
                <p className="flex flex-wrap items-center gap-3 text-cyan-300 text-sm font-semibold border-t border-cyan-400 pt-3">
                  {projeto.language && (
                    <span className="bg-cyan-700 px-3 py-1 rounded-full">
                      {projeto.language}
                    </span>
                  )}
                  {projeto.language && <span className="opacity-50">|</span>}
                  <span>⭐ {projeto.stargazers_count}</span>
                  <span>🍴 {projeto.forks_count}</span>
                </p>
              </div>
            </ElectricBorder>
          ))}
          </div>
      </section >
    </div >
  );
}
