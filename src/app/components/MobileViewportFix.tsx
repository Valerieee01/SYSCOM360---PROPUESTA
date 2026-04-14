import { useEffect } from 'react';

/**
 * Component to ensure proper mobile viewport configuration
 * This helps fix common mobile preview issues in Figma Make
 */
export function MobileViewportFix() {
  useEffect(() => {
    // Set viewport meta tag
    const setViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, user-scalable=yes, viewport-fit=cover'
      );
    };

    setViewport();

    // Ensure proper body styling
    const ensureBodyStyles = () => {
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.width = '100%';
      document.body.style.overflowX = 'hidden';
      document.body.style.position = 'relative';

      document.documentElement.style.width = '100%';
      document.documentElement.style.overflowX = 'hidden';
    };

    ensureBodyStyles();

    // Handle orientation changes
    const handleOrientationChange = () => {
      setViewport();
      ensureBodyStyles();
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', ensureBodyStyles);

    // Fix iOS Safari address bar issue
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', ensureBodyStyles);
      window.removeEventListener('resize', setVH);
    };
  }, []);

  return null;
}
