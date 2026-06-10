type DesignHighlight = {
  title: string
  description: string
}

type DesignPropertiesSectionProps = {
  highlights: {
    intro: string
    items: readonly DesignHighlight[]
  }
}

export function DesignPropertiesSection({
  highlights,
}: DesignPropertiesSectionProps) {
  return (
    <section
      id="why-oscillate"
      className="scroll-mt-24 border-t border-border bg-muted/35"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
          <div className="space-y-6">
            <p className="text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Design Properties
            </p>
            <h2 className="max-w-xl text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              Why oscillate?
            </h2>
          </div>
          <div className="max-w-2xl space-y-4">
            <p className="text-base leading-8 text-foreground/88 sm:text-lg">
              {highlights.intro}
            </p>
          </div>
        </div>

        <div className="mt-14">
          {highlights.items.map(({ title, description }, index) => (
            <div
              key={title}
              className="grid gap-3 border-t border-border/70 py-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20"
            >
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg leading-snug font-medium tracking-[-0.01em] text-foreground sm:text-xl">
                  {title}
                </h3>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-foreground/75 sm:text-base sm:leading-8">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
