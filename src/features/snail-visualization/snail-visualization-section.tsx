import { ChartSpline } from "lucide-react"
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

import { Button } from "@/components/ui/button"
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

const euroFormatter = new Intl.NumberFormat("en-US", {
  currency: "EUR",
  maximumFractionDigits: 0,
  style: "currency",
})

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-border pl-4 first:border-l-0 first:pl-0">
      <p className="text-[0.68rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
        {value}
      </p>
    </div>
  )
}

export function SnailModelMetrics({ activeStep }: { activeStep: number }) {
  const activeEntry = getVisualizationEntry(activeStep)

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <MetricCell
        label="Model Month"
        value={String(activeEntry.position).padStart(2, "0")}
      />
      <MetricCell
        label="36/Oct Cents"
        value={activeEntry.octaveCents.toFixed(2)}
      />
      <MetricCell label="Snail Factor" value={activeEntry.factor.toFixed(2)} />
    </div>
  )
}

type ChartPayload = {
  index: number
}

type ChartClickState = {
  activePayload?: Array<{ payload?: ChartPayload }>
}

export function SnailModelCharts({
  activeStep,
  interactive = false,
  onSelectStep,
}: {
  activeStep: number
  interactive?: boolean
  onSelectStep?: (step: number) => void
}) {
  const activeEntry = getVisualizationEntry(activeStep)
  const selectPayload = (payload?: ChartPayload) => {
    if (!interactive || payload?.index === undefined) return
    onSelectStep?.(payload.index)
  }
  const selectChartPoint = (state?: ChartClickState) => {
    selectPayload(state?.activePayload?.[0]?.payload)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] lg:items-stretch">
      <div className="border border-border bg-background">
        <div className="grid h-full gap-0">
          <div>
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <p className="text-sm font-medium text-foreground">
                Snail Factor Signal
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Monthly economic modulation derived from the 833 Cents Scale
              </p>
            </div>
            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <ChartContainer
                config={HARMONIC_SOURCE_CONFIG}
                className="aspect-[16/8] w-full"
              >
                <LineChart
                  data={VISUALIZATION_MODEL}
                  margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
                  onClick={selectChartPoint}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="position"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    minTickGap={24}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    domain={[0, 0.9]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(_, payload) => {
                          const item = payload?.[0]?.payload
                          return item
                            ? `Month ${String(item.position).padStart(2, "0")} · Harmonic step ${String(item.anchorStep).padStart(2, "0")}`
                            : ""
                        }}
                      />
                    }
                  />
                  <ReferenceLine
                    x={activeEntry.position}
                    stroke="var(--foreground)"
                    strokeOpacity={0.18}
                  />
                  <Line
                    type="monotone"
                    dataKey="snailFactor"
                    name="snailFactor"
                    stroke="var(--color-snailFactor)"
                    strokeWidth={2.5}
                    dot={(props) => {
                      const isActive = props.payload?.index === activeStep
                      return (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={isActive ? 4.5 : 2.5}
                          className={interactive ? "cursor-pointer" : ""}
                          fill={
                            isActive
                              ? "var(--foreground)"
                              : "var(--color-snailFactor)"
                          }
                          onClick={() => selectPayload(props.payload)}
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
              <p className="text-sm font-medium text-foreground">
                Monthly Growth Simulation
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                A hypothetical model showing how the protocol behaves over three
                repeated yearly cycles. Revenue follows an S-curve: slow early
                adoption, faster growth, then stabilization. Fixed and flexible
                costs are deducted first; flexible costs rise and fall with the
                monthly Snail Factor. Remaining value can be distributed to
                creators, builders, and regeneration. This is not a financial
                forecast.
              </p>
            </div>
            <div className="px-4 py-4 sm:px-5 sm:py-5">
              <ChartContainer
                config={HARMONIC_SOURCE_CONFIG}
                className="aspect-[16/8] w-full"
              >
                <LineChart
                  data={VISUALIZATION_MODEL}
                  margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
                  onClick={selectChartPoint}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="position"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    minTickGap={24}
                  />
                  <YAxis
                    tickFormatter={(value) =>
                      euroFormatter.format(Number(value))
                    }
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    width={78}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name, item) => (
                          <>
                            <div
                              className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                              style={{ backgroundColor: item.color }}
                            />
                            <div className="flex flex-1 justify-between gap-4 leading-none">
                              <span className="text-muted-foreground">
                                {HARMONIC_SOURCE_CONFIG[
                                  name as keyof typeof HARMONIC_SOURCE_CONFIG
                                ]?.label ?? name}
                              </span>
                              <span className="font-mono font-medium text-foreground tabular-nums">
                                {euroFormatter.format(Number(value))}
                              </span>
                            </div>
                          </>
                        )}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <ReferenceLine
                    x={activeEntry.position}
                    stroke="var(--foreground)"
                    strokeOpacity={0.18}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2.2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalCosts"
                    name="totalCosts"
                    stroke="var(--color-totalCosts)"
                    strokeWidth={2.2}
                    dot={false}
                  />
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
            A circular view of the same simulation. Each point is one month;
            each full turn is one year. Revenue growth pushes the curve outward,
            while the monthly Snail Factor creates the cyclical expansion and
            contraction.
          </p>
        </div>
        <div className="flex flex-1 px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex w-full items-center justify-center">
            <div className="w-full max-w-[32rem]">
              <ChartContainer
                config={HARMONIC_SOURCE_CONFIG}
                className="aspect-square w-full"
              >
                <ScatterChart
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  onClick={selectChartPoint}
                >
                  <XAxis
                    type="number"
                    dataKey="polarX"
                    hide
                    domain={["dataMin - 30", "dataMax + 30"]}
                  />
                  <YAxis
                    type="number"
                    dataKey="polarY"
                    hide
                    domain={["dataMin - 30", "dataMax + 30"]}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(_, payload) => {
                          const item = payload?.[0]?.payload
                          return item
                            ? `Month ${String(item.position).padStart(2, "0")} · Harmonic step ${String(item.anchorStep).padStart(2, "0")}`
                            : ""
                        }}
                      />
                    }
                  />
                  <Scatter
                    data={VISUALIZATION_MODEL}
                    line={{
                      stroke: "var(--border)",
                      strokeOpacity: 0.7,
                      strokeWidth: 1.2,
                    }}
                    fill="var(--color-polar)"
                    shape={(props: {
                      cx?: number
                      cy?: number
                      payload?: { index: number }
                    }) => {
                      const isActive = props.payload?.index === activeStep

                      return (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={isActive ? 7 : 4}
                          className={interactive ? "cursor-pointer" : ""}
                          fill={
                            isActive
                              ? "var(--foreground)"
                              : "var(--color-polar)"
                          }
                          onClick={() => selectPayload(props.payload)}
                        />
                      )
                    }}
                  />
                  <Scatter
                    data={VISUALIZATION_MODEL.filter(
                      (entry) => entry.anchorStep === 1
                    )}
                    fill="transparent"
                    shape={(props: {
                      cx?: number
                      cy?: number
                      payload?: { cycle: number }
                    }) => (
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
  )
}

export function SnailVisualizationSection({
  activeStep,
  onExplore,
}: {
  activeStep: number
  onExplore: () => void
}) {
  return (
    <section id="model" className="scroll-mt-24 bg-muted/35">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="border border-border bg-background">
          <div className="border-b border-border px-5 py-4 sm:px-6">
            <p className="text-sm font-medium text-foreground">
              Explore the Model
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              Trace the active month across the scale, Snail Factor, and
              simulation.
            </p>
          </div>
          <div className="grid gap-6 px-4 py-4 sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <SnailModelMetrics activeStep={activeStep} />
            <Button onClick={onExplore} className="w-full lg:w-auto">
              <ChartSpline className="size-4" />
              Explore interactive model
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
