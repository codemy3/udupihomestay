const experiences = [
  {
    title: "Heritage temple trail",
    desc: "Guided visits to timeless shrines with local historians and storytellers.",
  },
  {
    title: "Coastal culinary studio",
    desc: "Hands-on cooking sessions with seasonal produce and Udupi spices.",
  },
  {
    title: "Backwater sunrise",
    desc: "Boat rides through mangroves followed by slow breakfast spreads.",
  },
  {
    title: "Wellness rituals",
    desc: "Ayurvedic-inspired therapies and mindful movement sessions.",
  },
];

export default function ExperiencesPage() {
  return (
    <div className="bg-background">
      <section id="hero" className="border-b border-border bg-surface pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Experiences
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">
            Curated days that feel like stories.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-foreground/70">
            From culinary workshops to heritage walks, every experience is crafted
            for deeper connections with Udupi&apos;s coastal culture.
          </p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border bg-surface p-6"
            >
              <div className="mb-5 h-36 rounded-2xl bg-muted" />
              <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
              <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
