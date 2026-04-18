export type SnailVoice = "marimba" | "sine" | "koto"

export const PERIOD_CENTS = 833.09
export const NOTE_CENTS = [0, 99.27, 235.77, 366.91, 466.18, 597.32, 733.82]
export const NOTE_NAMES = ["7", "1", "2", "3", "4", "5", "6"]
export const NUM_NOTES = 7
export const ROOT_FREQ = 261.62 * Math.pow(2, -366.91 / 1200)

export const MIN_BPM = 70
export const MAX_BPM = 140
export const DEFAULT_BPM = 96
export const VISIBLE_CYCLES = 3
// Each sequencer step is one eighth note ('8n' in Tone.Transport, 2 steps per beat).
export const KEYBOARD_PERIODS = Array.from(
  { length: VISIBLE_CYCLES },
  (_, index) => index
)

export const KEY_MAP: Record<string, [number, number]> = {
  z: [1, 0],
  x: [2, 0],
  c: [3, 0],
  v: [4, 0],
  b: [5, 0],
  n: [6, 0],
  m: [0, 1],
  a: [1, 1],
  s: [2, 1],
  d: [3, 1],
  f: [4, 1],
  g: [5, 1],
  h: [6, 1],
  j: [0, 2],
  q: [1, 2],
  w: [2, 2],
  e: [3, 2],
  r: [4, 2],
  t: [5, 2],
  y: [6, 2],
  u: [0, 3],
}

export const KEY_LABELS: Record<string, string> = {
  "1,0": "Z",
  "2,0": "X",
  "3,0": "C",
  "4,0": "V",
  "5,0": "B",
  "6,0": "N",
  "0,1": "M",
  "1,1": "A",
  "2,1": "S",
  "3,1": "D",
  "4,1": "F",
  "5,1": "G",
  "6,1": "H",
  "0,2": "J",
  "1,2": "Q",
  "2,2": "W",
  "3,2": "E",
  "4,2": "R",
  "5,2": "T",
  "6,2": "Y",
  "0,3": "U",
}

export const CENTS_TO_NOTE = new Map<number, number>([
  [99.27, 1],
  [235.77, 2],
  [366.91, 3],
  [466.18, 4],
  [597.32, 5],
  [733.82, 6],
  [833.09, 0],
])

type ModelEntry = {
  step: number
  justStep: number
  justCents: number
  octaveStep: number
  octaveCents: number
  season: "Spring" | "Summer" | "Autumn" | "Winter"
  factor: number
  position?: number
  cycle?: number
  anchorStep?: number
}

const BASE_SNAIL_CYCLE: ModelEntry[] = [
  { step: 1, justStep: 1, justCents: 99.27, octaveStep: 3, octaveCents: 100, season: "Spring", factor: 0.1 },
  { step: 2, justStep: 2, justCents: 235.77, octaveStep: 7, octaveCents: 233.33, season: "Summer", factor: 0.23333 },
  { step: 3, justStep: 3, justCents: 366.91, octaveStep: 11, octaveCents: 366.67, season: "Autumn", factor: 0.36667 },
  { step: 4, justStep: 4, justCents: 466.18, octaveStep: 14, octaveCents: 466.67, season: "Winter", factor: 0.46667 },
  { step: 5, justStep: 5, justCents: 597.32, octaveStep: 18, octaveCents: 600, season: "Spring", factor: 0.6 },
  { step: 6, justStep: 6, justCents: 733.82, octaveStep: 22, octaveCents: 733.33, season: "Summer", factor: 0.73333 },
  { step: 7, justStep: 7, justCents: 833.09, octaveStep: 25, octaveCents: 833.33, season: "Autumn", factor: 0.83333 },
  { step: 8, justStep: 8, justCents: 733.82, octaveStep: 22, octaveCents: 733.33, season: "Autumn", factor: 0.73333 },
  { step: 9, justStep: 9, justCents: 597.32, octaveStep: 18, octaveCents: 600, season: "Winter", factor: 0.6 },
  { step: 10, justStep: 10, justCents: 466.18, octaveStep: 14, octaveCents: 466.67, season: "Spring", factor: 0.46667 },
  { step: 11, justStep: 11, justCents: 366.91, octaveStep: 11, octaveCents: 366.67, season: "Summer", factor: 0.36667 },
  { step: 12, justStep: 12, justCents: 235.77, octaveStep: 7, octaveCents: 233.33, season: "Autumn", factor: 0.23333 },
]

const repeatedCycle: Required<ModelEntry>[] = []

for (let cycle = 1; cycle <= VISIBLE_CYCLES; cycle += 1) {
  BASE_SNAIL_CYCLE.forEach((base) => {
    repeatedCycle.push({
      ...base,
      position: repeatedCycle.length + 1,
      cycle,
      anchorStep: base.step,
    })
  })
}

export const VISIBLE_SNAIL_MODEL = repeatedCycle

export function getKeyIdForEntry(entry: Pick<Required<ModelEntry>, "cycle" | "justCents">) {
  const noteIndex = CENTS_TO_NOTE.get(entry.justCents)

  if (noteIndex === undefined) {
    return null
  }

  const basePeriod = entry.cycle - 1
  return noteIndex === 0 ? `0,${basePeriod + 1}` : `${noteIndex},${basePeriod}`
}

export function getFreq(noteIndex: number, period = 0) {
  return ROOT_FREQ * Math.pow(2, (NOTE_CENTS[noteIndex] + period * PERIOD_CENTS) / 1200)
}

export function getPeriodKeys(basePeriod: number) {
  const keys: { ni: number; period: number }[] = []

  for (let ni = 1; ni < NUM_NOTES; ni += 1) {
    keys.push({ ni, period: basePeriod })
  }

  keys.push({ ni: 0, period: basePeriod + 1 })

  return keys
}
