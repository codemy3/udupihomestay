"use client";

import {
  ScrollRevealText,
  ScrollRevealImage,
} from "@/components/scroll-reveal";
import { StaggeredList } from "@/components/scroll-reveal-advanced";

export default function AboutPage() {
  return (
    <div className="bg-[#fbfaf7] text-[#1c1c1c] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[calc(100vh-96px)]">
        <img
          src="/about-hero.webp"
          alt="Udupi Homestays"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex h-full items-center max-w-7xl mx-auto px-8">
          <ScrollRevealText className="max-w-2xl" preset="fadeUpHeading">
            <p className="mb-6 text-xs tracking-[0.4em] uppercase text-[#c8d36f] font-light">
              About Udupi Homestays
            </p>
            <h1
              className="text-5xl md:text-7xl font-light leading-[1.1] text-white mb-6"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Where Every Stay
              <br />
              Feels Like Belonging
            </h1>
            <div className="h-px w-16 bg-white/40 mt-8" />
          </ScrollRevealText>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ backgroundImage: "url(/about-story-bg.png)" }}
      >
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />

        <div className="relative mx-auto max-w-6xl px-8">
          <ScrollRevealText className="text-center" preset="fadeUpHeading">
            <p className="text-xs tracking-[0.45em] uppercase text-black/50">
              Where Intent Lives
            </p>
            <h2
              className="mt-4 text-4xl md:text-5xl font-light"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Guardian of Grandeur
            </h2>
            <p className="mt-6 text-black/70 max-w-2xl mx-auto leading-relaxed">
              Built on a vision of thoughtful hospitality, Udupi Homestays curates
              serene spaces designed to slow you down and create meaningful memories.
            </p>
          </ScrollRevealText>

          <div className="mt-24 relative h-[480px]">
            <ScrollRevealText
              className="absolute left-0 top-0 w-1/2 z-20"
              preset="fadeUpSection"
            >
              <div className="bg-white px-12 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <span className="h-px w-12 bg-black/40 block mb-6" />
                <h3
                  className="text-4xl font-light leading-tight"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  Rooted in
                  <br />
                  Udupi
                </h3>
                <p className="mt-8 text-sm leading-[1.75] text-black/65 max-w-sm">
                  Created with a simple belief — travel should feel personal,
                  unhurried, and connected to its surroundings. Each home reflects
                  Karnataka’s cultural warmth blended with modern comfort.
                </p>
              </div>
            </ScrollRevealText>

            <ScrollRevealImage
              className="absolute right-0 bottom-0 w-3/5"
              preset="fadeInImage"
            >
              <img
                src="/about-story.webp"
                alt="Udupi Heritage"
                className="w-full h-full object-cover shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              />
            </ScrollRevealImage>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE & FACILITIES ================= */}
      <section className="relative py-24 bg-[#fbfaf7]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-10 bg-[#849826]" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide uppercase text-[#161616]">
                Experience & Facilities
              </h2>
              <div className="h-px w-10 bg-[#849826]" />
            </div>
            <p className="max-w-2xl mx-auto text-base md:text-lg font-light text-[#1c1c1c]/70 leading-relaxed">
              Thoughtfully designed spaces and modern comforts that elevate your stay beyond accommodation.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Private Pool",
                desc: "Unwind in a serene private pool surrounded by nature.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 18c3-2 6-2 9 0s6 2 9 0M3 6c3 2 6 2 9 0s6-2 9 0M5 12h14"
                    />
                  </svg>
                ),
              },
              {
                title: "Scenic Views",
                desc: "Wake up to calming views that refresh the senses.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15l4-4 3 3 4-6 7 7"
                    />
                  </svg>
                ),
              },
              {
                title: "Spacious Interiors",
                desc: "Open, airy interiors designed for comfort and elegance.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M3 14h18M7 4v16M17 4v16"
                    />
                  </svg>
                ),
              },
              {
                title: "Fully Equipped Kitchen",
                desc: "Modern kitchen with all essentials for your stay.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                ),
              },
              {
                title: "High-Speed Wi-Fi",
                desc: "Stay connected with reliable high-speed internet.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.53 16.11a6 6 0 016.94 0M5.47 13.06a10 10 0 0113.06 0M2.4 10a14 14 0 0119.2 0M12 20h.01"
                    />
                  </svg>
                ),
              },
              {
                title: "Peaceful Location",
                desc: "Quiet surroundings ideal for rest and relaxation.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v18M5 8l7-5 7 5"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white border border-[#e6eddc] rounded-xl p-8 transition-all duration-700 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#849826]/10 text-[#849826] mb-6 transition-all duration-700 group-hover:bg-[#849826] group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="text-lg font-light text-[#161616] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-light text-[#1c1c1c]/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KARNATAKA TOURISM ================= */}
      <section className="bg-[#14181c] text-white py-32">
        <div className="mx-auto max-w-7xl px-8 grid md:grid-cols-[1fr_1.15fr] gap-20 items-center">
          <ScrollRevealImage preset="fadeInImage">
            <img
              src="/karntaka.webp"
              className="w-[380px] h-[520px] object-cover rounded-t-full shadow-[0_32px_80px_rgba(0,0,0,0.35)]"
              alt="Karnataka Tourism"
            />
          </ScrollRevealImage>

          <ScrollRevealText preset="fadeUpText">
            <p className="text-xs tracking-[0.5em] uppercase text-[#b4c83f] mb-6">
              One State Many Worlds – Karnataka
            </p>
            <h2
              className="text-4xl md:text-5xl font-light mb-8"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Recognized by Karnataka Tourism
            </h2>
            <p className="text-white/80 max-w-xl leading-relaxed">
              Honored for excellence in hospitality, Udupi Homestays offers
              authentic experiences that celebrate culture, comfort, and care.
            </p>
          </ScrollRevealText>
        </div>
      </section>

      {/* ================= DIFFERENTIATOR (REPLACED EXPERIENCE) ================= */}
      <section className="py-32">
        <div className="mx-auto max-w-6xl px-8">
          <ScrollRevealText className="mb-20 text-center" preset="fadeUpHeading">
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              What Makes a Stay With Us Different
            </h2>
            <p className="mt-6 text-black/65 max-w-2xl mx-auto">
              We don’t believe in rushed itineraries or commercial hospitality.
              Our homes are designed for presence, privacy, and a deeper sense
              of connection.
            </p>
          </ScrollRevealText>

          <StaggeredList
            className="grid md:grid-cols-3 gap-14"
            itemSelector="[data-reveal]"
            staggerAmount={0.2}
          >
            {[
              {
                title: "Intentional Living",
                desc: "Spaces designed to feel calm, personal, and lived-in — not transactional.",
              },
              {
                title: "Rooted Experiences",
                desc: "Local culture, coastal rhythms, and traditions woven naturally into each stay.",
              },
              {
                title: "Quiet Comfort",
                desc: "Privacy, thoughtful amenities, and an atmosphere that lets you slow down.",
              },
            ].map((item, i) => (
              <div key={i} data-reveal>
                <span className="h-px w-10 bg-black/30 block mb-6" />
                <h3
                  className="text-2xl font-light mb-4"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-black/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </StaggeredList>
        </div>
      </section>

      {/* ================= PROMISE ================= */}
      <section className="py-28 bg-[#f2f0eb]">
        <ScrollRevealText
          className="mx-auto max-w-4xl px-8 text-center"
          preset="fadeUpSection"
        >
          <div className="h-px w-16 bg-black/20 mx-auto mb-8" />
          <h2
            className="text-4xl md:text-5xl font-light"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            A Promise of Care
          </h2>
          <p className="mt-8 text-black/70 leading-[1.8] max-w-2xl mx-auto">
            Hospitality is personal to us. Every detail, every interaction,
            and every stay is shaped with warmth, respect, and quiet attention.
          </p>
        </ScrollRevealText>
      </section>
    </div>
  );
}
