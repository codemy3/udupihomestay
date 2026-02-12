/**
 * Premium Animation Configuration
 * Inspired by luxury brands (Maison de Lysenne style)
 * Smooth, calm, intentional motion with high-quality easing
 */

// Easing curves for luxury feel
export const easings = {
  // Standard cubic-bezier easing for smooth, premium feel
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // power3.out equivalent
  slower: "cubic-bezier(0.34, 0.1, 0.68, 0.35)", // slow, elegant entrance
  gentle: "cubic-bezier(0.16, 1, 0.3, 1)", // smooth exit
  elegant: "cubic-bezier(0.19, 1, 0.22, 1)", // very smooth
};

// Animation presets for common patterns
export const animationPresets = {
  // Text fade-in + subtle upward movement
  fadeUpText: {
    duration: 0.8,
    easing: easings.smooth,
    stagger: 0.1,
  },

  // Heading fade-in + upward movement (slower for impact)
  fadeUpHeading: {
    duration: 1,
    easing: easings.smooth,
    stagger: 0.12,
  },

  // Image fade-in + subtle scale + slide
  fadeInImage: {
    duration: 1.1,
    easing: easings.smooth,
    delay: 0.1,
  },

  // Button/CTA fade-in + upward
  fadeUpCta: {
    duration: 0.7,
    easing: easings.smooth,
    delay: 0.2,
  },

  // Large section reveal
  fadeUpSection: {
    duration: 1.2,
    easing: easings.smooth,
    stagger: 0.08,
  },
};

// ScrollTrigger configuration
export const scrollTriggerConfig = {
  // When element enters viewport from bottom
  enterFromBottom: {
    start: "top 85%",
    end: "top 50%",
    toggleActions: "play none none reverse",
  },

  // Softer entrance, starts earlier
  earlyEntrance: {
    start: "top 80%",
    end: "top 45%",
    toggleActions: "play none none reverse",
  },

  // For staggered elements in groups
  staggeredStart: {
    start: "top 75%",
    end: "top 30%",
    toggleActions: "play none none reverse",
  },
};

// Common initial states for animations
export const initialStates = {
  // Text elements
  fadeUp: {
    opacity: 0,
    y: 30,
  },

  // Images
  imageSlideIn: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },

  imageFadeScale: {
    opacity: 0,
    scale: 0.95,
  },

  // Horizontal reveals
  slideInLeft: {
    opacity: 0,
    x: -30,
  },

  slideInRight: {
    opacity: 0,
    x: 30,
  },
};

// Final animation states
export const finalStates = {
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
};
