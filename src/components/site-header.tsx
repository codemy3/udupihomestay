"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Stays", href: "/stays" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteHeader() {
  // Default to false so text is white on load (over hero)
  const [isOverWhite, setIsOverWhite] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('header');
      if (!navbar) return;

      const navbarRect = navbar.getBoundingClientRect();
      const navbarCenter = navbarRect.top + navbarRect.height / 2;

      // Check multiple points across the navbar
      const points = typeof window !== 'undefined' ? [
        window.innerWidth / 2,
        window.innerWidth * 0.3,
        window.innerWidth * 0.7
      ] : [];

      let whiteCount = 0;
      
      points.forEach(x => {
        if (typeof document === 'undefined') return;
        const element = document.elementFromPoint(x, navbarCenter);
        if (element) {
          // Check if element or any parent has white background
          let currentElement: Element | null = element;
          let foundWhite = false;
          
          while (currentElement && currentElement !== document.body && !foundWhite) {
            const classNames = String(currentElement.className || '');
            const computedStyle = typeof window !== 'undefined' ? window.getComputedStyle(currentElement) : null;
            const bgColor = computedStyle?.backgroundColor || '';
            
            // Check for white background class or RGB values
            if (classNames.includes('bg-white') || 
                bgColor === 'rgb(255, 255, 255)' ||
                bgColor === 'rgba(255, 255, 255, 1)' ||
                currentElement.id === 'homestays-section') {
              foundWhite = true;
              whiteCount++;
            }
            
            currentElement = currentElement.parentElement;
          }
        }
      });

      // If majority of points detect white background
      setIsOverWhite(whiteCount >= 2);
    };

    // On first load, force white text if hero is visible
    if (window.scrollY < 100) {
      setIsOverWhite(false);
    } else {
      handleScroll();
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Also check after a short delay to catch any delayed renders
    const timer = setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header className="fixed top-2 left-1/2 z-50 -translate-x-1/2 w-[95%] max-w-[1400px] transition-all duration-500">
      <div className="flex items-center justify-between h-[44px] md:h-[52px] xl:h-[60px]">
        {/* Logo */}
        <div className="flex items-center h-full min-h-0">
          <Image
            src={isOverWhite ? "/logo-white.png" : "/logo-white.png"}
            alt="Logo"
            width={180}
            height={80}
            priority
            className="h-8 lg:h-10 xl:h-12 2xl:h-14 w-auto block transition-all duration-500"
          />
        </div>

        {/* CENTER NAV - Desktop Only */}
        <nav
          className="hidden lg:flex items-center gap-4 xl:gap-8 2xl:gap-10 px-2 xl:px-6 2xl:px-8 h-full rounded-2xl backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-500 bg-white/10 border border-white/15 min-h-0"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm xl:text-base 2xl:text-lg font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                isOverWhite ? "!text-gray-900 hover:!text-[#849826]" : "!text-white hover:!text-white/90 !important"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS - Desktop */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 h-full min-h-0">
          {/* Phone */}
          <div className="flex items-center gap-2 xl:gap-3 px-2 xl:px-4 h-full rounded-2xl backdrop-blur-xl transition-all duration-500 bg-white/10 border border-white/15 min-h-0">
            <div className="flex h-8 w-8 xl:h-10 xl:w-10 items-center justify-center rounded-full bg-[#849826]">
              <Phone size={16} className="!text-white xl:hidden" />
              <Phone size={18} className="!text-white hidden xl:block" />
            </div>
            <span className={`text-sm xl:text-base font-semibold whitespace-nowrap transition-colors duration-300 ${
              isOverWhite ? "!text-gray-900" : "!text-white !important"
            }`}>
              +001 6520 698 00
            </span>
          </div>

          {/* BOOK NOW */}
          <Link
            href="/contact"
            className="px-3 xl:px-5 h-full flex items-center rounded-2xl bg-[#849826] !text-white text-sm xl:text-base font-bold shadow-lg shadow-[#849826]/30 hover:brightness-110 transition-all duration-300 whitespace-nowrap min-h-0"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center h-12 w-12 rounded-full backdrop-blur-xl transition-all duration-500 bg-white/10 border border-white/15"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X size={24} className={isOverWhite ? "!text-gray-900" : "!text-white"} />
          ) : (
            <Menu size={24} className={isOverWhite ? "!text-gray-900" : "!text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-screen w-full max-w-xs bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] backdrop-blur-xl border-l border-white/15 z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex items-center justify-end p-4 border-b border-white/10">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center h-12 w-12 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} className="!text-white" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
              {/* Navigation Items */}
              <nav className="flex flex-col gap-2 mb-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 text-base font-semibold !text-white hover:bg-white/10 hover:!text-white/90 transition-all duration-200 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6"></div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 mb-6 border border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#849826]">
                  <Phone size={18} className="!text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60 font-medium">Contact</p>
                  <span className="text-sm font-semibold !text-white">
                    +001 6520 698 00
                  </span>
                </div>
              </div>

              {/* Book Now - Push to bottom */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="block text-center px-6 py-4 rounded-lg bg-[#849826] !text-white text-base font-bold shadow-lg shadow-[#849826]/30 hover:brightness-110 transition-all duration-300 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
