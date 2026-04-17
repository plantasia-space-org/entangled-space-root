const SILENT_AUDIO_SELECTOR = "[data-silent-audio-unlock]"

let audioUnlocked = false
let unlockPromise: Promise<boolean> | null = null

function getAudioElement(): HTMLAudioElement | null {
  if (typeof document === "undefined") return null
  const element = document.querySelector(SILENT_AUDIO_SELECTOR)
  return element instanceof HTMLAudioElement ? element : null
}

export function ensureSilentAudioUnlock(): Promise<boolean> {
  if (audioUnlocked) return Promise.resolve(true)
  if (unlockPromise) return unlockPromise

  const el = getAudioElement()
  if (!el) return Promise.resolve(false)

  unlockPromise = Promise.resolve(el.play())
    .then(() => {
      try {
        el.pause()
        el.currentTime = 0
      } catch {
        // Best effort; failures here are non-fatal.
      }
      audioUnlocked = true
      unlockPromise = null
      return true
    })
    .catch(() => {
      unlockPromise = null
      return false
    })

  return unlockPromise
}

/** Call once on app init — registers one-shot listeners on the first gesture. */
export function registerSilentAudioUnlockHandlers(): void {
  const attempt = () => {
    void ensureSilentAudioUnlock()
  }
  for (const event of ["pointerdown", "touchstart", "keydown"] as const) {
    document.addEventListener(event, attempt, { once: true, passive: true })
  }
}
