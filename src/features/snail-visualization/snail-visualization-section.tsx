import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  HARMONIC_SOURCE_CONFIG,
  VISUALIZATION_MODEL,
  getVisualizationEntry,
} from "./snail-visualization-data"

function EditorialBlock({
  children,
  note,
  title,
}: {
  children: React.ReactNode
  note: string
  title: string
}) {
  return (
    <section className="border border-border bg-background">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          {note}
        </p>
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
    </section>
  )
}

function MetricCell({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="border-l border-border pl-4 first:border-l-0 first:pl-0">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
        {value}
      </p>
    </div>
  )
}

export function SnailVisualizationSection({
  activeStep,
}: {
  activeStep: number
}) {
  const activeEntry = getVisualizationEntry(activeStep)

  return (
    <section className="bg-muted/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 sm:px-8 sm:py-28 lg:gap-12 lg:py-36">
        <EditorialBlock
          title="Harmonic Source"
          note="833 Cents Scale data used as the source for the Entangled Space seasonal mapping"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCell label="Just Step" value={String(activeEntry.justStep)} />
            <MetricCell label="Just Cents" value={activeEntry.justCents.toFixed(2)} />
            <MetricCell label="36/Oct Step" value={String(activeEntry.octaveStep)} />
            <MetricCell label="36/Oct Cents" value={activeEntry.octaveCents.toFixed(2)} />
          </div>
        </EditorialBlock>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:items-stretch">
          <div className="border border-border bg-background">
            <div className="grid h-full gap-0">
              <div>
                <div className="border-b border-border px-5 py-4 sm:px-6">
                  <p className="text-sm font-medium text-foreground">Q-Factor Signal</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Entangled Space 13-step rise-and-return cycle repeated across time
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-5 sm:py-5">
                  <ChartContainer
                    config={HARMONIC_SOURCE_CONFIG}
                    className="aspect-[16/8] w-full"
                  >
                    <LineChart data={VISUALIZATION_MODEL} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="position"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={12}
                        minTickGap={24}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={12} domain={[0, 0.9]} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(_, payload) => {
                              const item = payload?.[0]?.payload
                              return item
                                ? `Cycle ${item.cycle} · Step ${String(item.anchorStep).padStart(2, "0")}`
                                : ""
                            }}
                          />
                        }
                      />
                      <ReferenceLine x={activeEntry.position} stroke="var(--foreground)" strokeOpacity={0.18} />
                      <Line
                        type="monotone"
                        dataKey="qFactor"
                        name="qFactor"
                        stroke="var(--color-qFactor)"
                        strokeWidth={2.5}
                        dot={(props) => {
                          const isActive = props.payload?.index === activeStep
                          return (
                            <circle
                              cx={props.cx}
                              cy={props.cy}
                              r={isActive ? 4.5 : 2.5}
                              fill={isActive ? "var(--foreground)" : "var(--color-qFactor)"}
                            />
                          )
                        }}
                        activeDot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>

              <div className="border-t border-border">
                <div className="border-b border-border px-5 py-4 sm:px-6">
                  <p className="text-sm font-medium text-foreground">Formula Growth</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Revenue, total deductions, and the remaining value across repeated cycles
                  </p>
                </div>
                <div className="px-4 py-4 sm:px-5 sm:py-5">
                  <ChartContainer
                    config={HARMONIC_SOURCE_CONFIG}
                    className="aspect-[16/8] w-full"
                  >
                    <LineChart data={VISUALIZATION_MODEL} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="position"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={12}
                        minTickGap={24}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <ReferenceLine x={activeEntry.position} stroke="var(--foreground)" strokeOpacity={0.18} />
                      <Line type="monotone" dataKey="revenue" name="revenue" stroke="var(--color-revenue)" strokeWidth={2.2} dot={false} />
                      <Line type="monotone" dataKey="totalCosts" name="totalCosts" stroke="var(--color-totalCosts)" strokeWidth={2.2} dot={false} />
                      <Line
                        type="monotone"
                        dataKey="distributable"
                        name="distributable"
                        stroke="var(--color-distributable)"
                        strokeWidth={2.2}
                        dot={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col border border-border bg-background">
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <p className="text-sm font-medium text-foreground">Polar Result</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Derived from growth radius plus Q-factor modulation in polar space
              </p>
            </div>
            <div className="flex flex-1 px-4 py-4 sm:px-5 sm:py-5">
              <div className="flex w-full items-center justify-center">
                <div className="w-full max-w-[32rem]">
                  <ChartContainer
                    config={HARMONIC_SOURCE_CONFIG}
                    className="aspect-square w-full"
                  >
                    <ScatterChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <XAxis type="number" dataKey="polarX" hide domain={["dataMin - 30", "dataMax + 30"]} />
                      <YAxis type="number" dataKey="polarY" hide domain={["dataMin - 30", "dataMax + 30"]} />
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            labelFormatter={(_, payload) => {
                              const item = payload?.[0]?.payload
                              return item
                                ? `Cycle ${item.cycle} · Step ${String(item.anchorStep).padStart(2, "0")}`
                                : ""
                            }}
                          />
                        }
                      />
                      <Scatter
                        data={VISUALIZATION_MODEL}
                        line={{ stroke: "var(--border)", strokeOpacity: 0.7, strokeWidth: 1.2 }}
                        fill="var(--color-polar)"
                        shape={(
                          props: {
                            cx?: number
                            cy?: number
                            payload?: { index: number }
                          }
                        ) => {
                          const isActive = props.payload?.index === activeStep

                          return (
                            <circle
                              cx={props.cx}
                              cy={props.cy}
                              r={isActive ? 7 : 4}
                              fill={isActive ? "var(--foreground)" : "var(--color-polar)"}
                            />
                          )
                        }}
                      />
                      <Scatter
                        data={VISUALIZATION_MODEL.filter((entry) => entry.anchorStep === 1)}
                        fill="transparent"
                        shape={(props: { cx?: number; cy?: number; payload?: { cycle: number } }) => (
                          <text
                            x={(props.cx ?? 0) + 12}
                            y={(props.cy ?? 0) + 4}
                            fill="var(--muted-foreground)"
                            fontSize="11"
                          >
                            {`C${props.payload?.cycle ?? ""}`}
                          </text>
                        )}
                      />
                    </ScatterChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
