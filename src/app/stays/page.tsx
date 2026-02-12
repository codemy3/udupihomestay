"use client";

import Image from "next/image";
import Link from "next/link";
import { homestays } from "@/data/homestays";

export default function StaysPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden border-b border-[#e5dfd6] bg-gradient-to-r from-[#fbfaf7] via-[#f0ede7] to-[#fbfaf7] pt-32">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1f7a3f]">
              Curated Experiences
            </p>
            <h1 className="mt-4 text-5xl font-light text-[#161616] md:text-6xl">
              Exquisite Homestays
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-[#1c1c1c]/70">
              Discover our collection of premium properties, each designed with meticulous attention to luxury, comfort, and the unique character of Udupi's coastal charm.
            </p>
            <p className="mt-4 text-sm text-[#1f7a3f] font-medium">
              {homestays.length} Exclusive Destinations • Choose Your Perfect Retreat
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#1f7a3f]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#1f7a3f]/5 blur-3xl" />
      </section>

      {/* Properties Grid */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {homestays.map((stay) => (
            <Link href={`/${stay.route}`} key={stay.id}>
              <div className="group h-full overflow-hidden rounded-xl bg-white border border-[#e5dfd6] backdrop-blur-sm hover:border-[#1f7a3f] transition-all duration-500 hover:shadow-2xl hover:shadow-[#1f7a3f]/10 cursor-pointer">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#f0ede7] to-[#e5dfd6]">
                  <Image
                    src={stay.image}
                    alt={stay.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/60 via-[#161616]/20 to-transparent" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-[#1f7a3f]/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-white font-semibold text-sm">₹{stay.pricePerNight.toLocaleString()}</p>
                    <p className="text-white/80 text-xs">per night</p>
                  </div>

                  {/* Room & Guest Info */}
                  <div className="absolute bottom-4 left-4 flex gap-4 text-white text-xs font-medium">
                    <div className="bg-[#161616]/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      🛏️ {stay.rooms} rooms
                    </div>
                    <div className="bg-[#161616]/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      👥 {stay.guests} guests
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f7a3f]">
                    {stay.subtitle}
                  </p>

                  {/* Title */}
                  <h3 className="mt-3 text-2xl font-light text-[#161616] group-hover:text-[#1f7a3f] transition-colors">
                    {stay.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-[#1c1c1c]/70 line-clamp-2">
                    {stay.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stay.highlights.slice(0, 2).map((highlight, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-[#f0ede7] text-[#1f7a3f] border border-[#e5dfd6]">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-[#1f7a3f] font-semibold">
                      ↳ Explore Details
                    </span>
                    <div className="flex items-center gap-2 text-[#1f7a3f] font-semibold text-sm group-hover:gap-3 transition-all">
                      More <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 border-t border-[#e5dfd6]">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1f7a3f]">
            Find Your Match
          </p>
          <h2 className="text-center text-3xl font-light text-[#161616] mb-8">
            Find Your Perfect Match
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-[#1c1c1c]">
            <thead>
              <tr className="border-b border-[#e5dfd6] bg-[#f0ede7]">
                <th className="text-left py-4 px-4 text-[#161616] font-semibold">Property</th>
                <th className="text-center py-4 px-4 text-[#1f7a3f]">Rooms</th>
                <th className="text-center py-4 px-4 text-[#1f7a3f]">Guests</th>
                <th className="text-center py-4 px-4 text-[#1f7a3f]">Bathrooms</th>
                <th className="text-right py-4 px-4 text-[#1f7a3f]">Per Night</th>
              </tr>
            </thead>
            <tbody>
              {homestays.map((stay) => (
                <tr key={stay.id} className="border-b border-[#e5dfd6] hover:bg-[#f0ede7] transition-colors">
                  <td className="py-4 px-4 font-semibold text-[#161616]">{stay.title}</td>
                  <td className="py-4 px-4 text-center">{stay.rooms}</td>
                  <td className="py-4 px-4 text-center">{stay.guests}</td>
                  <td className="py-4 px-4 text-center">{stay.bathrooms}</td>
                  <td className="py-4 px-4 text-right font-semibold text-[#1f7a3f]">₹{stay.pricePerNight.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 text-center border-t border-[#e5dfd6]">
        <h2 className="text-3xl font-light text-[#161616] mb-4">Ready to Book Your Escape?</h2>
        <p className="text-[#1c1c1c]/70 mb-8">Contact us to reserve your preferred property and experience luxury living.</p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#1f7a3f] to-[#114d2f] text-white font-semibold rounded-lg hover:from-[#114d2f] hover:to-[#0a3620] transition-all duration-300 shadow-lg hover:shadow-[#1f7a3f]/30"
        >
          Book Now →
        </Link>
      </section>
    </div>
  );
}
