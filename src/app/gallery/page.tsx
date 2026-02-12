export default function GalleryPage() {
  return (
    <div className="bg-background">
      <section id="hero" className="border-b border-border bg-surface pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Gallery
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">
            Sunlit spaces and coastal moments.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-foreground/70">
            Visual stories from the villas, dining tables, and shoreline escapes.
            Replace these placeholders with your photography.
          </p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={`gallery-${index}`}
              className="h-48 rounded-3xl bg-muted"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
