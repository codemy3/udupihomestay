'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const touchIndicatorRef = useRef<HTMLDivElement>(null);
  const touchRippleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const outerEl = outerRef.current;
    const innerEl = innerRef.current;
    const touchIndicatorEl = touchIndicatorRef.current;
    const touchRippleEl = touchRippleRef.current;
    
    if (!outerEl || !innerEl) return;

    if (isMobile) {
      // MOBILE: Touch-based cursor indicator
      let touchX = 0;
      let touchY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          touchX = touch.clientX;
          touchY = touch.clientY;

          if (touchIndicatorEl) {
            // Show touch indicator with smooth fade in
            gsap.to(touchIndicatorEl, {
              x: touchX,
              y: touchY,
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            });
          }

          if (touchRippleEl) {
            // Create ripple effect
            gsap.set(touchRippleEl, {
              x: touchX,
              y: touchY,
              xPercent: -50,
              yPercent: -50,
              opacity: 0.6,
              scale: 0,
            });
            gsap.to(touchRippleEl, {
              scale: 1,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
            });
          }
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          touchX = touch.clientX;
          touchY = touch.clientY;

          if (touchIndicatorEl) {
            gsap.to(touchIndicatorEl, {
              x: touchX,
              y: touchY,
              xPercent: -50,
              yPercent: -50,
              duration: 0.1,
              overwrite: true,
            });
          }
        }
      };

      const handleTouchEnd = () => {
        if (touchIndicatorEl) {
          gsap.to(touchIndicatorEl, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: 'power2.in',
          });
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('resize', checkMobile);
      };
    } else {
      // DESKTOP: Traditional mouse cursor
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Inner dot follows immediately
        gsap.to(innerEl, {
          x: mouseX,
          y: mouseY,
          xPercent: -50,
          yPercent: -50,
          duration: 0,
          overwrite: true,
        });

        // Outer ring follows with smooth delay
        gsap.to(outerEl, {
          x: mouseX,
          y: mouseY,
          xPercent: -50,
          yPercent: -50,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
        });
      };

      const handleMouseDown = () => {
        gsap.to(outerEl, {
          scale: 0.8,
          duration: 0.2,
          overwrite: 'auto',
        });
        gsap.to(innerEl, {
          scale: 0.8,
          duration: 0.2,
          overwrite: 'auto',
        });
      };

      const handleMouseUp = () => {
        gsap.to(outerEl, {
          scale: 1,
          duration: 0.3,
          overwrite: 'auto',
        });
        gsap.to(innerEl, {
          scale: 1,
          duration: 0.3,
          overwrite: 'auto',
        });
      };

      const handleOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        if (target.closest('a,button,input,textarea')) {
          gsap.to(outerEl, {
            scale: 1.5,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(innerEl, {
            scale: 0.5,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      const handleOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        if (target.closest('a,button,input,textarea')) {
          gsap.to(outerEl, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          gsap.to(innerEl, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseover', handleOver);
      document.addEventListener('mouseout', handleOut);

      // Initialize position at center and make visible
      gsap.set([outerEl, innerEl], {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
      });

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseover', handleOver);
        document.removeEventListener('mouseout', handleOut);
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isMobile]);

  return (
    <>
      {/* Desktop Cursor - Dual Circle with Smooth Trail */}
      <div ref={outerRef} className="cursor-outer hidden md:block" />
      <div ref={innerRef} className="cursor-inner hidden md:block" />

      {/* Mobile Touch Indicator */}
      <div ref={touchIndicatorRef} className="touch-indicator md:hidden" />
      
      {/* Mobile Touch Ripple Effect */}
      <div ref={touchRippleRef} className="touch-ripple md:hidden" />
    </>
  );
}
