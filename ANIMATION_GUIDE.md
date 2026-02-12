# Premium Animation System Documentation

## Overview

This animation system provides **Maison de Lysenne-style** premium scroll animations for luxury brands:
- Smooth, cinematic scroll-triggered reveals
- Elegant fade-in + subtle upward movement
- High-quality easing (no bouncy or elastic effects)
- Animations trigger **once** when elements enter viewport
- No scrubbed animations (not tightly tied to scroll position)

## Core Files

```
src/
├── lib/
│   ├── animations.ts           # Easing curves, presets, configs
│   └── useScrollReveal.ts     # Core animation hooks
└── components/
    ├── scroll-reveal.tsx         # Basic reveal components
    └── scroll-reveal-advanced.tsx # Advanced patterns
```

## Quick Start

### 1. Text Reveal (Fade Up)

```tsx
import { ScrollRevealText } from '@/components/scroll-reveal';

<ScrollRevealText preset="fadeUpText">
  <p>This text fades in elegantly</p>
</ScrollRevealText>
```

### 2. Heading Reveal (Slower)

```tsx
<ScrollRevealText preset="fadeUpHeading">
  <h1>Luxury Heading</h1>
</ScrollRevealText>
```

### 3. Image Reveal (Scale + Fade)

```tsx
import { ScrollRevealImage } from '@/components/scroll-reveal';

<ScrollRevealImage preset="fadeInImage">
  <img src="/luxury-image.jpg" alt="Luxury" />
</ScrollRevealImage>
```

### 4. Button/CTA Reveal

```tsx
import { ScrollRevealButton } from '@/components/scroll-reveal';

<ScrollRevealButton delay={0.3}>
  <button>Book Now</button>
</ScrollRevealButton>
```

### 5. Staggered List Animation

```tsx
import { StaggeredList } from '@/components/scroll-reveal-advanced';

<StaggeredList 
  itemSelector="[data-reveal]" 
  staggerAmount={0.15}
>
  <div data-reveal>Item 1</div>
  <div data-reveal>Item 2</div>
  <div data-reveal>Item 3</div>
</StaggeredList>
```

## Available Presets

| Preset | Use Case | Duration | Notes |
|--------|----------|----------|-------|
| `fadeUpText` | Paragraphs, labels | 0.8s | Standard text reveal |
| `fadeUpHeading` | H1, H2 headings | 1.0s | Slower for impact |
| `fadeInImage` | Images, media | 1.1s | Subtle scale + fade |
| `fadeUpCta` | Buttons, CTAs | 0.7s | Quick, confident |
| `fadeUpSection` | Large sections | 1.2s | Slow, editorial |

## Custom Configuration

### Override Default Behavior

```tsx
<ScrollRevealText
  preset="fadeUpText"
  duration={1.5}
  delay={0.2}
  easing="cubic-bezier(0.19, 1, 0.22, 1)"
>
  <p>Custom animation</p>
</ScrollRevealText>
```

### Custom Trigger Points

```tsx
import { scrollTriggerConfig } from '@/lib/animations';

<ScrollRevealText 
  triggerConfig={scrollTriggerConfig.earlyEntrance}
>
  <p>Starts animating earlier</p>
</ScrollRevealText>
```

## Animation Philosophy

### ✅ DO

- Keep motion slow and calm
- Use elegant easing (ease-out, cubic-bezier)
- Small movements only (20-30px vertical)
- Fade in + subtle position shift
- Luxury brands move **less**, but with better timing

### ❌ DON'T

- Fast or bouncy animations
- Elastic/spring effects
- Large movement distances
- Scrubbed animations tied to scroll
- Aggressive zooms or rotations

## Easing Curves

```ts
// Available in src/lib/animations.ts
easings.smooth  // Default, most common
easings.slower  // Heavy, impactful elements
easings.gentle  // Soft exits
easings.elegant // Ultra-smooth (best for images)
```

## Common Patterns

### Hero Section

```tsx
<section className="hero">
  <ScrollRevealText preset="fadeUpHeading">
    <h1>Luxury Homestays</h1>
  </ScrollRevealText>
  
  <ScrollRevealText preset="fadeUpText" delay={0.2}>
    <p>Experience elegance</p>
  </ScrollRevealText>
  
  <ScrollRevealButton delay={0.4}>
    <button>Discover</button>
  </ScrollRevealButton>
</section>
```

### About Section with Image

```tsx
<section>
  <div className="grid md:grid-cols-2">
    <div className="content">
      <ScrollRevealText preset="fadeUpText">
        <span className="label">About Us</span>
      </ScrollRevealText>
      
      <ScrollRevealText preset="fadeUpHeading" delay={0.1}>
        <h2>Our Story</h2>
      </ScrollRevealText>
      
      <ScrollRevealText preset="fadeUpText" delay={0.2}>
        <p>Premium hospitality...</p>
      </ScrollRevealText>
    </div>
    
    <ScrollRevealImage preset="fadeInImage">
      <img src="/about.jpg" alt="About" />
    </ScrollRevealImage>
  </div>
</section>
```

### Feature Cards (Staggered)

```tsx
<StaggeredList 
  className="grid grid-cols-3 gap-8"
  itemSelector="[data-reveal]"
  staggerAmount={0.12}
>
  <div data-reveal className="card">Feature 1</div>
  <div data-reveal className="card">Feature 2</div>
  <div data-reveal className="card">Feature 3</div>
</StaggeredList>
```

## Performance Tips

1. **Animations trigger once** - optimized for performance
2. Use `itemSelector` in staggered lists for efficiency
3. Keep delay values reasonable (0.1 - 0.5s)
4. Avoid animating too many elements at once

## Troubleshooting

### Animation not triggering?

- Ensure element is initially off-screen or below viewport
- Check ScrollTrigger start/end points
- Verify element has `ref` or is wrapped in component

### Animation too fast/slow?

```tsx
<ScrollRevealText duration={1.5}> // Adjust duration
  <p>Content</p>
</ScrollRevealText>
```

### Need sequential animations?

```tsx
<ScrollRevealText delay={0}>Item 1</ScrollRevealText>
<ScrollRevealText delay={0.2}>Item 2</ScrollRevealText>
<ScrollRevealText delay={0.4}>Item 3</ScrollRevealText>
```

## Advanced: Custom Hook

```tsx
import { useSingleScrollReveal } from '@/lib/useScrollReveal';
import { initialStates, finalStates } from '@/lib/animations';

function MyComponent() {
  const ref = useSingleScrollReveal({
    initialState: initialStates.fadeUp,
    finalState: finalStates.visible,
    duration: 1.2,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  });
  
  return <div ref={ref}>Custom animation</div>;
}
```

## Examples from Maison de Lysenne

- **Hero text**: Slow fade-up (1s duration)
- **Service cards**: Staggered reveals (0.12s stagger)
- **Images**: Subtle scale (0.95 → 1.0) + fade
- **CTAs**: Quick, confident entrance (0.7s)
- **No scrub**: All animations trigger once, smoothly

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires GSAP 3.x and ScrollTrigger
- Gracefully degrades without JavaScript

---

**Remember**: Luxury is about restraint. Less motion, better timing, elegant easing.
