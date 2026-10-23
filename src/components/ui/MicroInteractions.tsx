import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  strength = 0.22,
  ariaLabel,
  type = 'button',
  disabled = false,
  cursorLabel,
}) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setOffset({
      x: Math.max(-10, Math.min(10, deltaX)),
      y: Math.max(-8, Math.min(8, deltaY)),
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.5 }}
      className={`focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8202A] ${className}`}
    >
      {children}
    </motion.button>
  );
};

interface TiltSurfaceProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  cursorLabel?: string;
  onClick?: () => void;
}

export const TiltSurface: React.FC<TiltSurfaceProps> = ({
  children,
  className = '',
  maxTilt = 4.5,
  cursorLabel,
  onClick,
}) => {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [styleState, setStyleState] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    hovering: false,
  });

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;
    setStyleState({
      rotateX,
      rotateY,
      glareX: px * 100,
      glareY: py * 100,
      hovering: true,
    });
  };

  const handlePointerLeave = () => {
    setStyleState((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      hovering: false,
    }));
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      data-cursor={cursorLabel}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{
        transform: prefersReduced
          ? undefined
          : `perspective(1200px) rotateX(${styleState.rotateX.toFixed(2)}deg) rotateY(${styleState.rotateY.toFixed(2)}deg)`,
        transition: styleState.hovering
          ? 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}
      {!prefersReduced && (
        <div
          aria-hidden="true"
          style={{
            opacity: styleState.hovering ? 0.38 : 0,
            background: `radial-gradient(circle at ${styleState.glareX}% ${styleState.glareY}%, rgba(255,255,255,0.85) 0%, rgba(184,32,42,0.10) 35%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        />
      )}
    </div>
  );
};

interface MaskTextRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

export const MaskTextReveal: React.FC<MaskTextRevealProps> = ({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  as = 'h2',
}) => {
  const prefersReduced = useReducedMotion();
  const Tag = as;

  return (
    <Tag className={className}>
      {lines.map((line, idx) => (
        <span key={idx} className={`block overflow-hidden pb-[0.08em] ${lineClassName}`}>
          <motion.span
            className="block"
            initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: '105%' }}
            whileInView={{ opacity: 1, y: '0%' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.85,
              delay: delay + idx * 0.11,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[#B8202A] via-[#961923] to-[#B8202A]"
    />
  );
};

export const LuxuryDesktopCursor: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(media.matches);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const cursorHost = target?.closest?.('[data-cursor]') as HTMLElement | null;
      if (cursorHost) {
        const val = cursorHost.getAttribute('data-cursor');
        setLabel(val || null);
      } else {
        setLabel(null);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [prefersReduced]);

  if (!enabled || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      animate={{
        x: pos.x - (label ? 36 : 12),
        y: pos.y - (label ? 36 : 12),
        width: label ? 72 : 24,
        height: label ? 72 : 24,
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.35 }}
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden lg:flex items-center justify-center rounded-full border border-[#B8202A]/70 bg-[#FDFDFD]/75 backdrop-blur-md shadow-sm"
    >
      {label ? (
        <span className="font-tech text-[9px] font-medium tracking-[0.16em] text-[#303033] uppercase">
          {label}
        </span>
      ) : (
        <span className="h-1 w-1 rounded-full bg-[#B8202A]" />
      )}
    </motion.div>
  );
};
