import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChefHat, Clock3, Phone, Sparkles, Utensils } from "lucide-react";

const cateringFormats = [
  {
    title: "Wedding Celebrations",
    desc: "Grand buffet and plated menus designed for engagement, mehendi, wedding, and reception events.",
    icon: Sparkles,
  },
  {
    title: "Corporate Gatherings",
    desc: "Executive lunches, team dinners, and conference catering with reliable service flow and timing.",
    icon: CalendarDays,
  },
  {
    title: "Private Villa Events",
    desc: "Chef-led dining for birthdays and family functions inside our homestays with curated menu options.",
    icon: ChefHat,
  },
];

const menuHighlights = [
  "Regional Karnataka specialties with premium ingredients",
  "Customized vegetarian and non-vegetarian menus",
  "Live counters, desserts, and beverage service options",
  "Service team, plating, and event flow coordination",
];

const eventSteps = [
  { step: "01", title: "Share Event Details", desc: "Date, guest count, venue, and cuisine preference." },
  { step: "02", title: "Menu Curation", desc: "We suggest a balanced, premium menu based on your event style." },
  { step: "03", title: "Final Confirmation", desc: "Timeline, staff plan, and service flow are locked in." },
  { step: "04", title: "Flawless Execution", desc: "Our team delivers, serves, and manages end-to-end dining." },
];

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#1c1c1c]">
      <section className="relative h-[48vh] min-h-[320px] md:h-[58vh] overflow-hidden bg-black">
        <Image
          src="/catering-hero.jpg"
          alt="Premium catering services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/75" />

        <Link
          href="/"
          className="absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded text-sm transition-all duration-300 flex items-center gap-2 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <div className="relative z-10 h-full flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 md:pb-14 text-white">
            <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#a8bd42] mb-3">
              Udupi Homestays Catering
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-[0.02em] leading-tight max-w-4xl">
              Premium Catering for
              <span className="text-[#a8bd42]"> Memorable Events</span>
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
              Elegant menus, attentive service, and seamless execution for every
              celebration hosted at our estates or your chosen venue.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-b border-[#e8e4d9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {cateringFormats.map((format) => {
              const Icon = format.icon;
              return (
                <div
                  key={format.title}
                  className="rounded-2xl border border-[#e6e1d5] bg-[#fbfaf7] p-5 md:p-6 hover:border-[#849826]/45 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#849826]/10 text-[#849826] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base md:text-lg font-semibold uppercase tracking-[0.06em] text-[#161616] mb-2">
                    {format.title}
                  </h2>
                  <p className="text-sm text-[#1c1c1c]/65 leading-relaxed">{format.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-[#fbfaf7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="w-4 h-4 text-[#849826]" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#849826] font-semibold">
                Signature Menu Design
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.02em] text-[#161616] leading-tight">
              Crafted Dining Experiences
            </h2>
            <p className="mt-4 text-sm md:text-base text-[#1c1c1c]/70 leading-relaxed max-w-2xl">
              Every catering plan is personalized to your event scale and guest
              profile. From traditional regional flavors to contemporary spreads,
              we design menus that feel refined and memorable.
            </p>

            <div className="mt-6 space-y-3">
              {menuHighlights.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-[#849826]" />
                  <p className="text-sm text-[#1c1c1c]/70">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative h-[180px] md:h-[230px] rounded-xl overflow-hidden border border-[#e6e1d5]">
                <Image src="/catering.jpg" alt="Catering dish presentation" fill className="object-cover" />
              </div>
              <div className="relative h-[180px] md:h-[230px] rounded-xl overflow-hidden border border-[#e6e1d5]">
                <Image src="/catering2.jpg" alt="Catering platter setup" fill className="object-cover" />
              </div>
              <div className="relative h-[180px] md:h-[230px] rounded-xl overflow-hidden border border-[#e6e1d5] col-span-2">
                <Image src="/catering3.jpg" alt="Event catering setup" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute left-4 bottom-4 text-white text-sm md:text-base uppercase tracking-[0.12em] font-semibold">
                  Premium Service Flow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-white border-y border-[#e8e4d9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#849826] font-semibold">
                Event Workflow
              </p>
              <div className="h-px w-8 md:w-10 bg-[#849826]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-[0.02em] text-[#161616]">
              How We Plan Your Catering
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {eventSteps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-[#e6e1d5] bg-[#fbfaf7] p-5 md:p-6">
                <p className="text-xl md:text-2xl font-semibold text-[#849826]">{item.step}</p>
                <h3 className="mt-2 text-base font-semibold uppercase tracking-[0.06em] text-[#161616]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#1c1c1c]/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-gradient-to-br from-[#1d1d1d] via-[#20220f] to-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#a8bd42] font-semibold mb-3">
                Plan Your Event
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.02em] leading-tight">
                Let Our Team Curate Your Menu
              </h2>
              <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">
                Share your event date, number of guests, and food preference.
                We will send a tailored catering recommendation and service plan.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <a
                href="https://wa.me/918971220576"
                className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 hover:border-[#849826]/55 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#a8bd42]" />
                  <span className="text-sm">+91 89712 20576</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#a8bd42]" />
              </a>

              <a
                href="mailto:fahad@udupistay.com"
                className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 hover:border-[#849826]/55 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ChefHat className="w-4 h-4 text-[#a8bd42]" />
                  <span className="text-sm">fahad@udupistay.com</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#a8bd42]" />
              </a>

              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/70 pt-1">
                <Clock3 className="w-4 h-4 text-[#a8bd42]" />
                Response time: within 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
