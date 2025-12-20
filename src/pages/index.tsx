import { Background } from '../components/Components_Landing/Background';
import { Navbar } from '../components/Components_Landing/Navbar';
import { Hero } from '../components/Components_Landing/Hero';
import { AboutMe } from '../components/Components_Landing/Aboutme';
import { Projects } from '../components/Components_Landing/Projects';
import { Contact } from '../components/Components_Landing/Contact';
import { MainProjects } from '../components/Components_Landing/MainProjects';

/**
 * Página principal do portfólio
 * Renderiza todas as seções da landing page
 */
export default function Home() {
  return (
    <main>
      <title>David Soares Portfolio</title>
      <Background />
      <Navbar />
      <Hero />
      <AboutMe />
      <MainProjects />
      <Projects />
      <Contact />
    </main>
  );
}