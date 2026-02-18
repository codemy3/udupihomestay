"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface CinematicGalleryProps {
  images: string[];
  title: string;
}

const ROOM_LABELS = ["Front View", "Hall", "Kitchen", "Bedroom", "Play Area"];

// ─── Easing ───────────────────────────────────────────────────────────────────
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

// ─── Auto-scroll row ──────────────────────────────────────────────────────────
function ScrollRow({
  items,
  direction,
  speed,
  rowIndex,
}: {
  items: { src: string }[];
  direction: "left" | "right";
  speed: number;
  rowIndex: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(direction === "right" ? -9999 : 0);
  const rafRef = useRef(0);
  const tripled = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const unit = el.scrollWidth / 4;
    if (direction === "right") posRef.current = -unit;

    const tick = () => {
      if (direction === "left") {
        posRef.current -= speed;
        if (Math.abs(posRef.current) >= unit) posRef.current = 0;
      } else {
        posRef.current += speed;
        if (posRef.current >= 0) posRef.current = -unit;
      }
      if (el) el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div style={{ overflow: "hidden", width: "100%", flexShrink: 0 }}>
      <div ref={rowRef} style={{ display: "flex", gap: 6, width: "max-content", willChange: "transform" }}>
        {tripled.map((item, i) => (
          <div key={i} style={{
            flexShrink: 0,
            width: 260, height: 168,
            position: "relative",
            borderRadius: 5,
            overflow: "hidden",
            background: "#111",
          }}>
            <Image
              src={item.src}
              alt=""
              fill
              style={{ objectFit: "cover", filter: "brightness(0.82)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CinematicGallery({ images, title }: CinematicGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [scrollP, setScrollP] = useState(0);
  const [entered, setEntered] = useState(false);

  // 5 spotlight images
  const spotSrcs = ROOM_LABELS.map((_, i) => images[i % Math.max(images.length, 1)]);

  // Gallery rows (all images, padded to min 5 each)
  const pad = (arr: { src: string }[]) => {
    const out = [...arr];
    while (out.length < 5) out.push(...arr);
    return out;
  };
  const allItems = images.map(src => ({ src }));
  const row0 = pad(allItems.filter((_, i) => i % 3 === 0).length ? allItems.filter((_, i) => i % 3 === 0) : allItems);
  const row1 = pad(allItems.filter((_, i) => i % 3 === 1).length ? allItems.filter((_, i) => i % 3 === 1) : allItems);
  const row2 = pad(allItems.filter((_, i) => i % 3 === 2).length ? allItems.filter((_, i) => i % 3 === 2) : allItems);
  const rows = [row0, row1, row2];

  // Scroll driver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setScrollP(p);
      if (scrolled > -window.innerHeight * 0.7) setEntered(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Each of 5 rooms gets equal slice of scrollP
  const N = ROOM_LABELS.length;
  const perRoom = 1 / N;

  // Within each room slice:
  // 0.00 → 0.35 : expand card outward (card grows from grid → full screen)
  // 0.35 → 0.65 : hold fully expanded, text visible
  // 0.65 → 1.00 : contract back to grid
  const EXPAND_END = 0.35;
  const CONTRACT_START = 0.65;

  const getRoomState = (ri: number) => {
    const local = (scrollP - ri * perRoom) / perRoom;
    if (local < 0 || local >= 1) return null;

    let expandP = 0;
    if (local < EXPAND_END) {
      expandP = easeOutExpo(local / EXPAND_END);
    } else if (local < CONTRACT_START) {
      expandP = 1;
    } else {
      expandP = 1 - easeInOutQuart((local - CONTRACT_START) / (1 - CONTRACT_START));
    }

    const textP = local < EXPAND_END
      ? Math.max(0, (local / EXPAND_END - 0.6) / 0.4)
      : local < CONTRACT_START
        ? 1
        : Math.max(0, 1 - (local - CONTRACT_START) / 0.2);

    return { expandP, textP, local };
  };

  // Total scroll = 5 rooms × 150vh
  const totalVh = N * 150;

  // Expanding card dimensions: from a natural grid-like origin rect to inset:0
  // We pick a different "origin" position for each room (as if it's a real grid card)
  const ORIGINS = [
    { top: 0.28, left: 0.05, w: 0.22, h: 0.32 },   // top-left area
    { top: 0.42, left: 0.38, w: 0.22, h: 0.32 },   // center
    { top: 0.28, left: 0.72, w: 0.22, h: 0.32 },   // top-right
    { top: 0.58, left: 0.12, w: 0.22, h: 0.32 },   // bottom-left
    { top: 0.55, left: 0.60, w: 0.22, h: 0.32 },   // bottom-right
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.9; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: "relative", height: `calc(${totalVh}vh + 100vh)`, background: "#0a0a08" }}
      >
        <div
          ref={stickyRef}
          style={{
            position: "sticky", top: 0,
            height: "100vh", overflow: "hidden",
            background: "#0a0a08",
          }}
        >
          {/* ── HEADER ─────────────────────────────────────── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "30px 48px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 10,
            background: "linear-gradient(to bottom, rgba(10,10,8,0.9) 0%, transparent 100%)",
            opacity: entered ? 1 : 0,
            animation: entered ? "fadeUp 0.7s ease forwards" : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 28, height: 1, background: "linear-gradient(90deg, transparent, #849826)" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 11, letterSpacing: "0.28em",
                textTransform: "uppercase", color: "#849826",
              }}>Gallery</span>
              <div style={{ width: 28, height: 1, background: "linear-gradient(90deg, #849826, transparent)" }} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(18px, 2.2vw, 28px)",
              fontWeight: 300, fontStyle: "italic",
              color: "rgba(240,240,230,0.7)", letterSpacing: "0.04em",
            }}>
              {title}
            </span>
            <div style={{
              fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(132,152,38,0.6)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              animation: "breathe 2.5s ease-in-out infinite",
            }}>
              ↓ scroll to explore
            </div>
          </div>

          {/* ── 3 AUTO-SCROLL ROWS ──────────────────────────── */}
          <div style={{
            position: "absolute",
            top: 88, left: 0, right: 0,
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {rows.map((row, ri) => (
              <ScrollRow
                key={ri}
                items={row}
                direction={ri === 1 ? "right" : "left"}
                speed={[0.5, 0.38, 0.62][ri]}
                rowIndex={ri}
              />
            ))}
          </div>

          {/* ── EXPANDING CARDS (one per room) ──────────────── */}
          {ROOM_LABELS.map((label, ri) => {
            const state = getRoomState(ri);
            if (!state) return null;

            const { expandP, textP } = state;
            const o = ORIGINS[ri];

            // Interpolate from origin rect → full screen
            const lerp = (a: number, b: number) => a + (b - a) * expandP;

            const top    = lerp(o.top * 100, 0);
            const left   = lerp(o.left * 100, 0);
            const width  = lerp(o.w * 100, 100);
            const height = lerp(o.h * 100, 100);

            // Border radius: starts rounded, ends sharp
            const radius = lerp(8, 0);

            // Brightness: slightly darker when expanded
            const brightness = lerp(0.82, 0.68);

            return (
              <div
                key={ri}
                style={{
                  position: "absolute",
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${width}%`,
                  height: `${height}%`,
                  borderRadius: radius,
                  overflow: "hidden",
                  zIndex: 30,
                  // No CSS transition — fully scroll-driven for precision
                  willChange: "top, left, width, height",
                }}
              >
                {/* Image */}
                <Image
                  src={spotSrcs[ri]}
                  alt={label}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: `brightness(${brightness}) saturate(1.08)`,
                  }}
                  priority
                />

                {/* Bottom gradient for text */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  height: "50%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)",
                  opacity: textP,
                  pointerEvents: "none",
                }} />

                {/* Top gradient */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "25%",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                  opacity: expandP,
                  pointerEvents: "none",
                }} />

                {/* ── Room label — fades in when expanded ──── */}
                <div style={{
                  position: "absolute",
                  bottom: `${lerp(8, 10)}%`,
                  left: `${lerp(8, 5)}%`,
                  opacity: textP,
                  transform: `translateY(${(1 - textP) * 20}px)`,
                  pointerEvents: "none",
                }}>
                  {/* Eyebrow */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    marginBottom: 12,
                  }}>
                    <div style={{ height: 1, width: 32, background: "#849826" }} />
                    <span style={{
                      fontSize: 10, letterSpacing: "0.32em",
                      textTransform: "uppercase", color: "#849826",
                      fontFamily: "ui-sans-serif, system-ui, sans-serif",
                      fontWeight: 600,
                    }}>
                      {String(ri + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Main room title */}
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: `clamp(42px, 7vw, 88px)`,
                    fontWeight: 300,
                    color: "#f8f4e8",
                    lineHeight: 0.92,
                    letterSpacing: "-0.02em",
                    textShadow: "0 4px 60px rgba(0,0,0,0.4)",
                  }}>
                    {label}
                  </div>
                </div>

                {/* Top-right: count indicator when expanded */}
                <div style={{
                  position: "absolute", top: "5%", right: "4%",
                  opacity: textP * 0.6,
                  display: "flex", flexDirection: "column", gap: 5,
                  alignItems: "flex-end",
                  pointerEvents: "none",
                }}>
                  {ROOM_LABELS.map((_, di) => (
                    <div key={di} style={{
                      height: 2,
                      width: di === ri ? 28 : 6,
                      borderRadius: 2,
                      background: di === ri ? "#849826" : "rgba(255,255,255,0.25)",
                      transition: "width 0.3s ease",
                    }} />
                  ))}
                </div>

                {/* Brand top line — only when near-fully expanded */}
                {expandP > 0.8 && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: "linear-gradient(90deg, transparent, #849826, #a8b830, #849826, transparent)",
                    opacity: (expandP - 0.8) / 0.2,
                  }} />
                )}
              </div>
            );
          })}

          {/* ── PROGRESS DOTS ───────────────────────────────── */}
          <div style={{
            position: "absolute", bottom: 24, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: 7, zIndex: 50,
          }}>
            {ROOM_LABELS.map((_, i) => {
              const state = getRoomState(i);
              const active = !!state && state.expandP > 0.05;
              const done = scrollP > (i + 1) * perRoom;
              return (
                <div key={i} style={{
                  width: active ? 22 : 5,
                  height: 5,
                  borderRadius: 3,
                  background: active
                    ? "#849826"
                    : done
                      ? "rgba(132,152,38,0.35)"
                      : "rgba(255,255,255,0.15)",
                  transition: "width 0.4s cubic-bezier(0.34,1.5,0.64,1), background 0.3s ease",
                }} />
              );
            })}
          </div>

          {/* Brand borders */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg, transparent, #849826, #a8b830, #849826, transparent)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg, transparent, #849826, #a8b830, #849826, transparent)",
          }} />
        </div>
      </div>
    </>
  );
}