"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const homestays = [
  {
    id: 1,
    name: "WHITE HOUSE",
    image: "whitehouse.webp",
    rooms: 6,
    guests: 35,
  },
  {
    id: 2,
    name: "GARDEN VILLA",
    image: "gardenvilla.webp",
    rooms: 5,
    guests: 20,
  },
  {
    id: 3,
    name: "COTTAGE HOUSE",
    image: "cottagehouse.webp",
    rooms: 3,
    guests: 15,
  },
  {
    id: 4,
    name: "HILL TOP VILLA",
    image: "hilltopvilla.webp",
    rooms: 4,
    guests: 25,
  },
  {
    id: 5,
    name: "SUNRISE HOME",
    image: "sunrise home.webp",
    rooms: 4,
    guests: 18,
  },
  {
    id: 6,
    name: "CHALET LA BONNE VIE",
    image: "chaletlabonnevie.webp",
    rooms: 5,
    guests: 20,
  },
  {
    id: 7,
    name: "VIEWPOINT OASIS",
    image: "viewpoint.webp",
    rooms: 4,
    guests: 22,
  },
];

export default function HomestaysHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [centerCardIndex, setCenterCardIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const setupAnimation = () => {
      // Kill existing triggers
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Calculate precise scroll distance based on viewport
      const cardWidth = isMobile ? 320 : 550;
      const gap = isMobile ? 12 : 24;
      const padding = isMobile ? 64 : 128; // Account for px-8 md:px-16 (32px/64px on each side)
      
      // Calculate visible viewport width
      const viewportWidth = window.innerWidth;
      
      // Total width of all cards
      const totalCardsWidth = (cardWidth * homestays.length) + (gap * (homestays.length - 1));
      
      // Scroll distance: stop when the last card is visible
      // We need to scroll until: totalCardsWidth - viewportWidth + padding
      const scrollDistance = Math.max(0, totalCardsWidth - viewportWidth + padding);

      if (scrollDistance <= 0) return;

      // Main horizontal scroll animation
      gsap.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const scrolled = self.progress * scrollDistance;
            const centerIndex = Math.round(scrolled / (cardWidth + gap));
            setCenterCardIndex(Math.min(Math.max(centerIndex, 0), homestays.length - 1));
          },
        },
      });
    };

    const images = Array.from(track.querySelectorAll("img"));
    const totalImages = images.length;
    let loadedCount = 0;

    const onReady = () => {
      ScrollTrigger.refresh();
      requestAnimationFrame(setupAnimation);
    };

    if (totalImages === 0) {
      onReady();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount += 1;
        } else {
          img.onload = () => {
            loadedCount += 1;
            if (loadedCount === totalImages) onReady();
          };
          img.onerror = () => {
            loadedCount += 1;
            if (loadedCount === totalImages) onReady();
          };
        }
      });

      if (loadedCount === totalImages) onReady();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  // Unified rendering for both mobile and desktop
  return (
    <div 
      id="homestays-section" 
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: 'url(/about-story-bg.png)',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
      
      {/* Carousel Container - Gets pinned with heading INSIDE */}
      <div
        ref={containerRef}
        className="relative w-full h-screen flex flex-col justify-center py-12"
      >
        {/* Heading Section - INSIDE the pinned container */}
        <div className="relative z-10 text-center mb-16 px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/90 mb-3 font-medium">
            Curated Collection
          </p>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">
            Discover Our Homestays
          </h2>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="relative flex items-center gap-3 md:gap-6 px-8 md:px-16 z-20"
          style={{ width: "fit-content" }}
        >
          {homestays.map((homestay, index) => {
            const isCenter = index === centerCardIndex;
            
            return (
              <div
                key={homestay.id}
                className={`relative flex-shrink-0 bg-transparent backdrop-blur-md overflow-hidden transition-all duration-500 rounded-2xl border border-white/20 ${
                  isCenter ? 'shadow-[0_25px_80px_rgba(0,0,0,0.5)]' : 'shadow-[0_15px_50px_rgba(0,0,0,0.3)]'
                }`}
                style={{
                  width: isMobile ? '320px' : '550px',
                  transform: isCenter ? 'scale(1.05)' : 'scale(0.95)',
                  opacity: isCenter ? 1 : 0.7,
                }}
              >
                {/* Image Container */}
                <div
                  className="relative overflow-hidden w-full"
                  style={{
                    height: isMobile ? '180px' : '280px',
                  }}
                >
                  {/* Real Image - REMOVED HOVER ZOOM, ONLY CENTER CARD ZOOMS */}
                  <img
                    src={`/${homestay.image}`}
                    alt={homestay.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  
                  {/* Fallback placeholder */}
                  <div className="hidden h-full w-full bg-gradient-to-br from-black-400 via-black-500 to-gray-600 border border-gray-300">
                    <div className="flex h-full items-center justify-center text-gray-500">
                      <svg className="h-16 md:h-20 w-16 md:w-20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info section */}
                <div className="p-5 md:p-6 bg-black/40 backdrop-blur-md">
                  {/* Homestay Name */}
                  <h3 className={`font-bold text-white mb-4 transition-all duration-500 leading-tight ${
                    isCenter ? 'text-lg md:text-xl' : 'text-base md:text-lg'
                  }`}>
                    {homestay.name}
                  </h3>
                  
                  {/* Room and Guest Info */}
                  <div className="flex gap-4 mb-5 text-white">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#849826] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="font-medium text-xs md:text-sm whitespace-nowrap">{homestay.rooms} Rooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#849826] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium text-xs md:text-sm whitespace-nowrap">Up to {homestay.guests}</span>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    className="w-full py-3 px-6 font-bold transition-all duration-300 text-white uppercase text-xs md:text-sm tracking-wider rounded-lg bg-[#849826] hover:bg-[#6d7d1f] hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}