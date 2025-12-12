  import { Background } from '../components/Components_Landing/Background';
  import { Navbar } from '../components/Components_Landing/Navbar';
  import { Hero } from '../components/Components_Landing/Hero';
  import { AboutMe } from '../components/Components_Landing/Aboutme';
  import { Projects } from '../components/Components_Landing/Projects';
  import { Contact } from '../components/Components_Landing/Contact';
  import { MainProjects } from '../components/Components_Landing/MainProjects';


  export default function Home() {

    return (

      <main>

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