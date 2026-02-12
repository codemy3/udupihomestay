# Premium Hero Section - Animation & Customization Guide

## Overview

This hero section is built with **GSAP 3** for luxury-grade animations, featuring:
- Staggered text reveals with soft easing
- Scroll-triggered parallax effects
- Auto-rotating facilities carousel
- Production-ready animations with smooth performance

---

## 🎬 Animation Breakdown

### Entry Animations (On Page Load)

All animations use GSAP timeline with staggered delays:

```typescript
// Animation Timing (adjustable in hero-section.tsx)
const tl = gsap.timeline();

// 1. Background Image (0s start)
// - Scales from 1.08 → 1 (subtle zoom-out)
// - Fades in from transparent
// Duration: 1.4s | Easing: power2.inOut

// 2. Headline Lines (0s start, staggered)
// - Y translate: 60px → 0
// - Opacity: 0 → 1
// Duration: 1.2s | Easing: power3.out | Stagger: 0.15s between lines

// 3. Subheadline (0.3s start)
// - Y translate: 40px → 0
// - Opacity: 0 → 1
// Duration: 1s | Easing: power2.out

// 4. Description (0.5s start)
// - Y translate: 30px → 0
// - Opacity: 0 → 1
// Duration: 1s | Easing: power2.out

// 5. Button (0.7s start)
// - Y translate: 20px → 0
// - Opacity: 0 → 1
// Duration: 0.9s | Easing: power2.out

// 6. Carousel (0.4s start)
// - X translate: 60px → 0
// - Opacity: 0 → 1
// Duration: 1.1s | Easing: power3.out

// 7. Signature Text (0.8s start)
// - Opacity: 0 → 0.08 (very subtle)
// Duration: 1.2s | Easing: power2.out
```

### Scroll-Triggered Animations

As user scrolls past the hero:

```typescript
// Headline text Motion
gsap.to(headlineText, {
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.5, // Smooth scroll link
  },
  y: -100, // Moves up
  opacity: 0.3, // Fades
});

// Background Image Parallax
gsap.to(bgImageRef.current, {
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: 1, // Slower parallax
  },
  y: 80, // Moves down (counter to scroll)
});
```

---

## ⚙️ Customization

### Adjust Entry Animation Timing

Edit these values in `hero-section.tsx` (lines 52-100):

```typescript
// Change stagger delay between text lines (currently 0.15s)
stagger: 0.15, // ← Increase for slower reveal, decrease for faster

// Change headline duration (currently 1.2s)
duration: 1.2, // ← Adjust overall speed

// Change easing curve
ease: 'power3.out', // ← Options:
// - power1.out (fastest ease)
// - power2.out (smooth)
// - power3.out (slow, luxurious) ← RECOMMENDED
// - expo.out (very slow)
```

### Adjust Carousel Rotation Speed

Edit line 28 in `hero-section.tsx`:

```typescript
}, 4000); // ← Time in milliseconds between slides
// 4000ms = 4 seconds
// Increase for slower rotation, decrease for faster
```

### Adjust Carousel Slide Transition Speed

Edit line 346:

```typescript
className="flex transition-transform duration-1000"
```

Change `duration-1000` to:
- `duration-700` = 0.7s (faster)
- `duration-1000` = 1s (current - recommended)
- `duration-1500` = 1.5s (slower)

### Adjust Scroll Parallax Intensity

Edit lines 80-95:

```typescript
// Headline scroll effect
y: -100, // ← Negative = moves up | Change to -50 for subtle, -150 for dramatic
scrub: 0.5, // ← 0 = instant, 0.5 = smooth, 1 = very smooth

// Background parallax
y: 80, // ← Positive = moves down | Adjust for parallax intensity
scrub: 1, // ← Higher numbers = smoother, delayed response
```

---

## 🎨 Easing Curve Reference

For luxury/premium feel, use these easings:

| Easing | Speed | Feel | Best For |
|--------|-------|------|----------|
| `power2.out` | Medium | Smooth, elegant | Subtle animations |
| `power3.out` | Slow | Luxurious, refined | Main reveals |
| `expo.out` | Very Slow | Premium, cinematic | Hero headlines |
| `power1.out` | Fast | Quick, responsive | Hover states |

**Note:** Avoid `ease-out` or `power0` – too harsh for luxury design.

---

## 🖱️ Button Hover Effects

The button uses CSS transitions:

```typescript
className="group relative... transition-all duration-700"
```

On hover:
- Border opacity increases
- Subtle background appears
- Icon nudges right

To make hover more dramatic:

```typescript
// Change to duration-500 for snappier response
// Change to duration-1000 for slower feel
```

---

## 📱 Responsive Breakpoints

The hero adjusts automatically:

- **Mobile** (`< 768px`): Single column
- **Tablet** (`768px - 1024px`): 2-column layout
- **Desktop** (`> 1024px`): Full 2-column with spacing

Text sizes also scale:
- Headline: 6xl → 7xl → 8xl → 9xl (mobile to desktop)
- Subheadline: 3xl → 4xl → 5xl

---

## 🔧 Performance Tips

1. **GSAP Timeline is optimized** – All animations batch together for GPU acceleration
2. **ScrollTrigger uses `scrub`** – For buttery-smooth scroll linking
3. **No animations on first paint** – Prevents layout shift
4. **GPU-optimized properties** – Uses transform/opacity only (no layout triggers)

---

## 🎯 Animation Behavior Summary

| Element | Duration | Easing | Delay | Effect |
|---------|----------|--------|-------|--------|
| Background | 1.4s | power2.inOut | 0s | Scale + Fade |
| Headline (Line 1) | 1.2s | power3.out | 0s | Slide Up |
| Headline (Line 2) | 1.2s | power3.out | 0.15s | Slide Up |
| Subheadline | 1s | power2.out | 0.3s | Slide Up |
| Description | 1s | power2.out | 0.5s | Slide Up |
| Button | 0.9s | power2.out | 0.7s | Slide Up |
| Carousel | 1.1s | power3.out | 0.4s | Slide Right |
| Signature | 1.2s | power2.out | 0.8s | Fade In |

---

## 🚀 Production Checklist

- ✅ GSAP animations are performant
- ✅ ScrollTrigger properly implemented
- ✅ No layout shifts or jank
- ✅ Responsive on all devices
- ✅ Accessibility maintained (aria-labels on buttons)
- ✅ Images optimized and loaded
- ✅ No console errors

---

## 📝 Code Structure

```
hero-section.tsx
├── State & Effects
│   ├── currentSlide state
│   └── useEffect hooks (entry + scroll animations)
├── Template (JSX)
│   ├── Background image + overlay
│   ├── Signature text overlay
│   ├── Left content (text + button)
│   ├── Right carousel
│   └── Scroll indicator
└── Styles
    ├── Tailwind classes
    └── Inline GSAP animations
```

---

## 💡 Tips for Further Enhancement

1. **Add cursor tracking** – Mouse position affects parallax intensity
2. **Add blur effect on scroll** – Background image blurs as user scrolls
3. **Add lenis.js** – For ultra-smooth scroll behavior
4. **Add more carousel images** – Current: 3 images
5. **Add text reveal animation** – Word-by-word instead of line-by-line
6. **Add color shifts** – Gradient overlay changes on scroll
7. **Add click-to-pause carousel** – Let users interact with carousel

---

## 🐛 Troubleshooting

**Animations not playing?**
- Check browser console for GSAP errors
- Ensure GSAP is imported correctly
- Check ScrollTrigger is registered

**Carousel not rotating?**
- Check `setCurrentSlide` timer is running
- Verify image paths are correct (.webp format)

**Scroll parallax feels jerky?**
- Increase `scrub` value (0.5 → 1)
- Reduce parallax `y` value for subtle effect

**Text appears cut off on mobile?**
- Check viewport width
- Adjust padding/spacing in mobile breakpoints
- Test with multiple devices

---

**Questions? Check the prop definitions in `hero-section.tsx` for detailed comments.**
