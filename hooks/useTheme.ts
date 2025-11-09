import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [isLight, setIsLight] = useState(false);

  const updateTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      setIsLight(document.documentElement.classList.contains('light'));
    }
  }, []);

  useEffect(() => {
    updateTheme();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some(m => m.attributeName === 'class')) {
        updateTheme();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [updateTheme]);

  // ✅ Filtros AGRESIVOS para garantizar contraste absoluto
  const logoFilter = isLight
    ? 'grayscale(100%) contrast(200%) brightness(60%)'          // Modo claro → Negro intenso
    : 'grayscale(100%) contrast(200%) brightness(200%) invert(1)'; // Modo oscuro → Blanco puro

  return { isLight, logoFilter };
};