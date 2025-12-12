import Particles from '@/components/Components_Esteticos/Particles';
import { PARTICLES_CONFIG } from '@/config/constants';

/**
 * Componente Background - Partículas animadas de fundo
 * Renderiza partículas flutuantes em toda a tela
 */
export function Background() {
    return (
        <section className="particlesBackground">
            <Particles
                particleColors={PARTICLES_CONFIG.COLORS}
                particleCount={PARTICLES_CONFIG.COUNT}
                particleSpread={PARTICLES_CONFIG.SPREAD}
                speed={PARTICLES_CONFIG.SPEED}
                particleBaseSize={PARTICLES_CONFIG.BASE_SIZE}
                moveParticlesOnHover={PARTICLES_CONFIG.MOVE_ON_HOVER}
                alphaParticles={PARTICLES_CONFIG.ALPHA_PARTICLES}
                disableRotation={PARTICLES_CONFIG.DISABLE_ROTATION}
            />
        </section>
    );
}