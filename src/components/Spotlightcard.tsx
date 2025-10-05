import React, { useRef, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const rectCacheRef = useRef<DOMRect | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const updateSpotlight = useCallback((x: number, y: number) => {
    if (spotlightRef.current) {
      // Usa transform ao invés de recalcular o gradient completo
      spotlightRef.current.style.setProperty('--spotlight-x', `${x}px`);
      spotlightRef.current.style.setProperty('--spotlight-y', `${y}px`);
    }
  }, []);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!divRef.current || isFocusedRef.current) return;

    // Throttle: atualiza no máximo a cada 16ms (~60fps)
    const now = performance.now();
    if (now - lastUpdateRef.current < 16) return;
    lastUpdateRef.current = now;

    // Cancela animação anterior se existir
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Usa requestAnimationFrame para otimizar updates
    rafRef.current = requestAnimationFrame(() => {
      if (!divRef.current) return;
      
      // Cache do rect para evitar reflow
      if (!rectCacheRef.current) {
        rectCacheRef.current = divRef.current.getBoundingClientRect();
      }
      
      const rect = rectCacheRef.current;
      updateSpotlight(e.clientX - rect.left, e.clientY - rect.top);
    });
  }, [updateSpotlight]);

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0.6';
    }
  }, []);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Reseta o cache do rect ao entrar
    rectCacheRef.current = null;
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0.6';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
    // Limpa cache e cancela animações
    rectCacheRef.current = null;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          background: `radial-gradient(circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), ${spotlightColor}, transparent 80%)`,
          willChange: 'opacity'
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;