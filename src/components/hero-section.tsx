"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/lib/useIsMobile";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile(768);
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
    // Auto-slide through all 7
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % facilities.length);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [facilities.length]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-section-1 hero-1 relative h-[88svh] md:min-h-screen overflow-hidden bg-cover bg-center pt-[32px] sm:pt-[50px] md:pt-[80px] lg:pt-[100px] xxl:pt-[120px] pb-[12px] md:pb-[20px]"
      style={{
        backgroundImage: "url(/viewpoint.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 px-4 sm:px-4 md:px-6 xxxl:px-[50px] xxl:px-[30px] h-full flex flex-col justify-end">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end justify-between pb-4 md:pb-8 h-full">
          {isMobile ? (
            <>
              {/* Mobile: Slider right bottom, text left bottom, both bottom-aligned */}
              <div className="flex w-full items-end h-full">
                <div className="flex flex-col items-start w-2/3 pb-0 justify-end animate-mobile-hero-fade">
                  <h1 className="text-white text-left text-[24px] sm:text-[32px] leading-tight font-serif mb-[8px] tracking-tight animate-mobile-hero-slide">
                    Hotel restin Best Hotel In Town
                  </h1>
                  <p className="text-left text-[12px] font-medium text-white mb-[12px] leading-relaxed">
                    Thoughtful stays in Udupi with calm views, warm hospitality, and comfort that feels like home.
                  </p>
                  <a
                    href="/rooms"
                    className="theme-btn relative inline-flex items-center justify-center text-white uppercase font-medium bg-[#849826] z-10 overflow-hidden h-[44px] px-[20px] leading-none shadow-[0_10px_30px_rgba(0,0,0,0.35)] group hover:bg-[#6f801f] transition-colors duration-300 text-[12px] font-semibold"
                  >
                    <span className="relative z-10">View Homestays</span>
                  </a>
                </div>
                <div className="w-1/3 flex-shrink-0 flex justify-end items-end pb-0">
                  <div
                    className="hero-box max-w-[140px] w-full rounded-[12px] backdrop-blur-[40px] p-1.5 bg-cover border border-white/10 shadow-lg"
                    style={{ backgroundImage: "url(/hero-color-bg.png)" }}
                  >
                    {/* Image Slider (mobile) */}
                    <div className="relative overflow-hidden mb-2 rounded-[10px]">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          gap: 0,
                          transform: `translateX(-${currentSlide * 100}%)`
                        }}
                      >
                        {[...facilities, ...facilities].map((facility, idx) => (
                          <div
                            key={idx}
                            className="flex-shrink-0 w-full"
                          >
                            <div className="rounded-[10px] overflow-hidden relative mb-1 flex items-center justify-center bg-black/10 aspect-[16/10]">
                              <Image
                                src={facility.img}
                                alt={facility.title}
                                fill
                                className="object-cover brightness-110 contrast-110 scale-105"
                              />
                            </div>
                            <p className="text-white text-center text-[12px] font-semibold tracking-wide leading-tight">
                              {facility.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Title and Dots BELOW the slider */}
                    <div className="flex flex-col gap-1 px-1 pb-1 overflow-hidden">
                      <h4 className="text-white tracking-[0.5px] font-heading text-[13px] whitespace-nowrap mb-0">Our Homestays</h4>
                      <div className="flex flex-wrap gap-1.5 justify-start items-center w-full max-w-full overflow-hidden">
                        {facilities.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                              idx === currentSlide
                                ? "bg-[#849826] w-3"
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                            onClick={() => setCurrentSlide(idx)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* LEFT: Text content */}
              <div className="flex flex-col items-start w-full md:w-auto">
                <h1
                  className={`${!isMobile ? "animate-fade-up-1" : ""} text-white text-left text-[24px] sm:text-[32px] md:text-[36px] lg:text-[42px] leading-tight font-serif mb-[8px] md:mb-[10px] tracking-tight`}
                >
                  Hotel restin Best Hotel In Town
                </h1>
                {/* Description */}
                <p
                  className={`${!isMobile ? "animate-fade-up-2" : ""} text-left text-[12px] md:text-[13px] font-medium text-white mb-[12px] md:mb-[14px] leading-relaxed`}
                >
                  Thoughtful stays in Udupi with calm views, warm hospitality, and comfort that feels like home.
                </p>
                {/* Button */}
                <a
                  href="/rooms"
                  className={`${!isMobile ? "animate-fade-up-3" : ""} theme-btn relative inline-flex items-center justify-center text-white uppercase font-medium bg-[#849826] z-10 overflow-hidden h-[44px] md:h-[46px] px-[20px] md:px-[26px] leading-none shadow-[0_10px_30px_rgba(0,0,0,0.35)] group hover:bg-[#6f801f] transition-colors duration-300 text-[12px] md:text-[12px] font-semibold`}
                >
                  <span className="relative z-10">View Homestays</span>
                </a>
              </div>
              {/* RIGHT: Image Slider */}
              <div className="w-full md:w-[60%] lg:w-[54%] flex-shrink-0">
                <div
                  className={`${!isMobile ? "animate-fade-up-4" : ""} hero-box w-full rounded-[10px] backdrop-blur-[40px] p-2 bg-cover`}
                  style={{
                    backgroundImage: "url(/hero-color-bg.png)",
                  }}
                >
                  {/* Arrows ABOVE the slider */}
                  <div className="flex gap-2.5 justify-end mb-[12px]">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + facilities.length) % facilities.length)}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#849826] hover:border-[#849826] transition-all duration-300"
                      aria-label="Previous slide"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % facilities.length)}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#849826] hover:border-[#849826] transition-all duration-300"
                      aria-label="Next slide"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  {/* Image Slider */}
                  <div className="relative overflow-hidden mb-[32px]">
                    <div
                      className="flex gap-[28px] transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * (100 / 3 + 28 / 3)}%)`
                      }}
                    >
                      {[...facilities, ...facilities].map((facility, idx) => (
                        <div
                          key={idx}
                          className="flex-shrink-0 w-[calc(33.333%-18px)]"
                        >
                          <div className="aspect-[16/11] rounded-[14px] overflow-hidden relative mb-2 flex items-center justify-center bg-black/10">
                            <Image
                              src={facility.img}
                              alt={facility.title}
                              fill
                              className="object-cover brightness-110 contrast-110 scale-110"
                            />
                          </div>
                          <p className="text-white text-center text-[13px] font-semibold tracking-wide">
                            {facility.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Title and Dots BELOW the slider */}
                  <div className="flex justify-between items-center">
                    <h4 className="text-white tracking-[0.5px] font-heading text-[16px] md:text-[18px]">Our Homestays</h4>
                    <div className="flex gap-1.5">
                      {facilities.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === currentSlide
                              ? "bg-[#849826] w-4"
                              : "bg-white/40 hover:bg-white/60"
                          }`}
                          onClick={() => setCurrentSlide(idx)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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