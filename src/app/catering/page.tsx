"use client";

import Image from "next/image";
import Link from "next/link";

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      {/* Hero Section - Taj Style */}
      <section id="hero" className="relative w-full overflow-hidden bg-black" style={{ height: "70vh", minHeight: "500px" }}>
        {/* Background Image */}
        <div className="relative h-full w-full">
          <Image
            src="/catering-hero.jpg"
            alt="Catering Services"
            fill
            className="object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Back Button - Top Left */}
          <Link
            href="/"
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
                
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.02em] uppercase leading-tight drop-shadow-lg">
                    Premium Catering
                  </h1>
                  <p className="text-base md:text-lg font-light mt-2 text-white/90 tracking-wide">
                    Exceptional Culinary Experiences
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section - Brand Green Style */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#f2f7f1] to-[#f8faf7]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            {/* Decorative Header with Lines */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 md:w-10 bg-[#849826]"></div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-[#161616] tracking-normal uppercase">
                Event Catering Solutions
              </h2>
              <div className="h-px w-8 md:w-10 bg-[#849826]"></div>
            </div>
            
            <p className="text-base md:text-lg text-[#1c1c1c]/70 font-light max-w-3xl mx-auto leading-relaxed">
              Whether you're planning an intimate gathering or a grand celebration, our catering services deliver exceptional cuisine and flawless execution. We specialize in creating memorable dining experiences tailored to your estate and event.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Dining Section */}
      <section className="relative w-full overflow-hidden bg-[#fbfaf7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left Side - Content */}
          <div className="bg-gradient-to-br from-[#849826] to-[#6d7f1e] p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            {/* Top Content */}
            <div>
              {/* Label */}
              <div className="mb-6">
                <span className="text-white/90 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
                  BEST FOODS IN HOTEL
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Our Signature Dining
              </h2>

              {/* Description */}
              <p className="text-white/90 text-base md:text-lg font-light leading-relaxed max-w-xl">
                Embark on a journey of exquisite experiences, encompassing impeccable service, sophisticated ambience and masterful culinary artistry. Fish lavanghi platter stuffed fish with onion, pomegranate, walnut and sauce
              </p>
            </div>

            {/* Bottom Content - Thumbnails and Navigation */}
            <div className="mt-12">
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/30 hover:border-white transition-all cursor-pointer">
                  <Image
                    src="/catering1.webp"
                    alt="Dish 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/30 hover:border-white transition-all cursor-pointer">
                  <Image
                    src="/Catering2.webp"
                    alt="Dish 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/30 hover:border-white transition-all cursor-pointer">
                  <Image
                    src="/catering-hero.jpg"
                    alt="Dish 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-white/30 hover:border-white transition-all cursor-pointer">
                  <Image
                    src="/reception.jpg"
                    alt="Dish 4"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button className="w-12 h-12 bg-white/80 hover:bg-white rounded-lg flex items-center justify-center transition-all group">
                  <svg className="w-5 h-5 text-[#849826] group-hover:text-[#6d7f1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all border border-white/40">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Large Image */}
          <div className="relative min-h-[400px] lg:min-h-[600px] bg-gradient-to-br from-gray-900 to-gray-800">
            <Image
              src="/catering-hero.jpg"
              alt="Signature Dining Experience"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#849826]/20" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 md:py-32 bg-[#fbfaf7]">
        <div className="mx-auto max-w-6xl px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 md:w-10 bg-[#849826]"></div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-[#161616] tracking-normal uppercase">
                Plan Your Event
              </h2>
              <div className="h-px w-8 md:w-10 bg-[#849826]"></div>
            </div>
            <p className="text-base md:text-lg text-[#1c1c1c]/70 font-light max-w-2xl mx-auto leading-relaxed">
              Let us create an unforgettable culinary experience for your special occasion
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Left Column - Image */}
            <div className="lg:col-span-1">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/catering1.webp"
                  alt="Premium Catering Service"
                  fill
                  quality={95}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="lg:col-span-2 flex flex-col justify-center space-y-10">
              {/* Introduction */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-6 bg-[#849826]"></div>
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-[#849826]">Get In Touch</span>
                </div>
                <p className="text-lg md:text-xl font-light text-[#161616] leading-relaxed">
                  Our dedicated culinary team is ready to transform your vision into an exceptional dining experience. Contact us to discuss your event details, dietary preferences, and menu options.
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WhatsApp Card */}
                <div className="p-6 md:p-8 bg-white rounded-xl border border-[#e8f0dd] hover:border-[#849826]/60 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#849826]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#849826]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-4.82 5.591-4.82 9.128 0 3.659 2.007 7.226 5.466 9.359 1.896 1.089 4.057 1.727 6.29 1.727 1.923 0 3.808-.471 5.516-1.398l.142-.072 3.85 1.007-1.024-3.717.118-.176a9.926 9.926 0 002.457-5.857 9.93 9.93 0 00-1.518-6.032A9.938 9.938 0 0012.051 2.75c-5.456 0-9.885 3.582-10.986 8.289"/>
                      </svg>
                    </div>
                    <h3 className="text-base font-light text-[#161616] uppercase tracking-wide">WhatsApp</h3>
                  </div>
                  <div className="space-y-1">
                    <a href="https://wa.me/918971220576" className="text-lg font-light text-[#849826] hover:text-[#6a7a1f] transition-colors">
                      +91 89712 20576
                    </a>
                    <a href="https://wa.me/918050123132" className="text-lg font-light text-[#849826] hover:text-[#6a7a1f] transition-colors block">
                      +91 80501 23132
                    </a>
                    <p className="text-sm text-[#1c1c1c]/60 mt-2">Instant responses & quick inquiries</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-6 md:p-8 bg-white rounded-xl border border-[#e8f0dd] hover:border-[#849826]/60 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#849826]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#849826]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-light text-[#161616] uppercase tracking-wide">Email</h3>
                  </div>
                  <div className="space-y-1">
                    <a href="mailto:fahad@udupistay.com" className="text-lg font-light text-[#849826] hover:text-[#6a7a1f] transition-colors block">
                      fahad@udupistay.com
                    </a>
                    <a href="mailto:asif@udupistay.com" className="text-lg font-light text-[#849826] hover:text-[#6a7a1f] transition-colors block">
                      asif@udupistay.com
                    </a>
                    <p className="text-sm text-[#1c1c1c]/60 mt-2">Detailed proposals & menus</p>
                  </div>
                </div>
              </div>

              {/* Response Info */}
              <div className="pt-6 border-t border-[#e8f0dd]">
                <div className="space-y-2">
                  <p className="text-sm font-light text-[#161616]">
                    <span className="text-[#849826]">Response Time:</span> Within 24 hours
                  </p>
                  <p className="text-sm text-[#1c1c1c]/70 leading-relaxed">
                    Share your event date, guest count, cuisine preferences, and budget to receive a customized catering proposal tailored to your estate and celebration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
