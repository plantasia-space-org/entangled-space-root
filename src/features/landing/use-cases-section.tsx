import { useState } from "react"
import {
  Code,
  Film,
  FlaskConical,
  Hammer,
  Mic,
  Microchip,
  Sprout,
  type LucideIcon,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const PLANTASIA_BLACK_LOGO_URL =
  "https://herbarium.plantasia.space/assets/logos/v2/2025/plantasia-space-logo-black-transparent-background-512.svg"
const PLANTASIA_WHITE_LOGO_URL =
  "https://herbarium.plantasia.space/assets/logos/v2/2025/plantasia-space-white-transparent-background-512.svg"

function PlantasiaIcon({
  isActive,
  className,
}: {
  isActive: boolean
  className?: string
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  // text colour on the button: dark-theme inactive = light text, light-theme active = light text
  const showWhiteLogo = isDark ? !isActive : isActive
  const src = showWhiteLogo
    ? PLANTASIA_WHITE_LOGO_URL
    : PLANTASIA_BLACK_LOGO_URL

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={cn("object-contain", className)}
    />
  )
}

const iconByContext: Record<string, LucideIcon> = {
  "Documentary film": Film,
  "Research lab": FlaskConical,
  "Software platform": Code,
  "Food cooperative": Sprout,
  "Artisan workshop": Hammer,
  Conference: Mic,
  "AI service": Microchip,
}

type ImplementationRow = {
  context: string
  creators: string
  builders: string
  regeneration: string
}

type UseCasesSectionProps = {
  implementationRows: readonly ImplementationRow[]
}

export function UseCasesSection({ implementationRows }: UseCasesSectionProps) {
  return (
    <section
      id="use-cases"
      className="scroll-mt-24 border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
          <div className="space-y-6">
            <p className="text-[0.72rem] font-medium tracking-[0.28em] text-muted-foreground uppercase">
              Use Cases
            </p>
            <h2 className="text-3xl leading-tight font-medium tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
              The same roles, different contexts.
            </h2>
          </div>
          <div className="max-w-2xl space-y-4">
            <p className="text-base leading-8 text-foreground/88 sm:text-lg">
              The protocol defines the math. Each implementation decides who
              fills each role and where regeneration is directed.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <ImplementationSelector rows={implementationRows} />
        </div>
      </div>
    </section>
  )
}

function ImplementationSelector({
  rows,
}: {
  rows: readonly ImplementationRow[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = rows[activeIndex] ?? rows[0]

  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="Implementation contexts"
        className="grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {rows.map((row, index) => {
          const isActive = index === activeIndex
          const Icon = iconByContext[row.context]
          return (
            <button
              key={row.context}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "aspect-square border px-3 py-3 text-center text-[0.7rem] font-medium tracking-[0.14em] uppercase transition-colors",
                "flex flex-col items-center justify-center gap-2 leading-tight",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background/40 text-foreground/75 hover:border-foreground/60 hover:text-foreground"
              )}
            >
              {row.context === "Plantasia Space" ? (
                <PlantasiaIcon isActive={isActive} className="size-7" />
              ) : Icon ? (
                <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
              ) : null}
              <span>{row.context}</span>
            </button>
          )
        })}
      </div>

      <div className="border border-border">
        <div className="flex border-b border-border">
          <div className="w-[33%] border-r border-border px-4 py-2">
            <div className="text-[0.62rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Creators · 33%
            </div>
            <div className="mt-1 text-[0.6rem] leading-snug text-muted-foreground/70 normal-case">
              based on time &amp; contributions
            </div>
          </div>
          <div className="w-[33%] border-r border-border px-4 py-2">
            <div className="text-[0.62rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Builders · 33%
            </div>
            <div className="mt-1 text-[0.6rem] leading-snug text-muted-foreground/70 normal-case">
              based on time &amp; contributions
            </div>
          </div>
          <div className="w-[34%] px-4 py-2">
            <div className="text-[0.62rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Regeneration · 34%
            </div>
            <div className="mt-1 text-[0.6rem] leading-snug text-muted-foreground/70 normal-case">
              transparent selection, accountability &amp; results
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-[33%] border-r border-border px-4 py-4 text-sm leading-6 text-foreground/88">
            {active.creators}
          </div>
          <div className="w-[33%] border-r border-border px-4 py-4 text-sm leading-6 text-foreground/88">
            {active.builders}
          </div>
          <div className="w-[34%] px-4 py-4 text-sm leading-6 text-foreground/88">
            {active.regeneration}
          </div>
        </div>
      </div>
    </div>
  )
}
