"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface CinematicGalleryProps {
  images: string[];
  title: string;
}

const ROOM_LABELS = ["Front View", "Hall", "Kitchen", "Bedroom", "Play Area"];
const N = ROOM_LABELS.length;

// ── Auto-scroll row ───────────────────────────────────────────────────────────
function ScrollRow({ items, direction, speed, cardW }: {
  items: { src: string }[];
  direction: "left" | "right";
  speed: number;
  cardW: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef(0);
  const rafRef   = useRef(0);
  const quad     = [...items, ...items, ...items, ...items];

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
    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <div ref={trackRef} style={{ display: "flex", gap: 5, width: "max-content", height: "100%" }}>
        {quad.map((item, i) => (
          <div key={i} style={{
            flexShrink: 0, width: cardW, height: "100%",
            position: "relative", borderRadius: 5,
            overflow: "hidden", background: "#c8c4b8",
          }}>
            <Image src={item.src} alt="" fill
              style={{ objectFit: "cover", filter: "brightness(0.75)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CinematicGallery({ images, title }: CinematicGalleryProps) {
  const outerRef    = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState(false);
  const [entered,  setEntered]  = useState(false);
  // Which card is currently popped up
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Intersection: fire header fade-in when section first appears
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setEntered(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile === null) return;
    if (isMobile) return;

    const updateActiveCard = () => {
      const el = outerRef.current;
      if (!el) return;

      const viewportH = window.visualViewport?.height || window.innerHeight || 1;
      const maxScrollable = Math.max(el.offsetHeight - viewportH, 1);
      const travelled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), maxScrollable);
      const segment = maxScrollable / N;

      // Use midpoint snapping so each room stays active for a full scroll segment.
      const next = Math.min(
        N - 1,
        Math.max(0, Math.floor((travelled + segment * 0.5) / segment))
      );

      setActiveCard((prev) => (prev === next ? prev : next));
    };

    const raf = requestAnimationFrame(updateActiveCard);
    updateActiveCard();
    window.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const timer = window.setInterval(() => {
      setActiveCard((prev) => (prev + 1) % N);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isMobile]);

  if (isMobile === null) return null;

  // Layout
  const cardW   = isMobile ? 170 : isTablet ? 205 : 248;
  const speeds  = isMobile ? [0.36, 0.26, 0.46] : isTablet ? [0.40, 0.28, 0.50] : [0.46, 0.33, 0.58];
  const headerH = isMobile ? 60 : isTablet ? 68 : 78;
  const stickyH = isMobile ? "100svh" : "100vh";

  // Build rows
  const all = images.length > 0 ? images.map((s) => ({ src: s })) : [{ src: "/last.avif" }];
  const pad = (arr: { src: string }[]) => {
    const seed = arr.length > 0 ? arr : all;
    const o = [...seed];
    while (o.length < 5) o.push(...seed);
    return o;
  };
  const row0 = pad(all.filter((_, i) => i % 3 === 0).length ? all.filter((_, i) => i % 3 === 0) : all);
  const row1 = pad(all.filter((_, i) => i % 3 === 1).length ? all.filter((_, i) => i % 3 === 1) : all);
  const row2 = pad(all.filter((_, i) => i % 3 === 2).length ? all.filter((_, i) => i % 3 === 2) : all);
  const rowData = [row0, row1, row2];

  const spotSrcs = ROOM_LABELS.map((_, i) => all[i % all.length].src);

  // Card expand targets (centered, not full-screen)
  const TARGET = isMobile
    ? { top: "16%", left: "8%",  width: "84%", height: "62%" }
    : isTablet
      ? { top: "16%", left: "9%",  width: "82%", height: "65%" }
      : { top: "18%", left: "18%", width: "64%", height: "60%" };

  // Scroll height gives each room a stable scroll segment.
  const totalH = isMobile ? `${N * 95 + 35}svh` : `${N * 100 + 50}vh`;

  if (isMobile) {
    return (
      <section className="bg-white py-4">
        <div
          className="relative mx-auto w-[calc(100%-16px)] max-w-[420px] overflow-hidden rounded-2xl border border-[#ece8de] shadow-xl"
          style={{ height: "80svh", minHeight: 540, maxHeight: 760 }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg,transparent,#849826 25%,#b8c830 50%,#849826 75%,transparent)",
          }} />

          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 40,
            padding: "14px 14px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "linear-gradient(to bottom, rgba(255,255,255,.97) 55%, transparent)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 1, background: "#849826" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 9, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#849826", fontWeight: 600,
              }}>
                Gallery
              </span>
              <div style={{ width: 14, height: 1, background: "#849826" }} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: "clamp(12px,3.8vw,16px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(50,40,15,.48)",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "46%",
              textAlign: "center",
            }}>
              {title}
            </span>
            <span style={{
              fontSize: 8, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "rgba(132,152,38,.75)",
              fontFamily: "ui-sans-serif,system-ui,sans-serif",
              whiteSpace: "nowrap",
            }}>
              auto
            </span>
          </div>

          <div style={{
            position: "absolute", top: headerH, bottom: 0, left: 0, right: 0,
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            {rowData.map((row, ri) => (
              <div key={ri} style={{ flex: 1, minHeight: 0 }}>
                <ScrollRow
                  items={row}
                  direction={ri % 2 === 1 ? "right" : "left"}
                  speed={speeds[ri] ?? 0.35}
                  cardW={cardW}
                />
              </div>
            ))}
          </div>

          <div style={{
            position: "absolute",
            top: "16%",
            left: "8%",
            width: "84%",
            height: "62%",
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 30,
            boxShadow: "0 18px 52px rgba(0,0,0,0.6)",
          }}>
            <Image
              src={spotSrcs[activeCard]}
              alt={ROOM_LABELS[activeCard]}
              fill
              style={{
                objectFit: "cover",
                filter: "brightness(0.67) saturate(1.05)",
              }}
              priority
            />

            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "62%",
              background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.18) 65%, transparent 100%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "28%",
              background: "linear-gradient(to bottom, rgba(0,0,0,.48) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg,transparent,#849826 30%,#b8c830 50%,#849826 70%,transparent)",
              pointerEvents: "none",
            }} />

            <div style={{
              position: "absolute",
              bottom: "6%",
              left: "5%",
              pointerEvents: "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                <div style={{ width: 14, height: 1, background: "#849826" }} />
                <span style={{
                  fontSize: 8, letterSpacing: "0.3em",
                  textTransform: "uppercase", color: "#849826",
                  fontFamily: "ui-sans-serif,system-ui,sans-serif", fontWeight: 700,
                }}>
                  {String(activeCard + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
              </div>
              <div style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: "clamp(28px,9vw,44px)",
                fontWeight: 300,
                color: "#f5f0e0",
                lineHeight: 0.95,
                letterSpacing: "-0.015em",
                textShadow: "0 2px 36px rgba(0,0,0,.6)",
              }}>
                {ROOM_LABELS[activeCard]}
              </div>
            </div>

            <div style={{
              position: "absolute",
              top: "50%",
              right: "4%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              opacity: 0.55,
              pointerEvents: "none",
            }}>
              {ROOM_LABELS.map((_, di) => (
                <div key={di} style={{
                  height: 1.5,
                  width: di === activeCard ? 16 : 4,
                  borderRadius: 1,
                  background: di === activeCard ? "#849826" : "rgba(255,255,255,.22)",
                  transition: "width 0.3s ease, background 0.3s ease",
                }} />
              ))}
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: 10, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: 5, zIndex: 50,
          }}>
            {ROOM_LABELS.map((_, di) => (
              <button
                key={di}
                onClick={() => setActiveCard(di)}
                aria-label={`Show ${ROOM_LABELS[di]}`}
                style={{
                  height: 4,
                  width: di === activeCard ? 16 : 4,
                  borderRadius: 3,
                  border: "none",
                  background: di === activeCard ? "#849826" : "rgba(0,0,0,.14)",
                  transition: "width 0.35s cubic-bezier(0.34,1.6,.64,1), background 0.3s ease",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg,transparent,#849826 25%,#b8c830 50%,#849826 75%,transparent)",
          }} />
        </div>
      </section>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        @keyframes cgBreathe {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 1; }
        }
        @keyframes cgFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── OUTER: provides scroll distance ── */}
      <div ref={outerRef} style={{ position: "relative", height: totalH, background: "#fff" }}>

        {/* ── STICKY BACKGROUND PANEL — never moves ── */}
        <div style={{
          position: "sticky", top: 0,
          height: stickyH, overflow: "hidden",
          background: "#fff",
        }}>
          {/* Top stripe */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg,transparent,#849826 25%,#b8c830 50%,#849826 75%,transparent)",
          }} />

          {/* Header */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 40,
            padding: isMobile ? "14px 16px 0" : isTablet ? "19px 28px 0" : "23px 48px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "linear-gradient(to bottom, rgba(255,255,255,.97) 55%, transparent)",
            opacity: entered ? 1 : 0,
            animation: entered ? "cgFadeUp 0.8s ease forwards" : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 14, height: 1, background: "#849826" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: isMobile ? 9 : 10, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#849826", fontWeight: 600,
              }}>Gallery</span>
              <div style={{ width: 14, height: 1, background: "#849826" }} />
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif",
              fontSize: isMobile ? "clamp(12px,3.8vw,16px)" : isTablet ? "clamp(13px,1.8vw,19px)" : "clamp(14px,1.4vw,22px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(50,40,15,.48)",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: isMobile ? "46%" : "none",
              textAlign: "center",
            }}>{title}</span>
            <span style={{
              fontSize: isMobile ? 8 : 9, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "rgba(132,152,38,.75)",
              fontFamily: "ui-sans-serif,system-ui,sans-serif",
              animation: "cgBreathe 2.8s ease-in-out infinite", whiteSpace: "nowrap",
            }}>
              {isMobile ? "↓ scroll" : "↓ scroll to explore"}
            </span>
          </div>

          {/* Scrolling image rows — always visible, never stop */}
          <div style={{
            position: "absolute", top: headerH, bottom: 0, left: 0, right: 0,
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            {rowData.map((row, ri) => (
              <div key={ri} style={{ flex: 1, minHeight: 0 }}>
                <ScrollRow
                  items={row}
                  direction={ri % 2 === 1 ? "right" : "left"}
                  speed={speeds[ri] ?? 0.35}
                  cardW={cardW}
                />
              </div>
            ))}
          </div>

          {/* ── POP-UP CARDS — one per room, CSS-transitioned ── */}
          {ROOM_LABELS.map((label, ri) => {
            const isActive = activeCard === ri;
            return (
              <div
                key={ri}
                style={{
                  position: "absolute",
                  // When inactive: small, positioned near centre, invisible
                  // When active: expands to TARGET rect
                  top:    isActive ? TARGET.top    : "45%",
                  left:   isActive ? TARGET.left   : "35%",
                  width:  isActive ? TARGET.width  : "30%",
                  height: isActive ? TARGET.height : "12%",
                  borderRadius: isActive ? (isMobile ? "12px" : "16px") : "8px",
                  overflow: "hidden",
                  zIndex: 30,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  boxShadow: isActive
                    ? `0 ${isMobile ? 16 : 44}px ${isMobile ? 44 : 100}px rgba(0,0,0,0.65)`
                    : "none",
                  // CSS transition — browser handles this natively, works on iOS
                  transition: isActive
                    ? [
                        "top 0.6s cubic-bezier(0.22,1,0.36,1)",
                        "left 0.6s cubic-bezier(0.22,1,0.36,1)",
                        "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                        "height 0.6s cubic-bezier(0.22,1,0.36,1)",
                        "border-radius 0.6s ease",
                        "opacity 0.4s ease",
                        "box-shadow 0.6s ease",
                      ].join(", ")
                    : [
                        "top 0.45s cubic-bezier(0.55,0,0.8,0)",
                        "left 0.45s cubic-bezier(0.55,0,0.8,0)",
                        "width 0.45s cubic-bezier(0.55,0,0.8,0)",
                        "height 0.45s cubic-bezier(0.55,0,0.8,0)",
                        "border-radius 0.4s ease",
                        "opacity 0.3s ease",
                        "box-shadow 0.3s ease",
                      ].join(", "),
                }}
              >
                <Image
                  src={spotSrcs[ri]}
                  alt={label}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.67) saturate(1.05)",
                  }}
                  priority
                />

                {/* Bottom gradient */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: "62%",
                  background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.18) 65%, transparent 100%)",
                  pointerEvents: "none",
                }} />

                {/* Top vignette */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "28%",
                  background: "linear-gradient(to bottom, rgba(0,0,0,.48) 0%, transparent 100%)",
                  pointerEvents: "none",
                }} />

                {/* Olive top accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg,transparent,#849826 30%,#b8c830 50%,#849826 70%,transparent)",
                  pointerEvents: "none",
                }} />

                {/* Room label */}
                <div style={{
                  position: "absolute",
                  bottom: isMobile ? "6%" : "9%",
                  left:   isMobile ? "5%" : "6%",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(18px)",
                  transition: isActive
                    ? "opacity 0.45s ease 0.35s, transform 0.45s cubic-bezier(0.22,1,0.36,1) 0.35s"
                    : "opacity 0.2s ease, transform 0.2s ease",
                  pointerEvents: "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: isMobile ? 5 : 10 }}>
                    <div style={{ width: isMobile ? 14 : 22, height: 1, background: "#849826" }} />
                    <span style={{
                      fontSize: isMobile ? 8 : 9, letterSpacing: "0.3em",
                      textTransform: "uppercase", color: "#849826",
                      fontFamily: "ui-sans-serif,system-ui,sans-serif", fontWeight: 700,
                    }}>
                      {String(ri + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond',Georgia,serif",
                    fontSize: isMobile
                      ? "clamp(28px,9vw,44px)"
                      : isTablet
                        ? "clamp(30px,5.5vw,50px)"
                        : "clamp(34px,4.5vw,58px)",
                    fontWeight: 300, color: "#f5f0e0",
                    lineHeight: 0.95, letterSpacing: "-0.015em",
                    textShadow: "0 2px 36px rgba(0,0,0,.6)",
                  }}>
                    {label}
                  </div>
                </div>

                {/* Side dashes */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  right: isMobile ? "4%" : "5%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: isMobile ? 4 : 6,
                  opacity: isActive ? 0.55 : 0,
                  transition: "opacity 0.4s ease 0.4s",
                  pointerEvents: "none",
                }}>
                  {ROOM_LABELS.map((_, di) => (
                    <div key={di} style={{
                      height: isMobile ? 1.5 : 2,
                      width: di === ri ? (isMobile ? 16 : 24) : (isMobile ? 4 : 5),
                      borderRadius: 1,
                      background: di === ri ? "#849826" : "rgba(255,255,255,.22)",
                    }} />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Progress dots */}
          <div style={{
            position: "absolute", bottom: isMobile ? 10 : 18, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", gap: isMobile ? 5 : 6, zIndex: 50,
          }}>
            {ROOM_LABELS.map((_, di) => (
              <div key={di} style={{
                height: isMobile ? 4 : 5,
                width: di === activeCard
                  ? (isMobile ? 16 : 22)
                  : (isMobile ? 4 : 5),
                borderRadius: 3,
                background: di === activeCard
                  ? "#849826"
                  : di < activeCard
                    ? "rgba(132,152,38,.4)"
                    : "rgba(0,0,0,.14)",
                transition: "width 0.4s cubic-bezier(0.34,1.6,.64,1), background 0.3s ease",
              }} />
            ))}
          </div>

          {/* Bottom stripe */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 3, zIndex: 60,
            background: "linear-gradient(90deg,transparent,#849826 25%,#b8c830 50%,#849826 75%,transparent)",
          }} />
        </div>
      </div>
    </>
  );
}
