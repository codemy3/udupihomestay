"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface CinematicGalleryProps {
  images: string[];
  title: string;
}

const ROOM_LABELS = ["Front View", "Hall", "Kitchen", "Bedroom", "Play Area"];
const N = ROOM_LABELS.length;

// ─── Pure easing ─────────────────────────────────────────────────────────────
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const easeInCubic  = (t: number) => t * t * t;
const clamp        = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));

// ─── Auto-scroll row (no state, pure DOM) ─────────────────────────────────────
function ScrollRow({
  items,
  direction,
  speed,
  cardW,
  cardH,
}: {
  items: { src: string }[];
  direction: "left" | "right";
  speed: number;
  cardW: number;
  cardH: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef(0);
  const quad = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const unit = el.scrollWidth / 4;
    if (direction === "right") posRef.current = -unit;

    const tick = () => {
      posRef.current += direction === "left" ? -speed : speed;
      if (direction === "left"  && Math.abs(posRef.current) >= unit) posRef.current = 0;
      if (direction === "right" && posRef.current >= 0)               posRef.current = -unit;
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div style={{ overflow: "hidden", width: "100%", flexShrink: 0 }}>
      <div ref={trackRef} style={{ display: "flex", gap: 6, width: "max-content" }}>
        {quad.map((item, i) => (
          <div key={i} style={{
            flexShrink: 0, width: cardW, height: cardH,
            position: "relative", borderRadius: 6,
            overflow: "hidden", background: "#181810",
          }}>
            <Image src={item.src} alt="" fill style={{ objectFit: "cover", filter: "brightness(0.75)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CinematicGallery({ images, title }: CinematicGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Refs for card DOM nodes — animation written directly, no React re-renders
  const cardRefs    = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const labelRefs   = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const dotRefs     = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));

  // Live layout config ref — updated on resize, read in rAF loop
  const layoutRef = useRef({
    isMobile: false,
    isTablet: false,
    perRoom: 1 / N,
    // Card targets: the resting (expanded) rect in %  — NOT full screen
    // Desktop (≥1024):  56% wide, 56% tall — grid still visible around edges
    // Tablet (640–1023): 72% wide, 62% tall
    // Mobile (<640):     88% wide, 58% tall
    target: { top: 22, left: 22, w: 56, h: 56 },
    // Origin: where each card starts (matching visual grid card positions)
    origins: [
      { top: 0.28, left: 0.04, w: 0.20, h: 0.28 },
      { top: 0.44, left: 0.40, w: 0.20, h: 0.28 },
      { top: 0.28, left: 0.76, w: 0.20, h: 0.28 },
      { top: 0.60, left: 0.12, w: 0.20, h: 0.28 },
      { top: 0.58, left: 0.62, w: 0.20, h: 0.28 },
    ] as { top: number; left: number; w: number; h: number }[],
  });

  // ── Breakpoint detection ─────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const mob = w < 640;
      const tab = w >= 640 && w < 1024;
      setIsMobile(mob);
      setIsTablet(tab);
      layoutRef.current.isMobile = mob;
      layoutRef.current.isTablet = tab;

      // Update targets per breakpoint
      if (mob) {
        layoutRef.current.target = { top: 16, left: 6, w: 88, h: 56 };
        layoutRef.current.origins = [
          { top: 0.32, left: 0.04, w: 0.42, h: 0.22 },
          { top: 0.56, left: 0.52, w: 0.42, h: 0.22 },
          { top: 0.32, left: 0.52, w: 0.42, h: 0.22 },
          { top: 0.56, left: 0.04, w: 0.42, h: 0.22 },
          { top: 0.44, left: 0.28, w: 0.42, h: 0.22 },
        ];
      } else if (tab) {
        layoutRef.current.target = { top: 19, left: 14, w: 72, h: 60 };
        layoutRef.current.origins = [
          { top: 0.28, left: 0.04, w: 0.26, h: 0.28 },
          { top: 0.44, left: 0.37, w: 0.26, h: 0.28 },
          { top: 0.28, left: 0.70, w: 0.26, h: 0.28 },
          { top: 0.60, left: 0.10, w: 0.26, h: 0.28 },
          { top: 0.58, left: 0.64, w: 0.26, h: 0.28 },
        ];
      } else {
        // Desktop — modest expansion, grid clearly visible around
        layoutRef.current.target = { top: 22, left: 22, w: 56, h: 56 };
        layoutRef.current.origins = [
          { top: 0.28, left: 0.04, w: 0.20, h: 0.28 },
          { top: 0.44, left: 0.40, w: 0.20, h: 0.28 },
          { top: 0.28, left: 0.76, w: 0.20, h: 0.28 },
          { top: 0.60, left: 0.12, w: 0.20, h: 0.28 },
          { top: 0.58, left: 0.62, w: 0.20, h: 0.28 },
        ];
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Scroll + smooth rAF loop — writes directly to DOM, zero React re-renders ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rawP     = 0;
    let smoothP  = 0;
    let rafId    = 0;
    const LERP   = 0.07; // lower = more inertia / silkier
    const EXP    = 0.30; // within room slice: 0→EXP = expand
    const CON    = 0.70; // CON→1 = contract
    const perRoom = 1 / N;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      // Smooth toward raw
      smoothP += (rawP - smoothP) * LERP;

      const { target, origins } = layoutRef.current;

      for (let ri = 0; ri < N; ri++) {
        const card  = cardRefs.current[ri];
        const label = labelRefs.current[ri];
        const dot   = dotRefs.current[ri];
        if (!card) continue;

        const local = clamp((smoothP - ri * perRoom) / perRoom);
        // Always render every card so DOM nodes stay mounted
        const isActive = local > 0.001 && local < 0.999;

        let expandP: number;
        if (local < EXP) {
          expandP = easeOutQuint(local / EXP);
        } else if (local < CON) {
          expandP = 1;
        } else {
          expandP = 1 - easeInCubic((local - CON) / (1 - CON));
        }

        const textP = local < EXP
          ? clamp((expandP - 0.60) / 0.40)
          : local < CON
            ? 1
            : clamp(1 - (local - CON) / 0.20);

        const o = origins[ri];

        const top    = lerp(o.top  * 100, target.top,  expandP);
        const left   = lerp(o.left * 100, target.left, expandP);
        const width  = lerp(o.w    * 100, target.w,    expandP);
        const height = lerp(o.h    * 100, target.h,    expandP);
        const radius = lerp(6, 16, expandP);
        const shadow = expandP > 0.02
          ? `0 ${lerp(0, 40, expandP)}px ${lerp(0, 90, expandP)}px rgba(0,0,0,${lerp(0, 0.6, expandP)})`
          : "none";

        // Write layout directly to DOM
        card.style.display  = isActive || expandP > 0.001 ? "block" : "none";
        card.style.top      = `${top}%`;
        card.style.left     = `${left}%`;
        card.style.width    = `${width}%`;
        card.style.height   = `${height}%`;
        card.style.borderRadius = `${radius}px`;
        card.style.boxShadow    = shadow;
        card.style.opacity  = expandP > 0.001 ? "1" : "0";

        if (label) {
          label.style.opacity   = String(textP);
          label.style.transform = `translateY(${(1 - textP) * 20}px)`;
        }

        if (dot) {
          dot.style.opacity = String(textP * 0.5);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const rect      = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const scrolled  = -rect.top;
      rawP = clamp(scrolled / scrollable);
      if (scrolled > -window.innerHeight * 0.7) setEntered(true);

      // Update progress dots (React state ok for dots, low frequency)
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const local = clamp((rawP - i * perRoom) / perRoom);
        const isActive = local > 0.02 && local < 0.98;
        const isDone   = rawP > (i + 1) * perRoom;
        const isMob    = layoutRef.current.isMobile;
        dot.style.width = isActive ? (isMob ? "16px" : "20px") : (isMob ? "4px" : "5px");
        dot.style.background = isActive
          ? "#849826"
          : isDone ? "rgba(132,152,38,0.3)" : "rgba(255,255,255,0.12)";
      });
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []); // runs once

  // ── Derived layout values for JSX (non-animation, React-driven) ──────────────
  const spotSrcs = ROOM_LABELS.map((_, i) => images[i % Math.max(images.length, 1)]);

  const pad = (arr: { src: string }[]) => {
    const out = [...arr];
    while (out.length < 5) out.push(...arr);
    return out;
  };
  const all  = images.map(src => ({ src }));
  const row0 = pad(all.filter((_, i) => i % 3 === 0).length ? all.filter((_, i) => i % 3 === 0) : all);
  const row1 = pad(all.filter((_, i) => i % 3 === 1).length ? all.filter((_, i) => i % 3 === 1) : all);
  const row2 = pad(all.filter((_, i) => i % 3 === 2).length ? all.filter((_, i) => i % 3 === 2) : all);
  const rows   = isMobile ? [row0, row1] : [row0, row1, row2];
  const cardW  = isMobile ? 130 : isTablet ? 190 : 245;
  const cardH  = isMobile ? 88  : isTablet ? 126 : 158;
  const speeds = isMobile ? [0.35, 0.26] : isTablet ? [0.42, 0.30, 0.52] : [0.48, 0.34, 0.60];
  const headerH = isMobile ? 54 : isTablet ? 68 : 80;
  const totalVh = N * 150;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @keyframes cgFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cgBreathe {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.85; }
        }
        /* Dot transition only via CSS so it's smooth without React */
        .cg-dot {
          transition: width 0.5s cubic-bezier(0.34, 1.6, 0.64, 1),
                      background 0.4s ease;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{ position: "relative", height: `calc(${totalVh}vh + 100vh)`, background: "#0c0c09" }}
      >
        <div style={{
          position: "sticky", top: 0,
          height: "100vh", overflow: "hidden",
          background: "#0c0c09",
        }}>

          {/* ── TOP BRAND STRIPE ────────────────────────────── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg, transparent, #849826 25%, #b8c830 50%, #849826 75%, transparent)",
          }} />

          {/* ── HEADER ──────────────────────────────────────── */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: isMobile ? "16px 18px 0" : isTablet ? "20px 30px 0" : "26px 48px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 40,
            opacity: entered ? 1 : 0,
            animation: entered ? "cgFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
          }}>
            {/* Gallery label */}
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 16, height: 1, background: "#849826", opacity: 0.9 }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: isMobile ? 9 : 10,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#849826",
              }}>Gallery</span>
              <div style={{ width: 16, height: 1, background: "#849826", opacity: 0.9 }} />
            </div>

            {/* Title — desktop + tablet */}
            {!isMobile && (
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: isTablet ? "clamp(14px, 1.8vw, 20px)" : "clamp(15px, 1.4vw, 22px)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(230,225,205,0.45)",
                letterSpacing: "0.05em",
              }}>{title}</span>
            )}

            {/* Scroll hint */}
            <span style={{
              fontSize: isMobile ? 8 : 9,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(132,152,38,0.6)",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              animation: "cgBreathe 3s ease-in-out infinite",
              whiteSpace: "nowrap",
            }}>
              {isMobile ? "↓ scroll" : "↓ scroll to explore"}
            </span>
          </div>

          {/* ── SCROLLING ROWS ──────────────────────────────── */}
          <div style={{
            position: "absolute", top: headerH, left: 0, right: 0,
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {rows.map((row, ri) => (
              <ScrollRow
                key={ri}
                items={row}
                direction={ri % 2 === 1 ? "right" : "left"}
                speed={speeds[ri] ?? 0.4}
                cardW={cardW}
                cardH={cardH}
              />
            ))}
          </div>

          {/* ── EXPANDING CARDS — DOM-animated, no React re-renders ── */}
          {ROOM_LABELS.map((label, ri) => (
            <div
              key={ri}
              ref={el => { cardRefs.current[ri] = el; }}
              style={{
                display: "none",         // rAF loop shows/hides
                position: "absolute",
                overflow: "hidden",
                zIndex: 30,
                willChange: "top, left, width, height",
              }}
            >
              <Image
                src={spotSrcs[ri]}
                alt={label}
                fill
                style={{ objectFit: "cover", filter: "brightness(0.68) saturate(1.06)" }}
                priority
              />

              {/* Bottom gradient */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 65%, transparent 100%)",
                pointerEvents: "none",
              }} />

              {/* Top vignette */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "28%",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />

              {/* Brand stripe */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, #849826 30%, #b8c830 50%, #849826 70%, transparent)",
                pointerEvents: "none",
              }} />

              {/* Label block — opacity controlled by rAF */}
              <div
                ref={el => { labelRefs.current[ri] = el; }}
                style={{
                  position: "absolute",
                  bottom: isMobile ? "7%" : "9%",
                  left: isMobile ? "5%" : "6%",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              >
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  marginBottom: isMobile ? 5 : 9,
                }}>
                  <div style={{ width: isMobile ? 14 : 22, height: 1, background: "#849826" }} />
                  <span style={{
                    fontSize: isMobile ? 8 : 9,
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "#849826",
                    fontFamily: "ui-sans-serif, system-ui, sans-serif",
                    fontWeight: 700,
                  }}>
                    {String(ri + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: isMobile
                    ? "clamp(24px, 7.5vw, 36px)"
                    : isTablet
                      ? "clamp(30px, 5.5vw, 48px)"
                      : "clamp(34px, 4.5vw, 56px)",
                  fontWeight: 300,
                  color: "#f5f0e0",
                  lineHeight: 0.95,
                  letterSpacing: "-0.015em",
                  textShadow: "0 2px 40px rgba(0,0,0,0.6)",
                }}>
                  {label}
                </div>
              </div>

              {/* Right progress dashes — desktop + tablet */}
              {!isMobile && (
                <div
                  ref={el => { dotRefs.current[ri] = el; }}
                  style={{
                    position: "absolute", top: "50%", right: "5%",
                    transform: "translateY(-50%)",
                    display: "flex", flexDirection: "column", gap: 6,
                    opacity: 0, pointerEvents: "none",
                  }}
                >
                  {ROOM_LABELS.map((_, di) => (
                    <div key={di} style={{
                      height: 2,
                      width: di === ri ? 24 : 5,
                      borderRadius: 1,
                      background: di === ri ? "#849826" : "rgba(255,255,255,0.2)",
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* ── PROGRESS DOTS ───────────────────────────────── */}
          <div style={{
            position: "absolute", bottom: isMobile ? 14 : 20, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: isMobile ? 5 : 6, zIndex: 50,
          }}>
            {ROOM_LABELS.map((_, i) => (
              <div
                key={i}
                className="cg-dot"
                ref={el => {
                  // Dots use dotRefs only on mobile (desktop uses them for progress bars in card)
                  if (isMobile) dotRefs.current[i] = el;
                }}
                style={{
                  width: isMobile ? 4 : 5,
                  height: isMobile ? 4 : 5,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>

          {/* ── BOTTOM BRAND STRIPE ─────────────────────────── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg, transparent, #849826 25%, #b8c830 50%, #849826 75%, transparent)",
          }} />

        </div>
      </div>
    </>
  );
}