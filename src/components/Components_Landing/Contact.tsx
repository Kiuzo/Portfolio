import BlurText from '@/components/Components_Esteticos/BlurText';
import MagicBento from '@/components/Components_Esteticos/MagicBento';
import { BLUR_TEXT_CONFIG, MAGIC_BENTO_CONFIG, SPACING, TYPOGRAPHY } from '@/config/constants';

/**
 * Componente Contact - Seção de contato
 * Exibe título e componente MagicBento com links de contato
 */
export function Contact() {
    return (
        <section
            id="contato"
            className={`min-h-[200vh] flex flex-col justify-center items-center relative ${SPACING.SECTION_PADDING}`}
        >
            <BlurText
                text="Contato"
                delay={BLUR_TEXT_CONFIG.DELAY}
                animateBy={BLUR_TEXT_CONFIG.ANIMATE_BY}
                direction={BLUR_TEXT_CONFIG.DIRECTION}
                className={`${TYPOGRAPHY.SECTION_TITLE} ${SPACING.SECTION_TITLE_MB} text-white`}
            />

            <MagicBento
                textAutoHide={MAGIC_BENTO_CONFIG.TEXT_AUTO_HIDE}
                enableStars={MAGIC_BENTO_CONFIG.ENABLE_STARS}
                enableSpotlight={MAGIC_BENTO_CONFIG.ENABLE_SPOTLIGHT}
                enableBorderGlow={MAGIC_BENTO_CONFIG.ENABLE_BORDER_GLOW}
                enableTilt={MAGIC_BENTO_CONFIG.ENABLE_TILT}
                enableMagnetism={MAGIC_BENTO_CONFIG.ENABLE_MAGNETISM}
                clickEffect={MAGIC_BENTO_CONFIG.CLICK_EFFECT}
                spotlightRadius={MAGIC_BENTO_CONFIG.SPOTLIGHT_RADIUS}
                particleCount={MAGIC_BENTO_CONFIG.PARTICLE_COUNT}
                glowColor={MAGIC_BENTO_CONFIG.GLOW_COLOR}
            />
        </section>
    );
}