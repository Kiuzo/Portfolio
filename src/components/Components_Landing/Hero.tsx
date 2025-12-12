import SplitText from '@/components/Components_Esteticos/SplitText';
import { PERSONAL_INFO, SPLIT_TEXT_CONFIG, SPACING } from '@/config/constants';

/**
 * Componente Hero - Seção principal da landing page
 * Exibe nome, cargo e botão de download do currículo
 */
export function Hero() {
    const handleDownload = (): void => {
        const link = document.createElement('a');
        link.href = PERSONAL_INFO.RESUME_PATH;
        link.download = 'davidSoaresCurriculo.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="principal" className={`flex flex-col justify-center items-center min-h-screen relative ${SPACING.SECTION_PADDING}`}>
            <SplitText
                text={PERSONAL_INFO.FULL_NAME}
                className="text-6xl font-semibold text-center text-white"
                delay={SPLIT_TEXT_CONFIG.DELAY}
                duration={SPLIT_TEXT_CONFIG.DURATION}
                ease={SPLIT_TEXT_CONFIG.EASE}
                splitType={SPLIT_TEXT_CONFIG.SPLIT_TYPE}
                from={SPLIT_TEXT_CONFIG.FROM}
                to={SPLIT_TEXT_CONFIG.TO}
                threshold={SPLIT_TEXT_CONFIG.THRESHOLD}
                rootMargin={SPLIT_TEXT_CONFIG.ROOT_MARGIN}
                textAlign={SPLIT_TEXT_CONFIG.TEXT_ALIGN}
            />

            <SplitText
                text={PERSONAL_INFO.ROLE}
                className="text-3xl font-semibold text-center text-white"
                delay={SPLIT_TEXT_CONFIG.DELAY}
                duration={SPLIT_TEXT_CONFIG.DURATION}
                ease={SPLIT_TEXT_CONFIG.EASE}
                splitType={SPLIT_TEXT_CONFIG.SPLIT_TYPE}
                from={SPLIT_TEXT_CONFIG.FROM}
                to={SPLIT_TEXT_CONFIG.TO}
                threshold={SPLIT_TEXT_CONFIG.THRESHOLD}
                rootMargin={SPLIT_TEXT_CONFIG.ROOT_MARGIN}
                textAlign={SPLIT_TEXT_CONFIG.TEXT_ALIGN}
            />

            <div className={`flex gap-4 ${SPACING.BUTTON_MT} flex-wrap justify-center`}>
                <button
                    onClick={handleDownload}
                    className="!px-8 !py-3 !bg-transparent !text-white !font-normal !rounded-md !border !border-gray-700 hover:!border-cyan-400 hover:!bg-cyan-400/10 !transition-all !duration-300 !ease-out !shadow-none hover:!shadow-cyan-400/20 hover:!shadow-lg"
                >
                    Cúrriculo
                </button>
            </div>
        </section>
    );
}