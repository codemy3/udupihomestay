'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  animationPresets,
  scrollTriggerConfig,
  initialStates,
  finalStates,
} from './animations';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  preset?: keyof typeof animationPresets;
  initialState?: Record<string, any>;
  finalState?: Record<string, any>;
  duration?: number;
  easing?: string;
  delay?: number;
  stagger?: number | false;
  triggerConfig?: Record<string, any>;
  onComplete?: () => void;
}

/**
 * useScrollReveal Hook
 * Applies elegant, premium scroll-triggered animations to elements
 * 
 * Usage:
 * const ref = useScrollReveal({ preset: 'fadeUpText' });
 * <div ref={ref}>Content</div>
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const {
      preset = 'fadeUpText',
      initialState = initialStates.fadeUp,
      finalState = finalStates.visible,
      duration = animationPresets[preset]?.duration || 0.8,
      easing = animationPresets[preset]?.easing || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay = 0,
      stagger = 0,
      triggerConfig = scrollTriggerConfig.enterFromBottom,
      onComplete,
    } = options;

    const timeline = gsap.timeline();

    refs.current.forEach((el, index) => {
      if (!el) return;

      const elementDelay = stagger ? index * stagger : delay;

      gsap.fromTo(
        el,
        initialState,
        {
          ...finalState,
          duration,
          ease: easing,
          delay: elementDelay,
          scrollTrigger: {
            trigger: el,
            ...triggerConfig,
            once: true, // Animation plays only once
          },
          onComplete: index === refs.current.length - 1 ? onComplete : undefined,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (el: HTMLElement | null) => {
    refs.current.push(el);
  };
}

/**
 * useSingleScrollReveal Hook
 * For animating a single element
 */
export function useSingleScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      initialState = initialStates.fadeUp,
      finalState = finalStates.visible,
      duration = animationPresets[options.preset || 'fadeUpText']?.duration || 0.8,
      easing = options.easing || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay = options.delay || 0,
      triggerConfig = scrollTriggerConfig.enterFromBottom,
    } = options;

    gsap.fromTo(
      ref.current,
      initialState,
      {
        ...finalState,
        duration,
        ease: easing,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          ...triggerConfig,
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [options]);

  return ref;
}
