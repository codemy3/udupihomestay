# Premium Custom Cursor Usage Guide

## How to Use

- The custom cursor is already globally enabled via the `CustomCursor` component in `layout.tsx`.
- To enable premium effects, use the following attributes/classes in your components:

### Magnetic Attraction
```tsx
<button data-magnetic>Magnetic Button</button>
```

### Custom Text on Hover
```tsx
<div data-cursor-text="VIEW">...</div>
<button data-cursor-text="CLICK">...</button>
<a data-cursor-text="EXPLORE">...</a>
```

### Best Practices
- Use `data-magnetic` for important CTAs.
- Use `data-cursor-text` for images, cards, or links to show custom text.
- Do not overuse magnetic/text effects on every element.
- Keep custom text short (1-2 words).

### Example
```tsx
<button data-magnetic data-cursor-text="BOOK NOW" className="bg-[#849826] text-white px-8 py-4 rounded-lg">
  Reserve Your Stay
</button>
```

## Supported Effects
| Element Type           | Effect Description                                 |
|-----------------------|----------------------------------------------------|
| Normal hover          | Smooth follow                                      |
| `<a>`, `<button>`     | Expands, gold accent, hides dot                    |
| `<img>`               | Expands larger, gold overlay                       |
| `<input>`, `<textarea>` | Medium expansion                                 |
| `data-magnetic`       | Attracts cursor to element center                  |
| `data-cursor-text`    | Shows text, 3x size, gold background               |
| Mouse down            | Shrinks, spring animation                          |
| Mouse up              | Elastic bounce back                                |

## Mobile
- Touch indicator and ripple are automatic on mobile.
- No magnetic or custom text on mobile.

## Customization
- To change the gold color, edit the CSS in `custom-cursor.tsx`.

---

For more details, see the in-code documentation in `custom-cursor.tsx`.
