'use client';

import React, { ReactNode } from 'react';
import { useSingleScrollReveal } from '@/lib/useScrollReveal';
import { initialStates, finalStates, animationPresets, scrollTriggerConfig } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  preset?: 'fadeUpText' | 'fadeUpHeading' | 'fadeInImage' | 'fadeUpCta' | 'fadeUpSection';
  delay?: number;
  duration?: number;
  easing?: string;
  triggerConfig?: Record<string, any>;
  onAnimationComplete?: () => void;
}

/**
 * ScrollRevealText
 * Wrapper for text elements with fade-up animation
 */
export const ScrollRevealText = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className = '',
      preset = 'fadeUpText',
      delay = 0,
      duration,
      easing,
      triggerConfig = scrollTriggerConfig.enterFromBottom,
    },
    forwardedRef
  ) => {
    const ref = useSingleScrollReveal({
      preset: preset as any,
      initialState: initialStates.fadeUp,
      finalState: finalStates.visible,
      duration: duration || animationPresets[preset]?.duration,
      easing: easing || animationPresets[preset]?.easing,
      delay,
      triggerConfig,
    });

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

ScrollRevealText.displayName = 'ScrollRevealText';

/**
 * ScrollRevealImage
 * Wrapper for image elements with fade-in + subtle scale animation
 */
export const ScrollRevealImage = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className = '',
      preset = 'fadeInImage',
      delay = 0,
      duration,
      easing,
      triggerConfig = scrollTriggerConfig.enterFromBottom,
    },
    forwardedRef
  ) => {
    const ref = useSingleScrollReveal({
      preset: preset as any,
      initialState: initialStates.imageSlideIn,
      finalState: finalStates.visible,
      duration: duration || animationPresets[preset]?.duration,
      easing: easing || animationPresets[preset]?.easing,
      delay,
      triggerConfig,
    });

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

ScrollRevealImage.displayName = 'ScrollRevealImage';

/**
 * ScrollRevealContainer
 * Container for staggered animations of child elements
 * Children with [data-reveal] attribute will be animated in sequence
 */
export const ScrollRevealContainer = React.forwardRef<
  HTMLDivElement,
  Omit<ScrollRevealProps, 'children'> & {
    children: ReactNode;
  }
>(
  (
    {
      children,
      className = '',
      delay = 0,
      duration,
      easing,
      triggerConfig = scrollTriggerConfig.staggeredStart,
    },
    forwardedRef
  ) => {
    const ref = useSingleScrollReveal({
      initialState: initialStates.fadeUp,
      finalState: finalStates.visible,
      duration: duration || 0.8,
      easing: easing || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay,
      triggerConfig,
    });

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

ScrollRevealContainer.displayName = 'ScrollRevealContainer';

/**
 * ScrollRevealButton
 * CTA button with fade-up animation
 */
export const ScrollRevealButton = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className = '',
      delay = 0,
      duration,
      easing,
      triggerConfig = scrollTriggerConfig.enterFromBottom,
    },
    forwardedRef
  ) => {
    const ref = useSingleScrollReveal({
      preset: 'fadeUpCta',
      initialState: initialStates.fadeUp,
      finalState: finalStates.visible,
      duration: duration || animationPresets.fadeUpCta.duration,
      easing: easing || animationPresets.fadeUpCta.easing,
      delay,
      triggerConfig,
    });

    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

ScrollRevealButton.displayName = 'ScrollRevealButton';
