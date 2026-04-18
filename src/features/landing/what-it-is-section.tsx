import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type WhatItIsItem = {
  ordinal: string
  label: string
  description: string
  goal: string
  io: {
    input: string
    output: string
  } | null
}

type WhatItIsSectionProps = {
  items: readonly WhatItIsItem[]
}

export function WhatItIsSection({ items }: WhatItIsSectionProps) {
  return (
    <section className="border-t border-border bg-muted/35">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
          <div className="space-y-6">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              Next Steps for Entangled Space
            </p>
            <h2 className="text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              A phased path to make the protocol real.
            </h2>
          </div>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[1.05rem] top-0 hidden w-px bg-border sm:block lg:left-[1.25rem]"
          />
          <Accordion type="single" collapsible className="space-y-0">
            {items.map(({ ordinal, label, description, goal, io }, index) => (
              <AccordionItem
                key={label}
                value={label}
                className={`relative ${
                  index > 0 ? "border-t border-border" : ""
                }`}
              >
                <div className="grid gap-4 py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:gap-10">
                  <div className="relative flex items-start gap-4">
                    <div className="relative z-10 flex size-9 shrink-0 items-center justify-center border border-border bg-background text-[0.68rem] font-medium tracking-[0.18em] text-foreground sm:mb-4 sm:size-10">
                      {ordinal}
                    </div>
                  </div>
                  <div className="max-w-2xl">
                    <AccordionTrigger className="min-h-11 items-start gap-6 py-2 text-left hover:no-underline sm:py-0">
                      <div className="space-y-2">
                        <p className="text-xl font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
                          {label}
                        </p>
                        <p className="text-base leading-7 text-foreground/88 sm:text-lg">
                          {description}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="space-y-5 pt-5">
                        {io && (
                          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                            <div className="bg-background px-4 py-3">
                              <p className="mb-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                Input
                              </p>
                              <p className="font-mono text-sm text-foreground/80">
                                {io.input}
                              </p>
                            </div>
                            <div className="bg-background px-4 py-3">
                              <p className="mb-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                Output
                              </p>
                              <p className="font-mono text-sm text-foreground/80">
                                {io.output}
                              </p>
                            </div>
                          </div>
                        )}
                        <p className="text-base leading-8 text-foreground/72 sm:text-lg">
                          {goal}
                        </p>
                      </div>
                    </AccordionContent>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-14 border border-border bg-background px-6 py-7 sm:px-8 sm:py-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Guiding Principle
            </p>
            <p className="text-xl font-medium leading-relaxed tracking-[-0.02em] text-foreground sm:text-2xl">
              The protocol should remain infrastructure-agnostic.
            </p>
            <p className="text-base leading-8 text-foreground/88 sm:text-lg">
              It should be able to run on Stripe, on a blockchain, on both, or
              on any other system. The implementation layer can vary. The math
              and logic should remain consistent.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
