export function HeroSection() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,30rem)] lg:items-start lg:gap-20 lg:py-36">
        <div className="max-w-4xl">
          <p className="mb-8 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            entangled.space
          </p>
          <h1 className="max-w-4xl text-5xl leading-[0.92] font-medium tracking-[-0.04em] text-foreground sm:text-6xl lg:text-8xl">
            An open protocol for regenerative economies.
          </h1>
        </div>

        <div className="bg-transparent">
          <div className="aspect-square w-full overflow-hidden bg-background">
            <iframe
              src="https://dev-world.plantasia.space/?mode=10&fullscreen=false&skybox=0"
              title="Entangled Space 3D animation"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <div className="border-t border-border pt-8 lg:col-span-2">
          <p className="max-w-2xl text-base leading-8 text-foreground sm:text-lg">
            Derived from music theory. Tuned to natural cycles. Open by design.
          </p>
        </div>
      </div>
    </section>
  )
}
