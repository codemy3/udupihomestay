"use client";

import { useEffect, useState } from "react";
import { 
  Snowflake, 
  Wifi, 
  Lock, 
  Dumbbell, 
  UtensilsCrossed, 
  Waves,
  Shield,
  Home,
  Armchair
} from "lucide-react";

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-animate');
            if (id) {
              setVisibleSections(prev => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#2c2c2c] overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --primary: #849826;
          --dark: #2c2c2c;
          --light: #f8f8f8;
          --white: #ffffff;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        /* Animation Classes */
        .animate-fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-fade-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-left.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-fade-right {
          opacity: 0;
          transform: translateX(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-scale {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-scale.visible {
          opacity: 1;
          transform: scale(1);
        }

        .animate-stagger > * {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-stagger.visible > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
        .animate-stagger.visible > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
        .animate-stagger.visible > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
        .animate-stagger.visible > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
        .animate-stagger.visible > *:nth-child(5) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }
        .animate-stagger.visible > *:nth-child(6) { transition-delay: 0.6s; opacity: 1; transform: translateY(0); }

        .award-badge {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.7s;
        }

        .shine-effect:hover::after {
          left: 100%;
        }
      `}</style>

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[450px] sm:min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="/about-hero.webp"
            alt="Udupi Homestays"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center text-white px-6 sm:px-4 max-w-5xl mx-auto animate-fade-up visible">
          <div className="mb-4 sm:mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 sm:w-12 bg-white/40" />
            <p className="text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-light">About Us</p>
            <div className="h-px w-8 sm:w-12 bg-white/40" />
          </div>
          
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 sm:mb-6 leading-tight px-4">
            ABOUT US
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="text-white/80">HOME</span>
            <span className="text-[#849826]">›</span>
            <span className="text-[#849826]">ABOUT US</span>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE SECTION ================= */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div 
              data-animate="who-we-are-left"
              className={`space-y-4 sm:space-y-6 animate-fade-left ${visibleSections.has('who-we-are-left') ? 'visible' : ''}`}
            >
              <div>
                <p className="text-[#849826] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-medium">
                  Who We Are?
                </p>
                <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
                  DISCOVER THE BEST LUXURY
                  <br />
                  <span className="text-[#849826]">HOMESTAYS IN UDUPI</span>
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">
                We offer a range of services including buying, selling, and property management solutions. Our team of experienced professionals is committed to making the process of finding and securing your perfect property as seamless and stress-free as possible.
              </p>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our agents specialize in finding the perfect homes and commercial properties. We deliver the best of service, ensuring that every step of your journey is smooth and effortless.
              </p>

              <div className="pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium">Location:</p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Udupi, Karnataka, India
                </p>
              </div>

              <button className="mt-6 sm:mt-8 bg-[#849826] text-white px-6 sm:px-8 py-3 sm:py-3.5 hover:bg-[#6d7d20] transition-all duration-300 uppercase text-xs sm:text-sm tracking-wider font-medium shine-effect w-full sm:w-auto">
                LEARN MORE
              </button>
            </div>

            {/* Right Image */}
            <div 
              data-animate="who-we-are-right"
              className={`relative mt-8 lg:mt-0 animate-fade-right ${visibleSections.has('who-we-are-right') ? 'visible' : ''}`}
            >
              <img
                src="/about-story.webp"
                alt="Luxury Homestay"
                className="w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover shadow-2xl"
              />
              
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 lg:-left-12 award-badge">
                <div className="bg-[#2c2c2c] text-white rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-xl border-2 sm:border-4 border-white">
                  <div className="text-[#849826] text-2xl sm:text-3xl mb-1">★</div>
                  <div className="text-center">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide">Award</p>
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide">Winning</p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest mt-1">Hotel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS COUNTER ================= */}
      <section className="py-12 sm:py-16 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-animate="stats"
            className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center animate-stagger ${visibleSections.has('stats') ? 'visible' : ''}`}
          >
            <div className="space-y-2 sm:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#849826] font-serif">
                15+
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">Premium Properties</p>
              <p className="text-xs sm:text-sm text-gray-500">Curated homestays across Udupi</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#849826] font-serif">
                2500+
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">Happy Guests</p>
              <p className="text-xs sm:text-sm text-gray-500">Memorable stays delivered</p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#849826] font-serif">
                8+
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">Years Experience</p>
              <p className="text-xs sm:text-sm text-gray-500">In hospitality excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES & FACILITIES ================= */}
      <section 
        className="py-16 sm:py-20 md:py-32 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/view/3.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Service Icons Grid */}
          <div 
            data-animate="services-icons"
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-12 sm:mb-16 animate-fade-up ${visibleSections.has('services-icons') ? 'visible' : ''}`}
          >
            {[
              { icon: <Snowflake className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, label: "Air Condition" },
              { icon: <Wifi className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, label: "Speed Internet" },
              { icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, label: "Smart Lock" },
              { icon: <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, label: "Gym Center" },
              { icon: <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, label: "Breakfast" },
              { icon: <Waves className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />, label: "Swimming Pool" },
            ].map((service, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto border-2 border-[#849826]/40 flex items-center justify-center mb-2 sm:mb-3 group-hover:border-[#849826] group-hover:scale-110 transition-all duration-300 text-white/80 group-hover:text-white">
                  {service.icon}
                </div>
                <p className="text-[10px] sm:text-xs text-white/70 group-hover:text-white transition-colors uppercase tracking-wide">
                  {service.label}
                </p>
              </div>
            ))}
          </div>

          {/* Section Header */}
          <div 
            data-animate="services-header"
            className={`text-center mb-12 sm:mb-16 px-4 animate-fade-up ${visibleSections.has('services-header') ? 'visible' : ''}`}
          >
            <p className="text-[#849826] text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-light">
              Our Hotel Services
            </p>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              OUR COMFORTABLE <span className="text-[#849826] italic">SERVICES</span>
            </h2>
          </div>

          {/* Service Cards */}
          <div 
            data-animate="services-cards"
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto animate-stagger ${visibleSections.has('services-cards') ? 'visible' : ''}`}
          >
            {[
              {
                icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12" />,
                title: "ROOM SECURITY",
                desc: "Secure lock systems and 24/7 monitoring for your peace of mind.",
              },
              {
                icon: <Home className="w-10 h-10 sm:w-12 sm:h-12" />,
                title: "FULL AMENITIES",
                desc: "Premium bedding, AC, and all essential comforts included.",
              },
              {
                icon: <Armchair className="w-10 h-10 sm:w-12 sm:h-12" />,
                title: "COMFORTABLE ROOMS",
                desc: "Spacious interiors with elegant traditional-modern design.",
              },
            ].map((service, i) => (
              <div 
                key={i} 
                className="bg-white text-[#2c2c2c] px-6 py-10 sm:px-8 sm:py-12 text-center group hover:shadow-2xl transition-all duration-500 border-t-4 border-transparent hover:border-[#849826]"
              >
                <div className="text-[#849826] mb-5 sm:mb-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 inline-block">
                  {service.icon}
                </div>
                <h3 className="font-serif text-base sm:text-lg font-semibold mb-4 sm:mb-5 uppercase tracking-wider text-[#2c2c2c]">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                  {service.desc}
                </p>
                <button className="text-[#849826] text-xs sm:text-sm font-normal flex items-center gap-2 mx-auto group-hover:gap-4 transition-all">
                  Read More 
                  <span className="text-sm sm:text-base">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KARNATAKA TOURISM ================= */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            
            <div 
              data-animate="karnataka-img"
              className={`order-2 lg:order-1 animate-scale ${visibleSections.has('karnataka-img') ? 'visible' : ''}`}
            >
              <div className="relative">
                <img
                  src="/karntaka.webp"
                  alt="Karnataka Tourism"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-full h-full border-2 sm:border-4 border-[#849826]/30 -z-10" />
              </div>
            </div>

            <div 
              data-animate="karnataka-text"
              className={`order-1 lg:order-2 space-y-4 sm:space-y-6 animate-fade-right ${visibleSections.has('karnataka-text') ? 'visible' : ''}`}
            >
              <div>
                <p className="text-[#849826] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-medium">
                  Official Recognition
                </p>
                <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
                  Honored by
                  <br />
                  <span className="text-[#849826] italic">Karnataka Tourism</span>
                </h2>
                <p className="font-serif text-lg sm:text-xl text-[#849826] italic mb-4 sm:mb-6">
                  One State Many Worlds
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Recognized for our commitment to authentic hospitality and cultural preservation.
              </p>

              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                {[
                  "Official Tourism Partner",
                  "Excellence in Hospitality",
                  "Cultural Preservation Award",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-10 sm:w-12 h-[2px] bg-[#849826] group-hover:w-12 sm:group-hover:w-16 transition-all duration-300" />
                    <span className="text-gray-700 group-hover:text-[#849826] transition-colors text-sm sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 sm:py-20 md:py-32 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            data-animate="why-header"
            className={`text-center mb-12 sm:mb-16 animate-fade-up ${visibleSections.has('why-header') ? 'visible' : ''}`}
          >
            <p className="text-[#849826] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-medium">
              Why Choose Us
            </p>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold">
              WHAT MAKES US SPECIAL
            </h2>
          </div>

          <div 
            data-animate="why-cards"
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-stagger ${visibleSections.has('why-cards') ? 'visible' : ''}`}
          >
            {[
              {
                title: "Prime Location",
                desc: "Near major attractions and beaches",
                number: "01"
              },
              {
                title: "Authentic Experience",
                desc: "Genuine Karnataka hospitality",
                number: "02"
              },
              {
                title: "Modern Comfort",
                desc: "Contemporary amenities",
                number: "03"
              },
              {
                title: "Personal Service",
                desc: "Dedicated attention to detail",
                number: "04"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group border-t-4 border-transparent hover:border-[#849826]">
                <div className="text-[#849826]/20 text-5xl sm:text-6xl font-serif font-bold mb-3 sm:mb-4 group-hover:text-[#849826]/40 transition-colors">
                  {item.number}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#2c2c2c]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div 
            data-animate="why-stats"
            className={`mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center animate-stagger ${visibleSections.has('why-stats') ? 'visible' : ''}`}
          >
            <div className="bg-white p-6 sm:p-8 shadow-md">
              <div className="text-[#849826] text-3xl sm:text-4xl font-serif font-bold mb-2">4.9/5</div>
              <p className="text-gray-600 text-xs sm:text-sm">Guest Rating</p>
              <div className="flex justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#849826] fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 shadow-md">
              <div className="text-[#849826] text-3xl sm:text-4xl font-serif font-bold mb-2">98%</div>
              <p className="text-gray-600 text-xs sm:text-sm">Guest Satisfaction</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-2">Would recommend</p>
            </div>

            <div className="bg-white p-6 sm:p-8 shadow-md">
              <div className="text-[#849826] text-3xl sm:text-4xl font-serif font-bold mb-2">24/7</div>
              <p className="text-gray-600 text-xs sm:text-sm">Support Available</p>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-2">Always here</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PROMISE ================= */}
      <section className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div 
            data-animate="promise-header"
            className={`text-center mb-12 sm:mb-16 animate-fade-up ${visibleSections.has('promise-header') ? 'visible' : ''}`}
          >
            <p className="text-[#849826] text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4 font-medium">
              Our Promise
            </p>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-4 sm:mb-6">
              Creating Memories That
              <br />
              <span className="text-[#849826] italic">Last Forever</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              At Udupi Homestays, we believe hospitality is deeply personal. Every detail is crafted with warmth, respect, and genuine care.
            </p>
          </div>

          {/* Promise Cards Grid */}
          <div 
            data-animate="promise-cards"
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-stagger ${visibleSections.has('promise-cards') ? 'visible' : ''}`}
          >
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Feel at Home",
                desc: "We create a warm, welcoming environment where you can truly relax and be yourself."
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Personal Attention",
                desc: "Every guest receives dedicated care and attention to ensure a memorable stay."
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: "Authentic Experience",
                desc: "Immerse yourself in local culture and genuine Karnataka hospitality."
              }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-[#849826]/10 text-[#849826] group-hover:bg-[#849826] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4 text-[#2c2c2c]">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quote Section */}
          <div 
            data-animate="promise-quote"
            className={`bg-[#f8f8f8] rounded-lg p-8 sm:p-12 text-center max-w-4xl mx-auto animate-fade-up ${visibleSections.has('promise-quote') ? 'visible' : ''}`}
          >
            <svg className="w-12 h-12 text-[#849826] mx-auto mb-6 opacity-40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
            
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2c2c2c] leading-relaxed mb-6 italic">
              "A place where strangers become friends, and guests become family."
            </blockquote>
            
            <div className="w-24 h-1 bg-[#849826] mx-auto mb-6"></div>
            
            <p className="text-sm text-gray-600">
              - Udupi Homestays Team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}