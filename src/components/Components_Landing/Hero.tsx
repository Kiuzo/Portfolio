import SplitText from '@/components/Components_Esteticos/SplitText';


export function Hero() {
 const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/davidSoaresCurriculo.pdf';
    link.download = 'davidSoaresCurriculo.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    return (
        <section id="principal" className="flex flex-col justify-center items-center min-h-screen relative  ">

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

            <div className="flex gap-4 mt-12 flex-wrap justify-center">
                <button
                 onClick={handleDownload} className="!px-8 !py-3 !bg-transparent !text-white !font-normal !rounded-md !border !border-gray-700 hover:!border-cyan-400 hover:!bg-cyan-400/10 !transition-all !duration-300 !ease-out !shadow-none hover:!shadow-cyan-400/20 hover:!shadow-lg">
                    Cúrriculo
                </button>
            </div>

        </section>
    );
}