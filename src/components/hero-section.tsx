"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInteractiveRef = useRef(true);
  
  // 7 Homestays total
  const facilities = [
    { img: "/whitehouse.webp", title: "White House" },
    { img: "/gardenvilla.webp", title: "Garden Villa" },
    { img: "/cottagehouse.webp", title: "Cottage House" },
    { img: "/hilltopvilla.webp", title: "Hilltop Villa" },
    { img: "/sunrise home.webp", title: "Sunrise Home" },
    { img: "/chaletlabonnevie.webp", title: "Chalet La Bonne Vie" },
    { img: "/viewpoint.webp", title: "Viewpoint" },
  ];

  useEffect(() => {
    // Better mobile detection for real devices
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Auto-slide through all 7
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % facilities.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", checkMobile);
    };
  }, [facilities.length]);

  // Water Ripple Effect with Idle Timeout - Desktop only
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === 'undefined' || isMobile) return;

    let ripplesInstance: any = null;

    const disableInteractivity = () => {
      isInteractiveRef.current = false;
      if (ripplesInstance && window.jQuery) {
        try {
          (window.jQuery as any)(container).ripples('set', 'interactive', false);
        } catch (e) {
          console.log('Could not disable interactivity');
        }
      }
    };

    const enableInteractivity = () => {
      isInteractiveRef.current = true;
      if (ripplesInstance && window.jQuery) {
        try {
          (window.jQuery as any)(container).ripples('set', 'interactive', true);
        } catch (e) {
          console.log('Could not enable interactivity');
        }
      }
    };

    const resetIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      if (!isInteractiveRef.current) {
        enableInteractivity();
      }

      idleTimerRef.current = setTimeout(() => {
        disableInteractivity();
      }, 10000);
    };

    const handleMouseMove = () => {
      resetIdleTimer();
    };

    const handleMouseClick = () => {
      resetIdleTimer();
    };

    const loadRipples = async () => {
      if (!window.jQuery) {
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.7.1.min.js';
        document.head.appendChild(jqueryScript);
        
        await new Promise((resolve) => {
          jqueryScript.onload = resolve;
        });
      }

      const ripplesScript = document.createElement('script');
      ripplesScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js';
      document.head.appendChild(ripplesScript);

      await new Promise((resolve) => {
        ripplesScript.onload = resolve;
      });

      if (window.jQuery && (window.jQuery as any).fn.ripples) {
        try {
          (window.jQuery as any)(container).ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
            interactive: true,
            crossOrigin: 'anonymous'
          });

          ripplesInstance = (window.jQuery as any)(container);

          container.addEventListener('mousemove', handleMouseMove);
          container.addEventListener('click', handleMouseClick);

          resetIdleTimer();

          const autoDropInterval = setInterval(() => {
            if (isInteractiveRef.current) {
              const x = Math.random() * (window.jQuery as any)(container).outerWidth();
              const y = Math.random() * (window.jQuery as any)(container).outerHeight();
              
              (window.jQuery as any)(container).ripples('drop', x, y, 20, 0.04);
            }
          }, 2500);

          (container as any).__autoDropInterval = autoDropInterval;

        } catch (e) {
          console.log('WebGL not supported, falling back to static background');
        }
      }
    };

    loadRipples();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      if ((container as any).__autoDropInterval) {
        clearInterval((container as any).__autoDropInterval);
      }

      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleMouseClick);

      if (window.jQuery && (window.jQuery as any).fn.ripples) {
        try {
          (window.jQuery as any)(container).ripples('destroy');
        } catch (e) {
          // Silent fail
        }
      }
    };
  }, [isMobile]);
return (
  <section
    id="hero"
    ref={containerRef}
    className="hero-section-1 hero-1 relative h-[88svh] md:min-h-screen overflow-hidden bg-cover bg-center pt-[32px] sm:pt-[50px] md:pt-[200px] lg:pt-[160px] xxl:pt-[200px] pb-[12px] md:pb-[60px]"
    style={{
      backgroundImage: "url(/viewpoint.webp)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/35" />

    <div className="container-fluid relative z-10 px-4 sm:px-4 md:pl-[60px] md:pr-0 xxxl:px-[50px] xxl:px-[30px]">
      <div className="row">
        {/* MOBILE: Bottom positioned layout (text left, slider right) | DESKTOP: Text left, slider bottom-right */}
        <div className="hero-content flex flex-col md:flex-row md:items-start md:justify-between w-full gap-3 md:gap-[30px] h-[88svh] md:min-h-auto relative">

          {/* LEFT: Text content */}
          <div className="flex flex-col items-start w-full md:w-auto flex-1 md:static absolute bottom-36 left-3 md:bottom-auto md:left-0 md:pl-0">
            <h1
              className={`${!isMobile ? "animate-fade-up-1" : ""} text-white text-left text-[24px] sm:text-[32px] md:text-[50px] lg:text-[55px] xl:text-[60px] xxxl:text-[72px] leading-tight font-serif mb-[8px] md:mb-[18px] w-full pr-2 tracking-tight whitespace-nowrap`}
            >
              Hotel restin Best Hotel In Town
            </h1>

            {/* Mobile description */}
            <p
              className={`${!isMobile ? "animate-fade-up-2" : ""} md:hidden text-left text-[13px] font-medium text-white max-w-[52%] pr-2 mb-[12px] leading-relaxed`}
            >
              Thoughtful stays in Udupi with calm views, warm hospitality, and comfort that feels like home.
            </p>

            {/* Desktop description */}
            <p
              className={`${!isMobile ? "animate-fade-up-2" : ""} hidden md:block text-left text-[16px] font-medium text-white max-w-[90%] mb-[16px] leading-relaxed`}
            >
              Thoughtful stays in Udupi with calm views, warm hospitality, and comfort that feels like home.
            </p>

            {/* Mobile button */}
            <a
              href="/rooms"
              className={`${!isMobile ? "animate-fade-up-3" : ""} md:hidden theme-btn relative inline-flex items-center justify-center text-white uppercase font-medium bg-[#849826] z-10 overflow-hidden h-[44px] px-[20px] leading-none shadow-[0_10px_30px_rgba(0,0,0,0.35)] group hover:bg-[#6f801f] transition-colors duration-300 text-[12px] font-semibold`}
            >
              <span className="relative z-10">View Homestays</span>
            </a>

            {/* Desktop button */}
            <a
              href="/rooms"
              className={`${!isMobile ? "animate-fade-up-3" : ""} hidden md:inline-flex theme-btn relative items-center justify-center text-white uppercase font-medium bg-[#849826] z-10 overflow-hidden h-[50px] px-[30px] leading-none shadow-[0_10px_30px_rgba(0,0,0,0.35)] group hover:bg-[#6f801f] transition-colors duration-300 text-[13px] font-semibold`}
            >
              <span className="relative z-10">View Homestays</span>
            </a>

            {/* Navigation arrows - Mobile only */}
            <div className="md:hidden flex gap-2 mt-[10px]">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + facilities.length) % facilities.length)}
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-[#849826] hover:border-[#849826] transition-all duration-300"
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % facilities.length)}
                className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-[#849826] hover:border-[#849826] transition-all duration-300"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT: Desktop slider at bottom-right corner + Mobile small image card */}
          <div className="md:absolute md:bottom-16 md:right-6 lg:right-8 xxl:right-12 xxxl:right-16 md:w-[520px] lg:w-[650px] xxl:w-[780px] xxxl:w-[900px] hidden md:block">
            <div
              className={`${!isMobile ? "animate-fade-up-4" : ""} hero-box w-full rounded-[10px] backdrop-blur-[40px] p-4 sm:p-5 md:p-[28px] bg-cover`}
              style={{
                backgroundImage: "url(/hero-color-bg.png)",
              }}
            >
              {/* Title and dots */}
              <div className="flex justify-between items-center mb-[25px]">
                <h4 className="text-white tracking-[0.5px] font-heading text-[22px]">Our Homestays</h4>
                <div className="flex gap-2">
                  {facilities.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? "bg-[#849826] w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      onClick={() => setCurrentSlide(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="relative overflow-hidden mb-[25px]">
                <div
                  className="flex gap-[20px] transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / 3 + 20 / 3)}%)`
                  }}
                >
                  {[...facilities, ...facilities].map((facility, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-[calc(33.333%-13.333px)]"
                    >
                      <div className="aspect-[16/9] rounded-[6px] overflow-hidden relative">
                        <Image
                          src={facility.img}
                          alt={facility.title}
                          fill
                          className="object-cover brightness-110 contrast-110"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + facilities.length) % facilities.length)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#849826] hover:border-[#849826] transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % facilities.length)}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#849826] hover:border-[#849826] transition-all duration-300"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE: Small image card at bottom right */}
          <div className="md:hidden absolute bottom-36 right-3 w-[170px]">
            <div className="hero-box rounded-[10px] backdrop-blur-[40px] p-2 bg-black/30">
              <div className="overflow-hidden rounded-[6px] h-[165px] relative">
                <Image
                  src={facilities[currentSlide].img}
                  alt={facilities[currentSlide].title}
                  fill
                  className="object-cover brightness-110 contrast-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
// TypeScript declarations
declare global {
  interface Window {
    jQuery: any;
  }
}