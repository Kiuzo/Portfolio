import React, { CSSProperties, PropsWithChildren, useEffect, useId, useRef } from 'react';

type ElectricBorderProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}>;

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 0.3,
  thickness = 2,
  className,
  style
}) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `electric-${rawId}`;
  const strokeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }
  }, [filterId]);

  const inheritRadius: CSSProperties = {
    borderRadius: style?.borderRadius ?? 'inherit'
  };

  const dur = Math.max(2, 8 / (speed || 1));
  const scale = Math.max(5, 15 * (chaos || 0.3));

  return (
    <div className={'relative isolate ' + (className ?? '')} style={style}>
      <svg
        className="fixed -left-[10000px] -top-[10000px] w-[1px] h-[1px] opacity-0 pointer-events-none"
        aria-hidden
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" seed="1">
              <animate attributeName="baseFrequency" values="0.01;0.02;0.01" dur={`${dur}s`} repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale={scale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
        <div 
          ref={strokeRef}
          className="absolute inset-0 box-border" 
          style={{
            ...inheritRadius,
            border: `${thickness}px solid ${color}`,
            boxShadow: `0 0 ${thickness * 2}px ${color}40`
          }}
        />
      </div>

      <div className="relative" style={inheritRadius}>
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;