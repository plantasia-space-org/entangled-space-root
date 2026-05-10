import { Clock3 } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

import { MAX_BPM, MIN_BPM, type SnailVoice } from "./snail-synth-data"

type TransportControlsProps = {
  bpm: number
  currentVoice: SnailVoice
  onBpmChange: (bpm: number) => void
  onVoiceChange: (voice: SnailVoice) => void
}

const voices: SnailVoice[] = ["marimba", "sine", "koto"]

export function TransportControls({
  bpm,
  currentVoice,
  onBpmChange,
  onVoiceChange,
}: TransportControlsProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap items-center gap-2" data-vaul-no-drag>
        {voices.map((voice) => (
          <button
            key={voice}
            type="button"
            onClick={() => onVoiceChange(voice)}
            className={cn(
              "inline-flex min-h-11 items-center border px-4 text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors sm:min-h-8 sm:px-3",
              currentVoice === voice
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {voice}
          </button>
        ))}
      </div>

      <div
        className="flex w-full items-center gap-3 xl:max-w-xs"
        data-vaul-no-drag
      >
        <div className="flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.22em] text-muted-foreground uppercase">
          <Clock3 className="size-3.5" />
          Tempo
        </div>
        <Slider
          aria-label="Tempo in BPM"
          min={MIN_BPM}
          max={MAX_BPM}
          step={1}
          value={[bpm]}
          onValueChange={(value) => onBpmChange(value[0] ?? bpm)}
          className="min-h-11 w-full"
        />
        <div className="w-10 text-right text-[0.72rem] font-medium text-foreground tabular-nums">
          {bpm}
        </div>
      </div>
    </div>
  )
}
