import Particles from '@/components/Components_Esteticos/Particles';

export function Background() {
    return (
        <section className="particlesBackground">
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                />
        </section>
    );
}