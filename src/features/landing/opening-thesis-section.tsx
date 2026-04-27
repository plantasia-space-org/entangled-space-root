type OpeningThesisSectionProps = {
  paragraphs: readonly string[]
}

export function OpeningThesisSection({
  paragraphs,
}: OpeningThesisSectionProps) {
  return (
    <section className="bg-muted/35">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:py-36">
        <div className="space-y-6">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Opening Thesis
          </p>
          <h2 className="max-w-xl text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            An Economy That Breathes
          </h2>
        </div>

        <div className="max-w-2xl space-y-6">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-8 text-foreground/88 sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
