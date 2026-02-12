export default function ContactPage() {
  return (
    <div className="bg-background">
      <section id="hero" className="border-b border-border bg-surface pt-24">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-primary">
            Contact Us On WhatsApp For Pricing
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-foreground/70">
            Share your travel dates, guest count, and special requests. Our team
            will respond within 24 hours.
          </p>
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-4 rounded-3xl border border-border bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full name"
              className="rounded-2xl border border-border bg-transparent px-4 py-3 text-sm focus:border-secondary focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address"
              className="rounded-2xl border border-border bg-transparent px-4 py-3 text-sm focus:border-secondary focus:outline-none"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Check-in date"
              className="rounded-2xl border border-border bg-transparent px-4 py-3 text-sm focus:border-secondary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Check-out date"
              className="rounded-2xl border border-border bg-transparent px-4 py-3 text-sm focus:border-secondary focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Tell us about your stay"
            rows={5}
            className="w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm focus:border-secondary focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-white transition hover:bg-secondary-strong"
          >
            Submit inquiry
          </button>
        </form>
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary">Reservations</h2>
            <p className="mt-2 text-sm text-foreground/70">fahad@udupistay.com</p>
            <p className="text-sm text-foreground/70">asif@udupistay.com</p>
            <p className="text-sm text-foreground/70">+91 89712 20576</p>
            <p className="text-sm text-foreground/70">+91 80501 23132</p>
          </div>
          <div className="rounded-3xl border border-border bg-surface p-6">
            <h2 className="text-xl font-semibold text-primary">Address</h2>
            <p className="mt-2 text-sm text-foreground/70">
              H.No. 4-4-95, BhaghatSingh Marg, Udupi 576101
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
