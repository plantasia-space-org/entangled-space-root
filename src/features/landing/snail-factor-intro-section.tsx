type SnailFactorIntroSectionProps = {
  paragraphs: readonly string[]
}

export function SnailFactorIntroSection({
  paragraphs,
}: SnailFactorIntroSectionProps) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20 lg:py-36">
        <div className="max-w-2xl space-y-6 lg:col-start-2 lg:row-start-1">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            The Snail Factor
          </p>
          <h2 className="max-w-xl text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            An economic cycle tuned to the golden ratio, derived from music
            theory.
          </h2>
        </div>

        <div className="max-w-2xl space-y-6 lg:col-start-1 lg:row-start-1">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-foreground/88 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="border-t border-border pt-8 lg:col-span-2 lg:row-start-2">
          <div className="max-w-3xl space-y-3">
            <p className="text-xl leading-relaxed font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
              Ascent. Peak. Descent. Return. Repeat.
            </p>
            <p className="text-base leading-8 text-foreground/88 sm:text-lg">
              Growth is not infinite. It oscillates between stakeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
