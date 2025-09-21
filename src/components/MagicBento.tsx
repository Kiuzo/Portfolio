import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

export interface BentoCardProps {
    color?: string;
    title?: string;
    description?: string;
    label?: string;
    textAutoHide?: boolean;
    disableAnimations?: boolean;
    icon?: React.ReactNode;
    href?: string;
}

export interface BentoProps {
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    enableTilt?: boolean;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 15;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '255, 255, 255';
const MOBILE_BREAKPOINT = 768;

// AQUI É ONDE VOCÊ CONFIGURA SEUS LINKS!
const cardData: BentoCardProps[] = [
    {
        color: '#000000',
        title: 'GitHub',
        description: 'Veja os meus trabalhos',
        label: 'GitHub',
        icon: <Github size={32} className="text-white" />,
        href: 'https://github.com/kiuzo' // Substitua pelo seu GitHub
    },
    {
        color: '#111111',
        title: 'Email',
        description: 'Envie uma mensagem no meu email.',
        label: 'Email',
        icon: <Mail size={32} className="text-white" />,
        href: 'mailto:david.soares2411@gmail.com' // Substitua pelo seu email
    },
    {
        color: '#1a1a1a',
        title: 'LinkedIn',
        description: 'Meu perfil no linkedin',
        label: 'LinkedIn',
        icon: <Linkedin size={32} className="text-white" />,
        href: 'https://www.linkedin.com/in/david-soares-lopes/' // Substitua pelo seu LinkedIn
    }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 10px rgba(${color}, 0.8);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
    transition: all 0.3s ease;
  `;
    return el;
};

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    disableClickHandling?: boolean;
}> = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false,
    disableClickHandling = false
}) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const particlesRef = useRef<HTMLDivElement[]>([]);
        const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
        const isHoveredRef = useRef(false);
        const memoizedParticles = useRef<HTMLDivElement[]>([]);
        const particlesInitialized = useRef(false);
        const animationFrameRef = useRef<number[]>([]);

        const initializeParticles = useCallback(() => {
            if (particlesInitialized.current || !cardRef.current) return;

            const { width, height } = cardRef.current.getBoundingClientRect();
            memoizedParticles.current = Array.from({ length: particleCount }, () =>
                createParticleElement(Math.random() * width, Math.random() * height, glowColor)
            );
            particlesInitialized.current = true;
        }, [particleCount, glowColor]);

        const clearAllParticles = useCallback(() => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
            animationFrameRef.current.forEach(cancelAnimationFrame);
            animationFrameRef.current = [];

            particlesRef.current.forEach(particle => {
                particle.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
                particle.style.transform = 'scale(0)';
                particle.style.opacity = '0';
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 300);
            });
            particlesRef.current = [];
        }, []);

        const animateParticles = useCallback(() => {
            if (!cardRef.current || !isHoveredRef.current) return;

            if (!particlesInitialized.current) {
                initializeParticles();
            }

            memoizedParticles.current.forEach((particle, index) => {
                const timeoutId = setTimeout(() => {
                    if (!isHoveredRef.current || !cardRef.current) return;

                    const clone = particle.cloneNode(true) as HTMLDivElement;
                    cardRef.current.appendChild(clone);
                    particlesRef.current.push(clone);

                    // Initial animation
                    clone.style.transform = 'scale(0)';
                    clone.style.opacity = '0';
                    clone.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
                    
                    setTimeout(() => {
                        clone.style.transform = 'scale(1)';
                        clone.style.opacity = '1';
                    }, 10);

                    // Floating animation
                    const startX = parseFloat(clone.style.left);
                    const startY = parseFloat(clone.style.top);
                    let startTime: number;

                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const elapsed = currentTime - startTime;
                        const progress = (elapsed % 3000) / 3000; // 3 second cycle

                        const x = startX + Math.sin(progress * Math.PI * 2) * 75;
                        const y = startY + Math.cos(progress * Math.PI * 2) * 75;
                        const rotation = progress * 360;
                        const opacity = 0.5 + Math.sin(progress * Math.PI * 4) * 0.3;

                        clone.style.left = `${x}px`;
                        clone.style.top = `${y}px`;
                        clone.style.transform = `rotate(${rotation}deg)`;
                        clone.style.opacity = opacity.toString();

                        if (isHoveredRef.current && clone.parentNode) {
                            const frameId = requestAnimationFrame(animate);
                            animationFrameRef.current.push(frameId);
                        }
                    };

                    const frameId = requestAnimationFrame(animate);
                    animationFrameRef.current.push(frameId);
                }, index * 80);

                timeoutsRef.current.push(timeoutId);
            });
        }, [initializeParticles]);

        useEffect(() => {
            if (disableAnimations || !cardRef.current) return;

            const element = cardRef.current;

            const handleMouseEnter = () => {
                isHoveredRef.current = true;
                animateParticles();

                if (enableTilt) {
                    element.style.transition = 'transform 0.3s ease-out';
                    element.style.transform = 'perspective(1000px) rotateX(3deg) rotateY(3deg)';
                }
            };

            const handleMouseLeave = () => {
                isHoveredRef.current = false;
                clearAllParticles();

                if (enableTilt) {
                    element.style.transition = 'transform 0.3s ease-out';
                    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
                }

                if (enableMagnetism) {
                    element.style.transition = 'transform 0.3s ease-out';
                    element.style.transform = 'translate(0px, 0px)';
                }
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableTilt && !enableMagnetism) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -8;
                    const rotateY = ((x - centerX) / centerX) * 8;

                    element.style.transition = 'transform 0.1s ease-out';
                    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }

                if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.03;
                    const magnetY = (y - centerY) * 0.03;

                    element.style.transition = 'transform 0.3s ease-out';
                    element.style.transform = `translate(${magnetX}px, ${magnetY}px)`;
                }
            };

            const handleClick = (e: MouseEvent) => {
                if (!clickEffect || disableClickHandling) return;

                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const maxDistance = Math.max(
                    Math.hypot(x, y),
                    Math.hypot(x - rect.width, y),
                    Math.hypot(x, y - rect.height),
                    Math.hypot(x - rect.width, y - rect.height)
                );

                const ripple = document.createElement('div');
                ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.6) 0%, rgba(${glowColor}, 0.3) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
        transform: scale(0);
        opacity: 1;
        transition: transform 1s ease-out, opacity 1s ease-out;
      `;

                element.appendChild(ripple);

                setTimeout(() => {
                    ripple.style.transform = 'scale(1)';
                    ripple.style.opacity = '0';
                }, 10);

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 1000);
            };

            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
            element.addEventListener('mousemove', handleMouseMove);
            element.addEventListener('click', handleClick);

            return () => {
                isHoveredRef.current = false;
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
                element.removeEventListener('mousemove', handleMouseMove);
                element.removeEventListener('click', handleClick);
                clearAllParticles();
            };
        }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, disableClickHandling]);

        return (
            <div
                ref={cardRef}
                className={`${className} relative overflow-hidden`}
                style={{ ...style, position: 'relative', overflow: 'hidden' }}
            >
                {children}
            </div>
        );
    };

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
        const isInsideSection = useRef(false);

        useEffect(() => {
            if (disableAnimations || !gridRef?.current || !enabled) return;

            const spotlight = document.createElement('div');
            spotlight.className = 'global-spotlight';
            spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.2) 0%,
        rgba(${glowColor}, 0.1) 15%,
        rgba(${glowColor}, 0.05) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      transition: all 0.3s ease-out;
    `;
            document.body.appendChild(spotlight);
            spotlightRef.current = spotlight;

            const handleMouseMove = (e: MouseEvent) => {
                if (!spotlightRef.current || !gridRef.current) return;

                const section = gridRef.current.closest('.bento-section');
                const rect = section?.getBoundingClientRect();
                const mouseInside =
                    rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

                isInsideSection.current = mouseInside || false;
                const cards = gridRef.current.querySelectorAll('.card');

                if (!mouseInside) {
                    spotlightRef.current.style.opacity = '0';
                    cards.forEach(card => {
                        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                    });
                    return;
                }

                const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
                let minDistance = Infinity;

                cards.forEach(card => {
                    const cardElement = card as HTMLElement;
                    const cardRect = cardElement.getBoundingClientRect();
                    const centerX = cardRect.left + cardRect.width / 2;
                    const centerY = cardRect.top + cardRect.height / 2;
                    const distance =
                        Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                    const effectiveDistance = Math.max(0, distance);

                    minDistance = Math.min(minDistance, effectiveDistance);

                    let glowIntensity = 0;
                    if (effectiveDistance <= proximity) {
                        glowIntensity = 1;
                    } else if (effectiveDistance <= fadeDistance) {
                        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                    }

                    updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
                });

                spotlightRef.current.style.left = `${e.clientX}px`;
                spotlightRef.current.style.top = `${e.clientY}px`;

                const targetOpacity =
                    minDistance <= proximity
                        ? 0.8
                        : minDistance <= fadeDistance
                            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                            : 0;

                spotlightRef.current.style.opacity = targetOpacity.toString();
            };

            const handleMouseLeave = () => {
                isInsideSection.current = false;
                gridRef.current?.querySelectorAll('.card').forEach(card => {
                    (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
                if (spotlightRef.current) {
                    spotlightRef.current.style.opacity = '0';
                }
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseleave', handleMouseLeave);
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
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = true,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = true
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    // Função para lidar com cliques nos cards
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
            padding: 3px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 1)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.8), 0 0 50px rgba(${glowColor}, 0.4);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: rgba(${glowColor}, 0.4);
            border-radius: 50%;
            z-index: -1;
          }
          
          .particle-container:hover {
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(${glowColor}, 0.4);
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
            transition: all 0.3s ease;
          }
          
          .card:hover .icon-hover-effect {
            transform: scale(1.1);
            filter: drop-shadow(0 0 10px rgba(${glowColor}, 0.6));
          }

          .card-clickable {
            cursor: pointer;
            user-select: none;
          }

          .card-clickable:hover {
            transform: translateY(-8px) scale(1.05);
          }

          .card-clickable:active {
            transform: translateY(-4px) scale(1.02);
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

                        if (enableStars) {
                            return (
                                <ParticleCard
                                    key={index}
                                    className={baseClassName}
                                    style={cardStyle}
                                    disableAnimations={shouldDisableAnimations}
                                    particleCount={particleCount}
                                    glowColor={glowColor}
                                    enableTilt={enableTilt}
                                    clickEffect={false}
                                    enableMagnetism={enableMagnetism}
                                    disableClickHandling={true}
                                >
                                    <div 
                                        className="w-full h-full flex flex-col justify-between cursor-pointer"
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
                                            <p
                                                className={`card__description text-lg leading-7 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}
                                            >
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </ParticleCard>
                            );
                        }

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