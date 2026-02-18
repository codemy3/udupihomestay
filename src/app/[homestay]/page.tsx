"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getHomestayByRoute } from "@/data/homestays";
import ExploreSection from "@/components/Exploresection";
import CinematicGallery from "@/components/Cinematicgallery";

const homestayImages: Record<string, string[]> = {
  whitehouse: [
    "/whitehouse/12.webp",
    "/whitehouse/4.webp",
    "/whitehouse/11.webp",
    "/whitehouse/8.webp",
    "/whitehouse/2.webp",
    "/whitehouse/h3.webp",
    "/whitehouse/h2.webp",
    "/whitehouse/6.webp",
  ],
  gardenvilla:   Array.from({ length: 11 }, (_, i) => i < 9 ? `/Cottage/${i + 1}.webp` : `/whitehouse/${i - 8}.webp`),
  cottagehouse:  Array.from({ length: 11 }, (_, i) => `/Cottage/${i + 1}.webp`),
  hilltopvilla:  Array.from({ length: 8 },  (_, i) => `/hilltop/${i + 1}.webp`),
  sunrisehome:   Array.from({ length: 15 }, (_, i) => i < 9 ? `/sunrise/${i + 1}.webp` : `/sunrise/S${i - 8}.webp`),
  chaletlabonne: Array.from({ length: 14 }, (_, i) => `/chalet/${i + 1}.webp`),
  viewpoint:     Array.from({ length: 10 }, (_, i) => `/view/${i + 1}.webp`),
};

export default function HomestayPage() {
  const params  = useParams();
  const route   = params.homestay as string;
  const homestay = getHomestayByRoute(route);

  if (!homestay) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fbfaf7]">
        <div className="text-center">
          <h1 className="text-3xl font-light text-[#161616] mb-4">Property Not Found</h1>
          <Link href="/stays" className="text-[#1f7a3f] hover:text-[#155a2f]">← Back</Link>
        </div>
      </div>
    );
  }

  const images    = homestayImages[homestay.id] || [];
  const heroImage = homestay.id === "whitehouse" ? "/whitetop.webp" : images[0];

  return (
    <div className="min-h-screen bg-[#fbfaf7]">

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "70vh", minHeight: "500px" }}
      >
        <div className="relative h-full w-full">
          {heroImage && (
            <>
              <Image src={heroImage} alt={homestay.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-black/30" />
            </>
          )}

          <Link
            href="/stays"
            className="absolute top-8 left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded transition-all duration-300 flex items-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <div className="absolute inset-0 flex items-center left-8 md:left-16 lg:left-24 text-white z-30">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-[1px] w-6 md:w-8 bg-white" />
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.02em] uppercase leading-tight drop-shadow-lg">
                {homestay.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-white">
        <Image
          src="/Vector3.png"
          alt="Decorative vector"
          width={800}
          height={800}
          quality={95}
          className="absolute -right-12 -top-20 w-[800px] h-[800px] pointer-events-none hidden lg:block"
        />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Images */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative w-full h-64 md:h-80 overflow-hidden shadow-lg rounded-lg">
                <Image src="/whiteHousenew.webp" alt="Interior" fill quality={95} className="object-cover" />
              </div>
              <div className="relative w-full h-48 md:h-56 overflow-hidden shadow-lg rounded-lg">
                <Image src="/whitehouse/12.webp" alt="Amenity" fill quality={95} className="object-cover" />
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-7 flex flex-col justify-center lg:pl-8">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-[#849826] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
                <p className="text-xs font-light uppercase tracking-[0.15em] text-[#849826]">
                  {homestay.title}
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#161616] mb-6 leading-tight">
                Luxury Escape in the Heart of Udupi
              </h2>

              <p className="text-base md:text-lg font-light text-[#1c1c1c]/70 leading-relaxed mb-8">
                White House is a refined 6 BHK villa perfectly positioned just 6 km from Malpe Beach and
                minutes from Udupi's finest destinations. With spacious interiors, modern comforts, and a
                serene atmosphere, it's the ideal sanctuary to elevate your break.
              </p>

              <div className="h-[1px] bg-[#d4e8d4] mb-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {[
                  { label: "Complete Kitchen Utensils", path: "M3 6h18M3 10h18M3 14h18M3 18h18M8 6v12M16 6v12" },
                  { label: "Free Cleaning",             path: "M9 12l2 2 4-4M7 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-3" },
                  { label: "Game Room (Roof Top)",      path: "M14.828 14.828a4 4 0 01-5.656 0M7 12a5 5 0 1110 0 5 5 0 01-10 0z" },
                  { label: "High-speed Internet",       path: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
                ].map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#849826] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.path} />
                    </svg>
                    <p className="text-sm text-[#1c1c1c] font-light">{f.label}</p>
                  </div>
                ))}
              </div>

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
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Booking Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore — Polaroid Drop ───────────────────── */}
      <ExploreSection
        title={homestay.title}
        rooms={homestay.rooms}
        bathrooms={homestay.bathrooms}
        guests={homestay.guests}
        pricePerNight={homestay.pricePerNight}
      />

      {/* ── Cinematic Gallery ─────────────────────────── */}
      <CinematicGallery images={images} title={homestay.title} />

    </div>
  );
}