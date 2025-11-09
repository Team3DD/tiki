"use client";

import { memo } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface SharedLogoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const SharedLogo = memo(({
  src,
  alt,
  width = 200,
  height = 200,
  className = '',
  priority = false,
}: SharedLogoProps) => {
  const { logoFilter } = useTheme();

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      style={{ 
        filter: logoFilter,
        maxWidth: '100%',
        maxHeight: '100%',
      }}
      onError={(e) => {
        const target = e.currentTarget;
        target.src = '/logo.svg';
      }}
    />
  );
});

SharedLogo.displayName = 'SharedLogo';