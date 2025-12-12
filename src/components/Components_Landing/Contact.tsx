import BlurText from "@/components/Components_Esteticos/BlurText";
import MagicBento from '@/components/Components_Esteticos/MagicBento';

export function Contact() {
    return (

        <section
            id="contato"
            className="min-h-[200vh] flex flex-col justify-center items-center relative p-4 sm:p-8 "
        >

            <BlurText
                text="Contato"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => { }}
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
    );
}