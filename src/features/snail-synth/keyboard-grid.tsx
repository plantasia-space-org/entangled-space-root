import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { KEYBOARD_PERIODS, getFreq, getPeriodKeys, KEY_LABELS, NOTE_NAMES } from "./snail-synth-data"

type KeyboardPeriod = (typeof KEYBOARD_PERIODS)[number]

// Directional slide variants for the period switcher animation.
const slideVariants = {
  enter: (direction: number) => ({ y: direction > 0 ? 22 : -22, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? -22 : 22, opacity: 0 }),
}

type KeyboardGridProps = {
  activeKeyIds: string[]
  periodDirection: number
  period: KeyboardPeriod
  onSelectPeriod: (period: KeyboardPeriod) => void
  onPressKey: (noteIndex: number, period: number, keyId: string) => void
  onReleaseKey: (keyId: string) => void
}

export function KeyboardGrid({
  activeKeyIds,
  periodDirection,
  period,
  onSelectPeriod,
  onPressKey,
  onReleaseKey,
}: KeyboardGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Keyboard
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {KEYBOARD_PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onSelectPeriod(p)}
              className={cn(
                "inline-flex h-7 items-center border px-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors [touch-action:manipulation] sm:h-8 sm:px-3 sm:text-[0.72rem]",
                period === p
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {`Period ${p}`}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[11rem] sm:min-h-[13rem]">
        <AnimatePresence initial={false} mode="wait" custom={periodDirection}>
          <motion.div
            key={period}
            custom={periodDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 space-y-3 border border-border bg-background p-2 sm:p-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                {`Period ${period}`}
              </p>
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                7 notes
              </p>
            </div>

            <div className="grid grid-cols-7 gap-px bg-border">
              {getPeriodKeys(period).map(({ ni, period: notePeriod }) => {
                const keyId = `${ni},${notePeriod}`
                const isActive = activeKeyIds.includes(keyId)

                return (
                  <button
                    key={keyId}
                    type="button"
                    data-vaul-no-drag
                    onPointerDown={() => onPressKey(ni, notePeriod, keyId)}
                    onPointerUp={() => onReleaseKey(keyId)}
                    onPointerLeave={() => onReleaseKey(keyId)}
                    onPointerCancel={() => onReleaseKey(keyId)}
                    className={cn(
                      "flex min-h-32 min-w-0 flex-col justify-between bg-background px-1.5 py-2 text-center [touch-action:manipulation] sm:min-h-40 sm:px-2 sm:py-3",
                      isActive
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-muted/55"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.6rem] font-medium uppercase tracking-[0.18em] sm:text-[0.68rem]",
                        isActive ? "text-background/70" : "text-muted-foreground"
                      )}
                    >
                      {KEY_LABELS[keyId] ?? ""}
                    </span>
                    <span
                      className={cn(
                        "text-2xl leading-none font-medium tracking-[-0.04em] sm:text-3xl",
                        isActive && "text-background"
                      )}
                    >
                      {NOTE_NAMES[ni]}
                    </span>
                    <span
                      className={cn(
                        "text-[0.6rem] tabular-nums sm:text-xs",
                        isActive ? "text-background/80" : "text-muted-foreground"
                      )}
                    >
                      <span className="hidden sm:inline">{getFreq(ni, notePeriod).toFixed(1)}</span>
                      <span className="sm:hidden">{getFreq(ni, notePeriod).toFixed(0)}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
