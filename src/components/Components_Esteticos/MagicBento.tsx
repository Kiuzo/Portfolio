import React, { useRef, useEffect, useState } from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

export interface BentoCardProps {
    color?: string;
    title?: string;
    description?: string;
    label?: string;
    textAutoHide?: boolean;
    icon?: React.ReactNode;
    href?: string;
}

export interface BentoProps {
    textAutoHide?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
    enableTilt?: boolean;
    glowColor?: string;
    enableStars?: boolean;
}

const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '255, 255, 255';
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
    {
        color: '#000000',
        title: 'GitHub',
        description: 'Veja os meus trabalhos',
        label: 'GitHub',
        icon: <Github size={32} className="text-white" />,
        href: 'https://github.com/kiuzo' 
    },
    {
        color: '#111111',
        title: 'Email',
        description: 'Envie uma mensagem no meu email.',
        label: 'Email',
        icon: <Mail size={32} className="text-white" />,
        href: 'mailto:david.soares2411@gmail.com' 
    },
    {
        color: '#1a1a1a',
        title: 'LinkedIn',
        description: 'Meu perfil no linkedin',
        label: 'LinkedIn',
        icon: <Linkedin size={32} className="text-white" />,
        href: 'https://www.linkedin.com/in/david-soares-lopes/' 
    }
];

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const GlobalSpotlight: React.FC<{
    gridRef: React.RefObject<HTMLDivElement | null>;
    disableAnimations?: boolean;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}> = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
        const spotlightRef = useRef<HTMLDivElement | null>(null);
        const rafRef = useRef<number | null>(null);
        const lastUpdateRef = useRef<number>(0);

        useEffect(() => {
            if (disableAnimations || !gridRef?.current || !enabled) return;

            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 20%,
        transparent 60%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: opacity 0.2s ease-out;
      will-change: transform, opacity;
    `;
            document.body.appendChild(spotlight);
            spotlightRef.current = spotlight;

            const handleMouseMove = (e: MouseEvent) => {
                if (!spotlightRef.current || !gridRef.current) return;

                const now = performance.now();
                if (now - lastUpdateRef.current < 16) return;
                lastUpdateRef.current = now;

                const section = gridRef.current.closest('.bento-section');
                const rect = section?.getBoundingClientRect();
                const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

                if (!mouseInside) {
                    spotlightRef.current.style.opacity = '0';
                    return;
                }

                spotlightRef.current.style.left = `${e.clientX}px`;
                spotlightRef.current.style.top = `${e.clientY}px`;
                spotlightRef.current.style.opacity = '0.6';

                const cards = gridRef.current.querySelectorAll('.card');
                const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);

                cards.forEach(card => {
                    const cardElement = card as HTMLElement;
                    const cardRect = cardElement.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);

                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }

                    const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
                    const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

                    cardElement.style.setProperty('--glow-x', `${relativeX}%`);
                    cardElement.style.setProperty('--glow-y', `${relativeY}%`);
                    cardElement.style.setProperty('--glow-intensity', glowIntensity.toString());
                });
            };

            const handleMouseLeave = () => {
                if (spotlightRef.current) {
                    spotlightRef.current.style.opacity = '0';
                }
            };

            document.addEventListener('mousemove', handleMouseMove, { passive: true });
            document.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
                if (rafRef.current) {
                    cancelAnimationFrame(rafRef.current);
                }
                if (spotlightRef.current && spotlightRef.current.parentNode) {
                    spotlightRef.current.parentNode.removeChild(spotlightRef.current);
                }
            };
        }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

        return null;
    };

const BentoCardGrid: React.FC<{
    children: React.ReactNode;
    gridRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ children, gridRef }) => (
    <div
        className="bento-section grid gap-8 p-8 max-w-[95rem] select-none relative mx-auto"
        style={{ 
            fontSize: 'clamp(1.2rem, 1.1rem + 0.7vw, 1.8rem)',
            background: '#000000'
        }}
        ref={gridRef}
    >
        {children}
    </div>
);

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
    textAutoHide = false,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    enableTilt = true,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    const handleCardClick = (href: string | undefined) => {
        if (href) {
            if (href.startsWith('mailto:')) {
                window.location.href = href;
            } else {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        }
    };

    return (
        <>
            <style>
                {`
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            background: #000000;
          }
          
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 300px;
            --glow-color: ${glowColor};
            --border-color: #333333;
            --background-dark: #000000;
            --white: #ffffff;
            background: #000000;
            min-height: 100vh;
          }
          
          .card-responsive {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            width: 100%;
            padding: 1rem;
          }
          
          @media (max-width: 1024px) {
            .card-responsive {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(${glowColor}, 0.3);
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .icon-hover-effect {
            transition: transform 0.2s ease;
            will-change: transform;
          }
          
          .card:hover .icon-hover-effect {
            transform: scale(1.1);
            filter: drop-shadow(0 0 8px rgba(${glowColor}, 0.5));
          }

          .card-clickable {
            cursor: pointer;
            user-select: none;
            transition: transform 0.2s ease;
            will-change: transform;
          }

          .card-clickable:hover {
            transform: translateY(-4px) scale(1.02);
          }

          .card-clickable:active {
            transform: translateY(-2px) scale(1.01);
          }

          a {
            text-decoration: none;
            color: inherit;
          }

          a:hover {
            text-decoration: none;
          }

          a:focus {
            outline: 2px solid rgba(${glowColor}, 0.8);
            outline-offset: 4px;
            border-radius: 20px;
          }

          button {
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            font: inherit;
            color: inherit;
            text-decoration: none;
            cursor: pointer;
          }

          button:focus {
            outline: 2px solid rgba(${glowColor}, 0.8);
            outline-offset: 4px;
            border-radius: 20px;
          }
        `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={shouldDisableAnimations}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <BentoCardGrid gridRef={gridRef}>
                <div className="card-responsive">
                    {cardData.map((card, index) => {
                        const baseClassName = `card card-clickable flex flex-col justify-between relative w-full h-[400px] p-8 rounded-[20px] border-2 border-solid font-light overflow-hidden transition-all duration-300 ease-in-out ${enableBorderGlow ? 'card--border-glow' : ''}`;

                        const cardStyle = {
                            backgroundColor: card.color || '#000000',
                            borderColor: '#333333',
                            color: '#ffffff',
                            '--glow-x': '50%',
                            '--glow-y': '50%',
                            '--glow-intensity': '0',
                            '--glow-radius': '300px'
                        } as React.CSSProperties;

                        return (
                            <div
                                key={index}
                                className={baseClassName}
                                style={cardStyle}
                                onClick={() => handleCardClick(card.href)}
                            >
                                <div className="card__header flex justify-between items-center gap-4 relative text-gray-300">
                                    <span className="card__label text-xl font-medium">{card.label}</span>
                                    <div className="icon-hover-effect">
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="card__content flex flex-col relative text-white">
                                    <h3 className={`card__title font-bold text-3xl m-0 mb-4 ${textAutoHide ? 'text-clamp-1' : ''}`}>
                                        {card.title}
                                    </h3>
                                    <p className={`card__description text-lg leading-7 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}>
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </BentoCardGrid>
        </>
    );
};

export default MagicBento;