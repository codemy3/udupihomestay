import { useEffect, useState } from 'react';

/**
 * SSR-safe hook for mobile device detection.
 * Initializes to false (desktop) to prevent hydration mismatches,
 * then updates after client hydration.
 * @param breakpoint - Width threshold (default: 768)
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check actual window size after hydration
    const checkMobile = () => {
      setIsMobile(
        typeof window !== 'undefined' &&
        (window.innerWidth < breakpoint ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ))
      );
    };

    // First check
    checkMobile();
    setIsHydrated(true);

    // Listen for resize
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  // Return safe value (false) until hydrated, then actual value
  return isHydrated ? isMobile : false;
}
