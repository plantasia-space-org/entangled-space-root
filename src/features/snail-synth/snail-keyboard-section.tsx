import { useEffect, useEffectEvent, useRef, useState } from "react"
import {
  ArrowUpRight,
  ChevronUp,
  Info,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { KeyboardGrid } from "./keyboard-grid"
import { playVoice, toneStart } from "./snail-audio"
import { ensureSilentAudioUnlock } from "./silent-audio-unlock"
import {
  CENTS_TO_NOTE,
  DEFAULT_BPM,
  KEYBOARD_PERIODS,
  KEY_MAP,
  VISIBLE_SNAIL_MODEL,
  getKeyIdForEntry,
  type SnailVoice,
} from "./snail-synth-data"
import { TransportControls } from "./transport-controls"

// 2 steps per beat → each step is one eighth note
const STEPS_PER_BEAT = 2

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  const tagName = target.tagName
  return (
    target.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  )
}

function InfoChip({ label, content }: { label: string; content: string }) {
  return (
    <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="inline-flex h-7 items-center gap-2 border border-border px-2.5 text-[0.68rem] font-medium tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:bg-muted/60 hover:text-foreground"
        >
          <Info className="size-3.5" />
          {label}
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="w-72 border border-border bg-background p-3"
      >
        {content}
      </HoverCardContent>
    </HoverCard>
  )
}

export function SnailKeyboardSection({
  onStepChange,
}: {
  onStepChange?: (step: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [bpm, setBpm] = useState(DEFAULT_BPM)
  const [currentVoice, setCurrentVoice] = useState<SnailVoice>("marimba")
  const [keyboardPeriod, setKeyboardPeriod] = useState<number>(
    KEYBOARD_PERIODS[0] ?? 0
  )
  const [periodDirection, setPeriodDirection] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [heldKeyIds, setHeldKeyIds] = useState<string[]>([])
  const [sequencerKeyId, setSequencerKeyId] = useState<string | null>(null)

  const stepRef = useRef(0)
  const heldKeysRef = useRef(new Set<string>())
  const savedScrollRef = useRef(0)

  // ── Sequencer: setInterval clock ────────────────────────────────────────────
  //
  // setInterval drives the step counter reliably regardless of AudioContext
  // state. Audio is fired via playVoice which uses Tone's AudioContext
  // internally, so the voice synthesis benefits from Tone's context management
  // even though the clock itself is plain JS.

  const advanceStep = useEffectEvent(() => {
    const nextIndex = (stepRef.current + 1) % VISIBLE_SNAIL_MODEL.length
    stepRef.current = nextIndex
    setCurrentStep(nextIndex)

    const entry = VISIBLE_SNAIL_MODEL[nextIndex]
    const noteIndex = CENTS_TO_NOTE.get(entry.justCents)
    if (noteIndex === undefined) return

    const basePeriod = (entry.cycle ?? 1) - 1
    const period = noteIndex === 0 ? basePeriod + 1 : basePeriod
    const keyId =
      noteIndex === 0 ? `0,${basePeriod + 1}` : `${noteIndex},${basePeriod}`

    // Auto-switch the displayed keyboard period to match the sequencer's current cycle
    const displayPeriod = keyboardPeriod
    if (basePeriod !== displayPeriod && KEYBOARD_PERIODS.includes(basePeriod)) {
      setPeriodDirection(basePeriod > displayPeriod ? 1 : -1)
      setKeyboardPeriod(basePeriod)
    }

    setSequencerKeyId(keyId)

    if (soundEnabled) {
      playVoice(currentVoice, noteIndex, period)
    }
  })

  useEffect(() => {
    if (!isPlaying) return
    const intervalMs = 60000 / (bpm * STEPS_PER_BEAT)
    const id = window.setInterval(advanceStep, intervalMs)
    return () => window.clearInterval(id)
  }, [advanceStep, bpm, isPlaying])

  // Clear sequencer highlight when paused or unmounted
  useEffect(() => {
    if (!isPlaying) setSequencerKeyId(null)
  }, [isPlaying])

  useEffect(() => {
    return () => setSequencerKeyId(null)
  }, [])

  // Restore scroll position after drawer closes (iOS body-unlock jump fix)
  useEffect(() => {
    if (!open) {
      const raf = requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScrollRef.current,
          behavior: "instant" as ScrollBehavior,
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [open])

  useEffect(() => {
    onStepChange?.(currentStep)
  }, [currentStep, onStepChange])

  // ── Keyboard interactions ───────────────────────────────────────────────────

  const pressKey = useEffectEvent(
    async (noteIndex: number, period: number, keyId: string) => {
      setHeldKeyIds((current) =>
        current.includes(keyId) ? current : [...current, keyId]
      )
      heldKeysRef.current.add(keyId)

      const matchingSteps = VISIBLE_SNAIL_MODEL.flatMap((entry, index) =>
        getKeyIdForEntry(entry) === keyId ? [index] : []
      )

      if (matchingSteps.length > 0) {
        const nearestStep = matchingSteps.reduce((nearest, candidate) => {
          const nearestDistance = Math.abs(nearest - stepRef.current)
          const candidateDistance = Math.abs(candidate - stepRef.current)

          return candidateDistance < nearestDistance ? candidate : nearest
        }, matchingSteps[0]!)

        stepRef.current = nearestStep
        setCurrentStep(nearestStep)
      }

      if (soundEnabled) {
        await ensureSilentAudioUnlock()
        await toneStart()
        playVoice(currentVoice, noteIndex, period)
      }
    }
  )

  const releaseKey = useEffectEvent((keyId: string) => {
    heldKeysRef.current.delete(keyId)
    setHeldKeyIds((current) => current.filter((item) => item !== keyId))
  })

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return
      if (isEditableTarget(event.target)) return
      const mapping = KEY_MAP[event.key.toLowerCase()]
      if (!mapping) return
      const [noteIndex, period] = mapping
      const keyId = `${noteIndex},${period}`
      if (heldKeysRef.current.has(keyId)) return
      void pressKey(noteIndex, period, keyId)
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) return
      const mapping = KEY_MAP[event.key.toLowerCase()]
      if (!mapping) return
      const [noteIndex, period] = mapping
      releaseKey(`${noteIndex},${period}`)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [pressKey, releaseKey])

  // ── Derived UI state ────────────────────────────────────────────────────────

  const activeKeyIds = sequencerKeyId
    ? Array.from(new Set([...heldKeyIds, sequencerKeyId]))
    : heldKeyIds

  const currentEntry = VISIBLE_SNAIL_MODEL[currentStep]

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(next) => {
          if (next) savedScrollRef.current = window.scrollY
          setOpen(next)
        }}
        shouldScaleBackground={false}
        noBodyStyles
      >
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/96 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:px-8 sm:py-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="min-h-11 px-3 sm:min-h-7 sm:px-2.5"
            >
              <a
                href="https://artizen.fund/"
                target="_blank"
                rel="noopener noreferrer"
                className="[touch-action:manipulation]"
              >
                <span>Fund on Artizen</span>
                <ArrowUpRight className="size-4" />
              </a>
            </Button>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                data-vaul-no-drag
                className="min-h-11 min-w-11 [touch-action:manipulation] px-3 sm:min-h-7 sm:min-w-0 sm:px-2.5"
                onClick={() => setIsPlaying((current) => !current)}
              >
                {isPlaying ? (
                  <Pause className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
                <span className="hidden sm:inline">
                  {isPlaying ? "Pause" : "Play"}
                </span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                data-vaul-no-drag
                className="min-h-11 min-w-11 [touch-action:manipulation] px-3 sm:min-h-7 sm:min-w-0 sm:px-2.5"
                onClick={() => {
                  setSequencerKeyId(null)
                  const next = !soundEnabled
                  setSoundEnabled(next)
                  if (next)
                    void ensureSilentAudioUnlock().then(() => toneStart())
                }}
              >
                {soundEnabled ? (
                  <Volume2 className="size-3.5" />
                ) : (
                  <VolumeX className="size-3.5" />
                )}
                <span className="hidden sm:inline">
                  {soundEnabled ? "Sound On" : "Sound Off"}
                </span>
              </Button>

              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="min-h-11 min-w-11 [touch-action:manipulation] px-3 sm:min-h-7 sm:min-w-0 sm:px-2.5"
                >
                  <span className="hidden sm:inline">Open</span>
                  <ChevronUp
                    className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </Button>
              </DrawerTrigger>
            </div>
          </div>
        </div>

        <DrawerContent className="border-t border-border bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-4 sm:px-8 sm:py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[0.72rem] tracking-[0.2em] text-muted-foreground uppercase">
                Cycle {currentEntry.cycle} · Step{" "}
                {String(currentEntry.anchorStep).padStart(2, "0")}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying((current) => !current)}
                >
                  {isPlaying ? (
                    <Pause className="size-3.5" />
                  ) : (
                    <Play className="size-3.5" />
                  )}
                  {isPlaying ? "Pause" : "Play"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSequencerKeyId(null)
                    const next = !soundEnabled
                    setSoundEnabled(next)
                    if (next)
                      void ensureSilentAudioUnlock().then(() => toneStart())
                  }}
                >
                  {soundEnabled ? (
                    <Volume2 className="size-3.5" />
                  ) : (
                    <VolumeX className="size-3.5" />
                  )}
                  {soundEnabled ? "Sound On" : "Sound Off"}
                </Button>

                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Close sound drawer"
                  >
                    <span className="hidden sm:inline">Close</span>
                    <X className="size-4" />
                  </Button>
                </DrawerClose>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <TransportControls
                bpm={bpm}
                currentVoice={currentVoice}
                onBpmChange={setBpm}
                onVoiceChange={setCurrentVoice}
              />

              <div className="border-t border-border pt-4">
                <KeyboardGrid
                  activeKeyIds={activeKeyIds}
                  period={keyboardPeriod}
                  periodDirection={periodDirection}
                  onSelectPeriod={(next) => {
                    setPeriodDirection(next > keyboardPeriod ? 1 : -1)
                    setKeyboardPeriod(next)
                  }}
                  onPressKey={pressKey}
                  onReleaseKey={releaseKey}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <InfoChip
                  label="Scale"
                  content="833-cent golden-ratio scale (Bohlen). Period = φ ≈ 1.618×, anchored at 261.62 Hz on note 3."
                />
                <InfoChip
                  label="Mapping"
                  content="Keyboard rows map Q–U high, A–J mid, and Z–M low. Each row plays 1 → 2 → 3 → 4 → 5 → 6 → 7."
                />
                <InfoChip
                  label="Periods"
                  content="The keyboard shows one golden-ratio period at a time. Use the switcher to move between period 0 and period 5."
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
