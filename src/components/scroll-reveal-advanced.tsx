'use client';

import React, { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  scrollTriggerConfig,
  initialStates,
  finalStates,
  easings,
} from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   STAGGERED LIST
   - One ScrollTrigger per section
   - Clean stagger
   - Safe cleanup with GSAP context
===================================================== */

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  delay?: number;
  duration?: number;
  staggerAmount?: number;
}

export const StaggeredList = React.forwardRef<
  HTMLDivElement,
  StaggerListProps
>(
  (
    {
      children,
      className = '',
      itemSelector = '[data-reveal]',
      delay = 0,
      duration = 0.8,
      staggerAmount = 0.15,
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(
          containerRef.current!.querySelectorAll(itemSelector)
        );

        if (!items.length) return;

        gsap.fromTo(
          items,
          initialStates.fadeUp,
          {
            ...finalStates.visible,
            duration,
            ease: easings.smooth,
            stagger: staggerAmount,
            delay,
            scrollTrigger: {
              trigger: containerRef.current,
              ...scrollTriggerConfig.enterFromBottom,
              once: true,
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }, [itemSelector, delay, duration, staggerAmount]);

    return (
      <div ref={ref || containerRef} className={className}>
        {children}
      </div>
    );
  }
);

StaggeredList.displayName = 'StaggeredList';

/* =====================================================
   PARALLAX IMAGE
   - Subtle luxury parallax
   - Calm scrub
   - Context-safe
===================================================== */

export const ParallaxImage = React.forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    className?: string;
    offset?: number;
  }
>(({ children, className = '', offset = 40 }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const image = containerRef.current!.querySelector('img');
      if (!image) return;

      gsap.to(image, {
        y: offset,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.25, // luxury pacing
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [offset]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
});

ParallaxImage.displayName = 'ParallaxImage';

/* =====================================================
   TEXT REVEAL
   - Word-by-word reveal
   - Safe GSAP context
   - No global trigger kills
===================================================== */

export const TextReveal = React.forwardRef<
  HTMLDivElement,
  {
    text: string;
    className?: string;
    mode?: 'word' | 'line';
    delay?: number;
  }
>(({ text, className = '', mode = 'word', delay = 0 }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = text.split(' ');
      const html = words
        .map(
          (word) =>
            `<span data-reveal style="display:inline-block;overflow:hidden">
              <span style="display:inline-block">${word}</span>
            </span>`
        )
        .join(' ');

      containerRef.current!.innerHTML = html;

      const spans = containerRef.current!.querySelectorAll('[data-reveal]');

      spans.forEach((span, index) => {
        const inner = span.querySelector('span');
        if (!inner) return;

        gsap.fromTo(
          inner,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: easings.smooth,
            delay: delay + index * 0.05,
            scrollTrigger: {
              trigger: containerRef.current,
              ...scrollTriggerConfig.earlyEntrance,
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, mode, delay]);

  return <div ref={containerRef} className={className} />;
});

TextReveal.displayName = 'TextReveal';
