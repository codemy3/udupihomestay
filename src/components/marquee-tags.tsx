'use client';

export default function MarqueeTags() {
  const tags = [
    'Luxury Homestays',
    'Best Luxury Resort',
    'Perfect Vacation',
    'Udupi Paradise',
    'Comfort & Elegance',
    'Premium Stay Experience',
    'Health & Wellness',
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#111] py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#111] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#111] to-transparent z-10" />

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...tags, ...tags].map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-5 px-6"
            >
              {/* Brand star (SVG, not emoji) */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#849826"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L14.9 8.62L22 9.27L16.5 14.02L18.18 21L12 17.27L5.82 21L7.5 14.02L2 9.27L9.1 8.62L12 2Z" />
              </svg>

              <span className="text-base md:text-lg lg:text-xl font-medium tracking-widest text-white uppercase">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
