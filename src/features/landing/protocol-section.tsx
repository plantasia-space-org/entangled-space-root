type FormulaItem = {
  symbol: string
  description: string
}

type FormulaBlock = {
  label: string
  items: readonly FormulaItem[]
}

type ImplementationRow = {
  context: string
  creators: string
  builders: string
  regeneration: string
}

type ProtocolSectionProps = {
  formulaBreakdown: readonly FormulaBlock[]
  implementationRows: readonly ImplementationRow[]
}

export function ProtocolSection({
  formulaBreakdown,
  implementationRows,
}: ProtocolSectionProps) {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
          <div className="space-y-6">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              The Protocol
            </p>
            <h2 className="text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              The formula.
            </h2>
          </div>
          <div className="max-w-2xl space-y-4">
            <p className="text-base leading-8 text-foreground/88 sm:text-lg">
              Every input maps to an output. Nothing escapes the accounting.
              The protocol defines who receives value, in what proportion, and
              modulated by what rhythm.
            </p>
          </div>
        </div>

        <div className="mt-14 border border-border bg-muted/35 px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-mono text-base leading-relaxed text-foreground sm:text-lg lg:text-xl">
            (Rₜ + Iₜ) − Fₜ − (Vₜ × Snailsₜ)
          </p>
          <p className="mt-1 font-mono text-base leading-relaxed text-foreground sm:text-lg lg:text-xl">
            &nbsp;&nbsp;= creators × 0.33 + builders × 0.33 + regeneration ×
            0.34
          </p>
          <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            All values computed per period (monthly)
          </p>
        </div>

        <div className="mt-3 grid gap-px border border-border bg-border sm:grid-cols-3">
          {formulaBreakdown.map(({ label, items }) => (
            <div
              key={label}
              className="space-y-5 bg-background px-6 py-7 sm:px-7 sm:py-8"
            >
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </p>
              <ul className="space-y-4">
                {items.map(({ symbol, description }) => (
                  <li key={symbol}>
                    <p className="font-mono text-sm font-medium text-foreground">
                      {symbol}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-foreground/75">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Each implementation maps these roles to its own context
          </p>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted-foreground" />
                  {["Creators", "Builders", "Regeneration"].map((col) => (
                    <th
                      key={col}
                      className="px-5 py-3 text-left text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {implementationRows.map(
                  ({ context, creators, builders, regeneration }, index) => (
                    <tr
                      key={context}
                      className={
                        index < implementationRows.length - 1
                          ? "border-b border-border"
                          : ""
                      }
                    >
                      <td className="px-5 py-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        {context}
                      </td>
                      <td className="px-5 py-4 leading-6 text-foreground/88">
                        {creators}
                      </td>
                      <td className="px-5 py-4 leading-6 text-foreground/88">
                        {builders}
                      </td>
                      <td className="px-5 py-4 leading-6 text-foreground/88">
                        {regeneration}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
