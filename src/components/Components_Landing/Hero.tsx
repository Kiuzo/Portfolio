import SplitText from '@/components/Components_Esteticos/SplitText';

export function Hero() {
    return (
        <section id="principal" className="flex flex-col justify-center items-center min-h-screen relative">
               
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
        </section>
    );
}