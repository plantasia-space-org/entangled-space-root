import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type SnailFactorIntroSectionProps = {
  paragraphs: readonly string[]
}

export function SnailFactorIntroSection({
  paragraphs,
}: SnailFactorIntroSectionProps) {
  const [introParagraph, ...detailParagraphs] = paragraphs

  return (
    <section
      id="snail-factor"
      className="relative scroll-mt-24 overflow-hidden border-t border-border bg-background"
    >
      <div className="absolute inset-0">
        <img
          src="https://dev-herbarium.plantasia.space/image-assets/entangled-space/landing/golden-ratio-drawing_mid.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-24 dark:opacity-42"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,244,236,0.97)_0%,rgba(247,244,236,0.93)_40%,rgba(247,244,236,0.72)_72%,rgba(247,244,236,0.88)_100%)] dark:bg-[linear-gradient(90deg,rgba(18,18,18,0.95)_0%,rgba(18,18,18,0.84)_38%,rgba(18,18,18,0.48)_72%,rgba(18,18,18,0.74)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(116,83,36,0.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.18))] dark:bg-[radial-gradient(circle_at_78%_35%,rgba(214,171,93,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.24))]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="max-w-3xl space-y-6">
          <p className="text-[0.72rem] font-medium tracking-[0.28em] text-foreground/62 uppercase">
            The Snail Factor
          </p>
          <h2 className="max-w-xl text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            An economic cycle derived from a musical scale based on the golden
            ratio.
          </h2>
          <div className="max-w-2xl space-y-6">
            {introParagraph && (
              <p className="text-base leading-8 text-foreground/86 sm:text-lg">
                {introParagraph}
              </p>
            )}

            {detailParagraphs.length > 0 && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="snail-factor-details"
                  className="border-t border-border/70"
                >
                  <AccordionTrigger className="py-4 text-left text-[0.72rem] font-medium tracking-[0.18em] text-muted-foreground uppercase hover:no-underline"></AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="space-y-5 pt-2">
                      {detailParagraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-foreground/86 sm:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
