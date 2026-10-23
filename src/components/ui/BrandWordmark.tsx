import React from 'react';
import { BrandId } from '../../data/catalogData';

interface BrandWordmarkProps {
  brandId: BrandId;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  brandId,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl md:text-4xl',
  }[size];

  switch (brandId) {
    case 'boat':
      return (
        <span
          className={`inline-flex items-baseline font-sans-precision font-bold tracking-[-0.04em] select-none ${sizeClasses} ${className}`}
          aria-label="boAt"
        >
          <span>bo</span>
          <span className="relative inline-block text-[#B8202A]">
            A
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#B8202A] rounded-full"
            />
          </span>
          <span>t</span>
        </span>
      );

    case 'portronics':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-sans-precision font-semibold uppercase tracking-[0.16em] select-none ${
            size === 'lg' ? 'text-2xl md:text-3xl' : size === 'md' ? 'text-base' : 'text-xs'
          } ${className}`}
          aria-label="Portronics"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#B8202A]" aria-hidden="true" />
          <span>PORTRONICS</span>
        </span>
      );

    case 'zebronics':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-sans-precision font-bold uppercase tracking-[0.2em] select-none ${
            size === 'lg' ? 'text-2xl md:text-3xl' : size === 'md' ? 'text-base' : 'text-xs'
          } ${className}`}
          aria-label="Zebronics"
        >
          <span className="inline-flex flex-col gap-[2px]" aria-hidden="true">
            <span className="block h-[1.5px] w-3 bg-[#303033]" />
            <span className="block h-[1.5px] w-2.5 bg-[#B8202A]" />
            <span className="block h-[1.5px] w-3 bg-[#303033]" />
          </span>
          <span>ZEBRONICS</span>
        </span>
      );

    case 'boult':
      return (
        <span
          className={`inline-flex items-center gap-1 font-sans-precision font-extrabold uppercase tracking-[0.22em] select-none ${
            size === 'lg' ? 'text-2xl md:text-3xl' : size === 'md' ? 'text-base' : 'text-xs'
          } ${className}`}
          aria-label="Boult"
        >
          <span>BOULT</span>
          <span className="font-tech text-[0.55em] font-normal tracking-[0.1em] text-[#777271] align-super">
            AUDIO
          </span>
        </span>
      );

    case 'hikvision':
      return (
        <span
          className={`inline-flex items-center font-sans-precision font-bold uppercase tracking-[0.15em] select-none ${
            size === 'lg' ? 'text-2xl md:text-3xl' : size === 'md' ? 'text-base' : 'text-xs'
          } ${className}`}
          aria-label="Hikvision"
        >
          <span className="text-[#B8202A]">HIK</span>
          <span className="font-medium text-[#303033]">VISION</span>
        </span>
      );

    case 'bombay-shaving-company':
      return (
        <span
          className={`inline-flex flex-col leading-[1.02] font-editorial font-semibold uppercase tracking-[0.12em] select-none ${
            size === 'lg' ? 'text-xl md:text-2xl' : size === 'md' ? 'text-sm' : 'text-[11px]'
          } ${className}`}
          aria-label="Bombay Shaving Company"
        >
          <span>Bombay Shaving</span>
          <span className="font-tech text-[0.58em] tracking-[0.28em] text-[#777271]">
            COMPANY
          </span>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center font-tech uppercase tracking-[0.18em] text-xs ${className}`}
        >
          COMMERCIAL HARDWARE
        </span>
      );
  }
};
