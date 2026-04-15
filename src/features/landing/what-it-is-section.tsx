type WhatItIsItem = {
  ordinal: string
  label: string
  description: string
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
              What Entangled Space Is
            </p>
            <h2 className="text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              Three layers. One protocol.
            </h2>
          </div>
        </div>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {items.map(({ ordinal, label, description, io }) => (
            <div
              key={label}
              className="grid gap-8 py-10 sm:grid-cols-[9rem_1fr] lg:grid-cols-[12rem_1fr] lg:gap-16"
            >
              <div className="space-y-2">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {ordinal}
                </p>
                <p className="text-xl font-medium tracking-[-0.02em] text-foreground sm:text-2xl">
                  {label}
                </p>
              </div>
              <div className="max-w-2xl space-y-5">
                <p className="text-base leading-8 text-foreground/88 sm:text-lg">
                  {description}
                </p>
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
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-3xl space-y-3">
          <p className="text-xl font-medium leading-relaxed tracking-[-0.02em] text-foreground sm:text-2xl">
            The protocol is infrastructure-agnostic.
          </p>
          <p className="text-base leading-8 text-foreground/88 sm:text-lg">
            It can run on Stripe, on a blockchain, on both, or on anything
            else. The math is what matters.
          </p>
        </div>
      </div>
    </section>
  )
}
