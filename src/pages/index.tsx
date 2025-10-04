import styles from '@/styles/portfolio.module.css';
import SplitText from '@/components/SplitText';
import Particles from '@/components/Particles';
import SpotlightCard from "@/components/Spotlightcard";
import BlurText from "@/components/BlurText";
import RotatingText from "@/components/RotatingText";
import GooeyNav from '@/components/GooeyNav';
import ScrollReveal from '@/components/ScrolReveal';
import ElectricBorder from '@/components/EletricBorder';
import { useGitHubProjects } from "@/hooks/Git_pegar";
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import MagicBento from '@/components/MagicBento';
import { useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const items: NavItem[] = [
  { label: "Principal", href: "#principal" },
  { label: "Sobre mim", href: "#sobremim" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

// Função de scroll suave com animação customizada
const smoothScrollTo = (targetId: string): void => {
  const element = document.getElementById(targetId);
  if (!element) return;

  const startPosition = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80;
  const distance = targetPosition - startPosition;
  const duration = 1000; // 1 segundo
  let startTime: number | null = null;

  const animation = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Função de suavização simples
    const easeProgress = progress * (2 - progress); // easeOutQuad
    
    window.scrollTo(0, startPosition + (distance * easeProgress));
    
    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

export default function Home() {
  const { projects, loading, error } = useGitHubProjects('Kiuzo', 6);

  // Intercepta cliques na navegação de forma simples
  useEffect(() => {
    const handleClick = (e: Event): void => {
      const target = e.target as HTMLElement;
      // Só intercepta se for um link com href começando com #
      if (target.tagName === 'A' && (target as HTMLAnchorElement).href && (target as HTMLAnchorElement).href.includes('#')) {
        e.preventDefault();
        const targetId = (target as HTMLAnchorElement).href.split('#')[1];
        smoothScrollTo(targetId);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={styles.background} style={{ position: 'relative', zIndex: 0 }}>
      <section id="principal">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={3000}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <div className="fixed top-0 mt-4 left-0 right-0 flex justify-start items-start" style={{ zIndex: 9999, height: '80px' }}>
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

        <div className="flex flex-col justify-center items-center min-h-screen relative" style={{ zIndex: 20, paddingTop: '80px' }}>
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
      </section>

      <section id="sobremim" className="w-full flex flex-col items-center justify-center px-4 sm:px-8 mt-24 mb-32" style={{ zIndex: 20, position: 'relative' }}>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-7xl">
          <div className="flex-1 flex flex-col items-center">
            <BlurText
              text="Sobre mim"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => {}}
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

          <div className="flex-1 flex flex-col items-center mt-12 lg:mt-0">
            <BlurText
              text="Educação"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => {}}
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
        </div>
      </section>

      <section className="w-full flex flex-col items-center justify-center px-4 sm:px-8 mt-20 mb-32" style={{ zIndex: 20, position: 'relative' }}>
        <BlurText
          text="Tecnologias"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
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
      </section>

      <section id="projetos" className="w-full flex flex-col items-center justify-center px-4 sm:px-8 mt-10 mb-32" style={{ zIndex: 20, position: 'relative' }}>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
        >
          Meus Projetos
        </ScrollReveal>

        <div className='mt-25'>
          {projects && projects.map(projeto => (
            <div key={projeto.id} className="w-full max-w-[90%] lg:w-[700px] mx-auto mb-8">
              <ElectricBorder
                color="#FFFFFF"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16 }}
              >
                <div className="bg-gray-800 text-white text-2xl p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300 w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold p-2 border-cyan-400 flex-1">
                      {projeto.name}
                    </h3>
                    <a
                      href={projeto.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-300 mt-2 sm:mt-0 sm:ml-4"
                      title="Ver no GitHub"
                    >
                      <FaGithub size={32} />
                    </a>
                  </div>

                  <p className="text-gray-300 mb-4 min-h-[3rem] text-base sm:text-lg">
                    {projeto.description || 'Sem descrição'}
                  </p>

                  <p className="flex flex-wrap items-center gap-5 text-cyan-300 text-sm font-semibold border-cyan-400 pt-3">
                    {projeto.language && (
                      <span className="bg-cyan-700 px-3 py-1 rounded-full">
                        {projeto.language}
                      </span>
                    )}
                    {projeto.language && <span className="opacity-50">|</span>}
                    <span className="flex items-center gap-1">
                      <FaStar size={20} className="text-yellow-400" />
                      {projeto.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeBranch size={20} />
                      {projeto.forks_count}
                    </span>
                  </p>
                </div>
              </ElectricBorder>
            </div>
          ))}
        </div>
      </section>

      <section id="contato" className="w-full flex flex-col items-center justify-center" style={{ zIndex: 20, position: 'relative' }}>
        <BlurText
          text="Contato"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className="text-5xl sm:text-6xl mb-8 text-white"
        />

        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="41, 246, 255"
        />
      </section>
    </div>
  );
}