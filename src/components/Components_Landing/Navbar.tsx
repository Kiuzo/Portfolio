import GooeyNav from '@/components/Components_Esteticos/GooeyNav';
import { NAV_ITEMS } from '@/config/navigation';
import { GOOEY_NAV_CONFIG } from '@/config/constants';

/**
 * Componente Navbar - Barra de navegação fixa no topo
 * Utiliza GooeyNav para navegação animada entre seções
 */
export function Navbar() {
    return (
        <div className="fixed top-0 mt-4 left-0 right-0 flex justify-start items-start z-[999]">
            <GooeyNav
                items={NAV_ITEMS}
                particleCount={GOOEY_NAV_CONFIG.PARTICLE_COUNT}
                particleDistances={GOOEY_NAV_CONFIG.PARTICLE_DISTANCES}
                particleR={GOOEY_NAV_CONFIG.PARTICLE_R}
                initialActiveIndex={GOOEY_NAV_CONFIG.INITIAL_ACTIVE_INDEX}
                animationTime={GOOEY_NAV_CONFIG.ANIMATION_TIME}
                timeVariance={GOOEY_NAV_CONFIG.TIME_VARIANCE}
                colors={GOOEY_NAV_CONFIG.COLORS}
            />
        </div>
    );
}