"use client";

import Image from "next/image";
import Link from "next/link";
import { getHomestayByRoute } from "@/data/homestays";
import HomestayGallery from "@/components/homestay-gallery";
import { useParams } from "next/navigation";

const homestayImages: Record<string, string[]> = {
  whitehouse: [
    "/whitehouse/12.webp",
    "/whitehouse/4.webp",
    "/whitehouse/11.webp",
    "/whitehouse/8.webp",
    "/whitehouse/2.webp",
    "/whitehouse/h3.webp",
    "/whitehouse/h2.webp",
    "/whitehouse/6.webp"
  ],
  gardenvilla: Array.from({ length: 11 }, (_, i) => i < 9 ? `/Cottage/${i + 1}.webp` : `/whitehouse/${i - 8}.webp`),
  cottagehouse: Array.from({ length: 11 }, (_, i) => `/Cottage/${i + 1}.webp`),
  hilltopvilla: Array.from({ length: 8 }, (_, i) => `/hilltop/${i + 1}.webp`),
  sunrisehome: Array.from({ length: 15 }, (_, i) => i < 9 ? `/sunrise/${i + 1}.webp` : `/sunrise/S${i - 8}.webp`),
  chaletlabonne: Array.from({ length: 14 }, (_, i) => `/chalet/${i + 1}.webp`),
  viewpoint: Array.from({ length: 10 }, (_, i) => i < 10 ? `/view/${i + 1}.webp` : `/view/V${i - 9}.webp`),
};

export default function HomestayPage() {
  const params = useParams();
  const route = params.homestay as string;
  const homestay = getHomestayByRoute(route);

  if (!homestay) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fbfaf7]">
        <div className="text-center">
          <h1 className="text-3xl font-light text-[#161616] mb-4">Property Not Found</h1>
          <Link href="/stays" className="text-[#1f7a3f] hover:text-[#155a2f]">â† Back</Link>
        </div>
      </div>
    );
  }
  const images = homestayImages[homestay.id] || [];
  
  // Use specific hero image for whitehouse
  const heroImage = homestay.id === 'whitehouse' ? '/whitetop.webp' : images[0];

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      {/* Hero Section - Taj Style */}
      <section id="hero" className="relative w-full overflow-hidden bg-black" style={{ height: "70vh", minHeight: "500px" }}>
        {/* Background Image - Single Beautiful Image */}
        <div className="relative h-full w-full">
          {heroImage && (
            <>
              <Image
                src={heroImage}
                alt={homestay.title}
                fill
                className="object-cover"
                priority
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30" />
            </>
          )}

          {/* Back Button - Top Left */}
          <Link
            href="/stays"
            className="absolute top-8 left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Hero Text - Taj Style (Left Aligned with Decorative Line) */}
          <div className="absolute inset-0 flex items-center left-8 md:left-16 lg:left-24 text-white z-30">
            <div>
              <div className="flex items-center gap-3 md:gap-4">
                {/* Decorative Line to the Left */}
                <div className="h-[1px] w-6 md:w-8 bg-white"></div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.02em] uppercase leading-tight drop-shadow-lg">
                  {homestay.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section - Brand Green Style */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#f2f7f1] to-[#f8faf7]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            {/* Decorative Header with Lines */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 md:w-10 bg-[#849826]"></div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-[#161616] tracking-normal uppercase">
                Explore {homestay.title}
              </h2>
              <div className="h-px w-8 md:w-10 bg-[#849826]"></div>
            </div>
            
            <p className="text-base md:text-lg text-[#1c1c1c]/70 font-light max-w-3xl mx-auto leading-relaxed">
              From a luxury retreat to your perfect getaway, our {homestay.rooms}-bedroom property brings your imagination to life with premium amenities and breathtaking views.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-4 md:p-5 bg-white rounded border border-[#e8f0dd] hover:border-[#849826]/50 hover:shadow-md transition-all duration-500">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-[#849826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-light text-[#849826] mb-1">{homestay.rooms}</div>
              <p className="text-xs md:text-sm uppercase tracking-[0.05em] text-[#1c1c1c]/60">Bedrooms</p>
            </div>
            <div className="text-center p-4 md:p-5 bg-white rounded border border-[#e8f0dd] hover:border-[#849826]/50 hover:shadow-md transition-all duration-500">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-[#849826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-light text-[#849826] mb-1">{homestay.bathrooms}</div>
              <p className="text-xs md:text-sm uppercase tracking-[0.05em] text-[#1c1c1c]/60">Bathrooms</p>
            </div>
            <div className="text-center p-4 md:p-5 bg-white rounded border border-[#e8f0dd] hover:border-[#849826]/50 hover:shadow-md transition-all duration-500">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-[#849826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-2xl md:text-3xl font-light text-[#849826] mb-1">{homestay.guests}</div>
              <p className="text-xs md:text-sm uppercase tracking-[0.05em] text-[#1c1c1c]/60">Guests</p>
            </div>
            <div className="text-center p-4 md:p-5 bg-white rounded border border-[#e8f0dd] hover:border-[#849826]/50 hover:shadow-md transition-all duration-500">
              <div className="flex justify-center mb-2">
                <svg className="w-6 h-6 text-[#849826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xl md:text-2xl font-light text-[#849826] mb-1">â‚¹{(homestay.pricePerNight / 1000).toFixed(0)}K</div>
              <p className="text-xs md:text-sm uppercase tracking-[0.05em] text-[#1c1c1c]/60">Per Night</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Premium Mosaic */}
      <section className="relative py-0 bg-white">
        <div className="w-full">
          {/* Mosaic Gallery Grid - No side borders, sharp edges */}
          <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:auto-rows-[180px]">
            {images[0] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1 md:row-start-1 md:col-start-1 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[0]}
                  alt={`${homestay.title} - 1`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[1] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-2 md:row-start-1 md:col-start-2 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[1]}
                  alt={`${homestay.title} - 2`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[2] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1 md:row-start-1 md:col-start-3 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[2]}
                  alt={`${homestay.title} - 3`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[3] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1 md:row-start-1 md:col-start-4 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[3]}
                  alt={`${homestay.title} - 4`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[4] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-2 md:row-start-2 md:col-start-1 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[4]}
                  alt={`${homestay.title} - 5`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[5] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1 md:row-start-2 md:col-start-3 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[5]}
                  alt={`${homestay.title} - 6`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[6] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-2 md:row-start-2 md:col-start-4 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[6]}
                  alt={`${homestay.title} - 7`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[7] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-2 md:row-span-1 md:row-start-3 md:col-start-2 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[7]}
                  alt={`${homestay.title} - 8`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}

            {images[8] && (
              <div className="relative aspect-[4/3] md:aspect-auto md:col-span-1 md:row-span-1 md:row-start-4 md:col-start-4 overflow-hidden cursor-pointer bg-neutral-100">
                <Image
                  src={images[8]}
                  alt={`${homestay.title} - 9`}
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* View More Button */}
          {images.length > 9 && (
            <div className="text-center py-12 px-6">
              <button
                onClick={() => {
                  const gallerySection = document.getElementById('full-gallery');
                  gallerySection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#849826] text-white font-light hover:bg-[#6d7d20] transition-all duration-300 uppercase tracking-[0.15em] text-sm"
              >
                View More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About Section - Premium Redesign */}
      <section className="relative py-20 md:py-24 bg-white">
        {/* Vector3 Background Decoration */}
        <Image
          src="/Vector3.png"
          alt="Decorative vector background"
          width={800}
          height={800}
          quality={95}
          className="absolute -right-12 -top-20 w-[800px] h-[800px] pointer-events-none hidden lg:block"
        />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Images - Left Side (Full Column) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Top Image - Larger */}
              <div className="relative w-full h-64 md:h-80 overflow-hidden shadow-lg rounded-lg">
                <Image
                  src="/whiteHousenew.webp"
                  alt="White House luxury interior"
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
              
              {/* Bottom Image */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden shadow-lg rounded-lg">
                <Image
                  src="/whitehouse/12.webp"
                  alt="White House luxury amenity"
                  fill
                  quality={95}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-[#849826] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
                <p className="text-xs font-light uppercase tracking-[0.15em] text-[#849826]">White House</p>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#161616] mb-6 leading-tight">
                Luxury Escape in the Heart of Udupi
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg font-light text-[#1c1c1c]/70 leading-relaxed mb-8">
                White House is a refined 6 BHK villa perfectly positioned just 6 km from Malpe Beach and minutes from Udupi's finest destinations. With spacious interiors, modern comforts, and a serene atmosphere, it's the ideal sanctuary to elevate your break.
              </p>

              {/* Divider Line */}
              <div className="h-[1px] bg-[#d4e8d4] mb-8"></div>

              {/* Features Grid - 2x2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 10h18M3 14h18M3 18h18M8 6v12M16 6v12" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1c1c1c] font-light">Complete Kitchen Utensils</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-3" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1c1c1c] font-light">Free Cleaning</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M7 12a5 5 0 1110 0 5 5 0 01-10 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1c1c1c] font-light">Game Room (Roof Top)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#849826] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  <div>
                    <p className="text-sm text-[#1c1c1c] font-light">High-speed Internet</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#849826] text-white font-light rounded-lg hover:bg-[#6d7d20] transition-all duration-300 uppercase tracking-[0.1em] text-sm"
                >
                  About Us
                </Link>
                <a
                  href="https://wa.me/918971220576?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20the%20property"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#849826] text-white font-light rounded-lg hover:bg-[#6d7d20] transition-all duration-300 uppercase tracking-[0.1em] text-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Booking Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
